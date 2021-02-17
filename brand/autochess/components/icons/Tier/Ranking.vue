<template>
  <div class="ranking">
    <img :src="require(`@/assets/img/icons/ranking/${tier}.png`)" alt />
    <span class="ranking__num">{{ num }}</span>
  </div>
</template>

<script>
export default {
  props: {
    tier: {
      type: String,
      required: true
    },
    num: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ranking {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
  .ranking__num {
    margin-top: 1px;
  }
}
</style>
