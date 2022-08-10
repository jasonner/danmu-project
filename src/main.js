import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './util/rem'
import wx from 'weixin-jsapi'
Vue.prototype.$isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
      } else {
          return false;
      }
},
Vue.prototype.$wx = wx
Vue.use(VueRouter,)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://api.lehuitech.com.cn/'  //关键代码
// 是否允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
