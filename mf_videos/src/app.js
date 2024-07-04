const apiUrl = 'http://localhost:3000/api/videos';

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', async () => {
            const query = document.getElementById('search-input').value;
            if (query.trim() !== "") {
                try {
                    const response = await fetch(`${apiUrl}?q=${query}`);
                    const data = await response.json();
                    displayVideos(data.items);
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }
            }
        });
    }
    
    loadTrendingVideos();

    async function loadTrendingVideos() {
        try {
            const response = await fetch(`${apiUrl}?q=trending`);
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error('Error fetching trending videos:', error);
        }
    }

    const displayVideos = (videos) => {
        const videoList = document.getElementById('video-list');
        if (videoList) {
            videoList.innerHTML = '';

            if (videos && videos.length > 0) {
                videos.forEach(video => {
                    const videoItem = document.createElement('div');
                    videoItem.classList.add('video-item');

                    const isFavorite = checkIfFavorite(video.id.videoId);

                    videoItem.innerHTML = `
                        <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                        <span class="favorite-btn" data-video-id="${video.id.videoId}">${isFavorite ? '★' : '☆'}</span>
                    `;

                    videoItem.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
                    videoList.appendChild(videoItem);
                });
            } else {
                videoList.innerHTML = '<p>No videos found</p>';
            }
        }
    };

    const toggleFavorite = (event) => {
        const videoId = event.target.getAttribute('data-video-id');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log("Id do video" + videoId)
        if (favorites.includes(videoId)) {
            const index = favorites.indexOf(videoId);
            favorites.splice(index, 1);
            event.target.textContent = '☆'; // Change to unfilled star
            console.log("removendo estrela => "+ favorites)
            
        } else {
            favorites.push(videoId);
            event.target.textContent = '★'; // Change to filled star
            console.log("colocando estrela => "+ favorites)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(localStorage)
        updateVideoFavoritesCount();
    };

    const checkIfFavorite = (videoId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(videoId);
    };

    const updateVideoFavoritesCount = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        window.parent.postMessage({
            type: 'UPDATE_FAVORITES_COUNT',
            count: favorites.length
        }, "http://localhost:8082");
        console.log("Numero de favoritos" + favorites.length)
    };

    updateVideoFavoritesCount();

    localStorage.clear()
});
