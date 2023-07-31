import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '../node_modules/echarts/map/js/china'
import '../node_modules/echarts/map/js/world'
import Echarts from "./plugins/echarts"
import router from './router'

Vue.use(Echarts);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
