<template>
  <div>
    <PopBase
      v-show="isShow"
      :show="isShow"
      :className="'personal'"
      :class="{ op0: currentAgree }"
    >
      <template #header>
        <img
          :src="`${imageUrlRoot}/popup/personal-tit.png`"
          alt="개인정보 입력"
        />
      </template>
      <template #content>
        <PersonalForm
          ref="personal"
          :id="'personal'"
          :key="forceUpdate"
          :eventName="'tarot'"
          :infoAddress="false"
          :phoneCorpAuth="true"
          :imageUrl="`${imageUrlRoot}/popup`"
          :agreement="{
            list: [
              {
                txt: '개인정보 보호를 위한 이용자 동의사항',
                name: 'agree0'
              },
              {
                txt: '개인정보 처리 위탁에 대한 동의',
                name: 'agree1'
              }
            ],
            agreeAll: true,
            checkboxSize: [20, 20, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        >
        </PersonalForm>
      </template>
      <template #footer>
        <div class="btn-group">
          <button
            v-if="!isCompleteSaveUser"
            @click="saveUser()"
            type="button"
            class="btn-big btn__confirm"
          >
            <span class="a11y">개인정보 입력 </span>확인
            <img :src="`${imageUrlRoot}/btn-arrow.png`" alt="" />
          </button>
          <button
            v-else
            @click="setUserInfo()"
            type="button"
            class="btn-big btn-big--deep-purple btn__confirm"
          >
            <span class="a11y">개인정보 입력 </span>이름 풀이 보기
            <img :src="`${imageUrlRoot}/btn-arrow.png`" alt="" />
          </button>
          <p class="auth__notice">
            * 본인인증을 하신 분들은 확인 버튼을 눌러주세요
          </p>
        </div>
      </template>
      <template #closeButton>
        <button
          @click="goEndScene"
          type="button"
          class="popupBtn__close"
        ></button>
      </template>
    </PopBase>
    <AbovePopTerm v-model="currentAgree"></AbovePopTerm>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/tarot/PersonalForm'
import AbovePopTerm from '@/components/tarot/AbovePopTerm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPersonal',
  components: {
    PopBase,
    PersonalForm,
    AbovePopTerm
  },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    cards: { type: Array, default: null },
    serviceList: { type: Array, default: null },
    imageUrlRoot: { type: String, default: '' }
  },
  data() {
    return {
      currentAgree: null,
      isCompleteSaveUser: false,
      alreadyWin: false,
      special: null
    }
  },
  computed: {
    ...mapState({
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    saveUser() {
      const userModel = this.$refs.personal.userModel
      // console.log(userModel)

      if (!userModel.isKmcAuthComplete) {
        alert('먼저 인증 확인을 진행해주세요.')
        return
      }

      let serviceMessage = ''
      const self = this
      if (this.cards[0].relativeService != null)
        this.cards[0].relativeService.forEach(function(rs) {
          serviceMessage =
            serviceMessage +
            '\r\n\r\n[' +
            self.serviceList[rs].title +
            ']\r\n' +
            self.serviceList[rs].link
        })
      if (this.cards[1].relativeService != null) {
        this.cards[1].relativeService.forEach(function(rs) {
          serviceMessage =
            serviceMessage +
            '\r\n\r\n[' +
            self.serviceList[rs].title +
            ']\r\n' +
            self.serviceList[rs].link
        })
      }
      if (serviceMessage === '') {
        serviceMessage =
          '\r\n참, 너의 일상을 바꿔줄 더 많은 것들이 있으니 여기도 한 번 둘러봐\r\n놀러가기: https://www.uplus.co.kr/home/Index.hpi'
      } else {
        serviceMessage =
          '\r\n참, 너의 일상을 바꿔줄 유플러스서비스도 잊으면 안돼' +
          serviceMessage
      }

      const userModelInfo = {
        card1: this.cards[0].name,
        card2: this.cards[1].name,
        serviceMessage,
        firstName: userModel.firstName,
        name: userModel.name,
        phoneCorp: userModel.phoneCorp,
        phoneNo: userModel.phone,
        kmcAuthNum: userModel.kmcAuthNum,
        hasSentKmcAuth: userModel.hasSentKmcAuth,
        isKmcAuthComplete: userModel.isKmcAuthComplete,
        agree0: userModel.agree0,
        agree1: userModel.agree1,
        agree2: userModel.agree2,
        agree3: userModel.agree3,
        agree4: true
      }

      this.$axios
        .post('/api/tarot/user', userModelInfo)
        .then((res) => {
          if (res.data.result) {
            // 유저 정보 저장 완료
            this.isCompleteSaveUser = true
            if (res.data.resultType === 'ALREADY_WIN') this.alreadyWin = true
            if (res.data.special) this.special = res.data.special
          }
        })
        .catch((err) => {
          console.log(err)
          alert(err.response.data.error)
        })
    },
    setUserInfo() {
      this.closePop()
      this.$emit('setUser', {
        name: this.$refs.personal.userModel.firstName,
        alreadyWin: this.alreadyWin,
        special: this.special
      })
      Object.assign(this.$data, this.$options.data())
    },
    goEndScene() {
      let msg = '팝업을 닫으시면 마지막 페이지로 이동 합니다.'
      if (this.cards[1].isWinner) {
        msg = '팝업을 닫으시면 경품을 받으실 수 없습니다.'
      }
      if (!confirm(msg)) return
      this.closePop()
      this.$emit('goEndScene')
    }
  }
}
</script>
