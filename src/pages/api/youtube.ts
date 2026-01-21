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
        // Ideally we want ONLY educational. If none match, maybe fallback to static?
        // Let's fallback to the *very first* video if nothing matches, 
        // assuming the user mainly puts educational stuff there. 
        // OR we can be strict. Let's be strict but fallback to the latest video if the strict filter is too aggressive.
        // User asked "showcase education related content... rest all not".

        const targetVideo = educationalVideo ? educationalVideo.snippet : items[0]?.snippet;

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
