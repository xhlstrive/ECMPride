<template>
  <el-row id="app_userManual">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">1</div></div>
            Introduction
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">2</div></div>
            Get Start
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">3</div></div>
            About Annotations
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">4</div></div>
            About Charts
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
// import {mapActions} from 'vuex'
// import {debounce} from 'utils/index'
export default {
  name: 'app_userManual',
  data () {
    return {
      activeNames: ['1', '2', '3', '4']
    }
  },
  components: {
    Breadcrumb
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
$font-color: #0071bc;
#app_userManual {
  .el-collapse-item__header {
    color: $font-color;
    font-size: 16px;
  }
  .menu-icon {
    display: table-cell;
    // padding-right: 1.25em;
    padding-right: 8px;
    vertical-align: top;
    .menu-number {
      width: 16px;
      height: 16px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      line-height: 16px;
      color: #FFF;
      background: $font-color;
      border: 3px solid #FFF;
      box-shadow: 1px 1px 3px rgba(0,0,0,.4);
      border-radius: 100px;
      text-shadow: 1px 1px 2px rgba(0,0,0,.4);
    }
  }
}
</style>
