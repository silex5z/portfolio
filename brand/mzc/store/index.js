// * ==========================================
// store 목적 : ui 관련 제어
// * ==========================================

export const state = () => ({
  isVisitThroughLectureUrl: false,
  urlRoot: `https://mzc-webinar.s3.amazonaws.com/static`,
  imageUrlRoot: `https://mzc-webinar.s3.amazonaws.com/static/images`,
  // mzcPass: false,
  nav: {
    isShow: false,
    activeName: ''
  },
  currentZone: null,
  mzcZone: {
    sceneIdx: 0
  },
  sessionZone: {
    categoryName: '',
    categoryIdx: null,
    sceneIdx: 0
  },
  isNecessaryUpdateEvent: false,
  isDesktop: ''
})

export const actions = {
  showNav({ commit }, param) {
    commit('TOGGLE_NAV', param)
    if (process.browser) {
      if (typeof param === 'string') {
        const vid = document.querySelector('.video--full')
        if (vid) vid.pause()
      }
    }
  },

  // => 로그인 여부 및 유저 정보 set
  setLoginValid(
    { state, dispatch, commit },
    { loginState = false, userInfo = null }
  ) {
    commit('auth/SET_LOGIN_STATE', loginState, { root: true })
    if (userInfo) commit('auth/SET_USER_MODEL', userInfo, { root: true })
  },

  gotoLecture({ dispatch, commit }, [videoId, categoryIdx]) {
    commit('SET_VISIT_THROUGH_LECTURE_URL')
    dispatch('gotoZone', ['session', 2, categoryIdx])
    dispatch('session/setVideoId', videoId, { root: true })
    dispatch('popup/openPop', { name: 'lecture' }, { root: true })
  },

  gotoZone({ dispatch, commit }, [zoneName, sceneIdx, categoryIdx = null]) {
    // => zoneName : 'intro' ||  'mzc' || 'session'
    commit('SET_CURRENT_ZONE', zoneName)

    if (zoneName === 'mzc') {
      commit('SET_MZCZONE_SCENE_IDX', sceneIdx) // => mzc sceneIdx 0 to 10
      return
    }

    if (sceneIdx !== null) dispatch('setSessionScene', sceneIdx) // => 'session' 일때만 사용 sceneIdx 0 to 2 (화면 전환용)
    if (categoryIdx !== null) dispatch('setSessionCategory', categoryIdx) // => session categoryIdx 0 to 3
  },

  setSessionScene({ commit }, sceneIdx) {
    commit('SET_SESSION_SCENE_IDX', sceneIdx)
  },
  setSessionCategory({ commit }, categoryIdx) {
    commit('SET_SESSION_CATEGORY_IDX', categoryIdx)
  },
  toggleNecessaryEventStateUpdate({ commit }, boolean) {
    commit('TOGGLE_EVENT_STATE_UPDATE', boolean)
  }
}

export const mutations = {
  TOGGLE_NAV(state, param) {
    if (typeof param === 'string') {
      state.nav = {
        isShow: true,
        activeName: param
      }
      return
    }
    state.nav.isShow = false
    // setTimeout(() => {
    //   // 네비게이션 닫힐 때 마크업 초기화 노출 막기 위해 setTimeout 처리
    //   state.nav.activeName = ''
    // }, 200)
  },
  SET_VISIT_THROUGH_LECTURE_URL(state) {
    state.isVisitThroughLectureUrl = true
  },
  SET_CURRENT_ZONE(state, zoneName) {
    state.currentZone = zoneName
    // console.log('현재존...... ' + state.currentZone)
  },
  SET_MZCZONE_SCENE_IDX(state, sceneIdx) {
    // console.log('store 에서의 ...' + sceneIdx)
    state.mzcZone.sceneIdx = sceneIdx
    // console.log(sceneIdx)
  },
  SET_SESSION_SCENE_IDX(state, sceneIdx) {
    state.sessionZone.sceneIdx = sceneIdx
    // console.log('store 에서의 ...' + state.sessionZone.sceneIdx)
  },
  SET_SESSION_CATEGORY_IDX(state, category) {
    // console.log('store 에서의 ...' + sceneIdx)
    // console.log('SET_SESSION_CATEGORY_IDX ////////// ' + category)
    let categoryIdx
    if (typeof category === 'string') {
      switch (category) {
        case 'INFRASTRUCTURE':
          categoryIdx = 0
          break
        case 'PLATFORM':
          categoryIdx = 1
          break
        case 'APPLICATION':
          categoryIdx = 2
          break
        case 'DATA':
          categoryIdx = 3
          break
      }
    } else {
      categoryIdx = category
    }
    // console.log(categoryIdx)
    // state.sessionZone.categoryName = category.toLowerCase()
    state.sessionZone.categoryIdx = categoryIdx
  },
  SET_DEVICE(state, boolean) {
    state.isDesktop = boolean
  },
  TOGGLE_EVENT_STATE_UPDATE(state, boolean) {
    state.isNecessaryUpdateEvent = boolean
  }
}
