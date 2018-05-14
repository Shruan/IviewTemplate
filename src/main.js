// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import iView from 'iview'
import './assets/index.less'

Vue.use(iView)

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://zhongyifu.hz.taeapp.com/' : '/api/'
// axios.defaults.baseURL = '/api/'
axios.interceptors.response.use(res => {
  switch (res.data.code) {
    case '200':
      return res
  }
}, err => {
  switch (err.response.status) {
    case 404:
      console.log('404 err')
      router.push({name: 'Error'})
      break
    case 500:
      console.log('500 err')
      router.push({name: 'Error'})
      break
    default:
      console.log('unknow err')
  }
  return Promise.reject(err)
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
