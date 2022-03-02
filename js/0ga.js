// import Plyr from './plyr.js';

const player = new Plyr(document.getElementById('player'));

// const player = new Plyr('#player');
let fragmentsArr = [{ start: 254, stop: 264, desc: 'Вступление' }, { start: 300, stop: 320, desc: 'Куплет 1' }];
let startTime = 254;
let endTime = 264;

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


// const btn = document.querySelector('.btn__video');

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
        // console.log(itemSpan);
    });

    // btn.textContent = '> Как играется';
    // btn.style.marginLeft = (startTime / player.duration) * 100 + '%';
    // btn.style.width = ((endTime - startTime) / player.duration) * 100 + '%';
}

window.addEventListener('load', goLoad);


function goPlay() {
    player.currentTime = startTime; // теперь о том как она играется (спокойная ночь)
    player.muted = false;

    player.play(); // Start playback
}

// btn.addEventListener('click', goPlay);

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


const btnF = document.querySelectorAll('.fragment');

btnF.forEach((fr, idx) =>
    fr.addEventListener('click', function (e) {
        // let indexFragment = f.classList.find(item => item.indexOf("fragment-") != -1);
        console.log(fr, idx);

        // ? .fragment-4 

    })
);