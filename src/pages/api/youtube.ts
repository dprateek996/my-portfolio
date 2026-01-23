import type { NextApiRequest, NextApiResponse } from 'next';
import { CURRENTLY_LEARNING } from '@/data/portfolio';



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

        // Filter out "Private" or "Deleted" videos
        const validItems = items.filter((item: { snippet?: { title?: string } }) => {
            const title = item.snippet?.title;
            return title !== "Private video" && title !== "Deleted video";
        });

        // Get the LAST video from the playlist (most recently added)
        // YouTube adds new videos to the END of the playlist
        const lastItem = validItems[validItems.length - 1];
        const targetVideo = lastItem?.snippet;

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
