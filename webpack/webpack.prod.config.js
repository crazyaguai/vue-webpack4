const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const entry = require('./entry-config')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    optimization: {
        minimizer: [
            //压缩js
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                cache: true,
                sourceMap: config.build.productionSourceMap,
                parallel: true
            }),
            //压缩css
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: config.build.productionSourceMap ? {
                    safe: true,
                    map: {
                        inline: false
                    }
                } : {
                    safe: true
                }
            })
        ],
        splitChunks: {
            minSize: 0,
            // automaticNameDelimiter: '-',//文件名称分隔符默认'~'
            chunks: "all",//选择哪些块进行优化，可选值：all、async和initial
            cacheGroups: {
                //所有入口src下公共模块
                commonChunk: {
                    name: 'commonChunk',
                    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
                    test (module, chunks) {
                        let res = (
                            module.resource &&
                            /\.js$/.test(module.resource) &&
                            module.resource.indexOf(path.join(__dirname, '../src')) === 0 &&
                            chunks.length >= config.build.minChunks
                        )
                        return res
                    },
                    chunks: 'all',
                    minSize: 0,
                    enforce: true,
                    minChunks: 1
                },
                //所有入口node_modules下公共模块
                commonVendor: {
                    name: 'commonVendor',
                    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
                    test (module, chunks) {
                        let res = (
                            module.resource &&
                            /\.js$/.test(module.resource) &&
                            module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 &&
                            chunks.length >= config.build.minChunks
                        )
                        return res
                    },
                    chunks: 'all',
                    minSize: 0,
                    enforce: true,
                    minChunks: 1
                }
            }
        },
        //webpack运行文件
        runtimeChunk: {
            name: "manifest"
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'), // 根路径
            manifest: require('./dll/vueVendor-manifest.json'),
        }),

        //拆分css文件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: utils.assetsPath('css/[name].[chunkhash:8].css'),
            chunkFilename: utils.assetsPath('css/[name].[chunkhash:8].css')
        }),

        // 保持chunkId不变
        new webpack.NamedChunksPlugin(),
        // 保持moduleID稳定
        new webpack.HashedModuleIdsPlugin(),
        // 提升作用域
        new webpack.optimize.ModuleConcatenationPlugin(),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: `${config.build.assetsSubDirectory}`,
            ignore: ['.*']
        }])
    ]
})

//拆分入口文件的node_modules中的模块
entry.vendor.forEach(v=>{
    let str = `${v}_vendor`
    webpackConfig.optimization.splitChunks.cacheGroups[str] = {
        name: str,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        test (module, chunks) {
            let res = (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 &&
                chunks.length == 1 &&
                chunks[0].name == v
            )
            return res
        },
        chunks: 'all',
        minSize: 0,
        enforce: true,
        minChunks: 1
    }
})


// 如果带--report参数，则分析模块
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
