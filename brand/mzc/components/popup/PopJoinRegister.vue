<template>
  <PopBase v-show="isShow" :show="isShow" :class-name="'join'" :width="540">
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">사전 등록 신청</h2>
      </header>
      <div class="popup__content">
        <PersonalFormRegister
          :id="'join'"
          ref="childPersonal"
          :key="forceUpdate"
          :show-agreement-agree-all="true"
          :show-additional-info="showAdditionalInfo"
          :show-agreement="true"
        >
        </PersonalFormRegister>
        <p class="popup__notice">
          &middot;&nbsp; 기프티콘 경품 수령을 위해 정확한 휴대폰 번호를
          입력해주세요.
          <br />
          &middot;&nbsp; 개인정보 오기입으로 인한 경품 미수령의 경우 재발송되지
          않습니다.
        </p>
        <button
          :class="[
            'btn',
            'btn__join',
            'btn--white',
            $device.isMobile ? 'btn--long ' : 'btn--big '
          ]"
          type="button"
          @click="join"
        >
          <span id="earlybird_register_complete">등록 완료</span>
        </button>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalFormRegister from '@/components/shared/PersonalForm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopJoinRegister',
  components: { PopBase, PersonalFormRegister },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      showAdditionalInfo: true
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.imageUrlRoot}`,
      forceUpdate: (state) => state.popup.forceUpdate
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
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapActions('auth', ['addMember', 'addAllInfoEarlyBird']),

    join() {
      const userInfo = {
        username: this.$refs.childPersonal.userInfo.email,
        password: this.$refs.childPersonal.userInfo.pw,
        confirmPassword: this.$refs.childPersonal.userInfo.pwConfirm,
        isExistUsername: this.$refs.childPersonal.userInfo.isExistUsername,
        agree1: this.$refs.childPersonal.userInfo.agree0,
        agree2: this.$refs.childPersonal.userInfo.agree1,
        agree3: this.$refs.childPersonal.userInfo.agree2,
        agree4: this.$refs.childPersonal.userInfo.agree3
      }
      const additinalUserInfo = {
        name: this.$refs.childPersonal.userInfo.name,
        phoneNo: this.$refs.childPersonal.userInfo.phoneNo,
        companyName: this.$refs.childPersonal.userInfo.companyName,
        jobGrade: this.$refs.childPersonal.userInfo.jobGrade
      }

      this.addAllInfoEarlyBird({ ...userInfo, ...additinalUserInfo })
    }
  }
}
</script>

<style lang="scss">
.popup.popup {
  &__join {
    .popup__dialog {
      .popup__inner {
        @include breakpoint('pc') {
          margin: 0 20px;
          max-height: 90vh;
        }

        .additionalInfo.-isActive {
          @include breakpoint() {
            margin: 0;
          }
          @include breakpoint('pc') {
            margin: 0 0 30px 0;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.additionalNotice {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #333;
  border-radius: 30px;
  transition: top 0.5s ease;

  @include breakpoint() {
    width: 100%;
    height: 210px;
    top: 402px;
    &.-isActive {
      top: 383px;
    }
  }
  @include breakpoint('pc') {
    width: 500px;
    height: 130px;
    top: 330px;
  }

  &__desc {
    font-weight: $font-light;
    @include breakpoint() {
      font-size: 24px;
      line-height: 36px;
    }
    @include breakpoint('pc') {
      font-size: 18px;
    }

    span {
      color: $pointBlueGreen2;
    }
    em {
      font-weight: initial;
      @include breakpoint() {
        font-size: 26px;
      }
      @include breakpoint('pc') {
        font-size: 20px;
      }
    }
  }

  .btn__showAdditinal {
    margin-top: 20px;

    img {
      width: 14px;
      margin-top: 2px;
      @include breakpoint() {
        margin-left: 10px;
      }
    }
  }
}

.btn__join {
  margin-top: 44px;
}

.popup__notice {
  font-size: 14px;
  text-align: left;
  color: #999;
  padding-top: 37px;
  line-height: 27px;
}
</style>
