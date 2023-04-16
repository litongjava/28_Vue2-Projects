import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

//引入 element-ui
import ElementUI from 'element-ui'

//引入 element-ui 的 css 文件
import 'element-ui/lib/theme-chalk/index.css';//声明使用 element-ui

import router from './router'
import request from './utils/request'
import base from "@/api/base";
Vue.prototype.$request=request;
Vue.prototype.$base=base;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
