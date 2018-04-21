const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./assets/css/normalize.css');
const extractSass = new ExtractTextPlugin({filename: './assets/css/styles.css', allChunks:true});
//const extractCSS = new ExtractTextPlugin('./assets/css/[name].css');// name from entry
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


 module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    app: ['./app/app.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
  /*  publicPath: 'assets',*/
    filename: 'app/[name].bundle.js',
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
      test: /\.(svg)$/i,   //to support eg. background-image property 
      loader:'file-loader',
      query:{
        name:'[path][name].[ext]',
       // outputPath:'assets/images/decor/',
        publicPath: 'http://localhost:8080/',
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
      }
    },
    {
      test: /\.(svg)$/i,   //to support eg. background-image property 
      include: path.resolve(__dirname, 'src/assets/images/sprites/to_social/'),
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            spriteFilename:  'assets/images/sprites/sprite_social.svg',
          }
        },
       {
         loader: 'svgo-loader',
          options: {
          plugins: [
       //     { removeNonInheritableGroupAttrs: true },
        //    { collapseGroups: true },
            { removeAttrs: { attrs: '(fill|stroke)' } },
        //    { removeUselessDefs: true },
            ],
          },
        },
      ],
    },
    /* test responsive loader
    {
        test: /\.(png)$/,
        include: path.resolve(__dirname, 'src/assets/images/content/blur_burger/'),
        use: [ 
          {
              loader: 'responsive-loader',
              options: {
                sizes: [450, 200, 100],
                placeholder: false,
                placeholderSize: 20,
                name: '/assets/images/content/blur_burger/[name]-[width].[ext]'
              }
          }
        ]
    },*/
    {
      test: /\.(jpg)$/i,   //to support eg. background-image property 
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
           // outputPath:'assets/images/decor/',
            publicPath: 'http://localhost:8080/',
            },
          },
          {
          loader: 'image-webpack-loader',
          options: {
             bypassOnDebug: true,
             mozjpeg: {
              progressive: true,
              quality: 90,
             }
            }
          }
           ]
      
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
    },
    {
      test: /\.(png)$/i,   //to support eg. background-image property 
     // exclude: path.resolve(__dirname, 'src/assets/images/content/blur_burger/'),
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
          //  outputPath:'assets/images/decor/',
            publicPath: 'http://localhost:8080/',
            },
          },
         {
          loader: 'image-webpack-loader',
          options: {
             bypassOnDebug: true,
        // optipng.enabled: false will disable optipng
             optipng: {
              optimizationLevel: 7,
              enabled: false,
             },
             pngquant: {
            //  enabled: false,
              quality: '90-100',
            //  speed: 4
             },
            },
          },
        ]
      
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
    },
    {
      test: /\.(gif)$/i,   //to support eg. background-image property 
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
         //   outputPath:'assets/images/decor/',
            publicPath: 'http://localhost:8080/',
            },
          },
          {
          loader: 'image-webpack-loader',
          options: {
             bypassOnDebug: true,
            gifsicle: {
              interlaced: false,
              optimizationLevel: 1
            },
            },
          },
        ]
      
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule 
      loader: 'url-loader',
      query:{
        limit:'2000',
        name:'[path][name].[ext]',
       // outputPath:'assets/fonts/',
        publicPath: 'http://localhost:8080/',
        //the fonts will be emmited to public/assets/fonts/ folder 
        //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }  
      }
    },
    { 
      test: /\.css$/,
    //  include: [path.resolve(__dirname, 'src/assets/styles/vendors')], 
      use: extractCSS.extract({
        use: [{ loader: 'css-loader', 
                options: {
                  minimize: true
                }
              },
                'postcss-loader']
      })
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
      include: /src/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['env']
        } 
      }
    },
    {
       test: /\.html$/,
       use: [
        {
          loader: "html-loader",
          options: {
                interpolate: true
              }
        }
        ]
    } 
  ]},
  
  plugins: [
   
      extractCSS,

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

      new HtmlWebPackPlugin({
          template: './index.html',
          filename: './index.html'
      }),

      new FaviconsWebpackPlugin({
    // Your source logo
    logo: './burger.svg',
    // The prefix for all image files (might be a folder or a name)
    prefix: 'icons-[hash]/',
    // Emit all stats of the generated icons
    emitStats: false,
    // The name of the json containing all favicon information
  //  statsFilename: 'iconstats-[hash].json',
    // Generate a cache file with control hashes and
    // don't rebuild the favicons until those hashes change
    persistentCache: true,
    // Inject the html into the html-webpack-plugin
    inject: true,
    // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    background: '#FFF',
    // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    title: 'Burger',

    // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    icons: {
      android: false,
      appleIcon: false,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false
    }
  }),
 
    new CopyWebpackPlugin([
    { from: 'assets/images/content/slider/products/', to: 'assets/images/content/slider/products/' },
    { from: 'assets/images/content/menu/', to: 'assets/images/content/menu/'},
     ]),

    // Make sure that the plugin is after any plugins that add images
    // These are the default options:
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: false,
      optipng: null,
      gifsicle: {
        optimizationLevel: 1
      },
      mozjpeg: {
              progressive: true,
              quality: 90,
             },
      jpegtran: {
        progressive: true
      },
      svgo: {
      },
      pngquant: {
              
              quality: '90-100',
              
      }, // pngquant is not run unless you pass options here
      plugins: []
    }),
    
     new SpriteLoaderPlugin({plainSprite: true }),

     //new CleanWebpackPlugin(['build/assets/images/sprites/to_social/']),
  ],
}



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
    /*{
        test: /\.css$/,
       // include: path.resolve(__dirname, 'src/assets/styles/css/'),
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },*/