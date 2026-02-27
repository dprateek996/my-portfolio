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

    // Helper to scrape directly from github user page if token fails or third-party api goes down
    const fetchFromFallback = async () => {
        try {
            const url = `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${targetYear}-01-01&to=${targetYear}-12-31`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`GitHub HTML fetch error: ${response.statusText}`);
            }

            const html = await response.text();

            const contributions: ContributionDay[] = [];
            let total = 0;

            // Regex to parse the contribution graph cells
            const tdRegex = /<td\s[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g;
            let match;

            while ((match = tdRegex.exec(html)) !== null) {
                const [, date, id, levelStr] = match;
                const level = parseInt(levelStr, 10) || 0;

                let count = 0;
                const tooltipRegex = new RegExp(`<tool-tip[^>]*for="${id}"[^>]*>([^<]+)</tool-tip>`);
                const tooltipMatch = html.match(tooltipRegex);

                if (tooltipMatch) {
                    const text = tooltipMatch[1];
                    if (!text.startsWith('No contributions')) {
                        const countMatch = text.match(/^(\d+)\s+contribution/);
                        if (countMatch) {
                            count = parseInt(countMatch[1], 10);
                            total += count;
                        }
                    }
                }

                contributions.push({ date, count, level });
            }

            if (contributions.length === 0) {
                throw new Error("No contribution data parsed from HTML");
            }

            return res.status(200).json({
                total: { [targetYear]: total },
                contributions
            });
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
