const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = merge(common, {

  devtool: 'inline-source-map',

  output: {

     publicPath: 'http://localhost:8080/',
   },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
  },

   plugins: [
      new BrowserSyncPlugin(
      {
        host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
      },

      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
      ),
  ]
});