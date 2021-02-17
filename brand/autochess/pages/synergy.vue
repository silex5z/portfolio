<template>
  <div class="wrapper">
    <nav-top-menu :activeName="SYNERGY" />

    <Tribe v-if="findRaceKrTribeItem" :respItem="findRaceKrTribeItem" />

    <Job v-else-if="isJob" />

    <template v-else>
      <Top-Visual :bgClassName="'synergy'" />

      <main class="main">
        <h2 class="title">시너지</h2>
        <section class="main__box">
          <h3 class="title">
            종족
            <span>(15)</span>
          </h3>
          <hr class="line" />
          <ul class="main__items">
            <template v-if="responseRaceKr">
              <li
                v-for="(item, index) in responseRaceKr"
                v-if="tribe.isMore && isMobile ? index < 9 : true"
                :key="index"
                @click="handleClickTribeItem(item.id)"
                class="main__item"
              >
                <img :src="item.icon_96" class="items__icon" alt />
                <span class="item__icon__name">{{ item.name }}</span>
              </li>
              <li v-if="tribe.isMore && isMobile" class="main__item">
                <img
                  @click="handleClickMoreItem('tribe')"
                  src="@/assets/img/icons/etc/transparent-btn.png"
                  class="items__icon"
                  alt="종족 더보기"
                />
              </li>
            </template>
            <template v-else>
              <li
                v-for="(item, index) in tribes"
                :key="index"
                class="main__item skeleton"
              >
                <Skeleton-Box :width="'44px'" :height="'44px'" class="circle" />
                <Skeleton-Box
                  :width="'52px'"
                  :height="'12px'"
                  :margin="'6px 0 0 0'"
                />
              </li>
            </template>
          </ul>
        </section>

        <section class="main__box">
          <h3 class="title">
            직업
            <span>(12)</span>
          </h3>
          <hr class="line" />
          <ul class="main__items">
            <li
              v-for="(item, index) in jobs"
              v-if="job.isMore && isMobile ? index < 9 : true"
              :key="index"
              class="main__item"
            >
              <img
                :src="require(`@/assets/img/icons/job/${item.imgName}.png`)"
                class="items__icon"
                alt
              />
              <span class="item__icon__name">{{ item.name }}</span>
            </li>
            <li v-if="job.isMore && isMobile" class="main__item">
              <img
                @click="handleClickMoreItem('job')"
                src="@/assets/img/icons/etc/transparent-btn.png"
                class="items__icon"
                alt="직업 더보기"
              />
            </li>
          </ul>
        </section>
      </main>
    </template>

    <Footer :fixed="true" class="footer" />
  </div>
</template>

<script>
import { SYNERGY } from '@/components/const/PageName'
import NavTopMenu from '@/components/nav/NavTopMenu'
import Footer from '@/components/footer'
import TopVisual from '@/components/bg/TopVisual'
import SkeletonBox from '@/components/skeleton/index'
import Tribe from './components/Synergy/Tribe'
import Job from './components/Synergy/Job'

