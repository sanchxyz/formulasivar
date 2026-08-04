/**
 * ============================================================================
 * RADIO FORMULA SIVAR - Reproductor (una sola pista)
 * ============================================================================
 */

const RADIO_TRACK = {
    artist: 'Formula Sivar',
    title: 'Transmisión en vivo',
    cover: 'assets/images/album_portada.png',
    audio: 'assets/radio_audio/audio-extraido.m4a'
};

const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const muteBtn = document.getElementById('muteBtn');
const cardArt = document.getElementById('cardArt');
const cardArtist = document.getElementById('cardArtist');
const cardSong = document.getElementById('cardSong');
const miniArt = document.getElementById('miniArt');
const miniArtist = document.getElementById('miniArtist');
const miniTitle = document.getElementById('miniTitle');
const eq = document.getElementById('eq');
const progressFill = document.getElementById('progressFill');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');

let isPlaying = false;

function loadTrack() {
    const t = RADIO_TRACK;
    cardArt.src = t.cover;
    cardArtist.textContent = t.artist;
    cardSong.textContent = t.title;
    miniArt.classList.add('visible');
    miniArtist.textContent = t.artist;
    miniTitle.textContent = t.title;
    if (t.audio) audio.src = t.audio;
}

function play() {
    audio.play().then(() => {
        isPlaying = true;
        playPause.classList.add('playing');
        eq.classList.add('active');
    }).catch(() => {});
}

function pause() {
    audio.pause();
    isPlaying = false;
    playPause.classList.remove('playing');
    eq.classList.remove('active');
}

function togglePlay() {
    if (audio.paused) {
        play();
    } else {
        pause();
    }
}

/* Formato de tiempo mm:ss */
function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

/* Refresca barra y tiempos aunque el audio esté en pausa */
function updateProgressUI() {
    const dur = audio.duration;
    if (!isFinite(dur) || dur <= 0) {
        progressFill.style.width = '0%';
        return;
    }
    const cur = audio.currentTime;
    progressFill.style.width = (cur / dur) * 100 + '%';
    timeCurrent.textContent = formatTime(cur);
    timeTotal.textContent = formatTime(dur - cur);
}

function seekBy(seconds) {
    const dur = audio.duration;
    if (!audio.src || !isFinite(dur) || dur <= 0) return;
    const target = audio.currentTime + seconds;
    audio.currentTime = Math.min(Math.max(target, 0), dur);
    updateProgressUI();
}

/* Eventos */
playPause.addEventListener('click', togglePlay);

rewindBtn.addEventListener('click', () => {
    seekBy(-5);
});

forwardBtn.addEventListener('click', () => {
    seekBy(5);
});

muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.classList.toggle('muted', audio.muted);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
        timeCurrent.textContent = formatTime(audio.currentTime);
        timeTotal.textContent = formatTime(audio.duration - audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
});

document.getElementById('year').textContent = new Date().getFullYear();

loadTrack();