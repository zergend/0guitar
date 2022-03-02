// import Plyr from './plyr.js';

const player = new Plyr(document.getElementById('player'));

// const player = new Plyr('#player');
let fragmentsArr = [
    { start: 4.5, stop: 250, desc: 'Исполнение' },
    { start: 254, stop: 364, desc: 'Вступление' }, 
    { start: 300, stop: 320, desc: 'Куплет 01' }];
let startTime = 0;
let endTime = 1;

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
            goPlay();
        })
    );
}

window.addEventListener('load', goLoad);


function goPlay() {
    player.currentTime = startTime;
    player.muted = false;
    player.play(); // Start playback
}

player.on('timeupdate', (event) => {

    theEnd = endTime;

    if (player.currentTime > (endTime + 5)) theEnd = player.duration;

    if (check.checked) {
        if (player.currentTime >= theEnd) {
            player.currentTime = startTime;

            player.play();
        }
    } else {
        if (player.currentTime >= theEnd) player.pause();
    }
});