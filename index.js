const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: './assets/music/cold mess.mp3',
        displayName: 'Cold Mess',
        cover: './assets/img/cold mess.jpg',
        artist: 'Prateek Kuhad',
    },
    {
        path: 'assets/music/riha.mp3',
        displayName: 'Riha',
        cover: 'assets/riha.jpg',
        artist: 'Anuv Jain',
    },
    {
        path: 'assets/music/rangi saari.mp3',
        displayName: 'Rangi Saari',
        cover: 'assets/img/rangi saari.jpg',
        artist: 'Kavita Seth, Kanishk Seth',
    },
    {
        path: 'assets/music/kahaani.mp3',
        displayName: 'Kahaani',
        cover: 'assets/img/kahaani.jpg',
        artist: 'When Chai Met Toast',
    },
    {
        path: 'assets/music/aaftaab.mp3',
        displayName: 'Aaftaab',
        cover: 'assets/img/aaftaab.jpg',
        artist: 'The Local Train',
    },
    {
        path: 'assets/music/kya pata.mp3',
        displayName: 'Kya Pata',
        cover: 'assets/img/kya pata.jpg',
        artist: 'Osho Jain',
    },
    {
        path: 'assets/music/sun lo na (raw).mp3',
        displayName: 'Sun Lo Na',
        cover: 'assets/img/sun lo na (raw).jpg',
        artist: 'Suzoon',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);