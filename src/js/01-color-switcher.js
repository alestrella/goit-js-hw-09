// Write a script that, after clicking the "Start" button, changes the <body> background color once a second to a random value using the inline style. When clicking on the "Stop" button, background color change must stop.

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
};
let timerId;

refs.btnStart.addEventListener('click', handleStartColorSwitcher);
refs.btnStop.addEventListener('click', handleStopColorSwitcher)

function handleStartColorSwitcher() {
    refs.btnStart.setAttribute('disabled', 'disabled');
    timerId = setInterval(changeBodyColor, 1000);
}

function handleStopColorSwitcher() {
    refs.btnStart.removeAttribute('disabled');
    clearInterval(timerId);
}

function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}