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
const progressBar = document.getElementById('progress'); // Barra de progresso
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumCover = document.getElementById('album-cover');
const songLength = document.getElementById('song-length'); // Tempo da música

if (playPauseButton && prevButton && nextButton) {
    let audio = new Audio(); // Inicializa o objeto de áudio
    let currentSongIndex = 0; // Índice da música atual
    const songs = [
        {
            title: "New Brain",
            artist: "Skye Riley",
            album_cover: "https://cdn.glitch.global/ed9bb939-dcf1-4423-8ca5-56e3b4ceb695/OIP.jpeg?v=1733705020179",
            audio: "https://cdn.glitch.global/ed9bb939-dcf1-4423-8ca5-56e3b4ceb695/New_Brain_performed_by_Naomi_Scott_%5B_YTBMP3.org_%5D.mp3?v=1733705309475",
            format: "mp3",
            length: "3:04"
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            album_cover: "cover2.jpg",
            audio: "song2.ogg",
            format: "ogg",
            length: "4:15"
        }
        // Adicione mais músicas conforme necessário
    ];

    // Função para carregar uma música
    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.audio;
        audio.load(); // Carrega a música
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumCover.src = song.album_cover;
        songLength.textContent = song.length;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Resetando o botão de play/pause
        progressBar.value = 0; // Reseta a barra de progresso
        console.log(`Carregando: ${song.title} - ${song.artist}`);
    }

    // Carregar a primeira música
    loadSong(currentSongIndex);

    // Lógica do botão de Play/Pause
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Lógica para tocar a música anterior
    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Atualiza o índice para a música anterior
        loadSong(currentSongIndex);
        audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
    });

    // Lógica para tocar a próxima música
    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Atualiza o índice para a próxima música
        loadSong(currentSongIndex);
        audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
    });

    // Atualizando a barra de progresso enquanto a música toca
    audio.addEventListener('timeupdate', () => {
        if (!audio.paused) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
        }
    });

    // Atualizando o progresso ao clicar na barra de progresso
    progressBar.addEventListener('input', () => {
        const progress = progressBar.value;
        audio.currentTime = (progress / 100) * audio.duration;
    });

} else {
    console.error('Um ou mais botões de controle de música não foram encontrados.');
}
