
![](https://img.shields.io/travis/JesseZhao1990/vue-lazy-load-list.svg)  [![GitHub issues](https://img.shields.io/github/issues/JesseZhao1990/vue-lazy-load-list.svg)](https://github.com/JesseZhao1990/vue-lazy-load-list/issues)    ![](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen.svg)


# vue-lazy-load-list

>

一个vue的懒加载组件，当一个list或者一个多级的list的数据非常庞大的时候，如果不做局部渲染或者懒加载，浏览器是扛不住的。此组件就是解决这样的问题的，只会渲染视图区中的要呈现的数据，而不是把所有数据一下子全部渲染。

## 安装

```
npm install --save vue-lazy-load-list beautify-scrollbar

```
## 注册


```
import Vue from 'vue';
import 'beautify-scrollbar/dist/index.css';
import lazyLoadList from 'vue-lazy-load-list';

Vue.use(lazyLoadList);
```

## 在组件中直接使用

```
<lazy-load-list :data="data"></lazy-load-list>
```

[更详细的例子](https://jessezhao1990.github.io/vue-lazy-load-list/)


## 属性

| 参数      |      类型    |是否必填|   可选值  |  默认值    | 说明 |
|-----------|-----------|--------|----------|---------|--------|
| data      |     Array   |    是   |  ————    |     []    |  一个数组，数组里的各个item为对象，对象里可以有children ，children必须是个数组，数组里的各个item为对象，可以这样一直嵌套下去，对深度没什么限制，这表示，你不仅可以做一个只有一层的列表，也可以做深层嵌套的列表|
| height    |   Number 或 String   |   否 | ———— | 100px | 组件中列表的高度 |
| itemHeight | Number 或 String |  否 | ———— | 40px | 组件的列表中的每个item的高度  |
| mode    |  String | 否  |  'demand' 或 'lazy' | 'demand' | 渲染模式，当是demo模式时，滚上去的区域会从dom中移除，lazy模式不会移除 |
| searchKeys  |  Array | 否 | ———— | [] | 搜索的时候对哪些字段进行搜索 |
| threshold  | Number 或 String | 否 | ———— | 0 | 钩子函数，当距离滚动结束还有threshold的距离时，触发reach-threshold 事件|
| tag | String | 否 | ————| ‘div’ | 定义列表包裹元素的tag名称 |
| itemTag | String | 否 | ———— | ‘div’ | 定义列表的tag |
| hasSearchInput | Boolean | 否 | ———— | true | 是否有搜索框 |

## 事件
| props      |      type    | requred |   optional  |  default  | details |
|-----------|-----------|--------|----------|---------|--------|
| reach-threshold | Function | 否 | ———— | 无 | 钩子函数，当距离滚动结束还有threshold的距离时，触发reach-threshold 事件 |

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
