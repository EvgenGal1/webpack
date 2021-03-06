// ! 2.0.38.1 react coзд копию index.js ток jsx
// import * as $ from "jquery";
// import $ from "jquery";
// import Post from '@models/Post'
import Post from './models/Post'
// import json from './assets/json.json'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
// import WebpackLogo from '@/assets/webpack-logo.png'
// ? ! 2.0.42 они вообще нужны при подкл. в WebConf.js?
import WebpackLogo from '../img/webpack-logo.png'
// ! 2.0.38.1 react подкл к файлу
import React from 'react'
import { render } from 'react-dom'
import './babel'
import '../css/styles.css'
import '../css/scss.scss'
import '../css/less.less'

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
    <div className="img__box1">
      <div>
        <h3>html вёрстка</h3>
        <div className="logo1"><img src="../img/webpack-logo.png" alt="" /></div>
      </div>
      <div>
        <h3>css вёрстка</h3>
        <div className="logo2"></div>
      </div>
    </div>
    <hr />
    {/* <pre />
    <hr /> */}
    <pre>1</pre>
    <span className="rtv">2</span>
    <hr />
    <a href="../index.html">переход на INDEX</a>
    {/* <a href="./NoReact/indexNoReact.html">переход на NO React NO</a>
    <a href="./point/indexPoint.html">переход на point</a> */}
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
