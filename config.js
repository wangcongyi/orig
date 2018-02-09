////////////////////////////////////////////////////
// 2017-11-14 使用webpack 3.X 版本 和 postcss
// 2018-2-7 增加 postcss-nested,postcss-cssnext （ cssnext 插件已经包含 autoprefixer 可以在配置文件中删除）
//  webpack.config.js
// var ex = require('extract-text-webpack-plugin');
// module.exports = {
//   entry: {
//     ac1: './src/acone.css',
//     ac2: './src/arctwo.css'
//   },
//   output: {
//     filename: "[name].css"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: ex.extract({
//           fallback: 'style-loader',
//           use: [ 'css-loader', {
//               loader:'postcss-loader',options:{
//                  plugins: loader => [
//                    require('postcss-simple-vars')(),
//                    require('postcss-cssnext')(),
//                    require('postcss-nested')(),
//                    //require('autoprefixer')(),
//                    require('cssnano')()
//                  ]
//                }
//                } ]
//         })
//       }
//     ]
//   },
//
//   plugins: [
//     new ex('./build/[name].css')
//   ]
// }
