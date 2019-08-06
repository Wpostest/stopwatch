const stopwatchBtnStart = document.querySelector('.stopwatch__btn--start-stop');
const stopwatchBtnRound = document.querySelector('.stopwatch__btn--round');
const stopwatchMinutes = document.querySelector('.stopwatch__minutes');
const stopwatchSeconds = document.querySelector('.stopwatch__seconds');
const stopwatchMiniseconds = document.querySelector('.stopwatch__miniseconds');
const stopwatchDisplayRound = document.querySelector('.stopwatch__display-round');

const stopwatchValues = {
    indexStopwatchInterval: 0,
    stopwatchTimeSaved: 0,
    stopwatchStartStopFlag: 0,
    stopwatchTime: 0,
}

const startStopwatch = function(event){
    let clickFlag = 0;
    stopwatchValues.stopwatchTimeSaved = 0;
    
    return function(event){
        switch(clickFlag){
            case 0:{
                clickFlag = 1;
                stopwatchValues.stopwatchStartStopFlag = 1;
                const curremtTimeWhenClickStartStopwatch = new Date().getTime();
                stopwatchBtnStart.classList.add('h-change-border-color');
                stopwatchBtnRound.classList.add('h-change-backgorund-color');
                stopwatchBtnRound.textContent = "Runda";
                stopwatchBtnStart.textContent = "Stop";

                stopwatchValues.indexStopwatchInterval = setInterval(function(){
                    const currentTimeAfterStartStopWatch = new Date().getTime();
                    
                    if(stopwatchValues.stopwatchTimeSaved == 0){
                        stopwatchValues.stopwatchTime = currentTimeAfterStartStopWatch - curremtTimeWhenClickStartStopwatch;
                    }
                    else{
                        stopwatchValues.stopwatchTime = currentTimeAfterStartStopWatch - curremtTimeWhenClickStartStopwatch + stopwatchValues.stopwatchTimeSaved;
                    }

                    stopwatchMinutes.textContent = Math.floor(stopwatchValues.stopwatchTime / 1000 / 60) < 10 ? "0" + Math.floor(stopwatchValues.stopwatchTime / 1000 / 60) : Math.floor(stopwatchValues.stopwatchTime / 1000 / 60);
                    stopwatchSeconds.textContent = Math.floor(stopwatchValues.stopwatchTime / 1000 % 60) < 10 ? "0" + Math.floor(stopwatchValues.stopwatchTime / 1000 % 60) : Math.floor(stopwatchValues.stopwatchTime / 1000 % 60);
                    stopwatchMiniseconds.textContent = (stopwatchValues.stopwatchTime % 1000).toString().substring(0, 2);
                }, 90);

                break;
            }
            case 1:{
                clickFlag = 0;
                stopwatchValues.stopwatchStartStopFlag = 0;
                stopwatchValues.stopwatchStartStop = 0;
                stopwatchBtnStart.classList.remove('h-change-border-color');
                stopwatchBtnRound.textContent = "Wyzeruj";
                stopwatchBtnStart.textContent = "Start";
                clearInterval(stopwatchValues.indexStopwatchInterval);
                stopwatchValues.stopwatchTimeSaved = stopwatchValues.stopwatchTime; 

                break;
            }
        } 
    }
};

const resetAndRoundStopwatch = function(){
    switch(stopwatchValues.stopwatchStartStopFlag){
        case 0:{
            clearInterval(stopwatchValues.indexStopwatchInterval);
            stopwatchDisplayRound.textContent = "";
            stopwatchValues.stopwatchValues = 0;
            stopwatchValues.stopwatchTimeSaved = 0;
            stopwatchValues.stopwatchStartStopFlag = 0;
            stopwatchValues.stopwatchTime = 0;
            stopwatchMinutes.textContent = "00";
            stopwatchSeconds.textContent = "00";
            stopwatchMiniseconds.textContent = "00";

            break;
        }
        case 1:{
            const p = document.createElement('p');
            p.textContent += stopwatchMinutes.textContent + ":";
            p.textContent += stopwatchSeconds.textContent + ",";
            p.textContent += stopwatchMiniseconds.textContent;

            const span = document.createElement('span');
            span.textContent = "Runda " + document.querySelectorAll('.stopwatch__display-round p').length;

            stopwatchDisplayRound.appendChild(span);
            stopwatchDisplayRound.appendChild(p);
            break;
        }
    }
}

stopwatchBtnStart.addEventListener('click', startStopwatch());
stopwatchBtnRound.addEventListener('click', resetAndRoundStopwatch);