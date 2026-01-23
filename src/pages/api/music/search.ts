import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {


        // Use youtubei.js to search YouTube Music
        const { Innertube } = await import('youtubei.js');
        const youtube = await Innertube.create();

        const musicSearch = await youtube.music.search(query, { type: 'song' });

        const results = musicSearch.contents;

        if (!results || results.length === 0) {
            console.error('No results found for query:', query);
            return res.status(404).json({ error: 'No results found' });
        }

        // results[0] is a MusicShelf, the actual songs are in its contents
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const musicShelf: any = results[0];
        const songs = musicShelf.contents;

        if (!songs || songs.length === 0) {
            console.error('No songs in shelf for query:', query);
            return res.status(404).json({ error: 'No results found' });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstSong: any = songs[0];

        // Extract data from the nested structure
        const videoId = firstSong.flex_columns?.[0]?.title?.endpoint?.payload?.videoId;
        const title = firstSong.flex_columns?.[0]?.title?.text || 'Unknown';
        const artist = firstSong.flex_columns?.[1]?.title?.runs?.[0]?.text || 'Unknown Artist';



        return res.status(200).json({
            videoId,
            title,
            artist,
            duration: 0,
        });
    } catch (error) {
        console.error('YouTube Music search error:', error);
        return res.status(500).json({ error: 'Failed to search for song' });
    }
}
