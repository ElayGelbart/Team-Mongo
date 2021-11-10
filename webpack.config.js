/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/Front/main.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/Front/index.html',
    filename: './index.html'
  })],
}