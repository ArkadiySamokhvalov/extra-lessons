'use strict';

class DomElement {
  constructor(selector, text = '', height = '', width = '', bg = '', fontSize = '') {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
  }

  moveElement(element, key) {
    element.style.position = 'absolute';
    if (key.keyCode === 37 || key.keyCode === 39) {
      element.style.left = element.offsetLeft + (key.keyCode === 37 ? -10 : 10) + 'px';
    }
    if (key.keyCode === 38 || key.keyCode === 40) {
      element.style.top = element.offsetTop + (key.keyCode === 38 ? -10 : 10) + 'px';
    }
  }

  createElement() {
    let element = '';
    let arr = [];
    if (this.selector[0] === '.') {
      element = document.createElement('div');
      element.className = this.selector.substr(1);
    } else if (this.selector[0] === '#') {
      element = document.createElement('div');
      element.id = this.selector.substr(1);
    } else if (this.selector.split('.')) {
      arr = this.selector.split('.');
      element = document.createElement(arr[0]);
      element.className = arr[1];
    } else if (this.selector.split('#')) {
      arr = this.selector.split('#');
      element = document.createElement(arr[0]);
      element.id = arr[1];
    } else {
      element = document.createElement(this.selector);
    }

    let cssText = '';
    cssText += (this.height !== '') ? 'height: ' + this.height + '; ' : '';
    cssText += (this.width !== '') ? 'width: ' + this.width + '; ' : '';
    cssText += (this.bg !== '') ? 'background: ' + this.bg + '; ' : '';
    cssText += (this.fontSize !== '') ? 'font-size: ' + this.fontSize + ';' : '';

    if (cssText !== '') {
      element.style.cssText = cssText;
    }
    if (this.text !== '') {
      element.textContent = this.text;
    }

    return element;
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  let obj = new DomElement('#block', '', '100px', '100px', 'green');
  let el = obj.createElement();
  document.body.appendChild(el);
  document.addEventListener('keydown', (key) => {
    obj.moveElement(el, key);
  });
});
