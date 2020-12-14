<template>
  <div class="graphWrap">
    <div class="graph graph1">
      <span class="redLine"></span>
      <span class="line line1"></span>
      <span class="line line2"></span>
      <p class="graph__innerText">
        1일 사용 후, 피부 보습 지속력 <b>46.8% 개선</b> 효과
      </p>
      <p class="graph__bottomText">
        *P&amp;K피부임상연구센터(주) : 25-55세 성인 여성 22명 대상<br />
        / 2019.12.05 ~ 2020.01.22 / 개인차있음
      </p>
    </div>

    <div class="graph graph2">
      <span class="redLine redLine1"></span>

      <span class="line line1"></span>
      <span class="line line2"></span>
      <p class="graph__innerText">
        4주 사용 후, 피부 투명도 <b>3.8% 개선</b> 효과
      </p>
      <p class="graph__bottomText graph__bottomText1">
        *P&amp;K피부임상연구센터(주) : 25-55세 성인 여성 22명 대상<br />
        / 2019.12.05 ~ 2020.01.22 / 개인차있음
      </p>
    </div>

    <div class="graph graph3">
      <span class="redLine redLine1"></span>

      <span class="line line1"></span>
      <span class="line line2"></span>
      <p class="graph__innerText">4주 사용 후, 피부 결 <b>7.4% 개선</b> 효과</p>
      <p class="graph__bottomText graph__bottomText1">
        *P&amp;K피부임상연구센터(주) : 25-55세 성인 여성 22명 대상<br />
        / 2019.12.05 ~ 2020.01.22 / 개인차있음
      </p>
    </div>

    <div class="graph graph4">
      <span class="redLine redLine1"></span>
      <span class="line line1"></span>
      <span class="line line2"></span>

      <p class="graph__innerText">
        2주 사용 후, 피부 진정 <b>25.6% 개선</b> 효과
      </p>
      <p class="graph__bottomText graph__bottomText1">
        *P&amp;K피부임상연구센터(주) : 25-55세 성인 여성 22명 대상<br />
        / 2019.12.05 ~ 2020.01.22 / 개인차있음
      </p>
    </div>

    <div class="graph graph5">
      <span class="redLine redLine1"></span>
      <span class="line line1"></span>
      <span class="line line2"></span>

      <p class="graph__innerText">
        2주 사용 후, 피부 장벽 강화 <b>11.5% 개선</b> 효과
      </p>
      <p class="graph__bottomText graph__bottomText1">
        *P&amp;K피부임상연구센터(주) : 25-55세 성인 여성 22명 대상<br />
        / 2019.12.05 ~ 2020.01.22 / 개인차있음
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Graph',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.singleEssence.imageUrlRoot}/${this.deviceKind}`
      }
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.graph {
  position: absolute;
  top: 0;
  transition: opacity 1s;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  width: 345px;
  height: 176px;
  opacity: 0;
  @include background(
    map-get($SingleEssence, 'pc-image-url') + '/bg_graph.png'
  );
  font-family: 'Noto Sans KR', sans-serif, 'Malgun Gothic', '맑은고딕', 'Dotum';

  &:after {
    position: absolute;
    bottom: -70px;
    left: 0;
    color: #fff;
    font-size: 18px;
    font-weight: 100;
  }
  &.on {
    opacity: 1;
    .line {
      > span {
        font-size: 17px;
      }
    }
  }
  &__innerText {
    position: absolute;
    width: 150%;
    line-height: 22px;
    font-size: 22px;
    color: #661017;
    letter-spacing: -1px;
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 2s;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    left: 0;
    top: -44px;
    > b {
      font-weight: 700;
    }
  }
  &__bottomText {
    font-size: 15px;
    color: #ffd6d7;
    width: 120%;
    line-height: 19px;
    font-weight: lighter;
    position: absolute;
    bottom: -87px;
    &2 {
      bottom: -114px;
    }
  }
  .redLine {
    position: absolute;
    display: inline-block;
    border: 1px dashed #cb2d39;
    opacity: 0;
    transform-origin: left;
    transition: width 1.5s, opacity 1s;
    transition-delay: 1.5s;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    &::after,
    &::before {
      position: absolute;
      top: -5px;
      content: '';
      width: 10px;
      height: 10px;
      background: #cb2d39;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 1s;
      transition-delay: 1.5s;
    }
    &::before {
      left: -1px;
    }
    &::after {
      right: -1px;
    }
  }
  .line {
    position: absolute;
    bottom: 3px;
    display: inline-block;
    width: 100px;
    background: #ffdedc;
    color: #cb2d39;
    text-align: center;
    font-size: 0;
    transition: height 1s;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;

    &2 {
      transition: height 1.5s;
    }
    > span {
      position: absolute;
      bottom: 8px;
      left: 0;
      display: inline-block;
      width: 100%;
      letter-spacing: -0.2px;
    }
    &:after {
      position: absolute;
      bottom: -37px;
      font-size: 20px;
      color: #661017;
      letter-spacing: -0.8px;
      width: 100%;
      left: 0;
    }
  }
}
.graph1 {
  .redLine {
    width: 9px;
    transform: rotate(-42deg);
    top: 166px;
    left: 77px;
    z-index: 1;
    opacity: 0;
  }

  .line {
    &1 {
      height: 0;
      left: 34px;
      &:after {
        content: '사용 전';
      }
    }
    &2 {
      height: 0;
      left: 194px;
      &:after {
        content: '1일 사용 후';
        width: 100px;
      }
    }
  }
  &.on {
    .redLine {
      width: 228px;
      opacity: 1;
      &::after,
      &::before {
        opacity: 1;
      }
    }
    .graph__innerText {
      opacity: 1;
    }
    .line {
      &1 {
        height: 8px;
      }
      &2 {
        height: 154px;
      }
    }
  }
}

