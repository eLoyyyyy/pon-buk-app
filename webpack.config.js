/*
    ./webpack.config.js
*/

const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('public/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
