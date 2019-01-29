### 基于webpack4的vue脚手架

---

##### 项目简介
1. 项目使用webpack4、babel7构建
2. 支持开发基于vue的单页面、多页面项目
3. 支持flexible布局编写的h5项目

##### 如何运行
1. 基本配置文件：复制一份userConfig.js.config文件并改名为userConfig.js
2. 安装依赖：执行npm install或者yarn
3. 基本命令
```
//运行开发环境
npm start || npm run dev
//https开发环境
npm start --usehttps
//打包构建
npm run build
//使用webpack dll打包vue相关文件
npm run dll-vue
//使用webpack分析模块
npm run build --report
```

##### 构建项目
- 单页面项目
- 多页面项目
- h5项目

##### 项目结构
```
├── .babelrc    //babel配置文件
├── .browserslistrc   //browserslist浏览器配置文件
├── .gitignore  //git忽略配置文件
├── .postcssrc.js   //postcss配置文件
├── README.md
├── dist    //打包代码
├── package.json
├── src //web页面
│   ├── api //http请求目录
│   ├── common  //公共代码
│   ├── components  //公共组件
│   ├── directive   //自定义指令
│   ├── entry   //web页面入口
│   │   └── index   //index.html页面入口
│   │       ├── index-router.js
│   │       ├── index.js
│   │       └── index.vue
│   ├── filters //vue filter配置
│   ├── img     //图片
│   ├── lang    //vue-i18n配置
│   ├── pages   //页面组件
│   │   └── index
│   │       └── demo.vue
│   ├── plugins//vue插件
│   └── scss    //公共sass文件
├── src_h5  //h5页面，结构与src类似
├── static  //静态文件目录，打包时会直接复制到dist/static中
│   └── js
│       ├── dll //vue相关文件
│       │   └── vueVendor.9f4e58.js
├── userConfig.js.config    //开发者配置文件
└── webpack //webpack配置
    ├── art //art模板
    ├── build.js //打包命令
    ├── config.js   //webpack基本参数配置
    ├── dll //webpack dll生成文件
    │   └── vueVendor-manifest.json
    ├── dll.js  //webpack dll命令
    ├── entry-config.js //入口页面配置
    ├── utils.js
    ├── vue-loader.config.js    //vue-loader配置
    ├── webpack.base.config.js  //webpack基本配置
    ├── webpack.dev.config.js   //webpack开发环境配置
    ├── webpack.dll.config.js   //webpack dll配置
    └── webpack.prod.config.js  //webpack生产环境打包配置
```
