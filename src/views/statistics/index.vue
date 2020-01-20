<template>
  <el-row id="app_statistics">
    <Breadcrumb></Breadcrumb>
    <el-row class="contents mt20">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">1</div></div>
            Data source for constructing the standard dataset
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            <h3><span class="mr10">1.1</span> Dataset</h3>
            <p>
              <span>The standard dataset (<span @click="handleDownload(2)" class="fontColor pointer">Dataset of ECMPride.xlsx</span>) used to build ECMPride consists of the positive dataset and the negative dataset, which are introduced separately below.</span>
            </p>
            <h3><span class="mr10">1.2</span> Positive dataset</h3>
            <p>
              <span>Genes in <a href="http://matrisomeproject.mit.edu/other-resources/human-matrisome/" target="_blank">Matrisome</a> with further credible evidence were selected to form the positive dataset. The credible evidence is mainly that these genes are detected in healthy tissues of people. To this end, we firstly selected genes in <a href="http://matrisomeproject.mit.edu/ecm-atlas/" target="_blank">ECMatlas</a> which derived from healthy tissues and added them to the positive dataset. Afterwards, we collected more ECM proteomic studies in healthy tissues (especially tissues not included in ECMatlas, such as bone and teeth) and obtained the corresponding ECM lists (Information of collected studies are listed in <span @click="handleDownload(3)" class="fontColor pointer">Information of ECM proteomic studies.xlsx</span>), genes in these lists that coincide with Matrisome were also added to the positive dataset.</span>
            </p>
            <p>
              <span>For Matrisome genes not detected in healthy tissues, we believe those that are detected in disease tissues or in core Matrisome also very likely to be true ECM components. Therefore, we firstly collected these genes (the method collecting Matrisome genes detected in disease tissues is the same as above), and then mined the <a href="http://amigo.geneontology.org/amigo/landing" target="_blank">GO</a> annotations of them. Genes containing annotation of “extracellular matrix” were considered to be true ECM and were eventually added to the positive dataset. Finally, we converted ECM genes to SwissProt IDs via <a href="https://www.uniprot.org/" target="_blank">UniProt</a> and obtained 521 ECM proteins to form the positive dataset.</span>
            </p>
            <p>
              <span>The figure below (Fig. 1) shows the number of genes in the positive dataset in each Matrisome category (<span @click="handleDownload(4)" class="fontColor pointer">Positive dataset coverage of the Matrisome.xlsx</span>).</span>
            </p>
            <img src="/static/statistics/01.png" alt="">
            <p>
              <span class="fontWeight">Fig. 1: Positive dataset coverage of the Matrisome. </span>
              <span>Bar chart represents, for each Matrisome category, the percentage representation and number of ECM genes included in the positive dataset.</span>
            </p>
            <h3><span class="mr10">1.3</span> Negative dataset</h3>
            <p>
              <span>Thul <span class="fontItalic">et al.</span> divided human protein-coding genes into three types: intracellular genes, membrane-spanning genes, and secreted genes, <a href="https://www.proteinatlas.org/" target="_blank">in the Human Protein Atlas</a>. On the basis of the above classification, the intracellular genes proposed by Thul et al. were first collected as non-ECM candidate genes. Second, we screened genes that overlap with Matrisome in non-ECM candidate genes and removed them from the list of non-ECM candidate genes to form the list of non-ECM genes. Finally, we converted non-ECM genes to SwissProt IDs via <a href="https://www.uniprot.org/" target="_blank">UniProt</a> and obtained 11,336 non-ECM proteins to form the negative dataset.</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">2</div></div>
            About ECMPride
          </template>
          <div>
            <p>
              <span>ECMPride is a flexible and scalable tool developed for predicting extracellular matrix (ECM) proteins. ECMPride can directly perform ECM prediction by taking UniProt IDs in CSV (*.csv) file format as input. The core of ECMPride was written in R 3.6.1 language on the <a href="https://rstudio.com/products/rstudio/download/" target="_blank">RStudio 1.1.442</a> under Windows System. The function in ECMPride are based on <a href="https://www.r-project.org/" target="_blank">R statistical environment</a>.</span>
            </p>
            <p>
              <span>ECMPride is available and freely downloaded from the public repository GitHub:</span>
            </p>
            <p>
              <span><a href="https://github.com/Binghui-Liu/ECMPride.git." target="_blank">https://github.com/Binghui-Liu/ECMPride.git</a>.</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">3</div></div>
            About ECMPrideDB
          </template>
          <div>
            <p>
              <span>We applied <a href="https://github.com/Binghui-Liu/ECMPride.git." target="_blank">ECMPride</a> to all human entries in the SwissProt database. The proteins included in the positive dataset and those with a probability of being ECM higher than 0.7 are both considered as putative human ECM proteins, of which the dataset composed is called ECMPrideDB.</span>
            </p>
            <p>
              <span>We compared ECMPrideDB with Matrisome, as well as two experimental datasets generated from the ECM-related biological samples (<a href="https://www.sciencedirect.com/science/article/pii/S1874391918300848" target="_blank">Åhrman et al. 2018</a>; <a href="https://pubs.acs.org/doi/abs/10.1021/acs.jproteome.7b00191" target="_blank">Naba et al. 2017</a>). ECMPrideDB contains a total of 1510 putative ECM proteins (1494 genes), and we use the gene name for comparison with other datasets. As shown in the figure below (Fig. 2): overall, ECMPrideDB has about 2/3 coverage of Matrisome (Fig. 2A (The first venn)). Specifically, ECMPrideDB covers more than 92% of the core ECMs and more than 61% of the associated ECMs in Matrisome (Fig. 2A (The second venn)). In addition, 779 novel ECM components are found in ECMPrideDB. For both proteomic datasets, most of the identified proteins that overlap with Matrisome are also contained in ECMPrideDB, and considerable numbers of novel ECMs (96 and 127, respectively, Fig. 2B and Fig. 2C) are found in ECMPrideDB (The data of Fig.2 can be found in <span @click="handleDownload(5)" class="fontColor pointer">Comparison of ECMPrideDB with Matrisome and other experimental datasets.xlsx</span>).</span>
            </p>
            <img src="/static/statistics/02.png" alt="">
            <p>
              <span class="fontWeight">Fig. 2: Comparison of ECMPrideDB with Matrisome and other experimental datasets.</span>
            </p>
          </div>
        </el-collapse-item>
      </el-collapse>
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
export default {
  data () {
    return {
      activeNames: ['1', '2', '3'],
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
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="scss">
$font-color: #0071bc;
#app_statistics {
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
  .contents {
    a {
      color: $font-color;
    }
  }
}
</style>
