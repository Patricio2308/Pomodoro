

window.onload = function () {

    var title = document.getElementById("textTitle")
    var body = document.getElementById('container');
    var playBtn = document.getElementById('play');
    var pauseBtn = document.getElementById('pause');
    var nextBtn = document.getElementById('next');
    var timer = document.getElementById('timer');
    var xBtn = document.querySelector(".cancelModal");
    var cancelBtn = document.getElementById("cancelOptionsBtn");
    var saveBtn = document.getElementById("saveOptionsBtn");
    var optionBtn = document.querySelector(".options");
    var interval;

    let pomoMin = 25;
    let restMin = 5;
    let longRestMin = 15;
    let sec = 0;
    let workInterval = 1;
    let automaticPlay = false;
    let breakTime = false;
    const worker = new window.Worker('worker.js');
    

    const timeFormat = (num) => {
        return num < 10 ? `0${num}` : num
    }

    /* Setea los valores del localStorage a las etiquetas */
    const setInitialsValueOption = (id1, id2, id3, id4) => {
        document.getElementById(id1).value = pomoMin;
        document.getElementById(id2).value = restMin;
        document.getElementById(id3).value = longRestMin;
        document.getElementById(id4).checked = automaticPlay;
    }

    /* Carga los valores iniciales desde la localStorage*/
    const loadOptions = () => {
        if (localStorage.getItem('Pmin') !== null){
            pomoMin = parseInt(localStorage.getItem('Pmin'));
            restMin = parseInt(localStorage.getItem('Rmin'));
            longRestMin = parseInt(localStorage.getItem('LRmin'));
            automaticPlay = localStorage.getItem('AutoPlay') == 'true';
        }
        setInitialsValueOption("pomodoroTIme", "restTime", "longRestTime", "autoPlay");
        document.getElementById("realTime").textContent = `${timeFormat(pomoMin)}:${timeFormat(sec)}`;
    }
    
    loadOptions();
    let min = pomoMin;
    
    const sounds = {
        play: "./sounds/bell.wav",
        next: "./sounds/click.wav"
    };

    function audioPlay(currentSound) {
        let sound = new Audio(currentSound);
        sound.volume = 0.4;
        sound.play();
    }

    const timeCountDown = () => {
        return sec === 0 ? (min--, sec = 59) : sec--
    }

    const printNumber = () => {
        title.textContent = `${timeFormat(min)}:${timeFormat(sec)}`;
        timer.innerHTML = `${timeFormat(min)}:${timeFormat(sec)}`;
    };

    const changeColor = () => {
        let color = "panelWork";
        if (!breakTime) {
            color = "panelWork";
        }
        else if (workInterval % 6 !== 0) {
            color = "panelBreak";
        } else {
            color = "panelBreak2";
        }
        body.style.backgroundColor = `var(--${color})`;
        document.querySelectorAll('.buttons svg').forEach(element => {
            element.style.fill = `var(--${color})`;
        });
    };

    /* Calcula que clase de break time se asigna */
    const timeAllocation = () => {
        sec = 0;
        return !breakTime ? min = pomoMin : workInterval % 6 === 0 && breakTime ?
            min = longRestMin : min = restMin;
    }

    const countIntervals = () => {
        workInterval++;
        breakTime = !breakTime;
        pause();
        changeColor();
        return timeAllocation();
    }
    /* Buttons */
    const play = () => {
        playBtn.removeEventListener("click", play);
        worker.postMessage((min * 60) + sec)

        interval = setInterval(() => {
            timeCountDown();
            if (min === 0 && sec === 0) {
                countIntervals();
                if(automaticPlay){
                    play();
                }
            }
            printNumber();
        }, 1000);
    }

    worker.addEventListener("message", function (e) {
        if (e.data)
            audioPlay(sounds.play);
    })

    const pause = () => {
        clearInterval(interval);
        worker.postMessage(-1);
        playBtn.addEventListener("click", play);
    }

    const next = () => {
        nextBtn.removeEventListener("click", next);
        setTimeout(() => {
            min, sec = 0;
            countIntervals();
            printNumber();
            audioPlay(sounds.next);
            nextBtn.addEventListener("click", next);
        }
            , 400);
    }
    /* Modales */
    function modalDisplay() {
        var modal = document.querySelector(".modal");
        if (modal.style.display == "none"){
            modal.style.display = "block";
        } else
            modal.style.display = "none";
    }

    const chargeValueOption = (id) => {
        return document.getElementById(id).value
    }

    function saveOptions() {
        pomoMin = chargeValueOption("pomodoroTIme");
        restMin = chargeValueOption("restTime");
        longRestMin = chargeValueOption("longRestTime");
        automaticPlay = document.getElementById("autoPlay").checked;

        timeAllocation();
        printNumber();
        modalDisplay();
        setInitialsValueOption("pomodoroTIme", "restTime", "longRestTime", "autoPlay")
        storageOptions(pomoMin, restMin, longRestMin, automaticPlay);
    }

    /* Storage */
    function storageOptions(pomoMin, restMin, longRestMin, automaticPlay) {
        localStorage.setItem('Pmin',pomoMin);
        localStorage.setItem('Rmin',restMin);
        localStorage.setItem('LRmin',longRestMin);
        localStorage.setItem('AutoPlay', automaticPlay);
    }

    /* Events */
    playBtn.addEventListener("click", play);
    pauseBtn.addEventListener("click", pause);
    nextBtn.addEventListener("click", next);
    optionBtn.addEventListener("click", modalDisplay);
    xBtn.addEventListener("click", modalDisplay);
    cancelBtn.addEventListener("click", modalDisplay);
    saveBtn.addEventListener("click", saveOptions);

};