<template>
  <div>
    <h2>{{$t('m.install')}}</h2>
    <pre>
      npm install vue-lazy-load-list beautify-scrollbar --save
    </pre>
    <h2>{{$t('m.register')}}</h2>
    <pre>
      import Vue from 'vue';
      import 'beautify-scrollbar/dist/index.css';
      import lazyLoadList from 'vue-lazy-load-list';

      Vue.use(lazyLoadList);
    </pre>
    <h2>{{$t('m.use')}}</h2>
      <pre>
        <div v-text="step3"></div>
      </pre>
  </div>
</template>
<script>
export default {
  data(){
    return {
      step3:'    <lazy-load-list :data="data"></lazy-load-list>'
    }
  }
  
}
</script>
<style lang="less" scoped>
h2,pre{
  text-align: left;
}

</style>


