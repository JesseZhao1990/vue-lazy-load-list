<template>
<div>
    <h3>{{$t('m.exampleThree')}}</h3>
    <p>{{$t('m.exampleThree_txt')}}</p>
    <div class="demo">
      <div>
        <pre>
          <div v-text="demoCode"></div>
        </pre>
      </div>
      <div>
        <lazy-load-list
          :searchKeys="searchKeys"
          :hasSearchInput = "true"
          :placeholder = "$t('m.exampleThree_pleaseholder')"
          :data="dataList"
          listHeight="210"
          :itemHeight="30"
          @reach-threshold="threshold"
        >
          <template slot-scope="item" slot="1">
              <div :style="{paddingLeft:'10px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>
          </template>
          <template slot-scope="item" slot="2">
              <div :style="{paddingLeft:'30px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>
          </template>
          <template slot-scope="item" slot="3">
              <div :style="{paddingLeft:'50px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>
          </template>
          <template slot-scope="item" slot="4">
              <div :style="{paddingLeft:'70px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>
          </template>
          <template slot-scope="item" slot="5">
              <div :style="{paddingLeft:'90px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>
          </template>
        </lazy-load-list>
      </div>
    </div>
</div>
</template>

<script>
import lazyLoadList from '../../packages/vueLazyLoadList/src/vueLazyLoadList';
import dataList from './testData.js';
import {mockData} from '../mock/demo4.js';

const demoCode = '<template>\n'+
'  <div>\n'+
'    <lazy-load-list\n'+
'      :searchKeys="searchKeys"\n'+
'      :hasSearchInput = "true"\n'+
'      :placeholder = "please enter keywords to search"\n'+
'      :data="dataList"\n'+
'      listHeight="210"\n'+
'      :itemHeight="30"\n'+
'    >\n'+
'      <template slot-scope="item" slot="1">\n'+
`          <div :style="{paddingLeft:'10px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>\n`+
'      </template>\n'+
'      <template slot-scope="item" slot="2">\n'+
`          <div :style="{paddingLeft:'30px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>\n`+
'      </template>\n'+
'      <template slot-scope="item" slot="3">\n'+
`          <div :style="{paddingLeft:'50px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>\n`+
'      </template>\n'+
'      <template slot-scope="item" slot="4">\n'+
`          <div :style="{paddingLeft:'70px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>\n`+
'      </template>\n'+
'      <template slot-scope="item" slot="5">\n'+
`          <div :style="{paddingLeft:'900px',borderBottom:'1px solid #ccc'}">{{item.name}}</div>\n`+
'      </template>\n'+
'    </lazy-load-list>\n'+
'  </div>\n'+
'</template>\n'+
'<script>\n'+
'const dataList = [\n'+
`  { \n`+
`    name: '1', \n`+
`    children: [{\n`+
`      name: '1-1',\n`+
`      children: [\n`+
`        {\n`+
`        name: "1-1-1",\n`+
`        children: [\n`+
`          {\n`+
`            name: "1-1-1-1",\n`+
`            children: [\n`+
`              { name: "1-1-1-1-1" },\n`+
`              { name: "1-1-1-1-2" },\n`+
`              { name: "1-1-1-1-3" },\n`+
`              { name: "1-1-1-1-4" },\n`+
`              { name: "1-1-1-1-5" }\n`+
`            ]\n`+
`          },\n`+
`          { name: "1-1-1-2" }\n`+
`        ]},\n`+
`        { name: "1-1-2" },\n`+
`        { name: '1-1-3' }\n`+
`    ]},\n`+
`    { name: '1-2' },\n`+
`    { name: '1-3' },\n`+
`    { name: '1-4' },\n`+
`    { name: '1-5' },\n`+
`    { name: '1-6' },\n`+
`    { name: '1-7' },\n`+
`    { name: '1-8' },\n`+
`    { name: '1-9' },\n`+
`    { name: '1-10' },\n`+
`    { name: '1-11' },\n`+
`    { name: '1-12' }]\n`+
`  },\n`+
`  { name: '2' },\n`+
`  { name: '3' },\n`+
']\n'+
'\n'+
'export default {\n'+
'  data() {\n'+
'      return {\n'+
`        searchKeys:['name'],\n`+
'        dataList,\n'+
'      }\n'+
'  }\n'+
'}\n'+
`< /script>\n`+
``

  export default {
    components:{
      lazyLoadList,
    },
    data(){
      return {
        searchKeys:['name'],
        dataList:[],
        demoCode:demoCode,
      }
    },
    created() {
      this.dataList = mockData;
    },
    methods:{
      threshold(e){
        console.log(e);
      }
    }
  }
</script>
<style lang="less" scoped>
</style>

