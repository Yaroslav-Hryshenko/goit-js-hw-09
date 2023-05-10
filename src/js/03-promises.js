import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', addCreatePromise);
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function addCreatePromise(ev) {
  ev.preventDefault();

  const inputDelay = Number(refs.delay.value);
  const inputStep = Number(refs.step.value);
  const inputAmount = Number(refs.amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    const step = inputDelay + inputStep * (i - 1);
    createPromise(i, step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
