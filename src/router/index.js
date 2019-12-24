import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    name: 'apphome',
    redirect: '/home/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: _import('home/index'),
        name: 'home'
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    name: 'home',
    redirect: '/home/index',
    meta: {icon: 'el-icon-s-home', title: 'Home', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('home/index'),
        name: 'home'
      },
      {
        path: 'searchResult',
        component: () => import('@/views/home/searchResult'),
        name: 'searchResult',
        meta: {icon: 'el-icon-s-home', title: 'searchResult', noCache: false}
      },
      {
        path: 'searchList',
        component: () => import('@/views/home/searchList'),
        name: 'searchList',
        meta: {icon: 'el-icon-s-home', title: 'searchList', noCache: false}
      }
    ]
  },
  // {
  //   path: '/searchList',
  //   component: Layout,
  //   name: 'appSearchList',
  //   redirect: '/searchList/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: ':id',
  //       component: _import('home/searchList'),
  //       name: 'searchList'
  //     }
  //   ]
  // },
  // {
  //   path: '/searchResult',
  //   component: Layout,
  //   name: 'appSearchResult',
  //   redirect: '/searchResult/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: ':id',
  //       component: _import('home/searchResult'),
  //       name: 'searchResult'
  //     }
  //   ]
  // },
  {
    path: '/statistics',
    component: Layout,
    name: 'appStatistics',
    redirect: '/statistics/index',
    meta: {icon: 'el-icon-s-data', title: 'Statistics', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('statistics/index'),
        name: 'Statistics'
      }
    ]
  },
  {
    path: '/browse',
    component: Layout,
    name: 'appBrowse',
    redirect: '/browse/index',
    meta: {icon: 'el-icon-document', title: 'Browse', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('browse/index'),
        name: 'Browse'
      }
    ]
  },
  {
    path: '/downloads',
    component: Layout,
    name: 'appDownloads',
    redirect: '/downloads/index',
    meta: {icon: 'el-icon-download', title: 'Downloads', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('downloads/index'),
        name: 'Downloads'
      }
    ]
  },
  {
    path: '/userManual',
    component: Layout,
    name: 'appUserManual',
    redirect: '/userManual/index',
    meta: {icon: 'el-icon-tickets', title: 'User Manual', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('userManual/index'),
        name: 'User Manual'
      }
    ]
  },
  {
    path: '/contacts',
    component: Layout,
    name: 'appContacts',
    redirect: '/contacts/index',
    meta: {icon: 'el-icon-phone', title: 'Contacts', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('contacts/index'),
        name: 'Contacts'
      }
    ]
  },
  {
    path: '/expCollaboration',
    component: Layout,
    name: 'appExpCollaboration',
    redirect: '/expCollaboration/index',
    meta: {icon: 'fa fa-flask fa-fw', title: 'Experimental Collaboration', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('expCollaboration/index'),
        name: 'Experimental Collaboration'
      }
    ]
  },
  {
    path: '/relatedDatabase',
    component: Layout,
    name: 'appRelatedDatabase',
    redirect: '/relatedDatabase/index',
    meta: {icon: 'el-icon-link', title: 'Related Database', noCache: false},
    hidden: false,
    children: [
      {
        path: 'index',
        component: _import('relatedDatabase/index'),
        name: 'Related Database'
      }
    ]
  }
  // {
  //   path: '/correlation',
  //   component: Layout,
  //   name: 'appCorrelation',
  //   redirect: '/correlation/index',
  //   children: [
  //     {
  //       path: ':id',
  //       component: _import('analysis/correlation'),
  //       name: 'Correlation'
  //     }
  //   ]
  // },
]
export default new Router({
  routes: constantRouterMap
})
