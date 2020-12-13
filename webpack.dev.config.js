const path = require('path');
var ENTRY_PATH = path.join(__dirname, 'client/src/index.jsx');
var OUT_PATH = path.resolve(__dirname, 'public/dist');
module.exports = {
  entry: ENTRY_PATH,
  output: {
    path: OUT_PATH,
    filename: 'bundle.js'
  },
  watch: true,
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};