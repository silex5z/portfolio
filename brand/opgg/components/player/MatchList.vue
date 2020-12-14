<template>
  <div>
    <ul class="matches">
      <li
        v-for="(match, idx) in matches"
        :key="idx"
        :class="{ '-isWin': match.win }"
        class="match"
      >
        <div class="match__summary">
          <div :class="{ '-isWin': match.win }" class="game-state">
            <p class="type">
              <b>솔랭</b>
            </p>
            <p calss="time">
              <span class="time__elapsed">{{ 24 }}시간 전</span>
              <span class="time__date">{{
                match.parseGameCreation | MMDDHHMM
              }}</span>
            </p>
            <p class="result">
              <b class="result__tit">{{ match.win ? '승리' : '패배' }}</b
              ><br />
              <span class="result__time">{{ match.parseGameDuration }}</span>
            </p>
          </div>
          <div class="champion">
            <div class="champion__img circle">
              <img
                :src="$dragonService.getChampionSquare(match.championId)"
                :alt="$dragonService.getChampion(match.championId).name"
              />
            </div>

            <ul class="champion__setting">
              <li class="skill rounded4">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on" class="spell">
                      <img
                        :src="$dragonService.getSpellSquare(match.spell1Id)"
                        :alt="$dragonService.getSpell(match.spell1Id).name"
                      />
                    </div>
                  </template>
                  <span>{{
                    $dragonService.getSpell(match.spell1Id).name
                  }}</span>
                </v-tooltip>
              </li>
              <li class="perk circle">
                <div class="perk perk0">
                  <img
                    :src="
                      require(`@/assets/images/perks/${match.perk0}_on.png`)
                    "
                  />
                </div>
              </li>
              <li class="skill rounded4">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on" class="spell">
                      <img
                        :src="$dragonService.getSpellSquare(match.spell2Id)"
                        :alt="$dragonService.getSpell(match.spell2Id).name"
                      />
                    </div>
                  </template>
                  <span>{{
                    $dragonService.getSpell(match.spell2Id).name
                  }}</span>
                </v-tooltip>
              </li>
              <li class="perk circle">
                <div class="perk">
                  <img
                    :src="
                      require(`@/assets/images/perks/${match.perkSubStyle}_on.png`)
                    "
                  />
                </div>
              </li>
            </ul>
            <p class="champion__name">
              {{ $dragonService.getChampion(match.championId).name }}
            </p>
          </div>
          <div class="kda">
            <p class="kda__point">
              <b>{{ match.kills }}</b>
              <span class="bar">/</span>
              <b class="deaths">{{ match.deaths }}</b>
              <span class="bar">/</span>
              <b>{{ match.assists }}</b>
            </p>
            <p class="kda__detail">
              <span
                >레벨 {{ match.champLevel }}
                <b>{{ match.cs }} ({{ match.cspm }}) CS</b></span
              ><br />
              <span
                ><span class="teamKills"
                  >킬관여 <b>{{ match.teamKills }}%</b></span
                >
                매치 평균
                <b
                  >{{ match.averageTier }} {{ match.averageLeaguePoint }}</b
                ></span
              >
            </p>
          </div>

          <div class="item-detail">
            <ul class="items">
              <li
                v-for="i in 8"
                :key="i"
                :class="i === 8 ? 'circle' : 'rounded4'"
                class="item"
              >
                <button
                  :class="{ '-isWin': match.win }"
                  v-if="i === 8"
                  @click="
                    setDetail(match.opggSummonerId, match.gameId, 'build')
                  "
                  type="button"
                  class="build"
                >
                  <img src="@/assets/images/icon-build.svg" alt="" />
                </button>
                <v-tooltip
                  v-else-if="!!match['item' + i] && match['item' + i] !== 0"
                  top
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on" class="item__img">
                      <img
                        :src="
                          $dragonService.getItemSquare(`${match['item' + i]}`)
                        "
                      />
                    </div>
                  </template>
                  <span>{{
                    $dragonService.getItem(`${match['item' + i]}`).name
                  }}</span>
                </v-tooltip>
              </li>
            </ul>
            <p class="ward-score">
              시야점수 <b>{{ match.visionScore }}</b>
            </p>
          </div>
          <ul class="players">
            <li
              v-for="(player, playerIdx) in match.players"
              :key="playerIdx"
              class="player"
            >
              <div class="champion">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on" class="champion__img circle">
                      <a
                        :href="
                          `https://www.op.gg/summoner/userName=${player.summonerName}`
                        "
                        target="_blank"
                      >
                        <img
                          :src="
                            $dragonService.getChampionSquare(player.championId)
                          "
                        />
                      </a>
                    </div>
                  </template>
                  <span>{{
                    $dragonService.getChampion(player.championId).name
                  }}</span>
                </v-tooltip>
              </div>
              <a
                :href="
                  `https://www.op.gg/summoner/userName=${player.summonerName}`
                "
                :class="{
                  '-isMatch': match.summonerName === player.summonerName
                }"
                target="_blank"
                class="player__name"
              >
                {{ player.summonerName }}
              </a>
            </li>
          </ul>
          <div class="btnBox">
            <!-- <button type="button" class="btn__download-video">
              <Icon
                :name="'video'"
                :width="14"
                :height="10"
                :viewBox="[14, 10]"
                :fill="'#FCFCFC'"
                class="icon"
              ></Icon>
              <span class="a11y">경기 영상 다운로드</span>
            </button> -->
            <button
              @click="setDetail(match.opggSummonerId, match.gameId, 'result')"
              type="button"
              class="btn__show-detail"
            >
              <Icon
                :name="'arrow'"
                :width="14"
                :height="10"
                :viewBox="[14, 10]"
                :fill="'#DBE0E4'"
                class="icon"
              ></Icon>
              <span class="a11y">경기 자세히보기</span>
            </button>
          </div>
        </div>
        <div v-if="currentDetailId === match.gameId" class="match__detail">
          <div class="tabBox">
            <button
              :class="{ '-isActive': currentType === 'result' }"
              @click="setDetail(match.opggSummonerId, match.gameId, 'result')"
              type="button"
            >
              경기결과
            </button>
            <button
              :class="{ '-isActive': currentType === 'build' }"
              @click="setDetail(match.opggSummonerId, match.gameId, 'build')"
              type="button"
            >
              빌드
            </button>
          </div>
          <component
            :is="setDetail(match.opggSummonerId, match.gameId, currentType)"
            :gameId="match.gameId"
            :opggSummonerId="match.opggSummonerId"
            :championId="match.championId"
            :teamKills="match.teamKills"
            :summonerName="match.summonerName"
          ></component>
        </div>
      </li>
    </ul>

    <v-btn
      @click="getMoreMatches"
      v-if="matchPageInfo.totalElements"
      :disabled="matches.length >= matchPageInfo.totalElements"
      :loading="loading"
      depressed
      outlined
      color="#9AA9C9"
      class="btn btn--full btn--outline btn__more"
    >
      <span class="txt"
        >더 보기 ({{ matches.length }}/{{ matchPageInfo.totalElements }})</span
      >
      <Icon
        :name="'arrow'"
        :width="12"
        :height="6"
        :viewBox0="-1"
        :viewBox="[14, 10]"
        :fill="'#6493EF'"
        class="icon"
      ></Icon>
    </v-btn>
  </div>
