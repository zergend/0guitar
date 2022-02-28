// import Plyr as Plyr from './plyr.js';

// const player = new Plyr('#player');

const player = new Plyr(document.getElementById('player'));

const btn = document.querySelector('.btn__video');

btn.textContent = 'Как играется';

function goPlay() {
    // console.log(player);
    // player.fullscreen.enter(); // Enter fullscreen

    player.currentTime = 254;
    player.muted = false;

    player.play(); // Start playback



    // player.forward(253); // теперь о том как она играется (спокойная ночь)
}

btn.addEventListener('click', goPlay);

player.on('timeupdate', (event) => {
    if (player.currentTime >= 360) player.pause();
});