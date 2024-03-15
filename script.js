// create variables for the necessary elements

const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

// stopwatch variables

// values will be updating many times use let
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

// set a listener to all buttons
// When we click on it, perform a corresponding callback function

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);


// create the functions
function startTimer(){
    // pass updateTimer as a callback 
    // Delay the time
    interval = setInterval(updateTimer, 10);
    // disable the start timer button
    // We don't want to again start the time  again
    startButton.disabled = true;

}
function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;

    
}
function pauseTimer(){
    // this will pause the timer
    clearInterval(interval);
    startButton.disabled = false;
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
    
}

function updateTimer(){
    // whenever we update the timer, we want to update the value of the milliseconds
    milliseconds++;
    if(milliseconds === 100){ /// 1000  1s = 1000 milliseconds
        milliseconds = 0
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++
        }
    }
    displayTimer();
}

// Responsible for the value operation inside these particular labels
function displayTimer(){
    // upadte the value of these three label 
    millisecondsLabel.textContent =  padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);

}

// Format the string in a two digit way
// UTility fun to format the string
function padTime(time){
    return time.toString().padStart(2,'0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

// creation of lapList
function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}: ${padTime(milliseconds)}`;


    const listItem =  document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}   