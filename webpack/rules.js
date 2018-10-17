const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const createMinifier = require('css-loader-minify-class');

const isDev = process.env.NODE_ENV;


const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};


const clientDev = [
  babelLoader,
];

const serverDev = [
  babelLoader,
];

module.exports = {
  client: {
    dev: clientDev,
    prod: clientDev,
  },
  server: {
    dev: serverDev,
    prod: serverDev,
  },
};
