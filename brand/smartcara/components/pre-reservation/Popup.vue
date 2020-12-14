<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase
      v-show="isShow"
      :show="isShow"
      :className="'personal'"
      :closeOnClickMask="true"
    >
      <!-- 기본틀가지고 있는 팝업 사용 예시 -->
      <template #header>
        스마트카라 사전예약
        <img :src="imageUrl + '/popup-info-header.png'" alt />
      </template>
      <template #content>
        <PersonalForm
          ref="childPersonal"
          :id="'personal'"
          :key="forceUpdate"
          :eventName="$store.state.prereservation.eventName"
          :phoneCorpAuth="false"
          :infoAddress="false"
          :agreement="{
            list: [
              {
                txt: 'SMS수신 여부 동의',
                name: 'agree0',
                img: 'agree0.png'
              },
              {
                txt: '개인 정보 수집 및 이용과 위탁 동의',
                name: 'agree1',
                img: 'agree1.png'
              }
            ],
            checkboxSize: [26, 26, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        ></PersonalForm>
      </template>
      <template #footer>
        <p class="footer__inner">
          <img :src="imageUrl + '/popup-note.png'" alt />
        </p>
        <button @click="saveInfo" class="popupBtn popup__btn--confirm">
          사전예약 신청 완료
        </button>
      </template>

      <!-- 닫기버튼 custom 사용 예시 -->
      <template #closeButton>
        <button
          @click="closePop"
          type="button"
          class="popupBtn popup__btn--close"
        >
          닫기
        </button>
      </template>
    </PopBase>
    <AbovePop v-model="currentAgree"></AbovePop>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/pre-reservation/PersonalForm'
import AbovePop from '@/components/pre-reservation/AbovePop'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Popup',
  components: { PopBase, PersonalForm, AbovePop },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return { currentAgree: null }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.prereservation.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    saveInfo() {
      const userData = {
        agree: `${this.$refs.childPersonal.userModel.agree0}`,
        agree2: `${this.$refs.childPersonal.userModel.agree1}`,
        mobile: `${this.$refs.childPersonal.userModel.phone}`,
        name: `${this.$refs.childPersonal.userModel.name}`,
        color: `${this.$refs.childPersonal.userModel.color}`,
        user: `-`
      }
      this.$axios
        .post('/api/reservation', userData)
        .then((res) => {
          if (res.data.success === false) {
            alert(res.data.error)
          } else {
            alert('신청이 완료되었습니다.')
            this.closePop()
          }
        })
        .catch((err) => {
          // this.setLoading(false)
          alert(err.response.data.error)
          // alert(err.response.data.errors[0])
          // alert(err.response.data.error)
          // alert(err.response.data.errors[0].defaultMessage)
          /* setTimeout(function() {
            $('#personal-phone').focus()
          }, 200) */
        })

      // console.log(`${this.$refs.childPersonal.userModel.agree0}`)
    }
  }
}
</script>
