
interface PlaylistItem {
    snippet: {
        title: string;
        videoOwnerChannelTitle: string;
        publishedAt: string;
        thumbnails: {
            medium: { url: string };
        };
        resourceId: {
            videoId: string;
        };
    };
}

export const getLatestVideo = async () => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

    if (!API_KEY || !PLAYLIST_ID) {
        return null;
    }

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`
    );

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    // Sort items by publishedAt date in descending order (newest first)
    const sortedItems = (data.items || []).sort((a: PlaylistItem, b: PlaylistItem) => {
        return new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime();
    });

    const item = sortedItems[0]?.snippet;

    if (!item) return null;

    return {
        title: item.title,
        channel: item.videoOwnerChannelTitle,
        thumbnail: item.thumbnails.medium.url,
        link: `https://www.youtube.com/watch?v=${item.resourceId.videoId}`,
        publishedAt: item.publishedAt,
    };
};
