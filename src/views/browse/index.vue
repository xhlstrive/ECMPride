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
      <el-col :span="2" class="mr5">
        <el-tooltip class="item" effect="dark" content="ECM/non-ECM" placement="top">
          <el-select v-model="searchParam.ecmVal" placeholder="ECM/non-ECM" size="mini">
            <el-option
              v-for="item in ecmType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        @select="handleSelect"
        @select-all="handleSelect"
        :highlight-current-row="isHighLight"
        :row-key="getRowKey"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="uniprotId"
          label="UniProt ID"
          sortable
          width="140">
          <template slot-scope="scope">
            <el-link :href="linkUrl + scope.row.uniprotId" target="_blank" type="primary">{{scope.row.uniprotId}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="predictionResult"
          label="ECM/non-ECM"
          width="150"
          align="center"
          sortable>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.predictionResult === true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.predictionResult === true ? 'ECM' : 'non-ECM'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="isOverflow"
          prop="predictionResultProb"
          label="Probability"
          width="180"
          sortable>
          <template slot-scope="scope">
            <span>{{scope.row.predictionResultProb.toFixed(2)}}</span>
          </template>
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
          :show-overflow-tooltip="isOverflow"
          prop="primaryGeneName"
          label="Primary Genename"
          width="170"
          sortable>
        </el-table-column>
        <el-table-column
          label="Download"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-download" size="mini" @click="handleDownloadSingle(scope.row.uniprotId)" plain circle></el-button>
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
      <el-button type="primary" size="mini" icon="el-icon-download" class="mt10 floatLeft" @click="handleBatchDownload">Batch Download</el-button>
      <form :action="actionApi + downloadUrl" method="post" id="downForm" name="downForm">
        <input type="hidden" value="" name="body" id="downVal">
      </form>
    </el-row>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      actionApi: process.env.BASE_API,
      tableData: [],
      searchParam: {
        uniprotid: '',
        ecmgt: '',
        ecmlt: '',
        pname: '',
        gname: '',
        ecmVal: ''
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
          },
          {
            item: 'predictionResult',
            equals: ''
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
          },
          {
            item: 'predictionResult',
            equals: ''
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
      isOverflow: true,
      linkUrl: 'https://www.uniprot.org/uniprot/',
      downloadUrl: '/downloadProteinData',
      isHighLight: true,
      downVal: '',
      ecmType: [{
        value: 'ecm',
        label: 'ECM'
      }, {
        value: 'nonecm',
        label: 'non-ECM'
      }]
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
      console.log(column, prop, order)
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
      if (this.searchParam.ecmVal !== '') {
        switch (this.searchParam.ecmVal) {
          case 'ecm':
            this.ajax_Data_count.filters[4].equals = this.ajax_Data.filters[4].equals = '1'
            break
          case 'nonecm':
            this.ajax_Data_count.filters[4].equals = this.ajax_Data.filters[4].equals = '0'
            break
        }
      }
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
      this.searchParam.ecmVal = ''
      this.handleSearch()
    },
    handleDownloadSingle (uniprotId) {
      this.downVal = '{proteinIdList: ["' + uniprotId + '"]}'
      this.handleBatchDownload()
    },
    getRowKey (row) {
      return row.uniprotId
    },
    handleSelect (selection) {
      console.log(selection.length)
      // let uniprotIdArr = []
      let params = '{proteinIdList: ['
      selection.map(item => {
        // uniprotIdArr.push(item.uniprotId)
        params += '"' + item.uniprotId + '",'
      })
      params += ']}'
      console.log(params)
      selection.length === 0 ? this.downVal = '' : this.downVal = params
      // this.downVal = params
    },
    handleBatchDownload () {
      if (this.downVal === '') {
        this.$message({
          message: 'Select nothing!',
          type: 'warning'
        })
      } else {
        document.getElementById('downVal').value = this.downVal
        document.getElementById('downForm').submit()
      }
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
