<template>
  <PopBase
    v-show="isShow"
    :type="'alert'"
    :show="isShow"
    :class-name="'above'"
    :class="[{ event: isRelatedEvent }]"
    :close-on-click-mask="showPopName !== 'retryLoginBySessionZone'"
    :animation="'fade'"
    :mask="showPopName !== 'point'"
    :data-above-type="showPopName === 'point' ? 'point' : ''"
  >
    <template #contents>
      <!-- 인증 메일  -->
      <template
        v-if="
          showPopName === 'emailSendComplete' ||
            showPopName === 'plzCertifyEmail'
        "
      >
        <div class="popup__content">
          <h3 v-if="showPopName === 'emailSendComplete'" class="tit">
            인증 메일 전송 완료
          </h3>
          <h3 v-if="showPopName === 'plzCertifyEmail'" class="tit">
            인증 완료 후 로그인이 가능합니다
          </h3>
          <p class="desc">
            <em>{{ email }}</em> 으로 인증 메일이 발송되었습니다. <br />이메일
            인증을 완료하신 후 로그인해주세요
          </p>
          <dl>
            <dt>인증 메일을 받지 못하셨나요?</dt>
            <dd>
              <button
                :id="
                  showPopName === 'emailSendComplete'
                    ? 'emailSendComplete'
                    : 'plzCertifyEmail'
                "
                class="btn btn--small btn__sendAuthMail"
                type="button"
                @click="resendEmail"
              >
                <span>인증 메일 재전송</span>
              </button>
            </dd>
          </dl>
        </div>
        <div class="btnBox">
          <button type="button" @click="closeAbovePop">
            <span>확인</span>
          </button>
        </div>
      </template>

      <!-- 비밀번호 재설정 -->
      <template v-if="showPopName === 'sendResetPW'">
        <div class="popup__content">
          <h3 class="tit">비밀번호 재설정</h3>
          <p class="desc">
            비밀번호를 잊으셨나요 ?
            <br />멤버십 등록 이메일을 입력하시면 <br />임시 비밀번호를
            발송해드립니다.
          </p>
          <div class="infoBox">
            <form>
              <input
                v-model="passwordEmail"
                type="text"
                placeholder="이메일을 입력해주세요."
                required
              />
            </form>
          </div>
        </div>
        <div class="btnBox">
          <button
            id="changePasswordCompleteBtn"
            type="button"
            @click="sendResetPW(passwordEmail)"
          >
            <span>확인</span>
          </button>
        </div>
      </template>

      <!-- 임시 비밀번호 발송 완료 -->
      <template v-if="showPopName === 'emailSendComplete_pw'">
        <div class="popup__content">
          <h3 class="tit">임시 비밀번호 발송 완료</h3>
          <p class="desc">
            입력하신 이메일 주소로<br />임시 비밀번호가 발송되었습니다.
            <br />비밀번호를 확인하신 후 로그인해주세요.
          </p>
          <dl>
            <dt>메일을 받지 못하셨나요?</dt>
            <dd>
              <button
                id="changeTempPasswordCompleteBtn"
                class="btn btn--small btn__sendAuthMail"
                type="button"
                @click="resendEmail"
              >
                <span>메일 재전송</span>
              </button>
            </dd>
          </dl>
        </div>
        <div class="btnBox">
          <button type="button" @click="close()">
            <span>확인</span>
          </button>
        </div>
      </template>

      <!--  알림설정 -->
      <template v-if="showPopName === 'alarmSubscription'">
        <div class="popup__content">
          <h3 class="tit">콘텐츠 오픈 알림 신청</h3>
          <p class="desc">
            알림 서비스를 신청하시면
            <br />콘텐츠 오픈에 맞춰 문자 메시지를 전송해드립니다!
          </p>
          <div class="infoBox">
            <form>
              <input
                v-model="phoneNo"
                type="tel"
                placeholder="' - ' 없이 휴대폰 번호를 입력해주세요"
                required
                maxlength="11"
              />
            </form>
          </div>
        </div>
        <div class="btnBox">
          <button type="button" @click="closeAbovePop">
            <span>닫기</span>
          </button>
          <button
            :id="`alarmBtn_${message}`"
            type="button"
            @click="
              alarmSubscription({
                category: message,
                phoneNo: phoneNo
              })
            "
          >
            <span>신청하기</span>
          </button>
        </div>
      </template>

      <!-- 포인트 -->
      <template v-if="showPopName === 'point'">
        <div class="pointBox">
          <!-- <svg
            viewBox="-159 -159 318 318"
            class="circle"
            @animationend="animationEnd($event)"
          > -->
          <svg viewBox="-159 -159 318 318" class="circle">
            <circle
              r="158"
              stroke="#fff"
              stroke-width="1"
              stroke-linecap="square"
              fill="transparent"
              transform="rotate(-90)"
            />
          </svg>
          <div class="pointIcon">
            <Icon :name="'plus'" :size="20"></Icon> POINT
          </div>
          <span class="point">{{ message | currency }}</span>
          포인트 지급완료
        </div>
      </template>

      <template v-if="showPopName === 'survey'">
        <div class="popup__content">
          <div>설문조사 리스트 띄우기</div>
        </div>
        <div class="btnBox">
          <button type="button" @click="close()">
            <span>확인</span>
          </button>
        </div>
      </template>

      <template v-if="showPopName === 'retryLoginBySessionZone'">
        <div class="popup__content">
          <p class="desc">
            로그인 후 세션 영상 시청이 가능합니다.<br />회사 이메일만 입력하면
            등록 완료!
          </p>
        </div>
        <div class="btnBox">
          <button type="button" @click="close('login')">
            <span>LOGIN</span>
          </button>
        </div>
      </template>
    </template>
  </PopBase>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Icon from '@/components/ui/Icon'
