<template>
  <div :class="type" class="card__text">
    <template v-if="TYPES.NORMAL === type">
      <img src="~@/assets/img/temp/object.png" alt />
      <span class="text">{{ text }}</span>
    </template>

    <template v-if="TYPES.ITEM_RATE === type">
      <img src="~@/assets/img/temp/object.png" alt />
      <span class="text">{{ text }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'normal',
      required: false
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      TYPES: {
        NORMAL: 'normal',
        ITEM_RATE: 'itemRate'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card__text {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 34px;
    height: 34px;
  }

  .text {
    display: block;
    margin-left: 4px;
    color: #44515c;
    font-size: 12px;
  }
}

.itemRate {
  flex-direction: column;

  img {
    width: 24px;
    height: 24px;
  }

  .text {
    margin-top: 1px;
    color: #9aa4af;
    font-family: 'Roboto';
    font-size: 11px;
  }
}

@media (max-width: 767px) {
  .card__text {
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
