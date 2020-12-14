export default (axios, store) => (url) => {
  return {
    // 세션 오픈 여부 조회
    getIsOpenCategory() {
      return axios.get(`${url}/isopen`)
    },

    // 세션 리스트 조회
    getCategory(category) {
      return axios.get(`${url}?category=${category}`)
    },

    // 세션 영상 가져오기
    getVideo(videoId) {
      return axios.get(`${url}-detail/${videoId}`)
    },

    // 클라우드 플레이어 로드
    loadCloudPlexPlayer(video) {
      const params = {
        headers: {
          authorization: video.cpmInfo.authorization,
          projectId: video.cpmInfo.projectId
        }
      }
      return axios.get(
        `${video.cpmInfo.endpoint}/videos/${video.videoCpmId}`,
        params
      )
    },

    // 영상 트래킹
    trackVideo(videoData) {
      return axios.post(`${url}/watch`, videoData)
    },
    // 영상 시청에 따른 포인트 지급
    givePointVideo(videoData) {
      return axios.post(`${url}/watch/end`, videoData)
    },

    // 관심 목록 조회
    getInterestVideo() {
      return axios.get(`${url}/interest`)
    },

    // 관심 목록 toggle
    toggleInterestVideo(sessionVideoId) {
      return axios.post(`${url}/interest?sessionVideoId=${sessionVideoId}`, {})
    },

    // 알림신청
    alarmSubscription({ category, phoneNo }) {
      return axios.post(
        `${url}/alarm-subscriptions?category=${category}&phoneNo=${phoneNo}`
      )
    }
  }
}
