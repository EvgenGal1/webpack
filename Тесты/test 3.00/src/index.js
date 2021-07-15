// 1 видео
import "./js/commpon";
// 2 видео
import "./css/main.css";
import "./scss/main.scss";

// 1 видео
// варики подкл vue
// отделн файлы
// import 'bootstrap/dist/css/bootstrap.min.css' // ток css
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css' // ток css и использ
// общ. библ
// import 'vue'
// import Vue from 'vue' // для взамодействия from (Vue.ese())
// 4.7 видео доп. не правильный путь. указ и пропис в wp.base.alias
window.Vue = require("vue"); // более прав подвешивать на window
// 4.2 видео
// обращаемся в Vue,регистр компонент, передаем назв и треб подлючаемый компонент по пути. компонент вызываем по default
Vue.component(
  "example-component",
  require("./js/components/Example.vue").default
  );
  // 4.9 видео. иницилизируем Vue. заводим новую константу
const app = new Vue({
  // data() {
  //   return { component: false };
  // },
  // store,
// иницилиз id app
  el: "#app",
});
// Example: Without vuex and store
// const app = new Vue({
//   el: '#app'
//   })

// ! законченое
// JS
// import './js/'

// SCSS
// import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Vue.js
// window.Vue = require('vue')

// Vue components (for use in html)
// Vue.component('example-component', require('./js/components/Example.vue').default)

// Vue init
// const app = new Vue({
//   el: '#app'
// })
