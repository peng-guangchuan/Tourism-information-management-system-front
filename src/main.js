// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs
// Vue.prototype.$http = axios;  //修改内部的$http为axios
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://1.117.91.249:8989';
// axios.defaults.baseURL = 'http://localhost:8989';
//axios.defaults.headers.post['Content-Type'] = 'application/json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
