<template>
  <el-row class="app_footer">
    <!-- <el-col :span="10" :offset="4">
      <h1 class="app_logo">ODSA</h1>
      <div class="footer_line"></div>
      <div class="footer_detail">
        <p>Omics Data</p>
        <p>Analysis Studio</p>
      </div>
    </el-col> -->
    <el-col :span="10">
      <p>Copyright  2018-2020</p>
    </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .app_footer {
    color: #fff;
    line-height: 60px;
    .app_logo, .footer_line, .footer_detail {
      float: left;
      font-family: "Georgia";
    }
    .footer_line, .footer_detail {
      line-height: 20px;
    }
    .footer_line {
      height: 40px;
      width: 2px;
      background-color: #fff;
      margin: 10px 20px 0;
    }
    .footer_detail {
      margin-top: 10px;
    }
    h1, p {
      margin: 0;
    }
  }
</style>
