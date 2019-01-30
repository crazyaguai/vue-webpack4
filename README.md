### 基于webpack4的vue脚手架

---

### 项目简介
1. 项目使用webpack4、babel7构建
2. 支持开发基于vue的单页面、多页面项目
3. 支持flexible布局编写的h5项目

### 如何运行
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
4. demo页面 运行npm start后查看
- web：http://127.0.0.1:5000/index.html
- h5：http://127.0.0.1:5000/h5.html

### 新增页面
1. web页面添加参考/src/entry/index页面
2. h5页面添加参考/src_h5/entry/h5页面
3. 新添加页面需要配置/webpack/entry-config.js文件添加入口

### webpack相关配置
1. dll使用
- 为了优化构建速度，默认将'vue', 'vuex', 'vue-router', 'vue-i18n'打包为dll文件加载
2. 入口文件配置
- 使用art模板以及html-webpack-plugin生成入口html文件
- 多页面项目新增页面需要配置/webpack/entry-config.js文件添加入口
3. 代理以及端口设置
- 为防止多人开发冲突，需要复制一份userConfig.js.config文件并改名为userConfig.js，然后配置开发环境接口代理以及端口
4. 代码拆分
- optimization.splitChunks.cacheGroups配置拆分公共代码，具体配置在/webpack/webpack.prod.config.js中
5. resolve

符号 | 文件夹
---|---
@ | /src
@h5 | /src_h5
^ | /static
img | /src/img
h5img | /src_h5/img

### vue相关开发
1. 推荐使用vue单文件组件
2. 项目默认使用sass预处理css使用postcss添加浏览器后缀以及转换h5项目px->rem，也可以更换其他处理方式，需要单独下载对应loader。具体配置在/webpack/utils.js文件中。
3. js编写：使用babel处理src下所有js，推荐使用es6语法。代码引入风格推荐使用import。
4. 使用图片
- 在art中使用图片
```
<img src="{{require('img/icon.png')}}" alt="" >
```
- 在js中应用图片
``` javascript
import imgUrl from 'img/icon.png'
```
- 在scss中使用图片，使用相对于scss文件的地址
``` scss
background: url('../../../static/img/bg.jpg') no-repeat fixed ;
```

### h5页面开发
1. h5页面需要在src_h5目录下面开发
2. h5页面使用flexible布局，同时改变视口解决1px border显示问题
3. 使用postcss-plugin-px2rem转换px，具体配置在.postcssrc.js文件中。
4. h5页面的art模板与web页面不同
5. border-radius等属性需要自己转换为rem

### 项目结构
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
