<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">설정</h2>
    </div>
    <div class="setting__wrap">
      <SettingNav></SettingNav>
      <div class="setting__con player">
        <div class="l-header">
          <div class="l-header--left">
            <h3 class="l-form__tit">등록 선수/소환사</h3>
            <p class="l-form__txt">
              정보를 변경하려면 해당 선수이름/닉네임을 선택하세요.
            </p>
          </div>
          <v-btn
            @click.stop="openDialog('add', null)"
            depressed
            color="#9AA9C9"
            class="btn-table btn-table--xsmall btn__add"
          >
            <img
              :src="require(`@/assets/images/icon-plus.svg`)"
              alt=""
              class="btn__icon--left"
            />
            추가
          </v-btn>
        </div>
        <!-- table -->
        <v-data-table
          :headers="headers"
          :items="playerList"
          :page.sync="page"
          :loading-text="'로딩중...'"
          :items-per-page="itemsPerPage"
          :loading="isTableLoading"
          mobile-breakpoint="0"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:body="{ items }" v-if="playerList.length > 0">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td width="58">{{ item.orderNum }}</td>
                <td :rowspan="item.rowspan" class="type" width="58">
                  <span :class="['tag2', `tag2__${item.playerType.id}`]">
                    {{ item.playerType.name }}
                  </span>
                </td>
                <td width="48">
                  <v-avatar :size="30">
                    <img
                      :src="
                        item.picture
                          ? item.picture
                          : require(`@/assets/images/profile_default.png`)
                      "
                      alt="선수 사진"
                    />
                  </v-avatar>
                </td>
                <td :rowspan="item.rowspan" class="name" width="138">
                  <b @click.stop="openDialog('edit', item.id)">{{
                    item.name
                  }}</b>
                </td>
                <td :rowspan="item.rowspan" class="position" width="88">
                  <img
                    :src="
                      require(`@/assets/images/icon-position-${item.positionTypeValue}.svg`)
                    "
                    :alt="item.positionTypeName"
                  />
                  {{ item.positionTypeName }}
                </td>
                <td width="240">
                  {{ item.summonerNames }}
                </td>
                <td>
                  {{ item.createdDateStr }}
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
            </div>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :total-visible="pageCount"
            :length="pageSize"
            @input="getList"
          ></v-pagination>
        </div>
      </div>
    </div>

    <!-- dialog -->
    <AddPlayer
      :mode="mode"
      :isShow="dialog"
      :opggPlayerId="opggPlayerId"
      @close="
        dialog = false
        opggPlayerId = null
      "
    ></AddPlayer>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '@/assets/js/event-bus.js'

import Icon from '@/components/ui/Icon'
import SettingNav from '@/components/SettingNav'
import AddPlayer from '@/components/dialog/AddPlayer'

export default {
  name: 'SettingPlayers',
  components: { Icon, SettingNav, AddPlayer },
  data() {
    return {
      mode: 'add',
      dialog: false,
      opggPlayerId: null,
      // table
      isTableLoading: false,
      page: 1,
      pageCount: 5,
      pageSize: 0,
      itemsPerPage: 10,
      playerList: [],
      headers: [
        {
          text: '순서',
          align: 'middle',
          sortable: false,
          value: 'orderNum'
        },
        { text: '구분', sortable: false, value: 'playerType' },
        { text: '사진', sortable: false, value: 'picture' },
        { text: '닉네임/이름', sortable: false, value: 'name' },
        { text: '포지션', sortable: false, value: 'positionType' },
        { text: '소환사명', sortable: false, value: 'summonerName' },
        {
          text: '등록일',
          sortable: false,
          value: 'createdDate'
        }
      ]
    }
  },
  created() {},
  mounted() {
    if (process.browser) {
      this.getList()
      EventBus.$on('refreshPlayerList', () => {
        this.mode = 'add'
        this.opggPlayerId = null
        this.getList()
      })
    }
  },
  methods: {
    openDialog(mode, opggPlayerId) {
      this.mode = mode
      this.opggPlayerId = opggPlayerId
      this.dialog = true
    },
    async getList() {
      this.isTableLoading = true
      const params = {
        page: this.page,
        pageSize: this.itemsPerPage
      }
      await this.$settingPlayerService
        .getPlayer(params)
        .then(({ data: { result, list } }) => {
          if (result === true) {
            this.playerList = list.content
            this.pageSize = list.totalPages
          }
        })
      this.isTableLoading = false
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot
    })
  }
}
</script>

<style lang="scss" scoped>
.setting {
  &__wrap {
    display: flex;
    justify-content: space-between;
  }
  &__con {
    flex-direction: column;
    padding: 50px 30px;

    .l-header {
      padding-top: 0;
    }
  }
}

.player {
  // flex-grow: 1;
}

.btn__add {
  width: 94px;
}
</style>