import PopBase from '@/components/shared/PopBase'

export default {
  name: 'AbovePop',
  components: { Icon, PopBase },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      email: '',
      phoneNo: '',
      passwordEmail: ''
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      showPopName: (state) => state.popup.abovePop.name,
      message: (state) => state.popup.abovePop.message,
      stateUserInfo: (state) => state.auth.user.info
    }),
    isRelatedEvent() {
      return this.showPopName.includes('event')
    }
  },
  watch: {
    isShow(isShow) {
      if (isShow) {
        this.email = this.stateUserInfo.username
        this.phoneNo = this.stateUserInfo.phoneNo
      }
    },
    showPopName(newName, oldName) {
      if (newName === 'point') {
        setTimeout(() => {
          this.closeAbovePop()
          // 추가 정보 입력 팝업에서만 alert 메세지 띄우는 처리
          if (this.currentPop.includes('additionalInfo'))
            this.openAlert({ message: '추가 정보 입력이 완료되었습니다.' })
        }, 2500)
      }
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closeAbovePop', 'openAlert']),
    ...mapActions('auth', ['resendEmail', 'sendResetPW']),
    ...mapActions('session', ['alarmSubscription']),
    close(popName) {
      this.closeAbovePop()
      if (popName) this.openPop({ name: popName, isOverlap: true })
    },
    animationEnd(event) {
      setTimeout(() => {
        this.closeAbovePop()
        // 추가 정보 입력 팝업에서만 alert 메세지 띄우는 처리
        if (this.currentPop.includes('additionalInfo'))
          this.openAlert({ message: '추가 정보 입력이 완료되었습니다.' })
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.popup {
  &__above:not([data-above-type='point']) {
    .popup__inner {
      background: #fff;
      border: 2px solid #fff;
      border-radius: 30px;
      overflow: hidden;
    }
    .popup__content {
      padding: 40px;

      color: #555;
      min-height: 200px;

      display: flex;
      flex-direction: column;
      .btnBox {
      }
    }
  }
  &[data-above-type='point'] {
    .popup__inner {
      height: 400px;
      padding: 20px 0;
    }
  }
  // alert 팝업 예외처리
  &[data-above-type='retryLoginBySessionZone'],
  &[data-above-type='alarmSubscription'] {
    .popup__mask {
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>

<style lang="scss" scoped>
.tit {
  font-size: 28px;
  font-weight: $font-bold;
  color: #000;
  padding: 5px 0 12px;
}
.desc {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  font-size: 20px;
  font-weight: $font-light;
  line-height: 28px;

  em {
    font-weight: $font-bold;
    font-size: 22px;
    color: $pointBlueGreen1;
  }
}
dl {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  dt {
    font-size: 16px;
  }
  dd {
  }
}

.infoBox {
  width: 400px;
  height: 34px;
  margin: 15px auto 0;
  background: #eee;
  @include breakpoint() {
    input[type='text'],
    input[type='tel'] {
      width: 130%;
    }
  }
  input {
    font-size: 16px;
    text-align: center;
    line-height: 34px;
    color: #555;
  }
}

.btn__sendAuthMail {
  color: #555;
  font-weight: $font-bold;
  margin-left: 10px;
}
.btnBox {
  display: flex;
  height: 60px;
  background: #000;
  margin-top: auto;
  button {
    width: 100%;
    height: 100%;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #fff;
    }
    &:nth-child(2n) {
      border-left: 0.2px solid #999;
      span {
        color: $pointBlueGreen2;
      }
    }
  }
}

// 포인트
.pointBox {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 297px;
  height: 297px;
  background: #fff;
  border-radius: 50%;
  border: 3px solid $pointBlueGreen1;
  margin: 8px auto;
  color: #000;
  font-size: 20px;
  // padding: 8px;
  .circle {
    position: absolute;
    top: -12px;
    left: -12px;
    width: 316px;
    height: 316px;
    stroke-dasharray: 993;
    stroke-dashoffset: 993;
    animation: dash 2s linear forwards;
  }
  .pointIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    background: $pointBlueGreen1;
    border-radius: 30px;
    color: #fff;
    font-weight: $font-bold;
    img {
      width: 18px;
      margin-right: 3px;
    }
  }
  .point {
    display: block;
    font-size: 46px;
    font-weight: $font-bold;
    margin: 12px 0;
    color: $pointBlueGreen1;
  }
}
</style>
