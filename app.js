document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    // Atualiza o texto do botão com base no tema atual
    const isLightTheme = document.body.classList.contains('light-theme');
    document.getElementById('theme-toggle').textContent = isLightTheme ? 'Dark Mode' : 'Light Mode';
});

// Certifique-se de que os elementos existam antes de adicionar os event listeners
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

if (playPauseButton && prevButton && nextButton) {
    const audio = new Audio(); // Inicializa o objeto de áudio

    playPauseButton.addEventListener('click', () => {
        if (audio.src === '') {
            alert('Nenhuma música carregada.');
            return;
        }

        if (audio.paused) {
            audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    prevButton.addEventListener('click', () => {
        console.log('Tocar música anterior');
        // Adicione a lógica para selecionar e carregar a música anterior no áudio
    });

    nextButton.addEventListener('click', () => {
        console.log('Tocar próxima música');
        // Adicione a lógica para selecionar e carregar a próxima música no áudio
    });
} else {
    console.error('Um ou mais botões de controle de música não foram encontrados.');
}

