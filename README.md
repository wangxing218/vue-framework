# Vue前端开发框架简介

## 介绍
利用目前最新的webpack搭建的vue前端开发框架，兼容ie9+、chrome、firefox等主流浏览器；  
集成mock数据模拟服务，可以实现无任何其他依赖的前端开发；  
使用最少的package依赖，实现最快的编译速度和最稳定高效的代码产出。  

## 安装运行
由于国内网络原因，在正式开发项目之前，建议设置npm淘宝源；
```
npm config set registry https://registry.npm.taobao.org/
npm config set sass-binary-site https://npm.taobao.org/mirrors/node-sass
```

打开 build/config.js 按项目实际环境配置各参数。  
```
npm install
npm run dev
```
命令说明:   
npm run dev 开发环境会启动本地server，自动获取本机ip并打开浏览器  
npm run test 测试环境打包  
npm run prod 生产环境打包  

## 技术栈组合
webpack @4.x  
vue @2.x  
vuex @3.x  
vue-router @3.x  
axios @0.18.x  

## 兼容性
IE9+  
Chrome  
360  
FireFox  
Safari  
Edge  
IOS 8.0 +  
Android 4.0+  

## 目录规划
* app									| 应用主目录
	* asset							| 静态资源，用于页面引用，由webpack自动打包
	* component					| 组件
	* entry							| 存放入口相关文件
		* app.vue					| 入口vue
		* index.html			| 入口html模板
		* main.js					| 入口js
		* router.js				| 路由
	* page							| 页面，大型应用可以按功能划分文件夹
	* service  					| 逻辑层，主要存放公共服务和方法
	* store  						| 状态管理
	* util							| 工具类
* build								| 构建脚本目录
	* build.js					| 构建脚本入口
	* config.js					| 用户配置参数，提取经常需要改动的配置
	* env.js						| webpack核心配置文件
	* mock.js						| mock数据请求，直接拦截本地服务路径，可在./mock下按url添加文件
	* util.js						| 配置工具类，包含项目路径，打包路径及其他方法
* dist								| 打包目录，相当于网站根目录
	* static						| 静态资源目录,编译的文件和/public/static的合并
		* chunk						| 打包目录
			* asset					| 打包的资源目录，
			* css						| 打包的css，
			* js						| 打包的js，
	* index.html 				| 打包的首页html文件
* mock								| mock数据文件夹，文件结构同请求url
* public							| 静态根目录
* .babelrc 						| babel配置文件
* .gitignore 					| 文件排除
* package-lock.json 	| 版本锁定
* package.json 				| 项目包配置
* README.md     			| 说明文档

## 联系我
有啥技术上的问题，可以与我交流
### QQ ： <a href="http://wpa.qq.com/msgrd?v=3&uin=1263996779&site=qq&menu=yes" target="_blank">1263996779</a>
