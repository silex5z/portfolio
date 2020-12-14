<template>
  <div>
    <PopBase
      v-show="isShow"
      :show="isShow"
      :className="'personalReviewProof'"
      class="popup__personal"
    >
      <template #header>
        <h1>
          <img :src="`${imageUrl}/tit-review.jpg`" alt="리뷰 인증하기" />
        </h1>
      </template>
      <template #content>
        <PersonalForm
          ref="childReviewProof"
          :id="'review'"
          :key="forceUpdate"
          :eventName="$store.state.newSemester.eventName"
          :infoAddress="false"
          :infoUrl="true"
          :agreement="{
            type: 'img',
            list: [
              {
                txt: '인스타그램 저작물 이용 동의',
                img: 'txt-personal-agree-review-0.png',
                name: 'review-agree'
              }
            ],
            checkboxSize: [30, 30, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        >
        </PersonalForm>
        <p class="notice">
          <img
            :src="`${imageUrl}/notice-review-proof.png`"
            alt="* 인증하신 리뷰는 홍이장군 이벤트 계정에 리그램될 수 있습니다."
          />
        </p>
      </template>
      <template #footer>
        <div class="btnBox">
          <button
            @click="openNextPop()"
            type="button"
            class="popupBtn popupBtn--full popupBtn__confirm"
            data-gtm-category="EVENT 02"
            data-gtm-action="리뷰_입력"
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

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPersonalReviewProof',
  components: {
    PopBase,
    PersonalForm,
    AbovePopAgreement
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
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
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  updated() {
    if (!this.isShow) {
      // this.resetData()
      $('#reviewInfoUrl').attr(
        'placeholder',
        '예) https://www.instagram.com/hongyi/'
      )
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapActions('newSemester', ['checkUserParticipation']),
    openNextPop() {
      // if (
      //   !this.$refs.childReviewProof.userModel.name ||
      //   !this.$refs.childReviewProof.userModel.phone ||
      //   !this.$refs.childReviewProof.userModel.url
      // ) {
      //   alert('필수 정보를 확인하시고 다시 입력해주세요')
      //   return
      // }
      // if (!this.userModel.phoneNum) {
      //   alert('핸드폰 번호를 입력해주세요.')
      //   return
      // }
      // if (!this.userModel.reviewURL) {
      //   alert('리뷰 url을 입력해주세요.')
      //   return
      // }
      // if (!this.$refs.childReviewProof.agreeAll) {
      //   alert('필수 동의사항을 확인해주세요')
      //   return
      // }

      // 참여정보 확인
      this.checkUserParticipation({
        name: this.$refs.childReviewProof.userModel.name,
        phoneNum: this.$refs.childReviewProof.userModel.phone,
        reviewURL: this.$refs.childReviewProof.userModel.url,
        agree0: this.$refs.childReviewProof.userModel.agree0
      })
    }
  }
}
</script>
