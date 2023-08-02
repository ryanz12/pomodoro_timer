const countdown = document.getElementById("countdown");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let startPressed = false;
let breakTime = false;
let audio = new Audio('sound.mp3')
let time = 1500;

function updateHtmlTime(){
    countdown.innerHTML = `${Math.floor(time/60) > 9? Math.floor(time/60): '0' + Math.floor(time/60)}:${time%60 > 9 ? time%60 : '0' + time%60}`;
}
updateHtmlTime();

function changeScene(){
    time = 500;
    start.innerHTML = 'START';
    startPressed = false;
    updateHtmlTime(); 
    breakTime?document.body.classList.add('animateBkgrd'):document.body.classList.remove('animateBkgrd');
}

function toggleCountdown(state){
    state === 'start' ?
    interval = setInterval(()=>{
        if(time === 0){
            breakTime = !breakTime;
            audio.play();
            clearInterval(interval)
            changeScene();
        }else{
            time--;
            document.title = `${Math.floor(time/60) > 9? Math.floor(time/60): '0' + Math.floor(time/60)}:${time%60 > 9 ? time%60 : '0' + time%60} left!`;
            updateHtmlTime();
        }
    }, 1000)
    :
    clearInterval(interval);
}

start.addEventListener('click', ()=> {
    startPressed = !startPressed;

    if(startPressed){
        start.innerHTML = 'PAUSE'
        reset.style.display = 'flex';

        toggleCountdown('start');
    }else{
        start.innerHTML = 'START';
        toggleCountdown('end');
    }
});

reset.addEventListener('click', ()=> {
    reset.style.display = 'none';
    start.innerHTML = 'START';
    time = 1500;
    updateHtmlTime();
    toggleCountdown('end');
})