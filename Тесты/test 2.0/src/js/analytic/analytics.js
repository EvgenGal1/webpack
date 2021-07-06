// ! 2.0.28 подкл. jQuery для проверки загр библ в один общ. файл
import * as $ from 'jquery'

// ! 2.0.6 создали analytics.js
// fh() по подсчету кликов. в браузере в console вызов analytics.getClicks() будет считать число кликов по документу
function createAnalytics() {
  // по умолчанию 0
  let counter = 0;
  // по умолч. выкл. analit = false
  let destroyed = false;
  // fn() увелич counter
  const listener = () => counter++;
  // новое событие click с fn()
  // document.addEventListener("click", listener);
  // ! 2.0.28.1 использ jQ
  $(document).on('click',listener);
  // fn()createAnalytics возр. объ. у которого 2 метода
  return {
    // вызов прекращ действ analitics
    destroy() {
      // document.removeEventListener("click", listener);
      // ! 2.0.28.1 использ jQ
      $(document).off("click", listener);
      // при вызове ставим destroyed = true
      destroyed = true;
    },
    // второй метод
    getClicks() {
      // е/и isDestroyed вернёт строку с числом нажатий
      if (destroyed) {
        return `Analytics is destroed. Total clicks = ${counter}`;
        // analytics.destroy() -> undef -> analytics.getClicks() -> Analytics is destroed
      }
      // возвр число нажатий
      return counter;
    },
  };
}
// чтоб воспольз. analytics. глоб. перем. wind, объ. analit присвоим значен. данной fn()
window.analytics = createAnalytics();

// import * as $ from 'jquery'

// function createAnalytics(): object {
//   let counter = 0
//   let destroyed: boolean = false

//   const listener = (): number => counter++

//   $(document).on('click', listener)

//   return {
//     destroy() {
//       $(document).off('click', listener)
//       destroyed = true
//     },

//     getClicks() {
//       if (destroyed) {
//         return `Analytics is destroyed. Total clicks = ${counter}`
//       }
//       return counter
//     }
//   }
// }

// window['analytics'] = createAnalytics()
