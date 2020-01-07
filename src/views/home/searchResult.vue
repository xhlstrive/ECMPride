<template>
  <el-row id="app_searchResult">
    <Breadcrumb></Breadcrumb>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Prediction Result</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <h3 class="mt10">
          <el-link :href="linkAdd + uniportId" target="_blank" type="primary" style="font-weight: 600;font-size: 16px;" :underline="false">
            {{uniportId}}
          </el-link>
        </h3>
        <div class="contents">
          <ul>
            <li><span class="left_title">Protein type:</span> {{predictionResult.proteinType === true ? 'ECM' : 'nonECM'}}</li>
            <li><span class="left_title">Probability:</span> {{predictionResult.probability * 100}}%</li>
            <li><span class="left_title">Protein name:</span> {{predictionResult.officialName === null ? '-' : predictionResult.officialName}}</li>
            <li><span class="left_title">Gene name:</span> {{predictionResult.geneName}}</li>
          </ul>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Domain Annotations</span>
        <div style="float: right; padding: 3px 0">
          <el-tag size="mini" class="mr5">summarized by Naba et al.</el-tag>
          <el-tag type="danger" size="mini">not summarized by Naba et al.</el-tag>
        </div>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10 mb10">
          <el-link :href="domain.linkAdd + item.term" v-for="(item, index) in domain.domainData" :key="index" target="_blank" :underline="false">
            <el-tag class="mr5 mt5" :type="item.isSummarized ? '' : 'danger'" size="mini">
              <!-- <el-link :href="domain.linkAdd + item.term" target="_blank" type="primary" :underline="false">{{item.term}}</el-link> -->
              {{item.term}}
            </el-tag>
          </el-link>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover" v-show="exosome.exome">
      <div slot="header" class="clearfix">
        <span>EXOSOME Annotations</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10 mb10">
          There are experiment evidence that identified <el-link :href="exosome.linkAdd + exosome.exomeID" target="_blank" type="primary">{{uniportId}}({{predictionResult.geneName}})</el-link> in exosomes.
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>GO Annotations</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10">
          <el-table
            :data="go.goAnnoData"
            border
            stripe
            style="width: 100%">
            <el-table-column
              label="GO Link"
              width="150">
              <template slot-scope="scope">
                <el-link :href="go.linkAdd + scope.row.goLink" target="_blank" type="primary" :underline="false">{{scope.row.goLink}}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="term"
              label="Ontology Source"
              width="200">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="go.isOverflow"
              prop="definition"
              label="Term"
              width="200">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="go.isOverflow"
              prop="ontologySource"
              label="Definition">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            small
            layout="total, prev, pager, next"
            :total="go.allNum"
            @current-change="handleChangepage"
            class="pagination mb10">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>RNA Expression</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt20 mb10">
          <el-row>
            <el-alert
              title="Click toolbar to show the tissue"
              type="info"
              show-icon>
            </el-alert>
          </el-row>
          <el-row class="mt10">
            <el-radio-group v-model="ranExpression.ranSortType" size="mini" class="radioGroup" @change="handleRanSort">
              <el-radio-button label="Organ"></el-radio-button>
              <el-radio-button label="Expression"></el-radio-button>
              <el-radio-button label="Alphabetical"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-row>
                <svgDeal :svgData="svgData"></svgDeal>
                <!-- <svg-icon icon-class="man" :customStyle="customStyle" v-if="ranExpression.genderType === 'man'"/>
                <svg-icon icon-class="woman" :customStyle="customStyle" v-else/> -->
              </el-row>
              <el-row style="margin-left: 60px;">
                <el-radio-group v-model="ranExpression.genderType" size="mini" class="genderRadioGroup" @change="handleGenderType">
                  <el-radio-button label="man"></el-radio-button>
                  <el-radio-button label="woman"></el-radio-button>
                </el-radio-group>
              </el-row>
            </el-col>
            <el-col :span="19">
              <div style="width: 100%; height: 600px;" id="myCharts" class="mt10"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <BackToTop :visibility-height="backtoTop.vHeight"></BackToTop>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumb from 'components/Breadcrumb/index'
