import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { videoId } = req.query;

    if (!videoId || typeof videoId !== 'string') {
        return res.status(400).json({ error: 'videoId parameter is required' });
    }

    try {
        // Use youtubei.js to get audio stream
        const { Innertube } = await import('youtubei.js');
        const youtube = await Innertube.create();

        const info = await youtube.getInfo(videoId);

        // Get the best audio format
        const format = info.chooseFormat({ type: 'audio', quality: 'best' });

        if (!format || !format.decipher(youtube.session.player)) {
            return res.status(404).json({ error: 'No audio stream available' });
        }

        // Return the audio URL as JSON (client-side will handle playback)
        return res.status(200).json({
            audioUrl: format.url,
            title: info.basic_info.title,
            duration: info.basic_info.duration,
            quality: format.audio_quality,
        });
    } catch (error) {
        console.error('YouTube stream error:', error);
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Failed to get audio stream',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
