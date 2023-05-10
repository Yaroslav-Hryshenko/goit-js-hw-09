// Описаний в документації
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  divTimer: document.querySelector('.timer'),
  btnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.divTimer.style.display = 'flex';
const divChildrens = refs.divTimer.children;
for (const divChildren of divChildrens) {
  divChildren.style.display = 'flex';
  divChildren.style.flexDirection = 'column';
  divChildren.style.alignItems = 'center';
  divChildren.style.padding = '10px 20px 0 0';
}

let dataValue = 0;
const date = Date.now();

refs.btnEl.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataValue = selectedDates[0].getTime();
    if (dataValue < date) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnEl.setAttribute('disabled', 'disabled');
    } else {
      refs.btnEl.removeAttribute('disabled');
    }
  },
};
flatpickr(refs.inputEl, options);

function addLeadingZero(value) {
  refs.daysEl.textContent = value.days.toString().padStart(2, '0');
  refs.hoursEl.textContent = value.hours.toString().padStart(2, '0');
  refs.minutesEl.textContent = value.minutes.toString().padStart(2, '0');
  refs.secondsEl.textContent = value.seconds.toString().padStart(2, '0');
}

const handelTimer = () => {
  const newDay = new Date();
  const time = dataValue - newDay.getTime();
  if (time <= 0) {
    clearInterval(timer);
    return;
  }
  const timeObj = convertMs(time);
  addLeadingZero(timeObj);
};

let timer = setInterval(handelTimer, 1000);
refs.btnEl.addEventListener('click', () => {
  refs.btnEl.setAttribute('disabled', 'disabled');
  clearInterval(timer);
  timer = setInterval(handelTimer, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
