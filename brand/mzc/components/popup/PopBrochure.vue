<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'brochure'"
    :width="1000"
  >
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">브로셔 다운로드</h2>
      </header>
      <div class="popup__content">
        <div class="tabBox">
          <button
            :class="[
              'btn',
              'eng',
              'btn--white',
              $device.isMobile ? 'btn--long' : 'btn--medium',
              { '-isActive': currentCategory === 'mzc' }
            ]"
            type="button"
            @click="currentCategory = 'mzc'"
          >
            <span>MegazoneCloud</span>
          </button>
          <button
            :class="[
              'btn',
              'eng',
              'uppercase',
              'btn--white',
              $device.isMobile ? 'btn--long ' : 'btn--medium ',
              { '-isActive': currentCategory === 'partner' }
            ]"
            type="button"
            @click="currentCategory = 'partner'"
          >
            <span>partner</span>
          </button>
        </div>

        <ul v-show="currentCategory === 'mzc'" class="mzc">
          <li
            :class="{ '-isActive': currentIdx === 0 }"
            class="mzc__list"
            @click="currentIdx = 0"
          >
            <h2 class="mzc__tit">
              2020 메가존클라우드
              <Icon
                :name="'triangle'"
                :fill="currentIdx === 0 ? '#fff' : '#999'"
              ></Icon>
            </h2>
            <dl class="mzc__contents">
              <dt>
                2020 회사 소개 브로셔
              </dt>
              <dd>
                <a
                  id="downloadBrochureForMegazone"
                  class="btn btn--medium eng"
                  download
                  :href="
                    `${urlRoot}/download/brochure/mzc/MegazoneCloud_Brochure.pdf`
                  "
                >
                  <span>
                    <Icon :name="'download'" class="btn__icon"></Icon>
                    Download
                  </span>
                </a>
              </dd>
            </dl>
          </li>
          <li
            :class="{ '-isActive': currentIdx === 1 }"
            class="mzc__list"
            @click="currentIdx = 1"
          >
            <h2 class="mzc__tit">
              서비스별 상세보기
              <Icon
                :name="'triangle'"
                :fill="currentIdx === 1 ? '#fff' : '#999'"
              ></Icon>
            </h2>
            <div class="table__wrap">
              <table class="table mzc__contents">
                <tbody>
                  <tr>
                    <th class="table__tit" rowspan="3">데이터 서비스</th>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>DATALAKE 125</p>
                        <a
                          id="downloadBrochureForDATALAKE"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_DATALAKE 125_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>CubeAI</p>
                        <a
                          id="downloadBrochureForCubeAI"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_CubeAI.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>ESIS</p>
                        <a
                          id="downloadBrochureForESIS"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_ESIS_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>ESMS</p>
                        <a
                          id="downloadBrochureForESMS"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_ESMS_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>3ARC</p>
                        <a
                          id="downloadBrochureFor3ARC"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_3ARC_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>Any2R</p>
                        <a
                          id="downloadBrochureForAny2R"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_Any2R_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th class="table__tit" rowspan="2">보안/교육 서비스</th>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>Hybrix 보안 포탈</p>
                        <a
                          id="downloadBrochureForHybrix"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_Hybrix 보안 포탈_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>Cloud Security</p>
                        <a
                          id="downloadBrochureForCloudSecurity"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_Could Security_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>Cloud Training Center</p>
                        <a
                          id="downloadBrochureForCloudTrainingCenter"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_Cloud Training Center_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list"></td>
                  </tr>
                  <tr>
                    <th class="table__tit" rowspan="1">미디어 서비스</th>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>CloudPlex Media</p>
                        <a
                          id="downloadBrochureForCloudPlexMedia"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_CloudPlex Media_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list"></td>
                  </tr>
                  <tr>
                    <th class="table__tit" rowspan="1">파트너사 협업 서비스</th>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>SAP on Cloud</p>
                        <a
                          id="downloadBrochureForSAP"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_SAP on Cloud_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                    <td class="table__list">
                      <div class="table__list__inner">
                        <p>VMware Cloud on AWS</p>
                        <a
                          id="downloadBrochureForVMware"
                          download
                          :href="
                            `${urlRoot}/download/brochure/mzc/MegazoneCloud_VMware Cloud on AWS_Brochure.pdf`
                          "
                          class="btn btn__view"
                        >
                          <span class="uppercase">view</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>

        <div v-show="currentCategory === 'partner'" class="partner">
          <vue-scroll :ops="vueScrollOpts">
            <ul>
              <li v-for="(partner, idx) in partners" :key="idx">
                <div class="partner__logo">
                  <img :src="`${imageUrl}/partners/${partner.logo}`" alt />
                </div>
                <p class="partner__desc" v-html="partner.desc"></p>
                <div class="btnBox">
                  <a
                    :id="`downloadBrochureFor${partner.brochure}`"
                    :class="['btn', 'btn__download', 'btn--small']"
                    :href="
                      `${urlRoot}/download/brochure/partners/${partner.brochure}`
                    "
                    download
                  >
                    <span>
                      <Icon :name="'download'" class="btn__icon"></Icon>
                      다운로드
                    </span>
                  </a>
                  <!-- <button
                    type="button"
                    class="btn btn--small btn__consultation"
                  >
                    <span>상담신청</span>
                  </button>-->
                </div>
              </li>
            </ul>
          </vue-scroll>
        </div>
      </div>
    </template>
  </PopBase>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'
import Icon from '@/components/ui/Icon'

import PopBase from '@/components/shared/PopBase'
import partners from '@/assets/js/partners.json'

import { mapState } from 'vuex'

