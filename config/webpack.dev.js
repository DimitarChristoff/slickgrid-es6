const path          = require('path');
const webpack       = require('webpack');
const pkg           = require('../package.json');

const __DEV_INPUT__ = path.join(__dirname, '..', 'examples');
const __IMAGES__    = path.join(__dirname, '..', 'images');

const imgquery      = JSON.stringify({
  mozjpeg: {
    progressive: true,
  },
  gifsicle: {
    interlaced: false,
  },
  optipng: {
    optimizationLevel: 4,
  },
  pngquant: {
    quality: '75-90',
    speed: 3,
  }
})

module.exports = {

  devtool: 'source-map',

  context: __dirname,

  entry: {
    examples: [path.join(__DEV_INPUT__, 'index.js')],
    vendor: [
      'react',
      'react-dom',
      'jquery'
    ]
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.(less|css)$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        `file-loader?context=../images&name=images/[path][name].[ext]`
      ]
    }]
  },

  devServer: {
    contentBase: __DEV_INPUT__,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8888,
    hot: true,
    staticOptions: {}
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};
