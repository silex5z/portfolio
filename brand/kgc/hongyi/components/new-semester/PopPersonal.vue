<template>
  <div>
    <PopBase
      v-show="isShow"
      :show="isShow"
      :className="'personal'"
      :imageUrl="imageUrl"
      class="popup__personal"
    >
      <template #header>
        <h1>
          <img
            :src="`${imageUrl}/tit-personal.jpg`"
            alt="영상 조회 및 경품 배송을 위한 연락처 입력"
          />
        </h1>
      </template>
      <template #content>
        <PersonalForm
          ref="childPersonal"
          :id="'personal'"
          :key="forceUpdate"
          :eventName="$store.state.newSemester.eventName"
          :phoneCorpAuth="true"
          :phoneCorpAuthApi="{
            check: '/api/kmc/new/authenticate',
            save: '/api/kmc/new/save'
          }"
          :agreement="{
            type: 'img',
            list: [
              {
                txt: '개인 정보 수집 및 이용에 대한 동의',
                img: 'txt-personal-agree0.png',
                name: 'agree0'
              },
              {
                txt: '개인정보 처리 위탁에 대한 동의',
                img: 'txt-personal-agree1.png',
                name: 'agree1'
              }
            ],
            agreeAll: true,
            checkboxSize: [30, 30, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        >
        </PersonalForm>
      </template>
      <template #footer>
        <div class="btnBox">
          <button
            @click="openNextPop()"
            :data-gtm-category="
              activeEventName == 'movie' ? 'EVENT 01' : 'MAIN'
            "
            :data-gtm-action="
              activeEventName == 'movie' ? '정보 입력_확인' : '참여완료'
            "
            :data-gtm-label="activeEventName == 'movie' ? '' : '키트'"
            type="button"
            class="popupBtn popupBtn--full popupBtn__confirm"
          >
            확인
          </button>
        </div>
      </template>
    </PopBase>

    <AbovePopAgreement v-model="currentAgree"></AbovePopAgreement>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'

import AbovePopAgreement from '@/components/new-semester/AbovePopAgreement'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopPersonal',
  components: { PopBase, PersonalForm, AbovePopAgreement },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    // 이벤트 구분짓기 위해 추가
    // kit || movie
    activeEventName: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      currentAgree: null
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate,
      userModel: (state) => state.newSemester.userModel,
      userEventType: (state) => state.newSemester.userState.eventType
    })
  },
  updated() {
    if (this.isShow) {
      this.$refs.childPersonal.userModel.name = this.userModel.name
      this.$refs.childPersonal.userModel.phone = this.userModel.phoneNum
      $('#personalInfoName').attr('readonly', true)
      $('#personalInfoPhone').attr('readonly', true)
    } else {
      $('#personalInfoName').attr('readonly', false)
      $('#personalInfoPhone').attr('readonly', false)
    }

    $('.popupBtn__zipcode').attr(
      'data-gtm-category',
      this.activeEventName === 'movie' ? 'EVENT 01' : 'MAIN'
    )
    $('.popupBtn__zipcode').attr('data-gtm-action', '주소 검색')
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    ...mapActions('newSemester', ['saveUserModelKit']),
    ...mapMutations('newSemester', ['SET_USER_MODEL']),
    openNextPop() {
      // validate
      if (!this.$refs.childPersonal.userModel.isKmcAuthComplete) {
        alert('인증을 완료 후 참여해주세요.')
        return
      }
      if (this.$refs.childPersonal.userModel.addressDetail === '') {
        alert('정확한 주소를 확인하시고 다시 입력해주세요')
        return
      }
      if (!this.$refs.childPersonal.agreeAll) {
        alert('필수 동의사항을 확인해주세요')
        return
      }

      this.SET_USER_MODEL({
        addressDetail: this.$refs.childPersonal.userModel.addressDetail
      })

      this.userEventType === 'kit'
        ? this.saveUserModelKit()
        : this.openPop({ popName: 'make' })
      // if (this.hasHistory) {
      //   this.setPopAlertParam('phone-reduplication')
      //   this.openPop({ popName: 'alert' })
      // } else {
      //   this.openPop({ popName: 'chooseStep' })
      // }
    }
  }
}
</script>
