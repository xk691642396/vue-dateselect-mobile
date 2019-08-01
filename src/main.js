import Vue from 'vue'
import App from './App.vue'
import setRem from './assets/js/setrem.min.js'
import style from './assets/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
