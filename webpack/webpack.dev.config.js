'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const ip = require('ip');
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST || config.dev.host
const PORT = process.env.PORT && Number(process.env.PORT) || config.dev.port

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true,
            extract: false
        })
    },
    devtool: config.dev.devtool,
    // devServer 配置，大部分在config中
    devServer: {
        clientLogLevel: 'warning',

        hot: true,
        contentBase: false, // 使用CopyWebpackPlugin, 所以这里不需要
        compress: true,
        host: HOST,
        port: PORT,
        https: config.dev.https,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            {
                warnings: false,
                errors: true
            } :
            false, // 是否显示编译错误
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // 使用FriendlyErrorsPlugin报错，所以把原生的报错关了
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"',
            },
        }),

        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'), // 根路径
            manifest: require('./dll/vueVendor-manifest.json'),
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: `${config.build.assetsSubDirectory}`,
            ignore: ['.*']
        }])
    ]
})

// 前面一串是为了找在port被占用的情况下，自动找一个没被占用的
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port
            let httpType = config.dev.https ? 'https':'http'
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`开发地址: ${httpType}://${devWebpackConfig.devServer.host}:${port}  ${httpType}://127.0.0.1:${port}  ${httpType}://${ip.address()}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
