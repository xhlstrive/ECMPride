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
import 'icons'
import './permission'
import animate from 'animate.css'
import './mock'
import vuescroll from 'vuescroll'

Vue.config.productionTip = false
Vue.use(animate)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

// 你可以在这里设置全局配置
Vue.use(vuescroll) // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
