<template>
  <div>
    <transition name="PAslideInRight" mode="in-out">
      <section v-show="eventStep === 'giftType'" class="event__con">
        <h3 class="event__tit">한정판 콜라보 제품 선택</h3>
        <div class="giftType">
          <h4>제품타입</h4>
          <a class="btn__e2GiftDetail" href="/collaboration" target="_blank"
            >제품 상세 안내</a
          >

          <div class="radioBox">
            <label
              v-for="idx in 2"
              :key="idx"
              :for="`e2GiftType${idx}`"
              class="type"
              :class="{
                '-isActive': e2GiftType === (idx === 1 ? 'mtm' : 'hood')
              }"
            >
              <input
                :id="`e2GiftType${idx}`"
                v-model="e2GiftType"
                :value="idx === 1 ? 'mtm' : 'hood'"
                type="radio"
                name="type"
              />
              <img
                class="gift__img"
                :src="`${imageUrl}/event/e2_0${idx}_pop.png`"
                :alt="idx === 1 ? '강운 - 맨투맨' : '이안 피셔 - 후드티'"
              />
            </label>
          </div>
        </div>
        <div class="giftSize">
          <h4>제품 사이즈</h4>
          <div class="radioBox">
            <label
              v-for="idx in 2"
              :key="idx"
              :for="`e2GiftSize${idx}`"
              class="size"
              :class="{ '-isActive': e2GiftSize === (idx === 1 ? 'm' : 'l') }"
            >
              <input
                :id="`e2GiftSize${idx}`"
                v-model="e2GiftSize"
                :value="idx === 1 ? 'm' : 'l'"
                type="radio"
                name="size"
              />
              {{ idx === 1 ? 'Medium' : 'Large' }}
            </label>
          </div>
        </div>

        <!-- <div class="type">
         
        </div>
        <div class="size">
          <label
            v-for="(gift, idx) in 2"
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
        </div> -->
      </section>
    </transition>
    <transition name="PAslideInRight" mode="in-out">
      <section v-show="eventStep === 'personal'" class="event__con">
        <h3 class="event__tit">개인 정보 입력</h3>
        <p class="event__desc">
          경품 수령을 위한 정보를 입력해주세요
          <br />정보 입력 오기로 인한 오배송은 재발송되지 않으니 <br />정확한
          정보를 입력해주세요
        </p>
        <PersonalForm
          :id="'event2'"
          ref="childPersonal"
          :type="'address'"
          :show-agreement="true"
          :agreements="agreements"
          :user-address="userInfo"
          :is-show="isShow"
          class="event__form"
          @open-post="eventStep = 'post'"
        >
        </PersonalForm>
      </section>
    </transition>

    <transition name="PAslideInRight" mode="in-out">
      <section
        v-show="eventStep === 'complete'"
        class="event__con event__complete"
      >
        <h3 class="event__tit">응모완료</h3>
        <p class="event__desc complete__desc">
          2020. 12. 07 (월) 당첨자 개별 안내
        </p>
        <p class="event__notice">
          * 별도 당첨자 발표 고지없이
          <strong
            >당첨자에게는<br />당첨 안내 문자 메시지가 발송될
            예정입니다.</strong
          >
        </p>
        <a
          class="btn btn--small btn--white btn__moreEvent"
          href="/collaboration?sectionName=event"
          target="_blank"
        >
          <span
            >콜라보 경품 하나 더 받고 싶다면? &nbsp;&nbsp; &nbsp; &nbsp;>
          </span>
        </a>
      </section>
    </transition>

    <transition name="PAslideInRight" mode="in-out">
      <section v-show="eventStep === 'post'" class="event__con">
        <h3 class="event__tit">우편번호 찾기</h3>
        <DaumPostcode
          :on-complete="postComplete"
          :animation="true"
          class="postBox"
        />
      </section>
    </transition>

    <div class="btnBox">
      <!-- step1 -->
      <button
        v-if="eventStep === 'giftType'"
        type="button"
        @click="initAndClose"
      >
        <span>닫기</span>
      </button>
      <button v-if="eventStep === 'giftType'" type="button" @click="checkType">
        <span>다음</span>
      </button>

      <!-- step2 -->
      <button
        v-if="eventStep === 'personal'"
        type="button"
        @click="eventStep = 'giftType'"
      >
        <span>이전</span>
      </button>
      <button
        v-if="eventStep === 'personal'"
        id="eventTwoSubmitBtn"
        type="button"
        @click="participateEvent"
      >
        <span>작성 완료</span>
      </button>

      <!-- post -->
      <button
        v-if="eventStep === 'post'"
        type="button"
        @click="eventStep = 'personal'"
      >
        <span>닫기</span>
      </button>

      <!-- step3 -->
      <button
        v-if="eventStep === 'complete'"
        id="eventTwoCompleteBtn"
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
import DaumPostcode from 'vuejs-daum-postcode'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Event2',
  components: { PersonalForm, DaumPostcode },
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
      eventStep: 'giftType',
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
      ],
      e2GiftType: 'mtm', // mtm || hood
      e2GiftSize: 'm' // m || l
      // givenPoint: 1000000
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      stateUserInfo: (state) => state.auth.user.info,
      forceUpdate: (state) => state.popup.forceUpdate,
      message: (state) => state.popup.abovePop.message,
      confirmState: (state) => state.popup.alert.confirmState,
      resolve: (state) => state.popup.alert.resolve
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
    ...mapActions('popup', ['openPop', 'closePop', 'confirm', 'openAlert']),
    ...mapActions('event', ['saveUserEvent']),
    async checkType() {
      if (
        !(await this.confirm(
          `<em>선택 제품은 이후 변경이 불가합니다.</em><br>제품 타입 : ${
            this.e2GiftType === 'mtm' ? '맨투맨' : '후드'
          } / 사이즈 :  ${
            this.e2GiftSize === 'm' ? 'Medium' : 'Large'
          }<br>선택하신 제품이 맞는지 한번 더 확인해주세요`
        ))
      )
        return

      this.eventStep = 'personal'
    },
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

      // this.$store.commit(
      //   `auth/SET_USER_ADDRESS`,
      //   this.userInfo
      // )

      // this.$emit('complete')
      // ie에서 우편번호 팝업 관련 버그 처리
      // $('#personalAddressDetail')
      //   .first()
      //   .focus()
    },
    async participateEvent() {
      const eventType = 'event2'
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
        eventPrizeType: `${this.e2GiftType}_${this.e2GiftSize}`
      }

      const response = await this.saveUserEvent({ eventType, userInfo })
      if (response) {
        if (response.result === 'true') {
          this.eventStep = 'complete'
          EventBus.$emit('setEvent2Complete', true)
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
    color: $yellow;
  }
  .btnBox {
    button {
      background: $yellow;
    }
  }
}
h4 {
  font-weight: $font-bold;
  text-align: left;
  @include breakpoint() {
    font-size: 22px;
  }
  @include breakpoint('pc') {
    font-size: 18px;
  }
}
.radioBox {
  display: flex;
  justify-content: space-between;
  font-size: 0;
  margin-top: 24px;
  label {
    flex-grow: 1;
    background: #444;
    border-radius: 30px;
    box-sizing: border-box;
    border: 2px solid #444;
    cursor: pointer;

    &.-isActive {
      border: 2px solid #fff;
    }
    &:first-child {
      margin-right: 28px;
    }
  }
}

.giftType {
  position: relative;

  margin-top: 50px;
  .btn__e2GiftDetail {
    position: absolute;
    right: 0;
    @include breakpoint() {
      top: -9px;
    }
    @include breakpoint('pc') {
      top: 0;
    }
  }
  .radioBox {
    @include breakpoint() {
      margin-top: 30px;
    }
    img {
      width: 100%;
    }
  }
}
.giftSize {
  margin-top: 40px;
  label {
    height: 60px;
    font-size: 18px;
    font-weight: $font-bold;
    line-height: 58px;
  }
}

.btn__moreEvent {
  margin: 30px 0 0;
  width: 200px;
  width: 250px;
  padding: 0 10px;
}
</style>
