const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].[hash:12].js',
    // path: path.resolve(__dirname, "dist")
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
          limit: 8000
        }
      },
      {
        test: /\.(png|jpg|gif)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          esModule: false
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)?$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@components': path.resolve(__dirname, '../src/components/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "ENV": JSON.stringify(process.env.ENV)
    })
  ]
}