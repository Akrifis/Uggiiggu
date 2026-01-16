// Загрузка списка аниме из другого репозитория
const ANIME_LIST_URL = 'https://raw.githubusercontent.com/[ваш-username]/re-voice-anime-list/main/anime-list.json';

async function loadAnimeList() {
    try {
        const response = await fetch(ANIME_LIST_URL);
        const animeList = await response.json();
        displayAnime(animeList);
        setupSearch(animeList);
    } catch (error) {
        console.error('Ошибка загрузки списка аниме:', error);
        document.getElementById('animeContainer').innerHTML = `
            <div class="error">
                <p>Не удалось загрузить список аниме</p>
                <button onclick="loadAnimeList()">Попробовать снова</button>
            </div>
        `;
    }
}

function displayAnime(animeList) {
    const container = document.getElementById('animeContainer');
    container.innerHTML = '';

    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.poster}" alt="${anime.title}" class="anime-poster" 
                 onerror="this.src='https://via.placeholder.com/250x300/1a1a2e/ffffff?text=No+Image'">
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <p class="anime-description">${anime.description}</p>
                <div class="anime-meta">
                    <span><i class="fas fa-star"></i> ${anime.rating}</span>
                    <span><i class="fas fa-calendar"></i> ${anime.year}</span>
                </div>
                <button class="watch-btn" onclick="loadPlayer(${anime.id})">
                    <i class="fas fa-play"></i> Смотреть
                </button>
            </div>
        `;
        container.appendChild(animeCard);
    });
}

function setupSearch(animeList) {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredAnime = animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchTerm) ||
            anime.description.toLowerCase().includes(searchTerm) ||
            anime.genre.some(g => g.toLowerCase().includes(searchTerm))
        );
        displayAnime(filteredAnime);
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function loadPlayer(animeId) {
    const playerSection = document.querySelector('.player-placeholder');
    playerSection.innerHTML = `
        <h3>Загрузка плеера...</h3>
        <p>Плеер Codec настроен для воспроизведения</p>
        <div class="player-controls">
            <button onclick="showPlayerDemo()">
                <i class="fas fa-play"></i> Демо воспроизведения
            </button>
        </div>
    `;
    
    // Прокрутка к плееру
    document.getElementById('player-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function showPlayerDemo() {
    const playerSection = document.querySelector('.player-placeholder');
    playerSection.innerHTML = `
        <h3><i class="fas fa-play-circle"></i> Плеер Codec</h3>
        <div class="demo-video">
            <video width="100%" controls>
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                Ваш браузер не поддерживает видео тег.
            </video>
        </div>
        <div class="player-info">
            <p>Плеер поддерживает форматы: MP4, WebM, HLS</p>
            <div class="quality-selector">
                <button>360p</button>
                <button class="active">720p</button>
                <button>1080p</button>
            </div>
        </div>
    `;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadAnimeList();
    
    // Добавляем стили для демо-плеера
    const style = document.createElement('style');
    style.textContent = `
        .demo-video {
            margin: 1rem 0;
            border-radius: 5px;
            overflow: hidden;
        }
        .quality-selector {
            display: flex;
            gap: 10px;
            margin-top: 1rem;
            justify-content: center;
        }
        .quality-selector button {
            padding: 5px 15px;
            border: 1px solid #ff4081;
            background: transparent;
            color: white;
            border-radius: 3px;
            cursor: pointer;
        }
        .quality-selector button.active {
            background: #ff4081;
        }
        .anime-meta {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            color: #aaa;
            font-size: 0.9rem;
        }
        .error {
            text-align: center;
            padding: 2rem;
            grid-column: 1 / -1;
        }
        .error button {
            margin-top: 1rem;
            padding: 10px 20px;
            background: #ff4081;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});
