<template>
  <div>
    <nuxt :class="`wrap__${isMobile ? 'm' : 'pc'}`" class="wrap" />
  </div>
</template>

<script>
import cssVars from 'css-vars-ponyfill'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      isMobile: this.$device.isMobile
    }
  },
  head() {
    return {
      meta: [
        {
          name: 'viewport',
          content: this.$device.isMobile
            ? 'width=640, target-densitydpi=device-dpi'
            : this.$device.isTablet
            ? 'width=1600, target-densitydpi=device-dpi'
            : 'width=device-width, initial-scale=1'
        }
      ]
    }
  },
  created() {
    if (process.browser) {
      this.setViewportHeight()
    }
  },
  mounted() {
    if (this.$device.isMobileOrTablet) {
      window.addEventListener('resize', (e) => {
        this.setViewportHeight()
      })
    }
    window.addEventListener('load', () => {
      this.setViewportHeight()
    })
  },
  methods: {
    setViewportHeight() {
      const screenHeight = this.$device.isMobileOrTablet
        ? window.document.documentElement.clientHeight + 'px'
        : '100vh'
      console.log(screenHeight)
      cssVars({
        variables: {
          '--device': this.$device.isMobileOrTablet ? 'mo' : 'pc',
          '--vh': screenHeight
          //   '--vhIe': window.document.documentElement.clientHeight * -1 + 'px',
          //   '--vhIeD': window.document.documentElement.clientHeight * -2 + 'px',
          //   '--vhIeT': window.document.documentElement.clientHeight * -3 + 'px',
          //   '--vhIeQ': window.document.documentElement.clientHeight * -4 + 'px'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
html,
body {
  background: #201c20;
}
</style>
