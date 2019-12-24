<template>
  <el-row id="app_searchList">
    <Breadcrumb></Breadcrumb>
    <el-table
      :data="tableData"
      :show-header="isShowheader"
      @row-click="handleResult"
      class="mt20 pointer"
      style="width: 100%;">
      <el-table-column
        label="img"
        width="50">
        <template slot-scope="scope">
          <i class="el-icon-d-arrow-right" />
        </template>
      </el-table-column>
      <el-table-column
        prop="uniprotid"
        label="UniProt ID"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="ecm"
        label="Probability of ECM"
        sortable>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="1000"
      small
      class="pagination">
    </el-pagination>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
export default {
  name: 'app_searchList',
  components: {
    Breadcrumb
  },
  data () {
    return {
      isShowheader: false,
      tableData: [{
        uniprotid: 'P13942',
        ecm: '0.99'
      }, {
        uniprotid: 'P20908',
        ecm: '0.56'
      }, {
        uniprotid: 'P25948',
        ecm: '0.32'
      }, {
        uniprotid: 'P25940',
        ecm: '0.14'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }, {
        uniprotid: 'Q8TER0',
        ecm: '0.789'
      }]
    }
  },
  methods: {
    handleResult (row, column, event) {
      this.$router.push({path: '/home/searchResult'})
    }
  }
}
</script>

<style lang="scss">
#app_searchList {
  .icon-color {
    color: #1b82d1;
  }
}
</style>
