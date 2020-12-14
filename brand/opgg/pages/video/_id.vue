<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">
        영상 분석
      </h2>
    </div>
    <v-card outlined>
      <v-row class="section__top">
        <NuxtLink to="/video/list" class="link__list">
          <img
            :src="require(`@/assets/images/icon-arrow.svg`)"
            class="rotate180"
            alt=""
          />
          목록으로
        </NuxtLink>
      </v-row>
      <v-card-title>
        <span
          :class="[
            'tag3',
            `tag3__${item.blueTeam === item.winTeam ? 'win' : 'lose'}`,
            'mr-2'
          ]"
        >
          {{ item.blueTeam === item.winTeam ? '승리' : '패배' }}
        </span>

        <b>{{ item.blueTeam }}</b>

        <b class="text-body-2 ma-2">VS</b>

        <span
          :class="[
            'tag3',
            `tag3__${item.redTeam === item.winTeam ? 'win' : 'lose'}`,
            'mr-2'
          ]"
        >
          {{ item.redTeam === item.winTeam ? '승리' : '패배' }}
        </span>

        <b>{{ item.redTeam }}</b>
        <b class="text-body-2 ma-2">{{ item.gameDateTime }}</b>
        <span :class="['tag1', 'ml-auto', `tag1__${getStatus(item.status)}`]">
          {{ item.statusName }}
        </span>
      </v-card-title>
      <v-row>
        <video
          id="video"
          v-if="videoStatus !== 'UPLOADING'"
          @timeupdate="videoHandler"
          :src="item.originUrl"
          class="video"
          controls
          preload="auto"
        ></video>
        <div v-else class="video video--placeholder">
          <div class="no-data">
            <Icon
              :name="'upload'"
              :width="37"
              :height="37"
              :viewBox="[37, 37]"
              :fill="'#c3cbd1'"
            >
            </Icon>
            <p class="no-data__txt">영상 업로드 중입니다.</p>
          </div>
        </div>
      </v-row>
      <v-row
        v-if="videoStatus === 'ANALYTICS_COMPLETE'"
        class="justify-center align-center"
      >
        <v-card class="teamTable" flat>
          <div
            class="teamTable__title d-flex flex-column justify-space-between"
          >
            <p class="teamName">{{ item.blueTeam }}</p>
            <span
              @click="toggleVisible('blue', 999)"
              class="teamLabel teamLabel--blue"
              >블루팀</span
            >
          </div>
          <ul v-if="blueTeam" class="playerList">
            <li
              v-for="(p, idx) in blueTeam"
              :key="idx"
              @click="toggleVisible('blue', idx)"
              :class="[
                'playerList__item',
                p.isVisible === false ? '-isDisabled' : ''
              ]"
            >
              <span
                :class="['icon--champion -isMain', `${p.type}`]"
                style="bac"
              ></span>
              <!-- fetchChampion(p.type).name -->
              <span
                v-if="!!$dragonService.getChampionByName(p.type)"
                class="playerList__name"
                >{{ $dragonService.getChampionByName(p.type).name }}</span
              >
            </li>
          </ul>
        </v-card>
        <div
          id="minimap"
          :class="['minimap', minimap.isVisible === true ? '-isActive' : '']"
        >
          <canvas
            id="championContainer-p1"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p2"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p3"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p4"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p5"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p6"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p7"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p8"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p9"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <canvas
            id="championContainer-p10"
            class="minimap__championContainer"
            width="360"
            height="360"
          ></canvas>
          <!-- <ul id="championContainer-p1" class="minimap__championContainer"></ul>
          <ul id="championContainer-p2" class="minimap__championContainer"></ul>
          <ul id="championContainer-p3" class="minimap__championContainer"></ul>
          <ul id="championContainer-p4" class="minimap__championContainer"></ul>
          <ul id="championContainer-p5" class="minimap__championContainer"></ul>
          <ul id="championContainer-p6" class="minimap__championContainer"></ul>
          <ul id="championContainer-p7" class="minimap__championContainer"></ul>
          <ul id="championContainer-p8" class="minimap__championContainer"></ul>
          <ul id="championContainer-p9" class="minimap__championContainer"></ul>
          <ul
            id="championContainer-p10"
            class="minimap__championContainer"
          ></ul> -->
          <ul id="championContainer" class="minimap__championContainer"></ul>
        </div>

        <!-- <ul class="iconHiddenList">
          <li v-for="(champion, idx) in list" :key="idx">
            <span v-if="championJson.data[champion.champion_name]">
              <img
                :src="
                  require(`~/assets/img/champion/${
                    championJson.data[champion.champion_name].image.full
                  }`)
                "
                :alt="championJson.data[champion.champion_name].name"
              />
            </span>
          </li>
        </ul> -->
        <v-card class="teamTable" outlined>
          <div class="teamTable__title">
            <p class="teamName">{{ item.redTeam }}</p>
            <span
              @click="toggleVisible('red', 999)"
              class="teamLabel teamLabel--red"
              >레드팀</span
            >
          </div>
          <ul v-if="redTeam" class="playerList">
            <li
              v-for="(p, idx) in redTeam"
              :key="idx"
              @click="toggleVisible('red', idx)"
              :class="[
                'playerList__item',
                p.isVisible === false ? '-isDisabled' : ''
              ]"
            >
              <span :class="['icon--champion -isMain', `${p.type}`]"></span>
              <span
                v-if="!!$dragonService.getChampionByName(p.type)"
                class="playerList__name"
                >{{ $dragonService.getChampionByName(p.type).name }}</span
              >
            </li>
          </ul>
        </v-card>
      </v-row>
      <v-row
        v-else-if="videoStatus === 'ANALYTICS'"
        class="justify-center mt-3"
      >
        <v-col cols="5" class="text-center">
          <div class="no-data">
            <Icon
              :name="'warning'"
              :width="42"
              :height="42"
              :viewBox="[42, 42]"
              :fill="'#C3CBD1'"
            ></Icon>
            <p class="no-data__txt">미니맵 분석 중입니다.</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <div
          v-if="item.memo"
          v-html="item.memo.replace(/\n/g, '<br/>')"
          class="videoDescription"
        ></div>
        <div
          v-else
          class="videoDescription videoDescription--placeholder"
        ></div>
      </v-row>
      <v-row class="px-8 mb-10">
        <span class="mr-2">등록일</span><b class="mr-3">{{ item.createDate }}</b
        ><span class="mr-2">첨부 영상 </span><b>{{ item.attach }}</b>
      </v-row>
      <v-card-actions class="justify-center mb-15">
        <v-btn
          @click="deleteVideo"
          color="#6493EF"
          outlined
          depressed
          class="btn btn--regular btn--outline btn__delete"
        >
          영상 삭제
        </v-btn>

        <v-btn
          @click="openAddVideo"
          color="#6493EF"
          depressed
          class="btn btn--regular btn__modify ml-4"
        >
          정보 수정
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- popup :: 영상 등록 -->
    <!-- <v-dialog v-model="dialog" persistent max-width="580px">
      <v-card class="dialog__wrap">
        <v-card-title>
          <span class="headline">영상 정보 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="setting__con l-form">
              <v-row class="l-form__con ">
                <v-col class="l-form__con--left">
                  <h3 class="l-form__tit">경기정보</h3>
                </v-col>
                <v-col class="l-form__con--right">
                  <v-row class="">
                    <label class="l-form__label">승리한 팀</label>
                  </v-row>
                  <v-row class="l-form__row">
                    <v-text-field
                      class="l-form__input-text"
                      placeholder=""
                      hide-details="false"
                    ></v-text-field>
                    <v-checkbox
                      :label="'블루팀'"
                      hide-details="false"
                    ></v-checkbox>
                  </v-row>
                  <v-row class="">
                    <label class="l-form__label">경기 날짜</label>
                    <v-text-field
                      class="l-form__input-text"
                      placeholder="YYYY-MM-DD"
                      hide-details="auto"
                      prepend-icon="mdi-calendar-range"
                    ></v-text-field>
                  </v-row>
                  <v-row class="">
                    <label class="l-form__label">경기 시간 (선택)</label>
                    <v-text-field
                      class="l-form__input-text"
                      hide-details="auto"
                      placeholder="HH:MM"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-container>
          <v-container>
            <v-row>
              <h3 class="l-form__tit mt-3">경기 내용(선택)</h3>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  :flat="true"
                  :outlined="true"
                  name="input-7-1"
                  label="경기 내용을 여기에 입력해주세요."
                  value=""
                  solo
                  counter="500"
                  rows="5"
                  class="rounded-0 mt-1"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row class="justify-center">
            <v-btn
              @click="dialog = false"
              color="#6493EF"
              outlined
              class="btn btn--cancel"
            >
              취소
            </v-btn>
            <v-btn
              @click="dialog = false"
              color="#6493EF"
              class="white--text btn btn--complete ml-4"
            >
              수정 완료
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <AddVideo
      :mode="'edit'"
      :isShow="dialog"
      @close="dialog = false"
    ></AddVideo>
  </section>
