* 2017-11-14 使用 webpack 3.X 版本 和 postcss；不用写postcss.config.js
* 2018-02-07 增加 postcss-nested,postcss-cssnext （ cssnext 插件已经包含 autoprefixer 可以在配置文件中删除）
* TODO: output 估计有更好的写法
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

