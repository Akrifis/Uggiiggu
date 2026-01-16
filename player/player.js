// Инициализация плеера
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const autoplayCheckbox = document.getElementById('autoplay');
    const subtitlesCheckbox = document.getElementById('subtitles');
    
    // Загрузка параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    
    if (videoUrl) {
        videoPlayer.src = videoUrl;
    } else {
        // Демо видео
        videoPlayer.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
    
    // Настройки автовоспроизведения
    autoplayCheckbox.addEventListener('change', function() {
        videoPlayer.autoplay = this.checked;
    });
    
    // Сохранение настроек в localStorage
    function saveSettings() {
        const settings = {
            autoplay: autoplayCheckbox.checked,
            subtitles: subtitlesCheckbox.checked
        };
        localStorage.setItem('playerSettings', JSON.stringify(settings));
    }
    
    function loadSettings() {
        const saved = localStorage.getItem('playerSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            autoplayCheckbox.checked = settings.autoplay;
            subtitlesCheckbox.checked = settings.subtitles;
            videoPlayer.autoplay = settings.autoplay;
        }
    }
    
    loadSettings();
    
    // Сохраняем настройки при изменении
    autoplayCheckbox.addEventListener('change', saveSettings);
    subtitlesCheckbox.addEventListener('change', saveSettings);
    
    // Сохраняем время просмотра
    videoPlayer.addEventListener('timeupdate', function() {
        if (videoUrl) {
            localStorage.setItem(`progress_${videoUrl}`, videoPlayer.currentTime);
        }
    });
    
    // Восстанавливаем время просмотра
    if (videoUrl) {
        const savedTime = localStorage.getItem(`progress_${videoUrl}`);
        if (savedTime) {
            videoPlayer.currentTime = parseFloat(savedTime);
        }
    }
    
    // Горячие клавиши
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
                break;
            case 'ArrowRight':
                videoPlayer.currentTime += 10;
                break;
            case 'ArrowLeft':
                videoPlayer.currentTime -= 10;
                break;
            case 'f':
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen();
                }
                break;
        }
    });
});
