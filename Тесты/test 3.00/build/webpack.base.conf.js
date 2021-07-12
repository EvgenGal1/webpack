// 3 видео. для объед опций Prod/Dev перепис webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 3 видео
const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/",
};

module.exports = {
  // получ доступ PATHS из других config. будем обращ ч/з externals - ярлык: куда
  externals: { paths: PATHS },
  entry: {
    // app: "./src/index.js",
    // 3 видео
    app: PATHS.src,
  },
  output: {
    // filename: "[name].js",
    // 3 видео. синтакс ES6
    filename: `${PATHS.assets}js/[name].js`,
    // path: path.join(__dirname, "./dist"),
    // 3 видео. пути ч/з конст
    path: PATHS.dist,
    // publicPath: "/dist",
    // 3 видео делаем публичным?, допись в dev. ставим точку
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: { 
          // без доп из test 2.0 не раб
          name: "img/[name].[ext]", 
          // без доп из test 2.0 не раб
          publicPath: "../" },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              // исходные карты
              sourceMap: true,
              // указ где искать
              postcssOptions: {
                config: path.resolve(__dirname, "../src/js/postcss.config.js"),
              },
              // ??? не раб???
              // config: { path: "src/js/postcss.config.js" },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, "../src/js/postcss.config.js"),
              },
              // config: { path: "src/js/postcss.config.js" },
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/img`,
          to: `${PATHS.assets}img`,
        },
        {
          from: `${PATHS.src}/static`,
          to: "",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  // 3 видео. 3 WP.conf файла для разделен Prod/Dev
  // devServer: {
  //   overlay: true,
  // },
};
