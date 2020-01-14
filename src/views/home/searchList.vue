<template>
  <el-row id="app_searchList">
    <Breadcrumb></Breadcrumb>
    <el-table
      :data="tableData"
      :show-header="isShowheader"
      :highlight-current-row="isHighLight"
      class="mt20 tableData"
      style="width: 100%;">
      <el-table-column
        label="img"
        width="50">
        <template>
          <i class="el-icon-d-arrow-right" />
        </template>
      </el-table-column>
      <!-- <el-table-column
        type="index"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="uniprotId"
        label="UniProt ID"
        sortable
        width="180">
        <template slot-scope="scope">
          <router-link :to="{path: linkUrl, query:{keyWords: scope.row.uniprotId, searchType: searchType}}">{{scope.row.uniprotId}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="geneName"
        label="Gene Name"
        sortable>
      </el-table-column>
      <el-table-column
        prop="proteinNames"
        label="Protein Name"
        sortable>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="allNum"
      small
      @current-change="handleChangepage"
      class="pagination">
    </el-pagination>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumb from 'components/Breadcrumb/index'
export default {
  name: 'app_searchList',
  components: {
    Breadcrumb
  },
  data () {
    return {
      isShowheader: false,
      tableData: [],
      allNum: 0,
      pageSize: 20,
      pageNum: 1,
      linkUrl: '/home/searchResult',
      isHighLight: true
    }
  },
  computed: {
    ...mapGetters([
      'listData',
      'searchType'
    ])
  },
  methods: {
    ...mapActions([
      // 'getSearchList'
    ]),
    handleResult (row, column, event) {
      // console.log(row, column, event)
      let searchType = this.searchType
      let keyWords = row.uniprotId
      // console.log(keyWords, searchType)
      this.$router.push({path: '/home/searchResult', query: {keyWords: keyWords, searchType: searchType}})
    },
    handleChangepage (val) {
      // console.log(val, this.listData.listData)
      this.tableData = this.listData.listData.slice((val - 1) * this.pageSize, val * this.pageSize)
    }
  },
  created () {
    // console.log(this.getSearchList())
    // this.tableData = this.listData.listData
    if (this.listData.listData.length > 0) {
      this.tableData = this.listData.listData.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
      this.allNum = this.listData.count
      // console.log(this.listData)
    } else {
      this.$message({
        showClose: true,
        message: 'No Data',
        center: true,
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss">
#app_searchList {
  .icon-color {
    color: #1b82d1;
  }
  .tableData {
    a {
      color: #1b82d1;
    }
  }
}
</style>
