
![](https://img.shields.io/travis/JesseZhao1990/vue-lazy-load-list.svg)  [![GitHub issues](https://img.shields.io/github/issues/JesseZhao1990/vue-lazy-load-list.svg)](https://github.com/JesseZhao1990/vue-lazy-load-list/issues)    ![](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen.svg)


# vue-lazy-load-list
[中文文档](https://github.com/JesseZhao1990/vue-lazy-load-list/blob/master/README.CN.md)
>
A lazy load component of vue. when a list or nested list is very large, the browser can't carry it if we render all list data. this component is used to solve those problems. we render data we can see right now not the future data.

## Install

```
npm install --save vue-lazy-load-list beautify-scrollbar

```
## Registor


```
import Vue from 'vue';
import 'beautify-scrollbar/dist/index.css';
import lazyLoadList from 'vue-lazy-load-list';

Vue.use(lazyLoadList);
```

## Used in componet

```
<lazy-load-list :data="data"></lazy-load-list>
```

[details](https://jessezhao1990.github.io/vue-lazy-load-list/)


## Attributes

| props      |      type    | requred |   optional  |  default  | details |
|-----------|-----------|--------|----------|---------|--------|
| data      |     Array   |    yes  |  ————    |     []    |  a list or a nested list. you should be noticed that the item of list shold be an object. if any object's keys include children, this children also should be a list with it's items is object too. and so on ...  |
| height    |   Number or String   |   no | ———— | 100px | the height of this component |
| itemHeight | Number or String |  no | —————— | 40px | the height of each item  |
| mode    |  String | no  |  'demand' or 'lazy' | 'demand' | render mode. when it was set to demand, this componet will only render that demanded data. when those items was scrolled up, they will be removed from DOM. when it was set to lazy, those items was scrolled up is still in DOM. |
| searchKeys  |  Array | yes | —————— | [] | when we enter some words we search, componets will use the value of keys in searchKeys to filter |
| threshold  | Number or String | no | —————— | 0 | when reach that point which distance to the end is 'threshold' px, the component will emit a event named reach-threshold |
| tag | String | no | ——————| ‘div’ | dom name of list wrap |
| itemTag | String | no | ——————| ‘div’ | dom name of item |

## Event
| props      |      type    | requred |   optional  |  default  | details |
|-----------|-----------|--------|----------|---------|--------|
| reach-threshold | Function | no | ———— | nothing | when reach that point which distance to the end is 'threshold' px, the component will emit this event |


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
