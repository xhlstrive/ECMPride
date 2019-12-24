<template>
  <el-row id="app_browse">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
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
        <el-table-column
          label="Download"
          width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-download" size="mini" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        small
        layout="total, prev, pager, next"
        :total="1000"
        class="pagination">
      </el-pagination>
      <el-button type="primary" size="mini" icon="el-icon-download" class="mt10 floatLeft">批量下载</el-button>
    </el-row>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
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
      }]
    }
  },
  components: {
    Breadcrumb
  },
  created () {
  },
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="scss">
$float_right: right;
#app_browse {
}
</style>
