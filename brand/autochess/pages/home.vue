<template>
  <div class="wrapper home">
    <nav-top-menu :activeName="HOME" />
    <main class="home__main">
      <h2 class="logo">
        <img src="@/assets/img/icons/logo/logo.png" alt="로고" />
      </h2>

      <TopVisual :bgClassName="'home'" />

      <strong class="text--bottom--left">인기 라인업</strong>
      <strong class="text--bottom--right">최근 3일, 전체티어</strong>
    </main>

    <div class="table__wrap">
      <HomeTable />
    </div>

    <Footer :fixed="true" />
  </div>
</template>

<script>
import { HOME } from '@/components/const/PageName'
import NavTopMenu from '@/components/nav/NavTopMenu'
import HomeTable from '@/components/table/Home'
import Footer from '@/components/footer'
import TopVisual from '@/components/bg/TopVisual'

export default {
  head() {
    return {
      meta: []
    }
  },
  components: {
    NavTopMenu,
    HomeTable,
    Footer,
    TopVisual
  },
  data() {
    return {
      HOME
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/pages/base.scss');

h2.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;

  @media (max-width: 767px) {
    width: 103px;
  }
}

.text--bottom--left,
.text--bottom--right {
  position: absolute;
  bottom: 12px;
}

.text--bottom--left {
  left: 14px;
  color: #fff;
  font-size: 12px;
}
.text--bottom--right {
  right: 16px;
  color: #c3cbd1;
  font-size: 11px;
}

.table__wrap {
  padding-bottom: 137px;
}
</style>
