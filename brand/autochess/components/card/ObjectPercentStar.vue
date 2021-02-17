<template>
  <div :class="info.bgColor" class="card">
    <div class="card__header">
      <span class="card__header__percent">{{ info.percent }}%</span>
      <span :class="`star--${info.star}`" class="card__header__star"></span>
    </div>
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
          percent: '',
          star: '',
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
  width: 116px;
  height: 182px;
  background-repeat: no-repeat;
  background-size: contain;

  &.purple {
    background-image: url('~@/assets/img/icons/bg/purple_lineUp_bg.png');
  }
  &.teal {
    background-image: url('~@/assets/img/icons/bg/teal_lineUp_bg.png');
  }
  &.yellow {
    background-image: url('~@/assets/img/icons/bg/yellow_lineUp_bg.png');
  }
  &.blue {
    background-image: url('~@/assets/img/icons/bg/blue_lineUp_bg.png');
  }
  &.pink {
    background-image: url('~@/assets/img/icons/bg/pink_lineUp_bg.png');
  }

  img {
    width: 110px;
    height: 110px;
  }
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 0;

  .card__header__percent {
    display: block;
    padding: 2px 4px 1px;
    color: #fff;
    font-family: 'Roboto';
    font-size: 12px;
    border-radius: 100px;
    background: rgba(28, 28, 31, 0.6);
  }

  .card__header__star {
    display: block;
    width: 34px;
    height: 10px;
    background-repeat: no-repeat;
    background-size: contain;

    &.star--1 {
      background-image: url('~@/assets/img/icons/shape/star-1.png');
    }
    &.star--2 {
      background-image: url('~@/assets/img/icons/shape/star-2.png');
    }
    &.star--3 {
      background-image: url('~@/assets/img/icons/shape/star-3.png');
    }
  }
}

.card__bottom {
  text-align: center;
  margin-top: 13px;

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
