/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const path = require('path');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
  mode: 'development',

  /* Manage source maps generation process */
  devtool: 'eval-source-map',

  /* Development Server Configuration */
  devServer: {
    contentBase: path.resolve(environment.paths.output, '../../'),
    watchContentBase: true,
    publicPath: '/',
    open: false,
    historyApiFallback: true,
    compress: true,
    overlay: true,
    hot: true,
    writeToDisk:true,
    liveReload: true,
    watchOptions: {
      poll: false,
    },
    ...environment.server,
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: false,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [],
});
