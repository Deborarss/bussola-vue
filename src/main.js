import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'

Vue.config.productionTip = false

window.$ = jQuery
window.jQuery = jQuery

new Vue({
  render: h => h(App),
}).$mount('#app')
