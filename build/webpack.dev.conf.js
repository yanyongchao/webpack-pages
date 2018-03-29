'use strict'
const utils = require('./utils')
const webpack = require('webpack')
let config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
let pathConfig = require('./handle-path')

config = { ...config, ...pathConfig }

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

let pages = Object.keys(config.entry).map((item) => {
  return  new HtmlWebpackPlugin(
    {
      filename: path.join(__dirname, `../dist/module/${item}.html`),
      template: path.join(__dirname, `../src/module/${item}/${item}.html`),
      inject: true,
      chunks: [`${item}`]
    }
  )
})

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.host,
    port: PORT || config.port,
    open: config.autoOpenBrowser,
    overlay: config.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.assetsPublicPath,
    proxy: config.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.devEnv.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    ...pages,
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: config.assetsSubDirectoryFrom,
        to: config.assetsSubDirectoryTo,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
