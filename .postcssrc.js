// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path')

//src与node_modules下的css文件不转px换为rem
let path1 = formetRegUrl(path.resolve(__dirname,'src'))
let path2 = formetRegUrl(path.resolve(__dirname,'node_modules'))

function formetRegUrl(url) {
    return url.replace(/\//g,'\\/')
}

let excludeReg = new RegExp(`(${path1}\\/)|(${path1}\\/)`,'g')

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-plugin-px2rem": {
            //设计稿尺寸/10
            rootValue: 37.5,
            //屏蔽的属性
            propBlackList: ['border'],
            //屏蔽的路径
            exclude: excludeReg,
        },
        "autoprefixer": {}
    }
}
