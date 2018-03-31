import VueLazyLoadList from './src/vueLazyLoadList.vue'

VueLazyLoadList.install = function(Vue) {
  Vue.component(VueLazyLoadList.name, VueLazyLoadList)
 }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueLazyLoadList)
}

export default VueLazyLoadList
