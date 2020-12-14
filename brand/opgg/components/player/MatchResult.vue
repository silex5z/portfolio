<template>
  <div class="result">
    <template v-if="!!matchDetail">
      <!-- NOTE: 100(red), 200(blue) -->
      <v-simple-table
        :class="[
          team.teamId === 100 ? 'red-team' : 'blue-team',
          { '-isWin': team.teamPlayers[0].win }
        ]"
        v-for="(team, idx) in matchDetail"
        :key="team.teamId"
        class="match-result-tabel"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center team-type">
                <b>{{ team.teamId === 100 ? '레드팀' : '블루팀' }}</b>
                <span
                  :class="[
                    'tag3',
                    `tag3__${team.teamPlayers[0].win ? 'win' : 'lose'}`
                  ]"
                >
                  {{ team.teamPlayers[0].win ? '승리' : '패배' }}
                </span>
              </th>
              <th class="text-left">소환사명</th>
              <th class="text-center">티어 (LP)</th>
              <th class="text-center">KDA</th>
              <th class="text-center">피해량</th>
              <th class="text-center">와드</th>
              <th class="text-center">CS</th>
              <th class="text-center">아이템</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, playerIdx) in team.teamPlayers"
              :key="playerIdx"
            >
              <td class="champion" width="114">
                <div class="champion__profile">
                  <a
                    :href="
                      `https://www.op.gg/summoner/userName=${player.summonerName}`
                    "
                    target="_blank"
                  >
                    <img
                      :src="$dragonService.getChampionSquare(player.championId)"
                      :alt="$dragonService.getChampion(player.championId).name"
                      class="champion__img"
                    />
                    <span class="champion__level circle">
                      {{ player.champLevel }}
                    </span>
                  </a>
                </div>

                <ul class="champion__setting">
                  <li class="skill rounded4">
                    <img
                      :src="$dragonService.getSpellSquare(player.spell1Id)"
                      :alt="$dragonService.getSpell(player.spell2Id).name"
                    />
                  </li>
                  <li class="rune circle">
                    <img :src="$dragonService.getRuneSquare(player.perk0)" />
                  </li>
                  <li class="skill rounded4">
                    <img
                      :src="$dragonService.getSpellSquare(player.spell2Id)"
                      :alt="$dragonService.getSpell(player.spell2Id).name"
                    />
                  </li>
                  <li class="rune circle">
                    <img
                      :src="
                        $dragonService.getRuneStyleSquare(player.perkSubStyle)
                      "
                    />
                  </li>
                </ul>
              </td>
              <td
                :class="{ currentPlayer: player.summonerName === summonerName }"
                width="120"
                class="name"
              >
                {{ player.summonerName }}
              </td>
              <td class="tear" width="100">
                {{ player.tierAbbreviation }} {{ player.rank }}
                {{ player.leaguePoints }}LP
              </td>
              <td class="kda" width="110">
                <span
                  :class="[
                    `${getKdaClass(
                      calcKDA(player.kills, player.assists, player.deaths)
                    )}`
                  ]"
                >
                  {{
                    player.deaths === 0
                      ? 'Perfect'
                      : calcKDA(player.kills, player.assists, player.deaths)
                  }}
                </span>
                <br />
                {{ player.kills }} / {{ player.deaths }} /
                {{ player.assists }} ({{
                  teamKills === 0
                    ? 0
                    : Math.round((player.kills + player.assists) / teamKills)
                }}%)
              </td>
              <td class="deal " width="100">
                <p class="deal__score">
                  {{ player.totalDamageDealtToChampions }}
                </p>
                <div class="deal__gauge">
                  <span
                    :style="{
                      width:
                        (player.totalDamageDealtToChampions * 100) /
                          maxDamage[idx] +
                        '%'
                    }"
                    class="deal__gauge-bar"
                  ></span>
                </div>
              </td>
              <td class="ward" width="100">
                {{ player.visionWardsBoughtInGame }} /
                {{ player.wardsPlaced }} / {{ player.wardsKilled }} <br />
                <span class="color-grey"
                  >시야점수 {{ player.visionScore }}</span
                >
              </td>
              <td class="cs" width="88">
                {{ player.cs }} <br />
                <span class="color-grey">분당 {{ player.cspm }}</span>
              </td>
              <td class="items" width="206">
                <div v-for="i in 7" :key="i" class="item rounded4">
                  <img
                    v-if="!!player['item' + i] && player['item' + i] !== 0"
                    :src="$dragonService.getItemSquare(`${player['item' + i]}`)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="total">
        <div
          v-for="team in matchDetail"
          :key="`total${team.teamId}`"
          class="total-kills"
        >
          <div class="riftHerald">
            <img
              :src="
                require(`@/assets/images/icon-riftHerald${
                  team.teamPlayers[0].win ? '-win' : ''
                }.svg`)
              "
              alt=""
            />
            <b>{{ team.riftHeraldKills }}</b>
          </div>
          <div class="baron">
            <img
              :src="
                require(`@/assets/images/icon-baron${
                  team.teamPlayers[0].win ? '-win' : ''
                }.svg`)
              "
              alt=""
            />
            <b>{{ team.baronKills }}</b>
          </div>

          <div class="dragon">
            <img
              :src="
                require(`@/assets/images/icon-dragon${
                  team.teamPlayers[0].win ? '-win' : ''
                }.svg`)
              "
              alt=""
            />
            <b>{{ team.dragonKills }}</b>
          </div>

          <div class="tower">
            <img
              :src="
                require(`@/assets/images/icon-tower${
                  team.teamPlayers[0].win ? '-win' : ''
                }.svg`)
              "
              alt=""
            />
            <b>{{ team.towerKills }}</b>
          </div>
        </div>
        <ul class="total-gauge">
          <li>
            <p class="tit">Total Kill</p>
            <p class="team-total team-red">
              <b>{{ matchDetail[0].totalTeamKill }}</b>
            </p>
            <div
              :class="[
                'kill__gauge',
                matchDetail[0].teamPlayers[0].win ? '-redWin' : '-blueWin'
              ]"
            >
              <span
                :style="{
                  width:
                    ((matchDetail[0].teamPlayers[0].win
                      ? matchDetail[0].totalTeamKill
                      : matchDetail[1].totalTeamKill) *
                      100) /
                      (matchDetail[0].totalTeamKill +
                        matchDetail[1].totalTeamKill) +
                    '%'
                }"
                class="kill__gauge-bar"
              ></span>
            </div>
            <p class="team-total team-blue">
              <b>{{ matchDetail[1].totalTeamKill }}</b>
            </p>
          </li>
          <li>
            <p class="tit">Total Gold</p>
            <p class="team-total team-red">
              <b>{{ matchDetail[0].totalGoldEarned | currency }}</b>
            </p>
            <div
              :class="[
                'gold__gauge',
                matchDetail[0].teamPlayers[0].win ? '-redWin' : '-blueWin'
              ]"
            >
              <span
                :style="{
                  width:
                    ((matchDetail[0].teamPlayers[0].win
                      ? matchDetail[0].totalGoldEarned
                      : matchDetail[1].totalGoldEarned) *
                      100) /
                      (matchDetail[0].totalGoldEarned +
                        matchDetail[1].totalGoldEarned) +
                    '%'
                }"
                :class="['gold__gauge-bar']"
              ></span>
            </div>
            <p class="team-total team-blue">
              <b>{{ matchDetail[1].totalGoldEarned | currency }}</b>
            </p>
          </li>
        </ul>

        <!-- <div class="total-red"></div>
        <ul class="total-both"    >
          <li></li>
        </ul>
      <div class="total-blue"></div> -->
      </div>
    </template>
    <template v-else>
      <div class="loading">
        <v-progress-circular
          :width="3"
          color="#C3CBD1"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
