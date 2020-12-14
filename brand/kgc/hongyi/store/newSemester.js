// import $axios from 'axios'

export const state = () => ({
  eventName: 'newSemester',
  imageUrlRoot: `https://hongyi.s3.amazonaws.com/static/new-semester/images`,
  popAlertParam: '',
  userModel: {},
  userState: {
    eventType: null,
    history: null,
    fromSharedUrl: false,
    shareId: '',
    videoList: [],
    videoIndex: 0
  }
})

export const actions = {
  // =======================
  // 키트 신청 이벤트 참여
  // =======================
  checkUserModel({ state, commit, dispatch }, eventType) {
    commit('popup/SET_LOADING', true, { root: true })
    this.$axios
      .post(`/api/hongyi/${eventType}/is/${eventType}`, state.userModel)
      .then((res) => {
        const result = res.data.result
        // 사용자 결과 값 state에 저장
        commit('SET_USER_HISTORY', [eventType, result])
        // 키트 참여 유저 체크
        if (eventType === 'kit') {
          // -> Y(영상참여 이력에서 가져와 키트저장 완료)
          if (result === 'Y') {
            commit('SET_POP_ALERT_PARAM', 'kit-complete')
            dispatch('popup/openPop', { popName: 'alert' }, { root: true })
          }
          // -> P(참여 프로세스 진행)
          else if (result === 'P') {
            dispatch('popup/openPop', { popName: 'chooseStep' }, { root: true })
          }
          // -> M(키트 참여이력 존재. 영상 참여X)
          else if (result === 'M') {
            alert(
              '이미 체험 키트를 신청하셨습니다.\n본품 증정 이벤트에도 참여해보세요.'
            )
          }
          // -> N(키트&영상 참여이력 존재)
          else if (result === 'N') {
            alert('이미 체험 키트를 신청하셨습니다.')
          }
        }

        // 영상 참여 유저 체크
        if (eventType === 'movie') {
          // -> Y(참여프로세스 진행 /all/save)
          if (result === 'Y') {
            dispatch('popup/openPop', { popName: 'chooseStep' }, { root: true })
          }
          // -> C(영상&키트 둘다 참여), K(키트 참여이력으로 영상참여 /kit/save)
          // -> M(영상만 참여 /movie/save)
          else if (result === 'C' || result === 'K' || result === 'M') {
            dispatch('popup/openPop', { popName: 'make' }, { root: true })
          }
        }
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },
  saveUserModelKit({ commit, state, dispatch }) {
    commit('popup/SET_LOADING', true, { root: true })
    this.$axios
      .post('/api/hongyi/kit/save/kit', state.userModel)
      .then((res) => {
        commit('SET_POP_ALERT_PARAM', 'kit-complete-not-movie')
        dispatch('popup/openPop', { popName: 'alert' }, { root: true })
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },
  // =======================
  // 영상 이벤트 참여
  // =======================
  // 최초 참여자
  saveUserModelMovie({ state, commit, dispatch }) {
    commit('popup/SET_LOADING', true, { root: true })
    this.$axios
      .post('/api/hongyi/movie/all/save', state.userModel)
      .then((res) => {
        commit('SET_VIDEO_ID', res.data.response)
        commit('SET_POP_ALERT_PARAM', 'waiting-make-movie')
        dispatch('popup/openPop', { popName: 'alert' }, { root: true })
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },
  // 이미지만 저장
  saveImageOnly({ state, commit, dispatch }, eventHistory) {
    commit('popup/SET_LOADING', true, { root: true })
    this.$axios
      .post(
        `/api/hongyi/movie/${eventHistory === 'M' ? 'movie' : 'kit'}/save`,
        state.userModel
      )
      .then((res) => {
        if (eventHistory === 'M') {
          commit('SET_POP_ALERT_PARAM', 'waiting-make-movie')
        } else commit('SET_POP_ALERT_PARAM', 'movie-complete')

        dispatch('popup/openPop', { popName: 'alert' }, { root: true })
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },
  saveApplyKitFromMovie({ state, commit }, boolean) {
    if (boolean === false) {
      commit('SET_POP_ALERT_PARAM', 'movie-complete')
      return
    }
    commit('popup/SET_LOADING', true, { root: true })
    this.$axios
      .post('/api/hongyi/kit/save/movie/kit', state.userModel)
      .then((res) => {
        commit('SET_POP_ALERT_PARAM', 'movie-complete')
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },

  // 리뷰인증 참여 확인
  checkUserParticipation({ dispatch, commit }, userModel) {
    dispatch('popup/setLoading', true, { root: true })
    this.$axios
      .post(`/api/hongyi/review/all/save`, userModel)
      .then((res) => {
        commit('SET_POP_ALERT_PARAM', 'review-proof-compelete')
        dispatch('popup/openPop', { popName: 'alert' }, { root: true })
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },

  // 영상 목록 가져오기
  getVideoList({ commit, dispatch, state }, order) {
    commit('popup/SET_LOADING', true, { root: true })
    if (state.fromSharedUrl) commit('SET_FROM_SHARED_URL', false)
    this.$axios
      .post('/api/hongyi/movie/play', state.userModel)
      .then((res) => {
        commit('SET_VIDEO_ID', res.data.randomNum)
        commit('SET_VIDEO_LIST', res.data.response)

        if (order === 'last')
          commit('SET_VIDEO_INDEX', res.data.response.length)
        else commit('SET_VIDEO_INDEX', 0)

        dispatch('popup/openPop', { popName: 'userVideo' }, { root: true })
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
      .finally(() => {
        commit('popup/SET_LOADING', false, { root: true })
      })
  },

  // 공유 페이지 진입 시 설정
  // fromsharedUrl : true => 공유 링크 진입시
  // fromsharedUrl : false => 영상 확인하기 팝업으로 진입시
  setSharePages({ commit, dispatch }, { userVideoList, popPos }) {
    commit('popup/SET_LOADING', true, { root: true })

    commit('SET_FROM_SHARED_URL', true)
    commit('SET_VIDEO_LIST', userVideoList.response)
    commit('SET_VIDEO_INDEX', userVideoList.index)
    dispatch('popup/openPop', { popName: 'userVideo', popPos }, { root: true })
    commit('popup/SET_LOADING', false, { root: true })
  }
}

export const mutations = {
  SET_POP_ALERT_PARAM(state, param) {
    state.popAlertParam = param
  },
  SET_USER_MODEL(state, userModel) {
    state.userModel = {
      ...state.userModel,
      ...userModel
    }
  },
  SET_USER_HISTORY(state, [eventType, history]) {
    state.userState.eventType = eventType
    state.userState.history = history
  },
  SET_VIDEO_ID(state, id) {
    state.userState.shareId = id
  },
  SET_VIDEO_LIST(state, list) {
    state.userState.videoList = list
  },
  SET_VIDEO_INDEX(state, idx) {
    state.userState.videoIndex = idx
  },
  SET_FROM_SHARED_URL(state, boolean) {
    state.userState.fromSharedUrl = boolean
  },
  INIT_USER_MODEL(state) {
    state.userModel = {}
    state.userState = {
      eventType: null,
      history: null,
      shareId: '',
      fromSharedUrl: false,
      videoList: [],
      videoIndex: 0
    }
  }
}
