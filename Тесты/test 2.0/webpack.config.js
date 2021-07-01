// ! 2.0.8 созд webpack.config.js
// подкл path встрен. модуль в node js
const path = require("path");
// ! 2.0.15 устан html плагин и пропис его. выгр html, подкл стили, js
const HTMLWebpackPlugin = require("html-webpack-plugin");
// ! 2.0.17 очистка ввыводной папки
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// const isDev = process.env.NODE_ENV === 'development'
// const isProd = !isDev

// const optimization = () => {
//   const config = {
//     splitChunks: {
//       chunks: 'all'
//     }
//   }

//   if (isProd) {
//     config.minimizer = [
//       new OptimizeCssAssetWebpackPlugin(),
//       new TerserWebpackPlugin()
//     ]
//   }

//   return config
// }

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

// const cssLoaders = extra => {
//   const loaders = [
//     {
//       loader: MiniCssExtractPlugin.loader,
//       options: {
//         hmr: isDev,
//         reloadAll: true
//       },
//     },
//     'css-loader'
//   ]

//   if (extra) {
//     loaders.push(extra)
//   }

//   return loaders
// }

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
    // ! 2.0.13 добав уникальность(патерн)[name]. есть много патернов
    filename: "[name].bundle.js",
    // filename: filename('js'),
    path: path.resolve(__dirname, "dist"),
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
  // ! 2.0.28 выгружать библ(jQuery, ) в один файл из 2х не связаных файлов
  optimization: {
    // optimization(),
    splitChunks: {
      chunks: "all",
    },
  },
  // ! 2.0.29 подкл dev-server к webpack для живой перезагрузки
  devServer: {
    // порт для запуска
    // port: 4200,
    port: 4200,
    // hot: isDev,
  },
  //   devtool: isDev ? 'source-map' : '',
  plugins: [
    // ! 2.0.15 устан html плагин и пропис его
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    // ! 2.0.17 очистка ввыводной папки
    new CleanWebpackPlugin(),
  ],
  //   plugins: plugins(),
  // ! 2.0.20 подкл модули и css
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // use: cssLoaders()
      },
      //       {
      //         test: /\.less$/,
      //         use: cssLoaders('less-loader')
      //       },
      //       {
      //         test: /\.s[ac]ss$/,
      //         use: cssLoaders('sass-loader')
      //       },
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