export default {
  name: 'PopBrochure',
  components: { Icon, PopBase },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      vueScrollOpts: {
        bar: {
          keepShow: true
        }
      },
      currentCategory: 'mzc',
      currentIdx: 0,
      partners
    }
  },
  computed: {
    ...mapState({
      urlRoot: (state) => state.urlRoot,
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  watch: {
    isShow(isShow) {
      if (!isShow) {
        this.resetData()
      } else {
        EventBus.$on('setBrochure', (category) => {
          this.currentCategory = category
        })
      }
    }
  }
}
</script>

<style lang="scss">
.popup__brochure .popup__dialog {
  @include breakpoint('pc') {
    height: 715px;
  }
}
</style>
<style lang="scss" scoped>
.mzc {
  &__list {
    @include breakpoint() {
      height: 68px;
    }
    @include breakpoint('pc') {
      height: 60px;
    }

    color: #999;
    overflow: hidden;
    transition: all 0.5s ease;
    &:first-child {
      @include breakpoint() {
        @include background(
          map-get($mzc, 'image-url') + '/img_cloud_brochure_m.png',
          $position: 0 72px
        );
      }
      @include breakpoint('pc') {
        @include background(
          map-get($mzc, 'image-url') + '/img_cloud_brochure.png',
          $position: 198px 138px
        );
      }

      .mzc__contents {
        @include breakpoint() {
          height: 468px;
          padding: 245px 0 0 280px;
        }
        @include breakpoint('pc') {
          width: 222px;
          margin: 242px 0 0 600px;
        }
        text-align: center;
        dt {
          font-size: 24px;
          margin-bottom: 23px;
          letter-spacing: -0.6px;
        }
        .btn__icon {
          width: 24px;
        }
        .btn--medium {
          display: inline-block;
          @include breakpoint() {
            width: 220px;
          }
          @include breakpoint('pc') {
            width: 180px;
          }
        }
      }
    }

    // 활성화
    &.-isActive {
      color: #fff;
      @include breakpoint() {
        // height: 540px;
        height: fit-content;
      }
      @include breakpoint('pc') {
        height: 500px;
      }
      border-top: 1px solid #888;
      .mzc__tit {
        svg {
          opacity: 1;
          transform: rotate(0);
        }
      }

      &:last-child {
        border-bottom: none;
        .mzc__tit {
          border-bottom: 0;
        }
      }
    }
  }
  &__tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    cursor: pointer;
    @include breakpoint() {
      height: 68px;
      line-height: 68px;
      padding: 0 20px;
      font-size: 26px;
    }
    @include breakpoint('pc') {
      height: 60px;
      line-height: 60px;
      padding: 0 30px;
      font-size: 16px;
    }

    svg {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
  }
}

.table {
  border-collapse: collapse;
  border-spacing: 0;
  @include breakpoint() {
    // height: 735px;
    height: fit-content;
    font-size: 22px;
    margin-bottom: 4px;
  }
  @include breakpoint('pc') {
    font-size: 16px;
  }
  font-weight: $font-light;

  &__tit {
    width: 362px;
    color: #fff;
    border: 1px solid #333;
    text-align: center;
    vertical-align: middle;
    word-break: normal;
  }
  @include breakpoint() {
    &__wrap {
      // height: calc(540px - 70px);
      height: fit-content;
      overflow-y: scroll;
    }
    tr:last-child:last-child {
      border-bottom: 1px solid #333;
    }
  }
  &__list {
    @include breakpoint() {
      float: left;
      border-top: 1px solid #333;
      border-right: 1px solid #333;
    }
    @include breakpoint('pc') {
      border: 1px solid #333;
    }
    cursor: pointer;
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 320px;
      color: #ddd;
      text-align: left;
      @include breakpoint() {
        padding: 13px 10px 13px 20px;
        line-height: 1.5;
      }
      @include breakpoint('pc') {
        height: 60px;
        padding: 0 20px;
      }
    }

    .btn__view {
      width: 70px;
      height: 34px;
      border-radius: 30px;
      background: #555;
      color: #000;
      font-size: 14px;
      font-weight: $font-bold;
    }
  }
}

// partner
.partner {
  @include breakpoint() {
    // max-height: calc(100vh - 900px);
    height: fit-content;
  }
  @include breakpoint('pc') {
    height: 500px;
    border-top: 1px solid #888;
  }
  li {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    color: #888;
    font-weight: $font-light;

    @include breakpoint() {
      padding: 30px 20px 20px;
      margin-bottom: 30px;
      flex-direction: column;
      align-items: initial;
      justify-content: space-between;
      border: 1px solid #888;
      border-radius: 30px;
    }
    @include breakpoint('pc') {
      height: 123px;
      align-items: center;
      border-bottom: 1px solid #333;
    }
    .btnBox {
      display: flex;
      margin-left: auto;
      margin: 0 10px 0 auto;
      align-items: center;
      flex-shrink: 0;

      @include breakpoint() {
        justify-content: space-between;
        width: 100%;
      }
      @include breakpoint('pc') {
        justify-content: center;
      }
      .btn {
        @include breakpoint() {
          width: 100%;
          &:first-child {
            margin-right: 10px;
          }
        }
        @include breakpoint('pc') {
          width: 120px;
          margin-right: 10px;
        }
      }
    }
  }
  &__logo {
    text-align: left;
    @include breakpoint('pc') {
      width: 212px;
      text-align: center;
      flex-shrink: 0;
    }
    img {
      max-width: 150px;
      max-height: 55px;
    }
  }
  &__desc {
    text-align: left;
    @include breakpoint() {
      font-size: 22px;
      line-height: 34px;
      margin: 20px 0 22px;
      padding: 0 4px;
    }
    @include breakpoint('pc') {
      margin: 0 50px 0 20px;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
