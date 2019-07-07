// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/static/css/reset.css'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/static/less/base.less'
import utils from './static/js/utils.js'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI)
Vue.use(utils)
// Vue.use(ElementUI);
// Vue.prototype.$http = $http
Vue.config.productionTip = false
// Vue.use(router)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
