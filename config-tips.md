* 2017-11-14 使用 webpack 3.X 版本 和 postcss；不用写postcss.config.js
* 2018-02-07 增加 postcss-nested,postcss-cssnext （ cssnext 插件已经包含 autoprefixer 可以在配置文件中删除）
* 2018-11-01 有篇文章很长,但十分详细的说明 [webpack v4](https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development)
* 2021-06-15 webpack v5 已经出来很久了，推荐使用 [vite2](https://vitejs.dev/)
* 2021-11-17 使用 swc 代替 babel

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



```js
const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')
const timestamp = require('time-stamp')
const { override, fixBabelImports, addPostcssPlugins, addWebpackAlias, addDecoratorsLegacy, addWebpackPlugin } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addPostcssPlugins([require('postcss-px2rem-exclude')({ remUnit: 37.5, exclude: /node_modules|dist/i })]),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addWebpackPlugin(
    new ZipPlugin({
      path: '../build/',
      filename: `share-nfs-jifen_${timestamp('YYYYMMDDHHmm')}`
    })
  ),
  addDecoratorsLegacy()
);


```

```js 
setupProxy.js
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/mall", {
      target: "http://172.20.21.46:5601/",
      changeOrigin: true
    })
  );
};
```








#### webpack5

// webpack.common
```js

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: `[name]/[name].[chunkhash:8].js`,
    chunkFilename: `statics/js/[id].[chunkhash:8].chunk.js`,
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.jpg', '.png', '.jpeg', '.gif'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(webp|png|svg|jpg|gif|jpe?g)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
}



```


// webpack dev
```js
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: false,
    disableHostCheck: true,
    compress: true,
    inline: true,
    hot: true,
    port: 9100,
    quiet: false,
    open: 'http://localhost:9100',
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
      filename: 'index.html',
    })
  ]
})


```

// webpack prod


```js

const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chuck.js',
    publicPath: './',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin')
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {},
          },
        }).apply(compiler)
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'QTrade',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ]
})


```



webpack5  about type asset

```js

{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
},
{
  test: /\.less$/,
  exclude: /node_modules/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
},
{
  test: /\.(eot|ttf|wofff|woff2|otf)$/,
  type: 'asset/inline',
},
{
  test: /\.(webp|png|svg|jpg|gif|jpe?g)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 8 * 1024,
    }
  }
}

```


vite2 with antd-mobile  
must npm install indexof?.

```js

import path from 'path'
import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  base: '/mobile-profile/',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd-mobile',
          esModule: true,
          resolveStyle: name => {
            return `antd-mobile/es/${name}/style/css`
          },
        },
      ],
    }),
  ],
  server: {
    open: true,
    proxy: {
      '/qtrade_ums/': {
        target: 'https://test.qtrade.com.cn',
        changeOrigin: true,
        secure: false,
      },
      '/qtrade_bond/': {
        target: 'https://dev.qtrade.com.cn',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    assetsInlineLimit: 8192,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})


```


使用 swc 代替 babel 
安装 swc， 新建 `.swcrc` 文件 ，修改 `webpack.config.js` 里的 loader

```js
// npm i @swc/cli @swc/core swc-loader -D
// .swcrc

[
  {
    "test": ".tsx?$",
    "jsc": {
      "parser": {
        "syntax": "typescript",
        "tsx": true,
        "decorators": false,
        "dynamicImport": true
      },
      "transform": {
        "react": {
          "refresh": true
        }
      }
    }
  },
  {
    "test": ".jsx?$",
    "jsc": {
      "parser": {
        "syntax": "ecmascript",
        "jsx": true,
        "decorators": false,
        "dynamicImport": true
      },
      "transform": {
        "react": {
          "refresh": true
        }
      }
    }
  }
]


//  webpack.config.js

 {
    test: /\.jsx?$/ ,
    exclude: /node_modules/,
    use: {
         //  loader: "babel-loader"
         loader: "swc-loader"
    }
```



