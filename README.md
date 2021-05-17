
# webpack前端统一框架

## 框架简介

利用目前最新的webpack5搭建的vue2前端开发框架，兼容ie9+、chrome、firefox等主流浏览器；  
集成mock数据模拟服务，可以实现无任何其他依赖的前端开发；  
使用最少的package依赖，实现最快的编译速度和最稳定高效的代码产出。 

## 技术栈组合

- webpack @5.x
- vue @2.x
- vuex @3x
- vue-router @3.x
- axios @0.21.x

## 环境要求

- 系统： win10/7、macOS
- 工具: VSCode 最新版
- NODE: > v10.0

## 快速开始

由于国内网络原因，在正式开发项目之前，建议设置 npm 淘宝源；

```bash
npm config set registry https://registry.npm.taobao.org/
```

安装依赖并运行，运行前可修改 package.json 中的 start 命令，通过 --entry=${entry} 指定打包入口

```bash
npm install
npm run dev
```

按控制台提示点击打开 http://localhost:9900；  
 _您还可以打开在线文档和数据模拟模拟服务： http://localhost:9000/biz.middle_  
 命令说明:

```bash
npm run dev --entry=${entry}    #开发环境会启动本地server
npm run build --entry=${entry}  #生产环境打包
```

## 目录规范

_注：所有目录名都采用小写加横线间隔，所有组件的文件名以首字母大写的驼峰命令_

| 目录                | 说明                                          |
| ------------------- | --------------------------------------------- |
| mock                | 模拟数据                                      |
| src                 | 业务代码                                      |
| ├─ common           | 公共模块，公共资源、组件和逻辑脚本            |
| ├─ ├─ asset         | 引用的公共资源                                |
| ├─ ├─ ├─ css        | 公共样式，内含纯 css 的自适应而已和公共辅助类 |
| ├─ ├─ ├─ image      | 公共图片                                      |
| ├─ ├─ component     | 公共组件，如瀑布流、公共弹框等                |
| ├─ ├─ service       | 公共逻辑，如 api，统一设置，微信分享等        |
| ├─ ├─ util          | 与业务无关的工具类                            |
| ├─ vue             | 默认入口 (vue技术栈demo)                                     |
| ├─ ├─ asset         | 模块资源                                      |
| ├─ ├─ ├─ css        | 模块样式                                      |
| ├─ ├─ ├─ image      | 模块图片                                      |
| ├─ ├─ component     | 业务组件                                      |
| ├─ ├─ entry         | 入口类文件夹                                  |
| ├─ ├─ ├─ App.vue    | vue 根组件                                    |
| ├─ ├─ ├─ config.js  | 不同环境的配置文件，如请求地址前辍、appKey 等 |
| ├─ ├─ ├─ index.html | 入口 html                                     |
| ├─ ├─ ├─ main.js    | 打包入口 js                                   |
| ├─ ├─ ├─ router.js  | 路由                                          |
| ├─ ├─ ├─ store.js   | 状态管理                                      |
| ├─ ├─ page          | 路由页面                                      |
| ├─ ├─ public        | 静态文件，最终与打包后的目录合并              |
| ├─ ├─ service       | 业务逻辑                                      |
| ├─ react            | 入口 2  (react技术栈demo)                                    |
| -.gitignore         | git 文件排除                                  |
| -package.json       | 依赖包和启动脚本                              |
| -postcss.config.js  | postcss 配置文件                              |
| -README.md          | 说明文档                                      |
| -vite.config.js     | Vite 配置文件                                 |

## 未来规划

- 集成 editorConfig,eslint 来在框架层面统一编码风格和规范
- 同时支持 vue 和 react
- 支持单入口和多入口轻松可配
- 自动划部署

## 升级日志

- 1.0.0 初始版本
