/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * Webpack main configuration file
 */

const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const globImporter = require('node-sass-glob-importer-plus');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MediaQueryPlugin = require('media-query-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const environment = require('./configuration/environment');
const { url } = require('inspector');
const files = glob.sync(`${environment.paths.source}/{scripts,styles}/**/!(_)*.+(ts|js|scss|sass)`);

const entries = files.map((file) => ({
  name: path.parse(file).name,
  path: file,
})).reduce((red, file) => {
  if (red[file.name] !== undefined) {
    red[file.name].push(file.path);
  } else {
    red[file.name] = [file.path];
  }
  return red;
}, {});

module.exports = {
  entry: entries,
  output: {
    filename: 'scripts/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false,
            }
          },
          {
            loader: MediaQueryPlugin.loader
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                importer: globImporter()
              }
            }
          }
        ],
      },
      {
        test: /\.ts?$/,
        use: ['awesome-typescript-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              publicPath: '../',
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[folder]/[name].[ext]',
              publicPath: '../',
              outputPath: '../',
              limit: environment.limits.images,
            },
          }
        ],
      },
      {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[ext]',
              limit: environment.limits.fonts,
              mimetype: 'application/font-woff'
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new ImageMinPlugin({
      test: /\.(jpg|jpeg|png|gif)$/i,
      optipng: { optimizationLevel: 3 },
      jpegtran: { progressive: true },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images'),
          to: path.resolve(environment.paths.output, 'images'),
          noErrorOnMissing: true,
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
    new CleanWebpackPlugin({
      verbose: false,
    }),
    new CheckerPlugin(),
  ],
  target: 'web',
};
