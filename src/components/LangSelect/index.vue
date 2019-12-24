<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <span class="international-icon">
        <i class="fa fa-language" aria-hidden="true"></i>
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'language'
    ])
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.setLanguage(lang)
      this.$message({
        message: 'switch language success',
        type: 'success'
      })
    },
    ...mapActions([
      'setLanguage'
    ])
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>
