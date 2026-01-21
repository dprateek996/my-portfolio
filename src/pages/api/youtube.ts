import type { NextApiRequest, NextApiResponse } from 'next';
import { CURRENTLY_LEARNING } from '@/data/portfolio';

// Keywords that indicate educational content
// Keywords that indicate educational/relevant content
const EDUCATIONAL_KEYWORDS = [
    // Core Types
    "tutorial", "course", "learn", "guide", "lecture", "build", "demo",
    "explained", "introduction", "crash course", "how to", "walkthrough",
    "podcast", "breakdown", "analysis", "deep dive", "interview", "talk",
    "conference", "keynote", "workshop", "masterclass",

    // Topics
    "coding", "programming", "system design", "architecture", "software",
    "engineering", "development", "web", "mobile", "app", "cloud", "devops",
    "backend", "frontend", "full stack", "ai", "ml", "data", "algorithm",

    // Tech
    "react", "next.js", "node", "go", "rust", "java", "python", "css",
    "html", "javascript", "typescript", "aws", "docker", "kubernetes",
    "linux", "database", "sql", "nosql", "redis", "kafka"
];

const isEducational = (title: string, description: string): boolean => {
    const text = (title + " " + description).toLowerCase();
    return EDUCATIONAL_KEYWORDS.some(keyword => text.includes(keyword));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

    if (!API_KEY || !PLAYLIST_ID) {
        return res.status(200).json(CURRENTLY_LEARNING);
    }

    try {
        // Set Cache-Control headers to ensure fresh data
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=60, stale-while-revalidate=300'
        );

        // 1. Fetch the last 10 videos from the playlist
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('YouTube API failed');
        }

        const data = await response.json();
        const items = data.items || [];

        // 2. Find the first video that matches educational keywords
        const educationalVideo = items.find((item: any) => {
            const { title, description } = item.snippet;
            // Filter out "Private" or "Deleted" videos
            if (title === "Private video" || title === "Deleted video") return false;

            return isEducational(title, description);
        });

        // 3. Keep the "first" video if none match (fallback), or use the matched one
        // If the *latest* video (items[0]) is not educational, but is very recent (e.g. same day),
        // we might want to show it? Use the user's preference for educational.
        // For now, let's prioritize the educational video found.
        // If no educational video found, use the latest (items[0]).

        let targetVideo = educationalVideo ? educationalVideo.snippet : items[0]?.snippet;

        // If the latest video is DIFFERENT from the educational one, check if the latest is "New"
        // Sometimes keywords miss. If items[0] is the latest upload, users usually expect it.
        // Let's rely on the educational filter primarily, but if the user complains "not reflecting",
        // it might be that the new video failed the filter.
        // To be safe and responsive: If we have ANY items, use the 0th item as a fallback for sure.

        // Debug/Strictness Relaxation:
        // Use the absolute latest video if no educational match found OR if the educational match is really old?
        // Let's just stick to: Educational > Latest.

        // However, since the user is currently debugging "new video not showing", 
        // I will temporarily force checking the first video again or assume it's valid.
        // Actually, let's just use the logic:
        // If we found an educational video, use it.
        // If NOT, use items[0].

        // But what if items[0] IS the new video and it failed the filter?
        // And educationalVideo is some old video at index 5.
        // Detailed check:
        // If items[0] exists and is NOT the educationalVideo, and is recent?

        if (items[0]) {
            const latest = items[0].snippet;
            // If we have an educational video that is NOT the latest one,
            // it means the latest one failed the filter.
            // If the user wants to see "new" stuff, we might want to show `latest`.
            // Let's use `items[0]` if `educationalVideo` is undefined.
            // But if `educationalVideo` is defined (old video), we show it. 
            // This is the "problem".

            // FIX: If the latest video is very new ( < 2 days ), show it regardless of keywords.
            const isLatestVeryNew = new Date(latest.publishedAt).getTime() > Date.now() - 2 * 24 * 60 * 60 * 1000;
            if (isLatestVeryNew) {
                targetVideo = latest;
            }
        }

        if (!targetVideo) {
            return res.status(200).json(CURRENTLY_LEARNING);
        }

        const videoData = {
            title: targetVideo.title,
            channel: targetVideo.videoOwnerChannelTitle,
            thumbnail: targetVideo.thumbnails.medium?.url || targetVideo.thumbnails.default?.url,
            link: `https://www.youtube.com/watch?v=${targetVideo.resourceId.videoId}`,
            publishedAt: targetVideo.publishedAt,
            progress: 45, // steady state illusion
            watching: true
        };

        res.status(200).json(videoData);

    } catch (error) {
        console.error("YouTube API Error:", error);
        res.status(200).json(CURRENTLY_LEARNING);
    }
}
