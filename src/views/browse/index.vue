<template>
  <el-row id="app_browse">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20" type="flex">
      <!-- <div style="margin-right: 8px;"><i class="fa fa-search"></i></div> -->
      <el-col :span="4" class="mr5">
        <el-tooltip class="item" effect="dark" content="UniProt ID" placement="top">
          <el-input v-model="searchParam.uniprotid" placeholder="UniProt ID" size="mini" clearable></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4" class="mr5">
        <el-tooltip class="item" effect="dark" content="Protein Name" placement="top">
          <el-input v-model="searchParam.pname" placeholder="Protein Name" size="mini" clearable></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4" class="mr5">
        <el-tooltip class="item" effect="dark" content="Gene Name" placement="top">
          <el-input v-model="searchParam.gname" placeholder="Gene Name" size="mini" clearable></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="2" class="mr5">
        <el-tooltip class="item" effect="dark" content="Probability Start" placement="top">
          <el-input v-model="searchParam.ecmgt" placeholder="Probability Start" size="mini" clearable></el-input>
        </el-tooltip>
      </el-col>
      <div class="mr5">-</div>
      <el-col :span="2" class="mr5">
        <el-tooltip class="item" effect="dark" content="Probability End" placement="top">
          <el-input v-model="searchParam.ecmlt" placeholder="Probability End" size="mini" clearable></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="6">
        <el-button size="mini" type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        <el-button size="mini" type="success" icon="el-icon-refresh" @click="handleClear">Clear</el-button>
      </el-col>
    </el-row>
    <el-row class="mt10">
      <el-table
        :data="tableData"
        @sort-change="handleSort"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="uniprotId"
          label="UniProt ID"
          sortable
          width="140">
          <template slot-scope="scope">
            <el-link href="https://www.uniprot.org/uniprot/" target="_blank" type="primary">{{scope.row.uniprotId}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="predictionResultProb"
          label="Probability of ECM"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="proteinNames"
          label="Protein Name"
          sortable>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="geneName"
          label="Gene Name"
          width="200"
          sortable>
        </el-table-column>
        <el-table-column
          label="Download"
          align="center"
          width="100">
          <template>
            <el-button type="primary" icon="el-icon-download" size="mini" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        small
        layout="total, prev, pager, next"
        :total="allNum"
        :page-size="pageSize"
        @current-change="handleChangepage"
        class="pagination">
      </el-pagination>
      <el-button type="primary" size="mini" icon="el-icon-download" class="mt10 floatLeft">Batch Download</el-button>
    </el-row>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tableData: [],
      searchParam: {
        uniprotid: '',
        ecmgt: '',
        ecmlt: '',
        pname: '',
        gname: ''
      },
      allNum: 0,
      pageSize: 20,
      ajax_Data: {
        filters: [
          // {
          //   item: 'predictionResultProb',
          //   equals: '',
          //   like: '',
          //   lt: '',
          //   gt: ''
          // },
          {
            item: 'uniprotId',
            like: ''
          },
          {
            item: 'proteinNames',
            like: ''
          },
          {
            item: 'geneName',
            like: ''
          },
          {
            item: 'predictionResultProb',
            gt: '',
            lt: ''
          }
        ],
        order: {
          item: 'uniprotId',
          type: 'descending'
        },
        page: {
          pageNum: 1,
          pageLength: 20
        }
      },
      ajax_Data_count: {
        filters: [
          {
            item: 'uniprotId',
            like: ''
          },
          {
            item: 'proteinNames',
            like: ''
          },
          {
            item: 'geneName',
            like: ''
          },
          {
            item: 'predictionResultProb',
            gt: '',
            lt: ''
          }
          // {
          //   item: 'predictionResultProb',
          //   equals: '',
          //   like: '',
          //   lt: '',
          //   gt: ''
          // }
        ]
      },
      isOverflow: true
    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.getProteinListCount(this.ajax_Data_count).then((res) => {
      this.allNum = res
    })
    this.getProteinListData(this.ajax_Data).then((res) => {
      // console.log(res)
      this.tableData = res
    })
  },
  methods: {
    handleChangepage (val) {
      this.ajax_Data.page.pageNum = val
      this.getProteinListData(this.ajax_Data).then((res) => {
        this.tableData = res
      })
    },
    handleSort (column, prop, order) {
      // console.log(column, prop, order)
      this.ajax_Data.order.item = column.prop
      this.ajax_Data.order.type = column.order
      this.getProteinListData(this.ajax_Data).then((res) => {
        this.tableData = res
      })
    },
    handleSearch () {
      this.searchParam.uniprotid !== '' ? this.ajax_Data_count.filters[0].like = this.ajax_Data.filters[0].like = this.searchParam.uniprotid : this.ajax_Data_count.filters[0].like = this.ajax_Data.filters[0].like = ''
      this.searchParam.pname !== '' ? this.ajax_Data_count.filters[1].like = this.ajax_Data.filters[1].like = this.searchParam.pname : this.ajax_Data_count.filters[1].like = this.ajax_Data.filters[1].like = ''
      this.searchParam.gname !== '' ? this.ajax_Data_count.filters[2].like = this.ajax_Data.filters[2].like = this.searchParam.gname : this.ajax_Data_count.filters[2].like = this.ajax_Data.filters[2].like = ''
      this.searchParam.ecmgt !== '' ? this.ajax_Data_count.filters[3].gt = this.ajax_Data.filters[3].gt = this.searchParam.ecmgt : this.ajax_Data_count.filters[3].gt = this.ajax_Data.filters[3].gt = ''
      this.searchParam.ecmlt !== '' ? this.ajax_Data_count.filters[3].lt = this.ajax_Data.filters[3].lt = this.searchParam.ecmlt : this.ajax_Data_count.filters[3].lt = this.ajax_Data.filters[3].lt = ''
      // console.log(this.ajax_Data)
      // console.log(this.ajax_Data_count)
      this.getProteinListCount(this.ajax_Data_count).then((res) => {
        this.allNum = res
      })
      this.getProteinListData(this.ajax_Data).then((res) => {
        this.tableData = res
      })
    },
    handleClear () {
      this.searchParam.uniprotid = ''
      this.searchParam.pname = ''
      this.searchParam.gname = ''
      this.searchParam.ecmlt = ''
      this.searchParam.ecmgt = ''
      this.handleSearch()
    },
    ...mapActions([
      'getProteinListCount',
      'getProteinListData'
    ])
  }
}
</script>

<style lang="scss">
$float_right: right;
#app_browse {
  .el-button+.el-button {
    margin-left: 0;
  }
}
</style>
