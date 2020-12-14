<template>
  <div>
    <Index
      :isDirectStoreList="isDirectStoreList"
      @sendEvent="toggleIsDirectStoreList"
    />
  </div>
</template>

<script>
import Index from '@/components/kit/Index'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Kit',
  components: { Index },
  asyncData({ req, store }) {
    if (process.server) {
      const query = req._parsedOriginalUrl.query

      if (query === 'storeList') {
        store.commit('popup/OPEN_POP', { popName: 'store' })
        return { isDirectStoreList: true }
      }
    }
  },
  head() {
    return {
      title: '동인비 1899 싱글 에센스',
      meta: [
        {
          property: 'og:title',
          content: '동인비 1899 싱글 에센스',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: 'https://singleessence.event-donginbi.co.kr',
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: '정관장 홍삼, 단 하나로 어린 빛 맑은 피부를 깨우다.',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://donginbi.s3.amazonaws.com/static/singleessence/images/shared/600x315.jpg',
          vmid: 'og:image'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.kit.imageUrlRoot}/${this.deviceKind}`
      },
      currentPop: (state) => state.popup.currentPop,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading']),
    toggleIsDirectStoreList(boolean) {
      this.isDirectStoreList = boolean
    }
  }
}
</script>
