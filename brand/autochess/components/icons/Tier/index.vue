<template>
  <div class="icon">
    <template v-if="num === '1'">
      <img class="icon__num" src="@/assets/img/icons/tier/1.svg" alt />
      <TierShape :fillColor="'#EB9C00'" />
    </template>
    <template v-if="num === '2'">
      <img class="icon__num" src="@/assets/img/icons/tier/2.svg" alt />
      <TierShape :fillColor="'#E537A2'" />
    </template>
    <template v-if="num === '3'">
      <img class="icon__num" src="@/assets/img/icons/tier/3.svg" alt />
      <TierShape :fillColor="'#5383E8'" />
    </template>
    <template v-if="num === '4'">
      <img class="icon__num" src="@/assets/img/icons/tier/4.svg" alt />
      <TierShape :fillColor="'#00BBA3'" />
    </template>
    <template v-if="num === '5'">
      <img class="icon__num" src="@/assets/img/icons/tier/5.svg" alt />
      <TierShape :fillColor="'#758592'" />
    </template>
  </div>
</template>

<script>
import TierShape from './TierShape'

export default {
  components: {
    TierShape
  },
  props: {
    num: {
      type: String,
      default: '1',
      required: true
    }
  },
  data() {
    return {
      fillColor: '#EB9C00'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  width: 20px;
  height: 23px;
  margin: 0 auto;

  .icon__num {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    width: auto;
  }
}
</style>