import { map, max } from 'lodash'

export default {
  name: 'MatchResult',
  props: {
    gameId: {
      type: Number,
      default: null
    },
    opggSummonerId: {
      type: Number,
      default: null
    },
    championId: {
      type: Number,
      default: null
    },
    teamKills: {
      type: Number,
      default: null
    },
    summonerName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      matchDetail: null
    }
  },
  computed: {
    maxDamage() {
      return this.matchDetail
        ? map(this.matchDetail, (player, i) => {
            const damages = map(
              player.teamPlayers,
              'totalDamageDealtToChampions'
            )
            return max(damages)
          })
        : null
    }
  },
  async mounted() {
    const { data: matchDetail } = await this.$playerService.getMatchResult(
      this.opggSummonerId,
      this.gameId
    )
    this.matchDetail = matchDetail
  },
  methods: {
    calcKDA(kills, assists, deaths) {
      return ((kills + assists) / deaths).toFixed(2)
    },
    getKdaClass(kda) {
      const val = Math.floor(kda)
      switch (val) {
        case 0:
        case 1:
          return 'class1'
        case 2:
          return 'class2'
        case 3:
          return 'class3'
        case 4:
          return 'class4'
        default:
          return 'class5'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// vuetify reset
.result {
  ul {
    padding-left: 0;
  }
  p {
    margin-bottom: 0;
  }
}
.champion {
  font-size: 0;

  &__profile {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 4px;
    vertical-align: top;
    .champion__img {
      width: 100%;
    }
    .champion__level {
      position: absolute;
      left: -4px;
      bottom: -1px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      background: rgba(87, 100, 111, 0.9);
      font-size: 11px;
      font-weight: 400;
      color: map-get($baseColor, 'gray00');
    }
  }

  &__setting {
    display: inline-block;
    width: 34px;
    font-size: 0;
    li {
      display: inline-block;
      width: 16px;
      font-size: 0;
      &:nth-child(1),
      &:nth-child(2) {
        margin-bottom: 2px;
      }
      &:nth-child(2n-1) {
        margin-right: 2px;
      }

      .rune {
        border-radius: 50%;
      }
      img {
        width: 100%;
      }
    }
  }
}

.deal {
  &__gauge {
    margin-top: 4px;
    background: #ebeef0;
  }
}

.item {
  // ul
  &s {
  }
  //li
  display: inline-flex;
  width: 22px;
  height: 22px;
  vertical-align: top;
  background: #dbe0e4;
  &:not(:last-child) {
    margin-right: 2px;
  }
}
// 종합 정보
.total {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  &-kills {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #202d37;
    vertical-align: middle;
    & > div {
      margin: 0 5px;
    }
    img {
      margin-right: 2px;
      vertical-align: middle;
    }
    &:first-of-type {
      order: 1;
    }
    &:last-of-type {
      order: 3;
    }
  }
  &-gauge {
    width: 470px;
    order: 2;
    li {
      width: inherit;
      display: inline-flex;
      align-items: center;
      .tit {
        width: 60px;
      }
      .team-total {
        width: 40px;
        &.team-red {
          text-align: right;
        }
        &.team-blue {
          text-align: left;
        }
      }
      div[class*='__gauge'] {
        width: 300px;
        margin: 0 10px;
        &.-blueWin {
          text-align: right;
        }
      }
    }
  }
}

.kda {
  .class1 {
    color: map-get($baseColor, 'gray60');
  }
  .class2 {
    color: map-get($baseColor, 'gray70');
  }
  .class3 {
    color: map-get($baseColor, 'gray80');
  }
  .class4 {
    color: map-get($subColor, 'steel20');
  }
  .class5 {
    color: map-get($mainColor, 'blue60');
  }
}
</style>

<style lang="scss">
#wrap {
  .match-result-tabel {
    thead {
      th {
        height: 44px;
        .team-type {
          color: #57646f;
        }
      }
    }
    tbody {
      border-left: 8px solid #6493ef;
      border-bottom: 1px solid #dbe0e4;

      tr {
      }
      td {
        height: 54px;
        padding: 0 10px;
        font-size: 12px;
        color: #202d37;
        border: none;
        text-align: center;
        .color-grey {
          color: map-get($baseColor, 'gray60');
        }
        &:first-child {
          padding-left: 30px;
        }
        &:last-child {
          padding-right: 30px;
        }
        &.champion {
          font-size: 0;
        }
        &.name {
          text-align: left;
          &.currentPlayer {
            font-weight: bold;
            color: map-get($mainColor, 'blue70');
          }
        }
      }
    }

    &.-isWin {
    }
  }
}
</style>
