const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const pxToRem = require('postcss-pxtorem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// util
const _DEV_ = process.env.APP_ENV === 'dev'
function root(...dir) {
  return path.resolve(__dirname, ...dir)
}

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: _DEV_ ? 'development' : 'production',
  devtool: _DEV_ ? 'eval-source-map' : false,
  target: ['web', 'es5'],
  entry: {
    home: root('src/entry/main'),
  },
  output: {
    path: root('dist'),
    filename: 'static/js/[name].[contenthash:6].js',
    publicPath: './',
    clean: true,
  },
  devServer: {
    port: 9900,
    contentBase: root('public'),
    publicPath: '/',
    clientLogLevel: 'silent',
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ]
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
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { 'useBuiltIns': 'usage', 'corejs': 3 }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          _DEV_ ? 'style-loader' : {
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
                  autoprefixer({
                    overrideBrowserslist: [
                      "Android >= 6",
                      "IOS >= 8",
                    ],
                  }),
                  pxToRem({
                    propList: ['*'],
                    rootValue: 100,
                  })
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "@/css/_var";',
            },
          }
        ]
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
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
}

module.exports = config