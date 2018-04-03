import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'beautify-scrollbar/dist/index.css';
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import examHeader from './components/header/index'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(examHeader)

const i18n = new VueI18n({
  locale: 'en-US',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en')    // 英文语言包
  }
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