.graph2 {
  .redLine1 {
    width: 9px;
    transform: rotate(-26deg);
    top: 150px;
    left: 77px;
    z-index: 1;
  }

  .graph__innerText {
    right: 28px;
    bottom: 57px;
    transition-delay: 3s;
  }
  .line {
    width: 100px;
    &1 {
      height: 0;
      left: 34px;
      transition-delay: 1s;
      &:after {
        content: '사용 전';
      }
    }
    &2 {
      height: 0;
      left: 194px;
      transition-delay: 1.5s;
      &:after {
        content: '4주 사용 후';
      }
    }
  }
  &.on {
    .redLine1 {
      width: 191px;
      opacity: 1;
      &::after,
      &::before {
        opacity: 1;
      }
    }
    .graph__innerText {
      opacity: 1;
    }
    .line {
      &1 {
        height: 24px;
      }
      &2 {
        height: 105px;
      }
    }
  }
}

.graph3 {
  .redLine {
    width: 9px;
    transform: rotate(-37deg);
    top: 139px;
    left: 78px;
    z-index: 1;
  }

  .line {
    width: 100px;
    &1 {
      height: 0;
      left: 34px;
      &:after {
        content: '사용 전';
      }
    }
    &2 {
      height: 0;
      left: 194px;
      &:after {
        content: '4주 사용 후';
        width: 100px;
      }
    }
  }
  &.on {
    .redLine {
      width: 213px;
      opacity: 1;
      &::after,
      &::before {
        opacity: 1;
      }
    }
    .graph__innerText {
      opacity: 1;
    }
    .line {
      &1 {
        height: 38px;
      }
      &2 {
        height: 159px;
      }
    }
  }
}

.graph4 {
  .redLine {
    width: 9px;
    transform: rotate(-32deg);
    top: 160px;
    left: 78px;
    z-index: 1;
  }

  .line {
    width: 100px;
    &1 {
      height: 0;
      left: 34px;
      &:after {
        content: '사용 전';
      }
    }
    &2 {
      height: 0;
      left: 194px;
      &:after {
        content: '2주 사용 후';
        width: 100px;
      }
    }
  }
  &.on {
    .redLine {
      width: 199px;
      opacity: 1;
      &::after,
      &::before {
        opacity: 1;
      }
    }
    .graph__innerText {
      opacity: 1;
    }
    .line {
      &1 {
        height: 14px;
      }
      &2 {
        height: 115px;
      }
    }
  }
}

.graph5 {
  .redLine {
    width: 9px;
    transform: rotate(-28deg);
    top: 160px;
    left: 78px;
    z-index: 1;
  }

  .line {
    width: 100px;
    &1 {
      height: 0;
      left: 34px;
      &:after {
        content: '사용 전';
      }
    }
    &2 {
      height: 0;
      left: 194px;
      &:after {
        content: '2주 사용 후';
        width: 100px;
      }
    }
  }
  &.on {
    .redLine {
      width: 188px;
      opacity: 1;
      &::after,
      &::before {
        opacity: 1;
      }
    }
    .graph__innerText {
      opacity: 1;
    }
    .line {
      &1 {
        height: 14px;
      }
      &2 {
        height: 99px;
      }
    }
  }
}

.lineBottom {
  transform: translateY(100%);
}

.wrap__m {
  .graph__bottomText {
    color: #c29395;
  }
}
</style>