</template>

<script>
import Icon from '@/components/ui/Icon'
import AddVideo from '@/components/dialog/AddVideo'
// import locationData from '@/assets/location/champion_location.json'
// import ChampionJson from '@/assets/data/champion.json'
import _ from 'lodash'
import { EventBus } from '@/assets/js/event-bus.js'
import Player from '@/assets/js/Player'

export default {
  name: 'VideoList',
  components: { Icon, AddVideo },
  data() {
    return {
      // modal
      dialog: false,
      isMinimapReady: false,
      videoStatus: 'UPLOADING', // UPLOADING // 영상 업로드 중 ANALYTICS  // 분석 중 (미니맵) ANALYTICS_COMPLETE
      // video infomation
      date: null,
      item: {
        analysisStatus: '업로드 중',
        teamRed: {
          teamName: 'DRX',
          isWin: false
        },
        teamBlue: {
          teamName: 'T1',
          isWin: true
        },
        gameContents: '2020 LCK SUMMER SET1 루시안 플레이',
        gameDate: '2020-08-03 13:00',
        gameTime: '30분 25초',
        registrationDate: '2020-09-22 12:33'
      },
      // 경기 분석 영상
      video: {
        player: null
      },
      // 챔피언 리스트
      playersList: [],
      // 미니맵
      minimap: {
        isVisible: false
      },
      // 챔피언 메타 데이터
      championList: [],
      // 영상 현재 시간(초)
      videoIdx: 0,
      customizedList: {},
      blueTeam: [],
      redTeam: [],
      locationData: [],
      blueTeamList: [],
      redTeamList: []
    }
  },
  watch: {
    videoIdx(newVal, oldVal) {
      // console.log('watch')
      /* if (newVal - oldVal !== 1 || newVal - oldVal < 1 || newVal === 0) {
        this.reInitMinimap(newVal)
      } else {
        // console.log(newVal)
        this.renderMinimap(newVal)
      } */
      this.renderMinimap(newVal)
    }
  },
  async asyncData({ params, redirect, $moment, $matchService }) {
    try {
      const {
        data: { result, data: item }
      } = await $matchService.getVideoDetail(params.id)
      if (result === false) {
        return redirect('/video/list')
      }
      item.gameDateTime = $moment(item.gameDateTime).format('yyyy-MM-DD HH:mm')
      item.createDate = $moment(item.createDate).format('yyyy-MM-DD')
      return {
        item,
        videoStatus: item.status
      }
    } catch {
      return redirect('/error')
    }
  },
  created() {},
  mounted() {
    if (this.item.minimapUrl) {
      this.setMinimap()
    }
    EventBus.$on('refreshVideoDetail', () => {
      console.log('요기탐?')
      this.getVideoData()
    })

    // this.reInitMinimap()
    /* this.$nextTick(() => {
      console.log(this.blueTeam)
    }) */
  },
  methods: {
    /* testApi(flag) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (flag) {
            resolve('success')
          } else {
            reject(new Error('fail'))
          }
        }, 1000)
      })
    }, */
    addCssRules() {
      const url = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/'
      let css = ''

      this.championList.map((val, idx) => {
        css += `.icon--champion.${val.champion_name} { background: url( ${url}${val.champion_name}.png); background-size: cover; }`
      })

      const head = document.head || document.getElementsByTagName('head')[0]
      const style = document.createElement('style')

      head.appendChild(style)

      style.type = 'text/css'
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }
    },
    getStatus(status) {
      if (status === undefined || status === '') {
        return ''
      }
      switch (status) {
        case 'UPLOADING':
          return 'uploading'

        case 'ANALYTICS':
          return 'analysing'

        case 'ANALYTICS_COMPLETE':
          return 'complete'
      }
    },
    toggleVisible(team, idx) {
      // console.log('test')
      // const index = team === 'blue' ? 0 : 5
      if (idx === 999) {
        const boolean = this[`${team}Team`].some((val) => {
          return val.isVisible === false
        })
        this[`${team}Team`].forEach((val) => {
          val.isVisible = boolean
          val.setVisibility(boolean)
        })

        // if (team === 'blue') {
        //   this.playersList.map((val, idx) => {
        //     /* if (idx < 5) {
        //       val.setVisibility(boolean)
        //     } */
        //     if (val.team === 'blue') {
        //       val.setVisibility(boolean)
        //     }
        //   })
        // } else {
        //   this.playersList.map((val, idx) => {
        //     if (val.team === 'red') {
        //       val.setVisibility(boolean)
        //     }
        //   })
        // }
      } else {
        this[`${team}Team`][idx].isVisible = !this[`${team}Team`][idx].isVisible
        // const index = team === 'blue' ? 0 : 5
        this[`${team}Team`][idx].setVisibility(
          this[`${team}Team`][idx].isVisible
        )
        /* this.playersList[index + idx].setVisibility(
          this[`${team}Team`][idx].isVisible
        ) */
      }

      /* const isTrue = boolean === true
      this.playersList.map((val, idx) => {
        if (idx < 5) {
          // console.log(isTrue)
          val.setVisibility(isTrue)
        } else {
          val.setVisibility(!isTrue)
        }
      }) */
      // const test = document.querySelector('#championContainer').childNodes
    },
    videoHandler(e) {
      this.videoIdx = Math.floor(e.target.currentTime)
    },
    reInitMinimap(videoIdx) {
      // console.log(videoIdx, 'vidieoasdfoiasod')
      this.playersList.map((val, idx) => {
        val.reInitParentElement(videoIdx)
      })
    },
    initMinimap() {
      // 챔피언 리스트로 미니맵 초기화
      this.championList.map((val, idx) => {
        const index = idx + 1
        this.playersList[idx] = new Player(
          `p${index}`,
          val.champion_name,
          val.team_id === 100 ? 'blue' : 'red',
          this.customizedList[index]

          // idx > 4 ? 360 : 0,
          // idx > 4 ? 0 : 360
        )
        // for (let i = 0; i < 360; i++) {
        //   this.minimap.playersList[idx].makeDomElement(i)
        // }
        // val.isVisible = true

        /* if (val.team_id === 200) {
          const player = new Player(
            `p${val.participant_id}`,
            val.champion_name,
            'red',
            this.customizedList[val.participant_id]
          )
          this.redTeamList.push(player)
        } else {
          const player = new Player(
            `p${val.participant_id}`,
            val.champion_name,
            'blue',
            this.customizedList[val.participant_id]
          )
          this.blueTeamList.push(player)
        } */
      })

      // TODO: 개발중 임의로 팀 나눔
      this.redTeam = this.playersList.filter((val, idx) => {
        val.isVisible = true
        return val.team === 'red'
      })

      // TODO: 개발중 임의로 팀 나눔
      this.blueTeam = this.playersList.filter((val, idx) => {
        val.isVisible = true
        return val.team === 'blue'
      })

      this.playersList.map((val, idx) => {
        val.init()
      })
    },
    renderMinimap(videoIdx) {
      // this.playersList.map((val, idx) => {
      /* if (this.coordinateList[videoIdx].minimap === false) {
          return false
        } else {
          this.minimap.isVisible = true
        }
        const player = this.coordinateList[videoIdx].champion_location[idx]
        const id = val.id.replace('p', '')
        const partcipantId = player.participant_id
        // console.log(player)
        if (parseInt(id) === partcipantId) {
          // console.log('test')

          const x = player.x_mid_adj === null ? null : player.x_mid_adj * 360
          const y = player.y_mid_adj === null ? null : player.y_mid_adj * 360
          val.updateCoordinate(x, y)
        } */
      // val.addDomElement(videoIdx)
      // val.updateMainElement(videoIdx)
      // })

      for (let i = 0; i < this.playersList.length; i++) {
        // this.playersList[i].addDomElement(videoIdx)
        this.playersList[i].renderCanvas(videoIdx)
        this.playersList[i].updateMainElement(videoIdx)
      }
    },
    filterCoordinateData() {
      const resArr = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': []
      }

      _.map(this.coordinateList, function(o) {
        _.map(o.champion_location, function(obj) {
          resArr[obj.participant_id].push(obj)
        })
      })

      return resArr
    },
    getVideoData() {
      // console.log(this.$route.params.id)
      this.$matchService
        .getVideoDetail(this.$route.params.id)
        .then(({ data: { result, data: item } }) => {
          if (result === true) {
            this.item = item
            // console.log(this.item)
            this.videoStatus = this.item.status
            this.item.gameDateTime = this.$moment(
              this.item.gameDateTime
            ).format('yyyy-MM-DD HH:mm')
            this.item.createDate = this.$moment(this.item.createDate).format(
              'yyyy-MM-DD'
            )
            if (this.item.minimapUrl) {
              this.setMinimap()
            }
          } else {
            alert('해당 영상이 존재하지 않습니다.')
            // console.log(this.$route)
          }
        })
    },
    deleteVideo() {
      if (!confirm('해당 영상을 삭제하시겠습니까?')) return
      this.$matchService
        .deleteVideo(this.$route.params.id)
        .then(({ data: { result } }) => {
          if (result === true) {
            alert('삭제되었습니다.')
            this.$router.push({ path: '/video/list' })
          }
        })
    },
    setMinimap() {
      const self = this

      // minimap s3 data load
      const req = new XMLHttpRequest()
      req.open('GET', this.item.minimapUrl)
      req.send()
      req.onload = function() {
        // console.log('////// minimap loaded')
        self.locationData = JSON.parse(req.responseText)
        // console.log(self.locationData)

        self.championList = self.locationData.metadata // 미니맵 챔피언 데이터
        self.coordinateList = self.locationData.data
        self.customizedList = self.filterCoordinateData()

        if (self.videoStatus === 'ANALYTICS_COMPLETE') {
          self.initMinimap()
          // console.log('complete')
        }
        self.addCssRules()
      }
    },
    openAddVideo() {
      this.dialog = true
      EventBus.$emit('modifyVideoInfo')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/section';
@import '@/assets/scss/pages/video';
</style>

<style lang="scss" scoped>
#wrap .minimap__championContainer {
  padding: 0;
}

/* #wrap .l-form__con--left {
  margin-left: 0;
}

#wrap .l-form__con--right {
  .row {
    margin-bottom: 10px;
  }

  .row:nth-child(1) {
    margin-bottom: 0;
  }
}

#wrap .l-form__row {
  flex-direction: row;
  align-items: center;
}

#wrap .v-input--selection-controls {
  margin-top: 0;
}

#wrap .container {
  min-width: auto !important;
}

#wrap .dialog__wrap {
  background: #fcfcfc;
} */
</style>
