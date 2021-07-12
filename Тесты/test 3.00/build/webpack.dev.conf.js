// 3 видео. для Dev разраб
// пропис conct webpack в plugins можно посмотр их кол-во
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV settings gonna be here
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    // пропис путь где откр webpack
    contentBase: baseWebpackConfig.externals.paths.dist,
    // historyApiFallback: true,
    // noInfo: true,
    overlay: {
      // warnings: true, // для начал. уровень
      warnings: false,
      errors: true,
    },
    port: 8081,
  },
  // набирая new webpack. можно увидеть плагины
  plugins: [
    // карта сайта
    new webpack.SourceMapDevToolPlugin({
      // для корект раб сайта. без него не увидем влож файлы scss
      filename: "[file].map",
    }),
  ],
});

// export devWebpackConfig
module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
