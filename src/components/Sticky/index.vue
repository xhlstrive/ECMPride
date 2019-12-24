<template>
  <div class="sticky" :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1003
    },
    className: {
      type: String,
      default: 'stickyBody'
    },
    sliderBarState: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: false,
      position: '',
      currentTop: '',
      width: undefined,
      height: undefined,
      child: null,
      stickyHeight: 0
    }
  },
  mounted () {
    console.log(this.$el.getBoundingClientRect().width)
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
  },
  activated () {
    this.handleScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    sticky () {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
    },
    reset () {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
    },
    handleScroll () {
      this.width = this.$el.getBoundingClientRect().width
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop <= this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    }
  },
  watch: {
    $route: function (val) {
      console.log(111111)
      this.reset()
    },
    sliderBarState: function () {
      this.reset()
    }
  }
}
</script>
