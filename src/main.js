import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/style.scss'
import 'font-awesome/css/font-awesome.css'
import './styles/sliderbar.scss'
import i18n from 'lang'
import './permission'
import './mock'
Vue.config.productionTip = false
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
