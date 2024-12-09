document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

const audio = new Audio();

document.getElementById('play-pause').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
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
