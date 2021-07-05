// ! 2.0.37 babel подкл.
// асинхр fn start
async function start() {
  // возвращ. и ждет пока выполн Promise.resolve
  return await Promise.resolve('async is working')
}

// вовращ. Promise выводим в консоль
start().then(console.log)

// const unused = 42

// ! 2.0.37.3 плагин подкл.
class Util {
// ститич. поле
  static id = Date.now()
}
// смотрим в консоли
console.log('Util Id:', Util.id)
// console.log(unused)

// import('lodash').then(_ => {
//   console.log('Lodash', _.random(0, 42, true))
// })
