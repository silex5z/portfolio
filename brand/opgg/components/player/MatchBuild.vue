<template>
  <ul class="builds">
    <template v-if="skills">
      <li class="build">
        <div class="build__tit">아이템 빌드</div>
        <ul class="build-items build__content">
          <li
            v-for="(items, time, idx) in totalItems"
            :key="idx"
            class="build-items__group"
          >
            <div v-if="idx > 0" class="arrow">
              <img
                :src="require(`@/assets/images/icon-arrow-build.svg`)"
                alt=""
              />
            </div>
            <div class="inner">
              <ol class="items rounded4">
                <li
                  v-for="(item, itemIdx) in items"
                  :key="`item${itemIdx}`"
                  :class="[item.type === 'ITEM_SOLD' ? 'sold' : '']"
                  class="item"
                >
                  <img
                    :src="$dragonService.getItemSquare(item.itemId)"
                    class="rounded4"
                  />
                  <span
                    v-if="item.count > 1 && item.type !== 'ITEM_SOLD'"
                    class="icon__count"
                    >{{ item.count }}</span
                  >
                  <span v-if="item.type === 'ITEM_SOLD'" class="icon__sold">
                    X
                  </span>
                </li>
              </ol>
              <div class="time">{{ time }}분</div>
            </div>
          </li>
        </ul>
      </li>
      <li class="build">
        <div class="build__tit">스킬 빌드</div>
        <div class="build-skills build__content">
          <ul class="content__side">
            <li v-for="(skill, idx) in skillSide" :key="`side_${skill.key}`">
              <template v-if="skill.isShow">
                <div class="inner">
                  <img
                    :src="$dragonService.getSpellSquare(skillName[idx])"
                    alt=""
                    class="rounded4"
                  />
                  <b>{{ skill.key }}</b>
                </div>

                <div v-if="idx !== skillSide.length - 1" class="arrow">
                  <img
                    :src="require(`@/assets/images/icon-arrow-build.svg`)"
                    alt=""
                  />
                </div>
              </template>
            </li>
          </ul>
          <div class="content__main">
            <table v-if="skillLength" class="skill__table">
              <tr v-for="(skillType, idx) in skillTable" :key="idx">
                <th>
                  <b>{{ skillKeys[idx] }}</b>
                </th>
                <td
                  v-for="(skill, skillIdx) in skillType"
                  :key="`skillType${idx}_${skillIdx}`"
                  :class="[
                    { '-isActive': skill.isActive },
                    { '-isMax': skill.isMax }
                  ]"
                >
                  {{ skill.order }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </li>
      <li class="build">
        <div class="build__tit">룬</div>
        <div v-if="matchBuild && perksData" class="build__content build-perks">
          <!-- 메인 룬 -->
          <div class="perk__box">
            <ul class="perk__list">
              <li>
                <img
                  :src="
                    require(`@/assets/images/perks/${perks.perkPrimaryStyle}_on.png`)
                  "
                  alt=""
                  class="perk__img"
                />
              </li>
              <li
                v-for="(slot, lineIdx) in perksData[perks.perkPrimaryStyle]
                  .slots"
                :key="`primaryPerkSlot${lineIdx}`"
                class="perk"
              >
                <img
                  :src="
                    require(`@/assets/images/perks/${rune.id}_${
                      perks[`perk${lineIdx}`] === rune.id ? 'on' : 'off'
                    }.png`)
                  "
                  v-for="(rune, idx) in slot.runes"
                  :key="`primaryPerk${idx}`"
                  alt=""
                  class="perk__img"
                />
              </li>
            </ul>
            <p class="perk__tit">
              {{ perksData[perks.perkPrimaryStyle].name }}
            </p>
          </div>

          <!-- 서브 룬 -->
          <div class="perk__box">
            <ul class="perk__list">
              <li>
                <img
                  :src="
                    require(`@/assets/images/perks/${perks.perkSubStyle}_on.png`)
                  "
                  alt=""
                  class="perk__img"
                />
              </li>
              <li
                v-for="(slot, lineIdx) in perksData[perks.perkSubStyle].slots"
                :key="`subPerkSlot${lineIdx}`"
                class="perk"
              >
                <!-- 서브 룬은 첫줄 노출 하지 않음 -->
                <template v-if="lineIdx > 0">
                  <img
                    :src="
                      require(`@/assets/images/perks/${rune.id}_${
                        perks.perk4 === rune.id || perks.perk5 === rune.id
                          ? 'on'
                          : 'off'
                      }.png`)
                    "
                    v-for="(rune, idx) in slot.runes"
                    :key="`subPerk${idx}`"
                    alt=""
                    class="perk__img"
                  />
                </template>
              </li>
            </ul>
            <p class="perk__tit">
              {{ perksData[perks.perkSubStyle].name }}
            </p>
          </div>

          <!-- 능력치 파편 -->
          <div class="perk__box stat-perk__box">
            <ul class="perk__list">
              <li
                v-for="(perk, lineIdx) in statPerkList"
                :key="`statPerkSlot${lineIdx}`"
                class="perk"
              >
                <img
                  :src="
                    require(`@/assets/images/perks/${perkId}_${
                      perks[`statPerk${lineIdx}`] === perkId ? 'on' : 'off'
                    }.png`)
                  "
                  v-for="(perkId, idx) in perk"
                  :key="`statPerk${idx}`"
                  alt=""
                  class="perk__img"
                />
              </li>
            </ul>
            <p class="perk__tit">능력치 파편</p>
          </div>
        </div>
      </li>
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
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import {
  // mapKeys,
  chain,
  range,
  map,
  max,
  values
  // keyBy
} from 'lodash'

export default {
  name: 'MatchBuild',
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
    }
  },
  data() {
    return {
      championKey: '', // 챔피언 영문 이름
      skillKeys: ['Q', 'W', 'E', 'R'],
      skillMaxRank: [],
      skillName: [],
      matchBuild: null,
      statPerkList: [
        [5008, 5005, 5007],
        [5008, 5002, 5003],
        [5001, 5002, 5003]
      ]
    }
  },
  computed: {
    ...mapState({
      perksData: (state) => state.dragon.runes
    }),
    perks() {
      if (!this.matchBuild) return null
      return this.matchBuild.rune[0]
    },
    skillMaxRankIndexes() {
      // return mapValues(this.skillMaxRank, (item) => item - 1)
      return this.skillKeys.reduce((obj, key, index) => {
        obj[key] = this.skillMaxRank[index] - 1
        return obj
      }, {})
    },
    skillLength() {
      if (!this.matchBuild) return null
      return this.matchBuild.skills.length
    },
    skills() {
      if (!this.matchBuild) return null

      return chain(this.matchBuild.skills)
        .sortBy('timestamp')
        .map((item, index) => ({
          ...item,
          index
        }))
        .groupBy((item) => this.skillKeys[item.skillSlot - 1])
        .mapValues((item, key) =>
          chain(item)
            .map((item, index) => ({
              ...item,
              isMax: index === this.skillMaxRankIndexes[key]
            }))
            .keyBy('index')
            .value()
        )
        .value()
    },
    skillTable() {
      return this.skillKeys.map((key) =>
        range(this.skillLength).map((index) => {
          const slot = this.skills[key][index]
          return {
            isActive: !!slot,
            order: slot && slot.index + 1,
            isMax: slot && slot.isMax
          }
        })
      )
    },
    skillSide() {
      if (!this.skills) return []

      return chain(this.skills)
        .flatMap((skill, key) => {
          const skillArray = values(skill)
          return {
            key,
            remainCount: this.skillMaxRankIndexes[key] + 1 - skillArray.length,
            index: max(
              map(skill, (item) => {
                return item.index
              })
            ),
            isShow: key !== 'R' && this.championId !== '77' // 우디르 예외처리
          }
        })
        .sortBy(['remainCount', 'index'])
        .value()
    },
    totalItems() {
      if (!this.matchBuild) return null
      return chain(this.matchBuild.items)
        .groupBy('itemId')
        .map((items) => ({ ...items[0], count: items.length }))
        .sortBy('timestamp')
        .groupBy('time')
        .value()
    }
  },
  async mounted() {
    const { id: championKey } = this.$dragonService.getChampion(this.championId)
    const [
      { data: matchBuild },
      {
        data: { data: championData }
      }
    ] = await Promise.all([
      this.$playerService.getMatchBuild(this.opggSummonerId, this.gameId),
      this.$dragonService.getChampionData(championKey)
    ])

    this.championKey = championKey
    this.matchBuild = matchBuild
    this.skillMaxRank = chain(championData[championKey].spells)
      .map((spell) => spell.maxrank)
      .value()
    this.skillName = chain(championData[championKey].spells)
      .map((spell) => spell.image.full)
      .value()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.build {
  &s {
    ul,
    ol {
      padding-left: 0;
    }

    .build {
      &__tit {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 30px;
        color: #57646f;
        font-weight: bold;
        border-top: 1px solid #ebeef0;
        border-bottom: 1px solid #ebeef0;
        &:first-of-type {
          border-top: 0;
        }
      }

      &__content {
        padding: 30px;
      }
    }
  }
}
.build-items {
  padding-bottom: 10px;
  &__group {
    display: inline-flex;
    align-items: top;
    margin-bottom: 17px;
    vertical-align: top;
    .arrow {
      display: inline-flex;
      justify-content: center;
      width: 13px;
      height: 16px;
      margin-top: 7px;
      background: #ebeef0;
    }

    .inner {
      display: inline-flex;
      flex-direction: column;
      flex-shrink: 0;
      .item {
        &s {
          padding: 2px;
          display: inline-flex;
          background: #ebeef0;
        }
        position: relative;
        display: inline-flex;
        width: 28px;
        height: 28px;
        padding: 2px;
        &.sold {
          opacity: 0.6;
        }

        span[class*='icon'] {
          position: absolute;
          bottom: 2px;
          right: 2px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: rgba(87, 100, 111, 0.9);
          width: 12px;
          height: 12px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          // text-align: center;
        }
        .icon {
          &__sold {
            // width: 10px;
            // height: 10px;
          }
          &__count {
            width: 12px;
            height: 12px;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
          }
        }
      }
      .time {
        text-align: center;
      }
    }
  }
}

// 스킬
.build-skills {
  display: flex;
  justify-content: space-between;
  .content__side {
    width: 280px;
    background: #ebeef1;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      display: flex;

      .inner {
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          width: 28px;
        }
        b {
          margin-top: 4px;
          font-size: 14px;
        }
      }
      .arrow {
        margin: 5px 12px 0;
      }
    }
  }
  .content__main {
    width: 550px;
    .skill__table {
      width: 100%;
      th {
        width: 10px;
        text-align: center;
        font-size: 12px;
        padding: 0 20px;
      }
      td {
        width: 30px;
        height: 30px;
        border: 1px solid #ebeef0;
        text-align: center;
        &.-isActive {
          background: #586672;
          color: #fff;
        }
        &.-isMax {
          background: #6493ef;
        }
      }
    }
  }
}

// 룬
.build-perks {
  display: inline-flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  ul {
    padding-left: 0;
  }

  text-align: center;

  .perk__tit {
    margin: 0;
    color: #57646f;
  }
  .perk__box {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    height: 244px;
    padding: 0 70px;

    &:not(:last-child) {
      border-right: 1px solid #ebeef0;
    }
    .perk__img {
      width: 32px;
      margin: 5px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }
  }

  .perk__list {
    width: 168px;
    display: inline-flex;
    // margin: 0 70px;
    flex-direction: column;
    .perk {
      display: inline-flex;
      justify-content: space-between;
    }
  }

  .stat-perk__box {
    .perk__img {
      width: 24px;
      margin: 10px;
    }
    .perk__list {
      margin-top: 42px;
      width: 132px;
    }
  }
}
</style>
