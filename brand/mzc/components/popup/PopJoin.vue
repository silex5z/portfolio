<template>
  <PopBase v-show="isShow" :show="isShow" :class-name="'join'" :width="540">
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit eng">Digital Spectrum 2020 Membership</h2>
        <p class="popup__desc">이름과 회사 이메일만 입력하면 등록 완료!</p>
      </header>
      <div class="popup__content">
        <PersonalForm
          :id="'join'"
          ref="childPersonal"
          :key="forceUpdate"
          :show-agreement-agree-all="true"
          :show-additional-info="showAdditionalInfo"
          :show-agreement="true"
        >
          <template #middle>
            <div
              :class="{ '-isActive': showAdditionalInfo }"
              class="additionalNotice"
            >
              <p class="additionalNotice__desc">
                추가 정보를 입력하면
                <br v-if="$device.isMobile" />
                <span> <em>50,000</em> 포인트</span>를 지급해드립니다
              </p>
              <button
                id="mzcMainAdditionalInfo"
                :class="[
                  'btn',
                  'btn__showAdditinal',
                  $device.isMobile ? 'btn--medium' : 'btn--small'
                ]"
                type="button"
                @click="showAdditionalInfo = !showAdditionalInfo"
              >
                <span v-if="showAdditionalInfo">
                  추가 정보 닫기
                  <Icon
                    :name="'minus'"
                    :stroke="'#fff'"
                    :stroke-width="2"
                  ></Icon>
                </span>
                <span v-else>
                  추가 정보 더보기
                  <Icon :name="'plus'" :size="14"></Icon>
                </span>
              </button>
            </div>
          </template>
        </PersonalForm>
        <button
          id="mzcMainMembershipSubmitBtn"
          :class="[
            'btn',
            'btn__join',
            'btn--white',
            $device.isMobile ? 'btn--long ' : 'btn--big '
          ]"
          type="button"
          @click="join"
        >
          <span>멤버십 등록하기</span>
        </button>
      </div>
    </template>
    <template #closeButton>
      <button class="popupBtn__close" @click="openPop({ name: 'login' })">
        <Icon :name="'close'" :stroke="'#fff'" :stroke-width="2"></Icon>
      </button>
    </template>
  </PopBase>
  <!-- <iframe
    src="https://oauth.megazone.io/oauth/authorize?response_type=code&client_id=Satk7RmEXzi20ZI6RNVGQvBTBAhpuf&redirect_uri=http://localhost:3000/api/accounts/callback"
    frameborder="0"
  ></iframe>-->
</template>

<script>
import Icon from '@/components/ui/Icon'
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopJoin',
  components: { Icon, PopBase, PersonalForm },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      showAdditionalInfo: false
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
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
    ...mapActions('auth', ['addMember', 'addAllInfoMember']),

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
        companySido: this.$refs.childPersonal.userInfo.companySido,
        companySigugun: this.$refs.childPersonal.userInfo.companySigugun,
        jobGrade: this.$refs.childPersonal.userInfo.jobGrade,
        job: this.$refs.childPersonal.userInfo.job,
        industry: this.$refs.childPersonal.userInfo.industry
      }

      if (!this.showAdditionalInfo) this.addMember(userInfo)
      else {
        this.addAllInfoMember({ ...userInfo, ...additinalUserInfo })
        this.openPop({ name: 'login', isOverlap: true })
      }
    }
  }
}
</script>

<style lang="scss">
.popup__join .additionalNotice {
  & + .agree__group {
    @include breakpoint() {
      margin-top: 290px;
    }
    @include breakpoint('pc') {
      margin-top: 180px;
    }
  }
  &.-isActive {
    & + .agree__group {
      margin-top: 0px;
    }
  }
}
</style>
<style lang="scss" scoped>
.popup__inner {
  @include breakpoint('pc') {
    max-height: 80vh;
    margin: 0 20px;
  }
}
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
    width: 560px;
    height: 210px;
    top: 626px;
    &.-isActive {
      top: 606px;
    }
  }
  @include breakpoint('pc') {
    width: 500px;
    height: 130px;
    top: 420px;
    left: 20px;
    &.-isActive {
      top: 410px;
    }
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
    @include breakpoint() {
      margin-top: 12px;
    }

    @include breakpoint('pc') {
      margin-top: 20px;
    }

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
</style>
