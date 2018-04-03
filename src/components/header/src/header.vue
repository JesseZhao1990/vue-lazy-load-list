<template>
  <div class="header">
    <el-button type="primary" @click="changLanguage">{{$t('m.language')}}</el-button>
  </div>
</template>
<script>
export default {
  name:'examHeader',
  methods:{
    changLanguage(){
      if(this.$i18n.locale==='en-US'){
        this.$i18n.locale = 'zh-CN'
      }else{
        this.$i18n.locale = 'en-US'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  text-align: right;
}
</style>

