<template>
  <el-row id="app_home">
    <el-row class="intro">
      <!-- <svg-icon icon-class="homepage-background" :customStyle="customStyle"/> -->
      <div class="searchOuter mt20">
        <h3>ECMPride</h3>
        <el-autocomplete :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable :placeholder="searchVal === 'uniprotid' ? 'Enter UniProt ID (eg: P02452) to search' : 'Enter Gene Name (eg: COL1A1) to search'" @focus="handleFocus" v-model="keyWords" class="input-with-select"  @keyup.enter.native="handleSearch">
          <el-select v-model="searchVal" slot="prepend" placeholder="Please Select" @change="handleSearchType">
            <el-option
              v-for="item in searchType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-autocomplete>
        <div class="searchUpload mt20">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="success">upload<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button size="small" type="primary" icon="el-icon-search">search</el-button>
            <div slot="tip" class="el-upload__tip">Only CSV files can be uploaded, no more than 500kb</div>
          </el-upload>
        </div>
      </div>
    </el-row>
    <el-row class="menuOuter mt50">
      <el-col :span="6" v-for="(item, index) in menuList" :key="index">
          <router-link :to="item.url"><img :src="item.src" alt="" :style="customStyle"></router-link>
          <h3><router-link :to="item.url">{{item.title}}</router-link></h3>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import {mapActions} from 'vuex'
import svgIcon from 'components/svgIcons'// svg component
// import {parseTime} from 'utils/index'

export default {
  data () {
    return {
      searchType: [{
        value: 'uniprotid',
        label: 'UniProt ID'
      }, {
        value: 'genename',
        label: 'Gene Name'
      }],
      searchVal: 'uniprotid',
      keyWords: '',
      fileList: [],
      ajax_Data_general: {
        uniprotId: '',
        geneName: ''
      },
      customStyle: {
        width: '150px',
        height: '150px'
      },
      menuList: [
        {title: 'Statistics', url: '/statistics', src: '/static/statistics.png'},
        {title: 'Downloads', url: '/downloads', src: '/static/download.png'},
        {title: 'User Manual', url: '/userManual', src: '/static/usermanual.png'},
        {title: 'Contacts', url: '/contacts', src: '/static/contactsus.png'}
      ]
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
    handleSearchType (val) {
      this.keyWords = ''
    },
    handleSearch () {
      if (this.keyWords === '') {
        this.$message({
          showClose: true,
          message: 'Please type the keywords',
          center: true,
          type: 'error'
        })
      } else {
        let searchType = 'uniprotId'
        if (this.searchVal === 'genename') {
          searchType = 'geneName'
        }
        let keyWords = this.keyWords
        if (searchType === 'uniprotId') {
          this.ajax_Data_general.uniprotId = keyWords
          this.ajax_Data_general.geneName = ''
        } else {
          this.ajax_Data_general.geneName = keyWords
          this.ajax_Data_general.uniprotId = ''
        }
        this.getSearchList(this.ajax_Data_general).then((res) => {
          if (!this.isEmpty(res)) {
            this.$router.push({path: '/home/searchResult', query: {keyWords: keyWords, searchType: searchType}})
          } else {
            this.$message({
              showClose: true,
              message: 'No Data',
              center: true,
              type: 'error'
            })
          }
        })
        // this.$router.push({path: '/home/searchResult', query: {keyWords: keyWords, searchType: searchType}})
      }
    },
    isEmpty (val) {
      if (typeof val === 'undefined' || val === null || val === '') {
        return true
      } else {
        return false
      }
    },
    handleFocus () {
      let inputVal
      this.searchVal === 'uniprotid' ? inputVal = 'P02452' : inputVal = 'COL1A1'
      this.keyWords === '' ? this.keyWords = inputVal : this.keyWords = this.keyWords
      // this.searchVal === 'uniprotid' ? this.keyWords = 'P02452' : this.keyWords = 'COL1A1'
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': 'Q9NZU1', 'address': 'FLRT1 UNQ752/PRO1483' },
        { 'value': 'P56199', 'address': 'ITGA1' }
      ]
    },
    ...mapActions([
      'getSearchList'
    ])
  },
  components: {
    svgIcon
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang="scss">
$bg_color: #ffffff;
$min_color: #1b82d1;
$font_color: #333333;
$hover_color: #409eff;
#app_home {
  .intro {
    background: url(/static/homepage-background.svg);
    background-color: #112e51;
    color: $bg_color;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    box-sizing: content-box;
    height: calc(100vh - 330px);
    background-size: cover;
    background-position: center;
  }
  .el-select .el-input {
    width: 130px;
  }
  .dividerTitle {
    font-size: 18px;
    color: $min_color;
  }
  .searchOuter {
    width: 60%;
    margin-top: 10%;
    text-align: center;
    .input-with-select {
      width: 100%;
    }
    .el-upload__tip {
      color: $bg_color;
    }
    h3 {
      font-size: 52px;
      margin-bottom: 30px;
    }
  }
  .menuOuter {
    text-align: center;
    // .linkStyle {
    //   color: $font_color;
    // }
    // .linkStyle :hover {
    //   color: $min_color;
    // }
  }
  .input-with-select .el-input-group__prepend {
    background-color: $bg_color;
  }
}
</style>
