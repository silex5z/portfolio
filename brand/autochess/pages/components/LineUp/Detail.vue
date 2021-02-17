<template>
  <div class="lineUp__detail">
    <div class="detail--top">
      <ul class="detail--top__descriptions">
        <li class="top__description">
          <Line-Up :name="'Mech'" :num="'6'" class="lineUp__icon" />
          <Num-Text
            :type="'VERTICAL_ALIGN'"
            :num="'1'"
            :text="
              '아군 근접 체스 기물이 사망할 때마다 모든 아군 키라족의 최대 생명력이 20% 증가하고 공력력이 20%증가합니다. 이 효과는 8번 중첩됩니다.'
            "
          />
        </li>
        <li class="top__description">
          <Line-Up :name="'Mech'" :num="'6'" class="lineUp__icon" />
          <Num-Text
            :type="'VERTICAL_ALIGN'"
            :num="'2'"
            :text="'모든 적의 방어력을 8 감소시킵니다.'"
          />
        </li>
      </ul>

      <div class="detail--top__stats">
        <div class="stats__selectBoxs">
          <Select-Box :options="totalTier.options" />

          <Select-Box :options="period.options" />
        </div>

        <div class="stats__info__wrap">
          <ul class="stats__info">
            <li
              v-for="(item, index) in statsInfo"
              :key="index"
              class="stats__info__item"
            >
              <img
                :src="
                  require(`@/assets/img/icons/pictogram/${item.imgName}.png`)
                "
                alt
              />
              <span class="stats__info--right">
                <strong>{{ item.title }}</strong>
                <span>{{ item.text }}</span>
              </span>
            </li>
          </ul>
          <div class="stats__ranking">
            <img src="@/assets/img/icons/pictogram/line-graph.png" alt />
            <span class="stats__ranking__text">최종순위</span>
            <div class="stats__ranking__chart">
              <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail--right">
      <section class="object__stats">
        <h2>기물 구성 통계</h2>

        <ul class="object__stats__cards">
          <li
            v-for="(item, index) in objectCards"
            :key="index"
            class="object__stats__card"
          >
            <Object-Percent-Star :info="item" />
          </li>
        </ul>
      </section>

      <section class="hard__lineUp">
        <h2>상대하기 어려운 라인업</h2>

        <Line-Up-Table class="lineUp__table" />
      </section>

      <section class="easy__lineUp">
        <h2>상대하기 쉬운 라인업</h2>

        <Line-Up-Table class="lineUp__table" />
      </section>

      <section class="bacth">
        <h2>배치하기</h2>

        <Batch />
      </section>

      <button @click="handleClickMoreItem" type="button" class="more__btn">
        더 불러오기
      </button>
    </div>
  </div>
</template>

<script>
import LineUp from '@/components/icons/LineUp/index'
import NumText from '@/components/text/NumText'
import SelectBox from '@/components/form/SelectBox'
import ObjectPercentStar from '@/components/card/ObjectPercentStar'
import LineUpTable from '@/components/table/LineUp'
import Batch from '@/components/batch/index'
import BarChart from '@/components/chart/BarChart'

