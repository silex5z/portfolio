<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">설정</h2>
    </div>
    <div class="setting__wrap">
      <SettingNav></SettingNav>
      <div class="setting__con l-form">
        <v-row class="l-form__con ">
          <v-col class="l-form__con--left">
            <h3 class="l-form__tit">비밀번호</h3>
          </v-col>
          <v-col class="l-form__con--right">
            <v-row class="">
              <label class="l-form__label">현재 비밀번호</label>
              <v-text-field
                v-model="password.currentPassword"
                class="l-form__input-text l-input--underlined"
                placeholder="현재 비밀번호를 입력해주세요"
                hide-details="auto"
                type="password"
              ></v-text-field>
            </v-row>
            <v-row class="">
              <label class="l-form__label">새 비밀번호</label>
              <v-text-field
                v-model="password.password"
                class="l-form__input-text l-input--underlined"
                placeholder="새 비밀번호를 입력해주세요"
                hide-details="auto"
                type="password"
              ></v-text-field>
            </v-row>
            <v-row class="">
              <label class="l-form__label">새 비밀번호 확인</label>
              <v-text-field
                v-model="password.newPassword"
                class="l-form__input-text l-input--underlined"
                hide-details="auto"
                placeholder="새 비밀번호를 한번 더 입력해주세요"
                type="password"
              ></v-text-field>
              <p class="l-form__notice">
                *비밀번호는 영문, 숫자, 특수문자 중 최소 2가지를 포함해야
                합니다.
              </p>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="l-form__footer">
          <v-btn
            @click="changePassword"
            depressed
            color="#6493EF"
            medium
            class="btn btn--regular btn__save ml-auto"
          >
            저장
          </v-btn>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
import SettingNav from '@/components/SettingNav'
export default {
  name: 'SettingPassword',
  components: { SettingNav },
  data() {
    return {
      password: {
        currentPassword: '',
        password: '',
        newPassword: ''
      }
    }
  },
  computed: {},
  methods: {
    async changePassword() {
      await this.$loginService
        .saveChangePassword(this.password)
        .then(({ data }) => {
          this.$toast.success('비밀번호가 변경되었습니다.', { duration: 3000 })
          this.password = {
            currentPassword: '',
            password: '',
            newPassword: ''
          }
        })
        .catch((ex) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  &__wrap {
    display: flex;
    justify-content: space-between;
  }
}
.btn__save {
  width: 146px;
  height: 40px;
}

#wrap .l-input--underlined {
  max-width: 260px;
}
</style>
