import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
NProgress.configure({ showSpinner: false })
// const whiteList = ['login', 'resetting']
router.beforeEach((to, from, next) => {
  next()
  // NProgress.start()
  // let whitePath = to.path.split('/')[1]
  // if (whiteList.indexOf(whitePath) !== -1) { // 在免登录白名单，直接进入
  //   next()
  // } else {
  //   next('/login') // 否则全部重定向到登录页
  //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  // }
})
router.afterEach(() => {
  setTimeout(() => {
    NProgress.done()
  }, 500)
})
