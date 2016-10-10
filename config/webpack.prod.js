const path                = require('path');
const webpack             = require('webpack');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const nodeExternals       = require('webpack-node-externals');

const __OUTPUT__          = path.join(__dirname, '..', 'dist');
const __INPUT__           = path.join(__dirname, '..', 'src');
const __COMPONENT_NAME__  = 'slickgrid-es6';

module.exports = {

  devtool: 'source-map',

  context: __dirname,

  entry: {
    index: [
      'babel-polyfill',
      path.join(__INPUT__, 'index.js')
    ]
  },

  output: {
    path: __OUTPUT__,
    publicPath: '/',
    filename: `slick.es6.min.js`,
    target: 'umd'
  },

  externals: [nodeExternals()],

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }, {
      test: /\.(less|css)/,
      loader: 'style-loader!css-loader!less-loader?sourceMap=inline'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, // prod
      mangle: {
        screw_ie8: true
      }, // prod
      compress: {
        screw_ie8: true
      }, // prod
      comments: false // prod
    }),
    new CopyWebpackPlugin([
      {
        flatten: true,
        from: `${__INPUT__}/*.less`
      },
      {
        from: 'plugins/**/*.css',
        flatten: true
      }
    ])
  ],

  resolve: {
    extensions: ['', '.js']
  }
};
