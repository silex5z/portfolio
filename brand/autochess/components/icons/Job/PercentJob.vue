<template>
  <div class="percent__wrap">
    <span class="percent">{{ percent }}%</span>
    <img :src="require(`@/assets/img/icons/job/${name}.png`)" alt />
    <span class="text">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    percent: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.percent__wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 44px;
  height: 62px;

  .percent {
    position: absolute;
    left: -5px;
    max-width: 24px;
    max-height: 24px;
    padding: 8px 3px 6px;
    border-radius: 50px;
    background-color: #202d37;
    color: #fff;
    font-family: 'Roboto';
    font-size: 10px;
  }
  img {
    width: 44px;
  }
  .text {
    text-align: center;
    margin-top: 4px;
    color: #57646f;
    font-size: 11px;
  }
}
</style>
