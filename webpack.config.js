const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  entry: [
    './src/client/js/index.js',
    './src/client/styles/style.scss'
  ],
  output: {
    filename: './js/bundle.js'
  },
  devtool: argv.mode !== 'production' ? 'source-map' : '',
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: 'env'
        }
      }
    },
    {
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, 'src/client/styles'),
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: true,
            url: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: './css/style.min.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{
      from: './static/fonts',
      to: './fonts'
    },
    {
      from: './static/img',
      to: './img'
    }])
  ]
});
