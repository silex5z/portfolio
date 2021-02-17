<template>
  <div class="batch__icon">
    <span class="icon__header">
      <span class="header__num">5</span>
      <img src="~@/assets/img/icons/batch/batch-character.png" alt />
    </span>
    <span class="icon__star">
      <Star-Icon :bgColor="'#5383E8'" />
      <Star-Icon :bgColor="'#5383E8'" />
      <Star-Icon :bgColor="'#5383E8'" />
    </span>
  </div>
</template>

<script>
import StarIcon from '@/components/icons/Shape/Star'

export default {
  components: {
    StarIcon
  }
}
</script>

<style lang="scss" scoped>
.batch__icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 44px;
}
.icon__header {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;

  .header__num {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 4px;
    background-color: rgba(32, 45, 55, 0.9);
    color: #fff;
    font-family: 'Roboto';
    font-size: 9px;
  }

  > img {
    width: 100%;
  }
}

.icon__star {
  display: flex;
  margin-top: 2px;

  > svg {
    margin-left: 2px;

    &:first-child {
      margin-left: 0;
    }
  }
}

@media (max-width: 600px) {
  .batch__icon {
    height: 32px;
  }

  .icon__header {
    width: 18px;
    height: 18px;
  }

  .icon__star {
    > svg {
      width: 6px;
      height: 6px;
    }
  }
}
</style>
