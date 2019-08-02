import Vue from 'vue'
import App from './App.vue'
import setRem from './assets/js/setrem.min.js'
import style from './assets/css/style.css'
import datepickerMobile from '@/components/datepicker-mobile'

Vue.config.productionTip = false
Vue.use(datepickerMobile);

new Vue({
  render: h => h(App),
}).$mount('#app')
