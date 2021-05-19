const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const pxToRem = require('postcss-pxtorem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { webpackExt } = require('apite')

// util
const _DEV_ = process.env.APP_ENV === 'dev'
function root(...dir) {
  return path.resolve(__dirname, ...dir)
}
const CssLoader = [_DEV_ ? 'style-loader' : {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../../'
  }
},
'css-loader',
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        autoprefixer({}),
        pxToRem({
          propList: ['*'],
          rootValue: 100,
        })
      ]
    }
  }
}]

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: _DEV_ ? 'development' : 'production',
  devtool: _DEV_ ? 'eval-source-map' : false,
  stats: _DEV_ ? 'minimal' : 'normal',
  target: 'web',
  entry: {
    home: root('src/entry/main'),
  },
  output: {
    path: root('dist'),
    filename: 'static/js/[name].[contenthash:6].js',
    chunkFilename: 'static/js/[name].[contenthash:6].js',
    publicPath: './',
    clean: true,
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    }
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    port: 9900,
    contentBase: root('public'),
    publicPath: '/',
    hot: true,
    disableHostCheck: true,
    clientLogLevel: 'error',
    // doc & proxy
    after: _DEV_ && webpackExt({
      dir: root('mock'),
      prefix: '/api',
      proxy: 'http://m.91qycl.com'
    })
  },
  optimization: {
    minimize: !_DEV_,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'common',
          priority: 1,
          enforce: true
        },
        vant: {
          test: /vant/,
          chunks: 'initial',
          name: 'vant',
          priority: 2,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // vue plugin
    new VueLoaderPlugin(),
    // env
    new webpack.DefinePlugin({
      'process.env': {
        'APP_ENV': `'${process.env.APP_ENV}'`,
      }
    }),
    // make html
    new HtmlWebpackPlugin({
      template: root('src/entry/index.html'),
      filename: 'index.html',
    }),
    // css to file
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:6].css',
      chunkFilename: 'static/css/[name].[contenthash:6].css',
    }),
    // copy file
    new CopyWebpackPlugin({
      patterns: [{
        from: root('public'),
        to: root('dist')
      }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          ...CssLoader,
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "@/css/_var";',
            },
          }
        ]
      },
      {
        test: /\.css$/i,
        use: CssLoader,
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/image/[name].[hash:6][ext][query]'
        },
      },
    ]
  },
  resolve: {
    alias: {
      '@/': root('src'),
      '@/image': root('src/asset/image'),
      '@/css': root('src/asset/css'),
    }
  },
}

module.exports = config