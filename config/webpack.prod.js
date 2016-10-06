const path                = require('path')
const webpack             = require('webpack')
const postcssImport       = require('postcss-import')
const postcssNext         = require('postcss-cssnext')

const __OUTPUT__          = path.join(__dirname, '..', 'dist')
const __INPUT__           = path.join(__dirname, '..', 'src')
const __COMPONENT_NAME__  = 'react-your-component-name'

module.exports = {

  devtool: 'source-map',

  debug: true,

  context: __dirname,

  entry: {
    index: [
      path.join(__INPUT__, 'index.js')
    ]
  },

  output: {
    path: __OUTPUT__,
    publicPath: '/',
    filename: `${__COMPONENT_NAME__}.min.js`,
    library: __COMPONENT_NAME__,
    libraryTarget: 'umd'
  },

  externals: {
    jquery: {
      root: 'jQuery',
      commonjs2: 'jquery',
      commonjs: 'jquery',
      amd: 'jquery'
    },
    flatpickr: {
      root: 'flatpickr',
      commonjs2: 'flatpickr',
      commonjs: 'flatpickr',
      amd: 'flatpickr'
    }
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test:   /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader?sourceMap=inline'
    }, {
      test: /\.woff(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
    }, {
      test: /\.ttf(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?.*)?$/,
      loader: 'file-loader?prefix=fonts/&name=fonts/[name].[ext]'
    }, {
      test: /\.svg(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url-loader?limit=25000'
    }]
  },

  postcss: [postcssImport, postcssNext],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true
      }, //prod
      comments: false //prod
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
