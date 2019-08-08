import Vue from 'vue'
import App from './App.vue'
import setRem from './assets/js/setrem.min.js'
import style from './assets/css/style.css'
import DateSelect from '@/components/vue-dateselect-mobile'

Vue.config.productionTip = false
Vue.use(DateSelect);

new Vue({
  render: h => h(App),
}).$mount('#app')
