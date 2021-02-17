<template>
  <div>
    <nuxt :class="`wrap__${isDesktop ? 'pc' : 'm'}`" class="wrap" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      isDesktop: this.$device.isDesktop
    }
  },
  head() {
    if (this.$route.query.pc === 'Y') return
    return {
      meta: [
        {
          name: 'viewport',
          content: this.isDesktop
            ? 'width=device-width, initial-scale=1'
            : 'width=device-width, initial-scale=1, user-scalable=no, target-densitydpi=device-dpi'
        }
      ]
    }
  }
}
</script>
