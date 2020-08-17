import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';
// 导入全局样式
import './assets/css/global.css';

// 配置请求根路径
axios.defaults.baseURL =
  'http://timemeetyou.com:8889/api/private/v1/';
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
