document.addEventListener('DOMContentLoaded', () => {
    const videos_btn = document.getElementById('videos-btn');
    const favorites_btn = document.getElementById('favorites-btn');

    if (favorites_btn) {
        favorites_btn.addEventListener('click', () => {
            window.parent.postMessage('reloadParent', window.location.origin);
            const favoritesCount = document.getElementById('favorites-count');
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favoritesCount.innerText = favorites.length;
        });
    }

    if (videos_btn) {
        videos_btn.addEventListener('click', () => {
            window.parent.location.href = "http://127.0.0.1:8082/";
            const videosContainer = window.parent.document.getElementById('videos-container');
            if (videosContainer) {
                videosContainer.style.display = 'none';
            }
        });
    }

    const updateDrawerFavoritesCount = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoritesCount = document.getElementById('favorites-count');
        if (favoritesCount) {
            favoritesCount.innerText = favorites.length;
        }
    };

    window.addEventListener('message', (event) => {
        if (event.origin !== "http://localhost:8081") return;
        if (event.data.type === 'UPDATE_FAVORITES_COUNT') {
            updateDrawerFavoritesCount();
        }
    });

    updateDrawerFavoritesCount();
});
