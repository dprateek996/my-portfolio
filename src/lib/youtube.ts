
export const getLatestVideo = async () => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

    if (!API_KEY || !PLAYLIST_ID) {
        return null;
    }

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=1&key=${API_KEY}`
    );

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    const item = data.items[0]?.snippet;

    if (!item) return null;

    return {
        title: item.title,
        channel: item.videoOwnerChannelTitle,
        thumbnail: item.thumbnails.medium.url,
        link: `https://www.youtube.com/watch?v=${item.resourceId.videoId}`,
        publishedAt: item.publishedAt,
    };
};
