'use strict';


document.addEventListener('DOMContentLoaded', () => {
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  fetch('./db_cities.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
    })
    .then((data) => {
      let dropdownDefault = document.querySelector('.dropdown-lists__list--default'),
        dropdownSelect = document.querySelector('.dropdown-lists__list--select'),
        dropdownAutocomplite = document.querySelector('.dropdown-lists__list--autocomplete'),
        input = document.getElementById('select-cities'),
        main = document.querySelector('.main'),
        label = document.querySelector('.label'),
        button = document.querySelector('.button'),
        closeButton = document.querySelector('.close-button'),
        activeMenu = '',
        activeCity = '';

      function f(object) {
        let dropdownDefault = document.querySelector('.dropdown-lists__list--default > .dropdown-lists__col'),
          dropdownSelect = document.querySelector('.dropdown-lists__list--select > .dropdown-lists__col'),
          dropdownAutocomplite = document.querySelector('.dropdown-lists__list--autocomplete > .dropdown-lists__col');

        let cities = [];

        object.forEach((item) => {
          let blockD = document.createElement('div'),
            blockS = document.createElement('div'),
            totalLine = document.createElement('div'),
            country = document.createElement('div'),
            count = document.createElement('div'),
            i = 0;

          blockD.className = 'dropdown-lists__countryBlock';
          blockS.className = 'dropdown-lists__countryBlock';
          totalLine.className = 'dropdown-lists__total-line';
          country.className = 'dropdown-lists__country';
          count.className = 'dropdown-lists__count';

          country.textContent = item.country;
          count.textContent = item.count;

          totalLine.append(country);
          totalLine.append(count);

          blockD.append(totalLine.cloneNode(true));
          blockS.append(totalLine.cloneNode(true));

          cities = item.cities.sort((a, b) => {
            return (+a.count > +b.count) ? -1 : 1;
          });

          cities.forEach((item) => {
            let line = document.createElement('div'),
              city = document.createElement('div'),
              count = document.createElement('div');

            line.className = 'dropdown-lists__line';
            city.className = 'dropdown-lists__city';
            count.className = 'dropdown-lists__count';

            city.textContent = item.name;
            count.textContent = item.count;

            line.append(city);
            line.append(count);

            line.dataset.link = item.link;

            blockS.appendChild(line.cloneNode(true));
            dropdownAutocomplite.append(line.cloneNode(true));

            if (i < 3) {
              blockD.append(line.cloneNode(true));
            }
            i++;
          });
          blockS.dataset.country = item.country;
          dropdownDefault.append(blockD);
          dropdownSelect.append(blockS);
        });
      }

      function clear() {
        input.value = '';
        label.style.display = 'inline';
        button.setAttribute('href', '#');
        button.setAttribute('disabled', 'disabled');
        activeCity.classList.remove('dropdown-lists__city--ip');
        closeButton.classList.remove('active');
        main.querySelectorAll('.dropdown-lists__line, .dropdown-lists__total-line').forEach((item) => {
          item.removeAttribute('style');
        });
      }

      function eventsListeners() {
        main.addEventListener('click', (event) => {
          let target = event.target;

          // Нажат input
          if (target === input) {
            if (activeMenu !== dropdownAutocomplite) {
              dropdownSelect.classList.remove('active');
              dropdownDefault.classList.add('active');
              activeMenu = dropdownDefault;
            }
          }

          // Нажат крестик или выбранный город
          if (target === closeButton || target === activeCity) {
            clear();

            if (target === closeButton) {
              activeMenu.classList.remove('active');
            }
          }

          // Нажат блок со страной
          target = event.target.closest('.dropdown-lists__total-line');
          if (target) {
            dropdownDefault.classList.remove('active');
            dropdownSelect.classList.add('active');
            activeMenu = dropdownSelect;

            let countryBlocks = dropdownSelect.querySelectorAll('.dropdown-lists__countryBlock');

            countryBlocks.forEach((item) => {
              if (item.dataset.country === target.querySelector('.dropdown-lists__country').textContent) {
                item.style.display = 'block';
              } else {
                item.removeAttribute('style');
              }
            });
          }

          // Нажат блок с городом
          target = event.target.closest('.dropdown-lists__line');
          if (target) {
            // убираем активный класс с другого города
            main.querySelectorAll('.dropdown-lists__line, .dropdown-lists__total-line').forEach((item) => {
              item.style.display = 'none';

              if (item.classList.contains('dropdown-lists__line')) {
                item.classList.remove('dropdown-lists__city--ip');
              }
            });

            target.removeAttribute('style');
            target.classList.add('dropdown-lists__city--ip');
            button.removeAttribute('disabled');

            activeCity = target;

            label.style.display = 'none';
            input.value = target.querySelector('.dropdown-lists__city').textContent;
            button.setAttribute('href', target.dataset.link);
            closeButton.classList.add('active');
          }
        });

        // Поиск соответсвия
        input.addEventListener('input', () => {
          if (input.value === '') {
            dropdownAutocomplite.classList.remove('active');
            dropdownDefault.classList.add('active');
            activeMenu = dropdownDefault;
          } else {
            dropdownSelect.classList.remove('active');
            dropdownDefault.classList.remove('active');
            dropdownAutocomplite.classList.add('active');
            activeMenu = dropdownAutocomplite;
          }

          let regex = new RegExp('^'+input.value, 'i');
          dropdownAutocomplite.querySelectorAll('.dropdown-lists__city').forEach((item) => {
            if (regex.test(item.textContent)) {
              let text = '<b>'+item.textContent.substr(0, input.value.length)+'</b>'+item.textContent.substr(input.value.length);
             item.innerHTML = text;
              item.parentNode.style.display = 'block';
            } else {
              item.parentNode.removeAttribute('style');
            }
          });
        });
      }

      let lang = getCookie('lang');
      if (!lang) {
        lang = prompt('RU | EN | DE');
        document.cookie = encodeURIComponent('lang') + '=' + encodeURIComponent(lang);
      }

      let storage = JSON.parse(localStorage.getItem('data'));
      if (!storage) {
        for (let key in data) {
          if (key === lang) {
            let sortData = data[key].sort((a, b) => {
              if (a.country === lang) {
                return 1;
              }
              return (a.country > b.country) ? 1 : -1;
            });

            localStorage.setItem('data', JSON.stringify(sortData));

            f(sortData);

            break;
          }
        }
      } else {
        f(storage);
      }

      eventsListeners();
    })
    .catch((error) => {
      console.log(error);
    });
});
