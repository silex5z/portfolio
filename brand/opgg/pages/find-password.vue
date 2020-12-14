<template>
  <v-card :width="328" :height="440" class="login__card">
    <div class="login__header">
      <h1 class="login__header__tit">
        <img src="@/assets/images/opgg-logo.svg" alt="" />
      </h1>
      <h2 class="login__header__stit">이스포츠 분석 서비스</h2>
    </div>
    <div class="login__text">
      <h3 class="login__text__tit">비밀번호 찾기</h3>
      <p>
        비밀번호를 찾으시려는<br />
        계정의 이메일을 입력해 주세요.
      </p>
    </div>
    <v-form ref="form" class="login__form">
      <v-text-field
        v-model="username"
        :counter="100"
        :placeholder="'이메일'"
        hide-details
        required
      ></v-text-field>

      <v-btn
        @click="sendTemporaryPassword"
        :disabled="!username"
        class="btn btn--regular"
        depressed
        color="#6493EF"
        >비밀번호 재설정 요청</v-btn
      >
      <NuxtLink to="/login" class="btn btn--outline"
        ><span>로그인으로 돌아가기</span></NuxtLink
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'blank',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    async sendTemporaryPassword() {
      await this.$loginService
        .sendTemporaryPassword(this.username)
        .then(({ data }) => {
          if (data.result) {
            this.$toast.success(
              '이메일 발송이 완료되었습니다. 메일을 확인해보세요.',
              { duration: 3000 }
            )
          }

          this.$router.push('/login')
        })
        .catch((e) => {
          console.log(e)
          // this.$toast.error('로그인 실패', { duration: 3000 })
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
    margin: 30px 0 0;
    width: 100%;
    .v-input {
      border-bottom: 1px solid map-get($baseColor, 'gray30');
      &--is-focused {
        border-bottom: 1px solid map-get($mainColor, 'blue40');
      }
      input {
      }
      &:not(.v-input--last) {
        margin-bottom: 36px;
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
    margin-bottom: 10px;
  }
}
</style>
