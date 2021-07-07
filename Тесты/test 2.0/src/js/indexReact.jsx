// ! 2.0.38.1 react coзд копию index.js ток jsx
// import * as $ from "jquery";
// import $ from "jquery";
import Post from './models/Post'
// import json from './assets/json.json'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
// import WebpackLogo from '@/assets/webpack-logo.png'
// ? ! 2.0.42 они вообще нужны при подкл. в WebConf.js?
// import WebpackLogo from '../img/webpack-logo.png'
// ! 2.0.38.1 react подкл к файлу
import React from 'react'
import { render } from 'react-dom'
// import './babel'
import '../css/styles.css'
import '../css/less.less'
import '../css/scss.scss'

function prePost() {
  // $('pre').addClass('code').html(post.toString())
  const post = new Post('Webpack Post Title', WebpackLogo)
  let pre = document.getElementsByTagName('pre');
  let spanRtv = document.getElementsByClassName('rtv');
  //  ??? не раб - TypeError: Cannot read property 
  spanRtv.classList.add("code")//.html(post.toString())
  // pre.classList.add("code")//.html(post.toString())
  // pre.className.add("code")//.html(post.toString())
}
// prePost()


const App = () => (
  <div className="container">
    <h1>Webpack Course</h1>
    <hr />
    <div class="imgBox">
      <div>
        <h3>html вёрстка</h3>
        <div class="logo"><img src="../img/webpack-logo.png" alt="" /></div>
      </div>
      <div>
        <h3>css вёрстка</h3>
        <div class="logo2"></div>
      </div>
    </div>
    <hr />
    <a href="../index.html">переход на index</a>
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
