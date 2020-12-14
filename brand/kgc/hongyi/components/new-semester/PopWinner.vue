<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'winner'"
    :class="`popup__winner--${activeEventName}`"
  >
    <template #header>
      <img
        v-if="activeEventName"
        :src="`${imageUrl}/tit-winner-${activeEventName}.jpg`"
        :alt="
          `${
            activeEventName === 'movie' ? 'event1' : 'event2'
          }  당첨 및 배송 안내`
        "
      />
    </template>

    <template #content>
      <!-- <img :src="`${imageUrl}/txt-winner.jpg`" alt="" /> -->
      <div v-if="winnerList" class="winnerBox">
        <select id="winnerWeek" @change="setWinners" name="winnerWeek">
          <option :value="idx" v-for="(winner, idx) in winnerList" :key="idx"
            >{{ idx + 1 }}차 발표 ({{ winner.date | onlyDate }})</option
          >
        </select>
        <div class="winnerBox__list">
          <ul>
            <li v-for="(winner, idx) in winners" :key="idx">{{ winner }}</li>
          </ul>
        </div>

        <div v-if="activeEventName === 'movie'" class="a11y">
          <p>
            영상 만들기 이벤트에 참여해주셔서 감사합니다. 당첨자는 매주 최대
            20인이 선정됩니다. 당첨자는 매주 1회(화요일) 발표 됩니다.
          </p>
          <ul>
            <li>경품은 발표일 다음 주차의 월요일 일괄 배송됩니다.</li>
            <li>당첨자에게는 SMS를 통해 개별 연락 예정입니다.</li>
            <li>이벤트 경품 배송 종료일까지 제세공과금 처리에 필요한</li>
            <li>
              서류 요청에 대한 회신이 없을 경우 당첨이 취소될 수 있습니다.
            </li>
          </ul>
        </div>
        <div v-else class="a11y">
          <p>
            소중한 후기를 등록해주셔서 감사합니다. 당첨자 발표는 5회에 걸쳐
            진행되며, 총 100인을 추첨합니다.
          </p>
          <ul>
            <li>
              전체 참여자 대상 매주 10명씩 추첨이 진행됩니다. 경품은 발표일 다음
              주차의 월요일 일괄 배송됩니다.
            </li>
            <li>당첨자에게는 SMS를 통해 개별 연락 예정입니다.</li>
            <li>이벤트 경품 배송 종료일까지 제세공과금 처리에 필요한</li>
            <li>
              서류 요청에 대한 회신이 없을 경우 당첨이 취소될 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
      <!-- <img :src="`${imageUrl}/notice-winner.jpg`" alt="" /> -->
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
/* global winnerData */
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopWinner',
  components: { PopBase },
  filters: {
    onlyDate(value) {
      const arr = value.split('(')
      return arr[0]
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://hongyi.s3.amazonaws.com/static/new-semester/winners.js',
          charset: 'utf-8'
        }
      ]
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    activeEventName: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      selectedWeek: 0
      // winnerList: null
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`
    }),
    winnerList() {
      return process.browser
        ? this.activeEventName === 'movie'
          ? winnerData[0]
          : winnerData[1]
        : null
    },
    winners() {
      return this.winnerList[this.selectedWeek].isOpen
        ? this.winnerList[this.selectedWeek].winnerList
        : false
    }
  },
  // mounted() {
  //   if (process.browser) {
  //     window.onNuxtReady((app) => {
  //       console.log(this.activeEventName)
  //       this.winnerList =
  //         this.activeEventName === 'movie' ? winnerData[0] : winnerData[1]
  //     })
  //   }
  // },
  methods: {
    ...mapMutations('popup', ['FORCE_UPDATE']),
    ...mapActions('popup', ['closePop']),
    setWinners(e) {
      const week = parseInt(e.target.value)
      if (!this.winnerList[week].isOpen) {
        alert(
          `당첨자 발표 기간이 아닙니다.\n(${week + 1}차 당첨자 발표는 ${
            this.winnerList[week].date
          }에 진행됩니다.`
        )
        e.target.value = this.selectedWeek
      } else {
        this.selectedWeek = week
      }
    }
  }
}
</script>
