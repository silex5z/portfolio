<template>
  <v-card :width="328" :height="440" class="login__card">
    <div class="login__header">
      <h1 class="login__header__tit">
        <img src="@/assets/images/opgg-logo.svg" alt="" />
      </h1>
      <h2 class="login__header__stit">이스포츠 분석 서비스</h2>
    </div>
    <div class="login__text">
      <h3 class="login__text__tit">비밀번호 변경</h3>
      <p>
        비밀번호는 영문, 숫자, 특수문자 중<br />
        최소 2가지를 포함해야 합니다.
      </p>
    </div>
    <v-form ref="form" class="login__form">
      <v-text-field
        v-model="resetUserInfo.password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        :placeholder="'새 비밀번호'"
        :counter="20"
        hide-details
        required
      ></v-text-field>
      <v-text-field
        v-model="resetUserInfo.newPassword"
        :append-icon="passwordConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordConfirmShow ? 'text' : 'password'"
        @click:append="passwordConfirmShow = !passwordConfirmShow"
        :placeholder="'비밀번호 확인'"
        :counter="20"
        class="v-input--last"
        hide-details
        required
      ></v-text-field>
      <v-btn
        @click="resetPassword"
        :disabled="!resetUserInfo.password || !resetUserInfo.newPassword"
        class="btn btn--regular"
        depressed
        color="#6493EF"
        >변경하기</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    login: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      resetUserInfo: {
        username: this.login.username,
        currentPassword: this.login.password,
        password: '',
        newPassword: '',
        status: true
      },
      passwordShow: false,
      passwordConfirmShow: false
    }
  },
  mounted() {
    // EventBus.$on('loginInfo', (data) => {
    //   console.log('EVENT BUS')
    //   console.log(data)
    //   if (
    //     data.hasOwnProperty('password') == null ||
    //     data.hasOwnProperty('login') == null
    //   ) {
    //     alert('잘못된 접근입니다.')
    //     this.$router.push({
    //       path: '/login',
    //       name: 'login'
    //     })
    //   } else {
    //     this.resetUserInfo.username = data.usernmae
    //     this.resetUserInfo.currentPassword = data.password
    //   }
    // })
  },
  methods: {
    async resetPassword() {
      await this.$loginService
        .sendInitPassword(this.resetUserInfo)
        .then(({ data }) => {
          this.$toast.success('비밀번호가 변경되었습니다.', { duration: 3000 })
          // this.$router.push('/login')

          this.$emit('updateType', 'login')
        })
        .catch((e) => {
          console.log(e.response)
        })
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.login {
  &__card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 60px 34px;
  }

  &__header {
    &__tit {
      width: 110px;
      img {
        width: 100%;
      }
    }
    &__stit {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: map-get($baseColor, 'gray90');
    }
  }
  &__text {
    margin-top: 28px;
    text-align: center;
    &__tit {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: bold;
      color: map-get($baseColor, 'gray70');
    }
    p {
      font-size: 13px;
      color: map-get($baseColor, 'gray60');
      line-height: 1.3;
      font-weight: 200;
      margin: 0;
    }
  }

  &__form {
    margin-top: 28px;
    width: 100%;
    .v-input {
      border-bottom: 1px solid map-get($baseColor, 'gray30');
      &--is-focused {
        border-bottom: 1px solid map-get($mainColor, 'blue40');
      }
      input {
      }
      &:not(.v-input--last) {
        margin-bottom: 14px;
      }
    }
    .form__mid {
      text-align: right;
      margin: 10px 0 28px;
      .link__password {
        font-size: 12px;
        color: map-get($baseColor, 'gray60');
        line-height: 1;
        img {
          vertical-align: middle;
        }
      }
    }
  }
}

.btn {
  width: 100%;
  &:first-of-type {
    margin-top: 38px;
  }
}
</style>
