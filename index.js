var title = document.getElementById("textTitle")
var body = document.getElementById('container') ;
var playBtn = document.getElementById('play') ;
var pauseBtn = document.getElementById('pause') ;
var nextBtn = document.getElementById('next') ;
var timer = document.getElementById('timer')
var interval;

let min = 20; 
let sec = 0;
let workInterval = 1;
let breakTime = false;

const sounds = {
    play: "./sounds/bell.wav",
    next: "./sounds/click.wav"
}

function audioPlay(currentSound){
    let sound = new Audio(currentSound);
    sound.volume = 0.4;
    sound.play();
}

const timeFormat = (num) => {
    return num < 10 ? `0${num}` : num
}

const timeCountDown = () => {
    return sec === 0 ? (min--, sec = 59) : sec--
}

const printNumber = () => {
    title.textContent = `${timeFormat(min)}:${timeFormat(sec)}`;
    timer.innerHTML = `<p>${timeFormat(min)}:${timeFormat(sec)}</p>`;
};

const changeColor = () =>{
    let color = "panelWork";
    if(!breakTime){
        color = "panelWork";
    }
    else if(workInterval % 6 !== 0) {
        color = "panelBreak";
    } else{
        color = "panelBreak2";
    }
    body.style.backgroundColor = `var(--${color})`;
    document.querySelectorAll('.buttons svg').forEach(element => {
        element.style.fill = `var(--${color})`;       
    });
};

const countIntervals = () => {
    workInterval++;
    breakTime = !breakTime;
    pause();
    changeColor();
    sec = 0;
    return !breakTime ? min = 20 : workInterval % 6 === 0 && breakTime ? 
    min = 15 : min = 5;
}
/* Buttons */
const play = () => {
    playBtn.removeEventListener("click",play);
    
    interval = setInterval(() => {
        timeCountDown();
        if(min === 0 && sec === 0){
            countIntervals();
            audioPlay(sounds.play);
        }
        printNumber();
    },1000);
}

const pause = () => {
    clearInterval(interval);
    playBtn.addEventListener("click",play);
}

const next = () => {
    nextBtn.removeEventListener("click",next);
    setTimeout(() => {
        min, sec = 0;
        countIntervals();
        printNumber();
        audioPlay(sounds.next);
        nextBtn.addEventListener("click",next);
    }
    ,400);
}
/* Events */
playBtn.addEventListener("click",play);
pauseBtn.addEventListener("click",pause);
nextBtn.addEventListener("click",next);
