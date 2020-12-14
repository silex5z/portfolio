<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">선수 상세정보</h2>

      <div class="filter">
        <Icon
          :name="'calender'"
          :width="14"
          :height="14"
          :viewBox="[14, 14]"
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
            </p> </template
        ></v-select>
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
      <v-btn @click="excelDownload" class="btn--xs" icon>
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

    <!-- table -->
    <div class="section__body">
      <v-row class="section__top">
        <NuxtLink to="/player/list" class="link__list">
          <img
            :src="require(`@/assets/images/icon-arrow.svg`)"
            class="rotate180"
            alt=""
          />
          목록으로
        </NuxtLink>
      </v-row>
      <v-row class="section__contents">
        <v-row>
          <v-col class="profile">
            <v-avatar :size="50" class="profile__img">
              <img
                :src="
                  !!practiceRecords.picture
                    ? practiceRecords.picture
                    : require(`@/assets/images/profile_default.png`)
                "
                :alt="practiceRecords.playerName"
              />
            </v-avatar>
            <div class="profile__detail">
              <p class="name">
                <b>{{ practiceRecords.playerName }}</b>
              </p>
              <p class="position">
                <img
                  :src="
                    require(`@/assets/images/icon-position-${practiceRecords.positionType}.svg`)
                  "
                  :alt="practiceRecords.positionType"
                />
              </p>
              <p class="type">
                <b>{{ practiceRecords.playerTypeName }}</b>
              </p>
            </div>
          </v-col>
          <v-col class="summary-summoners">
            <ul class="summoners">
              <li
                v-for="(summoner, idx) in practiceRecords.leagueEntryStats"
                :key="`summoner${idx}`"
              >
                <span class="name">{{ summoner.summmonerName }}</span>
                {{
                  summoner.leagueEntries[summoner.leagueEntries.length - 1]
                    .tierAbbreviation
                }}{{
                  summoner.leagueEntries[summoner.leagueEntries.length - 1]
                    .leagueRank
                }}
                {{
                  summoner.leagueEntries[summoner.leagueEntries.length - 1]
                    .leaguePoints
                }}
                LP
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <h3>전체 게임수, LP</h3>
          <div class="chart">
            <LineChartBox
              :isChartShow="isChartShow"
              :playerChartData="{
                gameStats: practiceRecords.gameStats,
                leagueEntryStats: practiceRecords.leagueEntryStats
              }"
            ></LineChartBox>
          </div>
        </v-row>
        <v-row>
          <v-col v-if="matchAverage" class="matchAverage">
            <h3>전체 게임 킬/승률</h3>
            <div class="contents">
              <div class="matchAverage__graph">
                <Doughnut
                  :width="170"
                  :height="170"
                  :chart-data="chartData"
                  :options="options"
                ></Doughnut>
                <p class="matchAverage__graph__txt">
                  종합 승률<br />
                  <b>{{ matchAverage.winRatio }}%</b>
                </p>
              </div>
              <p class="matchAverage__summary">
                <span class="total">
                  {{ matchAverage.total }}전 {{ matchAverage.win }}승
                  {{ matchAverage.lose }}패</span
                ><br />
                <span class="kda">
                  <b>{{ matchAverage.aveKills }}</b> /
                  <b>{{ matchAverage.aveDeaths }}</b> /
                  <b>{{ matchAverage.aveAssists }}</b> </span
                ><br />
                <span class="kill-ratio"
                  >킬 관여 <b>{{ matchAverage.killRatio }}%</b></span
                >
              </p>
            </div>
          </v-col>
          <v-col class="summoners">
            <h3>같은 팀으로 게임한 소환사들</h3>
            <table class="summoners__table">
              <thead>
                <tr>
                  <th class="text-left" width="190">소환사명</th>
                  <th class="text-center">게임</th>
                  <th class="text-center">승</th>
                  <th class="text-center">패</th>
                  <th class="text-center">승률</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="summorner in mostGames" :key="summorner.name">
                  <td>
                    <b>{{ summorner.summonerName }}</b>
                  </td>
                  <td class="text-center">{{ summorner.total }}</td>
                  <td class="text-center">{{ summorner.win }}</td>
                  <td class="text-center">{{ summorner.lose }}</td>
                  <td class="text-center">
                    <b>{{ summorner.winRatio }}%</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
        <v-row class="champion-record">
          <v-col>
            <h3>챔피언별 기록</h3>
            <ul class="records">
              <li
                v-for="champion in championRecords"
                :key="champion.championId"
                class="record"
              >
                <v-avatar :size="40">
                  <img
                    :src="$dragonService.getChampionSquare(champion.championId)"
                    :alt="$dragonService.getChampion(champion.championId).name"
                  />
                </v-avatar>
                <div class="record-info">
                  <p>
                    <span class="name">
                      <b>{{
                        $dragonService.getChampion(champion.championId).name
                      }}</b>
                    </span>
                    <span class="kda">
                      <b>{{ champion.aveKills }}</b> /
                      <b>{{ champion.aveDeaths }}</b> /
                      <b>{{ champion.aveAssists }}</b></span
                    >
                    <span class="total"
                      >{{ champion.win }}승 {{ champion.lose }}패</span
                    >
                  </p>
                  <div class="champion-record__gauge">
                    <span
                      :style="{
                        width: (champion.win * 100) / champion.total + '%'
                      }"
                      class="champion-record__gauge-bar"
                    ></span>
                  </div>
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row class="matches">
          <h3>매치 목록</h3>
          <MatchList :playerId="playerId"></MatchList>
        </v-row>
      </v-row>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '@/components/ui/Icon'
