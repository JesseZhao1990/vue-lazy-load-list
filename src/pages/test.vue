<template>
<div>
  <lazy-load-list
    :searchKeys="searchKeys"
    :data="dataList"
    height="800"
    :item-height="30"
  >
    <template slot-scope="item" slot="1">
        <div :style="{paddingLeft:'10px'}">{{item.id}}</div>
    </template>
    <template slot-scope="item" slot="2">
        <div :style="{paddingLeft:'30px'}">{{item.id}}</div>
    </template>
    <template slot-scope="item" slot="3">
        <div :style="{paddingLeft:'50px'}">{{item.id}}</div>
    </template>
  </lazy-load-list>
</div>
</template>

<script>
import lazyLoadList from '../../packages/vueLazyLoadList/src/vueLazyLoadList';
import dataList from './testData.js';
  export default {
    components:{
      lazyLoadList,
    },
    data(){
      return {
        searchKeys:['id','name'],
        dataList:[]
      }
    },
    created() {
      this.dataList = dataList;
    },
  }
</script>
