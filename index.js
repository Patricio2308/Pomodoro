
var playBtn = document.getElementById('play') ;
var pauseBtn = document.getElementById('pause') ;
var nextBtn = document.getElementById('next') ;
var timer = document.getElementById('timer')
var interval;

let min = 0; 
let sec = 10;
let workInterval = 0;
let breakTime = false;

function audioPlay(){
    let sound = new Audio('./sounds/bell.wav');
    sound.play()
}

const timeFormat = (num) => {
    return num < 10 ? `0${num}` : num
}

const timeCountDown = () => {
    console.log(`${timeFormat(min)}:${timeFormat(sec)}`)
    return sec === 0 ? (min--, sec = 59) : sec--
}

const printNumber = () => {
    timer.textContent = `${timeFormat(min)}:${timeFormat(sec)}`;
};

const countIntervals = () => {
    workInterval++;
    breakTime = !breakTime;
    pause();
    sec = 0;
    return !breakTime ? min = 20 : workInterval % 3 === 0 && breakTime ? 
    min = 15 : min = 5;
}

const play = () => {
    playBtn.removeEventListener("click",play);
    
    interval = setInterval(() => {
        timeCountDown();
        if(min === 0 && sec === 0){
            countIntervals();
            audioPlay();
        }
        printNumber();
    },1000);
}

const pause = () => {
    clearInterval(interval);
    playBtn.addEventListener("click",play);
    console.log(`Intervalo numero ${workInterval}, tiempo de descanso es ${breakTime} y el tiempo: 
    ${timeFormat(min)}:${timeFormat(sec)}`)
}

const next = () => {
    min, sec = 0;
    countIntervals()
    printNumber()
}
    playBtn.addEventListener("click",play);
    pauseBtn.addEventListener("click",pause);
    nextBtn.addEventListener("click",next);

const timeIntervals = () => {

}