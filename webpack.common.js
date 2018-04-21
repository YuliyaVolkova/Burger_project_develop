const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./assets/css/normalize.css');
const extractSass = new ExtractTextPlugin({filename: './assets/css/styles.css', allChunks:true});
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    app: ['./app/app.js'],
  },

   output: {

     path: path.resolve(__dirname, 'build'),
     filename: 'app/[name].bundle.js',
   },

  module: {
    rules: [
      {
        test: /\.(svg)$/i,   //to support eg. background-image property 
        loader:'file-loader',
        query:{
          name:'[path][name].[ext]',
        }
      },
      {
      test: /\.(svg)$/i,   //sprite 
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
            { removeAttrs: { attrs: '(fill|stroke)' } },
            ],
          },
        },
       ],
      },
      {
      test: /\.(jpg)$/i,   //to support eg. background-image property 
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
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
      },
      {
      test: /\.(png)$/i,   
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
             bypassOnDebug: true,
             optipng: {
              optimizationLevel: 7,
              enabled: false,
             },
             pngquant: {
              quality: '90-100',
             },
            },
          },
        ]
      },
      {
      test: /\.(gif)$/i,   //to support eg. background-image property 
      use: [ {
          loader: 'file-loader',
          options: {
            name:'[path][name].[ext]',
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
      },
      {
      test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule 
      loader: 'url-loader',
      query:{
        limit:'2000',
        mimetype: "application/font-woff",
        name:'[path][name].[ext]',
        }
      },
      { 
      test: /\.css$/,
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
       test: /\.html$/,
       use: [
        {
          loader: "html-loader",
          options: {
                interpolate: true
              }
        }
       ]
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
    ],
  },

  plugins: [

    extractCSS,

    extractSass,
    
    new HtmlWebpackPlugin({
       title: 'Burger Project',
       template: './index.html',
       filename: './index.html'
    }),

    new FaviconsWebpackPlugin({
    
      logo: './burger.svg',
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
      }, 
      plugins: []
    }),
    
     new SpriteLoaderPlugin({plainSprite: true }),

  ],
 };