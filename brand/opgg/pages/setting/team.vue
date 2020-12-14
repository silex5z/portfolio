<template>
  <section class="section">
    <div class="section__header l-header">
      <h2 class="section__tit opgg--headline2">설정</h2>
    </div>
    <div class="setting__wrap">
      <SettingNav></SettingNav>
      <div class="setting__con l-form">
        <v-row class="l-form__con flex-column">
          <v-row>
            <v-col class="l-form__con--left">
              <h3 class="l-form__tit">팀 프로필</h3>
            </v-col>
            <v-col class="l-form__con--right" cols="5">
              <v-row class="">
                <label class="l-form__label">이름</label>
                <v-text-field
                  v-model="teamInfo.name"
                  class="l-form__input-text l-input--underlined"
                  placeholder="이름을 입력해주세요"
                  hide-details="auto"
                ></v-text-field>
              </v-row>
              <v-row class="">
                <label class="l-form__label">팀 로고 이미지</label>
                <v-row>
                  <v-file-input
                    v-model="teamInfo.logoImg"
                    @change="onFileChange"
                    value=""
                    accept="image/*"
                    placeholder="jpg, png 파일 업로드 가능"
                    class="l-form__input-file l-input--underlined"
                    hide-details="true"
                    flat
                    solo
                  >
                    <template v-slot:selection="{ text }">
                      <span v-if="text">{{ text }}</span>
                      <span v-else>{{
                        teamInfo.logoImg.split('/').slice(-1)[0]
                      }}</span>
                    </template>
                  </v-file-input>
                </v-row>
                <div class="preview">
                  <p class="preview__tit">이미지 미리보기</p>
                  <div class="preview__img">
                    <img
                      v-if="teamInfo.logoImgPreview"
                      :src="teamInfo.logoImgPreview"
                    />
                  </div>
                </div>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="l-form__con--left">
              <h3 class="l-form__tit">선수 분류</h3>
            </v-col>
            <v-col class="l-form__con--right">
              <div class="settiong__playerCategories">
                <v-checkbox
                  v-for="(cat, idx) in playerCategories"
                  v-model="teamInfo.playerType"
                  :value="cat"
                  :label="cat.name"
                  :key="idx"
                  :ripple="false"
                  color="gray"
                  hide-details="auto"
                  class="mb-1"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>
        </v-row>
        <v-row class="l-form__footer">
          <v-btn
            @click="saveInfo"
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
  name: 'Settingteam',
  components: { SettingNav },
  data() {
    return {
      logoImg: '',
      logoImgPreview: '',
      enabled: [],
      playerCategories: [
        { id: 1, name: '1군' },
        { id: 2, name: '2군' },
        { id: 3, name: '3군' },
        { id: 4, name: '아카데미' }
      ],
      teamInfo: {
        name: this.$auth.user.teamInfo.name,
        logoImg: this.$auth.user.teamInfo.logo,
        logoImgPreview: this.$auth.user.teamInfo.logo,
        playerType:
          this.$auth.user.teamInfo.playerTypes == null
            ? []
            : this.$auth.user.teamInfo.playerTypes
      }
    }
  },
  computed: {},
  mounted() {
    console.log(this.$auth.user.teamInfo)
    this.$vuetify.icons.values.checkboxOff = 'mdi-checkbox-blank-outline'
    this.$vuetify.icons.values.checkboxOn = 'mdi-check-box-outline'
  },
  methods: {
    onFileChange(e) {
      if (this.teamInfo.logoImg) {
        this.teamInfo.logoImgPreview = URL.createObjectURL(
          this.teamInfo.logoImg
        )
      } else {
        this.teamInfo.logoImgPreview = ''
      }
    },
    saveInfo() {
      console.log(this.teamInfo)
      if (confirm('수정하시겠습니까 ?')) {
        this.$loginService
          .saveTeamInfo(
            this.teamInfo.name,
            this.teamInfo.logoImg,
            this.teamInfo.playerType,
            this.teamInfo.logoImgPreview
          )
          .then((res) => {
            if (res.data.result === true) {
              this.$auth.fetchUser()
              this.$router.push('/setting/team')
              this.$toast.success('수정되었습니다.', { duration: 3000 })
              // this.teamInfo = this.reset()
            }
          })
      }
    },
    reset() {
      return {
        name: this.$auth.user.teamInfo.name,
        logoImg: this.$auth.user.teamInfo.logo,
        logoImgPreview: this.$auth.user.teamInfo.logo,
        playerType:
          this.$auth.user.teamInfo.playerTypes == null
            ? []
            : this.$auth.user.teamInfo.playerTypes
      }
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

.preview {
  margin-top: -20px;
  &__tit {
    color: #9aa4af;
    font-size: 13px;
    margin-bottom: 0;
  }
  &__img {
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
}

.btn__save {
  // width: 146px;
  // height: 40px;
}
</style>
