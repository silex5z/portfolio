export const state = () => ({
  eventName: 'singleEssence',
  imageUrlRoot: `https://donginbi.s3.amazonaws.com/static/singleessence/images`,
  popAlertParam: '',
  deliveryDate: '',
  userSelect: {
    number: null,
    tit: null,
    subTit: ''
  },
  selectList: [
    {
      number: 1,
      tit: '촉촉함',
      subTit: '피부를 하루종일 촉촉하게 만들어',
      gtmStepOne: 'RTB선택_촉촉함',
      gtmStepTwo: 'RTB확인_촉촉함'
    },
    {
      number: 2,
      tit: '투명함',
      subTit: '칙칙한 피부톤을 투명하게 만들어',
      gtmStepOne: 'RTB선택_투명함',
      gtmStepTwo: 'RTB확인_투명함'
    },
    {
      number: 3,
      tit: '매끈함',
      subTit: '피부결을 매끄럽게 정돈하여',
      gtmStepOne: 'RTB선택_매끈함',
      gtmStepTwo: 'RTB확인_매끈함'
    },
    {
      number: 4,
      tit: '피부진정',
      subTit: '자극받은 피부를 순하게 진정시켜',
      gtmStepOne: 'RTB선택_피부진정',
      gtmStepTwo: 'RTB확인_피부진정'
    },
    {
      number: 5,
      tit: '피부장벽',
      subTit: '피부를 건강하게 보호하여',
      gtmStepOne: 'RTB선택_피부장벽',
      gtmStepTwo: 'RTB확인_피부장벽'
    }
  ],
  userModel: {},
  eventStep: 'step1'
})

export const actions = {
  // mutations를 commit으로 호출
  setUserModel({ commit }, userModel) {
    // console.log(userModel)
    commit('SET_USER_MODEL', userModel)
  },
  setUserSelect({ commit }, uerSelect) {
    commit('SET_USER_SELECT', uerSelect)
  },
  sendApiUserModel({ commit, state, dispatch }) {
    commit('popup/SET_LOADING', true, {
      root: true
    })

    this.$axios
      .post('/api/single-essence/post', state.userModel)
      .then((res) => {
        if (res.data.success === false) {
          // alert(res.data.error)
          commit('SET_POP_ALERT_PARAM', 'lose') // 꽝팝업
          dispatch(
            'popup/openPop',
            {
              popName: 'PopAlert'
            },
            {
              root: true
            }
          )
          commit('INIT_USER_MODEL')
        } else {
          commit('SET_DELIVERY_DATE', res.data.deliveryDate)
          commit('SET_POP_ALERT_PARAM', 'win')
          dispatch(
            'popup/openPop',
            {
              popName: 'PopAlert'
            },
            {
              root: true
            }
          )
          commit('INIT_USER_MODEL')
        }
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
      .finally(() => {
        commit('popup/SET_LOADING', false, {
          root: true
        })
      })
  }
}

export const mutations = {
  // state값 변화
  SET_USER_MODEL(state, userModel) {
    state.userModel = {
      ...state.userModel,
      ...userModel
    }
  },
  INIT_USER_MODEL(state) {
    state.userModel = {}
  },
  INIT_EVENT1_RESET(state) {
    state.userSelect = {
      number: null,
      tit: null,
      subTit: ''
    }
  },
  SET_POP_ALERT_PARAM(state, param) {
    state.popAlertParam = param
  },
  SET_USER_SELECT(state, userSelect) {
    state.userSelect = userSelect
    state.userModel.skinTroubleType = userSelect.number
  },
  SET_DELIVERY_DATE(state, date) {
    state.deliveryDate = date
  },
  SET_EVENT_STEP(state, step) {
    state.eventStep = step
  }
}
