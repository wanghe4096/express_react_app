/*eslint-env node*/
/*eslint no-var:0*/
var path = require('path'),
  fs = require('fs'),
  webpack = require('webpack');
ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var staticPrefix = 'public',
  distPath = staticPrefix + '/dist';

var entry = {
  // js
  // 'app': path.join(__dirname, 'public/javascripts/app.js'),
  app: path.join(__dirname, 'public', 'javascripts/app.js'),
  // css
  // NOTE: this will also create an empty 'sentry.js' file
  // TODO: figure out how to not generate this
  // 'sentry': path.join(__dirname, 'public/less/app.less')
  'sentry': path.join(__dirname, 'public', 'less/app.less')
};


var config = {
  context: path.join(__dirname, staticPrefix),
  entry: entry,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(vendor|node_modules|dist)/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      include: path.join(__dirname, staticPrefix),
      // loader: 'style-loader!css-loader!less-loader'
      loader: ExtractTextPlugin.extract('style-loader',
        'css-loader!less-loader')
    }, {
      test: /\.(woff|woff2|ttf|eot|svg|png|gif|ico|jpg)($|\?)/,
      loader: 'file-loader?name=' + '[name].[ext]'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, 'public', "index.html.tpl")
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, staticPrefix), 'node_modules'],
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: distPath,
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'exports',
    sourceMapFilename: '[name].js.map',
  }
};


module.exports = config;
