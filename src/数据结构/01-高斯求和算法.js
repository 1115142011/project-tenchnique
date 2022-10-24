/**
 * 实现 1+2+3+4+5+6+....+100
 */

// 普通方式

let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log("sum", sum); // 1050

// 高斯求和

let sum1 = 0;
let n = 100;
sum1 = ((1 + n) * n) / 2;

console.log('sum1',sum1);
