<template>
  <div :class="info.bgColor" class="card">
    <img
      :src="require(`@/assets/img/icons/imgChess/en/${info.name}.png`)"
      alt
    />
    <div class="card__bottom">
      <strong :class="info.bgColor" class="job">{{ info.job }}</strong>
      <span class="detail">{{ info.detail }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: '',
          job: '',
          default: '',
          bgColor: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 132px;
  background-repeat: no-repeat;
  background-size: contain;

  &.purple {
    background-image: url('~@/assets/img/icons/bg/purple_object_bg.png');
  }
  &.teal {
    background-image: url('~@/assets/img/icons/bg/teal_object_bg.png');
  }
  &.yellow {
    background-image: url('~@/assets/img/icons/bg/yellow_object_bg.png');
  }
  &.blue {
    background-image: url('~@/assets/img/icons/bg/blue_object_bg.png');
  }
  &.pink {
    background-image: url('~@/assets/img/icons/bg/pink_object_bg.png');
  }

  img {
    position: absolute;
    top: -14px;
    right: -18px;
    width: 100%;
  }
}
.card__bottom {
  position: absolute;
  bottom: 8px;
  padding: 0 8px;

  .job {
    display: block;
    font-size: 12px;

    &.purple {
      color: #decfff;
    }
    &.teal {
      color: #bbecdb;
    }
    &.yellow {
      color: #fff9db;
    }
    &.blue {
      color: #d5e3ff;
    }
    &.pink {
      color: #ffcdea;
    }
  }
  .detail {
    display: block;
    margin-top: 2px;
    color: #fff;
    font-size: 11px;
  }
}
</style>
