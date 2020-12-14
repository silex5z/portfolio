<template>
  <component
    :is="type(currentType)"
    :login="login"
    @updateType="updateType"
  ></component>
</template>

<script>
import Login from '@/components/login/Login'
import resetPassword from '@/components/login/Password'

export default {
  auth: 'guest',
  layout: 'blank',
  data() {
    return {
      currentType: 'login',
      login: {
        username: '',
        password: '',
        status: false
      }
    }
  },
  methods: {
    type() {
      return this.currentType === 'login' ? Login : resetPassword
    },
    updateType(type) {
      this.currentType = type
    },
    initLoginInfo() {
      this.login.username = ''
      this.login.password = ''
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
  width: 100%;
  &:first-of-type {
    margin-bottom: 10px;
  }
}
</style>
