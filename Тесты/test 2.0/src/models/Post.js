// ! 2.0.3 создали Post.js
// разбиваем функционал по разным файлам
// класс Post
// class Post {
// ! 2.0.9 после устан. webpack доступны export/impotr
export default class Post {
  // конструктор принимает title
  // constructor(title) {
  // ! 2.0.22 добавляем img
  constructor(title, img) {
    // в instant/объект/экземпляр добавл. этот title
    this.title = title;
    // дата когда этот Post был создан. определяем как констр. new Date
    this.date = new Date();
    // ! 2.0.22 добавляем img
    this.img = img;
  }

  // в каждом Post есть метод toString
  toString() {
    // возвращаем. JSON.stringify функ. оборач в строку различные объ./массивы и т.д.
    return JSON.stringify(
      // оборачиваем новый объект
      {
        // полу title равное этому title
        title: this.title,
        // date с методом toJSON
        date: this.date.toJSON(),
        // ! 2.0.22 добавляем img
        img: this.img,
      },
      // ! 2.0.27.1 когда в методе JSON.stringify выводим нужный объ., вторым перам передаём null - реплейсер и 2 - кол-во нужных пробелов
      null, 2 );
  }
  get uppercaseTitle() {
    return this.title.toUpperCase();
  }
}
// ! 2.0.3 создали Post.js

// export default class Post {
//   constructor(title, img) {
//     this.title = title
//     this.img = img
//     this.date = new Date()
//   }

//   toString() {
//     return JSON.stringify({
//       title: this.title,
//       date: this.date.toJSON(),
//       img: this.img
//     }, null, 2)
//   }

//   get uppercaseTitle() {
//     return this.title.toUpperCase()
//   }
// }
