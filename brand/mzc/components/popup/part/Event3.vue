<template>
  <div>
    <transition name="PAslideInRight" mode="in-out">
      <section
        v-if="eventStep === 'personal'"
        class="event__con event__personal"
      >
        <h3 class="event__tit">경품 선택 및 개인정보 입력</h3>
        <p class="event__desc">
          원하는 경품을 선택하신 후 경품수령을 위한
          <br />정보를 입력해주세요
        </p>
        <div class="gifts">
          <label
            v-for="(gift, idx) in event3Gifts"
            :key="idx + 1"
            :class="{ '-isActive': event3SelectedGift === gift.value }"
            :for="`gift${idx + 1}`"
            class="gift"
          >
            <input
              :id="`gift${idx + 1}`"
              v-model="event3SelectedGift"
              :value="gift.value"
              type="radio"
              name="gifts"
            />
            <div class="gift__img">
              <img :src="`${imageUrl}/event/event3_opt${idx + 1}.png`" alt />
            </div>
            <p class="gift__name" v-html="gift.name"></p>
          </label>
        </div>
        <PersonalForm
          :id="'event3'"
          ref="childPersonal"
          :type="'default'"
          :is-show="isShow"
          class="event__form"
          :show-agreement="true"
          :agreements="agreements"
          @open-post="eventStep = 'post'"
        ></PersonalForm>
      </section>
    </transition>

    <transition name="PAslideInRight" mode="in-out">
      <section
        v-if="eventStep === 'complete'"
        class="event__con event__complete"
      >
        <h3 class="event__tit">교환완료</h3>
        <p class="event__desc complete__desc">
          응모하신 날을 기준으로 다음 주 수요일에<br />입력하신 휴대폰 번호로
          기프티콘이 발송됩니다.
        </p>
      </section>
    </transition>

    <div class="btnBox">
      <button
        v-if="eventStep === 'personal'"
        type="button"
        @click="initAndClose"
      >
        <span>닫기</span>
      </button>
      <button
        v-if="eventStep === 'personal'"
        id="eventThreeSubmitBtn"
        type="button"
        @click="participateEvent"
      >
        <span>작성 완료</span>
      </button>
      <button
        v-if="eventStep === 'complete'"
        id="eventThreeCompleteBtn"
        type="button"
        @click="initAndClose"
      >
        <span>확인</span>
      </button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'

import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Event3',
  components: { PersonalForm },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    eventData: {
      type: Object,
      default: () => ({
        eventType: 'event1',
        giftType: ''
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
      event3Gifts: [
        {
          name: '편의점 금액권<br />5천 원',
          value: 'CONVENIENCE'
        },
        {
          name: '스타벅스<br />아메리카노',
          value: 'STARBUCKS'
        },
        {
          name: '베스킨라빈스<br />싱글킹',
          value: 'BASKINROBBINS'
        }
      ],
      event3SelectedGift: 'CONVENIENCE',
      agreements: [
        {
          txt:
            '메가존클라우드 주식회사에 개인 정보 제공 및 마케팅 활용에 동의합니다.(선택)',
          link: '/policy04',
          name: 'agree0'
        },
        {
          txt:
            '경품 지급을 위한 제 3자(파트너사)에 개인정보를 제공하는데 동의합니다.',
          link: '/policy03',
          name: 'agree1'
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
      const eventType = 'event3'
      const info = this.$refs.childPersonal.userInfo
      let userInfo = {
        name: info.name,
        phoneNo: info.phoneNo,
        agree1: info.agree0,
        agree2: info.agree1
      }

      if (this.event3SelectedGift === '') {
        this.openAlert({ message: '기프티콘을 선택해 주세요 ' })
        return
      }
      userInfo = {
        ...userInfo,
        eventPrizeType: this.event3SelectedGift
      }

      const response = await this.saveUserEvent({ eventType, userInfo })

      if (response) {
        if (response.result === 'true') {
          this.eventStep = 'complete'
          EventBus.$emit('setEvent3Complete', true)
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
  &__tit,
  &__complete .event__notice {
    color: $green;
  }
  .btnBox {
    button {
      background: $green;
    }
  }
  // &__personal {
  //   .event__notice {
  //     position: absolute;
  //     left: 35px;
  //     bottom: 124px;
  //     text-align: left;
  //     line-height: 24px;
  //   }
  // }
  &__form {
    margin: 30px 5px 0;
  }
}

.gift {
  &s {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 138px;
  height: 144px;
  border: 0.5px solid #333;
  border-radius: 30px;
  padding: 3px 0;
  cursor: pointer;
  &.-isActive {
    border: 4px solid #fff;
    padding: 0;
  }

  &__name {
    margin-bottom: 10px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
  &__img {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
