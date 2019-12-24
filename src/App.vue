<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log(process.env)
  }
}
</script>

<style lang="scss">
$font-color1: #24292e;
$font-color2: #303133;
html, body {
  height: 100%;
  // overflow: hidden;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    padding: 6px;
  }
}
body {
  // font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  line-height: 1.5;
  color: $font-color1;
  font-size: 14px;
}
#app {
  height: 100%;
  .el-card {
    border: 1px solid #ddd;
  }
  // card 的 title 样式
  .el-card__header {
    font-size: 16px;
    // background-color: #ecf5ff;
    // background-color: #f5f5f5;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FAFAFA), color-stop(100%,#E9E9E9));
    border-bottom: 1px solid #ddd;
    padding: 7px 15px;
  }
  .el-card__body {
    padding: 0px 15px;
  }
  // 表格中 thead 背景色
  .el-table thead {
    // color: #24292e;
    color: $font-color2;
    th {
      background: #f5f7fa;
    }
  }
  .el-table td, .el-table th {
    padding: 6px 0;
  }
  .el-table .cell, .el-table th div {
    padding-right: 6px;
  }
  // 表格中文字居中
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    // padding-left: 6px;
    text-align: center;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
  // 面包屑
  .el-breadcrumb {
    // background-color: #f5f5f5;
    background-color: #f2f2f2;
    border-radius: 4px;
    padding: 8px 15px;
    // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #FAFAFA), color-stop(100%, #E9E9E9));
    // border: 1px solid #ddd;
  }
}
a {
  text-decoration: none;
}
h3 {
  margin: 0
}
.clearfix:after {
  display: block;
  content: '';
  clear: both;
}
</style>
