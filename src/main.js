import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';
// 导入全局样式
import './assets/css/global.css';
// 引入全局指令
import * as directives from '@/directives';
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

// 配置请求根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

// 配置全局请求拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
