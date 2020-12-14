export const state = () => ({})

export const actions = {
  kakaoShare({ commit }, meta) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: meta.title,
        description: meta.description,
        imageUrl: meta.image,
        // TODO: 세션영상 다 나오면 영상 교체하고 썸네일 확인 후 업데이트 진행 @mz-youma
        imageWidth: 600,
        imageHeight: 315,
        link: {
          mobileWebUrl: meta.url,
          webUrl: meta.url
        }
      },
      buttons: [
        {
          title: '세미나 바로가기',
          link: {
            webUrl: meta.url,
            mobileWebUrl: meta.url
          }
        }
      ]
    })
  },
  facebookShare({ commit }, meta) {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(meta.url),
      'fbPop',
      'menubar=false, scrollbars=no,width=600px,height=450px'
    )
  },
  saveShare({ dispatch }, type) {
    return this.$Share
      .shareChannel(type)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  }
}

export const mutations = {}
