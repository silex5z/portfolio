<template>
  <PopBase v-show="isShow" :show="isShow" :class-name="'login'" :width="1000">
    <template #contents>
      <transition name="PAslideInRight2">
        <div v-if="currentPop.includes('login')">
          <header class="popup__header">
            <h2 class="popup__tit uppercase eng">Login</h2>
            <p class="popup__desc">
              로그인 후 메가존클라우드 Digital Spectrum 2020의<br />
              다양한 세션 영상과 이벤트를 확인해보세요!
            </p>
          </header>
          <div class="popup__content">
            <PersonalForm :id="'login'" ref="childPersonal"></PersonalForm>
            <ul class="login__opts">
              <li>
                <p class="login__desc">
                  처음 방문 하셨다면
                  <br v-if="$device.isMobile" />먼저 멤버십 등록을
                  <br v-if="$device.isMobile" />진행해주세요
                </p>
                <!-- <a
            class="btn"
            href="https://accounts.megazone.io/signup"
            target="_blank"
            >멤버십 등록</a
                  >-->
                <button
                  id="loginMembershipRegistrationBtn"
                  type="button"
                  class="btn btn--small"
                  @click="openPop({ name: 'join' })"
                >
                  <span>멤버십 등록</span>
                </button>
              </li>
              <li>
                <p class="login__desc">
                  비밀번호를
                  <br v-if="$device.isMobile" />잊으셨나요?
                </p>
                <button
                  id="loginChangePasswordBtn"
                  type="button"
                  class="btn btn--small"
                  @click="openAbovePop({ name: 'sendResetPW' })"
                >
                  <span>비밀번호 재설정</span>
                </button>
              </li>
            </ul>
            <label
              for="maintainLogin"
              class="checkBox__label checkBox__maintain"
            >
              <input
                id="maintainLogin"
                v-model="maintainLogin"
                type="checkbox"
                name="maintainLogin"
                class="checkBox__input"
              />
              <i class="checkBox__ir">
                <Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon>
              </i>
              로그인 상태 유지
            </label>
            <button
              id="mzcLogin"
              :class="[
                'btn',
                'btn__login',
                'btn--white',
                $device.isMobile ? 'btn--long ' : 'btn--big '
              ]"
              type="button"
              @click="login"
            >
              <span>로그인</span>
            </button>
          </div>
        </div>
      </transition>
      <transition name="PAslideInRight2">
        <!-- 비밀번호 설정 -->
        <div v-if="currentPop.includes('resetPW')">
          <header class="popup__header">
            <h2 class="popup__tit">비밀번호 재설정</h2>
            <p class="popup__desc">새로운 비밀번호로 변경해주세요</p>
          </header>
          <div class="popup__content">
            <PersonalForm :id="'resetPW'" ref="childPersonalPW"></PersonalForm>
            <button
              id="changePasswordInit"
              :class="[
                'btn',
                'btn--white',
                'btn__login',
                $device.isMobile ? 'btn--long ' : 'btn--big '
              ]"
              type="button"
              @click="btnResetPW()"
            >
              <span>비밀번호 변경</span>
            </button>
          </div>
        </div>
      </transition>
    </template>

    <template #content></template>
  </PopBase>
</template>

<script>
import Icon from '@/components/ui/Icon'

import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopLogin',
  components: { Icon, PopBase, PersonalForm },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return { currentAgree: null, maintainLogin: false, afterEnter: false }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      currentPop: (state) => state.popup.currentPop,
      stateUserInfo: (state) => state.auth.user.info
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'openAbovePop']),
    ...mapActions('auth', ['signIn', 'resetPW']),
    login() {
      const userInfo = {
        username: this.$refs.childPersonal.userInfo.email,
        password: this.$refs.childPersonal.userInfo.pw,
        loginStatus: this.maintainLogin
      }

      this.signIn(userInfo)
    },
    btnResetPW() {
      const userInfo = {
        username: this.stateUserInfo.username,
        currentPassword: this.stateUserInfo.tempPW,
        password: this.$refs.childPersonalPW.userInfo.pw,
        confirmPassword: this.$refs.childPersonalPW.userInfo.pwConfirm
      }

      this.resetPW(userInfo)
    }

    // stretch(args, done) {
    //   // console.log('test')
    //   // console.log(el)
    //   // console.log(done)
    //   args[0] === el
    //   args[1] === done()
    // }
  }
}
</script>

<style lang="scss">
.popup__login {
  .popup__inner {
    position: relative;
    font-size: 0;
    @include breakpoint() {
      // width: 100%;
      // height: inherit;
      // padding: calc(var(--vh) / 2) 40px;
      // overflow-x: hidden;
    }
    @include breakpoint('pc') {
      width: 500px;
      height: var(--vh);
      margin: 0 auto;
    }
    & > div {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      @include breakpoint() {
        left: 40px;
        width: 560px;
        max-height: calc(
          var(--vh) * 0.8
        ); // tablet 에서 view 때문에 넣음 어떻게 할지 고려 필요
      }
      @include breakpoint('pc') {
        width: 100%;
        left: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.login {
  &__opts {
    @include breakpoint() {
      display: flex;
      justify-content: space-between;
      margin-top: 34px;
    }
    @include breakpoint('pc') {
      margin-top: 24px;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: $font-light;

      @include breakpoint() {
        display: inline-flex;
        flex-basis: 275px;
        flex-direction: column;
        padding: 30px 0 20px;
        border: 1px solid #333;
        border-radius: 30px;
        height: 200px;
        font-size: 22px;
      }
    }
  }
  &__desc {
    line-height: 26px;
  }
}

.checkBox__maintain {
  display: inline-flex;
  flex-grow: 0;
  margin-top: 34px;
}
.btn__login {
  display: block;
  @include breakpoint() {
    margin: 44px auto 0;
  }
  @include breakpoint('pc') {
    margin: 24px auto 0;
  }
}
</style>
