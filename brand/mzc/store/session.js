export const state = () => ({
  videoId: null,
  isNecessaryCategoryListUpdate: false,
  categories: [
    {
      name: 'infrastructure',
      desc: '클라우드 이전, 경영 전략, 운영',
      openDate: '11/16',
      gift: '아이패드',
      isOpen: true,
      value: 'IPAD'
    },
    {
      name: 'platform',
      desc: '솔루션 및 비즈니스 운영 플랫폼',
      openDate: '11/16',
      gift: '플레이스테이션',
      isOpen: true,
      value: 'PLAYSTATION'
    },
    {
      name: 'application',
      desc: '엔터프라이즈 지원 서비스',
      openDate: '11/23',
      gift: '애플워치',
      value: 'APPLEWATCH'
    },
    {
      name: 'data',
      desc: '빅데이터 활용 및 신기술 도입',
      openDate: '11/23',
      gift: '다이슨 공기청정기',
      value: 'AIRREFRESHER'
    }
  ],
  cpmInfo: {},
  partnerName: '',
  sortNum: ''
})

export const actions = {
  //* =================================
  // 세션 메인
  //* =================================
  getIsOpenCategory({ dispatch }) {
    return this.$Session
      .getIsOpenCategory()
      .then((res) => {
        return res.data ? res.data.detail : {}
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  getCategory({ dispatch }, category) {
    return this.$Session
      .getCategory(category)
      .then((res) => {
        return res.data ? res.data.detail : false
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 비디오 ID 스토어에 저장
  setVideoId({ commit }, videoId) {
    commit('SET_VIDEO_ID', videoId)
  },

  //* =================================
  // 세션 상세
  //* =================================
  // 세션 상세
  getVideo({ dispatch, commit }, videoId) {
    return this.$Session
      .getVideo(videoId)
      .then((res) => {
        const data = res.data.detail
        // console.log('>>>> [getVideo] 펜타클 디비 세션영상 정보 조회 성공')
        return data.view
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  loadCloudPlexPlayer({ dispatch }, video) {
    // console.log('>>>> [loadCloudPlexPlayer] player load start')
    // console.log(video)
    return this.$Session
      .loadCloudPlexPlayer(video)
      .then((res) => {
        // console.log('>>>> [CALL CPM API] CPM 영상 정보 조회 성공')
        return res.data
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },
  saveTrackVideo({ dispatch, commit }, payload) {
    /* 세션영상 트래킹 저장 (로그인 회원만) */

    return this.$Session
      .trackVideo(payload)
      .then((res) => {
        return res.data.detail
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },
  saveGivePointVideo({ dispatch, commit }, payload) {
    return this.$Session
      .givePointVideo(payload)
      .then((res) => {
        if (res.data.detail.isGivenPoint) {
          dispatch(
            'popup/openAbovePop',
            {
              name: 'point',
              message: res.data.detail.point
            },
            { root: true }
          )
          // session 리스트 업데이트
          dispatch('session/toggleNecessaryCategoryListUpdate', true, {
            root: true
          })
        }
        return res.data.detail
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 카테고리 리스트 재호출 판단 기준
  toggleNecessaryCategoryListUpdate({ commit }, boolean) {
    commit('TOGGLE_CATEGORY_LIST_UPDATE', boolean)
  },

  // 관심 목록 조회
  getInterestVideo({ dispatch }) {
    return this.$Session
      .getInterestVideo()
      .then((res) => {
        // console.log(res.data.list)
        return res.data.detail.list
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 관심 목록 toggle
  saveInterestVideoYN({ dispatch }, sessionVideoId) {
    return this.$Session
      .toggleInterestVideo(sessionVideoId)
      .then((res) => {
        dispatch(
          'popup/openAlert',
          { message: res.data.message },
          { root: true }
        )
        return res.data.detail.status
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 알림신청
  alarmSubscription({ dispatch }, { category, phoneNo }) {
    return this.$Session
      .alarmSubscription({ category, phoneNo })
      .then((res) => {
        dispatch(
          'popup/openAlert',
          { message: res.data.message },
          { root: true }
        )
        if (res.data.result === 'success') {
          dispatch('popup/closeAbovePop', {}, { root: true })
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  setSurveyPartner({ commit }, { partnerName, sortNum }) {
    commit('SET_SURVEY_PARTNER_NAME', { partnerName, sortNum })
  },
  setEventOpenFlag({ commit }, { sessionName = null, isOpenFlag = null }) {
    commit('SET_EVENT_OPEN_FLAG', sessionName, isOpenFlag)
  }
}

export const mutations = {
  // 세션 상세
  SET_VIDEO_ID(state, videoId) {
    state.videoId = videoId
  },
  SET_CPM_INFO(state, cpmInfo) {
    state.cpmInfo = cpmInfo
  },
  TOGGLE_CATEGORY_LIST_UPDATE(state, boolean) {
    state.isNecessaryCategoryListUpdate = boolean
    // console.log(
    //   'isNecessaryCategoryListUpdate :::::: ' +
    //     state.isNecessaryCategoryListUpdate
    // )
  },
  SET_SURVEY_PARTNER_NAME(state, { partnerName, sortNum }) {
    state.partnerName = partnerName
    state.sortNum = sortNum
  },
  SET_EVENT_OPEN_FLAG(state, sessionName, isOpenFlag) {
    state.categories[sessionName].isOpen = isOpenFlag
  }
}
