<template>
  <Index></Index>
</template>

<script>
import Index from '@/components/new-semester/Index'

export default {
  name: 'NewSemester',
  components: {
    Index
  },
  head() {
    return {
      title: '신학기 홍이장군 체험 이벤트',
      meta: [
        {
          property: 'og:title',
          content: '신학기 홍이장군 체험 이벤트',
          vmid: 'og:title'
        },
        {
          property: 'og:type',
          content: 'website',
          vmid: 'og:type'
        },
        {
          property: 'og:url',
          content: 'https://event-hongyi.co.kr',
          vmid: 'og:url'
        },
        {
          property: 'og:description',
          content:
            '홍이장군 3일 체험키트 100% 증정! 추첨을 통한 본품 증정의 기회까지!',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://hongyi.s3.amazonaws.com/static/new-semester/images/share/default.jpg',
          vmid: 'og:image'
        }
      ]
    }
  }
}
</script>
