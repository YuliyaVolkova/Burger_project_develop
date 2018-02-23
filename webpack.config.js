const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({filename:'./assets/css/styles.css', allChunks:true});
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;


 module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    app: ['./app/app.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
  /*  publicPath: 'assets',*/
    filename: 'bundle.js',
  },

  devtool: "source-map",
  //target: "async-node",
  stats: "errors-only",

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    // Display only errors to reduce the amount of output.
    //stats: "errors-only",
   // compress: true,
    inline: true,
   // https: true,
    progress: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
  },

  module: {
    rules: [
    {
      test: /\.(jpe?g|png|gif|svg)$/i,   //to support eg. background-image property 
      loader:'file-loader',
      query:{
        name:'[name].[ext]',
        outputPath:'images/',
        publicPath: '../',
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
      }
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule 
      loader: 'url-loader',
      query:{
        limit:'2000',
        name:'[name].[ext]',
        outputPath:'fonts/',
        publicPath: '../',
        //the fonts will be emmited to public/assets/fonts/ folder 
        //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }  
      }
    },
    {
      test: /\.(scss|sass)$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{ loader:'css-loader',
                options: {sourceMap: true} 
              },
              {loader: 'postcss-loader',
               options: {sourceMap: 'inline'}
             },
              { loader:'sass-loader',
                options: {sourceMap: true} 
              }
            ] 
      })    
    },
    {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
           presets: ['es2015']
        }
    } 
  ]},
  
  plugins: [
   
      extractSass,
      new BrowserSyncPlugin(
      // BrowserSync options
      {
       // host: HOST,
        //port: PORT,
        //proxy: 'http://localhost:3100/',
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
  //  new CleanWebpackPlugin(['build'])

  ],
}


/*devServer: {
 contentBase: path.resolve(__dirname, 'build'),
 inline: true,
 hot: true
};

//package.json
{
scripts: 
   {“start”: “webpack-dev-server --hot --inline”}
}*/

/*new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
      }),*/

/*devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
  },
  //When the source changes, all 3 options generates new bundle but,
 
//1. doesn't reload the browser page
$ webpack-dev-server
//2. reloads the entire browser page
$ webpack-dev-server --inline
//3. reloads just the module(HMR), or the entire page if HMR fails
$ webpack-dev-server  --inline --hot*/






/*module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./home.js', './events.js', './vendor.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};*/
/* module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'assets'),
    publicPath: '/assets',                          // New
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),    // New
  },
};*/
/*{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/i,
        use:  ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: { importLoaders: 1 },
            }],
          }),
      },
     {
        test: /\.(sass|scss)$/i,
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader',
        ]
      }*/
/*
      {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader']
      })     
    },
    {
      test: /\.css$/,
      use: extractCSS.extract({
        fallback: 'style-loader',
        use: [{ loader:'css-loader',
                options: {sourceMap: true} 
              },
         'postcss-loader']
      })     
    }, */