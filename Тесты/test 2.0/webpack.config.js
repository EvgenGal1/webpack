// ! 2.0.8 созд webpack.config.js
// подкл path встрен. модуль в node js
const path = require("path");
// ! 2.0.15 html плагин и пропис его. выгр html, подкл стили, js
const HTMLWebpackPlugin = require("html-webpack-plugin");
// ! 2.0.17 очистка ввыводной папки
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// ! 2.0.30 копир файлов из корня в вывод
const CopyWebpackPlugin = require("copy-webpack-plugin");
// ! 2.0.31 css в отделн файлы + loader
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ! 2.0.33.1 cssmini вывод - по документации
// ??? не раб - прибавляет очень много веса
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// ! 2.0.33.2 cssmini вывод - по видео
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// ! 2.0.47 analyzer подк. plugin в fn()
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// ! 2.0.41 пути в константу(QF3EcxymIcc)(для удобной смены во всем сразу)
const PATHS = {
  src: path.join(__dirname, "./src/"),
  dist: path.join(__dirname, "./dist/"),
  // src: path.resolve(__dirname, "src"),
  // dist: path.resolve(__dirname, "dist"),
  // path: path.resolve(__dirname, "dist"),
  static: "static/",
};
// получить доступ к константе PATHS из других кофигов (е/и их несколько - для Prod и Dev)
// module.exports = { externals: { path: PATHS } }; // ярлык: к чему

