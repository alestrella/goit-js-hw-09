// Write a script that, after clicking the "Start" button, changes the <body> background color once a second to a random value using the inline style. When clicking on the "Stop" button, background color change must stop.

ref = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}

ref.btnStart.addEventListener('click', handleStartColorSwitcher);
ref.btnStop.addEventListener('click', handleStopColorSwitcher)

function handleStartColorSwitcher() {
    ref.btnStart.setAttribute('disabled', 'disabled');
    timertId = setInterval(changeBodyColor, 1000);
}

function handleStopColorSwitcher() {
    ref.btnStart.removeAttribute('disabled', 'disabled');
    clearInterval(timertId);
}

function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}