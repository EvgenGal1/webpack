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
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// ! 2.0.32 режимы разраб/продукт (получ. true)
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// ! 2.0.33.3 export объ. в optimization
const optimization = () => {
  // объ. конфиг по умолчанию
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  // е/и prod(true) в minimize добавл. cssmini
  if (isProd) {
    config.minimizer = [
      // с видео
      // ! 2.0.33.2 cssmini вывод
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
      // с webpack документации
      // ??? не раб - прибавляет очень много веса, хоть и mini
      // new CssMinimizerPlugin(),
    ];
  }
  // возращ по умолчан
  return config;
};

// ! 2.0.35 перименовка файлов в зависимости от режима. более сложное для Prod для кэш и
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

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

// const babelOptions = preset => {
//   const opts = {
//     presets: [
//       '@babel/preset-env'
//     ],
//     plugins: [
//       '@babel/plugin-proposal-class-properties'
//     ]
//   }

//   if (preset) {
//     opts.presets.push(preset)
//   }

//   return opts
// }

// const jsLoaders = () => {
//   const loaders = [{
//     loader: 'babel-loader',
//     options: babelOptions()
//   }]

//   if (isDev) {
//     loaders.push('eslint-loader')
//   }

//   return loaders
// }

// const plugins = () => {
//   const base = [
//     new HTMLWebpackPlugin({
//       template: './index.html',
//       minify: {
//         collapseWhitespace: isProd
//       }
//     }),
//     new CleanWebpackPlugin(),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, 'src/favicon.ico'),
//           to: path.resolve(__dirname, 'dist')
//         }
//       ]
//     }),
//     new MiniCssExtractPlugin({
//       filename: filename('css')
//     })
//   ]

//   if (isProd) {
//     base.push(new BundleAnalyzerPlugin())
//   }

//   return base
// }

// ! 2.0.8 js компил на этапе сборки, раб на платф node js(доступны эл. из него). как правило export объ. который явл. объ. конфигурации для webpack
module.exports = {
  // ! 2.0.18 укажем где исходники
  context: path.resolve(__dirname, "src"),
  // сбор в режиме разработки
  mode: "development",
  // указ входной файл
  // entry: "./src/index.js",
  // ! 2.0.12 два ввода
  entry: {
    main: "./index.js",
    //     main: ['@babel/polyfill', './index.jsx'],
    analytics: "./analytics.js",
  },
  // куда выводить
  output: {
    path: path.resolve(__dirname, "dist"),
    // ! 2.0.13 добав уникальность(патерн)[name]. есть много патернов
    // filename: "[name].bundle.js",
    // ! 2.0.35 переименовка. в fn() передаём ext(js)
    filename: filename("js"),
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
    contentBase: './dist',
    // порт для запуска
    port: 4200,
    // ! 2.0.32.1 только в разраб
    hot: isDev,
  },
  // devtool: isDev ? "source-map" : "eval-source-map",
  // devtool: "eval-source-map", // ??? прибавляет очень много веса при npm build
  plugins: [
    //   plugins: plugins(),
    // ! 2.0.15 html выгруж, подкл css, js
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    // ! 2.0.17 очистка ввыводной папки
    new CleanWebpackPlugin(),
    // ! 2.0.30 копир файлов в вывод
    new CopyWebpackPlugin({
      patterns: [
        {
          // от куда и куда копир(файлы, папки)
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    // ! 2.0.31 css в отдельн файлы
    new MiniCssExtractPlugin({
      // filename: "style.[name].bundle.css",
      // ! 2.0.35  переименовка. в fn() передаём ext(css)
      filename: filename("css"),
    }),
  ],
  // ! 2.0.20 подкл модули и css
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders(),
        // ! 2.0.31 css в отделн файлы
        // use: [
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
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        // ],
      },
      // ! 2.0.34.1 SCSS подкл.
      {
        test: /\.s[ac]ss$/,
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders('sass-loader'),
        // use: [
        //   // {
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {},
        //   // },
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   "sass-loader",
        // ],
      },
      // ! 2.0.34.2 Less подкл.
      {
        test: /\.less$/,
        // ! 2.0.36 убираем дубли loader
        use: cssLoaders('less-loader'),
        // use: [
        //   // {
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {},
        //   // },
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   "less-loader",
        // ],
      },
      {
        // ! 2.0.22 подкл. картинки $$ npm i -D file-loader
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        // ! 2.0.23 подкл. шрифты
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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: jsLoaders(),
      // },
      //       {
      //         test: /\.ts$/,
      //         exclude: /node_modules/,
      //         loader: {
      //           loader: 'babel-loader',
      //           options: babelOptions('@babel/preset-typescript')
      //         }
      //       },
      //       {
      //         test: /\.jsx$/,
      //         exclude: /node_modules/,
      //         loader: {
      //           loader: 'babel-loader',
      //           options: babelOptions('@babel/preset-react')
      //         }
      //       }
    ],
  },
  // }
};
