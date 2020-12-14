<template>
  <Index ref="main"></Index>
</template>

<script>
import Index from '@/components/new-semester/Index'

import { mapActions } from 'vuex'

export default {
  name: 'NewSemester',
  components: {
    Index
  },
  computed: {
    event1OffsetTop() {
      return this.$refs.main.event1OffsetTop
    }
  },
  async asyncData({ $axios, params, redirect }) {
    let info = `${params.slug}`
    info = info.split('-')
    const user = await $axios
      .$get(`/api/hongyi/movie/play?randomNum=${info[0]}`)
      .catch((res) => {
        // console.log(res)
        redirect('/error')
      })
    const userVideoList = { ...user, index: info[1] }
    return { userVideoList }
  },
  head() {
    return {
      title: '신학기 홍이장군 체험 이벤트',
      meta: [
        // {
        //   property: 'og:title',
        //   content: '홍이장군',
        //   vmid: 'og:title'
        // },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: 'https://event-hongyi.co.kr/share/',
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content: `홍이장군 모델이 된 ${
            this.userVideoList.response[this.userVideoList.index].step01Name
          }의 영상이 도착했어요! 면역력을 달고 사는 우리 아이의 모습, 지금 확인해보세요`,
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content: `${
            this.userVideoList.response[this.userVideoList.index]
              .sharedUrlCopyImageURL
          }`,
          vmid: 'og:image'
        }
      ]
    }
  },
  mounted() {
    if (process.browser) {
      window.onNuxtReady((app) => {
        this.$store.dispatch('newSemester/setSharePages', {
          userVideoList: this.userVideoList,
          popPos: this.event1OffsetTop
        })
      })
    }
  },
  methods: {
    ...mapActions('newSemester', ['setSharePages'])
  }
}
</script>
