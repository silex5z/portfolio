<template>
  <div class="wrapper">
    <nav-top-menu :activeName="LINE_UP" />

    <TopVisual v-if="!searchData.isSearchDetail" :bgClassName="'lineUp'" />

    <main class="main">
      <template v-if="searchData.isSearchDetail">
        <Detail />
      </template>
      <template v-else>
        <h2 class="title">라인업</h2>

        <div class="main__inner">
          <div class="main__inner--left">
            <expansion-button :info="periodInfo" />

            <expansion-button :info="userInfo" />

            <expansion-button :info="roundInfo" />

            <expansion-img-button :info="tribeInfo" />

            <expansion-img-button :info="jobInfo" />
          </div>

          <div class="main__inner--right">
            <template v-if="searchData.isSearch">
              <em class="inner--right__text">총 게임수 : 100만 +</em>
              <HomeTable />
            </template>
            <template v-else>
              <em class="inner--right__text"></em>
              <search-line-up-empty />
            </template>
          </div>
        </div>
      </template>
    </main>

    <Footer :fixed="true" />
  </div>
</template>

<script>
import { LINE_UP } from '@/components/const/PageName'
import NavTopMenu from '@/components/nav/NavTopMenu'
import TopVisual from '@/components/bg/TopVisual'
import ExpansionButton from '@/components/button/Expansion'
import ExpansionImgButton from '@/components/button/ExpansionImg'
import SearchLineUpEmpty from '@/components/notFound/SearchLineUp'
import HomeTable from '@/components/table/Home'
import Footer from '@/components/footer'
import Detail from './components/LineUp/Detail'

export default {
  head() {
    return {
      meta: []
    }
  },
  components: {
    NavTopMenu,
    TopVisual,
    ExpansionButton,
    ExpansionImgButton,
    SearchLineUpEmpty,
    HomeTable,
    Footer,
    Detail
  },
  data() {
    return {
      LINE_UP,
      searchData: {
        isSearch: true,
        isSearchDetail: false
      },
      periodInfo: {
        iconName: 'calender',
        title: '기간',
        buttonNames: ['현재 시즌', '최근3일', '최근7일', '최근28일'],
        picked: '현재 시즌'
      },
      userInfo: {
        iconName: 'user',
        title: '유저',
        buttonNames: ['전체', '킹', '퀸', '룩', '폰', '나이트&비숍'],
        picked: '전체'
      },
      roundInfo: {
        iconName: 'timer',
        title: '라운드',
        buttonNames: [
          '게임종료',
          '11라운드',
          '21라운드',
          '31라운드',
          '41라운드'
        ],
        picked: '게임종료'
      },
      tribeInfo: {
        iconName: 'tribe',
        title: '종족',
        buttonIconNames: [
          'all',
          'Beast',
          'Birds',
          'Cave',
          'Devil',
          'Dragon',
          'Dwarf',
          'Glacier',
          'Goblin',
          'God',
          'Human',
          'Kira',
          'Ocean',
          'Undead',
          'Spirit'
        ],
        picked: 'all'
      },
      jobInfo: {
        iconName: 'job',
        title: '직업',
        buttonIconNames: [
          'all',
          'Druid',
          'Wizard',
          'Priest',
          'Witcher',
          'Assassin',
          'Warlock',
          'Knight',
          'Hunter',
          'Mech',
          'Warrior',
          'Shaman',
          'Mage'
        ],
        picked: 'all'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/pages/base.scss');

.main {
  position: absolute;
  max-width: 1080px;
  padding: 0 0 137px;

  .main__inner {
    display: flex;
    flex-direction: row;
    padding: 0 8px;

    .main__inner--left {
      margin-right: 16px;
    }
    .main__inner--right {
      width: 740px;
      margin: -35px 0 120px;

      .inner--right__text {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        max-width: 740px;
        height: 35px;
        margin: 0 auto -12px;
        color: #9aa4af;
        font-size: 11px;
      }
    }
  }

  @media (max-width: 1280px) {
    .main__inner {
      flex-direction: column;
      width: 756px;
      margin: 0 auto;

      .main__inner--left {
        margin-right: 0;
      }

      .main__inner--right {
        margin-top: 0;
      }
    }
  }

  @media (max-width: 767px) {
    .main__inner {
      width: 100%;

      .main__inner--right {
        width: 100%;
      }
    }
  }
}
</style>
