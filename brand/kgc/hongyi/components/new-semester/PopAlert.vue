<template>
  <PopBase v-show="isShow" :show="isShow" :className="'alert'" :type="'empty'">
    <div v-if="popAlertParam === 'kit-complete'" class="kit-complete">
      <p>
        <img
          :src="`${imageUrl}/txt-kit-complete.jpg`"
          alt="체험 키트 신청이 완료되었어요! 체험 키트는 영상 만들기 이벤트 참여 시 입력하신 주소로 배송됩니다."
        />
      </p>
      <button
        @click="closePop"
        type="button"
        class="popupBtn popupBtn--full popupBtn__confirm"
        data-gtm-category="MAIN"
        data-gtm-action="참여완료"
        data-gtm-label="영상에서 미신청자"
      >
        확인
      </button>
    </div>

    <div v-if="popAlertParam === 'kit-complete-not-movie'">
      <p>
        <img
          :src="`${imageUrl}/txt-kit-complete-not-movie.jpg`"
          alt="체험 키트 신청이 완료되었어요! 홍이장군 본품을 체험할 수 있는 우리 아이 영상 만들기 이벤트도 참여해보세요!"
        />
      </p>
      <button
        @click="closePopAndMoveEvent1()"
        type="button"
        class="popupBtn popupBtn--full popupBtn__participate-movie"
        data-gtm-category="MAIN"
        data-gtm-action="영상 이벤트_참여"
      >
        영상 만들기 이벤트 참여하기
      </button>
    </div>

    <div v-else-if="popAlertParam === 'waiting-make-movie'">
      <p>
        <img
          :src="`${imageUrl}/txt-waiting-make-movie.jpg`"
          alt="영상이 만들어지는 동안 홍이장군 체험 키트를 신청하세요"
        />
      </p>

      <button
        @click="setMovieComplete(true)"
        type="button"
        class="popupBtn popupBtn--half popupBtn__applyKit"
        data-gtm-category="EVENT 01"
        data-gtm-action="참여완료"
        data-gtm-label="영상에서 신청자"
      >
        신청 할래요
      </button>
      <button
        @click="setMovieComplete(false)"
        type="button"
        class="popupBtn popupBtn--half popupBtn__noApplyKit"
        data-gtm-category="EVENT 01"
        data-gtm-action="체험키트_미신청"
      >
        안 할래요
      </button>
    </div>

    <div v-else-if="popAlertParam === 'movie-complete'">
      <p>
        <img
          v-if="isApplyKit === true"
          :src="`${imageUrl}/txt-movie-complete.jpg`"
          alt="드디어 우리 아이의 귀여운 영상이 완성되었어요! * 홍이장군 체험분은 입력하신 배송지로 발송됩니다."
        />
        <img
          v-else
          :src="`${imageUrl}/txt-movie-complete-all-reduplication.jpg`"
          alt="드디어 우리 아이의 귀여운 영상이 완성되었어요!"
        />
      </p>
      <button
        @click="openNextPop()"
        :data-gtm-label="finalHistory"
        type="button"
        class="popupBtn popupBtn--full popupBtn__confirmVideo"
        data-gtm-category="EVENT 01"
        data-gtm-action="영상 제작 완료"
      >
        영상 확인하기
      </button>
    </div>

    <!-- 리뷰 등록 완료 -->
    <div v-else-if="popAlertParam === 'review-proof-compelete'">
      <p>
        <img
          :src="`${imageUrl}/txt-review-proof-compelete.jpg`"
          alt="리뷰 등록이 완료되었습니다. 당첨자 발표 및 배송은 이벤트 페이지를 참고해주세요."
        />
      </p>
      <button
        @click="closePop"
        type="button"
        class="popupBtn popupBtn--full popupBtn__confirm"
        data-gtm-category="EVENT 02"
        data-gtm-action="리뷰_참여완료"
      >
        확인
      </button>
    </div>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopAlert',
  components: { PopBase },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      isApplyKit: false
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`,
      popAlertParam: (state) => state.newSemester.popAlertParam,
      userHistory: (state) => state.newSemester.userState.history
    }),
    finalHistory() {
      let result = ''
      switch (this.userHistory) {
        case 'M':
        case 'Y':
          result = this.isApplyKit === true ? '키트참여' : '키트미참여'
          break
        case 'C':
          result = '중복참여'
          break
        case 'K':
          result = '참여완료'
          break
      }
      return result
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop', 'setLoading']),
    ...mapActions('newSemester', ['saveApplyKitFromMovie', 'getVideoList']),
    ...mapMutations('newSemester', ['SET_POP_ALERT_PARAM']),
    openNextPop() {
      this.getVideoList('last')
    },
    closePopAndMoveEvent1(boolean) {
      this.closePop()
      this.$emit('goSection', '.event1')
    },
    setMovieComplete(boolean) {
      this.isApplyKit = boolean
      this.saveApplyKitFromMovie(boolean)
    }
  }
}
</script>
