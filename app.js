document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

const audio = new Audio();

document.getElementById('play-pause').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        document.getElementById('play-pause').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        document.getElementById('play-pause').innerHTML = '<i class="fas fa-play"></i>';
    }
});

document.getElementById('prev').addEventListener('click', () => {
    // Lógica para tocar a música anterior
});

document.getElementById('next').addEventListener('click', () => {
    // Lógica para tocar a próxima música
});

document.querySelector('.progress-bar input').addEventListener('input', (e) => {
    audio.currentTime = (audio.duration / 100) * e.target.value;
});

document.querySelector('.volume-control input').addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function searchMusic() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = musicData.songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query));
    
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'search-result';
        div.innerHTML = `<img src="${result[_{{{CITATION{{{_1{](https://github.com/fireun/Masomon-Online-Shopping/tree/6fa264f2c43c095aa821a7eafd80b8ca66a77afe/user%2FcancellationRequest.php)
