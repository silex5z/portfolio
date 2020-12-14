<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">설정</h2>
    </div>
    <div class="setting__wrap">
      <SettingNav></SettingNav>
      <div class="setting__con l-form">
        <v-row class="l-form__con">
          <v-col class="l-form__con--left">
            <h3 class="l-form__tit l-height-exception">API키</h3>
          </v-col>
          <v-col class="l-form__con--right">
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="teamInfo.apiKey"
                  class="l-form__input-text l-input--underlined"
                  placeholder="API키를 입력해주세요"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <p class="l-form__notice">
                *API키를 처음 등록하거나 변경하는 경우 소환사 정보를 가져오는 데
                시간이 소요될 수 있습니다.
              </p>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="l-form__con">
          <v-col class="l-form__con--left">
            <h3 class="l-form__tit">서버 상태</h3>
          </v-col>
          <v-col class="l-form__con--right">
            <v-row>
              <div v-if="teamInfo.apiKey === null" class="setting__notice">
                <b>API키를 등록해 주세요</b>
              </div>
              <div v-if="teamInfo.apiKey !== null" class="setting__notice">
                <b
                  :class="[
                    teamInfo.serverStatus === 'SUCCESS'
                      ? 'setting__notice--success'
                      : 'setting__notice--colored'
                  ]"
                  >{{
                    teamInfo.serverStatus === 'NONE'
                      ? 'API키를 등록해 주세요'
                      : teamInfo.serverStatus === 'SUCCESS'
                      ? '좋음'
                      : '처리중'
                  }} </b
                ><br />
                <span class="l-form__notice">
                  {{
                    `최종 갱신: ${this.$moment(
                      this.$auth.user.teamInfo.updatedDate
                    ).format('YYYY-MM-DD HH:MM')}`
                  }}
                </span>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="l-form__con">
          <v-col class="l-form__con--left">
            <h3 class="l-form__tit">날짜 구분</h3>
          </v-col>
          <v-col class="l-form__con--right">
            <v-row>
              <v-col cols="3">
                <v-select
                  :items="items"
                  v-model="teamInfo.divisionDateTime"
                  :placeholder="'00:00'"
                  item-value="value"
                  item-text="time"
                  flat
                  hide-details
                  class="timePicker l-input--underlined"
                ></v-select>
              </v-col>
              <p class="l-form__notice">
                설정한 시각 이전은 전일 연습에 포함됩니다.<br />
                예) 새벽 5시 설정 시, 13일 새벽 4시59분에 시작한 경기는 12일
                연습에 포함됨
              </p>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="l-form__footer">
          <v-btn
            @click="saveTeamInfo"
            depressed
            color="#6493EF"
            medium
            class="btn btn--regular btn__save ml-auto"
          >
            저장
          </v-btn>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
import SettingNav from '@/components/SettingNav'
export default {
  name: 'SettingData',
  components: { SettingNav },
  data() {
    return {
      teamInfo: {
        apiKey: '',
        serverStatus: this.$auth.user.teamInfo.serverStatus,
        divisionDateTime: this.$auth.user.teamInfo.divisionDateTime
      },
      items: [
        { value: 0, time: '00:00' },
        { value: 1, time: '01:00' },
        { value: 2, time: '02:00' },
        { value: 3, time: '03:00' },
        { value: 4, time: '04:00' },
        { value: 5, time: '05:00' },
        { value: 6, time: '06:00' },
        { value: 7, time: '07:00' },
        { value: 8, time: '08:00' },
        { value: 9, time: '09:00' },
        { value: 10, time: '10:00' },
        { value: 11, time: '11:00' },
        { value: 12, time: '12:00' },
        { value: 13, time: '13:00' },
        { value: 14, time: '14:00' },
        { value: 15, time: '15:00' },
        { value: 16, time: '16:00' },
        { value: 17, time: '17:00' },
        { value: 18, time: '18:00' },
        { value: 19, time: '19:00' },
        { value: 20, time: '20:00' },
        { value: 21, time: '21:00' },
        { value: 22, time: '22:00' },
        { value: 23, time: '23:00' }
      ]
    }
  },
  computed: {},
  created() {
    this.$auth.fetchUser()
    if (this.$auth.user.teamInfo.apiKey != null) {
      this.teamInfo.apiKey = this.$auth.user.teamInfo.apiKey
    }
  },
  methods: {
    saveTeamInfo() {
      this.$loginService.saveTeamApiInfo(this.teamInfo).then((res) => {
        if (res.data.result === true) {
          this.$toast.success('저장 되었습니다.', { duration: 3000 })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  &__wrap {
    display: flex;
    justify-content: space-between;
  }
}
.btn__save {
  width: 146px;
  height: 40px;
}

.setting__notice {
  &--success {
    color: map-get($mainColor, 'blue60');
  }

  &--colored {
    color: salmon;
  }
}

#wrap .l-height-exception {
  line-height: 32px;
}
</style>
