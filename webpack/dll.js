'use strict'

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.dll.config')

const spinner = ora('building for dll...')
spinner.start()

let fileName = ''

if (process.env.VENDOR_ENV === 'VUE') {
    fileName = 'vueVendor'
} else {
    fileName = 'baseVendor'
}

rm(path.join(__dirname, '../static/js/dll') + fileName + '.*.js', err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            fileName + '已经生成，放在static/js/dll下，请在需要的地方引入.\n'
        ))
    })
})
