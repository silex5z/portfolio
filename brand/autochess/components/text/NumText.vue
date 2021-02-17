<template>
  <div :class="type" class="num__text">
    <span class="text__num__box">
      <span class="text__num">{{ num }}</span>
    </span>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'NORMAL',
      required: false
    },
    num: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.num__text {
  display: flex;

  &.VERTICAL_ALIGN {
    display: block;

    .text__num__box {
      top: -1px;
    }
  }

  .text__num__box {
    position: relative;
    display: inline-block;
    margin-right: 2px;
    font-size: 9px;
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background-color: #9aa4af;

    .text__num {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10px;
      font-family: 'Roboto';
      color: #fff;
    }
  }

  .text {
    color: #44515c;
    font-size: 11px;
  }
}
</style>
