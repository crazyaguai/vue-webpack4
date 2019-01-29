'use strict'

const path = require('path')
const userConfig = require('../userConfig')

module.exports = {
    dev: {
        // 路径
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 代理
        proxyTable: userConfig.proxyTable,

        // devServer选项
        host: '0.0.0.0', //
        port: userConfig.port || 5000, //
        //执行npm start --usehttps
        https: process.env.npm_config_usehttps ? true : false,
        autoOpenBrowser: false, // 自动打开浏览器
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // 路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        // 页面入口文件下，会自动检索下边所有html和js入口
        pageEntry: path.resolve(__dirname, '../src/pages'),


        minChunks: 2, // 公共包的最小引用数目

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        base64Limit: 8192, // 超过这个数字，则转为base64资源

        // 模块分析，通过npm run build --report可以打开
        bundleAnalyzerReport: process.env.npm_config_report
    },
    // 外部引入的插件，在这里配置
    externals: {},
}
