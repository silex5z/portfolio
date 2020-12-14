<template>
  <section class="section">
    <!-- header -->
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">연습 기록 요약</h2>

      <div class="filter">
        <Icon
          :name="'calender'"
          :width="16"
          :height="16"
          :viewBox="[16, 16]"
          :fill="'#D1E1FF'"
        ></Icon>
        <v-select
          :items="filterList"
          v-model="filterValue"
          @change="getRecords"
          item-value="orderby"
          item-text="name"
          hide-details="true"
          single-line
          return-object
          class="ma0 pa0 filter__select"
        >
          <template v-slot:append>
            <p class="filter__date">
              {{ filterValue.start | YYYYMMDD }} ~
              {{ filterValue.end | YYYYMMDD }}
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1" fill="white">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0L3.99994 4L0 0"
                  />
                </mask>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0L3.99994 4L0 0"
                  fill="black"
                  fill-opacity="0.01"
                />
                <path
                  d="M3.99994 4L3.29283 4.7071L3.99993 5.41421L4.70704 4.70711L3.99994 4ZM7.2929 -0.707112L3.29284 3.29289L4.70704 4.70711L8.7071 0.707112L7.2929 -0.707112ZM4.70705 3.2929L0.707112 -0.707101L-0.707112 0.707101L3.29283 4.7071L4.70705 3.2929Z"
                  fill="#d1e1ff"
                  mask="url(#path-1-inside-1)"
                />
              </svg>
            </p>
          </template>
        </v-select>
        <p
          v-text="
            isRefreshReady
              ? this.$auth.user.teamInfo.compareCurrentDate
              : '데이터 요청중'
          "
          class="filter__updated-time"
        ></p>
      </div>
      <v-btn
        id="reloadRiotBtn"
        @click="getRiotSync"
        :class="{ '-disabled': !isRefreshReady }"
        :disabled="!isRefreshReady"
        class="btn__refresh btn--xs"
        icon
      >
        <Icon
          :name="'refresh'"
          :width="14"
          :height="14"
          :viewBox="[14, 14]"
          :fill="'#6493EF'"
        ></Icon>
        <span class="a11y">새로고침</span>
      </v-btn>
      <v-btn @click="getExcel" class="btn--xs" icon>
        <Icon
          :name="'download'"
          :width="14"
          :height="14"
          :viewBox="[14, 14]"
          :fill="'#6493EF'"
        ></Icon>
        <span class="a11y">다운로드</span>
      </v-btn>
    </div>

    <!-- api 키가 등록되지 않았을 때  || 등록된 선수 및 소환사가 없을 때 -->
    <v-card v-if="!hasApiKey || practiceRecords.length === 0" class="no-data">
      <Icon
        :name="'warning'"
        :width="42"
        :height="42"
        :viewBox="[42, 42]"
        :fill="'#C3CBD1'"
      ></Icon>
      <p class="no-data__txt">
        {{
          !hasApiKey
            ? '등록된 API키가 없습니다.'
            : '등록된 선수 및 소환사명이 없습니다.'
        }}
      </p>
      <NuxtLink
        :to="!hasApiKey ? '/setting/data' : '/setting/player'"
        class="btn-table btn-table--sub"
      >
        <span>{{ !hasApiKey ? '데이터 관리' : '선수 추가 및 관리' }}</span>
      </NuxtLink>
    </v-card>

    <!-- 실제 플레이어 카드 -->
    <template v-else>
      <v-card
        v-for="(player, idx) in practiceRecords"
        :key="idx"
        :outlined="true"
        class="player"
      >
        <div class="player__header">
          <div class="profile">
            <v-avatar :size="50" class="profile__img">
              <img
                :src="
                  !!player.picture
                    ? player.picture
                    : require(`@/assets/images/profile_default.png`)
                "
                :alt="player.playerName"
              />
            </v-avatar>
            <div class="profile__detail">
              <p class="name">
                <b>{{ player.playerName }}</b>
              </p>
              <p class="position">
                <img
                  :src="
                    require(`@/assets/images/icon-position-${player.positionType}.svg`)
                  "
                  :alt="player.positionType"
                />
              </p>
              <p class="type">
                <b>{{ player.playerTypeName }}</b>
              </p>
            </div>
          </div>
        </div>
        <div class="chart">
          <p class="chart__tit"><b>게임수, LP</b></p>
          <LineChartBox
            :isChartShow="isChartShow"
            :labelType="filterValue.orderby"
            :playerChartData="{
              gameStats: player.gameStats,
              leagueEntryStats: player.leagueEntryStats
            }"
          ></LineChartBox>
        </div>
      </v-card>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Icon from '@/components/ui/Icon'
import LineChartBox from '@/components/chart/LineChartBox'

export default {
  name: 'Main',
  components: {
    Icon,
    LineChartBox
  },
  data() {
    return {
      // this.$auth.user.teamInfo.status => true가 데이터 요청중일 때
      isRefreshReady: !this.$auth.user.teamInfo.status,
      isChartShow: false,
      filterValue: {
        end: '20201208',
        name: '최근 7일',
        orderby: 1,
        start: '20201201',
        sub: '2020-12-01 ~ 2020-12-08',
        text: 'test1'
      }
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot
    }),
    hasApiKey() {
      return this.$auth.user.teamInfo.apiKey
    }
  },
  async asyncData({ $axios, redirect, $playerService }) {
    try {
      const [
        { data: practiceRecords },
        { data: filterList }
      ] = await Promise.all([
        $playerService.getPracticeRecords(),
        $playerService.getTableSearchPeriod()
      ])

      return {
        practiceRecords,
        filterList
      }
    } catch (error) {
      console.log(error)
      // redirect('/error')
    }
  },
  mounted() {
    this.$auth.fetchUser()
    this.$nextTick(() => {
      this.isChartShow = true
    })
  },
  updated() {
    // console.log(this.practiceRecords)
    // console.log(this.practiceRecords)
  },
  methods: {
    getExcel() {
      this.$playerService.getExcelPracticeRecords(
        this.filterValue.start,
        this.filterValue.end
      )
    },
    getRiotSync() {
      if (!this.isRefreshReady) {
        alert('현재 데이터를 동기화 중입니다.')
        return
      }
      // $('#reloadRiotBtn').attr('disabled', true)
      this.$riotSyncService.get(this.filterValue.start, this.filterValue.end)
      this.isRefreshReady = false
    },
    async getRecords() {
      this.isChartShow = false
      try {
        const {
          data: practiceRecords
        } = await this.$playerService.getPracticeRecords(
          '',
          this.filterValue.start,
          this.filterValue.end
        )
        this.practiceRecords = practiceRecords
        this.isChartShow = true
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/section';

// 선수 카드
.player {
  margin-bottom: 10px;
  padding: 40px 30px;
}
.chart {
  position: relative;
  font-size: 0;
  &__tit {
    position: absolute;
    top: -10px;
    right: 15px;
    font-size: 14px;
    color: #57646f;
  }
}
</style>