// ! 2.0.32 режимы разраб/продукт (получ. true)
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// ! 2.0.33.3 export объ. в optimization в зависимости от Prod
const optimization = () => {
  // объ. конфиг по умолчанию
  const config = {
    splitChunks: {
      // объедин/разъедин доп библ js (jQ, React). в один файл из 2х не связаных файлов
      chunks: "all", // async
    },
  };
  // е/и prod(true) в minimize добавл. cssmini а css объединяет в один файл
  if (isProd) {
    (config.minimizer = [
      // с видео
      // ! 2.0.33.2 cssmini вывод
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
      // с webpack документации
      // ??? не раб - прибавляет очень много веса, хоть и mini
      // new CssMinimizerPlugin(),
    ]),
      // ! 2.0.43 CSS в один файл
      (config.splitChunks = {
        // объедин/разъедин доп библ js (jQ, React)
        chunks: "all", // async
        cacheGroups: {
          styles: {
            // путь/имя
            name: "styles",
            // убирает доп файл , хз что за js
            type: "css/mini-extract",
            // For webpack@4
            // test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      });
  }
  // возращ по умолчан
  return config;
};

// ! 2.0.35 перименовка файлов в зависимости от режима. более сложное для Prod для кэш и
// const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);
// переписал чтоб передаваемый ext создавал парку с таким же именем
const filename = (ext) =>
  isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`;

// ! 2.0.36 убираем дубли loader в css, scss, less
const cssLoaders = (extra) => {
  // массив по умолчанию
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // hmr: isDev,
        // reloadAll: true,
      },
    },
    // MiniCssExtractPlugin.loader,
    "css-loader",
  ];
  // если есть передаваемый параметр(extra)? добовл. его в конце массива
  if (extra) {
    loaders.push(extra);
  }
  // возвращ умолч
  return loaders;
};

// ! 2.0.39 убираем дубли babel в JS, JSX, TS
const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

// ! 2.0.44 eslint(анализ проблем в js коде) счас только для js
const jsLoaders = () => {
  // по умолчанию. возращ массив
  // const loader = [
  const user = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];

  // е/и раработка, то добавл eslint
  if (isDev) {
    user.push("eslint-loader");
  }

  // возвращ
  // return loader;
  return user;
};

// ! 2.0.47 analyzer и plugin ч/з fn()
const plugins = () => {
  const base = [
    // ! 2.0.15 html выгруж, подкл css, js
    new HTMLWebpackPlugin({
      // template: "./src/index.html",
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["main"],
      // ! 2.0.41 пути в константу
      filename: `${PATHS.dist}index.html`,
      template: `${PATHS.src}index.html`,
    }),
    // ! 2.0.40 проба 2 файла html
    new HTMLWebpackPlugin({
      // filename: "indexReact.html",
      // template: "./src/indexReact.html",
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["app"],
      // ! 2.0.41 пути в константу
      // filename: `${PATHS.static}html/indexReact.html`,
      filename: `${PATHS.dist}html/indexReact.html`,
      template: `${PATHS.src}html/indexReact.html`,
    }),
    // ! 2.0.31 css в отдельн файлы
    new MiniCssExtractPlugin({
      // filename: "style.[name].bundle.css",
      // ! 2.0.35  переименовка. в fn() передаём ext, на выходе css/[name].css
      filename: filename("css"),
    }),
    // ! 2.0.17 очистка ввыводной папки
    new CleanWebpackPlugin(),
    // ! 2.0.30 копир файлов в вывод
    new CopyWebpackPlugin({
      patterns: [
        {
          // от куда и куда копир(файлы, папки)
          from: path.resolve(__dirname, "./src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
        // ! 2.0.45 откл чтоб задать через rules
        // {
        //   from: `${PATHS.src}img`,
        //   to: `${PATHS.dist}img`,
        // },
        {
          from: `${PATHS.src}fonts`,
          to: `${PATHS.dist}fonts`,
        },
      ],
    }),
  ];

  // ! 2.0.47 analyzer подк. е/и Prod
  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

// ! 2.0.8 js компил на этапе сборки, раб на платф node js(доступны эл. из него). как правило export объ. который явл. объ. конфигурации для webpack
module.exports = {
  // ! 2.0.18 укажем где исходники
  // context: path.resolve(__dirname, "src"),
  // сбор в режиме разработки
  mode: "development",
  // указ входной файл
  // entry: "./src/index.js",
  // ! 2.0.12 два ввода
  entry: {
    // main: "./index.js",
    // ! 2.0.37.2 подкл. babel polyfill. от ошибки в браузер(сбор main и polyfill)
    // main: ["@babel/polyfill", "./index.js"],

    // analytics: "./analytics.js",
    // ! 2.0.38.2 typescript подкл. файл
    // analyticsTS: "./analytics.ts",
    // ! 2.0.40 проба 2 файла html
    // app: ["@babel/polyfill", "./indexReact.jsx"],
    // ! 2.0.41 пути в константу
    // можно не пропис index.js. указав src webpack поймёт что нужно. поэтому можем прописать путь с помошью констант
    main: PATHS.src,
    // app: PATHS.src,
    app: `${PATHS.src}js/indexReact.jsx`,
    // ??? не раб - добавл много веса при build  // "@babel/polyfill",
    // "js/appic": ["@babel/polyfill", "./src/js/indexReact.jsx"], // "@babel/polyfill",
    // analytics: "./src/js/analytic/analytics.js",
    // // ! 2.0.38.2 typescript подкл. файл
    // // analyticsTS: "./analytics.ts",
    // // ! 2.0.41 новые пути
    // // 1 имя(выход): 2 путь к исходнику
    // "js/main": ["@babel/polyfill", "./src/js/index.js"], // "@babel/polyfill",
    // // "noReact/noReact": "./src/js/index.js",
    // main: ["./src/js/index.js"],
    // appic: ["@babel/polyfill","./src/js/indexReact.jsx"], // "@babel/polyfill",
  },
  // куда выводить
  output: {
    // path: path.resolve(__dirname, "dist"),
    // ! 2.0.13 добав уникальность(патерн)[name]. есть много патернов
    // filename: "[name].bundle.js",
    // ! 2.0.35 переименовка. в fn() передаём ext, на выходе js/[name].js
    filename: filename("js"),
    // ! 2.0.41 пути в константу
    path: PATHS.dist,
    // склад в static/js/[name].js синтакс ES6
    // filename: `${PATHS.static}js/[name].js`,
    // в видео (QF3EcxymIcc) ~23:00 есть про publicPath(публичн) и contentBase(где откр webpack - dist)
  },
  // plugins доп. узкие настр. ()
  // ! 2.0.47 analyzer подк. plugin в fn() изначальное в комит 
    plugins: plugins(),
  // plugins: [
  //   // ! 2.0.15 html выгруж, подкл css, js
  //   new HTMLWebpackPlugin({
  //     // template: "./src/index.html",
  //     minify: {
  //       collapseWhitespace: isProd,
  //     },
  //     chunks: ["main"],
  //     // ! 2.0.41 пути в константу
  //     filename: `${PATHS.dist}index.html`,
  //     template: `${PATHS.src}index.html`,
  //   }),
  //   // ! 2.0.40 проба 2 файла html
  //   new HTMLWebpackPlugin({
  //     // filename: "indexReact.html",
  //     // template: "./src/indexReact.html",
  //     minify: {
  //       collapseWhitespace: isProd,
  //     },
  //     chunks: ["app"],
  //     // ! 2.0.41 пути в константу
  //     // filename: `${PATHS.static}html/indexReact.html`,
  //     filename: `${PATHS.dist}html/indexReact.html`,
  //     template: `${PATHS.src}html/indexReact.html`,
  //   }),
  //   // ! 2.0.40.1 проба 3+ файла html
  //   // new HTMLWebpackPlugin({
  //   //   filename: "./html/point/indexPoint.html",
  //   //   template: "./src/html/point/indexPoint.html",
  //   //   minify: {
  //   //     collapseWhitespace: isProd,
  //   //   },
  //   //   chunks: ["js/noReact", "js/app"],
  //   // }),
  //   // new HTMLWebpackPlugin({
  //   //   filename: "./html/NoReact/indexNoReact.html",
  //   //   template: "./src/html/NoReact/indexNoReact.html",
  //   //   // template: "./index.html",
  //   //   minify: {
  //   //     collapseWhitespace: isProd,
  //   //   },
  //   //   // chunks:['js/main','analytics']
  //   //   // chunks: ["noReact/noReact", "analytics"],
  //   //   // chunks: ["js/noReact", "analytics", main],
  //   // }),
  //   // ! 2.0.31 css в отдельн файлы
  //   new MiniCssExtractPlugin({
  //     // filename: "style.[name].bundle.css",
  //     // ! 2.0.35  переименовка. в fn() передаём ext, на выходе css/[name].css
  //     filename: filename("css"),
  //     // ! 2.0.41 пути в константу
  //     // filename: `${PATHS}css/[name].css`,
  //     // filename: `${PATHS.dist}css/[name].css`,
  //     // filename: `${PATHS.dist}/css/[name].css`,
  //     // filename: `${PATHS.dist}css/React.css`,
  //     // ! 2.0.41 новые пути
  //     // filename: "styles/[name].css", // styles/путь из entry/имя из entry.css
  //     // filename: "styles.[name].css",// styles.путь из entry/имя из entry.css
  //     // filename: "filename.css" // ??? не раб - неск. созд. инфу с одинак. именами filename.css (фрагм. прилож. и js / noReact)
  //     // filename: "styles.css" // ??? не раб - несколько отправ. инфу в одно имя файла styles.css (фрагм. прилож. и js / noReact)
  //     // filename: filename("css"), // путь из entry/имя из entry.css - вместе с js
  //     // filename: "styles/.css", // ??? не раб - несколько перед. инфу в файлы с одинак стилями / .css (фрагм. прилож. и js / noReact)
  //     // ! 2.0.43 CSS пробы с док webpack
  //     // filename: ({ chunk }) => `${chunk.name.replace("/js/", "styles/css/")}.css`, // ??? не видно изменений
  //   }),
  //   // ! 2.0.17 очистка ввыводной папки
  //   new CleanWebpackPlugin(),
  //   // ! 2.0.30 копир файлов в вывод
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       {
  //         // от куда и куда копир(файлы, папки)
  //         from: path.resolve(__dirname, "./src/favicon.ico"),
  //         to: path.resolve(__dirname, "dist"),
  //       },
  //       // ! 2.0.42 копир img
  //       // ??? не раб - зачем е/и в rules.options можно указ путь
  //       // ??? оробовать https://webpack.js.org/guides/asset-modules/#root
  //       // ! 2.0.45 откл чтоб задать через rules
  //       // {
  //       //   from: `${PATHS.src}img`,
  //       //   to: `${PATHS.dist}img`,
  //       // },
  //       {
  //         from: `${PATHS.src}fonts`,
  //         to: `${PATHS.dist}fonts`,
  //       },
  //     ],
  //   }),
  // ],
  // ! 2.0.20 подкл модули и css
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
        // ! 2.0.31 css в отделн файлы
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   // ! 2.0.31.1 расшир loader
        //   // {
        //   //   // прямо указ какой loader
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {
        //   //     // ! 2.0.32.1 только в разраб
        //   //     // ??? не раб - https://webpack.js.org/plugins/mini-css-extract-plugin/#root
        //   //     // `горячий модуль замены` - измен. эл. без перезагрузки страницы
        //   //     // hmr: true,
        //   //     // hmr: isDev,
        //   //     // reloadAll: true,
        //   //     // publicPath: "./dist/css/",
        //   //     // publicPath: '/public/path/to/'
        //   //   },
        //   // },
        // ],
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders(),
      },
      // ! 2.0.34.1 SCSS подкл.
      {
        test: /\.s[ac]ss$/,
        // use: [
        //   // {
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {},
        //   // },
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   "sass-loader",
        // ],
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders("sass-loader"),
      },
      // ! 2.0.34.2 Less подкл.
      {
        test: /\.less$/,
        // use: [
        //   // {
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {},
        //   // },
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   "less-loader",
        // ],
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders("less-loader"),
      },
      // ! 2.0.22 картинки подкл.
      {
        // устан $$ npm i -D file-loader
        test: /\.(jpe?g|png|gif|svg)$/i,
        // use: ["file-loader"],
        // ! 2.0.42 картинки выгр по другому(QF3EcxymIcc)
        // // use не раб с option
        // loader: "file-loader",
        // options: {
        //   name: "img/[name].[ext]",
        //   // importLoaders: 1,
        //   // minimize: true,
        //   publicPath: '../',
        // },
        // // задаём имя
        // // ??? не раб - раб. только имя ../ раб, однако созд папку с файлом за dist
        // // такой же файл как из copy, но при уник имени созд ещё один
        // options: {
        //   // без ничего только hash.png
        //   // name: '[name].[ext]', // файл в dist
        //   // name: '../[name].[ext]', // файл за dist
        //   name: "img/[name][hash].[ext]", // файл в img/ с hash. созд отдельный файл от копир.
        //   // name: '/img/[name].[ext]', // файл в img/
        //   // name: './img/[name].[ext]', // файл в img/
        //   // name: '../img/[name].[ext]', // парка с файлом за dist
        //   // name:`${PATHS.dist}img/[name].[ext]` // не раб - созд. двойной путь до папки от корня
        // },
        // ! 2.0.45 картинки выгр по док webpack(нов. WP5 метод)
        // !!! https://webpack.js.org/guides/asset-modules/#root
        type: "asset/resource", // не раб - asset, asset/source, asset/inline,
        generator: {
          filename: "img/[name][ext]",
          publicPath: "../",
          // publicPath: "auto",
      //     parser: {
      //    dataUrlCondition: {
      //      maxSize: 4 * 1024 // 4kb
      //    }
      //  }
        },
        // решается и старым методом
        // loader: "file-loader",
        // options: {
        //   name: "img/[name].[ext]",
        //   publicPath: '../',
        // },
        // ??? не раб - css ссылки раб(решает publicPath), НО JS путь ломает(раб если к браузере убрать - ../). 
        // 1 картинка - html - всегда раб. 2 и 3 попеременно от вкл.  publicPath
        // ?!?! при npm start РАБОТАЕТ!!! Пробовал без NODE_ENV(package) dev и build - не прошло
      },
      // ! 2.☺0.23 шрифты подкл.
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      // ! 2.0.24 подкл. xml $$ npm i -D xml-loader
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      // ! 2.0.25 подкл. csv $$ npm i -D csv-loader
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      // ! 2.0.37 для js подкл. babel
      {
        // test: /\.jsx?$/i,
        test: /\.js$/,
        exclude: /(node_modules)/,
        // loader: "babel-loader",
        // ! 2.0.37.1 babel расшир
        // loader:
        // {
        //   // набор плагинов для js
        //   presets: ["@babel/preset-env"], // , "@babel/preset-react"
        //   // ! 2.0.37.3 плагин устан и подкл.
        //   plugins: [
        //     [
        //       "@babel/plugin-proposal-class-properties",
        //       // { loose: true }
        //     ],
        //   ],
        // },
        // }
        // ! 2.0.39 убираем дубли babel options ч/з fn() babelOptions
        // use: {
        //   loader: "babel-loader",
        //   options: babelOptions(),
        // },
        // ! 2.0.44 eslint(анализ проблем в js коде) ч/з fn()
        // используем use заместо loader чтоб был массив
        use: jsLoaders(),
        // loader: jsLoaders()
      },
      // ! 2.0.38.2 typescript устан и настр
      {
        // $$ npm i -D @babel/preset-typescript
        test: /\.ts$/,
        exclude: /node_modules/,
        // loader или use
        use: {
          loader: "babel-loader",
          options:
            // {
            //   presets: ["@babel/preset-env", "@babel/preset-typescript"],
            //   plugins: [
            //     "@babel/plugin-proposal-class-properties",
            //     // { loose: true }
            //   ],
            // },
            // ! 2.0.39 убираем дубли babel options
            babelOptions("@babel/preset-typescript"),
        },
      },
      // ! 2.0.38.1 react устан и настр
      {
        // $$ npm install react react-dom
        // $$ npm i -D @babel/preset-react
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
    ],
  },
  // ! 2.0.26 расшир/сокращ
  resolve: {
    // расшир по умолч. теперь в import/export можно не указ расширение
    extensions: [".js", ".json", ".png"],
    // сокращ указ на путь
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  // ! 2.0.28 доп настр
  // ! 2.0.33.3 ч/з fn() возращ. сгенерированый объ.
  optimization: optimization(),
  // ! 2.0.43 CSS в один файл. счас ч/з fn()
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: "styles",
  //         type: "css/mini-extract",
  //         // For webpack@4
  //         // test: /\.css$/,
  //         chunks: "all",
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  // {
  // ! 2.0.28 выгружать библ(jQuery, ) в один файл из 2х не связаных файлов
  // splitChunks: {
  //   chunks: "all",
  // },
  // ! 2.0.33.1 cssmini вывод
  // ??? прибавляет очень много веса при npm build при такой записи
  // minimizer: [new CssMinimizerPlugin()],
  // },
  // ! 2.0.29 подкл dev-server к webpack для живой перезагрузки
  devServer: {
    // указ где искать
    contentBase: "./dist",
    // порт для запуска
    port: 8081, // 8080 // 4200,
    // ! 2.0.32.1 только в разраб
    hot: isDev,
  },
  // показ в консоле исходный код файла. для разраб(isDev)
  // ??? не раб - при npm build прибавляет очень много веса объед. файлу js
  // ??? проверить https://webpack.js.org/configuration/devtool/#root
  devtool: isDev ? "source-map" : "eval",
  // devtool: "eval-source-map",
};
