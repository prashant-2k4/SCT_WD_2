let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = "00:00:00.00";
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.childElementCount + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
