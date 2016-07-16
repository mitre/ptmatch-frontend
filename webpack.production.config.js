var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'bootstrap-loader',
    'font-awesome-sass-loader!./font-awesome.config.js',
    path.join(__dirname, "src", "index.js")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "assets/[name]-[hash].js",
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name]-[hash].[ext]' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=assets/[name]-[hash].[ext]' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.tmpl.html")
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'assets/images' }
    ]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("assets/[name]-[hash].css")
  ]
};
