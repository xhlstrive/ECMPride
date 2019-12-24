<template>
  <div id="app_contacts">
    <Breadcrumb></Breadcrumb>
    <el-card shadow="never" class="mt20">
      <el-row>
        <!-- <el-col :span="5">
          <img src="static/contacts.png" alt="" width="200" />
        </el-col> -->
        <el-col :span="14">
          <h4></h4>
          <ul class="info">
            <li><span><i class="el-icon-location-information mr20 iconColor" />Address：</span></li>
            <li><span><i class="el-icon-phone-outline mr20 iconColor" />Tel：</span></li>
            <li><span><i class="el-icon-message mr20 iconColor" />Email：</span></li>
            <li><span><i class="fa fa-fax mr20 iconColor" />Fax：</span></li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
export default {
  data () {
    return {
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
$min_color: #1b82d1;
#app_contacts {
  .info {
    font-size: 18px;
    .iconColor {
      color: $min_color;
    }
  }
}
</style>
