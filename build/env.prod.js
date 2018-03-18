const path = require('path')
const webpack = require('webpack')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require('autoprefixer')

const root = path.resolve(__dirname, '..')
const rootDist = path.resolve(root, 'dist')

module.exports = {
  mode: 'production',
  entry: {
    home: root + '/app/entry/home/main.js',
    shop: root + '/app/entry/shop/main.js',
  },
  output: {
    path: rootDist,
    // publicPath: '/',
    filename: 'static/chunk/js/[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        miniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: process.env.NODE_ENV == 'prod'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              autoprefixer({ browsers: ["iOS >= 7", "Android >= 4"] })
            ]
          }
        }
      ]
    }],
  },
  plugins: [
    new cleanWebpackPlugin([rootDist + '/static/chunk'], {
      root: root
    }),
    new htmlWebpackPlugin({
      template: root + '/app/entry/home/index.html',
      filename: 'home/index.html',
      chunks: ['home']
    }),
    new htmlWebpackPlugin({
      template: root + '/app/entry/shop/index.html',
      filename: 'shop/index.html',
      chunks: ['shop']
    }),
    new miniCssExtractPlugin({
      filename: 'static/chunk/css/[name].[chunkhash:5].css',
      chunkFilename: "[id].css"
    })
  ],
}