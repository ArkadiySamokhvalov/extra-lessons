'use strict';

let date = new Date(),
    dayNumber = date.getDay();
let week = [
  'ПН',
  'ВТ',
  'СР',
  'ЧТ',
  'ПТ',
  'СБ',
  'ВС'
];

let container = document.createElement('div');
container.className = 'container';

for (let day in week) {
  let element = document.createElement('div');
  element.className = 'day';
  
  if (day - 1 == dayNumber)
    element.innerHTML = '<b>' + week[day] + '</b>';
  else if (day == 5 || day == 6)
    element.innerHTML = '<i>' + week[day] + '</i>';
  else
    element.innerHTML = week[day];

  container.append(element);
}

document.body.append(container);