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
// 请求过滤器
axios.interceptors.request.use(config => {
  if (store.state.user && Object.keys(store.state.user.user).length > 0) {
    config.headers['X-USER-ID'] = store.state.user.user.id
    config.headers['X-TOEKN'] = store.state.user.user.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应过滤器
axios.interceptors.response.use(res => {
  switch (res.status) {
    case 200:
      return res.data
  }
}, err => {
  if (err.response) {
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
