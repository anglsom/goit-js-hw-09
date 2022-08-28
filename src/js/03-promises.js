import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delays = document.querySelector('input[name="delay"]');
const steps = document.querySelector('input[name="step"]');
const amounts = document.querySelector('input[name="amount"]');


form.addEventListener('submit', handSubmit);

function handSubmit(event) {
  event.preventDefault();

  let delay = Number(delays.value);
  let amount = Number(amounts.value);
  const step = Number(steps.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}