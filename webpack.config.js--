const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js',
    // print: './src/print.js'
  },
  devServer: {
    contentBase: './dist/index.html',
    port: 8800
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash:12].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}