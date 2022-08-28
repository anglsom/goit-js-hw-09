import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix'

const startBt = document.querySelector('button[data-start]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minData = document.querySelector('span[data-minutes]');
const secData = document.querySelector('span[data-seconds]');

startBt.addEventListener('click', onceClick);

function onceClick() {
  timer.start();
}

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const time = datePicker.selectedDates[0] - currentTime;
      const timeComponents = convertMs(time);
      updateClock(timeComponents, time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },
};

startBt.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    ifPast(selectedDates[0], currentDate);
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function ifPast(selectedDate, currentDate) {
  if (selectedDate < currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  startBt.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClock({ days, hours, minutes, seconds }, time) {
  if (time <= 0) {
    timer.stop();
    return;
  }
  daysData.textContent = days;
  hoursData.textContent = hours;
  minData.textContent = minutes;
  secData.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

