const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_API = 'https://wakatime.com/api/v1';

const headers = {
    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY || '').toString('base64')}`,
};

export const getStats = async () => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Get date 7 days ago
    const startObj = new Date();
    startObj.setDate(startObj.getDate() - 7);
    const start = startObj.toISOString().split('T')[0];

    const response = await fetch(
        `${WAKATIME_API}/users/current/summaries?start=${start}&end=${today}`,
        { headers }
    );

    return response.json();
};

export const getCurrentActivity = async () => {
    const response = await fetch(`${WAKATIME_API}/users/current/heartbeats`, {
        headers,
    });

    return response.json();
};
