'use strict'
const path = require('path')
const entry = require('./entry-config')
const config = require('./config')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

// 从工作目录下找路径
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

// 所有资源，开发环境不加hash，生产环境加hash
let assetName = process.env.NODE_ENV === 'production' ? '[name].[hash:6].[ext]' : '[name].[ext]'

const baseConfig = {
    context: resolve('./'), // 根路径
    entry: entry.js,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': resolve('src'),
            '@h5': resolve('src_h5'),
            '^': resolve('static'),
            'img': resolve('src/img'),
            'h5img': resolve('src_h5/img'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    externals: config.externals,
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: 'art-template-loader',
                options: {
                    htmlResourceRules: false,
                    cache: false,
                    minimize: false,
                    compileDebug: false,
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    vueLoaderConfig
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`img/${assetName}`)
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`media/${assetName}`)
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`fonts/${assetName}`)
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new VueLoaderPlugin(),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: `${config[process.env.NODE_ENV === 'production'?'build':'dev'].assetsSubDirectory}`,
            ignore: ['.*']
        },{
            from: path.resolve(__dirname, '../favicon.ico'),
            to: ''
        }])
    ]
}

entry.html.forEach(h => {
    let htmlPluginConfig = {
        filename: h.htmlName,
        template: h.template,
        chunkName: h.name,
        inject: false,
        chunksSortMode: 'dependency'
    }
    if(process.env.NODE_ENV === 'production'){
        htmlPluginConfig.env = 'production'
        //压缩HTML文件
        htmlPluginConfig.minify = {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //删除空白符与换行符
            removeAttributeQuotes: false,
            minifyCSS: true,
            minifyJS: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        }
    }else {
        htmlPluginConfig.env = 'dev'
    }
    baseConfig.plugins.push(new HtmlWebpackPlugin(htmlPluginConfig))
})

module.exports = baseConfig
