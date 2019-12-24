<template>
  <el-row id="app_searchResult">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/searchResult' }">searchList</el-breadcrumb-item>
      <el-breadcrumb-item>searchResult</el-breadcrumb-item>
    </el-breadcrumb> -->
    <Breadcrumb></Breadcrumb>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Prediction Result</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <h3 class="mt10">{{uniportId}}</h3>
        <div class="contents">
          <ul>
            <li><span class="left_title">Protein type:</span> ECM</li>
            <li><span class="left_title">Probability:</span> 99.97%</li>
            <li><span class="left_title">Official name:</span> Collagen alpha-1(I) chain</li>
            <li><span class="left_title">Gene name:</span> COL1A1</li>
          </ul>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Domain annotations</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10">
          <ul>
            <li>IPR008160</li>
            <li>IPR000885</li>
            <li>IPR001007</li>
          </ul>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>EXOSOME annotations</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10">
          There are experiment evidence that identified P02452 in exosomes.
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>GO annotations</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt10">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="golink"
              label="GO Link"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="term"
              label="Term"
              width="200"
              sortable>
            </el-table-column>
            <el-table-column
              prop="definition"
              label="Definition">
            </el-table-column>
            <el-table-column
              prop="source"
              label="Ontology source"
              width="150">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            small
            layout="total, prev, pager, next"
            :total="1000"
            class="pagination mb10">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mt20" shadow="hover">
      <div slot="header" class="clearfix">
        <span>RNA expression</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="fa fa-navicon" /></el-button> -->
      </div>
      <div class="text_item">
        <div class="contents mt20">
          <el-row>
            <el-radio-group v-model="radioVal" size="mini" class="radioGroup">
              <el-radio-button label="Organ"></el-radio-button>
              <el-radio-button label="Expression"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="16">
              <div style="width: 100%; height: 500px;" id="myCharts" class="mt10"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <BackToTop :visibility-height="backtoTop.vHeight"></BackToTop>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
import BackToTop from 'components/BackToTop/index'
let echarts = require('echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'app_searchResult',
  components: {
    Breadcrumb,
    BackToTop
  },
  data () {
    return {
      uniportId: 'P02452',
      tableData: [{
        golink: 'GO:0005788',
        term: 'endoplasmic reticulum lumen',
        definition: 'The volume enclosed by the membranes of the endoplasmic reticulum.',
        source: 'Cellular component'
      }, {
        golink: 'GO:0031012',
        term: 'endoplasmic reticulum lumen',
        definition: '',
        source: ''
      }, {
        golink: 'GO:0005576',
        term: 'endoplasmic reticulum lumen',
        definition: '',
        source: ''
      }, {
        golink: 'GO:0005615',
        term: 'endoplasmic reticulum lumen',
        definition: '',
        source: ''
      }, {
        golink: 'GO:0005794',
        term: 'endoplasmic reticulum lumen',
        definition: '',
        source: ''
      }],
      radioVal: 'Organ',
      backtoTop: {
        vHeight: 200
      }
    }
  },
  methods: {
    initCharts () {
      let myCharts = echarts.init(document.querySelector('#myCharts'))
      let option = {
        title: {
          text: 'RNA tissue specificity: Low tissue specificity',
          left: 'center',
          textStyle: {
            lineHeight: 20
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['NX', '降水量'],
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
            data: ['Cerebral cortex', 'Cerebellum', 'Hippocampus', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'nnn', 'ooo', 'ppp'],
            axisLabel: {
              rotate: 60
            }
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
            type: 'value'
          }
        ],
        series: [
          {
            name: 'NX',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7],
            // 设置柱子的宽度
            barWidth: 30,
            // 配置样式
            itemStyle: {
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#ffdd00', '#7f6a9c', '#6aa692', '#fbdad9', '#1280c4', '#d1cbe5', '#96c08e', '#f9a266', '#95d4f5', '#f8bdd7', '#de6c7d', '#a7dacd', '#fccab3', '#a1a8aa']
                  return colorList[params.dataIndex]
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
          // {
          //   name: '降水量',
          //   type: 'bar',
          //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
          //   // markPoint: {
          //   //   data: [
          //   //     {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
          //   //     {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
          //   //   ]
          //   // },
          //   // markLine: {
          //   //   data: [
          //   //     {type: 'average', name: '平均值'}
          //   //   ]
          //   // }
          // }
        ]
      }
      myCharts.setOption(option)
    }
  },
  mounted () {
    this.initCharts()
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
