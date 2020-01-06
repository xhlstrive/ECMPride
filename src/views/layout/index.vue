<template>
  <el-container id="app_layout">
    <el-header style="height: 50px;">ECMPride</el-header>
    <el-container>
      <Navbar></Navbar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from './components/navbar'
// import Footer from './components/footer'
export default {
  name: 'app_layout',
  components: {
    Navbar
    // Footer
  }
}
</script>

<style lang="scss">
$bg_color: #ffffff;
$min_color: #225390; /* #1b82d1 */
 #app_layout {
   height: 100%;
   .el-header {
     background-color: $min_color;
     color: $bg_color;
     text-align: center;
     line-height: 50px;
     font-size: 22px;
   }
   .el-main {
    //  background: url("/static/body-bg.png") repeat;
   }
   .el-footer {
     background-color: $min_color;
   }
 }
</style>
