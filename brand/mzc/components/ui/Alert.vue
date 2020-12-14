<template>
  <PopBase
    v-show="isShow"
    :mask="false"
    :type="'alert'"
    :show="isShow"
    :class-name="'alert'"
    :width="400"
    :animation="'fade'"
  >
    <template #contents>
      <template v-if="type === 'alert'">
        <p class="messageBox" v-html="errorMessage"></p>
        <div class="btnBox">
          <button :id="dynamicId" type="button" @click="closeAlert">
            <span>닫기</span>
          </button>
        </div>
      </template>
      <template v-if="type === 'confirm'">
        <p class="messageBox" v-html="errorMessage"></p>
        <div class="btnBox">
          <button :id="dynamicId" type="button" @click="closeAlert(false)">
            <span>닫기</span>
          </button>
          <button
            :id="dynamicId"
            type="button"
            class="btn__confirm"
            @click="closeAlert(true)"
          >
            <span>확인</span>
          </button>
        </div>
      </template>
    </template>
  </PopBase>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import PopBase from '@/components/shared/PopBase'

export default {
  name: 'Alert',
  components: { PopBase },
  props: { isShow: { type: Boolean, default: false, required: true } },
  computed: {
    ...mapState({
      type: (state) => state.popup.alert.type,
      errorMessage: (state) => state.popup.alert.message,
      dynamicId: (state) => state.popup.alert.dynamicId
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop', 'closeAlert']),
    ...mapMutations('popup', ['SET_CONFIRMSTATE']),
    setConfirmState() {
      this.SET_CONFIRMSTATE(true)
      setTimeout(() => {
        this.SET_CONFIRMSTATE(false)
      }, 1000)
    },
    openPopLogin() {
      this.closeAlert()
      this.openPop({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
.popup__alert {
  .popup__inner {
    border: 2px solid #fff;
    border-radius: 30px;
    background: #fff;
    // box-shadow: 10px 22px 60px 0px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
.messageBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // min-height: 160px;
  font-size: 18px;
  height: 160px;
  padding: 30px 20px;
  font-weight: $font-light;
  color: #000;
  line-height: 24px;
  word-break: keep-all;
  // border-radius: 30px 30px 0 0;
  // background: #fff;
  strong {
    font-weight: $font-bold;
  }
}
.btnBox {
  height: 60px;
  height: 50px;
  background: #000;
  display: flex;
  border-radius: 0 0 30px 30px;

  button {
    width: 100%;
    height: 100%;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      // font-size: 18px;
      font-size: 14px;
      color: #fff;
    }
  }

  .btn__login {
    border-left: 1px solid #fff;
    span {
      color: $pointBlueGreen1;
    }
  }
  .btn__confirm {
    background: var(--yellow);
  }
}
</style>
