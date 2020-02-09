"use strict";

let start = document.querySelector('.start');
let color = document.querySelector('.color');

function generateColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}


start.addEventListener('click', () => {
  document.body.style.backgroundColor = generateColor();
  color.textContent = generateColor();
});