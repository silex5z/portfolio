<template>
  <div>
    <nuxt :class="`wrap__${isDesktop ? 'pc' : 'm'}`" class="wrap" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return { isDesktop: this.$device.isDesktop }
  },
  head() {
    return {
      meta: [
        {
          name: 'viewport',
          content: this.isDesktop
            ? 'width=device-width, initial-scale=1'
            : 'width=640, user-scalable=no, target-densitydpi=device-dpi'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=9;IE=10;IE=Edge,chrome=1'
        }
      ]
    }
  }
}
</script>
