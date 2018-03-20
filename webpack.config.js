const path = require('path');

module.exports = (env, argv) => ({
  entry: [
    './src/client/js/index.js'
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
    }]
  },
  plugins: [
  ]
});
