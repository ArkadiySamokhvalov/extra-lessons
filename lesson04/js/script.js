'use_strict';
let arg = prompt('Введите аргумент');

function f (arg) {
  "use_strict";
  if (typeof(arg) !== 'string') {
    return console.log('Передана не строка');
  } else {
    arg.trim();
    if (arg.length > 30) {
      arg = arg.slice(0, 30) + '...';
    }
    return console.log('arg: ', arg); 
  }
}

f(arg);