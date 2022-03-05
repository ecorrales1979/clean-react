const wp = require('@cypress/webpack-preprocessor')

const options = {
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        }
      ]
    }
  }
}

module.exports = wp(options)
