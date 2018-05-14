import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins/plugins'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu
  },
  plugins,
  scrict: process.env.NODE_ENV !== 'production'
})
