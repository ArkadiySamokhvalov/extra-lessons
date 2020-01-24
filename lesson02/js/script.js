let num = 266219,
    result = 1;

while (num > 0) {
  result *= num % 10;
  num = Math.floor(num / 10);
}

let result2 = result**3;

console.log('result: ', result);
console.log('result2: ', result2);
console.log(result2.toString().substr(0,2));
