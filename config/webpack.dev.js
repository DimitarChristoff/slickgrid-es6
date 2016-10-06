const path                = require('path')
const webpack             = require('webpack')
const pkg                 = require('../package.json')

const __DEV_INPUT__       = path.join(__dirname, '..', 'examples')

module.exports = {

  devtool: 'eval-source-map',

  context: __dirname,

  entry: {
    examples: [path.join(__DEV_INPUT__, 'index.js')],
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    filename: `[name].js`
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }, {
      test:   /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader?sourceMap=inline'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },
      {
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

  devServer: {
    contentBase: __DEV_INPUT__,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    staticOptions: {},
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
}
