/*
  autoprefixer - https://github.com/postcss/autoprefixer
  cssnano - https://github.com/cssnano/cssnano
  ! css-mqpacker - https://github.com/hail2u/node-css-mqpacker - БЫЛ УДАЛЕН! Не использовать!
*/
https://www.npmjs.com/package/cssnano-webpack-plugin

module.exports = {
  plugins: [
    // префиксы добав
    require('autoprefixer'),
    // сжатия кода
    require('cssnano')({
      preset: [
        'default',
        {
          // коммит убираем
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}
