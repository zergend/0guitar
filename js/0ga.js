// import Plyr from './plyr.js';
// todo: ! если после выбора фрагмента и начала воспроизведения щёлкаем вне его
// todo: ! а потом опять выбираем фрагмент, по завершении фрагмента не ставится пауза
// todo: ! если фрагмент щелкнуть 2-й раз, то всё нормально.

//!!
// Setup the player
// const playerNew = new Plyr('#player-0', { controls });
let startTime;
let endTime;
let theEnd = 0;
let insideFragment = true;

const player = new Plyr(document.getElementById('player'), {
    invertTime: false,
    controls: ['play-large', // The large play button in the center
        'restart',
        'play', // Play/pause playback
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'settings', // Settings menu
        'fullscreen',],
    keyboard: {
        global: true,
    },
});

// ! добавление фрагмента - управление
const btnStart = document.querySelector('.btn__start-setup-fragment');
const btnStop = document.querySelector('.btn__stop-setup-fragment');
const btnPlay = document.querySelector('.btn__play-setup-fragment');
const btnAdd = document.querySelector('.btn__add-setup-fragment');
const inputStart = document.querySelector('.input__fragment--start');
const inputStop = document.querySelector('.input__fragment--stop');
const inputDesc = document.querySelector('.input__description');


// const player = new Plyr('#player');
let fragmentsArr = [
    { start: 4.5, stop: 250, desc: 'Исполнение' },
    { start: 254, stop: 359.5, desc: 'Вступление' },
    { start: 256, stop: 265, desc: '00' },
    { start: 265, stop: 346.5, desc: 'разбор' },
    { start: 347, stop: 359.3, desc: '00' },
    { start: 360, stop: 441, desc: '1 куплет' },
    { start: 394, stop: 406.5, desc: '01' },
    { start: 418, stop: 442, desc: '02' },
    { start: 442.6, stop: 511.4, desc: 'припев' },
    { start: 511.5, stop: 594.8, desc: 'проигрыш?' },
    { start: 591, stop: 665, desc: '2 куплет' },
    { start: 684.5, stop: 777, desc: 'последний припев' },
    { start: 777.5, stop: 862, desc: 'соло (конец)' },];


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

function convertMS(ms) {
    var d, h, m, s;
    s = ms;
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    return h + ' : ' + m + ' : ' + Number(s.toFixed(1));
}

// !!! 
// const player = new Plyr(document.getElementById('player'));
// const pContainer = document.querySelector('.plyr-container');
// const fControls = document.querySelector('.fragments-control');
// const fContainer = document.querySelector('.fragment-container');
// const fragDiv = document.querySelector('.fragments');

const check = document.querySelector('.check__loop');

function addFragment(fStart, fStop, fDescription) {
    const fControls = document.querySelector('.fragments-control');
    const fContainer = document.createElement('div');
    fContainer.classList.add('fragment-container');
    fControls.append(fContainer);
    const btnPlayFragment = document.createElement('button');
    btnPlayFragment.classList.add('btn');
    btnPlayFragment.classList.add('btn__fragment');
    btnPlayFragment.classList.add('btn__play-fragment');
    btnPlayFragment.textContent = '▶';
    fContainer.append(btnPlayFragment);
    const fDiv = document.createElement('div');
    fDiv.classList.add('fragment-wrap');
    fContainer.append(fDiv);
    const btnDel = document.createElement('button');
    btnDel.classList.add('btn');
    btnDel.classList.add('btn__fragment');
    btnDel.classList.add('btn__del-fragment');
    btnDel.textContent = '▬';
    fContainer.append(btnDel);

    const itemSpan = document.createElement('span');
    itemSpan.classList.add('btn');
    itemSpan.classList.add('btn__video');
    itemSpan.classList.add('fragment');
    itemSpan.textContent = (fDescription.trim() == '') ? '???' : fDescription;
    itemSpan.title = itemSpan.textContent + ': ' + convertMS(fStart) + ' - ' + convertMS(fStop);
    itemSpan.style.marginLeft = (fStart / player.duration) * 100 + '%';
    itemSpan.style.width = ((fStop - fStart) / player.duration) * 100 + '%';
    fDiv.append(itemSpan);
}

function playFragment() {
    const btnF = document.querySelectorAll('.fragment');
    const btnP = document.querySelectorAll('.btn__play-fragment');
    const fCont = document.querySelectorAll('.fragment-container');
    let startFromClick;

    btnP.forEach((fr, idx) =>
        fr.addEventListener('click', function(e) {
            startTime = fragmentsArr[idx].start;
            endTime = fragmentsArr[idx].stop;
            
            theEnd = endTime;
            insideFragment = true;

            goPlay();
        })
    );

    btnF.forEach((fr, idx) =>
        fr.addEventListener('click', function (e) {
            startTime = fragmentsArr[idx].start;
            endTime = fragmentsArr[idx].stop;
            
            theEnd = endTime;
            insideFragment = true;

            startFromClick = player.duration * (startTime / player.duration + e.offsetX / fCont[idx].clientWidth);
            goPlay(startFromClick);
        })
    );
}

function delFragment() {
    const btnDel = document.querySelectorAll('.btn__del-fragment');
    const fCon = document.querySelectorAll('.fragment-container');

    btnDel.forEach((fr, idx) =>
        fr.addEventListener('click', function (e) {
            fCon[idx].remove();
            fragmentsArr.splice(idx, 1);
            playFragment();
        })
    );
    
}

function goLoad() {
    startTime = 0;
    endTime = player.duration;
    theEnd = endTime;

    fragmentsArr.forEach((f) => {
        addFragment(f.start, f.stop, f.desc);
    });

    playFragment();
    delFragment();

    inputStart.value = 0;
    inputStop.value = player.duration;
}

window.addEventListener('load', goLoad);


function goPlay(start = 0) {
    player.muted = false;
    player.currentTime = startTime;
    if (start > 0) player.currentTime = start;
    
    // theEnd = endTime;
    
    player.play(); // Start playback
}

player.on('timeupdate', (event) => {
    if (check.checked) {
        if (player.currentTime >= theEnd) {
            player.currentTime = startTime;

            player.play();
        }
    } else {
        if (player.currentTime >= theEnd) player.pause();
    }
});

// ! добавление фрагмента - 
btnStart.addEventListener('click', (e) => inputStart.value = player.currentTime.toFixed(1));
btnStop.addEventListener('click', (e) => inputStop.value = player.currentTime.toFixed(1));

btnPlay.addEventListener('click', (e) => {
    let nStart = Number(inputStart.value);
    let nStop = Number(inputStop.value);

    startTime = nStart;
    endTime = nStop;
    theEnd = endTime;

    goPlay();
});


btnAdd.addEventListener('click', (e) => {

    addFragment(Number(inputStart.value), Number(inputStop.value), inputDesc.value);

    fragmentsArr.push({
        start: Number(inputStart.value),
        stop: Number(inputStop.value),
        desc: inputDesc.value,
    });

    playFragment();
    delFragment();
});


