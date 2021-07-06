// ! 2.0.4 созд. index.js
// ! 2.0.10 import после устан webpack
// import Post from './models/Post'
// ! 2.0.26 поправили путь с alias
// import Post from "@models/Post";
import Post from './models/Post'
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
import WebpackLogo from "../izo/webpack-logo.png";
// ! 2.0.38.1 react подкл к файлу
// import React from 'react'
// import {render} from 'react-dom'
// ! 2.0.37 babel подкл.
import "./babel";
// ! 2.0.19 подкл стили css
import "../css/styles.css";
// ! 2.0.34.2 для SCSS
import "../css/scss.scss";
// ! 2.0.34.2 для Less
import "../css/less.less";
import '../css/roboto.css'

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
