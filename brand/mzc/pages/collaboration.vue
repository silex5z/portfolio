<template>
  <CollaborationCommon
    :query-obj="queryObj"
    :entry-type="'type1'"
  ></CollaborationCommon>
</template>

<script>
import CollaborationCommon from '@/components/CollaborationCommon'

function getQueryStringObject(queryList) {
  const a = queryList.split('&')
  if (a === '') return {}
  const b = {}
  a.forEach((list) => {
    const p = list.split('=', 2)
    if (p.length === 1) b[p[0]] = ''
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
  })
  return b
}

export default {
  name: 'Collaboration',
  components: { CollaborationCommon },
  asyncData(context) {
    // Server-side
    if (process.server) {
      const { req } = context
      const query = req._parsedOriginalUrl.query

      const metaUrl = `${context.$axios.defaults.baseURL}${context.req._parsedOriginalUrl.path}`

      let queryObj
      if (query) {
        queryObj = getQueryStringObject(query)
        // if (queryObj) return { queryObj }
      }

      return { queryObj, metaUrl }
    }
  },
  head() {
    return {
      title: '메가존클라우드 Digital Spectrum',
      meta: [
        {
          name: 'google',
          content: 'notranslate'
        },
        {
          property: 'og:title',
          content: '메가존클라우드 Digital Spectrum',
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
          content: '국내외 유명 아티스트와의 첫번째 콜라보레이션!',
          vmid: 'og:description'
        },
        {
          property: 'og:image',
          content:
            'https://mzc-webinar.s3.amazonaws.com/static/images/sns/collaboration.jpg',
          vmid: 'og:image'
        }
      ]
    }
  }
}
</script>
