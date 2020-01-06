<template>
  <el-row id="app_relatedDatabase">
    <Breadcrumb></Breadcrumb>
    <el-row class="mt20 contents">
      <el-link :underline="false" :href="item.url" target="_blank" v-for="(item, index) in linkList" :key="index">
        <div class="linkOuter" :class="{active:index==isActive}" @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave">
          <span>{{item.title}}</span>
        </div>
      </el-link>
    </el-row>
  </el-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Breadcrumb from 'components/Breadcrumb/index'
console.log(mapActions, mapGetters)
export default {
  name: 'app_relatedDatabase',
  components: {
    Breadcrumb
  },
  data () {
    return {
      linkList: [
        {
          title: 'Matrisome',
          url: 'http://pepchem.org:35088/'
        },
        {
          title: 'MatrixDB',
          url: 'http://matrixdb.univ-lyon1.fr/'
        },
        {
          title: 'ExoCarta',
          url: 'http://exocarta.org/index.html'
        },
        {
          title: 'GO',
          url: 'http://amigo.geneontology.org/amigo/landing'
        },
        {
          title: 'UniProt',
          url: 'https://www.uniprot.org/'
        }
      ],
      isActive: -1
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    // 鼠标移入
    mouseEnter (index) {
      this.isActive = index
    },
    // 鼠标移出
    mouseLeave () {
      this.isActive = null
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
$min_color: #0071bc;/* #1b82d1 */
#app_relatedDatabase {
  .contents {
    a {
      color: $min_color;
      .linkOuter {
        display: block;
        float: left;
        text-align: center;
        align-items: center;
        display: flex;
        overflow: hidden;
        width: 150px;
        height: 40px;
        padding: 5px;
        margin: 25px 22px 25px 2px;
        border: 3px solid $min_color;
        transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        -webkit-transition: all 0.4s;
        span {
          font-size: 16px;
          line-height: 23px;
          margin: auto;
        }
      }
      .active {
        background: $min_color;
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
