<template>
  <Index :descJson="descJson"></Index>
</template>

<script>
import descJson from '@/assets/js/tarot/description-m.js'
import Index from '@/components/tarot/Index'

export default {
  name: 'Mobile',
  components: { Index },
  data() {
    return { descJson }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/pages/tarot/style-m';
</style>
