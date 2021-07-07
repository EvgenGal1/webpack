// ! 2.0.38.1 react coзд копию index.js ток jsx
// import * as $ from "jquery";
// import $ from "jquery";
// import Post from '@models/Post'
import Post from './models/Post'
// import json from './assets/json.json'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
// import WebpackLogo from '@/assets/webpack-logo.png'
import WebpackLogo from "../izo/webpack-logo.png";
// ! 2.0.38.1 react подкл к файлу
import React from 'react'
import { render } from 'react-dom'
// import './babel'
import '../css/styles.css'
import '../css/scss.scss'
import '../css/less.less'

const post = new Post('Webpack Post Title', WebpackLogo)
console.log(1);
$('pre').addClass('code').html(post.toString())


const App = () => (
  <div className="container">
    <h1>html/indexReact.html</h1>
    <hr />
    <div className="logo" />
    <hr />
    <pre />
    <hr />
    <a href="../index.html">переход на INDEX</a>
    <a href="./NoReact/indexNoReact.html">переход на NO React NO</a>
    <a href="./point/indexPoint.html">переход на point</a>
    <hr />
    <div className="box">
      <h2>Less</h2>
    </div>

    <div className="card">
      <h2>SCSS</h2>
    </div>
  </div>
)

render(<App />, document.getElementById('app'))


// console.log('JSON:', json)
// console.log('XML:', xml)
// console.log('CSV:', csv)
