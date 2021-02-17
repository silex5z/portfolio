<template>
  <footer :class="fixed ? 'fixed' : ''" class="footer">
    <button v-if="isMobile" @click="handleClickPCView" class="pc__view__btn">
      PC버전 보기
    </button>
    <span class="footer__text">문의/피드백</span>
    <small>&copy; 2020 OP.GG &#38; Pentacle. Data based on Dragonest.</small>
  </footer>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      isMobile: this.$device.isMobile
    }
  },
  methods: {
    handleClickPCView() {
      this.$router.replace({
        path: this.$route.path,
        query: {
          pc: 'Y'
        }
      })
      setTimeout(() => location.reload(), 50)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 12px;
  margin-top: 24px;
  background-color: #f7f7f9;

  &.fixed {
    position: fixed;
    bottom: 0;
  }

  .pc__view__btn {
    width: calc(100% - 24px);
    padding: 10px 0;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #dbe0e4;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    color: #202d37;
    font-size: 14px;
  }

  .footer__text {
    margin: 24px 0 10px;
    color: #202d37;
    font-size: 12px;
  }
  small {
    color: #9aa4af;
    font-size: 12px;
  }
}
</style>
