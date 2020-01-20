<template>
  <div id="app_expCollaboration">
    <Breadcrumb></Breadcrumb>
    <el-card shadow="hover" style="padding: 10px;" class="mt20">
      <p>
        <span>ECMs in ECMPrideDB are theoretical ECMs predicted by ECMPride. On the one hand, these ECMs can provide guidance for experimental ECM discovery. On the other hand, the authenticity of these ECM molecules also needs experimental verification. Once these molecules have been experimentally verified, we can update the positive data set of ECMPride to make the predictions more accurate and better guide biological experiments, thus forming a virtuous circle.</span>
      </p>
      <p>
        <span>Therefore, we welcome cooperation with any potential ECM experimenter. Whether you already have ECM experimental data or you want to find someone to cooperate with for ECM experimental research, we welcome you to contact us to discuss cooperation matters.</span>
      </p>
      <p>
        <span>If you are interested, please contact us.</span>
      </p>
      <p>
        <span class="fontColor fontItalic"><a :href="mailTo" style="font-weight: 600;">l_binghui@163.com</a></span>
      </p>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb/index'
export default {
  name: 'app_expCollaboration',
  data () {
    return {
      mailTo: 'mailto:l_binghui@163.com'
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

<style>

</style>
