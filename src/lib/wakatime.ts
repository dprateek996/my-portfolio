const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_API = 'https://wakatime.com/api/v1';

const headers = {
    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY || '').toString('base64')}`,
};

export const getStats = async () => {

    // Get tomorrow's date to ensure we cover all timezones (e.g. if user is ahead of UTC)
    const tomorrowObj = new Date();
    tomorrowObj.setDate(tomorrowObj.getDate() + 1);
    const tomorrow = tomorrowObj.toISOString().split('T')[0];

    // Get date 30 days ago to find previous sessions if user was inactive recently
    const startObj = new Date();
    startObj.setDate(startObj.getDate() - 7);
    const start = startObj.toISOString().split('T')[0];

    const response = await fetch(
        `${WAKATIME_API}/users/current/summaries?start=${start}&end=${tomorrow}`,
        {
            headers,
            cache: 'no-store'
        }
    );

    if (!response.ok) {
        return { data: [] };
    }

    return response.json();
};

export const getCurrentActivity = async () => {
    const response = await fetch(`${WAKATIME_API}/users/current/heartbeats`, {
        headers,
    });

    return response.json();
};
