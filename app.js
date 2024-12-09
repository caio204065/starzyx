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
const songList = document.getElementById('song-list'); // Supondo que você tenha uma lista de músicas no HTML

// Função para carregar as músicas do arquivo JSON
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    const songs = data; // Lista de músicas carregada do JSON
    let currentSongIndex = 0; // Índice da música atual

    // Função para carregar uma música
    function loadSong(songIndex) {
        const song = songs[songIndex];
        const audio = new Audio();
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
        const audio = new Audio();
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

    // Adicionando as músicas ao menu (supondo que você tenha um elemento para a lista de músicas)
    songs.forEach((song, index) => {
        const songItem = document.createElement('li');
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener('click', () => {
            loadSong(index);
            audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
        });
        songList.appendChild(songItem); // Adiciona a música à lista
    });

  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
