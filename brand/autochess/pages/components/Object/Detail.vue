<template>
  <div class="object__detail">
    <div class="detail--top">
      <Large-Card class="detail--top__card" />
    </div>

    <div class="detail--right">
      <Object-Stats-Table />

      <section class="item__rate">
        <div class="item__rate__header">
          <h2>아이템 및 승률</h2>
          <div class="stats__selectBoxs">
            <Select-Box :options="totalTier.options" />

            <Select-Box :options="period.options" />
          </div>
        </div>

        <Item-Rate-Table />
      </section>

      <section class="object__recommend">
        <h2>추천 연계 기물</h2>

        <ul class="object__recommend__cards">
          <li
            v-for="(item, index) in objectCards"
            :key="index"
            class="object__recommend__card"
          >
            <Object-Card :info="item" />
          </li>
        </ul>
      </section>

      <section class="hard__lineUp">
        <h2>이 기물이 포함되는 라인업</h2>

        <Home-Table />
      </section>
    </div>
  </div>
</template>

<script>
import SelectBox from '@/components/form/SelectBox'
import LargeCard from '@/components/card/ObjectDetailLarge'
import ObjectStatsTable from '@/components/table/ObjectStats'
import ItemRateTable from '@/components/table/ItemRate'
import ObjectCard from '@/components/card/Object'
import HomeTable from '@/components/table/Home'

export default {
  components: {
    SelectBox,
    LargeCard,
    ObjectStatsTable,
    ItemRateTable,
    ObjectCard,
    HomeTable
  },
  data() {
    return {
      totalTier: {
        options: ['전체 티어', '1티어', '2티어', '3티어']
      },
      period: {
        options: ['현재시즌', '최근3일', '최근7일', '최근28일']
      },

      objectCards: [
        {
          name: 'Abyssal Guard',
          job: '금제술사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'purple'
        },
        {
          name: 'Abyssalcrawler',
          job: '별빛 궁수',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        },
        {
          name: 'Argali Knight',
          job: '달의 기사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        },
        {
          name: 'Ashes Hell Knight',
          job: '현명한 예언자',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'yellow'
        },
        {
          name: 'Berserker',
          job: '바람 순찰자',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'blue'
        },
        {
          name: 'Blight Sorcerer',
          job: '현명한 예언자',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'pink'
        },
        {
          name: 'Corruption Soulreaper',
          job: '현명한 예언자',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'pink'
        },
        {
          name: 'Dark Spirit',
          job: '현명한 예언자',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'yellow'
        },
        {
          name: 'Abyssal Guard',
          job: '달의 기사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        },
        {
          name: 'Abyssalcrawler',
          job: '금제술사',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'blue'
        },
        {
          name: 'Argali Knight',
          job: '별빛 궁수',
          detail: '조류 / 악마사냥꾼',
          bgColor: 'teal'
        }
      ]
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
  top: 19px;
  left: 0;
  width: 324px;

  .detail--top__card {
    width: 324px;
    height: 335px;
  }
}

.detail--right {
  width: 756px;
  margin-top: 19px;
  margin-left: auto;
}

@media (max-width: 1280px) {
  .detail--top {
    position: static;
    max-width: 756px;
    width: 100%;
    margin-top: 0;

    .detail--top__card {
      width: 100%;
    }
  }

  .detail--right {
    position: relative;
    margin-top: 0;
    margin-left: 0;
  }
}

.item__rate {
  padding: 8px;

  .item__rate__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

@media (min-width: 768px) and (max-width: 1280px) {
  .object__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .detail--top {
    padding: 0 8px;
    margin-top: 24px;

    .detail--top__card {
      height: 274px;
    }
  }
}

@media (max-width: 767px) {
  .detail--right {
    width: 100%;
  }

  .stats__selectBoxs {
    justify-content: flex-end;
    width: 288px;
  }
}

.object__recommend {
  padding-left: 8px;

  .object__recommend__cards {
    display: flex;
    overflow-x: auto;

    .object__recommend__card {
      margin-top: 16px;
      margin-right: 24px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.hard__lineUp {
  width: 756px;
  padding: 8px;
}

@media (max-width: 767px) {
  .hard__lineUp {
    width: 100%;
  }
}
</style>
