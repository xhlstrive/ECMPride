<template>
  <el-row id="app_userManual">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">1</div></div>
            Overview
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            ECMPrideDB is the reference database of human extracellular matrix (ECM) predicted by ECMPride.
            It contains a comprehensive list of human ECM components with annotations from InterPro, ExoCarta, GO, and the human protein atlas.
            ECMPrideDB supports the search, download and browsing function of ECM components, and is expected to boost ECM discovery and verification.
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">2</div></div>
            How to search in ECMPrideDB
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            <h3><span class="mr10">2.1</span> Individual search and batch search</h3>
            <p>
              <span>In order to facilitate the different needs of users, we provide two search methods: individual search and batch search. In each search method, users can choose to search by UniProt ID or Gene name.</span>
            </p>
            <h4><span class="mr10">2.1.1</span> Individual search</h4>
            <img src="/static/userManual/01.png" alt="Individual search">
            <p>
              <span>ECMPrideDB assumes that you search by UniProt ID by default. Of course, you can also search by Gene name. At this time, you need to click the button on the far left of the search bar to inform ECMPrideDB of the ID type you have entered.</span>
            </p>
            <img src="/static/userManual/02.png" alt="Individual search">
            <p>
              <span>ECMPrideDB supports fuzzy search. After you enter 3 or more characters, it will automatically associate and present all IDs containing the entered characters.  You can select the ID you want to search for, and then click the button on the far right of the search bar to search.</span>
            </p>
            <h4><span class="mr10">2.1.2</span> Batch search</h4>
            <p>
              <span>Batch search also supports search by UniProt ID or Gene Name, and you need to choose the search type before upload related files. There are some requirements for uploaded files:</span>
            </p>
            <p>
              <ul>
                <li>1)  They must be *.txt files;</li>
                <li>2)  IDs in uploaded files must be separated by carriage return;</li>
                <li>3)  The size of files does not exceed 500 kb.</li>
              </ul>
            </p>
            <p>
              <span>Click the "Upload" button to upload files locally, then click the "Search" button to start the batch search.</span>
            </p>
            <img src="/static/userManual/03.png" alt="">
            <h3><span class="mr10">2.2</span> Molecule report page</h3>
            <p>
              <span>In individual search, click the search button to go directly to the molecular report page. In batch search, after clicking the search button, a brief list of successfully matched molecules will first appear. Click the UniProt ID of the molecule of interest in the list to enter the report page of this molecule.</span>
            </p>
            <img src="/static/userManual/04.png" alt="">
            <p>
              <span>The molecule report page consists of 5 sections: Prediction result, Domain annotations, Exosome annotations, GO annotations, and RNA expression.</span>
            </p>
            <p>
              <span>Prediction result section presents basic information such as the protein name and gene name of the molecule, and indicates whether the molecule is ECM or non-ECM and the corresponding probability.</span>
            </p>
            <p>
              <span>Domain annotations section lists domains that the molecule contains. Naba et al. proposed a set of diagnostic domains for ECM (ECM-specific domains). We compared each domain with ECM-specific domains. The blue font indicates that the domain belongs to ECM Specific domains, reversed in red font. Click on each domain to link to its information page in InterPro.</span>
            </p>
            <p>
              <span>Exosome annotations section extracts information from the ExoCarta database to indicate whether the molecule contains evidence that it is an exosome. Click on the UniProt ID of this section to link to its information page in ExoCarta.</span>
            </p>
            <p>
              <span>GO annotations section lists GO terms that the molecule contains. For each GO term, we present its ontology source, term and definition. Click on each GO term to link to its information page in GO.</span>
            </p>
            <p>
              <span>RNA expression section presents the expression of RNA corresponding to the molecule in different tissues in the form of a bar graph. Click the Organ, Expression, and Alphabetical buttons, respectively, to make the bar chart sorted by organ (from top to bottom), expression (from little to most), and alphabetical order (from front to back). We have drawn a vector illustration of the human body on the left. When you mouse over a tissue on the bar chart, its corresponding position in the human body will turn blue.</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">3</div></div>
            How to browse and download in ECMPrideDB
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            <p>
              <span>Browse page gathers all human proteins and their basic information, and the main function of this page is to help you filter the molecules you want and download them. There are many ways you can filter the molecule you want. First, you can filter target</span>
            </p>
            <img src="/static/userManual/05.png" alt="">
            <p>
              <span>molecules by entering UniProt ID, Protein Name or Gene Name in the corresponding input boxes. The search here is also a fuzzy search, ECMPrideDB will return all results containing the input characters. In addition, you can also filter the molecules you are interested in by setting a range of probabilities. Finally, click the up and down arrows to the right of each column header, and you can sort the column alphabetically or numerically.</span>
            </p>
            <p>
              <span>If you are interested in a certain molecule, you can click the download button at the far right of the molecule's row to download the detailed annotation information of the molecule. If you are interested in a few molecules, you can click on the leftmost box of the molecule’s row to select the molecules one by one, and finally click the batch download button at the bottom left of the page to download the detailed annotation information of these molecules. Of course, if you are interested in all the molecules on this page, you can directly click the leftmost box in the title bar, select all the molecules on this page with one click, and finally click the batch download button at the bottom left of the page to download detailed annotation information of these molecules .</span>
            </p>
          </div>
          <!-- <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div> -->
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">4</div></div>
            About ECMPrideDB
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            <p>
              <span>As introduced in the overview, ECMPrideDB is the reference database of human extracellular matrix (ECM) predicted by ECMPride, so before introducing ECMPrideDB, we first introduce ECMPride.</span>
            </p>
            <p>
              <span>Here we introduce the dataset used to build ECMPride and the download address for ECMPride, where there is a user manual for ECMPride. Then we give the basic statistics of ECMPrideDB and compared ECMPrideDB with Matrisome, as well as two experimental datasets generated from the ECM-related biological samples.</span>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">5</div></div>
            Downloads
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
            <p>
              <span>We provide the following files for download:</span>
            </p>
            <p>
              <ul>
                <li><i class="el-icon-d-arrow-right"></i> Theoretical human ECM proteins in ECMPrideDB</li>
                <li><i class="el-icon-d-arrow-right"></i> The standard dataset used to build ECMPride</li>
                <li><i class="el-icon-d-arrow-right"></i> Information of ECM proteomic studies used to generate the positive dataset</li>
                <li><i class="el-icon-d-arrow-right"></i> Source Code of ECMPride</li>
                <li><i class="el-icon-d-arrow-right"></i> Putative human ECM proteins predicted by ECMPride</li>
                <!-- <li><i class="el-icon-d-arrow-right"></i> Positive dataset coverage of the Matrisome</li> -->
              </ul>
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <div class="menu-icon"><div class="menu-number">6</div></div>
            Experimental collaboration
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <div>
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
          </div>
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
      activeNames: ['1', '2', '3', '4', '5', '6'],
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
