<template>
  <el-row id="app_home">
    <el-row class="intro">
      <!-- <svg-icon icon-class="homepage-background" :customStyle="customStyle"/> -->
      <div class="searchOuter mt20">
        <h3>ECMPrideDB</h3>
        <h4>The reference database of human extracellular matrix predicted by ECMPride</h4>
        <el-autocomplete :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable :placeholder="searchVal === 'uniprotId' ? 'Enter UniProt ID (eg: P02452) to search' : 'Enter Gene Name (eg: COL1A1) to search'" @focus="handleFocus" @keyup.enter.native="handleSearch" v-model="keyWords" class="input-with-select">
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
          <div class="searchLeft">
            <el-select v-model="uploadTypeVal" placeholder="please selected" size="small" @change="handleUploadType">
              <el-option
                v-for="item in uploadType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="searchCenter">
            <el-upload
              class="upload-demo"
              :action="actionApi + uploadUrl"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-exceed="handleUploadExceed"
              :on-error="handleError"
              :on-remove="handleRemoveFile"
              :file-list="fileList"
              :limit="1"
              :data="ajax_Data_upload"
              :auto-upload="true">
              <el-button size="small" type="success">Upload<i class="el-icon-upload el-icon--right"></i></el-button>
              <!-- <div slot="tip" class="el-upload__tip">Only *.TXT files can be uploaded (ID is separated by Carriage return), and size do not exceed 500 kb</div> -->
            </el-upload>
          </div>
          <div class="searchRight">
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleUploadSearch" :disabled="isDisabled">Search</el-button>
          </div>
        </div>
        <div slot="tip" class="el-upload__tip">Only *.TXT files can be uploaded (ID is separated by Carriage return), and the size does not exceed 500 kb</div>
      </div>
    </el-row>
    <el-row class="menuOuter mt50">
      <el-col :span="4" v-for="(item, index) in menuList" :key="index" style="margin-left: 20px;margin-right: 20px;">
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
      actionApi: process.env.BASE_API,
      searchType: [{
        value: 'uniprotId',
        label: 'UniProt ID'
      }, {
        value: 'genename',
        label: 'Gene Name'
      }],
      searchVal: 'uniprotId',
      uploadType: [{
        value: 'uniprotId',
        label: 'UniProt ID'
      }, {
        value: 'genename',
        label: 'Gene Name'
      }],
      uploadTypeVal: 'uniprotId',
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
        {title: 'About ECMPrideDB', url: '/statistics', src: '/static/statistics.png'},
        {title: 'Browse', url: '/browse', src: '/static/browse.png'},
        {title: 'Downloads', url: '/downloads', src: '/static/download.png'},
        {title: 'User Manual', url: '/userManual', src: '/static/usermanual.png'},
        {title: 'Contacts', url: '/contacts', src: '/static/contactsus.png'}
      ],
      ajax_Data: {},
      ajax_Data_gn: {},
      timeout: null,
      ajax_Data_upload: {
        // proteinIdToken: ''
      },
      uploadUrl: '/uploadFilterFile',
      tokenid: '',
      uploadNum: 0,
      isDisabled: true,
      ajax_Data_destory: {
        token: ''
      }
    }
  },
  computed: {
  },
  created () {
    // console.log(localStorage.getItem('tokenid'))
    // // 随机产生一个32位数
    // this.ajax_Data_upload.proteinIdToken = this.getNum()
    // console.log(this.ajax_Data_upload)
  },
  methods: {
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
      this.searchVal === 'uniprotId' ? inputVal = 'P02452' : inputVal = 'COL1A1'
      this.keyWords === '' ? this.keyWords = inputVal : this.keyWords = this.keyWords
      // this.searchVal === 'uniprotId' ? this.keyWords = 'P02452' : this.keyWords = 'COL1A1'
    },
    querySearch (queryString, cb) {
      console.log(queryString, cb)
      console.log(queryString.length)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (queryString.length >= 3) {
          this.searchVal === 'uniprotId' ? this._queryFuzzyByUniprotid(queryString, cb) : this._queryFuzzyByGenename(queryString, cb)
        } else {
          this.$message({
            showClose: true,
            message: 'The keywords must longer than 3!',
            center: true,
            type: 'warning'
          })
        }
      }, 2000 * Math.random())
    },
    _queryFuzzyByUniprotid (queryString, cb) {
      this.ajax_Data.brokenUniprotId = queryString
      this.getFuzzyQueryOfUniprotId(this.ajax_Data).then((res) => {
        let results = this.formaterVal(res)
        cb(results)
      })
    },
    _queryFuzzyByGenename (queryString, cb) {
      this.ajax_Data_gn.brokenGeneName = queryString
      this.getFuzzyQueryOfGeneName(this.ajax_Data_gn).then((res) => {
        let results = this.formaterVal(res)
        cb(results)
      })
    },
    formaterVal (val) {
      let newArr = []
      val.map(item => {
        newArr.push({
          value: item
        })
      })
      return newArr
    },
    handleUploadType (val) {
      // console.log(val)
      // if (val === 'genename') {
      //   this.uploadUrl = '/getProteinListByUploadGeneName'
      // } else {
      //   this.uploadUrl = '/getProteinListByUploadFile'
      // }
    },
    handleBeforeUpload (file) {
      // console.log(file)
      // this.fileList = fileList.slice(-3)
      // const fname = file.name.split('.')
      // let reg = /[\u4e00-\u9fa5]/g
      // let isenName
      // if (reg.test(fname[0])) {
      //   this.$message({
      //     message: 'The filename must not be chinese!',
      //     type: 'warning'
      //   })
      //   isenName = false
      //   return isenName
      // } else {
      //   isenName = true
      // }
      const isTxt = file.type === 'text/plain'
      if (!isTxt) {
        this.$message({
          message: 'The file type must be txt!',
          type: 'warning'
        })
        return isTxt
      }
      const isLtkb = file.size / 1024 < 500
      if (!isLtkb) {
        this.$message({
          message: 'The filesize must not overflow 500kB!',
          type: 'warning'
        })
        return isLtkb && isTxt
      }
    },
    handleError (err, file, fileList) {
      console.log(err, file, fileList)
      this.$message({
        showClose: true,
        message: 'Upload Error. Please Check The File',
        type: 'error'
      })
      this.isDisabled = true
    },
    handleRemoveFile (file, fileList) {
      // console.log(file, fileList)
      this.isDisabled = false
    },
    handleUploadSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      console.log(localStorage.getItem('tokenid'))
      if (localStorage.getItem('tokenid') !== '') {
        this.ajax_Data_destory.token = localStorage.getItem('tokenid')
        this.destroyFilterFile(this.ajax_Data_destory)
      }
      this.tokenid = response.token
      localStorage.setItem('tokenid', this.tokenid)
      this.setSearchType(this.uploadTypeVal)
      this.isDisabled = false
      // this.uploadNum = response.count
      // if (response.count > 0) {
      //   this.setListData(response)
      //   this.setSearchType(this.searchVal)
      //   this.isDisabled = false
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: 'No Data',
      //     center: true,
      //     type: 'error'
      //   })
      //   this.isDisabled = true
      // }
    },
    handleUploadSearch () {
      // console.log(this.uploadNum)
      this.$router.push({path: '/home/searchList', query: {tokenid: this.tokenid}})
      // this.$router.push({path: '/home/searchList'})
    },
    handleUploadExceed (files, fileList) {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.$message.warning(`Upload limit 1 file`)
    },
    getNum () {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      var nums = ''
      for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61)
        nums += chars[id]
      }
      return nums
    },
    ...mapActions([
      'getSearchList',
      'getFuzzyQueryOfUniprotId',
      'getFuzzyQueryOfGeneName',
      'destroyFilterFile',
      'setListData',
      'setSearchType'
    ])
  },
  components: {
    svgIcon
  },
  mounted () {
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
      // margin-bottom: 30px;
    }
    h4 {
      margin-top: 0;
      font-size: 18px;
      font-weight: normal;
    }
    .searchUpload {
      display: flex;
      margin-left: calc(50% - 15em);
      // .searchLeft {
      //   margin-right: 12px;
      // }
      .searchLeft, .searchCenter {
        float: left;
        margin-right: 12px;
      }
    }
  }
  .menuOuter {
    text-align: center;
    display: flex;
    justify-content: center;
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
  .el-upload-list__item-name, .el-upload-list__item-name [class^=el-icon], .el-upload-list__item .el-icon-close {
    color: #ffffff;
  }
  .el-upload-list :hover {
    background: #0071bc;
  }
}
</style>
