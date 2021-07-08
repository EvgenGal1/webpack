// ! 2.0.37 babel подкл.
// асинхр fn start
async function start() {
  // возвращ. и ждет пока выполн Promise.resolve
  return await Promise.resolve("async is working");
}

// вовращ. Promise выводим в консоль
// ??? не раб - выводит в source ошибку
// Uncaught ReferenceError: regeneratorRuntime is not defined
// start().then(console.log)
// console.log(start())

// ! 2.0.44 eslint. созд. не использ переменную(при сборке появл предупрежд/ошибка)
const unused = 42;
// const unused2 = 43;

// ! 2.0.37.3 плагин подкл.
class Util {
  // ститич. поле
  static id = Date.now();
}
// смотрим в консоли
console.log("Util Id:", Util.id);
console.log(unused);

// ! 2.0.46 lodash - биб JS, чтоб писать компакт. и простой в обслуживании JS код.
// ??? не раб такой синтакс
// устан $$ npm i lodash
// использ при динамическом import
// покдл.возвращ промис(есть библ)
// import("lodash").then((_) => {
// выводим значение. _.random - fn() lodash
// console.log("Lodash", _.random(0, 42, true));
// });
// сборка создаст chank файл с lodash
// ! 2.0.46.1 по док WP
// $$ npm i --save-dev babel-plugin-lodash
// import _ from "lodash";
// import { add } from "lodash/fp";
// const addOne = add(1);
// _.map([1, 2, 3], addOne);
// console.log(addOne);
// var array = [1];
// var other = _.concat(array, 2, [3], [[4]]);
// console.log(other); // => [1, 2, 3, [4]]
// console.log(array); // => [1]
// console.log("Lodash", _.random(0, 43, true)); // => Lodash число от 0 до 43
