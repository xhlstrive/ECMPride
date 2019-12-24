<template>
  <el-row id="app_home">
    <!-- <el-card class="box-card" shadow="never"> -->
    <!-- <div class="demo-image__placeholder" style="height: 400px;">
      <div class="block">
        <el-image :src="src" style="height: 300px;"></el-image>
      </div>
    </div> -->
    <el-card :body-style="{ padding: '0px' }" shadow="never">
      <img :src="src" class="image">
      <div style="padding: 14px;">
        <span>About Us</span>
        <div class="bottom clearfix">
          <time class="time">description……</time>
        </div>
      </div>
    </el-card>
    <el-row class="mt50">
      <el-divider content-position="center"><span class="dividerTitle">SEARCH</span></el-divider>
      <div class="searchOuter mt20">
        <el-input placeholder="Enter UniProt ID (eg: P02452) to search" v-model="keyWords" class="input-with-select">
          <el-select v-model="searchVal" slot="prepend" placeholder="Please Select">
            <el-option
              v-for="item in searchType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
        <div class="searchUpload mt20">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="mini" type="success">upload<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="mini" type="primary" icon="el-icon-search">search</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
// import {mapActions, mapGetters} from 'vuex'
// import {parseTime} from 'utils/index'
// let echarts = require('echarts')
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

export default {
  data () {
    return {
      src: '/static/homepage-banner.png',
      searchType: [{
        value: 'uniprotid',
        label: 'UniProt ID'
      }, {
        value: 'genename',
        label: 'Gene Name'
      }],
      searchVal: 'uniprotid',
      keyWords: '',
      fileList: []
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleSearch () {
      // this.$router.push({path: 'creatMessage', query: {draftid: id}})
      this.$router.push({path: '/home/searchList'})
    }
  },
  components: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
$bg_color: #ffffff;
$min_color: #1b82d1;
#app_home {
  .el-select .el-input {
    width: 130px;
  }
  .dividerTitle {
    font-size: 18px;
    color: $min_color;
  }
  .searchOuter {
    text-align: center;
    .input-with-select {
      width: 50%;
    }
  }
  .input-with-select .el-input-group__prepend {
    background-color: $bg_color;
  }
  .el-input-group__append {
    background-color: #409eff;
    color: #fff;
    border: 1px solid #3a8ee6;
  }
}
</style>
