<template>
  <v-card :width="328" :height="440" class="login__card">
    <div class="login__header">
      <h1 class="login__header__tit">
        <img src="@/assets/images/opgg-logo.svg" alt="" />
      </h1>
      <h2 class="login__header__stit">이스포츠 분석 서비스</h2>
    </div>
    <v-form ref="form" class="login__form">
      <v-text-field
        v-model="login.username"
        :counter="100"
        :placeholder="'아이디'"
        hide-details
        required
      ></v-text-field>

      <v-text-field
        v-model="login.password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        :placeholder="'패스워드'"
        :counter="20"
        class="v-input--last"
        hide-details
        required
      ></v-text-field>

      <div class="form__mid">
        <NuxtLink to="/find-password" class="link__password"
          >비밀번호 찾기
          <img :src="require(`@/assets/images/icon-arrow.svg`)" alt="" />
        </NuxtLink>
      </div>

      <v-btn
        :disabled="!login.username || !login.password"
        @click="validate"
        :loading="loading"
        class="btn btn--full btn__login"
        depressed
        color="#6493EF"
        >로그인</v-btn
      >
      <v-btn
        class="btn btn--full btn--outline"
        depressed
        outlined
        color="#81acff"
        >이용문의</v-btn
      >

      <!--          

          <v-btn @click="reset" color="error" class="mr-4">
            Reset Form
          </v-btn>

          <v-btn @click="resetValidation" color="warning">
            Reset Validation
          </v-btn> -->
    </v-form>
  </v-card>
  <!-- <form>
      <div>
        <label>Username</label>
        <input v-model="login.username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="login.password" type="text" />
      </div>
      <div>
        <button @click="userLogin" type="button">Submit</button>
      </div>
    </form> -->
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
      //   login: {
      //     username: 'lsr@mz.co.kr',
      //     password: 'BUh2b4RLYFl0rIE',
      //     status: false
      //   },
      valid: true,
      idRules: {
        required: (value) => !!value || '아이디를 입력해주세요',
        min: (v) => this.validateId(v)
      },
      passwordShow: false,
      passwordRules: {
        required: (value) => !!value || '비밀번호를 입력해주세요',
        min: (v) => this.validatePassword(v),
        emailMatch: () => `아이디와 비밀번호가 일치하지 않습니다.`
      },
      loading: false
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.userLogin()
      }
    },
    // reset() {
    //   this.$refs.form.reset()
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation()
    // },
    validateId(id) {
      if (id.legnth > 100) {
        return '100자 이내로 입력해주세요'
      } else if (
        id.search(
          /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
        )
      )
        return '이메일 형식으로 입력해주세요.'
      else return true
    },
    validatePassword(pw) {
      if (pw.length < 8 || pw.length > 20) {
        // alert("10자리 ~ 20자리 이내로 입력해주세요.");
        return '10자리 ~ 20자리 이내로 입력해주세요.'
      } else if (pw.search(/\s/) !== -1) {
        // alert("");
        return '비밀번호는 공백 없이 입력해주세요.'
      } else if (
        pw.search(/^(?=.*[a-zA-Z0-9])(?=.*[a-zA-Z!@#$%^&*])(?=.*[0-9!@#$%^&*])/)
      ) {
        return '영문, 숫자, 특수문자 중 2가지 이상을 조합하여 입력해주세요.'
      } else {
        return true
      }
    },
    async userLogin() {
      this.loading = true
      await this.$auth
        .loginWith('local', {
          data: this.login
        })
        .then(({ data }) => {
          if (data.result) {
            if (data.status === 'Y') {
              this.$auth.setRefreshToken('local', 'Bearer ' + data.refreshToken)

              this.$toast.success('로그인 성공', { duration: 3000 })
            }
            this.loading = false
          }
        })
        .catch((error) => {
          this.loading = false

          const data = error.response.data
          if (data.detail != null) {
            if (data.detail.status === 'P') {
              this.$emit('updateType', 'password')
            }
          }
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

  &__form {
    margin-top: 36px;
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
  // width: 100%;
  &:first-of-type {
    margin-bottom: 10px;
  }
}
</style>
