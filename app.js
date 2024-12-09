      document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLightTheme = document.body.classList.contains('light-theme');
            document.getElementById('theme-toggle').textContent = isLightTheme ? 'Dark Mode' : 'Light Mode';
        });

        const playPauseButton = document.getElementById('play-pause');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const progressBar = document.getElementById('progress');

        if (playPauseButton && prevButton && nextButton && progressBar) {
            let audio = new Audio();
            let currentSongIndex = 0;
            const songs = [
                {
                    title: "New Brain",
                    artist: "Skye Riley",
                    album_cover: "https://cdn.glitch.global/ed9bb939-dcf1-4423-8ca5-56e3b4ceb695/OIP.jpeg?v=1733705020179",
                    audio: "https://cdn.glitch.global/ed9bb939-dcf1-4423-8ca5-56e3b4ceb695/New_Brain_performed_by_Naomi_Scott_%5B_YTBMP3.org_%5D.mp3?v=1733705309475",
                    length: "3:04",
                    icon: "https://cdn.glitch.global/ed9bb939-dcf1-4423-8ca5-56e3b4ceb695/30ba4cfd-ab3e-47a6-9e52-f15fd873f41a.image.png?v=1733705376349",
                    canvas: "canvas1.mp4"
                },
                {
                    title: "Song 2",
                    artist: "Artist 2",
                    album_cover: "cover2.jpg",
                    audio: "song2.ogg",
                    length: "4:15",
                    icon: "artist2.jpg",
                    canvas: "canvas2.mp4"
                }
            ];

            function loadSong(songIndex) {
                const song = songs[songIndex];
                audio.src = song.audio;
                audio.load();

                // Atualizando os detalhes da música
                document.getElementById('album-cover').src = song.album_cover;
                document.getElementById('song-title').textContent = song.title;
                document.getElementById('song-artist').textContent = song.artist;
                document.getElementById('song-length').textContent = song.length;

                // Carregar o vídeo (canvas)
                const canvasVideo = document.getElementById('canvas-video');
                canvasVideo.src = song.canvas;
                canvasVideo.load();
                canvasVideo.play();

                // Resetando a barra de progresso
                progressBar.value = 0;
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            }

            loadSong(currentSongIndex);

            playPauseButton.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
                    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            prevButton.addEventListener('click', () => {
                currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                loadSong(currentSongIndex);
                audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
            });

            nextButton.addEventListener('click', () => {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                loadSong(currentSongIndex);
                audio.play().catch(error => console.error('Erro ao reproduzir o áudio:', error));
            });

            // Atualizando a barra de progresso enquanto a música toca
            audio.ontimeupdate = () => {
                if (!audio.paused) {
                    const progress = (audio.currentTime / audio.duration) * 100;
                    progressBar.value = progress;
                }
            };

            // Permitindo que o usuário mude a posição da música
            progressBar.addEventListener('input', () => {
                const newTime = (progressBar.value / 100) * audio.duration;
                audio.currentTime = newTime;
            });
        } else {
            console.error('Um ou mais botões de controle de música não foram encontrados.');
        }
