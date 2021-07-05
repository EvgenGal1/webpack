const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ! 1.0
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { Template } = require("webpack");
// ! 1.0

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // devtool: "source-map",
  // ! 2.0 !!! https://askdev.ru/q/kak-sozdat-neskolko-vyhodnyh-putey-v-konfiguracii-webpack-27864/
  entry: {
    // * имя(в output): путь входы
    "Asrc/a/0a": "./src/a/test2.0a.js",
    "Bsrc/b/index": "./src/b/index.js",
    "Bsrc/b": "./src/b/test2.0b.js",
    // ! 4.0 !!! https://russianblogs.com/article/9357825591/
    // contactUs: ["./src/contactUs.js", "./src/utils/load.js"],
  },
  output: {
    path: path.resolve(__dirname, "distr"),
    filename: "[name].js",
    // * имя(из entry) вместе с путём
  },
  // ! 2.0
  // ! до 2.0
  // entry: {
  //   // ! грузятся только по одному
  //   // main: "./src/index0.js",
  //   app: path.resolve(__dirname, "src", "src1", "index1.jsx"),
  //   // main: "./src/src1/index1.jsx",
  //   // app: "./src/src2/index2.js",
  // },
  // output: {
  //   path: path.resolve(__dirname, "static", "build"),
  //   // ! 1.2
  //   filename: "[name][contenthash].js",
  //   // ! 1.2
  //   // ! до 1.2
  //   // filename: "app.js",
  //   // ! до 1.2
  //   // publicPath: "/static/build2/",
  // },
  // ! до 2.0
  module: {
    rules: [
      // BABEL
      {
        test: /\.jsx?$/i,
        // test: /\.(js|jsx)$/,
        // test: /\.m?js$/,
        // include: path.resolve(__dirname, "static_src"),
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // preset: ["@babel/preset-env", "@babel/preset-react"],
            // plugins: [
            //   ["@babel/plugin-proposal-class-properties", { loose: true }],
            // ],
          },
        },
      },
      // css + style
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      // css + mini
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // css + mini + scss{
      {
        test: /\.s[ac]ss$/i,
        // test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // }
    ],
  },
  plugins: [
    // ! 1.0
    // new HtmlWebpackPlugin(
    //   // ! 1.1
    //   {
    //     //   title: 'test 1 copy' // не раб с template
    //     // ! 1.1
    //     // ! 1.4
    //     template: "./src/index.html",
    //   }
    //   // ! 1.4
    // ),
    // ! 1.0
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    // ! 3.0 !!! https://progi.pro/nastroyka-webpack-dlya-neskolkih-veb-stranic-html5-5721486
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      // * "Asrc/a/0a" - принимает имя/путь(из entry) js файла с подкл. стилями
      chunks: ["index", "Asrc/a/0a", "Bsrc/b/index", "Bsrc/b"],
    }),
    new HtmlWebpackPlugin({
      filename: "page1.html",
      template: "src/page1.html",
      // * подкл. CSS и JS из файлов(из entry)("Asrc/a/0a" , "Bsrc/b/index"),
      chunks: ["page1", "Asrc/a/0a", "Bsrc/b/index"],
    }),
    new HtmlWebpackPlugin({
      filename: "page2.html",
      template: "src/a/page2.html",
      chunks: ["page2", "Asrc/a/0a"],
    }),
    // ! 3.0
    // ! 4.0
    // new HtmlWebapckPlugin({
    //   filename: "contactUs.html",
    //   chunks: ["contactUs"],
    // }),
    // ! 4.0
  ],
};