import BackToTop from 'components/BackToTop/index'
import svgIcon from 'components/svgIcons'// svg component
import svgDeal from 'components/svgDeal'// svg component
let echarts = require('echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'app_searchResult',
  components: {
    Breadcrumb,
    BackToTop,
    svgIcon,
    svgDeal
  },
  data () {
    return {
      uniportId: '',
      linkAdd: 'https://www.uniprot.org/uniprot/',
      predictionResult: {
        proteinType: true,
        probability: 0,
        officialName: '',
        geneName: ''
      },
      domain: {
        domainData: [],
        linkAdd: 'http://www.ebi.ac.uk/interpro/entry/InterPro/'
      },
      // domainData: [],
      exosome: {
        entryName: '',
        exome: '',
        exomeID: '',
        linkAdd: 'http://exocarta.org/gene_summary?gene_id='
      },
      go: {
        goAnnoData: [],
        isOverflow: true,
        allNum: 0,
        linkAdd: 'http://amigo.geneontology.org/amigo/term/'
      },
      ranExpression: {
        ranSortType: 'Organ',
        genderType: 'man',
        profilBarChart: ''
      },
      ajax_Data_general: {
        uniprotId: '',
        geneName: ''
      },
      ajax_Data_go: {
        uniprotId: '',
        pageStart: 0,
        pageLength: 10
      },
      ajax_Data_goCount: {
        uniprotId: ''
      },
      ajax_Data_rna: {
        uniprotId: '',
        orderBy: 'organ'
      },
      backtoTop: {
        vHeight: 200
      },
      customStyle: {
        width: '250px',
        height: '550px',
        cursor: 'pointer'
      },
      svgData: {
        type: 'man',
        selectType: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      // 'searchList'
    ])
  },
  methods: {
    handleChangepage (val) {
      this.ajax_Data_go.pageStart = val * this.ajax_Data_go.pageLength - this.ajax_Data_go.pageLength
      this.getGoListData(this.ajax_Data_go).then((res) => {
        this.go.goAnnoData = res
      })
    },
    handleRanSort (val) {
      switch (val) {
        case 'Organ':
          this.ajax_Data_rna.orderBy = 'organ'
          break
        case 'Expression':
          this.ajax_Data_rna.orderBy = 'expression'
          break
        case 'Alphabetical':
          this.ajax_Data_rna.orderBy = 'tissue'
          break
      }
      // RNA expression
      this.getTissueDistribution(this.ajax_Data_rna).then((res) => {
        this.initCharts(res)
      })
    },
    initCharts (params) {
      // console.log(params)
      let titleArr = []
      let valArr = []
      let orderArr = []
      let organArr = []
      params.map(item => {
        titleArr.push(item.tissue)
        valArr.push(item.expression)
        orderArr.push(item.order)
        organArr.push(item.organ)
      })
      let bar = document.querySelector(`#myCharts`)
      this.profilBarChart = echarts.init(bar)
      // let myCharts = echarts.init(document.querySelector('#myCharts'))
      let option = {
        title: {
          text: 'RNA expression of different tissues',
          left: 'center',
          textStyle: {
            lineHeight: 20
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params, ticket, callback) {
            // console.log(params, ticket, callback)
            return `<div style="text-align: left;padding: 3px;">
                    <div>${params[0].name}(${organArr[params[0].dataIndex]})</div>
                    <div><span style="display: inline-block;background-color: ${params[0].color};border-radius: 10px;padding: 4px;"></span> expression: ${params[0].value}</div>
                  </div>`
          }
        },
        legend: {
          data: ['expression', 'NX'],
          top: '5%',
          bottom: '20%',
          show: false
        },
        toolbox: {
          show: true,
          feature: {
            // dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['line', 'bar']},
            // restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: titleArr,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            margin: 2
            // data : function(){
            //   var list = []
            //   for (var x in data) {
            //     if (x != '')
            //       list.push(App.formatDate(x))
            //   }
            //   return list
            // }()
          }
        ],
        grid: {
          x: 40,
          x2: 20,
          y2: 100
        },
        yAxis: [
          {
            name: 'Expression',
            type: 'value'
          }
        ],
        series: [
          {
            name: 'expression',
            type: 'bar',
            data: valArr,
            // 设置柱子的宽度
            barWidth: 10,
            // 柱子间距
            barGap: '0',
            barCategoryGap: 0,
            // 配置样式
            itemStyle: {
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  // console.log(typeof (orderArr[params.dataIndex]))
                  // var colorList = ['#ffdd00', '#7f6a9c', '#6aa692', '#fbdad9', '#1280c4', '#d1cbe5', '#96c08e', '#f9a266', '#95d4f5', '#f8bdd7', '#de6c7d', '#a7dacd', '#fccab3', '#a1a8aa']
                  // return colorList[params.dataIndex]
                  let organColor = [
                    {order: '1', color: '#ffdd00'},
                    {order: '2', color: '#7f6a9c'},
                    {order: '3', color: '#6aa692'},
                    {order: '4', color: '#fbdad9'},
                    {order: '5', color: '#1280c4'},
                    {order: '6', color: '#d1cbe5'},
                    {order: '7', color: '#96c08e'},
                    {order: '8', color: '#f9a266'},
                    {order: '9', color: '#95d4f5'},
                    {order: '10', color: '#f8bdd7'},
                    {order: '11', color: '#de6c7d'},
                    {order: '12', color: '#a7dacd'},
                    {order: '13', color: '#fccab3'},
                    {order: '14', color: '#a1a8aa'},
                    {order: '15', color: '#ffcc66'},
                    {order: '16', color: '#336633'},
                    {order: '17', color: '#ff9966'}
                  ]
                  // console.log(organColor.find(t => t.order === orderArr[params.dataIndex]).color)
                  return organColor.find(t => t.order === orderArr[params.dataIndex]).color
                }
              },
              // 鼠标悬停时
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
            // markPoint: {
            //   data: [
            //     {type: 'max', name: '最大值'},
            //     {type: 'min', name: '最小值'}
            //   ]
            // },
            // markLine: {
            //   data: [
            //     {type: 'average', name: '平均值'}
            //   ]
            // }
          }
        ]
      }
      this.profilBarChart.setOption(option)
      this.profilBarChart.on('click', (params) => {
        this.svgData.selectType = params.name
        console.log(params.name)
      })
    },
    isEmpty (val) {
      if (typeof val === 'undefined' || val === null || val === '') {
        return true
      } else {
        return false
      }
    },
    handleGenderType (val) {
      this.svgData.type = val
    },
    ...mapActions([
      'getSearchList',
      'getGoListCount',
      'getGoListData',
      'getTissueDistribution'
    ])
  },
  mounted () {
    // this.initCharts()
  },
  created () {
    if (this.$route.query.searchType === 'uniprotId') {
      this.ajax_Data_general.uniprotId = this.$route.query.keyWords
      this.ajax_Data_general.geneName = ''
    } else {
      this.ajax_Data_general.geneName = this.$route.query.keyWords
      this.ajax_Data_general.uniprotId = ''
    }
    this.getSearchList(this.ajax_Data_general).then((res) => {
      // console.log(res)
      if (!this.isEmpty(res)) {
        // Prediction Result
        this.uniportId = res.uniprotId
        this.predictionResult.proteinType = res.predictionResult
        this.predictionResult.probability = res.predictionResultProb
        this.predictionResult.officialName = res.proteinNames
        this.predictionResult.geneName = res.geneName
        // Domain annotations
        let domainData = res.interProMap
        // console.log(domainData)
        domainData.map(item => {
          // console.log(item)
          for (var i in item) {
            this.domain.domainData.push({
              term: i,
              isSummarized: item[i]
            })
          }
        })
        // console.log(this.domainData)
        // exosome
        this.exosome.entryName = res.entryName
        this.exosome.exome = res.exome
        this.exosome.exomeID = res.exomeID
        // GO annotations and RNA expression
        this.ajax_Data_go.uniprotId = this.ajax_Data_goCount.uniprotId = this.ajax_Data_rna.uniprotId = this.uniportId
        // GO annotations
        this.getGoListCount(this.ajax_Data_goCount).then((res) => {
          this.go.allNum = res
        })
        this.getGoListData(this.ajax_Data_go).then((res) => {
          this.go.goAnnoData = res
        })
        // RNA expression
        this.getTissueDistribution(this.ajax_Data_rna).then((res) => {
          this.initCharts(res)
        })
      } else {
        this.$message({
          showClose: true,
          message: 'no finding',
          center: true,
          type: 'error'
        })
        this.$router.push({path: '/home'})
      }
    })
  }
}
</script>

<style lang="scss">
$font_color: #1b82d1;
$font_color2: #303133;
#app_searchResult {
  .text_item {
    h3 {
      text-align: center;
      color: $font_color;
    }
    .radioGroup {
      float: right;
    }
    .contents {
      .left_title {
        font-weight: 600;
      }
    }
  }
  .el-button--text {
    color: $font_color2;
  }
}
</style>
