import type { NextApiRequest, NextApiResponse } from 'next';
import { getStats } from '../../lib/wakatime';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const statsData = await getStats();

        if (!statsData || !statsData.data || statsData.data.length === 0) {

            return res.status(200).json({
                isActive: false,
                hours: '0 hrs',
                topLanguages: []
            });
        }

        // summaries endpoint returns data as an array
        const data = statsData.data[0];

        // Calculate total seconds
        const totalSeconds = data.grand_total?.total_seconds || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        // Format time
        let timeDisplay = '0 hrs';
        if (hours > 0) {
            timeDisplay = `${hours}.${Math.floor((minutes / 60) * 10)} hrs`;
        } else if (minutes > 0) {
            timeDisplay = `${minutes} min`;
        }

        // Get top 3 languages
        const topLanguages = (data.languages || [])
            .slice(0, 3)
            .map((lang: any) => ({
                name: lang.name,
                percent: Math.round(lang.percent),
            }));

        // Check if coding now (heartbeat in last 15 minutes)
        const isActive = totalSeconds > 0;

        return res.status(200).json({
            isActive,
            hours: timeDisplay,
            topLanguages,
        });
    } catch (error) {
        console.error('WakaTime API error:', error);
        return res.status(200).json({
            isActive: false,
            hours: '0 hrs',
            topLanguages: []
        });
    }
}
