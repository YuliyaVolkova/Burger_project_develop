const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {

  devtool: 'source-map',

  output: {
    
     publicPath: 'https://webmanshake.ru/',
  },

  plugins: [
      new UglifyJSPlugin({sourceMap: true,
      					compress: true,
      				}),

     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

      // Minify CSS
   	 new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
});