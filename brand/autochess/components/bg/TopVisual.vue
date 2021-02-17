<template>
  <div :class="bgClassName" class="topVisual"></div>
</template>

<script>
export default {
  props: {
    bgClassName: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.topVisual {
  height: 506px;

  &.home {
    @include darkBackground('~@/assets/img/topBg/Main.jpg');
  }
  &.synergy {
    @include darkBackground('~@/assets/img/topBg/Synergy.jpg');
  }
  &.lineUp {
    @include darkBackground('~@/assets/img/topBg/LineUp.jpg');
  }
  &.object {
    @include darkBackground('~@/assets/img/topBg/Object.jpg');
  }
  &.item {
    @include darkBackground('~@/assets/img/topBg/Item.jpg');
  }
  &.ranking {
    @include darkBackground('~@/assets/img/topBg/Ranking.jpg');
  }
  &.acp {
    @include darkBackground('~@/assets/img/topBg/Acp.jpg');
  }
}
@media (min-width: 768px) {
  .topVisual {
    height: 355px;
  }
}
@media (max-width: 767px) {
  .topVisual {
    height: 150px;
  }
}
</style>
