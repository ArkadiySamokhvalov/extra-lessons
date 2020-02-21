'use strict';
const part = document.querySelector('.part'),
  day = document.querySelector('.day'),
  time = document.querySelector('.time'),
  newYear = document.querySelector('.newYear');

function f() {
  function getNow() {
    let now = new Date(),
        year = now.getFullYear(),
        day = now.getDay(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    return {
      now, year, day, hours, minutes, seconds
    };
  }

  let now = getNow();

  if (now.hours >= 0 && now.hours < 6) {
    part.textContent = 'Доброй ночи!';
  } else if (now.hours >= 6 && now.hours < 12) {
    part.textContent = 'Доброго утра!';
  } else if (now.hours >= 12 && now.hours < 18) {
    part.textContent = 'Доброго дня!';
  } else if (now.hours >= 18 && now.hours <= 23) {
    part.textContent = 'Доброго вечера!';
  }

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  day.textContent = days[now.day];

  let text = '';
  text += (now.hours < 10) ? '0' + now.hours + ':' : now.hours + ':';
  text += (now.minutes < 10) ? '0' + now.minutes + ':' : now.minutes + ':';
  text += (now.seconds < 10) ? '0' + now.seconds : now.seconds;
  time.textContent = text;

  const NY = new Date(now.year, 11, 31, 0, 0, 0, 0);
  let diff = Math.ceil((NY.getTime() - now.now.getTime()) / 1000 / 60 / 60 / 24);
  newYear.textContent = diff;

  setTimeout(f, 1000);
}

f();