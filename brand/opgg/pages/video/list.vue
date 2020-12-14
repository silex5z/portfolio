<template>
  <section class="section">
    <!-- header -->
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">영상 목록</h2>

      <v-btn @click.stop="dialog = true" class="btn--xs" icon>
        <Icon
          :name="'plus'"
          :width="14"
          :height="14"
          :viewBox="[14, 14]"
          :fill="'#6493EF'"
        ></Icon>
        <span class="a11y">경기 영상 등록</span>
      </v-btn>
    </div>

    <!-- 테이블 -->
    <v-data-table
      :sort-by="'createDate'"
      :sort-desc="true"
      :headers="headers"
      :loading-text="'로딩중...'"
      :items="videoList"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @update:sort-by="sortBy = $event"
      @update:sort-desc="changeToSortDesc($event)"
      :loading="isTableLoading"
      :header-props="{ sortIcon: 'mdi-menu-up' }"
      mobile-breakpoint="0"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:body="{ items }" v-if="videoList.length > 0">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            @click="$router.push({ path: `/video/${item.id}` })"
          >
            <td width="94">
              <span
                :class="[
                  'tag1',
                  'tag1--small',
                  `tag1__${getStatus(item.status)}`,
                  'ml-auto'
                ]"
              >
                {{ item.statusName }}
              </span>
            </td>

            <td width="178">
              <span
                :class="[
                  'tag3',
                  'tag3--small',
                  `tag3__${item.blueTeam === item.winTeam ? 'win' : 'lose'}`,
                  'mr-2'
                ]"
              >
                {{ item.blueTeam === item.winTeam ? '승리' : '패배' }}
              </span>
              <b> {{ item.blueTeam }}</b>
            </td>
            <td width="178">
              <span
                :class="[
                  'tag3',
                  'tag3--small',
                  `tag3__${item.redTeam === item.winTeam ? 'win' : 'lose'}`,
                  'mr-2'
                ]"
              >
                {{ item.redTeam === item.winTeam ? '승리' : '패배' }}
              </span>
              <b> {{ item.redTeam }}</b>
            </td>
            <td width="240">{{ item.memo }}</td>
            <td width="102" class="text-center">
              {{
                item.gameTermTime
                  ? item.gameTermTime.replace(':', '분 ') + '초'
                  : ''
              }}
            </td>
            <td width="88" class="text-center">
              {{ item.gameDateTime | YYYYMMDD }}
            </td>
            <td width="122" class="text-center">
              {{ item.createDate | YYYYMMDD }}
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
            등록된 영상이 없습니다.
          </p>
          <v-btn
            @click.stop="dialog = true"
            depressed
            color="#9AA9C9"
            class="btn-table btn-table--sub"
          >
            경기 영상 등록
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :total-visible="pageCount"
      :length="pageSize"
      @input="getList"
    ></v-pagination>
    <AddVideo :mode="'add'" :isShow="dialog" @close="dialog = false"></AddVideo>
  </section>
</template>

<script>
import Icon from '@/components/ui/Icon'
import AddVideo from '@/components/dialog/AddVideo'
import { EventBus } from '@/assets/js/event-bus.js'
export default {
  name: 'VideoList',
  components: { Icon, AddVideo },

  data() {
    return {
      // team
      blueTeam: ['1', '2', '3'],
      redTeam: ['1', '2', '3'],
      // modal
      dialog: false,
      // table
      isTableLoading: false,
      page: 1,
      pageCount: 10,
      pageSize: 0,
      itemsPerPage: 20,
      sortBy: 'createDate',
      isDescending: true,
      videoList: [],
      headers: [
        {
          text: '분석상태',
          sortable: false,
          value: 'status'
        },
        { text: '블루팀', value: 'redTeam', sortable: false },
        { text: '레드팀', value: 'blueTeam', sortable: false },
        { text: '경기내용', value: 'memo', sortable: false },
        {
          text: '경기시간',
          value: 'gameTermTime',
          sortable: false,
          align: 'center'
        },
        {
          text: '경기날짜',
          value: 'gameDateTime',
          align: 'center'
        },
        {
          text: '등록일',
          value: 'createDate',
          align: 'center'
        }
      ]
    }
  },
  async asyncData({ redirect, $matchService }) {
    try {
      const params = {
        pageNumber: 1,
        pageSize: 20,
        sort: 'createDate',
        isDesc: true
      }
      const {
        data: { list }
      } = await $matchService.getVideoList(params)
      console.log(list)
      return {
        videoList: list.content,
        pageSize: list.totalPages
      }
    } catch {
      redirect('/error')
    }
  },
  mounted() {
    if (process.browser) {
      EventBus.$on('refreshVideoList', () => {
        this.getList()
      })
    }
  },
  methods: {
    async getList() {
      this.isTableLoading = true
      const params = {
        pageNumber: this.page,
        pageSize: this.itemsPerPage,
        sort: this.sortBy,
        isDesc: this.isDescending
      }
      await this.$matchService
        .getVideoList(params)
        .then(({ data: { result, list } }) => {
          if (result === true) {
            this.videoList = list.content
            this.pageSize = list.totalPages
          }
        })
      this.isTableLoading = false
    },
    changeToSortDesc(event) {
      if (event) {
        this.isDescending = event
        this.getList()
      }
    },
    getStatus(status) {
      if (status === undefined || status === '') {
        return ''
      } else if (status.includes('FAILED')) {
        return 'fail'
      } else {
        return status.toLowerCase()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/section';
#wrap table tr {
  cursor: pointer;
}
</style>
