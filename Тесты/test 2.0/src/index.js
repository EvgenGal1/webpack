// ! 2.0.4 созд. index.js
// ! 2.0.10 import после устан webpack
// import Post from './models/Post'
// ! 2.0.26 поправили путь с alias
import Post from "@models/Post";
// ! 2.0.27 подкл jQuery в prod $$ npm i -S jquery. import всего из библ
import * as $ from 'jquery'
// ! 2.0.21 подкл. JSON и вывод console
import json from "./assets/json.json";
// ! 2.0.24 подкл. xml и вывод console
import xml from "./assets/data.xml";
// ! 2.0.25 подкл. csv и вывод console
import csv from "./assets/data.csv";
// ! 2.0.22 подкл. картинки
// ! 2.0.26 поправили путь с alias
import WebpackLogo from "@/assets/webpack-logo.png";
// import React from 'react'
// import {render} from 'react-dom'
// import './babel'
// ! 2.0.19 подкл стили css
import "./styles/styles.css";
// ! 2.0.34.2 для SCSS
import './styles/scss.scss'
// ! 2.0.34.2 для Less
import './styles/less.less'

// созд. объ. поста (класс доступен т.к. подкл. в html)
// передаем title
// ! 2.0.22 добавляем img (WebpackLogo)
const post = new Post("Webpack Post Title", WebpackLogo);
// смотрим что такое Post to String. у объ. Post вызыв. toString
console.log("Post to String", post.toString());

// ! 2.0.27.1 подкл jQuery. Эл. pre добав .code и вставить post.toString
$('pre').addClass('code').html(post.toString())

// const App = () => (
//   <div className="container">
//     <h1>Webpack Course</h1>
//     <hr />
//     <div className="logo" />
//     <hr />
//     <pre />
//     <hr />
//     <div className="box">
//       <h2>Less</h2>
//     </div>

//     <div className="card">
//       <h2>SCSS</h2>
//     </div>
//   </div>
// )

// render(<App/>, document.getElementById('app'))

// console.log("JSON:", json);
// console.log("XML:", xml);
// console.log("CSV:", csv);
