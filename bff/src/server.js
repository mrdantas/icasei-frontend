const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Adicionando CORS
const app = express();
const port = 3000;

const YOUTUBE_API_KEY = 'AIzaSyAbKu1jbe3R6MhpYyi3ICcnt4saumHWPwE';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const cache = {};
const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

app.use(cors()); // Usando CORS

app.get('/api/videos', async (req, res) => {
    const query = req.query.q;
    const cacheKey = `videos_${query}`;

    if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_DURATION)) {
        return res.json(cache[cacheKey].data);
    }

    const url = `${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&q=${query}&part=snippet&type=video&maxResults=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.statusText}`);
        }
        const data = await response.json();
        cache[cacheKey] = {
            timestamp: Date.now(),
            data: data
        };
        res.json(data);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
