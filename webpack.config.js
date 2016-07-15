const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/slick.build.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "slick.es6.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.woff/,
        loader: 'url-loader?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2/,
        loader: 'url-loader?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf/,
        loader: 'file-loader?prefix=font/'
      },
      {
        test: /\.eot/,
        loader: 'file-loader?prefix=font/'
      },
      {
        test: /\.svg/,
        loader: 'file-loader?prefix=font/'
      }, {
        test: /\.rawhtml$/,
        loader: "raw-loader"
      },
      {
        test: /\.html$/,
        loader: "ngtemplate-loader!html-loader"
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
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
        loader: "json-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "build")
  },
  devtool: 'source-map'
};
