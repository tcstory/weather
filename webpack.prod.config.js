var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postPxToEm = require('postcss-px-to-em');

var flag = false;
process.argv.forEach(function (item) {
  if (item === '--precache') {
    flag = true;
  }
});

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash:6].js',
    chunkFilename: "js/chunk/[name].[chunkhash:6].js"
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=10000&name=images/[name].[hash:6].[ext]'
      },
      {
        test: /\.(woff|eot|ttf).*?$/i,
        loader: 'url?limit=10000&name=fonts/[name].[hash:6].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('css/[name].[chunkhash:6].css'),
    new webpack.DefinePlugin({
      __DEV__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false}
    }),
  ],
  postcss: function () {
    return [autoprefixer, postPxToEm({base: 16})];
  },
  eslint: {
    failOnError: true
  },
  devtool: 'cheap-module-source-map'
};

if (flag) {
  module.exports.entry = Object.assign(module.exports.entry, {
    'service-worker-registration': ['./src/service-worker-registration.js']
  })
}
