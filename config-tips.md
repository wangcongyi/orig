* 2017-11-14 使用 webpack 3.X 版本 和 postcss；不用写postcss.config.js
* 2018-02-07 增加 postcss-nested,postcss-cssnext （ cssnext 插件已经包含 autoprefixer 可以在配置文件中删除）
* 2018-11-1 有篇文章很长,但十分详细的说明 [webpack v4](https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development)


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
* 2018-02-23 与 `postcss` 结合，并且生成 `json` 静态资源映射表（`map-json-webpack-plugin` `webpack-assets-manifest` `assets-webpack-plugin` `webpack-manifest-plugin`）


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
    new webpack.optimize.UglifyJsPlugin(),
    require('map-json-webpack-plugin')({
      output:'dist/map.json'
    })
  ]
};

```



* 2018-02-28 对现有的项目结构做以下调整，估计以后也会用得到

```js
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const mapJSON = require('webpack-assets-manifest');
const beforeClean = require('clean-webpack-plugin');
const afterClean = require('webpack-clean');

module.exports = {
    entry: {
        bind: './static/css/bind.css',
        checkin: './static/css/checkin.css',
        common: './static/css/common.css',
        iber1028: './static/css/iber1028.css',
        illnesses: './static/css/illnesses.css',
        // index: './static/css/index.css',
        // mobiscroll: './static/css/mobiscroll.custom-2.17.0.min.css',
        // my: './static/css/my.css',
        // news: './static/css/news.css',
        // policy: './static/css/policy.css',
        // products: './static/css/products.css',
        // register: './static/css/register.css',
        // theme: './theme.css',
    },
    output: {
        filename: "js/css/[name]-[chunkhash:8].css",
        path: path.resolve(__dirname, 'assets')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../'
                })
            },
            {
                test: /\.(png|jpe?g|gif|webp)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'iconfont/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new beforeClean(['assets', 'dist']),
        new afterClean(['assets/js']),
        new ExtractTextPlugin("css/[name]-[contenthash:8].css"),
        new mapJSON({
            output: './map.json'
        })
    ]
};

```


结合起来

```js
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const mapJSON = require('webpack-assets-manifest');
const beforeClean = require('clean-webpack-plugin');
const afterClean = require('webpack-clean');
const glob_entry = require('webpack-glob-folder-entries');


module.exports = {
    entry: glob_entry('./static/css/**/*.css'),
    output: {
        filename: "js/css/[name]-[chunkhash].css",
        path: path.resolve(__dirname, 'res'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    use: ['css-loader', {
                        loader: 'postcss-loader', options: {
                            plugins: loader => [
                                require('postcss-simple-vars')(),
                                require('postcss-cssnext')(),
                                require('postcss-nested')(),
                                require('cssnano')
                            ]
                        }
                    }],
                })
            },
            {
                test: /\.(png|jpe?g|gif|webp)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'iconfont/[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new beforeClean(['assets', 'dist','res']),
        new afterClean(['res/js/css']),
        new ExtractTextPlugin("css/[name]-[contenthash].css"),
        new mapJSON({
            output: '../mapcss.json',
            publicPath:'res/',
            contextRelativeKeys:true
        })
    ]
};

```


