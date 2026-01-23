import type { NextApiRequest, NextApiResponse } from 'next';
import { getStats } from '../../lib/wakatime';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Set Cache-Control headers to ensure fresh data
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=60, stale-while-revalidate=300'
        );

        const statsData = await getStats();

        if (!statsData || !statsData.data || statsData.data.length === 0) {

            return res.status(200).json({
                isActive: false,
                hours: '0 hrs',
                dateLabel: 'today',
                topLanguages: []
            });
        }

        // summaries endpoint returns data as an array
        const summaries = statsData.data;
        let activeDay = summaries[summaries.length - 1]; // Default to today

        // Find the last day with activity if today is empty
        // We iterate backwards from the latest day
        for (let i = summaries.length - 1; i >= 0; i--) {
            if ((summaries[i].grand_total?.total_seconds || 0) > 0) {
                activeDay = summaries[i];
                break;
            }
        }

        const data = activeDay;

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

        // Determine date label
        let dateLabel = 'today';
        if (data.range?.date) {
            const today = new Date().toISOString().split('T')[0];
            const activeDate = data.range.date;

            if (activeDate !== today) {
                const todayDate = new Date(today);
                const activityDate = new Date(activeDate);
                const diffTime = Math.abs(todayDate.getTime() - activityDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    dateLabel = 'yesterday';
                } else {
                    dateLabel = activityDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
            }
        }

        // Get top 3 languages
        const topLanguages = (data.languages || [])
            .slice(0, 3)
            .map((lang: { name: string; percent: number }) => ({
                name: lang.name,
                percent: Math.round(lang.percent),
            }));

        // Check if coding now (heartbeat in last 15 minutes)
        // logic: if showing today's stats and seconds > 0, we can assume active? 
        // Actually the previous logic was just `totalSeconds > 0`. 
        // But "isActive" implies "currently coding". 
        // WakaTime API doesn't strictly give "currently coding" status in summaries. 
        // Usually you'd check heartbeats for "isActive". 
        // But for this purpose, let's keep it simple: if showing today and > 0, maybe?
        // Wait, the original code had: `const isActive = totalSeconds > 0;`. 
        // This likely just meant "has coded today". 
        // If we are showing YESTERDAY's data, we probably shouldn't show the "Coding" (active) indicator/animation.

        const isToday = data.range?.date === new Date().toISOString().split('T')[0];
        const isActive = isToday && totalSeconds > 0;

        return res.status(200).json({
            isActive,
            hours: timeDisplay,
            dateLabel,
            topLanguages,
        });
    } catch (error) {
        console.error('WakaTime API error:', error);
        return res.status(200).json({
            isActive: false,
            hours: '0 hrs',
            dateLabel: 'today',
            topLanguages: []
        });
    }
}
