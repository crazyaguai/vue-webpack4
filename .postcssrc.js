// https://github.com/michael-ciniawsky/postcss-load-config

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
            exclude: [/((src)|(node_modules))/],
        },
        "autoprefixer": {}
    }
}
