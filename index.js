
var playBtn = document.getElementById('play') ;
var pauseBtn = document.getElementById('pause') ;
var nextBtn = document.getElementById('next') ;
var timer = document.getElementById('timer')
var interval;

let min = 0; 
let sec = 10;
 

const timeFormat = (num) => {
    return num < 10 ? `0${num}` : num
}

const timeContDown = () => {
    if (sec === 0){
        min--
        sec = 60
    } else if(min >= 0) {
        sec--
    }
    console.log(`${timeFormat(min)} : ${timeFormat(sec)}`) 
    timer.textContent = `${timeFormat(min)}:${timeFormat(sec)}`;
}

const play = () => {
    playBtn.removeEventListener("click",play);
    
    interval = setInterval(() => {
        timeContDown();
        if(min === 0 && sec === 0)
        pause();
    },1000);
}

const pause = () => {
    clearInterval(interval)
}
    
    playBtn.addEventListener("click",play);
    pauseBtn.addEventListener("click",pause);
    nextBtn.addEventListener("click",play);

    
        