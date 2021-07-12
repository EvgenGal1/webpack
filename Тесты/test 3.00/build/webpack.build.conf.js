// 3 видео. для Prod разраб
const {merge} = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
// прописываем и сливаем? наст из build в base
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",

  plugins: [],
});

// передаем в buildWebpackConfig промис с 2мя парам(решить,отклонить)
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
