// Write a timer script that counts down to a specific date. Such a timer can be used in blogs and online stores, event-logging pages, during maintenance, etc.

// Described in documentation and additional styles import
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '5px',
  opacity: 1,
  borderRadius: '10px',
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  closeButton: false,
});

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (checkValidDate(selectedDates[0].getTime())) {
      refs.startTimerBtn.disabled = false;
    } else {
      Notify.failure('Please, pick the date in the future.');
      refs.startTimerBtn.disabled = true;
    }

    inputDate = selectedDates[0];
  },
};

const refs = {
  datetimeInput: document.querySelector('input#datetime-picker'),
  startTimerBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let inputDate;

refs.startTimerBtn.disabled = true;
refs.startTimerBtn.addEventListener('click', handleCountdownTimer);

flatpickr(refs.datetimeInput, flatpickrOptions);

function handleCountdownTimer(evt) {
  evt.preventDefault();

  const coundownId = setInterval(() => {
    const countdownTime = checkValidDate(inputDate);

    // Show something, if the countdown is finished
    if (!countdownTime) {
      clearInterval(coundownId);
      Notify.success('🎉 It\'s happened! 🎉');
    }
    
    // Show the countdown if everything is ok
    displayCountdown(countdownTime);
  }, 1000);
}

function displayCountdown(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = minutes;
  refs.secs.textContent = seconds;
}

function checkValidDate(date) {
  const currentDate = Date.now();
  const distance = date - currentDate;

  return date > currentDate ? distance : null;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