export default {
  components: {
    LineUp,
    NumText,
    SelectBox,
    ObjectPercentStar,
    LineUpTable,
    Batch,
    BarChart
  },
  data() {
    return {
      totalTier: {
        options: ['전체 티어', '1티어', '2티어', '3티어']
      },
      period: {
        options: ['현재시즌', '최근3일', '최근7일', '최근28일']
      },
      statsInfo: [
        {
          imgName: 'gamepads',
          title: '10234',
          text: '게임 수'
        },
        {
          imgName: 'check-list',
          title: '10234',
          text: '선택비율'
        },
        {
          imgName: 'graph',
          title: '10,3',
          text: '평균 라운드'
        },
        {
          imgName: 'math',
          title: '53%',
          text: '라운드 승률'
        }
      ],
      objectCards: [
        {
          percent: '95',
          star: '2',
          name: 'Abyssal Guard',
          job: '금제술사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'purple'
        },
        {
          percent: '95',
          star: '1',
          name: 'Abyssalcrawler',
          job: '별빛 궁수',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'blue'
        },
        {
          percent: '95',
          star: '3',
          name: 'Argali Knight',
          job: '달의 기사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        },
        {
          percent: '95',
          star: '2',
          name: 'Abyssal Guard',
          job: '금제술사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'yellow'
        },
        {
          percent: '95',
          star: '1',
          name: 'Abyssalcrawler',
          job: '별빛 궁수',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'pink'
        },
        {
          percent: '95',
          star: '3',
          name: 'Argali Knight',
          job: '달의 기사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        }
      ]
    }
  },
  methods: {
    handleClickMoreItem() {
      console.log('더 불러오기')
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 24px 0 8px;
  color: #202d37;
  font-size: 15px;
  font-weight: bold;
}

.detail--top {
  position: absolute;
  top: 0;
  left: 0;
  width: 324px;
  padding: 8px;
  margin-top: 20px;

  .detail--top__stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .detail--top__descriptions {
    padding: 24px 12px 19px;
    background-color: #fff;
  }

  .top__description {
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin-top: 5px;
    border-top: 1px solid #f7f7f9;

    &:first-child {
      padding: 0;
      margin-top: 0;
      border: none;
    }

    .lineUp__icon {
      margin-right: 14px;
    }
  }
}

.detail--right {
  width: 756px;
  margin-left: auto;
}

@media (max-width: 1280px) {
  .detail--top {
    position: static;
    max-width: 756px;
    width: 100%;
    margin-top: 0;
  }

  .detail--right {
    position: relative;
    margin-left: 0;
  }
}

.stats__selectBoxs {
  display: flex;
  margin: 24px 0 8px;

  .custom-select {
    margin-left: 7px;

    &:first-child {
      margin-left: 0;
    }
  }
}

.stats__info__wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stats__info {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
}
.stats__info__item {
  display: flex;
  width: 157px;
  height: 61px;
  padding: 12px;
  margin-top: 1px;
  margin-left: 1px;
  background-color: #fff;

  &:first-child {
    margin-top: 0;
    margin-left: 0;
    border-top-left-radius: 4px;
  }
  &:nth-child(2) {
    margin-top: 0;
    border-top-right-radius: 4px;
  }
  &:nth-child(3) {
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-bottom-right-radius: 4px;
  }

  > img {
    width: 26px;
    height: 26px;
  }

  .stats__info--right {
    margin-left: 4px;

    strong {
      display: block;
      color: #44515c;
      font-size: 20px;
    }
    span {
      display: block;
      color: #c3cbd1;
      font-size: 11px;
    }
  }
}

.stats__ranking {
  display: flex;
  align-items: center;
  width: 316px;
  padding: 12px;
  margin-top: 8px;
  background-color: #fff;

  > img {
    width: 26px;
    height: 26px;
  }

  .stats__ranking__text {
    color: #c3cbd1;
    font-size: 11px;
  }

  .stats__ranking__chart {
    margin-left: auto;
  }
}

@media (min-width: 768px) and (max-width: 1280px) {
  .lineUp__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats__info {
    flex-flow: initial;
  }

  .stats__info__wrap {
    display: flex;
    flex-direction: row;
    align-items: initial;
  }
  .stats__info__item {
    width: 127px;
  }
  .stats__ranking {
    width: 228px;
    margin-top: 0;
  }
}

@media (max-width: 767px) {
  .detail--top {
    .detail--top__stats {
      align-items: center;
    }
  }

  .detail--right {
    width: 100%;
  }

  .stats__selectBoxs {
    justify-content: flex-end;
    width: 288px;
  }

  .stats__info__wrap {
    width: 288px;
  }

  .stats__info__item {
    width: 143px;
  }

  .stats__ranking {
    width: 288px;
  }
}

.object__stats {
  padding-left: 8px;

  .object__stats__cards {
    display: flex;
    overflow-x: auto;

    .object__stats__card {
      margin-left: 8px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

.hard__lineUp,
.easy__lineUp,
.bacth {
  width: 756px;
  padding: 8px;
}

.more__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 740px;
  padding: 6px 6px 5px;
  margin: 0 auto;
  border: 1px solid #81acff;
  border-radius: 4px;
  background-color: #fff;
  color: #2f5ec0;
  font-family: 'Roboto';
  font-size: 12px;

  &:after {
    content: '';
    position: relative;
    top: -1px;
    display: block;
    width: 10px;
    height: 10px;
    margin-left: 3px;
    @include background(
      '~@/assets/img/icons/symbol/plus-type2.png',
      null,
      null,
      null,
      contain
    );
  }
}

@media (max-width: 767px) {
  .hard__lineUp,
  .easy__lineUp,
  .bacth {
    width: 100%;
  }

  .more__btn {
    width: calc(100% - 16px);
  }
}
</style>
