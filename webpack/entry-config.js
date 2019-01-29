'use strict'

const path = require('path')
const util = require('./utils')

// 从工作目录下找路径
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

const entryConfig = [
    {
        name: 'style',
        path: resolve('src/scss/style.js'),
        //是否生成入口文件
        html: false,
        //生成html的art模板
        template: null,
        //是否打包页面自己的vendor(node_modules下引入的模块)
        vendor: false,
    },
    {
        name: 'index',
        path: resolve('src/entry/index/index.js'),
        html: true,
        template: resolve('webpack/art/index.art'),
        htmlName: 'index.html',
        vendor: true,
    },
    {
        name: 'h5',
        path: resolve('src_h5/entry/h5/h5.js'),
        html: true,
        template: resolve('webpack/art/index_h5.art'),
        htmlName: 'h5.html',
        vendor: true,
    }
]

//webpack entry 配置
let js = {}
//生成html用
let html = []
let vendor = []
for(let entry of entryConfig){
    js[entry.name] = entry.path
    if(entry.html){
        html.push({
            name: entry.name,
            template: entry.template,
            htmlName: entry.htmlName,
        })
    }
    if(entry.vendor){
        vendor.push(entry.name)
    }
}

module.exports = {
    js,
    html,
    vendor,
}
