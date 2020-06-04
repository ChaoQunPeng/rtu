const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    // contentBase: path.join(__dirname, 'release'),
    proxy: {
      '/api': {
        target: 'http://localhost:3339/'
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(ttf|woff|woff2?|eot)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 80000
        }
      },
      {
        test: /\.(png|jpg|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 80000,
          esModule: false
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}