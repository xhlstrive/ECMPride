<template>
  <el-row id="app_downloads">
    <Breadcrumb></Breadcrumb>
    <el-row class="contents mt20">
      <el-card shadow="hover" style="padding: 10px;">
        <ul>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            Theoretical human ECM proteins in ECMPrideDB:
          </li>
          <li class="downFile">
            <span @click="handleDownload(1)" class="pointer"><i class="el-icon-download"></i> Theoretical human ECM proteins in ECMPrideDB.xlsx</span>
          </li>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            The standard dataset used to build ECMPride:
          </li>
          <li class="downFile">
            <span @click="handleDownload(2)" class="pointer"><i class="el-icon-download"></i> Dataset of ECMPride.xlsx</span>
          </li>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            Information of ECM proteomic studies used to generate the positive dataset:
          </li>
          <li class="downFile">
            <span @click="handleDownload(3)" class="pointer"><i class="el-icon-download"></i> Information of ECM proteomic studies.xlsx</span>
          </li>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            Source Code of ECMPride:
          </li>
          <li class="downFile">
            <a href="https://github.com/Binghui-Liu/ECMPride.git" target="_blank"><i class="el-icon-link"></i> Source Code of ECMPride</a>
          </li>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            Positive dataset coverage of the Matrisome:
          </li>
          <li class="downFile">
            <span @click="handleDownload(4)" class="pointer"><i class="el-icon-download"></i> Positive dataset coverage of the Matrisome.xlsx</span>
          </li>
          <li>
            <i class="el-icon-d-arrow-right"></i>
            Comparison of ECMPrideDB with Matrisome and other experimental datasets:
          </li>
          <li class="downFile">
            <span @click="handleDownload(5)" class="pointer"><i class="el-icon-download"></i> Comparison of ECMPrideDB with Matrisome and other experimental datasets.xlsx</span>
          </li>
        </ul>
      </el-card>
    </el-row>
    <form :action="actionApi + url1" method="post" id="downForm1" name="downForm1">
    </form>
    <form :action="actionApi + url2" method="post" id="downForm2" name="downForm2">
    </form>
    <form :action="actionApi + url3" method="post" id="downForm3" name="downForm3">
    </form>
    <form :action="actionApi + url4" method="post" id="downForm4" name="downForm4">
    </form>
    <form :action="actionApi + url5" method="post" id="downForm5" name="downForm5">
    </form>
  </el-row>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
// import { mapActions } from 'vuex'
export default {
  name: 'app_downloads',
  data () {
    return {
      actionApi: process.env.BASE_API,
      url1: '/downloadTheoretical',
      url2: '/downloadECMPride',
      url3: '/downloadStudies',
      url4: '/downloadMatrisome',
      url5: '/downloadComparisonDatasets'
    }
  },
  components: {
    Breadcrumb
  },
  created () {
  },
  methods: {
    handleDownload (val) {
      switch (val) {
        case 1:
          document.getElementById('downForm1').submit()
          break
        case 2:
          document.getElementById('downForm2').submit()
          break
        case 3:
          document.getElementById('downForm3').submit()
          break
        case 4:
          document.getElementById('downForm4').submit()
          break
        case 5:
          document.getElementById('downForm5').submit()
          break
      }
    }
    // ...mapActions([
    // ])
  }
}
</script>

<style lang="scss">
$font-color: #0071bc;
#app_downloads {
  .downFile {
    margin-left: 18px;
    font-weight: 600;
  }
  .contents {
    span, a {
      color: $font-color;
    }
  }
}
</style>
