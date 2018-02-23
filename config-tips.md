* 2017-11-14 使用 webpack 3.X 版本 和 postcss；不用写postcss.config.js
* 2018-02-07 增加 postcss-nested,postcss-cssnext （ cssnext 插件已经包含 autoprefixer 可以在配置文件中删除）

```js
  var ex = require('extract-text-webpack-plugin');
  module.exports = {
    entry: {
      a: './css/aa.scss',
    },
    output: {
      filename: "./build/[name].css"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ex.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', {
              loader: 'postcss-loader', options: {
                plugins: loader => [
                  require('postcss-simple-vars')(),
                  require('postcss-cssnext')(),
                  require('postcss-nested')(),
                  require('cssnano')()
                ]
              }
            }]
          })
        }
      ]
    },
    plugins: [
      new ex('./build/[name].css')
    ]
  };
  
```


* 2018-02-23 `hash` -> `chunkhash` -> `contenthash`

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: ["lodash"]
  },
  output: {
    filename: "[name]-[chunkhash:8].js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'caching', template: path.resolve(__dirname, 'src/index.html') }),
    new ExtractTextPlugin("index-[contenthash:8].css"),
  ]
};

```
