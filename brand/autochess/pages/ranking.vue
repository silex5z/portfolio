<template>
  <div class="wrapper">
    <nav-top-menu :activeName="RANKING" />

    <TopVisual :bgClassName="'ranking'" />

    <main class="main">
      <template>
        <h2 class="title">랭킹</h2>

        <div class="main__inner">
          <div class="main__inner--left">
            <Expansion-Button :info="periodInfo" />
            <span class="main__inner__text">* 솔로 랭킹만 제공됩니다.</span>
          </div>

          <div class="main__inner--right">
            <em class="inner--right__text">총 게임수 : 100만 +</em>
            <Ranking-Table />
          </div>
        </div>
      </template>
    </main>

    <Footer :fixed="true" />
  </div>
</template>

<script>
import { RANKING } from '@/components/const/PageName'
import NavTopMenu from '@/components/nav/NavTopMenu'
import TopVisual from '@/components/bg/TopVisual'
import ExpansionButton from '@/components/button/Expansion'
import RankingTable from '@/components/table/Ranking'
import Footer from '@/components/footer'

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
    RankingTable,
    Footer
  },
  data() {
    return {
      RANKING,
      searchData: {
        isSearch: true
      },
      periodInfo: {
        iconName: 'calender',
        title: '기간',
        buttonNames: ['현재 시즌', '최근3일', '최근7일', '최근28일'],
        picked: '현재 시즌'
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

    .main__inner__text {
      display: flex;
      justify-content: flex-end;
      color: #c3cbd1;
      font-size: 11px;
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