import MatchList from '@/components/player/MatchList'
import Doughnut from '@/components/chart/Doughnut'
import LineChartBox from '@/components/chart/LineChartBox'

const options = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  responsive: false,
  maintainAspectRatio: false,
  animation: {
    animateRotate: true
  },
  cutoutPercentage: 70
}

export default {
  name: 'PlayerDetail',
  components: { Icon, MatchList, LineChartBox, Doughnut },
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
      },
      // chart
      options
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    chartData() {
      return {
        // lables: [],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: ['#B8BEC4', '#6493EF'],
            data: [100 - this.matchAverage.winRatio, this.matchAverage.winRatio]
          }
        ]
      }
    }
  },
  async asyncData({ req, $axios, params, redirect, $playerService }) {
    const playerId = params.id

    try {
      const [
        { data: practiceRecords },
        { data: mostGames },
        { data: championRecords },
        { data: matchAverage },
        { data: filterList }
      ] = await Promise.all([
        $playerService.getPracticeRecords(playerId),
        $playerService.getMostGames(playerId),
        $playerService.getChampionRecords(playerId),
        $playerService.getAverageState(playerId),
        $playerService.getTableSearchPeriod()
      ])

      return {
        playerId,
        practiceRecords,
        mostGames,
        championRecords,
        matchAverage,
        filterList
      }
    } catch (error) {
      console.log(error)
      redirect('/player/list')
      // redirect('/error')
    }
  },
  mounted() {
    this.$auth.fetchUser()
    this.$nextTick(() => {
      this.isChartShow = true
    })
  },
  methods: {
    excelDownload() {
      alert('준비중입니다.')
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
        const option = [
          this.playerId,
          this.filterValue.start,
          this.filterValue.end
        ]
        const [
          { data: practiceRecords },
          { data: mostGames },
          { data: championRecords },
          { data: matchAverage }
        ] = await Promise.all([
          this.$playerService.getPracticeRecords(...option),
          this.$playerService.getMostGames(...option),
          this.$playerService.getChampionRecords(...option),
          this.$playerService.getAverageState(...option)
        ])

        this.practiceRecords = practiceRecords
        this.mostGames = mostGames
        this.championRecords = championRecords
        this.matchAverage = matchAverage

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
@import '@/assets/scss/pages/playerDetail';
</style>
