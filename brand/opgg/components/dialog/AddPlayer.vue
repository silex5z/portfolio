<template>
  <v-dialog v-model="isShow" persistent max-width="580px">
    <v-btn @click="$emit('close')" icon class="btn__close">
      <v-icon color="#fff">mdi-close</v-icon>
    </v-btn>
    <v-card class="dialog__wrap">
      <v-card-title>
        <span v-if="mode !== 'edit'" class="">새 선수 등록</span>
        <span v-else class="">선수 정보 수정</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="">
            <v-col class="l-col--left">
              <h3 class="l-form__tit">선수정보</h3>
            </v-col>
            <v-col class="l-col--right">
              <v-row>
                <v-col cols="8">
                  <label class="l-form__tit">선수 이름/닉네임</label>
                  <v-text-field
                    v-model="player.name"
                    class="l-form__input-text l-input--underlined"
                    placeholder="예) Unnamed (홍길동)"
                    hide-details="false"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="">
                <v-col cols="4">
                  <label class="l-form__tit">선수 분류</label>
                  <v-select
                    :items="itemsPlayer"
                    v-model="player.playerTypeId"
                    item-value="id"
                    item-text="name"
                    label="선택"
                    hide-details="true"
                    single-line
                    class="l-input--underlined"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row class="">
                <v-col cols="4">
                  <label class="l-form__tit">포지션</label>
                  <v-select
                    :items="itemsPosition"
                    v-model="player.positionType"
                    item-value="id"
                    label="선택"
                    hide-details="true"
                    single-line
                    return-object
                    class="l-input--underlined"
                  >
                    <template v-slot:item="{ item }">
                      <img
                        :src="
                          require(`@/assets/images/icon-position-${item.id}.svg`)
                        "
                        class="mr-1"
                        alt=""
                      />
                      {{ item.text }}
                    </template>
                    <template
                      v-if="player.positionType.id != null"
                      v-slot:prepend-inner
                    >
                      <img
                        :src="
                          require(`@/assets/images/icon-position-${player.positionType.id}.svg`)
                        "
                        alt=""
                        style="width:24px"
                      />
                    </template>
                  </v-select>
                </v-col>
              </v-row>

              <v-row class="">
                <v-col cols="8">
                  <label class="l-form__tit">선수 사진 (선택)</label>
                  <v-row>
                    <v-file-input
                      v-model="playerImg"
                      @change="onFileChange"
                      accept="image/*"
                      placeholder="jpg, png 파일 업로드 가능"
                      class="l-form__input-file l-input--underlined"
                      hide-details="false"
                    >
                    </v-file-input>
                    <!-- <label for="playerImgInput" class="ml-auto">
                      <v-btn
                        color="#9AA9C9"
                        class="white--text btn btn--findFile"
                      >
                        파일 찾기
                      </v-btn>
                    </label> -->
                  </v-row>
                  <p class="mt-4">이미지 미리보기</p>
                  <div id="preview" class="previewImg">
                    <img v-if="playerImgPreview" :src="playerImgPreview" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row class="">
            <v-col class="l-col--left">
              <h3 class="l-form__tit">소환사 명</h3>
            </v-col>
            <v-col class="l-col--right">
              <v-row v-if="isShow" class="">
                <template v-for="i in 5">
                  <v-text-field
                    v-if="summonerArr[i - 1] != null"
                    :key="i"
                    v-model="player.summonerArr[i - 1]"
                    :disabled="summonerArr[i - 1] != null"
                    class="l-form__input-text l-col__flex-item l-input--underlined"
                    placeholder="소환사명"
                    hide-details="auto"
                  ></v-text-field>
                  <v-text-field
                    v-if="summonerArr[i - 1] == null"
                    :key="i"
                    v-model="player.summonerArr[i - 1]"
                    class="l-form__input-text l-col__flex-item l-input--underlined"
                    placeholder="소환사명"
                    hide-details="auto"
                  ></v-text-field>
                </template>

                <p class="l-form__notice">
                  *소환사명은 한 선수당 최대 5개까지 등록할 수 있습니다.
                </p>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row class="">
            <v-col class="l-col--left">
              <h3 class="l-form__tit">우선 순위<br />(선택)</h3>
            </v-col>
            <v-col class="l-col--right">
              <v-row class="">
                <v-col cols="8">
                  <v-text-field
                    v-model="player.orderNum"
                    class="l-form__input-text l-col__flex-item l-input--underlined"
                    placeholder="1 ~ 99"
                    hide-details="auto"
                  ></v-text-field>
                  <p class="l-form__notice">
                    *낮은 숫자로 입력하면 대시보드에 먼저 표시됩니다.<br />
                    입력하지 않는 경우 대시보드에 표시되지 않습니다.
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions class="mt-3">
        <v-row v-if="mode === 'edit'" class="justify-center">
          <!-- <v-btn
            @click="dialog = false"
            color="#6493EF"
            outlined
            class="btn btn--cancel"
          >
            선수 삭제
          </v-btn> -->
          <v-btn
            @click="savePlayer"
            :loading="loading"
            depressed
            color="#6493EF"
            class="btn btn--small btn__complete ml-4"
          >
            수정 완료
          </v-btn>
        </v-row>
        <v-row v-else class="justify-center">
          <v-btn
            @click="savePlayer"
            :loading="loading"
            depressed
            color="#6493EF"
            class="btn btn--small btn__register"
          >
            선수 등록
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import Icon from '@/components/ui/Icon'
import { EventBus } from '@/assets/js/event-bus.js'
import _ from 'lodash'
export default {
  name: 'DialogAddPlayer',
  // components: { Icon },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    },
    opggPlayerId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      itemsPlayer: [],
      itemsPosition: [
        { id: 1, text: '탑' },
        { id: 2, text: '정글' },
        { id: 3, text: '미드' },
        { id: 4, text: '바텀' },
        { id: 5, text: '서포터' }
      ],
      playerImg: null,
      playerImgPreview: '',
      summonerArr: [],
      player: {
        summonerArr: [],
        positionType: { id: null, text: null }
      },
      loading: false
    }
  },
  watch: {
    opggPlayerId(value) {
      if (value === null) {
        this.playerImg = null
        this.playerImgPreview = ''
        this.summonerArr = []
        this.player = {
          summonerArr: [],
          positionType: { id: null, text: null }
        }
      } else {
        console.log('////watch')
        this.getPlayer()
      }
    },
    isShow(value) {
      if (value === false) {
        this.player = {
          summonerArr: [],
          positionType: { id: null, text: null }
        }
      }
    }
  },
  created() {
    this.getPlayerTypeList()
  },
  mounted() {},
  methods: {
    onFileChange(e) {
      if (this.playerImg) {
        this.playerImgPreview = URL.createObjectURL(this.playerImg)
      } else {
        this.playerImgPreview = ''
      }
    },
    getPlayer() {
      this.player.summonerArr = []
      this.summonerArr = []
      this.$settingPlayerService
        .getPlayerDetail(this.opggPlayerId)
        .then(({ data: { result, data } }) => {
          if (result === true) {
            this.player = data
            this.summonerArr = _.cloneDeep(this.player.summonerArr)
            this.player.positionType = { id: data.positionTypeId, text: '탑' }
            this.playerImgPreview = this.player.picture
          }
        })
    },
    getPlayerTypeList() {
      this.$settingPlayerService
        .getPlayerTypeList()
        .then(({ data: { result, list } }) => {
          if (result === true) {
            this.itemsPlayer = list
          }
        })
    },
    async savePlayer() {
      this.loading = true

      this.player.summonerArr = this.player.summonerArr.filter(function(item) {
        return item !== null && item !== undefined && item !== ''
      })

      const formData = new FormData()
      if (this.opggPlayerId) {
        formData.append('id', this.opggPlayerId)
      }
      if (this.playerImg) {
        formData.append('file', this.playerImg)
      }
      if (this.playerImgPreview) {
        formData.append('picture', this.playerImgPreview)
      }
      if (this.player.name) {
        formData.append('name', this.player.name)
      }
      if (this.player.playerTypeId) {
        formData.append('playerTypeId', this.player.playerTypeId)
      }
      if (this.player.positionType.id) {
        formData.append('positionTypeId', this.player.positionType.id)
      }
      if (this.player.summonerArr) {
        formData.append('summonerArr', this.player.summonerArr)
      }
      if (this.player.orderNum) {
        formData.append('orderNum', this.player.orderNum)
      }
      if (this.mode === 'edit') {
        await this.$settingPlayerService
          .updatePlayer(formData)
          .then(({ data: { result } }) => {
            if (result === true) {
              this.loading = false

              alert('수정되었습니다.')
              this.player = {
                summonerArr: [],
                positionType: { id: null, text: null }
              }
              EventBus.$emit('refreshPlayerList')
              this.$emit('close')
            }
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        await this.$settingPlayerService
          .savePlayer(formData)
          .then(({ data: { result } }) => {
            if (result === true) {
              this.loading = false

              alert('등록되었습니다.')
              EventBus.$emit('refreshPlayerList')
              this.$emit('close')
              this.playerImg = null
              this.playerImgPreview = ''
              this.player = {
                summonerArr: [],
                positionType: { id: null, text: null }
              }
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// vuetify component reset
#wrap .dialog__wrap .container {
  min-width: auto !important;
}

#wrap .v-card__title {
  background: #ffffff;
  border-bottom: 1px solid #ebeef1;
  font-size: 16px;
  font-weight: 700;
}

#wrap .v-card__text {
  padding: 30px 30px 0;
}

#wrap .v-text-field {
  padding-top: 0;
}

// E: vuetify component reset

.l-col--left {
  flex-basis: 90px;
  flex-grow: 0;
  flex-shrink: 0;
}

.l-col--right > .row {
  margin-bottom: 20px;
}

.l-col {
  display: flex;
  align-items: center;
}

#wrap .l-col__flex-item {
  width: 100px;
  flex-basis: 100px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}

#wrap .dialog__wrap {
  background-color: map-get($baseColor, 'gray10');
  padding-bottom: 30px;
}

.previewImg {
  width: 100px;
  height: 100px;
  padding: 10px;
  background: #f7f7f9;
  position: relative;

  & > img {
    background: #ffffff;
    border-radius: 50%;
    border: 1px solid #ebeef1;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #ebeef1;
    z-index: 1;
  }
}
</style>

<style lang="scss">
// vuetify component reset
#wrap {
  .v-text-field__details {
    position: relative;
    font-weight: 700;
    top: -24px;
  }
  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }

  .l-form__input-file {
    max-width: initial;
  }

  .l-form__input-text {
    max-width: initial;
  }

  .btn__close {
    position: absolute;
    left: calc(50% + 290px);
  }
}
// E: vuetify component reset
</style>
