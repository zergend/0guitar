// import Plyr from './plyr.js';
// todo: ! если после выбора фрагмента и начала воспроизведения щёлкаем вне его
// todo: ! а потом опять выбираем фрагмент, по завершении фрагмента не ставится пауза
// todo: ! если фрагмент щелкнуть 2-й раз, то всё нормально.

//!!
// const controls = `
// <div class="plyr__controls">
//     <button type="button" class="plyr__control" data-plyr="restart">
//         <svg role="presentation"><use xlink:href="#plyr-restart"></use></svg>
//         <span class="plyr__tooltip" role="tooltip">Restart</span>
//     </button>
//     <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
//         <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
//         <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
//         <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
//         <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
//     </button>
//     <div class="plyr__progress">
//         <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
//         <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
//         <span role="tooltip" class="plyr__tooltip">00:00</span>
//     </div>
//     <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
//     <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
//     <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
//         <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
//         <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
//         <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
//         <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
//     </button>
//     <div class="plyr__volume">
//         <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
//     </div>
//     <button type="button" class="plyr__control" data-plyr="captions">
//         <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
//         <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
//         <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
//         <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
//     </button>
//     <button type="button" class="plyr__control" data-plyr="fullscreen">
//         <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
//         <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
//         <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
//         <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
//     </button>
// </div>
// `;

// Setup the player
// const playerNew = new Plyr('#player-0', { controls });
const player = new Plyr(document.getElementById('player'), {
    infertTime: false,
});

// const player = new Plyr('#player');
let fragmentsArr = [
    { start: 4.5, stop: 250, desc: 'Исполнение' },
    { start: 254, stop: 359.5, desc: 'Вступление' },
    { start: 256, stop: 265, desc: '00' },
    { start: 265, stop: 346.5, desc: 'разбор' },
    { start: 347, stop: 359.3, desc: '00' },];

let startTime = 0;
let endTime = 1;
let theEnd = 0;
let insideFragment = true;

// ! local storage
// function setLocalStorage() {
//     localStorage.setItem('records', JSON.stringify(records));
//     localStorage.setItem('bestMoves', bestMoves);
//     localStorage.setItem('bestTime', bestTime);
// }
// window.addEventListener('beforeunload', setLocalStorage);

// function getLocalStorage() {
//     if (localStorage.getItem('records')) {
//         records = JSON.parse(localStorage.getItem('records'));
//     }
//     if (localStorage.getItem('bestMoves')) {
//         bestMoves = localStorage.getItem('bestMoves');
//     }
//     if (localStorage.getItem('bestTime')) {
//         bestTime = localStorage.getItem('bestTime');
//     }
// }
// window.addEventListener('load', getLocalStorage);


// !!! 
// const player = new Plyr(document.getElementById('player'));
const fragDiv = document.querySelector('.fragments');

const check = document.querySelector('.check__loop');

function goLoad() {
    startTime = 0;
    endTime = player.duration;
    theEnd = endTime;

    fragmentsArr.forEach((f, i) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('btn-container');
        fragDiv.append(itemDiv);
        const itemSpan = document.createElement('span');
        itemSpan.classList.add('btn');
        itemSpan.classList.add('btn__video');
        itemSpan.classList.add('fragment');
        itemSpan.classList.add('fragment-' + i);
        itemSpan.textContent = f.desc;
        itemSpan.style.marginLeft = (f.start / player.duration) * 100 + '%';
        itemSpan.style.width = ((f.stop - f.start) / player.duration) * 100 + '%';
        itemDiv.append(itemSpan);
    });

    const btnF = document.querySelectorAll('.fragment');
    btnF.forEach((fr, idx) =>
        fr.addEventListener('click', function (e) {
            startTime = fragmentsArr[idx].start;
            endTime = fragmentsArr[idx].stop;
            theEnd = endTime;
            insideFragment = true;
            goPlay();
        })
    );


}

window.addEventListener('load', goLoad);


function goPlay() {
    player.currentTime = startTime;
    // theEnd = endTime;
    player.muted = false;
    player.play(); // Start playback
}

player.on('timeupdate', (event) => {

    // if ((player.currentTime < (startTime - 2)) || (player.currentTime > (endTime + 2))) insideFragment = false;

    // // if ((theEnd > startTime) && (theEnd < endTime)) theEnd = endTime;
    // // if (player.currentTime > (endTime + 5) || player.currentTime < startTime) theEnd = player.duration;

    // if (!insideFragment) theEnd = player.duration;
    // if (insideFragment) theEnd = endTime;

    if (check.checked) {
        if (player.currentTime >= theEnd) {
            player.currentTime = startTime;

            player.play();
        }
    } else {
        if (player.currentTime >= theEnd) player.pause();
    }
});