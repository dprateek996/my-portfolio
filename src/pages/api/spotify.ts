import type { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying, getRecentlyPlayed } from '../../lib/spotify';

interface SpotifyArtist {
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            // Not playing anything, fallback to recently played
            const recentlyPlayed = await getRecentlyPlayed();
            const recentData = await recentlyPlayed.json();

            // If no items found (rare edge case), return isPlaying: false
            if (!recentData.items || recentData.items.length === 0) {
                return res.status(200).json({ isPlaying: false });
            }

            const recentTrack = recentData.items[0].track;

            return res.status(200).json({
                isPlaying: false,
                title: recentTrack.name,
                artist: recentTrack.artists.map((_artist: SpotifyArtist) => _artist.name).join(', '),
                album: recentTrack.album.name,
                albumImageUrl: recentTrack.album.images[0].url,
                songUrl: recentTrack.external_urls.spotify,
                previewUrl: recentTrack.preview_url,
            });
        }

        const song = await response.json();

        if (song.item === null) {
            return res.status(200).json({ isPlaying: false });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: SpotifyArtist) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;
        const previewUrl = song.item.preview_url;

        return res.status(200).json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
            previewUrl,
        });
    } catch (error) {
        console.error('Error in Spotify API:', error);
        return res.status(200).json({ isPlaying: false });
    }
}
