import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss';
import './assets/css/icon.css';
import './assets/css/iconfont.css';
import 'babel-polyfill';
import echarts from 'echarts';
import service from './utils/request.js';
import filters from './utils/filter.js';
import 'cnchar';
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import './permission'; // 权限验证
import './assets/css/animate.css';

Vue.prototype.$axios = service;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// 表格无限滚动
Vue.use(elTableInfiniteScroll);

Vue.use(ElementUI, {
  size: 'medium'
});

for (const key in filters) {
  if (Object.prototype.hasOwnProperty.call(filters, key)) {
    const element = filters[key];
    Vue.filter(key, element);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');