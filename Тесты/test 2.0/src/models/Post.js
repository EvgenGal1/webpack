// ! 2.0.3 создали Post.js
// разбиваем функционал по разным файлам
// класс Post
// class Post {
// ! 2.0.9 после устан. webpack доступны export/impotr
console.log(2)
export default class Post {
  // console.log(3);
  // конструктор принимает title
  // constructor(title) {
    // ! 2.0.22 добавляем img
    constructor(title, img) {
    console.log(3)
    // в instant/объект/экземпляр добавл. этот title
    this.title = title;
    // дата когда этот Post был создан. определяем как констр. new Date
    this.date = new Date();
    // ! 2.0.22 добавляем img
    this.img = img;
    console.log(4)
  }
  
  // в каждом Post есть метод toString
  toString() {
    console.log(5)
    // возвращаем. JSON.stringify функ. оборач в строку различные объ./массивы и т.д.
    return JSON.stringify(
      // оборачиваем новый объект
      // console.log(7)
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
      console.log(6)
    }
    get uppercaseTitle() {
    console.log(7)
    return this.title.toUpperCase();
  }
}
console.log(8)
// ! 2.0.3 создали Post.js
