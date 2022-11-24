/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfiguration = require('../webpack.config');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const WebpackEmptyFilesCleanUpPlugin = require('webpack-empty-files-cleanup-plugin');
const globAll = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

module.exports = merge(webpackConfiguration, {
  mode: 'production',

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,

  /* Optimization configuration */
  optimization: {
    minimize: true,
    removeEmptyChunks: true,
    minimizer: [
      new TerserPlugin()
    ]
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
    }),
    new CheckerPlugin(),
    new PurgeCSSPlugin({
      paths: globAll.sync([
        path.join(__dirname, '../*.php'),
        path.join(__dirname, '../templates/*.php'),
        path.join(__dirname, '../templates/**/*.php'),
        path.join(__dirname, '../resources/assets/scripts/**/*.*'),
      ]),
      safelist: {
        standard: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'figure', 'noscript', 'img', 'ol', 'ul', 'li', 'table', 'tbody', 'thead', 'tfoot', 'iframe', 'tr', 'td', 'th', 'input', 'textarea'],
      }
    }),
    new WebpackEmptyFilesCleanUpPlugin({
      verbose: true,
      dry: false
    }),
  ],
});
