// import Plyr as Plyr from './plyr.js';

// const player = new Plyr('#player');

const player = new Plyr(document.getElementById('player'));

const btn = document.querySelector('.btn__video');
const check = document.querySelector('.check__loop');

btn.textContent = 'Как играется';

function goPlay() {

    player.currentTime = 254; // теперь о том как она играется (спокойная ночь)
    player.muted = false;

    player.play(); // Start playback
}

btn.addEventListener('click', goPlay);

player.on('timeupdate', (event) => {

    if (check.checked) {
        if (player.currentTime >= 264) {
            player.currentTime = 254;

            player.play();
        }
    } else {
        if (player.currentTime >= 264) player.pause();
    }
});