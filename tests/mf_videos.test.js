test('Should search and display videos', async () => {
    document.body.innerHTML = `
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="Pesquisar">
            <button id="search-btn">🔍</button>
        </div>
        <div id="video-list" class="video-list"></div>
    `;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ items: [{ id: { videoId: '123' }, snippet: { title: 'Test Video' } }] }),
        })
    );

    require('../mf_videos/src/app.js');

    document.getElementById('search-input').value = 'test';
    document.getElementById('search-btn').click();

    await new Promise(r => setTimeout(r, 100)); // Wait for async operations to complete

    const videoList = document.getElementById('video-list');
    expect(videoList.children.length).toBeGreaterThan(0);
    expect(videoList.children[0].querySelector('iframe').src).toContain('123');
});
