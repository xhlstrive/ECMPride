<template>
  <el-row id="app_downloads">
    <Breadcrumb></Breadcrumb>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
import { mapActions } from 'vuex'
export default {
  name: 'app_downloads',
  data () {
    return {
    }
  },
  components: {
    Breadcrumb
  },
  created () {
  },
  methods: {
    ...mapActions([
      'getGrouplist',
      'getGroupdetail'
    ])
  }
}
</script>

<style lang="scss">
$float_right: right;
#app_downloads {
}
</style>
