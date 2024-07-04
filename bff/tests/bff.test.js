const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');

test('Should fetch videos from YouTube API', async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify({ items: [] })));
    const res = await fetch('http://localhost:3000/api/videos?q=test');
    const data = await res.json();
    expect(data.items).toBeDefined();
});
