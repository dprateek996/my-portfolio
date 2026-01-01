import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'dprateek996';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { year } = req.query;
    const targetYear = parseInt(year as string) || new Date().getFullYear();

    // Create date range for the year
    const fromDate = `${targetYear}-01-01T00:00:00Z`;
    const toDate = `${targetYear}-12-31T23:59:59Z`;

    const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        // Fallback to third-party API if no token
        try {
            const response = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${targetYear}`
            );
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Fallback API error:', error);
            return res.status(500).json({ error: 'Failed to fetch contributions' });
        }
    }

    try {
        const response = await fetch(GITHUB_GRAPHQL_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {
                    username: GITHUB_USERNAME,
                    from: fromDate,
                    to: toDate,
                },
            }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error('GitHub GraphQL errors:', data.errors);
            return res.status(500).json({ error: 'GitHub API error' });
        }

        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return res.status(404).json({ error: 'No contribution data found' });
        }

        // Transform to match the format expected by react-activity-calendar
        const contributions: ContributionDay[] = [];

        for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
                // Map GitHub's contribution levels to 0-4 scale
                const levelMap: Record<string, number> = {
                    'NONE': 0,
                    'FIRST_QUARTILE': 1,
                    'SECOND_QUARTILE': 2,
                    'THIRD_QUARTILE': 3,
                    'FOURTH_QUARTILE': 4,
                };

                contributions.push({
                    date: day.date,
                    count: day.contributionCount,
                    level: levelMap[day.contributionLevel] || 0,
                });
            }
        }

        return res.status(200).json({
            total: { [targetYear]: calendar.totalContributions },
            contributions,
        });
    } catch (error) {
        console.error('GitHub API error:', error);
        return res.status(500).json({ error: 'Failed to fetch contributions' });
    }
}
