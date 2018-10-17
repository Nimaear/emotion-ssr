const path = require('path');
const { resolve, rules, plugins } = require('./config');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=true&noInfo=true',
    path.resolve(__dirname, '../src/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/static/',
    globalObject: 'this',
  },
  module: {
    rules: rules.client.dev,
  },
  resolve,
  plugins: plugins.client.dev,
};
