<template>
  <el-row id="app_statistics">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20">
      <!-- <el-col :span="4">
        <a href="#" class="thumbnail">
          <img src="/static/statistics/VennDiagram.png" class="image">
        </a>
      </el-col> -->
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img src="/static/statistics/VennDiagram.png" class="image" width="200">
          <div class="description">
            <span>Venn</span>
            <div class="bottom clearfix">
              <time class="time">description……</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img src="/static/statistics/gsea1.png" class="image" width="200">
          <div class="description">
            <span>Venn</span>
            <div class="bottom clearfix">
              <time class="time">description……</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img src="/static/statistics/Rplot01.png" class="image" width="200">
          <div class="description">
            <span>Venn</span>
            <div class="bottom clearfix">
              <time class="time">description……</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img src="/static/statistics/volcano.jpg" class="image" width="200">
          <div class="description">
            <span>Venn</span>
            <div class="bottom clearfix">
              <time class="time">description……</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
export default {
  data () {
    return {
    }
  },
  components: {
    Breadcrumb
  },
  created () {
  },
  methods: {
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="scss">
#app_statistics {
  .el-card {
    text-align: center;
    .description {
      padding: 14px;
      background: #f5f7fa;
    }
  }
  // .thumbnail {
  //   display: block;
  //   padding: 4px;
  //   margin-bottom: 20px;
  //   line-height: 1.42857143;
  //   background-color: #fff;
  //   border: 1px solid #ddd;
  //   border-radius: 4px;
  //   -webkit-transition: border .2s ease-in-out;
  //   -o-transition: border .2s ease-in-out;
  //   transition: border .2s ease-in-out;
  // }
  // .image {
  //   max-width: 100%;
  //   height: 180px;
  //   vertical-align: middle;
  //   margin-right: auto;
  //   margin-left: auto;
  // }
  // img {
  //   border: solid 1px #00a6d2;
  //   border-radius: 12px;
  // }
}
</style>
