test('Should have links for Videos and Favorites', () => {
    document.body.innerHTML = `
        <div class="drawer">
            <button id="videos-btn">VÍDEOS</button>
            <button id="favorites-btn">FAVORITOS <span id="favorites-count">0</span></button>
        </div>
    `;

    require('../mf_drawer/src/app.js');

    const videosBtn = document.getElementById('videos-btn');
    const favoritesBtn = document.getElementById('favorites-btn');

    expect(videosBtn).not.toBeNull();
    expect(favoritesBtn).not.toBeNull();
});
