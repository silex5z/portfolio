<template>
  <v-dialog v-model="isShow" persistent max-width="580px">
    <v-btn @click="$emit('close')" icon class="btn__close">
      <v-icon color="#fff">mdi-close</v-icon>
    </v-btn>
    <v-card class="dialog__wrap">
      <v-card-title>
        <span v-if="isEditMode" class="">영상 정보 수정</span>
        <span v-else class="">새 영상 등록</span>
      </v-card-title>
      <v-card-text>
        <v-container v-if="!isEditMode">
          <v-row class="">
            <v-col class="l-col--left">
              <h3 class="l-form__tit">영상 첨부</h3>
            </v-col>
            <v-col class="l-col--right">
              <v-row>
                <v-col>
                  <v-radio-group v-model="uploadType" hide-details="auto" row>
                    <v-radio label="파일 업로드" value="file"></v-radio>
                    <v-radio label="링크 업로드" value="link"></v-radio>
                  </v-radio-group>
                  <v-row class="mt-1">
                    <v-text-field
                      v-if="uploadType === 'link'"
                      v-model="video.youtubeUrl"
                      @focusout="checkVideo"
                      class="l-form__input-text l-input--underlined"
                      placeholder="url"
                      hide-details
                      flat
                    >
                      <template v-slot:append v-if="urlLoading">
                        <v-progress-circular
                          :width="3"
                          :size="20"
                          color="#C3CBD1"
                          indeterminate
                        ></v-progress-circular>
                      </template>
                    </v-text-field>
                    <v-file-input
                      v-else
                      v-model="file"
                      accept="mp4/*"
                      placeholder="mp4 파일 형식, 최대 2GB 제한, 특수문자 미포함"
                      class="l-form__input-file l-input--underlined"
                      hide-details
                      flat
                    ></v-file-input>
                  </v-row>
                  <v-col v-if="uploadType === 'link'" class="l-col--left">
                    {{ videoUrlName }}
                  </v-col>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row class="">
            <v-col class="l-col--left">
              <h3 class="l-form__tit">경기정보</h3>
            </v-col>
            <v-col class="l-col--right">
              <v-row>
                <v-col>
                  <v-row>
                    <label class="l-form__tit">팀 정보/승리팀 선택</label>
                  </v-row>
                  <v-row class="mt-1">
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-radio-group
                            v-model="video.isWinTeam"
                            hide-details="false"
                            row
                            class="radioWrap"
                          >
                            <v-radio label="레드팀 승리" value="red"></v-radio>
                            <v-radio label="블루팀 승리" value="blue"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col class="mr-3">
                          <v-text-field
                            v-model="video.redTeam"
                            class="l-input--underlined"
                            placeholder="레드팀 입력"
                            hide-details="auto"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="video.blueTeam"
                            class="l-input--underlined"
                            placeholder="블루팀 입력"
                            hide-details="auto"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="">
                <v-col cols="6">
                  <label class="l-form__tit">경기 날짜</label>
                  <v-text-field
                    v-model="video.gameDateTime"
                    class="l-input--underlined"
                    placeholder="YYYY-MM-DD HH:MM"
                    hide-details="auto"
                    prepend-icon="mdi-calendar-range"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="">
                <v-col cols="3">
                  <label class="l-form__tit">경기 시간 (선택)</label>
                  <v-text-field
                    v-model="video.gameTermTime"
                    class="l-input--underlined"
                    hide-details="auto"
                    placeholder="MM:SS"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <h3 class="l-form__tit mb-2">경기 내용(선택)</h3>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                :flat="true"
                :outlined="true"
                v-model="video.memo"
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
      <v-divider></v-divider>
      <v-card-actions class="mt-3">
        <v-row class="justify-center">
          <v-btn
            v-if="isEditMode"
            @click="$emit('close')"
            color="#6493EF"
            outlined
            depressed
            class="btn btn--small btn--outline btn__cancel"
          >
            취소
          </v-btn>
          <v-btn
            @click="saveVideo"
            :loading="loading"
            depressed
            color="#6493EF"
            class="btn btn--small btn__complete ml-4"
          >
            {{ isEditMode ? '수정 완료' : '영상 등록' }}
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'
export default {
  name: 'DialogAddVideo',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      uploadType: 'file',
      file: null,
      video: {
        isWinTeam: 'red',
        redTeam: '',
        blueTeam: '',
        gameTermTime: '',
        memo: ''
      },
      checkingYoutubeUrl: false,
      videoUrlName: '',
      loading: false,
      urlLoading: false
    }
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit'
    }
  },
  mounted() {
    if (process.browser) {
      EventBus.$on('modifyVideoInfo', () => {
        this.getVideo()
      })
    }
  },
  methods: {
    getVideo() {
      this.$matchService
        .getVideoDetail(this.$route.params.id)
        .then(({ data: { result, data } }) => {
          if (result === true) {
            this.video = data
            this.video.gameDateTime = this.$moment(
              this.video.gameDateTime
            ).format('yyyy-MM-DD HH:mm')
            this.video.isWinTeam =
              data.winTeam === data.blueTeam ? 'blue' : 'red'
          }
        })
    },
    async saveVideo() {
      if (!this.isEditMode && this.uploadType === 'file') {
        if (!this.file) return alert('영상을 선택해주세요.')
        if (this.file.type !== 'video/mp4') {
          return alert('mp4 영상을 등록해주세요.')
        }
        if (this.file.size > 2147483648) {
          return alert('2GB 이내 mp4 영상을 등록 해주세요.')
        }
        if (/[<|>|:|\\|"|/|||?|*|#|+]/.test(this.file.name)) {
          return alert('파일명에는 특수문자가 포함될 수 없습니다.')
        }
      }

      this.loading = true
      this.dialog = false

      this.video.winTeam =
        this.video.isWinTeam === 'blue'
          ? this.video.blueTeam
          : this.video.redTeam
      try {
        if (this.isEditMode) {
          // 영상 정보 수정
          await this.$matchService
            .updateVideo(this.video)
            .then(({ data: { result } }) => {
              if (result === true) {
                alert('수정되었습니다.')
                EventBus.$emit('refreshVideoDetail')
                this.initData()
              }
            })
        } else if (this.uploadType === 'file') {
          // 새 영상 등록 (mp4)
          const formData = new FormData()
          formData.append('file', this.file)
          formData.append('gameDateTime', this.video.gameDateTime)
          formData.append('gameTermTime', this.video.gameTermTime)
          formData.append('blueTeam', this.video.blueTeam)
          formData.append('redTeam', this.video.redTeam)
          formData.append('winTeam', this.video.winTeam)
          formData.append('memo', this.video.memo)

          await this.$matchService
            .saveVideo(formData)
            .then(({ data: { result } }) => {
              if (result === true) {
                alert('등록되었습니다.')
                this.initData()
                this.file = ''
              }
            })
        } else {
          // 새 영상 등록 (youtube)
          await this.$matchService
            .saveVideoByYoutube(this.video)
            .then(({ data: { result } }) => {
              alert('등록되었습니다.')
              this.initData()
            })
        }
      } catch {}
      this.loading = false
    },
    initData() {
      this.videoUrlName = ''
      this.$emit('close')
      EventBus.$emit('refreshVideoList')
      this.video = {
        isWinTeam: 'red',
        redTeam: '',
        blueTeam: '',
        gameTermTime: '',
        memo: ''
      }
    },
    async checkVideo() {
      if (!this.checkingYoutubeUrl) {
        this.checkingYoutubeUrl = true
        this.videoUrlName = '영상 체크 중..'
        this.urlLoading = true
        await this.$matchService
          .checkVideoUrl({ videoUrl: this.video.youtubeUrl })
          .then(({ data: { result, files } }) => {
            if (result === true) {
              if (files.ext !== 'mp4')
                return alert(
                  `업로드할 수 없는 포맷(${files.ext})의 영상입니다.\nmp4 형식만 가능합니다.`
                )

              if (files.filesize > 2147483648) {
                return alert('2GB 이내로 등록 해주세요.')
              }
              this.videoUrlName = files.title
              this.checkingYoutubeUrl = false

              const duration = (files.duration / 60).toFixed(1)
              const durationByMinutes = duration.split('.')[0]
              const durationBySeconds = duration.split('.')[1]

              this.video.gameTermTime =
                (durationByMinutes < 10 ? '0' : '') +
                durationByMinutes +
                ':' +
                (durationBySeconds < 10 ? '0' : '') +
                durationBySeconds
            }
          })
          .catch(() => {
            this.checkingYoutubeUrl = false
            this.videoUrlName = ''
          })
        this.urlLoading = false
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

#wrap .dialog__wrap {
  background-color: map-get($baseColor, 'gray10');
  padding-bottom: 30px;
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

  .btn__close {
    position: absolute;
    left: calc(50% + 290px);
  }

  .radioWrap {
    .v-radio {
      width: 50%;
      margin-right: 0;
    }
    .v-radio:nth-child(1) {
      // margin-right: 108px;
    }
  }
}
// E: vuetify component reset
</style>
