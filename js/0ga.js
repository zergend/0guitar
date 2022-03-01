// import Plyr as Plyr from './plyr.js';

// const player = new Plyr('#player');
let startTime = 254;
let endTime = 264;

const player = new Plyr(document.getElementById('player'));


const btn = document.querySelector('.btn__video');

const check = document.querySelector('.check__loop');

function goLoad() {
    btn.textContent = 'Как играется';
    btn.style.marginLeft = (startTime / player.duration) * 100 + '%';
    btn.style.width = ((endTime - startTime) / player.duration) * 100 + '%';
}

window.addEventListener('load', goLoad);


function goPlay() {
    player.currentTime = startTime; // теперь о том как она играется (спокойная ночь)
    player.muted = false;

    player.play(); // Start playback
}

btn.addEventListener('click', goPlay);

player.on('timeupdate', (event) => {

    if (check.checked) {
        if (player.currentTime >= endTime) {
            player.currentTime = startTime;

            player.play();
        }
    } else {
        if (player.currentTime >= endTime) player.pause();
    }
});