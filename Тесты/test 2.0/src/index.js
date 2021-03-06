// ! 2.0.4 созд. index.js
// ! 2.0.10 import после устан webpack
// import Post from './models/Post'
// ! 2.0.26 поправили путь с alias
// import Post from "@models/Post";
import Post from "./js/models/Post";
// ! 2.0.27 подкл jQuery в prod $$ npm i -S jquery. import всего из библ
import * as $ from "jquery";
// ! 2.0.21 подкл. JSON и вывод console
// import json from "./assets/json.json";
// ! 2.0.24 подкл. xml и вывод console
// import xml from "./assets/data.xml";
// ! 2.0.25 подкл. csv и вывод console
// import csv from "./assets/data.csv";
// ! 2.0.22 подкл. картинки
// ! 2.0.26 поправили путь с alias
// import WebpackLogo from "@/assets/webpack-logo.png";
// ? ! 2.0.42 они вообще нужны при подкл. в WebConf.js?
import WebpackLogo from "./img/webpack-logo.png";
// import WebpackLogo from "./assets/webpack-logo.png";
// ! 2.0.38.1 react подкл к файлу
// import React from 'react'
// import {render} from 'react-dom'
// ! 2.0.37 babel подкл.
import "./js/babel";
// ! 2.0.19 подкл стили css
import "./css/styles.css";
// ! 2.0.34.2 для SCSS
import "./css/scss.scss";
// ! 2.0.34.2 для Less
import "./css/less.less";
// ! 2.0.45 картинки выгр по док webpack
import mainImage1 from "./img/space1.jpg";
import mainImage2 from "./img/immortal1.jpg";
// import mainImage3 from "./img/anonim1.jpg";
import mainImage3 from "./img/anonim1.jpg";
// img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
// $('.img3').css("background-image , './img/anonim1.jpg'");
$(".img2").css("background-image", mainImage2); // не раб
$(".img__box2").css("background-image", mainImage2); // не раб
$(".img3").attr("src", mainImage3)

// созд. объ. поста (класс доступен т.к. подкл. в html)
// передаем title
// ! 2.0.22 добавляем img (WebpackLogo)
const post = new Post("Webpack Post Title", WebpackLogo);
// смотрим что такое Post to String. у объ. Post вызыв. toString
console.log("Post to String", post.toString());

// ! 2.0.27.1 подкл jQuery. Эл. pre добав .code и вставить post.toString
$("pre").addClass("code").html(post.toString());

// console.log("JSON:", json);
// console.log("XML:", xml);
// console.log("CSV:", csv);
