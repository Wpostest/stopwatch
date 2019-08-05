const stopwatchBtnStart = document.querySelector('.stopwatch__btn--start-stop');
const stopwatchBtnRound = document.querySelector('.stopwatch__btn--round');
const stopwatchMinutes = document.querySelector('.stopwatch__minutes');
const stopwatchSeconds = document.querySelector('.stopwatch__seconds');
const stopwatchMiniseconds = document.querySelector('.stopwatch__miniseconds');

const stopwatchValues = {
    indexStopwatchInterval: 0,
    stopwatchTimeSaved: 0,
}

const startStopwatch = function(event){
    let clickFlag = 0;
    let stopwatchTime = 0;
    stopwatchValues.stopwatchTimeSaved = 0;
    
    return function(event){
        switch(clickFlag){
            case 0:{
                clickFlag = 1;
                const curremtTimeWhenClickStartStopwatch = new Date().getTime();
                stopwatchBtnStart.classList.add('h-change-border-color');
                stopwatchBtnRound.classList.add('h-change-backgorund-color');
                stopwatchBtnRound.textContent = "Runda";
                stopwatchBtnStart.textContent = "Stop";

                stopwatchValues.indexStopwatchInterval = setInterval(function(){
                    const currentTimeAfterStartStopWatch = new Date().getTime();
                    
                    if(stopwatchValues.stopwatchTimeSaved == 0){
                        stopwatchTime = currentTimeAfterStartStopWatch - curremtTimeWhenClickStartStopwatch;
                    }
                    else{
                        stopwatchTime = currentTimeAfterStartStopWatch - curremtTimeWhenClickStartStopwatch + stopwatchValues.stopwatchTimeSaved;
                    }

                    stopwatchMinutes.textContent = Math.floor(stopwatchTime / 1000 / 60 % 60) < 10 ? "0" + Math.floor(stopwatchTime / 1000 / 60 % 60) : Math.floor(stopwatchTime / 1000 / 60 & 60);
                    stopwatchSeconds.textContent = Math.floor(stopwatchTime / 1000 % 60) < 10 ? "0" + Math.floor(stopwatchTime / 1000 % 60) : Math.floor(stopwatchTime / 1000 % 60);
                    stopwatchMiniseconds.textContent = (stopwatchTime % 1000).toString().substring(0, 2);
                }, 90);

                break;
            }
            case 1:{
                clickFlag = 0;
                stopwatchBtnStart.classList.remove('h-change-border-color');
                stopwatchBtnRound.textContent = "Wyzeruj";
                stopwatchBtnStart.textContent = "Start";
                clearInterval(stopwatchValues.indexStopwatchInterval);
                stopwatchValues.stopwatchTimeSaved = stopwatchTime; 

                break;
            }
        } 
    }
};

stopwatchBtnStart.addEventListener('click', startStopwatch());