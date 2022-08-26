// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// } 
// Создать функцию рандомного цвета(меняется только боди); прогон ф-ии изменения цвета через слушателя, так же не забыть указать чтоб старт был не активен(true) после нажатия; остановка ф-ии, не активен(false)


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

const body = document.querySelector('body');
const color = document.querySelector('.color');

buttonStart.disabled = false;


const background = function () {
  body.style.backgroundColor = getRandomHexColor();
  body.style.color = getRandomHexColor();
  color.textContent = getRandomHexColor();
};

buttonStart.addEventListener('click', () => {
  timer = setInterval(background, 1000);
  buttonStart.disabled = true;
});

buttonStop.addEventListener('click', () => {
  clearInterval(timer);
  buttonStart.disabled = false;
});