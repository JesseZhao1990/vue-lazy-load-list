<template>
<div>
    <h3>{{$t('m.exampleTwo')}}</h3>
    <p>{{$t('m.exampleTwo_txt')}}</p>
    <div class="demo">
      <div>
        <pre>
          <div v-text="demoCode"></div>
        </pre>
      </div>
      <div>
        <lazy-load-list
          mode="lazy"
          :searchKeys="searchKeys"
          :hasSearchInput = "true"
          :placeholder = "$t('m.exampleTwo_pleaseholder')"
          :data="dataList"
          listHeight="210"
          :itemHeight="30"
          @reach-threshold="threshold"
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
`      mode="lazy"          // see here, this line  \n ` +
'      :searchKeys="searchKeys"\n'+
'      :hasSearchInput = "true"\n'+
'      :placeholder = "please enter region what do you want to search"\n'+
'      :data="dataList"\n'+
'      listHeight="210"\n'+
'      :itemHeight="30"\n'+
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
`    name:'BeiJing',\n`+
`    children:[{name:'xichengqu'},{name:'dongchengqu'},{name:'haidianqu'},{name:'fengtaiqu'},{name:'shijingshanqu'},{name:'tongzhouqu'},\n`+
`              {name:'xichengqu'},{name:'dongchengqu'},{name:'haidianqu'},{name:'fengtaiqu'},{name:'shijingshanqu'},{name:'tongzhouqu'}]\n`+
'  },\n'+
`  {name:'ShangHai'},\n`+
`  {name:'GuangZhou'},\n`+
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