</template>

<script>
import MatchResult from '@/components/player/MatchResult'
import MatchBuild from '@/components/player/MatchBuild'
import Icon from '@/components/ui/Icon'

export default {
  name: 'MatchList',
  components: { Icon },
  props: {
    playerId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      matches: [],
      matchPageInfo: {
        currentNum: null,
        totalElements: null
      },
      currentType: 'result',
      currentDetailId: ''
    }
  },
  async mounted() {
    const { data: matches } = await this.$playerService.getMatches(
      this.playerId,
      1
    )

    this.matches = matches.content
    this.matchPageInfo = {
      currentNum: 1,
      totalElements: matches.totalElements
    }
  },
  methods: {
    setDetail(opggSummonerId, gameId, type) {
      this.currentDetailId = gameId
      this.currentType = type
      console.log(this.currentDetailId)
      return this.currentType === 'result' ? MatchResult : MatchBuild
    },
    async getMoreMatches() {
      this.loading = true
      try {
        this.matchPageInfo.currentNum++
        const {
          data: { content: list }
        } = await this.$playerService.getMatches(
          this.playerId,
          this.matchPageInfo.currentNum
        )
        this.matches.push(...list)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
      // console.log(this.matches)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn__more {
  .txt {
    margin-right: 10px;
  }
}
.match {
  &es {
    display: flex;
    flex-direction: column;
    padding: 0;

    ul {
      padding: 0;
    }
    p {
      margin-bottom: 0;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #dbe0e4;
  &:last-child {
    margin-bottom: 20px;
  }

  &__summary,
  &__detail {
    display: flex;
    width: 100%;
  }

  &__summary {
    height: 126px;
    align-items: center;
    justify-content: space-between;
    border-left: 4px solid #c4c4c4;
    .game-state {
      // width: 150px;
      margin-left: 26px;
      .type,
      .result__tit {
        font-size: 16px;
      }
      .result {
        &::before {
          display: block;
          margin: 10px 0 12px 0;
          content: '';
          width: 25px;
          height: 1px;
          background: #ebeef0;
        }
        &__tit {
          color: #959a9e;
        }
      }
      .time {
        &__elapsed {
        }
        &__date {
          color: #9aa4af;
        }
      }
    }
    .champion {
      font-size: 0;
      &__img {
        display: inline-block;
        width: 46px;
        height: 46px;
        margin-right: 6px;
      }
      &__name {
        font-size: 12px;
        width: 100%;
        text-align: center;
        margin-top: 8px;
      }
      &__setting {
        display: inline-block;
        width: 48px;
        font-size: 0;
        vertical-align: top;
        li {
          display: inline-flex;
          width: 22px;
          font-size: 0;
          &:nth-child(1),
          &:nth-child(2) {
            margin-bottom: 2px;
          }
          &:nth-child(2n-1) {
            margin-right: 4px;
          }

          .perk {
            border-radius: 50%;
            &0 {
              background: #000;
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .kda {
      &__point {
        font-size: 16px;
        color: #57646f;
        .bar {
          color: #9aa4af;
        }
        .deaths {
          color: #9aa4af;
        }
      }
      &__detail {
        font-size: 12px;
        line-height: 1.5;
        .teamKills {
          color: #959a9e;
        }
      }
    }
    .item {
      // ul
      &s {
        width: 102px;
        font-size: 0;
      }
      //li
      display: inline-flex;
      width: 24px;
      height: 24px;
      margin: 0 2px 2px 0;
      vertical-align: top;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:not(:last-child) {
        background: #dbe0e4;
      }
      .build {
        display: flex;
        justify-content: center;
        align-items: center;
        width: inherit;
        background: #959a9e;
        border: 1px solid #898d90;
        img {
          width: 10px;
        }
      }
      &__img {
        width: inherit;
        height: inherit;
        font-size: 0;
      }

      &-detail {
        .ward-score {
          text-align: center;
        }
      }
    }

    .player {
      &s {
        width: 230px;
      }
      display: inline-flex;
      width: 100px;
      &:nth-child(2n-1) {
        margin-right: 30px;
      }
      &__name {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.-isMatch {
          font-weight: bold;
        }
      }
      .champion {
        // display: inline-flex;
        &__img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .btnBox {
      width: 30px;
      display: flex;
      // justify-content: space-between;
      justify-content: flex-end;
      flex-direction: column;
      height: 100%;
      border-left: 1px solid #ebeef0;
      button {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn {
        &__download-video {
          background: #a1bbed;
          border: 1px solid #96b0e3;
        }
      }
    }
  }

  &__detail {
    flex-direction: column;
    .tabBox {
      border-top: 1px solid #ebeef0;
      border-bottom: 1px solid #ebeef0;
      padding: 9px 0 0 16px;
      button {
        position: relative;
        width: 194px;
        height: 40px;
        color: #57646f;
        background: #ebeef0;
        margin-right: 8px;
        &.-isActive {
          background: #fff;
          border-top: 1px solid #ebeef0;
          border-left: 1px solid #ebeef0;
          border-right: 1px solid #ebeef0;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background: #fff;
          }
        }
      }
    }
  }

  // 이겼을 때 (match)
  &.-isWin {
    .match__summary {
      border-left: 4px solid #6493ef;
      .game-state {
        .result {
          &::before {
            content: '';
            width: 25px;
            height: 1px;
            background: #b6cfff;
          }
          &__tit {
            color: #447ff1;
          }
        }
      }
    }
    .kda {
      &__point {
        color: #202d37;
        .deaths {
          color: #447ff1;
        }
      }
      &__detail {
        .teamKills {
          color: #447ff1;
        }
      }
    }
    .item {
      .build {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #6493ef;
        border: 1px solid #5183e3;
        img {
          width: 10px;
        }
      }
    }
  }
}
</style>
