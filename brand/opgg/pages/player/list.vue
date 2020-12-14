<template>
  <section class="section">
    <!-- header -->
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">선수 목록</h2>

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

      <v-btn class="btn--xs" icon>
        <NuxtLink to="/setting/player">
          <Icon
            :name="'plus'"
            :width="14"
            :height="14"
            :viewBox="[14, 14]"
            :fill="'#6493EF'"
          ></Icon>
          <span class="a11y">선수추가</span>
        </NuxtLink>
      </v-btn>
    </div>

    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="players"
      :page.sync="listCount"
      :items-per-page="listPerPage"
      :loading-text="'로딩중...'"
      @page-count="pageCount = $event"
      :disable-sort="true"
      :loading="isTableLoading"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:body="{ items }" v-if="players.length > 0">
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <template v-if="!!item.rowspan">
              <td :rowspan="item.rowspan" class="type" width="86">
                <span :class="['tag2', `tag2__${item.playerTypeId}`]">
                  {{ item.playerTypeName }}
                </span>
              </td>
              <td :rowspan="item.rowspan" class="name" width="148">
                <NuxtLink
                  v-if="item.summonerName"
                  :to="`/player/${item.opggPlayerId}`"
                  ><b>{{ item.name }}</b>
                </NuxtLink>
                <b v-else>{{ item.name }}</b>
              </td>
              <td :rowspan="item.rowspan" class="position" width="98">
                <img
                  :src="
                    require(`@/assets/images/icon-position-${item.positionType}.svg`)
                  "
                  :alt="item.positionTypeName"
                />
                {{ item.positionTypeName }}
              </td>
            </template>
            <td
              :class="{ '-notFirst': !item.rowspan }"
              class="summorner"
              width="148"
            >
              {{ item.summonerName }}
            </td>
            <td class="tier" width="176">
              <b
                >{{ item.tier | startCase }} {{ item.rank }} ({{
                  item.leaguePoint | currency
                }}LP)</b
              >
            </td>
            <td class="cahmpionList">
              <div v-if="item.latelyChampionList.length > 0" class="champions">
                <v-tooltip
                  v-for="championId in item.latelyChampionList"
                  :key="championId"
                  top
                >
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      :src="`${$dragonService.getChampionSquare(championId)}`"
                      :alt="$dragonService.getChampion(championId).name"
                      class="champion__img"
                    />
                  </template>
                  <span>{{ $dragonService.getChampion(championId).name }}</span>
                </v-tooltip>
              </div>
              <template v-else>최근 7일 연습 챔피언이 없습니다.</template>
            </td>
          </tr>
        </tbody>
      </template>

      <!-- 데이터 없을 때 -->
      <template v-slot:no-data v-else>
        <div class="no-data">
          <Icon
            :name="'warning'"
            :width="42"
            :height="42"
            :viewBox="[42, 42]"
            :fill="'#C3CBD1'"
          ></Icon>
          <p class="no-data__txt">
            등록된 선수 및 소환사명이 없습니다.
          </p>
          <v-btn depressed color="#9AA9C9" class="btn-table btn-table--sub">
            선수 추가 및 관리
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-pagination v-model="listCount" :length="listTotalCount"></v-pagination>
  </section>
</template>

<script>
import { countBy, startCase, toLower } from 'lodash'

import Icon from '@/components/ui/Icon'
import { mapState } from 'vuex'

function fomatting(data) {
  const counts = countBy(data, 'opggPlayerId')
  return data.map((item) => {
    if (counts[item.opggPlayerId]) {
      item.rowspan = counts[item.opggPlayerId]
      delete counts[item.opggPlayerId]
    }
    return item
  })
}

export default {
  name: 'PlyerList',
  components: { Icon },
  data() {
    return {
      // date
      date: {},
      filterList: [
        '최근 7일',
        '최근 28일',
        '현재 패치',
        '9월',
        '8월',
        '7월',
        's2020'
      ],
      filterValue: '',
      // table
      isTableLoading: false,
      listPerPage: 10,
      headers: [
        { text: '구분', align: 'middle', sortable: false, value: 'playerType' },
        { text: '닉네임 (이름)', value: 'name' },
        { text: '포지션', value: 'positionType' },
        { text: '소환사명', value: 'summonerName' },
        { text: '티어(LP)', value: 'tier' },
        { text: '최근 7일 연습 챔피언', value: 'latelyChampionList' }
      ]
    }
  },
  methods: {
    getExcel() {
      this.$playerService.getExcelPlayers()
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    }
    // setDate(){}
  },
  filters: {
    startCase(str) {
      return startCase(toLower(str))
    }
  },
  watch: {
    async listCount(count) {
      this.isTableLoading = true
      try {
        const {
          data: { content: lists }
        } = await this.$playerService.getPlayers(count)
        this.players = fomatting(lists)
      } catch {
        this.$router.push('/error')
      }
      this.isTableLoading = false
    }
  },
  async asyncData({ req, $axios, params, redirect, $playerService }) {
    try {
      const { data: lists } = await $playerService.getPlayers(1)
      return {
        players: lists.content ? fomatting(lists.content) : null,
        listCount: 1,
        listTotalCount: lists.totalPages
      }
    } catch {
      // console.log(error)
      redirect('/error')
    }
  },
  mounted() {
    if (process.browser) {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const today = `${year}-${month}-${day}`
      const recent7days = ` ${year}-${month}-${day - 7} ~ ${today}`
      const recent28days = `${(year, month, day - 44)} ~ ${today}`

      // 날짜 셋팅
      this.date = {
        date,
        today,
        recent7days
      }
      this.filterList = [
        `최근 7일 (${recent7days})`,
        `최근 28일 (${recent28days})`
      ]
      this.filterValue = this.filterList[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/section';

.tier {
  color: #57646f;
}
.champion {
  &s {
    font-size: 0;
  }
  &__img {
    width: 30px;
    &:not(:last-child) {
      margin-right: 6px;
    }
  }
}

.btn--xs {
  a {
    display: inline-flex;
  }
}
</style>