export default {
  head() {
    return {
      meta: []
    }
  },
  components: {
    NavTopMenu,
    Footer,
    TopVisual,
    SkeletonBox,
    Tribe,
    Job
  },
  data() {
    return {
      SYNERGY,
      isMobile: this.$device.isMobile,
      tribe: {
        isMore: true
      },
      job: {
        isMore: true
      },
      tribes: [
        {
          imgName: 'Goblin',
          name: '인간족',
          id: 206
        },
        {
          imgName: 'Insect',
          name: '조류족',
          id: 211
        },
        {
          imgName: 'Cave',
          name: '악마족',
          id: 210
        },
        {
          imgName: 'Dwarf',
          name: '고블린족',
          id: 209
        },
        {
          imgName: 'Glacier',
          name: '야수족',
          id: 202
        },
        {
          imgName: 'Goblin',
          name: '곤충족',
          id: 215
        },
        {
          imgName: 'Insect',
          name: '동굴족',
          id: 201
        },
        {
          imgName: 'Cave',
          name: '해양족',
          id: 205
        },
        {
          imgName: 'Dwarf',
          name: '언데드족',
          id: 204
        },
        {
          imgName: 'Glacier',
          name: '빙하족',
          id: 203
        },
        {
          imgName: 'Goblin',
          name: '용족',
          id: 207
        },
        {
          imgName: 'Insect',
          name: '키라족',
          id: 212
        },
        {
          imgName: 'Cave',
          name: '정령족',
          id: 213
        },
        {
          imgName: 'Dwarf',
          name: '드워프족',
          id: 208
        },
        {
          imgName: 'Glacier',
          name: '신족',
          id: 214
        }
      ],
      jobs: [
        {
          imgName: 'Mech',
          name: '기계'
        },
        {
          imgName: 'Knight',
          name: '기사'
        },
        {
          imgName: 'Druid',
          name: '드루이드'
        },
        {
          imgName: 'Mage',
          name: '마도사'
        },
        {
          imgName: 'Wizard',
          name: '마법사'
        },
        {
          imgName: 'Hunter',
          name: '사냥꾼'
        },
        {
          imgName: 'Priest',
          name: '사제'
        },
        {
          imgName: 'Assassin',
          name: '악마사냥꾼'
        },
        {
          imgName: 'Shaman',
          name: '암살자'
        },
        {
          imgName: 'Warrior',
          name: '전사'
        },
        {
          imgName: 'Warlock',
          name: '주술사'
        },
        {
          imgName: 'Witcher',
          name: '흑마법사'
        }
      ],

      responseRaceKr: null,
      findRaceKrTribeItem: null,
      test: null
    }
  },
  computed: {
    isTribe() {
      return this.$route.query.tribe === 'Y'
    },
    isJob() {
      return this.$route.query.job === 'Y'
    }
  },
  mounted() {
    this.fetchRaceKr()
  },
  methods: {
    async fetchRaceKr() {
      const response = await this.$request({
        url: `${this.$apiHost}/Race-kr.json`
      })

      if (response.status !== 200) {
        console.error('Race-kr api 호출에 실패했습니다.')
        return
      }

      this.responseRaceKr = response.data
      console.log(this.responseRaceKr)
    },
    handleClickTribeItem(id) {
      const findItem = this.responseRaceKr.find((item) => id === item.id)
      this.findRaceKrTribeItem = findItem
      console.log(
        'handleClickTribeItem: ',
        id,
        JSON.parse(JSON.stringify(findItem))
      )
    },
    handleClickMoreItem(name) {
      this[name].isMore = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/pages/base.scss');

h3.title {
  margin-bottom: 6px;
  color: #202d37;
  font-size: 15px;
  font-weight: bold;

  span {
    color: #9aa4af;
    font-size: 14px;
    font-weight: normal;
  }
}
@media (max-width: 767px) {
  h3.title {
    margin-bottom: 8px;
  }
}

.main__box {
  overflow: hidden;
  padding: 12px 14px 8px 10px;
  margin-bottom: 19px;
  background-color: #f7f7f9;
  box-shadow: 0px 8px 12px rgba(219, 224, 228, 0.5);
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
}
.main__items {
  display: flex;
  flex-wrap: wrap;
}
.main__item {
  width: 52px;
  margin-bottom: 16px;
  margin-left: 16px;
  cursor: pointer;

  &.skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.items__icon {
  display: block;
  width: 44px;
  margin: 0 auto;
}
.item__icon__name {
  display: block;
  text-align: center;
  margin-top: 6px;
  color: #9aa4af;
  font-size: 12px;
}

@media (max-width: 767px) {
  .main {
    max-width: 320px;

    .main__box {
      margin-bottom: 6px;
    }
  }
  .main__item {
    margin-top: 10px;
    margin-left: 4px;
  }
  .items__icon {
    width: 34px;
  }
}
</style>
