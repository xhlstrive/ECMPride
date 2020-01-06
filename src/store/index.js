import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import app from './modules/app'
import home from './modules/home'
import searchResult from './modules/searchResult'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    home,
    searchResult
  },
  getters
})

export default store
