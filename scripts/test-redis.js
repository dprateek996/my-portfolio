
const { Redis } = require('@upstash/redis');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Error loading .env.local:', result.error);
    process.exit(1);
}

console.log('Loaded env vars:', {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token_length: process.env.UPSTASH_REDIS_REST_TOKEN ? process.env.UPSTASH_REDIS_REST_TOKEN.length : 0
});

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function test() {
    try {
        console.log('Testing Redis connection...');
        const count = await redis.get('portfolio:visitor_count');
        console.log('Success! Current count:', count);

        // Optional: verify write access
        // const newCount = await redis.incr('portfolio:test_count');
        // console.log('Incremented test count:', newCount);
    } catch (error) {
        console.error('Redis connection failed:', error);
    }
}

test();
