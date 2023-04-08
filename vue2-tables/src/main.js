import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import MyCompontent from "@/components/MyComponent";
import tabs from "@/components/tabs";
Vue.use(MyCompontent)
Vue.use(tabs)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
