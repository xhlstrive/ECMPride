<template>
<el-row id="app_svgDeal">
  <svg-icon :icon-class="svgData.type" :customStyle="customStyle" class="svg1"/>
  <!-- <div role="tooltip" id="el-tooltip-6482" aria-hidden="true" class="el-tooltip__popper is-dark" style="transform-origin: center bottom 0px; z-index: 2102;position: absolute;top: 5px;left: 60px;">
    Top Center 提示文字
    <div x-arrow="" class="popper__arrow" style="left: 59px;border-color: #303133 transparent transparent transparent;border-width: 10px;top: 30px;"></div>
  </div> -->
</el-row>
</template>

<script>
import svgIcon from 'components/svgIcons'// svg component
export default {
  name: 'app_svgDeal',
  components: {
    svgIcon
  },
  data () {
    return {
      customStyle: {
        width: '250px',
        height: '550px',
        cursor: 'pointer'
      }
    }
  },
  props: {
    svgData: {
      type: Object,
      default () {
        return {
          type: '',
          selectType: ''
        }
      }
    }
  },
  computed: {
  },
  methods: {
    clearAddColor () {
      // 去掉其它组织的选中状态-去掉addColor
      if (document.querySelector(`.addColor`) != null) {
        // console.log(document.querySelector(`.addColor`))
      }
      let allDom = document.querySelectorAll(`.svgColor2`)
      for (let i in allDom) {
        let classList = allDom[i].classList
        for (let j in classList) {
          if (classList[j] === 'addColor') {
            allDom[i].classList.remove('addColor')
          }
        }
      }
    },
    clearBrainAddColor () {
      // 去掉脑的选中状态-去掉addColor
      if (document.querySelector(`.UBERON_0000956`).classList != null) {
        if (document.querySelector(`.UBERON_0000956`).classList.length >= 3) {
          document.querySelector(`.UBERON_0000956`).classList.remove('addColor')
        }
      }
    }
  },
  mounted () {
    // this.initCharts()
  },
  watch: {
    'svgData.selectType': function (v) {
      console.log(this.svgData.type)
      // 将组织名中的空格转化为下划线
      var idFormater = v.replace(/\ /g, '_')
      // 去掉其它组织的选中状态-去掉addColor
      this.clearAddColor()
      if (this.svgData.type === 'man') {
        // 去掉脑的选中状态-去掉addColor
        this.clearBrainAddColor()
        // 给选中组织添加class-addColor
        if (document.querySelector(`#icon-man_` + idFormater) != null) {
          document.querySelector(`#icon-man_` + idFormater).parentNode.classList.add('addColor')
        }
      } else {
        // 给选中组织添加class-addColor
        if (document.querySelector(`#icon-woman_` + idFormater) != null) {
          document.querySelector(`#icon-woman_` + idFormater).parentNode.classList.add('addColor')
        }
      }
      // document.querySelector(`.svgColor2`).classList.remove('addColor')
      // console.log(document.querySelector(`#icon-man_` + v))
    }
  },
  created () {
    // 去掉其它组织的选中状态-去掉addColor
    this.clearAddColor()
    if (this.svgData.type === 'man') {
      // 去掉脑的选中状态-去掉addColor
      this.clearBrainAddColor()
    }
  }
}
</script>

<style lang="scss">
#app_svgDeal {
}
</style>
