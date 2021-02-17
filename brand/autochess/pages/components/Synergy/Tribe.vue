<template>
  <div :class="deviceName" class="wrap">
    <main class="tribe__main">
      <article class="info">
        <div class="info__header">
          <img :src="respItem.icon_96" alt="종족 아이콘" />
          <section class="info__header--right">
            <em>종족</em>
            <h2>{{ respItem.name }}</h2>
          </section>
        </div>
        <hr class="line" />
        <ul class="info__texts">
          <li>
            <Num-Text
              :num="'1'"
              :text="'모든 아군 조류족이 20%의 회피 확률을 얻습니다.'"
            />
          </li>
          <li>
            <Num-Text
              :num="'2'"
              :text="
                '모든 아군 조류족이 40%의 회피 확률을 얻고, 다른 아군은 25%의 회피 확률을 얻습니다.'
              "
            />
          </li>
          <li>
            <Num-Text
              :num="'3'"
              :text="
                '모든 아군 조류족이 65%의 회피 확률을 얻고, 다른 아군은 45%의 회피 확률을 얻습니다.'
              "
            />
          </li>
        </ul>
      </article>

      <ul class="cards">
        <li v-for="(item, index) in objectCards" :key="index">
          <Object-Card :info="item" />
        </li>
      </ul>

      <section class="compositoin">
        <h3>같이 구성하는 시너지</h3>
        <hr class="line" />
        <ul class="compositoin__icons">
          <li v-for="(item, index) in percentJobs" :key="index">
            <percent-job-icon :name="item.name" :percent="item.percent" />
          </li>
        </ul>
      </section>
    </main>

    <section class="lineUp__wrap">
      <home-table />
    </section>
  </div>
</template>

<script>
import ObjectCard from '@/components/card/Object'
import PercentJobIcon from '@/components/icons/Job/PercentJob'
import HomeTable from '@/components/table/Home'
import NumText from '@/components/text/NumText'

export default {
  components: {
    ObjectCard,
    PercentJobIcon,
    HomeTable,
    NumText
  },
  props: {
    respItem: {
      type: Object
    }
  },
  data() {
    return {
      isMobile: this.$device.isMobile,
      isTablet: this.$device.isTablet,
      isDesktop: this.$device.isDesktop,

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
      ],
      percentJobs: [
        {
          name: 'Hunter',
          percent: 95
        },
        {
          name: 'Assassin',
          percent: 95
        },
        {
          name: 'Druid',
          percent: 95
        },
        {
          name: 'Warlock',
          percent: 95
        }
      ]
    }
  },
  computed: {
    deviceName() {
      if (this.isMobile) return 'mobile'
      else if (this.isDesktop) return 'desktop'
      else return 'tablet'
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/pages/base.scss');

.wrap {
  position: relative;
  margin-top: 24px;
}

.desktop {
  .tribe__main {
    position: relative;
    width: 1080px;
    margin: 0 auto;
  }

  .cards {
    position: absolute;
    top: 0;
    right: 0;
  }

  .compositoin {
    margin-top: 24px;
  }

  .lineUp__wrap {
    margin-left: 335px;
  }
}

.tablet {
  margin-left: 14px;
  margin-right: 14px;

  .info {
    display: flex;
    align-items: center;
    width: auto;

    .line {
      display: none;
    }

    .info__texts {
      margin-left: 70px;
    }
  }

  .compositoin {
    width: auto;
    margin-top: 36px;
  }
}

.mobile {
  .info {
    width: auto;
    margin: 16px;
  }

  .cards {
    flex-wrap: inherit;
    overflow-x: auto;
    width: auto;
    margin-left: 16px;
  }

  .compositoin {
    width: auto;
    margin: 16px;
  }
}

.info {
  width: 324px;
  padding: 16px;
  background-color: #f7f7f9;
  border-radius: 4px;

  .info__header {
    display: flex;
    align-items: center;

    img {
      width: 44px;
    }
  }
  .info__header--right {
    margin-left: 12px;
    em {
      color: #5383e8;
      font-size: 12px;
    }
    h2 {
      margin-top: 2px;
      color: #202d37;
      font-size: 20px;
    }
  }
  .info__texts {
    color: #44515c;
    font-size: 11px;
  }
}
.line {
  background-color: #dbe0e4;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  width: 745px;
  margin-top: -24px;

  > li {
    margin-top: 40px;
    margin-right: 24px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.compositoin {
  width: 324px;
  height: 145px;
  padding: 16px 24px 16px;
  border-radius: 4px;
  background: #f7f7f9;

  h3 {
    color: #202d37;
    font-size: 15px;
    font-weight: bold;
  }
  .compositoin__icons {
    display: flex;

    li {
      margin-left: 24px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
