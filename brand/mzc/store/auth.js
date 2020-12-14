export const state = () => ({
  user: {
    isLogin: false,
    point: 0,
    info: {}
  }
})

export const getters = {
  isExistAdditionalInfo(state) {
    const userInfo = state.user.info
    if (Object.keys(userInfo).length > 1) {
      return Object.values(userInfo).every((el) => {
        return el
      })
    }
    return false
  },
  loginInfo(state) {
    const userInfo = state.user.info
    const info = {}
    for (const key in userInfo) {
      if (key === 'username') {
        info.email = userInfo[key]
      }
      if (key === 'name') {
        info.managerName = userInfo[key]
      }
      if (key === 'phoneNo') {
        info[key] = userInfo[key]
      }
    }

    return info
  }
}

export const actions = {
  // 회원가입 :: 이메일 중복 확인
  checkEmailDuplicate({ dispatch }, email) {
    return this.$Auth
      .checkUniqueId(email)
      .then((res) => {
        dispatch(
          'popup/openAlert',
          { message: '사용 할 수 있는 이메일 입니다.' },
          {
            root: true
          }
        )
        return true
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
        return false
      })
  },

  // 회원가입 :: 기본 정보 가입
  addMember({ dispatch, commit }, userInfo) {
    // console.log(userInfo)
    this.$Auth
      .signUp(userInfo)
      .then((res) => {
        commit('SET_USER_MODEL', { username: userInfo.username })
        dispatch(
          'popup/openAbovePop',
          { name: 'emailSendComplete' },
          { root: true }
        )
        dispatch('popup/openPop', { name: 'login' }, { root: true })

        // console.log(res)
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 회원가입 :: 추가 정보 가입
  addAllInfoMember({ dispatch, commit }, userInfo) {
    this.$Auth
      .signUpWithDetail(userInfo)
      .then((res) => {
        commit('SET_USER_MODEL', { username: userInfo.username })
        dispatch(
          'popup/openAbovePop',
          { name: 'emailSendComplete' },
          { root: true }
        )
        // console.log(res)
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 사전예약 신청
  addAllInfoEarlyBird({ dispatch, commit }, userInfo) {
    this.$Auth
      .signUpEarlyBirdWithDetail(userInfo)
      .then((res) => {
        commit('SET_USER_MODEL', { username: userInfo.username })
        dispatch(
          'popup/openAlert',
          {
            message: '사전 등록이 완료되었습니다.',
            dynamicId: 'earlybird_complete'
          },
          { root: true }
        )
        dispatch('popup/closePop', '', { root: true })
        // console.log(res)
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 로그인
  signIn({ rootState, dispatch, commit }, userInfo) {
    this.$Auth
      .signIn(userInfo)
      .then(async (res) => {
        const status = res.data.status
        const firstLogin = res.data.firstLogin

        switch (status) {
          // C :: 이메일 미인증 유저
          case 'C':
            // 적은 이메일 스토어에 잠시 저장 후
            commit('SET_USER_MODEL', { username: userInfo.username })
            // 이메일 인증 필요 팝업 노출
            dispatch(
              'popup/openAbovePop',
              { name: 'plzCertifyEmail' },
              { root: true }
            )
            break
          // Y :: 이메일 인증 유저 (정상 로그인)
          case 'Y':
            this.$cookies.set('X-AUTH-TOKEN', res.data.accessToken, {
              path: '/',
              maxAge: 60 * 60 * 24 * 7
            })
            localStorage.setItem('X-AUTH-RTOKEN', res.data.refreshToken)

            if (rootState.isVisitThroughLectureUrl) location.reload()
            else {
              dispatch('showNav', false, { root: true })
              await dispatch('getLoginStateValid')
              // NOTE: 로그인 시 재로그인 유저에 한하여 'skip' 버튼 활성 화 위해 cookie 값 set
              if (!firstLogin && !this.$cookies.get('HAS-LOGINED')) {
                this.$cookies.set('HAS-LOGINED', true, {
                  path: '/',
                  maxAge: 60 * 60 * 24 * 7
                })
              }
              // NOTE: 로그인 시 cookie 값 체크하여 세션존 바로 이동
              if (
                this.$cookies.get('HAS-LOGINED') &&
                rootState.currentZone === 'session'
              ) {
                dispatch('gotoZone', ['session', 0, 0], { root: true })
                dispatch('session/toggleNecessaryCategoryListUpdate', true, {
                  root: true
                })
              }
              // NOTE: 이벤트 팝업에서 로그인 시 이벤트 팝업 로그인 유저 기준으로 업데이트
              if (rootState.popup.currentPop.includes('event')) {
                dispatch('toggleNecessaryEventStateUpdate', true, {
                  root: true
                })
              }
              dispatch('popup/closePop', {}, { root: true })
            }
            break
          // P :: 비밀번호 변경 유저
          case 'P':
            dispatch('popup/closePop', '', { root: true })

            dispatch('popup/openPop', { name: 'resetPW' }, { root: true })
            commit('SET_USER_MODEL', {
              username: userInfo.username,
              tempPW: userInfo.password
            })
            break
          default:
            break
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 로그인 유지 체크
  getLoginStateValid({ dispatch }) {
    return this.$Auth
      .getAdditionalInfo()
      .then((res) => {
        if (res.data.result === 'success') {
          dispatch(
            'setLoginValid',
            {
              loginState: true,
              userInfo: res.data.userAdditionalInfo
            },
            { root: true }
          )
        } else {
          dispatch('popup/openPop', { name: 'login' }, { root: true })
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 비밀번호 초기화
  sendResetPW({ dispatch, commit }, email) {
    this.$axios
      .post(`/api/account/email/password`, { username: email })
      .then((res) => {
        // console.log(res)
        // 비밀번호 재설정 팝업 내에서 재전송 클릭 시 이메일 저장 위해 store에 잠시 저장
        commit('SET_USER_MODEL', {
          username: email
        })
        dispatch(
          'popup/openAbovePop',
          { name: 'emailSendComplete_pw' },
          { root: true }
        )
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 비밀번호 재설정
  resetPW({ dispatch }, userInfo) {
    this.$axios
      .post(`/api/account/password`, userInfo)
      .then((res) => {
        if (res.data.result === 'success') {
          dispatch(
            'popup/openAlert',
            {
              message:
                '비밀번호가 변경되었습니다.<br/>변경된 비밀번호로 다시 로그인 해주세요.'
            },
            { root: true }
          )
          dispatch('popup/closePop', '', { root: true })
          dispatch('popup/openPop', { name: 'login' }, { root: true })
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 이메일 재발송 (회원가입 완료 시 )
  resendEmail({ state, dispatch }) {
    this.$axios
      .post('/api/account/email/resend', { username: state.user.info.username })
      .then((res) => {
        // console.log(res)
        dispatch(
          'popup/openAlert',
          { message: '인증메일이 발송되었습니다.' },
          { root: true }
        )
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 추가 정보 입력 :: 정보 가져 오기
  getAdditionalInfo({ dispatch, commit }) {
    this.$Auth
      .getAdditionalInfo()
      .then((res) => {
        // console.log(res)
        const substiring = (obj) => {
          Object.keys(obj).forEach((key) => {
            if (obj[key] === null) obj[key] = ''
          })
          return obj
        }

        const userInfo = substiring(res.data.userAdditionalInfo)
        // userInfo.map((info) => {
        //   console.log(info)
        // })
        commit('SET_USER_MODEL', userInfo)
        dispatch(
          'popup/openPop',
          { name: 'additionalInfo' },
          {
            root: true
          }
        )
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  // 추가 정보 입력 :: 정보 저장
  saveAdditionalInfo(
    { rootState, state, dispatch, commit },
    additinalUserInfo
  ) {
    this.$Auth
      .addDetails(additinalUserInfo)
      .then((res) => {
        const result = res.data.result
        if (result === 'success') {
          // commit('popup/OPEN_Ab', '000포인트가 지급되었습니다.', {
          //   root: true
          // })

          dispatch(
            'popup/openAbovePop',
            {
              name: 'point',
              message: Math.round(res.data.point)
            },
            {
              root: true
            }
          )
          // 이벤트에서 추가 정보 기입 후 이벤트 화면 업데이트
          if (rootState.popup.currentPop.includes('event')) {
            dispatch('toggleNecessaryEventStateUpdate', true, {
              root: true
            })
          }
          dispatch(
            'popup/closePop',
            {},
            {
              root: true
            }
          )

          commit('SET_USER_MODEL', {
            username: state.user.info.username,
            ...additinalUserInfo
          })
        }
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  },

  isOpen({ state, dispatch, commit }) {
    this.$Auth
      .isOpen()
      .then((res) => {
        if (res.data !== null) return res.data
        else return ''
      })
      .catch((err) => {
        dispatch('exception/catchError', err, { root: true })
      })
  }
}

export const mutations = {
  SET_LOGIN_STATE(state, loginState) {
    state.user.isLogin = loginState
  },
  SET_USER_POINT(state, point) {
    state.user.point = point
    // console.log('>>>> 유저 포인트 :: ' + state.user.point)
  },
  SET_USER_MODEL(state, userInfo) {
    // console.log('>>>> 유저 정보 저장 :: ' + userInfo)
    state.user.info = userInfo
  },
  INIT_USER_MODEL(state) {
    state.user.info = {}
  }
}
