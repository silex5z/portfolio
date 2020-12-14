<template>
  <div>
    <transition name="PAslideInRight" mode="in-out">
      <section v-show="eventStep === 'personal'" class="event__con">
        <!-- <div class="inner"> -->
        <h3 class="event__tit">개인 정보 입력</h3>
        <p class="event__desc">
          경품 수령을 위한 정보를 입력해주세요
          <br />정보 입력 오기로 인한 오배송은 재발송되지 않으니 <br />정확한
          정보를 입력해주세요
        </p>
        <PersonalForm
          :id="'event1'"
          ref="childPersonal"
          :type="'address'"
          :show-agreement="true"
          :user-address="userInfo"
          :agreements="agreements"
          :is-show="isShow"
          class="event__form"
          @open-post="eventStep = 'post'"
        >
        </PersonalForm>

        <!-- </div> -->
      </section>
    </transition>
    <transition name="PAslideInRight" mode="in-out">
      <section v-show="eventStep === 'post'" class="event__con">
        <!-- <div class="inner"> -->
        <h3 class="event__tit">우편번호 찾기</h3>
        <DaumPostcode
          :on-complete="postComplete"
          :animation="true"
          class="postBox"
        />
        <!-- </div> -->
      </section>
    </transition>
    <transition name="PAslideInRight" mode="in-out">
      <section
        v-show="eventStep === 'complete'"
        class="event__con event__complete"
      >
        <!-- <div class="inner"> -->
        <h3 class="event__tit">응모완료</h3>
        <p class="event__desc complete__desc">
          <em>{{ eventData.giftName }}</em> 경품 응모가 완료되었습니다.
          <br />2020. 12. 07 (월) 당첨자 발표
        </p>
        <p class="event__notice">
          * 당첨자에게는 개별 이메일 및 SMS를 통해<br />경품 수령에 대해
          안내해드립니다.
        </p>
        <!-- </div> -->
      </section>
    </transition>
    <div class="btnBox">
      <button
        v-if="eventStep === 'post'"
        type="button"
        @click="eventStep = 'personal'"
      >
        <span>닫기</span>
      </button>
      <button
        v-if="eventStep === 'personal'"
        type="button"
        @click="initAndClose"
      >
        <span>닫기</span>
      </button>
      <button
        v-if="eventStep === 'personal'"
        id="eventOneSubmitBtn"
        type="button"
        @click="participateEvent"
      >
        <span>작성 완료</span>
      </button>
      <button
        v-if="eventStep === 'complete'"
        id="eventOneCompleteBtn"
        type="button"
        @click="initAndClose"
      >
        <span>확인</span>
      </button>
    </div>
  </div>
</template>

<script>
import PersonalForm from '@/components/shared/PersonalForm'
import DaumPostcode from 'vuejs-daum-postcode'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Event1',
  components: { PersonalForm, DaumPostcode },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    eventData: {
      type: Object,
      default: () => ({
        eventType: 'event1',
        giftType: '',
        giftName: ''
      }),
      required: true
    }
  },
  data() {
    return {
      eventStep: 'personal',
      userInfo: {
        zipcode: '',
        address: ''
      },
      agreements: [
        {
          txt:
            '메가존클라우드 주식회사에 개인 정보 제공 및 마케팅 활용에 동의합니다.(선택)',
          link: '/policy04',
          name: 'agree0'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      stateUserInfo: (state) => state.auth.user.info,
      forceUpdate: (state) => state.popup.forceUpdate,
      message: (state) => state.popup.abovePop.message
    })
  },
  watch: {
    isShow(isShow) {
      if (!isShow) {
        this.resetData()
      }
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop', 'openAlert']),
    ...mapActions('event', ['saveUserEvent']),
    postComplete(data) {
      let fullAddress = data.address
      let extraAddress = ''
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname
        }
        if (data.buildingName !== '') {
          extraAddress +=
            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
      }
      this.userInfo.zipcode = data.zonecode
      this.userInfo.address = fullAddress

      this.eventStep = 'personal'
    },
    async participateEvent() {
      const eventType = 'event1'
      const info = this.$refs.childPersonal.userInfo
      let userInfo = {
        name: info.name,
        phoneNo: info.phoneNo,
        agree1: info.agree0
      }

      userInfo = {
        ...userInfo,
        address: this.userInfo.address,
        addressDetail: info.addressDetail,
        zipCode: this.userInfo.zipcode,
        eventPrizeType: this.eventData.giftType
      }

      // console.log(userInfo)

      const response = await this.saveUserEvent({ eventType, userInfo })

      if (response) {
        if (response.result === 'true') {
          this.eventStep = 'complete'
        }
      }
    },
    initAndClose() {
      this.resetData()
      this.closePop()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/eventParticipate';

// 이벤트
.event {
  // event1
  &__tit,
  &__complete .event__notice {
    color: $pointBlueGreen2;
  }
  .btnBox {
    button {
      background: $pointBlueGreen2;
    }
  }
}
</style>
