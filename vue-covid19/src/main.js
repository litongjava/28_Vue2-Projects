import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "./assets/css/common.css"
import "../node_modules/echarts/map/js/china"
import echarts from './plugins/echarts'
Vue.use(echarts)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
