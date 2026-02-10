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

    // Helper to fetch from third-party API
    const fetchFromFallback = async () => {
        try {
            const response = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${targetYear}`
            );
            
            if (!response.ok) {
                throw new Error(`Fallback API error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Fallback API error:', error);
            // If even fallback fails, return a 0-filled response to prevent UI from breaking
            return res.status(200).json({
                total: { [targetYear]: 0 },
                contributions: []
            });
        }
    };

    if (!token) {
        return fetchFromFallback();
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
            console.warn('GitHub GraphQL errors, trying fallback:', data.errors);
            return fetchFromFallback();
        }

        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            console.warn('No contribution data found via GraphQL, trying fallback');
            return fetchFromFallback();
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
        console.error('GitHub API error, trying fallback:', error);
        return fetchFromFallback();
    }
}
