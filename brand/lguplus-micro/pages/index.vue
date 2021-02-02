<template>
  <div>
    <Mo v-if="$device.isMobile"></Mo>
    <Pc v-else></Pc>
  </div>
</template>

<script>
// import { shuffle } from 'lodash'
// import { mapActions, mapState } from 'vuex'
// import hashtag from '@/assets/js/tarot/hashtag.js'

export default {
  name: 'Tarot',
  layout: 'tarot',
  components: {
    Pc: () => import('@/components/tarot/Pc'),
    Mo: () => import('@/components/tarot/Mo')
  },
  data() {
    return {
      isIE: false
    }
  },
  asyncData({ $axios, req }) {
    const metaUrl = `${$axios.defaults.baseURL}${req._parsedOriginalUrl.path}`
    return { metaUrl }
  },
  head() {
    return {
      title: '당신의 일상을 바꿀 시크릿 카드',
      meta: [
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge,chrome=1'
        },
        {
          name: 'google',
          content: 'notranslate'
        },
        {
          property: 'og:title',
          content: '당신의 일상을 바꿀 시크릿 카드',
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
          content:
            '어머 무슨 일이 있었던 거야? 지금 드루와 당신의 고민을 해결해 줄 시크릿 카드를 알려드립니다',
          vmid: 'og:description'
        },
        {
          name: 'description',
          content:
            '어머 무슨 일이 있었던 거야? 지금 드루와 당신의 고민을 해결해 줄 시크릿 카드를 알려드립니다'
        },
        {
          property: 'og:image',
          content:
            'https://lguplus-event.s3.amazonaws.com/static/tarot/share/600X315.jpg',
          vmid: 'og:image'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;500&display=swap'
        }
      ]
    }
  }
}
</script>
