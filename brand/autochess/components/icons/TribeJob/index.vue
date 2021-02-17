<template>
  <div class="tribe__job">
    <img :src="require(`@/assets/img/icons/tribe/${tribeName}.png`)" alt />
    <img :src="require(`@/assets/img/icons/job/${jobName}.png`)" alt />
  </div>
</template>

<script>
export default {
  props: {
    tribeName: {
      type: String,
      required: true
    },
    jobName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tribe__job {
  display: flex;
  justify-content: center;

  > img {
    width: 24px;
    height: 24px;

    &:first-child {
      margin-right: 6px;
    }
  }
}
</style>
