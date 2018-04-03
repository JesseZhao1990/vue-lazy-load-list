<template>
<div>
    <h2>{{$t('m.example')}}</h2>
    {{$t('m.exampleExplain')}}
    <h3>{{$t('m.exampleOne')}}</h3>
    <div class="demo">
      <div>
        <pre>
          <div v-text="demoCode"></div>
        </pre>
      </div>
      <div>
        <lazy-load-list
          :searchKeys="searchKeys"
          :data="dataList"
          height="200"
          :item-height="30"
        >
          <template slot-scope="item" slot="1">
              <div :style="{paddingLeft:'10px'}">{{item.name}}</div>
          </template>
          <template slot-scope="item" slot="2">
              <div :style="{paddingLeft:'30px'}">{{item.name}}</div>
          </template>
        </lazy-load-list>        
      </div>
    </div>
</div>
</template>

<script>
import lazyLoadList from '../../packages/vueLazyLoadList/src/vueLazyLoadList';
import dataList from './testData.js';
import {mockData} from '../mock/demo2.js';

const demoCode = '<template>\n'+
'  <div>\n'+
'    <lazy-load-list\n'+
'      :searchKeys="searchKeys"\n'+
'      :data="dataList"\n'+
'      height="200"\n'+
'      :item-height="30"\n'+
'    >\n'+
'      <template slot-scope="item" slot="1">\n'+
`          <div :style="{paddingLeft:'10px'}">{{item.name}}</div>\n`+
'      </template>\n'+
'      <template slot-scope="item" slot="2">\n'+
`          <div :style="{paddingLeft:'30px'}">{{item.name}}</div>\n`+
'      </template>\n'+
'    </lazy-load-list>\n'+  
'  </div>\n'+
'</template>\n'+
'<script>\n'+
'const dataList = [\n'+
'  {\n'+
`    name:'北京',\n`+
`    children:[{name:'西城区'},{name:'东城区'},{name:'海淀区'},{name:'丰台区'},{name:'石景山区'},{name:'通州区'},\n`+
`              {name:'西城区'},{name:'东城区'},{name:'海淀区'},{name:'丰台区'},{name:'石景山区'},{name:'通州区'}]\n`+
'  },\n'+
`  {name:'上海'},\n`+
`  {name:'广州'},\n`+
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
  }
</script>
<style lang="less" scoped>
.demo{
}
</style>

