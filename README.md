
![](https://img.shields.io/travis/JesseZhao1990/vue-lazy-load-list.svg)  [![GitHub issues](https://img.shields.io/github/issues/JesseZhao1990/vue-lazy-load-list.svg)](https://github.com/JesseZhao1990/vue-lazy-load-list/issues)    ![](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen.svg)


# vue-lazy-load-list

一个vue的懒加载组件，当一个list或者一个多级的list的数据非常庞大的时候，如果不做局部渲染或者懒加载，浏览器是扛不住的。此组件就是解决这样的问题的，只会渲染视图区中的要呈现的数据，而不是把所有数据一下子全部渲染。

## 安装

```
npm install --save vue-lazy-load-list beautify-scrollbar

```
## 使用

main文件中注册
```
import Vue from 'vue';
import 'beautify-scrollbar/dist/index.css';
import lazyLoadList from 'vue-lazy-load-list';

Vue.use(lazyLoadList);
```

在组件中直接使用

```
<lazy-load-list :data="data"></lazy-load-list>
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## LICENSE
MIT
