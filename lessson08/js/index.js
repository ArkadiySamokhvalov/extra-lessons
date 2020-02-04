function formatDateA (date) {
  let year = date.getFullYear(),
      month = date.getMonth(),
      date1 = date.getDate(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      day = date.getDay();
  let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  
  function chooseDeclension (value, flag) {
    if (value % 10 == 1) {
      if (flag == 'h') 
        return ' час ';
      if (flag == 'm') 
        return ' минута ';
      if (flag == 's') 
        return ' секунда ';
    } else if (value % 10 == 2 || value % 10 == 3 || value % 10 == 4) {
      if (flag == 'h') 
        return ' часа ';
      if (flag == 'm') 
        return ' минуты ';
      if (flag == 's') 
        return ' секунды ';
    } else {
      if (flag == 'h') 
        return ' часов ';
      if (flag == 'm') 
        return ' минут ';
      if (flag == 's') 
        return ' секунд ';
    }
  }
  
  return 'Сегодня ' + week[day] + ', ' + date1 + ' ' + months[month] + ' ' + year + ' года, ' + hours + chooseDeclension(hours, 'h') + minutes + chooseDeclension(minutes, 'm') + seconds + chooseDeclension(seconds, 's');
}

function formatDateB (date) {
  let year = date.getFullYear(),
      month = (date.getMonth() < 10) ? '0'+date.getMonth() : date.getMonth(),
      date1 = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate(),
      hours = (date.getHours() < 10) ? '0'+date.getHours() : date.getHours(),
      minutes = (date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes(),
      seconds = (date.getSeconds() < 10) ? '0'+date.getSeconds() : date.getSeconds();  

  return date1 + '.' + month + '.' + year + ' - ' + hours + ':' + minutes + ':' + seconds;
}

let container = document.createElement('div'),
    child1 = document.createElement('div'),
    child2 = document.createElement('div');
container.className = 'container';
child1.className = 'formatDateA';
child2.className = 'formatDateB'; 

setInterval(() => {
  let date = new Date();
  child1.textContent = formatDateA(date);
  child2.textContent = formatDateB(date);
  container.appendChild(child1);
  container.appendChild(child2); 
  document.body.appendChild(container);
}, 1000);
