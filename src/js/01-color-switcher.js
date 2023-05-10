const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function colorBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

refs.btnStop.setAttribute('disabled', 'disabled');

let color = null;

refs.btnStop.addEventListener('click', () => {
  clearInterval(color);

  refs.btnStart.removeAttribute('disabled');
  refs.btnStop.setAttribute('disabled', 'disabled');
});

refs.btnStart.addEventListener('click', () => {
  clearInterval(color);
  color = setInterval(colorBody, 1000);

  refs.btnStop.removeAttribute('disabled');
  refs.btnStart.setAttribute('disabled', 'disabled');
});
