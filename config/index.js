'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
/**
 * 挪到了build/handle-path.js
 */
// let commonConfig = {
//   entry: path.join(__dirname, '../src/main.js'), // 打包的入口文件
//   assetsRoot: path.join(__dirname, '../dist'), // index.html模板文件
//   assetsSubDirectory: '', // 打包输出的第二级目录 dist
//   index: path.resolve(__dirname, '../src/index.html'), // index.html模板文件
//   assetsSubDirectoryFrom: path.join(__dirname, '../src/static'), // 静态static拷贝位置 
//   assetsSubDirectoryTo: path.join(__dirname, '../dist/static'), // 静态static拷贝到哪里去
//   assetsPublicPath: '/' // 打包出来加一个/
// }

let development = {
  devEnv: {
    NODE_ENV: '"development"'
  },
  // Paths

  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, '../src')
  },
  proxyTable: {},

  // Various Dev Server settings
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: false,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

  // Use Eslint Loader?
  // If true, your code will be linted during bundling and
  // linting errors and warnings will be shown in the console.
  useEslint: true,
  // If true, eslint errors and warnings will also be shown in the error overlay
  // in the browser.
  showEslintErrorsInOverlay: false,

  /**
   * Source Maps
   */

  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'cheap-module-eval-source-map',

  // If you have problems debugging vue-files in devtools,
  // set this to false - it *may* help
  // https://vue-loader.vuejs.org/en/options.html#cachebusting
  cacheBusting: true,

  cssSourceMap: false
}

let production = {
  prodEnv: {
    NODE_ENV: '"production"'
  },
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, '../src')
  },

  /**
   * Source Maps
   */

  productionSourceMap: false,
  // https://webpack.js.org/configuration/devtool/#production
  devtool: '#source-map',

  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],

  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report
}

var config = process.env.NODE_ENV === 'production' ? production : development

module.exports = { ...config }
