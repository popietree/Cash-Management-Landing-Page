'use strict';

/////////////////////////

// rgb(255,255,255)
// section--1"

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target);
});
//parent of link
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log('asgfasdf');
  this.style.backgroundColor = randomColor();
  console.log('contsainer', e.target);
  //e.stopPropagation();
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target);
  },
  true
);

const h1 = document.querySelector('h1');

//going downwards chidl doesnt matter how deep
console.log(h1.querySelectorAll('.highlight'));

console.log([...h1.parentElement.children]);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
