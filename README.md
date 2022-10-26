# backstage_management

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## 项目描述

这是一个简单的后台管理项目，拥有登录，用户管理等功能

## 技术栈

vue,vue route,vuex,vue cli,axios

## 技术实现

1.二次封装 axios,统一管理项目 api 的使用  
2.vuex 模块式开发，方便数据维护  
3.将使用频率较高的片段提取为共用组件，提高代码复用率  
4.使用嵌套路由实现切换路由时全局组件部分不变只改变内容组件部分的功能  
5.路由跳转时进行条件判断，路由跳转到当前路由则无法跳转，防止报错  
6.使用 mockjs 模拟数据方便进行某些内容的动态展示  
7.使用 echarts 进行数据可视化  
8.使用 elementUI  
9.使用 js-cookie

## 项目难点

不同的用户能使用的功能不同，对用户的权限进行控制

## 可优化的地方

1.点击面包屑或tag，侧边栏对应部分没有高亮 ✔  
2.登录超级用户账号后，点击除首页外的面包屑或tag，退出登录，再登录普通用户账号，之前在超级用户账号下新增的面包屑仍然存在 ✔  
2.删除用户永远删不完，更换页数后再进行姓名搜索无数据，姓名搜索有时会出现不相关的数据
