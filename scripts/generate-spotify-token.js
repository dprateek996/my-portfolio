/*
 * Spotify Refresh Token Generator
 * 
 * Instructions:
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create an app or use existing one
 * 3. Add "http://localhost:3000/callback" to Redirect URIs in settings
 * 4. Get Client ID and Client Secret
 * 5. Run this script: node scripts/generate-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
// const querystring = require('node:querystring'); 
const { spawn } = require('child_process');

// polyfill fetch if needed (Node 18+ has it)
// const fetch = ... 

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.log('Usage: node scripts/generate-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>');
    process.exit(1);
}

const SCOPES = 'user-read-currently-playing user-read-recently-played';

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');

        if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Got the code! Check your terminal.</h1>');
            server.close();

            console.log('\nReceived Authorization Code. Exchanging for tokens...\n');

            try {
                const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
                const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${basic}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code,
                        redirect_uri: REDIRECT_URI,
                    }),
                });

                const data = await tokenRes.json();

                if (data.error) {
                    console.error('Error exchanging token:', data);
                } else {
                    console.log('---------------------------------------------------');
                    console.log('SUCCESS! Here is your Refresh Token:');
                    console.log('\n' + data.refresh_token + '\n');
                    console.log('---------------------------------------------------');
                    console.log('Add this to your .env.local file as:');
                    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
                    console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
                    console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
                }
                process.exit(0);

            } catch (err) {
                console.error('Failed to fetch tokens', err);
                process.exit(1);
            }
        }
    }
});

server.listen(3000, () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

    console.log('---------------------------------------------------');
    console.log('Please open the following URL in your browser to authorize:');
    console.log('\n' + authUrl + '\n');
    console.log('---------------------------------------------------');
    console.log('Waiting for callback at http://localhost:3000/callback ...');

    // Try to open automatically
    spawn('open', [authUrl]).on('error', () => {
        // Ignore error if open fails (e.g. on Linux without xdg-open)
    });
});
