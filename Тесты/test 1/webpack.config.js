const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    // ! грузятся только по одному
    // main: "./src/index0.js",
    main: path.resolve(__dirname, "src", "src1", "index1.jsx"),
    // main: "./src/src1/index1.jsx",
    // app: "./src/src2/index2.js",
  },
  // devtool: "eval-source-map",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "static", "build"),
    filename: "app.js",
    // publicPath: "/static/build2/",
  },
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
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      // css + mini + scss{
      {
        // test: /\.s[ac]ss$/i,
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
