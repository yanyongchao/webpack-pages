const alias = require('./alias')
let commonConfig = require('../config')
let entry = process.env.ENTRYPATH.split(',')
const path = require('path')

const base = path.join(__dirname, '../src/module')
let obj = {}
entry.forEach(item => {
  obj[item] = `${base}/${item}/${item}.js`
})

let config = {
  entry: obj, // 打包的入口文件
  assetsRoot: path.join(__dirname, '../dist'), // index.html模板文件
  assetsSubDirectory: 'pages', // 打包输出的第二级目录 dist
  assetsSubDirectoryFrom: path.join(__dirname, '../src/static'), // 静态static拷贝位置 
  assetsSubDirectoryTo: path.join(__dirname, '../dist/static'), // 静态static拷贝到哪里去
  assetsPublicPath: '/', // 打包出来加一个/
}

// let a = {
//   index: `${base}/${entry}/${entry}.html`, // index.html模板文件
//   filepath: path.join(__dirname, `../dist/module/${entry}.html`) // 打包出来的html文件在哪里
// }

module.exports = { ...config }
