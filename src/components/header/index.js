import header from './src/header'

header.install = function(Vue){
  Vue.component(header.name,header)
}

export default header;