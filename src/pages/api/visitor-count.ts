import { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        console.error('Redis credentials missing in .env.local');
        return res.status(200).json({ count: 0 });
    }

    if (req.method === 'GET') {
        try {
            const count = await redis.get('portfolio:visitor_count');
            res.status(200).json({ count: count || 0 });
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            res.status(200).json({ count: 0 });
        }
    } else if (req.method === 'POST') {
        try {
            const count = await redis.incr('portfolio:visitor_count');
            res.status(200).json({ count });
        } catch (error) {
            console.error('Error incrementing visitor count:', error);
            res.status(200).json({ count: 0 });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
