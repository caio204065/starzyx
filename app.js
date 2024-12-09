// Função para carregar as músicas do arquivo JSON
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    const songs = data.songs; // Lista de músicas carregada do JSON
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

        // Aplicando as configurações de canva
        document.body.style.backgroundColor = song.canva.background_color;
        albumCover.style.position = song.canva.album_cover_position;
        songTitle.style.fontWeight = song.canva.song_title_style === 'bold' ? 'bold' : 'normal';
        songTitle.style.fontStyle = song.canva.song_title_style === 'italic' ? 'italic' : 'normal';
        albumCover.style.borderRadius = song.canva.album_cover_border_radius;

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
