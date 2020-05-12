## 技术栈

### [Vue](https://cn.vuejs.org/v2/guide/index.html)

> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

### [Vuex](https://vuex.vuejs.org/zh/)

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### [Vue Router](https://router.vuejs.org/zh/)

> Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

### [Mint UI](http://mint-ui.github.io/#!/zh-cn)

> 基于 Vue.js 的移动端组件库

## 如何开始

```
  // 下载项目
  git clone http://119.3.42.5/qyb/qybwap.git
  // 安装依赖
  npm i
  // 运行本地环境
  npm run sever
  // 打包代码
  npm run build
```

## 主要的目录结构

```
├── public
│   ├── data //放置模拟请求静态数据
│   ├── favicon.ico
│   ├── index.html
├── src
│   ├── assets //静态资源
│   ├── components //放置自定义组件
│   ├── request //api请求类
│   ├── router //路由
│   ├── store //状态管理
│   ├── style //公用样式
│   ├── utils //工具类
│   ├── views //vue页面
│   ├── App.vue //vue入口文件
```
