const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  context: __dirname,

  entry: {
    slick: './src/index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'slick.es6.min.js',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        flatten: true,
        from: 'src/*.less'
      }
    ]),
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    historyApiFallback: true,
    staticOptions: {

    },
  },

  devtool: 'source-map'

};

if (process.env.NODE_ENV === 'development'){
  config.entry.examples = ['./examples/index.js'];
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin('examples', 'examples.js'));
}

module.exports = config;
