export default function({ store, $axios, $cookies }) {
  $axios.onRequest((config) => {
    // 정상 프로세스 진행시 작업 부
    store.dispatch('popup/setLoading', true)
    if (!config.url.includes(store.state.session.cpmInfo.endpoint)) {
      if ($cookies.get('X-AUTH-TOKEN') != null) {
        config.headers.common.Authorization =
          'Bearer ' + $cookies.get('X-AUTH-TOKEN')
      }
    }
  })

  $axios.onResponse((res) => {
    if (res === false) {
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }
    store.dispatch('popup/setLoading', false)

    const point = res.headers.mzc_cp
    if (point) {
      store.commit('auth/SET_USER_POINT', Math.round(point))
    }
  })

  $axios.onError((error) => {
    // 오류 프로세스 핸들링.
    if (error.response) {
      store.dispatch('popup/setLoading', false)
      const code = parseInt(error.response && error.response.status)
      if (code === 403) {
        if (process.browser) {
          const refreshToken = localStorage.getItem('X-AUTH-RTOKEN')
          return getRefreshToken($axios, store, refreshToken, $cookies, error)
        } else if (process.server) {
          store.commit('auth/SET_LOGIN_STATE', false)
          $cookies.remove('X-AUTH-TOKEN')
          store.dispatch('setLoginValid', {})
          return Promise.reject(error)
        }
      }
    } else if (error.request) {
      store.dispatch('popup/openAlert', {
        message: '서버연결이 원활하지 않습니다. 다시 시도하여 주십시오.'
      })
    } else {
    }
  })
}

async function getRefreshToken($axios, store, refreshToken, $cookies, error) {
  await $axios
    .post(
      `api/account/refresh`,
      {},
      {
        headers: { Authorization: 'Bearer ' + refreshToken }
      }
    )
    .then((res) => {
      $cookies.set('X-AUTH-TOKEN', res.data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      error.config.headers.Authorization = 'Bearer ' + res.data.accessToken

      return Promise.resolve($axios(error.config))
    })
    .catch(() => {
      // store.dispatch('setLoginValid', {})
      store.commit('auth/SET_LOGIN_STATE', false)

      if (store.state.nav.isShow) store.dispatch('showNav', false)
      // store.dispatch('popup/openPop', { name: 'login' })
      if (
        store.state.isVisitThroughLectureUrl &&
        store.state.popup.currentPop.includes('lecture')
      ) {
        store.dispatch('popup/openAbovePop', {
          name: 'retryLoginBySessionZone'
        })
      } else {
        store.dispatch('gotoZone', ['intro'])
        store.dispatch('popup/closePop')
        store.dispatch('popup/openAlert', {
          message: '다시 로그인해주시길바랍니다.'
        })
      }

      $cookies.remove('X-AUTH-TOKEN')
      localStorage.removeItem('X-AUTH-RTOKEN')

      return Promise.reject(error)
    })
}
