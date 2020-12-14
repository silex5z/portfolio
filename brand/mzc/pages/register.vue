<template>
  <div>
    <!-- <p v-if="isMobile">모바일</p>
    <p v-else>PC</p> -->
    <Index :device-kind="deviceKind"></Index>
  </div>
</template>

<script>
import Index from '@/components/register/Index'

export default {
  name: 'Register',
  components: {
    Index
  },
  asyncData(context) {
    // Server-side
    if (process.server) {
      const { $device } = context
      // console.log($device)
      const deviceKind = $device.isDesktop
        ? 'pc'
        : $device.isMobile
        ? 'mo'
        : 'tablet'

      const metaUrl = `${context.$axios.defaults.baseURL}${context.req._parsedOriginalUrl.path}`

      return { deviceKind, metaUrl }
    }
  },
  data() {
    return {}
  },
  created() {
    if (process.server) {
      // console.log(this.isMobile)
    }
  },

  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {})
      // window.Kakao.init('cdd69346886865d3a1db0001f1c07647')
      // console.log(this.deviceKind)
    }
  },
  head() {
    return {
      title: 'DIGITAL SPECTRUM 2020',
      meta: [
        {
          name: 'google',
          content: 'notranslate'
        },
        {
          property: 'og:title',
          content: 'DIGITAL SPECTRUM 2020',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: this.metaUrl,
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: '메가존클라우드의 첫 번째 디지털 세미나에 초대합니다.',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://mzc-webinar.s3.amazonaws.com/static/images/sns/register.jpg',
          vmid: 'og:image'
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
