<template>
  <el-row class="app_navbar">
    <el-col :span="24" class="outer">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        text-color="#000"
        active-text-color="#1b82d1"
        @select="handleSelect"
        style="height: 100%">
        <template v-for="item in allRoutes">
          <router-link :to="item.path" :key="item.path" v-if="!item.hidden">
            <el-menu-item :index="item.path">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { constantRouterMap } from 'router/index'
export default {
  name: 'app_navbar',
  data () {
    return {
      allRoutes: [],
      activeIndex: '/home'
    }
  },
  created () {
    this.allRoutes = constantRouterMap
    console.log(this.allRoutes)
    if (sessionStorage.getItem('activeIndex')) {
      this.activeIndex = sessionStorage.getItem('activeIndex')
    } else {
      this.activeIndex = '/home'
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('activeIndex', this.activeIndex)
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(keyPath)
      this.activeIndex = key
    }
  }
}
</script>

<style lang="scss">
.app_navbar {
  .outer {
    height: 100%;
  }
  // /deep/ .el-menu-item.is-active {
  //   background: #ecf5ff !important;
  // }
}
</style>
