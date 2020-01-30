"use strict";

let array = ['1111', '2111', '3111', '4111', '5111', '6111', '7111'];

for (let i = 0; i < array.length; i++) {
  if (array[i][0] == '2' || array[i][0] == '4') {
    console.log(array[i]);
  }
}

// ------------------------------ //
let i,
    p = 2,
    arr = [];

for (i = 2; i < 101; i++) {
  arr[i] = true;
}

do {
  for (i = 2 * p; i < 101; i += p) {
  	arr[i] = false;
  }
  
  for (i = p+1; i < 101; i++) {
    if (arr[i]) {
    	break;
    } 
  }

  p = i;
} while (p < 10);


for (i = 0; i < arr.length; i++) {
  if (arr[i]) {
    console.log(i);
  }
}
