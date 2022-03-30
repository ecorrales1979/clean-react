const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new EnvironmentPlugin({
      API_URL: 'http://fordevs.herokuapp.com/api'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.prod.html'
    })
  ]
})
