<template>
  <div id="app_contacts">
    <Breadcrumb></Breadcrumb>
    <el-card shadow="hover" class="mt20">
      <el-row class="contents">
        <!-- <el-col :span="5">
          <img src="static/contacts.png" alt="" width="200" />
        </el-col> -->
        <el-col :span="24">
          <h4></h4>
          <ul class="info">
            <li>
              <span><i class="el-icon-location-information mr20 iconColor" />Address：</span>
              <span>State Key Laboratory of Proteomics, Beijing Proteome Research Center, National Center for Protein Sciences (Beijing), Beijing Institute of Life Omics, Beijing, 102206, China.</span>
            </li>
            <li>
              <span><i class="el-icon-phone-outline mr20 iconColor" />Tel：</span>
              <span>010-61777053</span>
            </li>
            <li>
              <span><i class="el-icon-message mr20 iconColor" />Email：</span>
              <span><a :href="mailTo">l_binghui@163.com</a></span>
            </li>
            <!-- <li>
              <span><i class="fa fa-fax mr20 iconColor" />Fax：</span>
              <span></span>
            </li> -->
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
      mailTo: 'mailto:l_binghui@163.com'
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
  .contents {
    a {
      color: $min_color;
    }
  }
}
</style>
