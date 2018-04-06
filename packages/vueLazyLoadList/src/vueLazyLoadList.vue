<script>
/* eslint-disable */
import BeautifyScrollbar from 'beautify-scrollbar';
import { debounce } from 'lodash';
import * as utils from './utils';

const VOEWPORT_MIN_HEIGHT = 100;
const ITEM_MIN_HEIGHT = 20;

export default {
  name: 'lazyLoadList',
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },

    listHeight: {
      type: [Number, String],
      default: VOEWPORT_MIN_HEIGHT,
    },

    itemHeight: {
      type: [Number, String],
      default: ITEM_MIN_HEIGHT * 2,
    },

    tag: {
      type: String,
      default: 'div',
    },

    itemTag: {
      type: String,
      default: 'div',
    },

    threshold: {
      type: [Number, String],
      default: 0,
    },

    mode: {
      type: String,
      default: 'demand',
      validator: val => ['demand', 'lazy'].indexOf(val) > -1,
    },

    searchKeys:{
      type: Array,
      default:[],
    },

    hasSearchInput:{
      type: Boolean,
      default: true
    },

    placeholder:{
      type: String,
      default: 'please enter keywords for search'
    }
  },

  data() {
    // props的listHeight的单位是否是百分比
    const isPercent = String(this.listHeight).indexOf('%') > -1;

    // 列表视图的高度
    let vh = Number.parseInt(this.listHeight, 10);;
    const ih = Number.parseInt(this.itemHeight, 10);

    if (isPercent) {
      vh = this.listHeight;
    } else {
      vh = (Number.isNaN(vh) || vh < VOEWPORT_MIN_HEIGHT) ? VOEWPORT_MIN_HEIGHT : vh;
    }

    return {
      // 经过整理变形成map之后的data
      dataMap: {},
      // on-demand render the list
      renderList: [],
      scrollTop: 0,

      isPercent,

      // outside viewport
      viewportWith: 0,
      viewportHeight: vh,
      ih: (Number.isNaN(ih) || ih < ITEM_MIN_HEIGHT) ? ITEM_MIN_HEIGHT : ih,

      // inner content
      contentWidth: NaN,
      contentHeight: NaN,
      contentMarginTop: 0,

      scrollbar: null,

      // list 列表的包裹元素的rect
      wrapRect: null,

      // 此组件的父元素的rect
      parentNodeRect: null,
    };
  },

  watch: {
    data(val) {
      this.convertData(this.data);
      this.initRenderList();
      this.updateScrollbar();
    },
    scrollTop(val) {
      this.updateRenderList();
      if (this.threshold > 0 && this.contentHeight - this.viewportHeight - val <= this.threshold) {
        this.reachThreshold();
      }
    },
  },

  provide() {
    return {
      list: this,
    };
  },

  render(h) {
    if (!this.$h) {
      this.$h = h;
    }

    const search = h("input",{
      attrs: {
        placeholder: this.placeholder,
      },
      class: {
        'vl-search': true,
      },
      on: {
        input: debounce(this.changeHander,500)
      }
    },[]);

    const children = h(this.tag, {
      class: {
        'vl': true,
      },
      style: {
        marginTop: `${this.contentMarginTop}px`,
      },
    }, this.renderList);

    const listWrap =  h('div', {
      class: {
        'vl-wrap': true,
      },
      style: {
        height: this.isPercent ? this.viewportHeight : `${this.viewportHeight}px`,
      },
    }, [children]);

    const containerChildren = this.hasSearchInput ? [search,listWrap] : [listWrap]
    const container = h("div",{
      style: {
        height: '100%',
      },
    },containerChildren)

    return container;

  },

  methods: {
    // 将props的data经过标记之后转成mapData
    convertData(data) {
      let dataMap = {};
      let count = 0;

      function mark(item,level,parentId,itemIndex) {
        count ++;
        const selfId = parentId ? `${parentId}-${itemIndex}`:`${itemIndex}`;
        dataMap[count] = Object.assign({},item,
        {
          autoId:selfId,
          level
        });
        if(item.children && item.children.length>0){
          for(let i=0;i<item.children.length;i++){
            mark(item.children[i],level+1,selfId,i+1);
          }
        }
      };
      for(let j=0;j<data.length;j++){
        mark(data[j],1,null,j+1);
      }
      dataMap.length = count+1;
      this.dataMap = dataMap;
    },

    changeHander($event) {
      const {value} = $event.target;
      const nextData = this.getFiltersData(value);
      this.convertData(nextData);
      this.initRenderList();
      this.updateScrollbar();
    },

    // 根据传入的搜索词过滤data，并返回过滤之后的data
    getFiltersData(v) {
      const self = this;
      function isPass(d){
        return self.searchKeys.some(k => {
          if(d[k]){
            return d[k].indexOf(String(v))>-1 ;
          }else{
            return false;
          }
        } )
      };

      function loop(dataArray=[]) {
        const flt = [];
        dataArray.map(d => {
          if (isPass(d)) {
            flt.push(d);
          } else if(d.children) {
            const children = loop(d.children);
            if(children.length>0){
              flt.push(Object.assign({},d,{children}))
            }
          }
        })
        return flt;
      }

      if(String(v).length === 0){
        return this.data;
      }else{
        return loop(this.data);
      }
    },

    initRenderList() {
      this.contentHeight = Math.ceil(this.dataMap.length * this.ih);
      if (this.mode === 'demand') {
        this.renderList = this.getDemandList();
      } else if (this.mode === 'lazy') {
        this.renderList = this.getLazyList();
      }
    },

    updateRenderList() {
      if (this.mode === 'demand') {
        this.renderList = this.getDemandList();
      } else if (this.mode === 'lazy') {
        this.renderList = this.getLazyList();
      }
    },

    updateScrollbar() {
      if (this.scrollbar) {
        this.$nextTick(() => {
          this.scrollbar.update({
            contentHeight: this.contentHeight,
          });
        });
      }
    },

    // 生成demand模式下的nodeList
    getDemandList() {

      const list = [];
      const vh = this.isPercent ?
        this.parentNodeRect.height * utils.toPoint(this.listHeight)
        : this.viewportHeight + 2;

      const from = Math.floor(this.scrollTop / this.ih);

      const to = Math.ceil((this.scrollTop + vh) / this.ih);

      const hasSlots = Object.keys(this.$scopedSlots).length>0 ? true : false;

      for (let i = from; i < to; i++) {
        if (typeof this.dataMap[i] !== 'undefined') {

          const listItem = this.$h(this.itemTag, {
            class: {
              'vl-list-item': true,
            },
            style: hasSlots ?
            {
              height: `${this.ih}px`,
              lineHeight: `${this.ih}px`,
            }
            :{
              height: `${this.ih}px`,
              lineHeight: `${this.ih}px`,
              paddingLeft: `${20*this.dataMap[i].level}px`
            },
          },
          (() =>{
            if(this.$scopedSlots[this.dataMap[i].level]){
              return this.$scopedSlots[this.dataMap[i].level](this.dataMap[i])
            } else if(this.$scopedSlots.default) {
              return this.$scopedSlots.default(this.dataMap[i]);
            }else{
              return [this.dataMap[i].autoId]
            }
          })()
          );

          list.push(listItem);
        }
      }
      this.contentMarginTop = from * this.ih;
      return list;
    },

    // 生成lazy模式下的nodeList
    getLazyList() {
      if (this.renderList.length === this.dataMap.length) {
        return this.renderList;
      }

      const list = [].concat(this.renderList);
      const vh = this.isPercent ?
        this.parentNodeRect.height * utils.toPoint(this.listHeight)
        : this.viewportHeight + 2;

      const from = list.length;
      const to = Math.ceil((this.scrollTop + vh) / this.ih);

      const hasSlots = Object.keys(this.$scopedSlots).length>0 ? true : false;

      for (let i = from; i < to; i++) {
        if (typeof this.dataMap[i] !== 'undefined') {
          const listItem = this.$h(this.itemTag, {
            class: {
              'vl-list-item': true,
            },
            style: hasSlots ?
            {
              height: `${this.ih}px`,
              lineHeight: `${this.ih}px`,
            }
            :{
              height: `${this.ih}px`,
              lineHeight: `${this.ih}px`,
              paddingLeft: `${20*this.dataMap[i].level}px`
            },
          },
          (() =>{
            if(this.$scopedSlots[this.dataMap[i].level]){
              return this.$scopedSlots[this.dataMap[i].level](this.dataMap[i])
            } else if(this.$scopedSlots.default) {
              return this.$scopedSlots.default(this.dataMap[i]);
            }else{
              return [this.dataMap[i].autoId]
            }
          })()
          )
          list.push(listItem);
        }
      }
      this.contentMarginTop = 0;
      return list;
    },

    updateScrollVal() {
      this.scrollTop = this.scrollbar.element.scrollTop;
    },

    reachThreshold() {
      this.$emit('reach-threshold');
    },

    // 窗口resize之后的处理函数
    handleWinResize() {
      this.parentNodeRect = this.$el.getBoundingClientRect();
      this.wrapRect = this.$el.getElementsByClassName("vl-wrap")[0] ?
      this.$el.getElementsByClassName("vl-wrap")[0].getBoundingClientRect()
      : this.$el.getBoundingClientRect();
      if (this.scrollbar.rect.height !== this.wrapRect.height) {
        this.updateRenderList();
        this.updateScrollbar();
      }
    },
  },

  // 组件created之后加工数据
  created(){
    this.convertData(this.data);
  },

  // 组件mounted之后、计算视图、初始化nodeList、创建滚动条、绑定滚动和调整窗口事件
  mounted() {
    this.$listWrap = this.$el.getElementsByClassName("vl-wrap")[0];
    this.viewportWith = this.$el.clientWidth;
    this.parentNodeRect = this.$el.getBoundingClientRect();
    this.dataMap.length && this.initRenderList();
    this.$nextTick(() => {
      this.$listWrap = this.$el.getElementsByClassName("vl-wrap")[0];
      this.scrollbar = new BeautifyScrollbar(this.$listWrap, {
        contentWidth: this.contentWidth,
        contentHeight: this.contentHeight,
      });
      this.$listWrap.addEventListener('bs-update-scroll-value', this.updateScrollVal, false);
    });

    window.addEventListener('resize', this.handleWinResize, false);
  },

  // 组件销毁之前销毁进度条并且移除绑定的事件
  beforeDestroy() {
    this.scrollbar && this.scrollbar.destroy();
    this.$listWrap.removeEventListener('bs-update-scroll-value', this.updateScrollVal, false);
    window.removeEventListener('resize', this.handleWinResize, false);
  },
};
</script>
<style lang="less" scoped>
  .vl-wrap {
      position: relative;
      box-sizing: content-box !important;
      width: 100%;
      overflow: hidden;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      ul, ol {
          list-style: none;
      }
  }
  .vl {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      box-sizing: content-box !important;
      border: none;
      display: block;
  }

  .vl-search{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    height: 35px;
    margin-bottom:10px;
    &:hover{
      border-color: #c0c4cc;
    }
    &:focus{
      outline: none;
      border-color: #409eff;
    }
  }

  .vl-list-item {
      position: relative;
      text-align: left;
      display: block;
      width: 100%;
      box-sizing: border-box;
      // border-bottom: 1px solid #d1d5da;
      &:last-child {
          border-bottom: none;
      }
  }
</style>
