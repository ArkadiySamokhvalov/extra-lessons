'use_strict';

let lang = prompt('Укажите язык (ru/en)'),
    DoWEn = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    DoWRu = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ'],
    DoW = {
      'en' : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],

      'ru' : ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ']
    };

// if
console.log('if');
if (lang === 'ru') {
  console.log('DoWERu: ', DoWRu);
} else if (lang === 'en') {
  console.log('DoWEn: ', DoWEn);
}

// switch-case
console.log('switch-case');
switch (lang) {
  case 'ru' :
    console.log('DoWRu: ', DoWRu);
    break;
  case 'en' :
    console.log('DoWEn: ', DoWEn);
    break;
}

// многoмерный массив 
console.log('многомерный массив');
console.log(DoW[lang]);

// ----------------------------------- //

let namePerson = prompt('Введите имя:');

console.log((namePerson === 'Артём') ? 'директор' : (namePerson === 'Максим') ? 'преподаватель' : 'студент');