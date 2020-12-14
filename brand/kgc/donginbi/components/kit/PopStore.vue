<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'popStore'">
      <template #header>
        <h2 class="popup__header">
          수령 가능 매장
        </h2>
      </template>
      <template #content>
        <div class="step--2">
          <label for="userlocation" class="selectBox--label">
            <select
              id="userlocation"
              v-model="userLocation"
              class="selectBox--location"
              name="location"
            >
              <option value>수령할 지역을 선택하세요</option>
              <option
                v-for="(location, idx) in locationList"
                :value="location"
                :key="idx"
                >{{ location }}</option
              >
            </select>
          </label>

          <!-- <label for="userstore" class="selectBox--label">
            <select
              id="userstore"
              v-model="userStore"
              class="selectBox--store"
              name="store"
            >
              <option value>매장선택</option>
              <option
                v-for="(store, idx) in filteredList[0].storeList"
                :value="store"
                :key="idx + store"
                >{{ store }}</option
              >
            </select>
          </label> -->

          <ul class="scrollable">
            <li
              v-for="(store, idx) in filteredList[0].storeList"
              :key="idx"
              class="row"
            >
              <div class="storeName">
                <span>{{ store.storeName }}</span>
                <span class="storeNum">{{ store.storeNum }}</span>
              </div>
              <div class="storeAddress">{{ store.storeAddress }}</div>
            </li>
          </ul>
        </div>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="
              isDirectStoreList
                ? closeAndInit()
                : openPop({ popName: 'personal' })
            "
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span>닫기</span>
          </button>
        </div>
      </template>
      <template #closeButton>
        <button type="button" hidden></button>
      </template>
    </PopBase>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopStore',
  components: { PopBase }, // AbovePopExample
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    isDirectStoreList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userLocation: '',
      userStore: '',
      filteredList: [{ location: '', storeList: [] }],
      locationList: [
        '서울',
        '경기',
        '경남',
        '경북',
        '광주',
        '대구',
        '대전',
        '부산',
        '울산',
        '인천',
        '충남',
        '충북'
      ],
      storeLists: [
        {
          location: '경기',
          storeList: [
            {
              storeName: '롯데백화점 중동점',
              storeNum: '032-320-7032 ',
              storeAddress: ' 경기도 부천시 길주로 300 롯데백화점중동점 1F '
            },
            {
              storeName: '경기 롯데백화점 일산점',
              storeNum: '031-909-3292 ',
              storeAddress:
                ' 경기도 고양시 일산동구 중앙로 1283 롯데백화점일산점 2F '
            },
            {
              storeName: '경기 신세계백화점 의정부점',
              storeNum: '031-8082-0353 ',
              storeAddress: ' 경기도 의정부시 평화로 525 신세계백화점 3F '
            },
            {
              storeName: '경기 롯데백화점 수원점',
              storeNum: '031-8066-0123 ',
              storeAddress:
                ' 경기도 수원시 권선구 세화로134롯데백화점 수원점 1F '
            },
            {
              storeName: '경기 롯데백화점 구리점',
              storeNum: '031-550-7153 ',
              storeAddress: ' 경기도 구리시 경춘로 261 (인창동 677) 1F '
            },
            {
              storeName: '롯데백화점 분당점',
              storeNum: '031-738-2304',
              storeAddress:
                ' 경기도 성남시 분당구 황새울로200번길 45 롯데백화점분당점 1F '
            },
            {
              storeName: '롯데수원점',
              storeNum: '031-8066-0123',
              storeAddress:
                ' 경기도 수원시 권선구 세화로134롯데백화점 수원점 1F 동인비화장품 '
            },
            {
              storeName: 'AK수원점',
              storeNum: '031-240-1145',
              storeAddress:
                ' 경기 수원시 팔달구 덕영대로 924 AK플라자수원점 1층 동인비'
            },
            {
              storeName: '갤러리아 광교점',
              storeNum: '031-5174-7168',
              storeAddress:
                ' 경기 수원시 영통구 광교중앙로 124 갤러리아 광교점 1층 동인비화장품 '
            },
            {
              storeName: 'AK플라자 평택점',
              storeNum: '031-646-6139',
              storeAddress: ' 평택동 185-568 AK플라자평택점 1층 동인비화장품 '
            },
            {
              storeName: '롯데백화점평촌점',
              storeNum: '031-8086-9133',
              storeAddress:
                ' 경기 안양시 동안구 시민대로 180 롯데백화점평촌점 1층 동인비'
            }
          ]
        },
        {
          location: '경남',
          storeList: [
            {
              storeName: '	갤러리아 진주점	',
              storeNum: '	055-791-1171	 ',
              storeAddress:
                ' 	 경남 진주시 진주대로 1095 갤러리아백화점 1층 동인비화장품 	 '
            },
            {
              storeName: '	롯데백화점 창원점	',
              storeNum: '	055-279-3111	 ',
              storeAddress:
                ' 	 경상남도 창원시 성산구 중앙대로 124 롯데백화점 창원점 1층 	 '
            },
            {
              storeName: '	신세계마산점	',
              storeNum: '	055-240-1232	 ',
              storeAddress:
                ' 	경남 창원시 마산합포구 합포로 251 신세계백화점마산점 1층 동인비	 '
            }
          ]
        },
        {
          location: '경북',
          storeList: [
            {
              storeName: '	롯데백화점 포항점	',
              storeNum: '	054-230-1134	 ',
              storeAddress: ' 	 경북 포항시 북구 학산로 62 롯데백화점포항점 1F 	 '
            }
          ]
        },
        {
          location: '광주',
          storeList: [
            {
              storeName: '	광주 롯데백화점 광주점	',
              storeNum: '	 062-221-1231 	 ',
              storeAddress: ' 	 광주광역시 동구 독립로 268 (대인동 7-1) 1F 	 '
            }
          ]
        },
        {
          location: '대구',
          storeList: [
            {
              storeName: '	대구 대구백화점 플라자점	',
              storeNum: '	 053-422-2304 	 ',
              storeAddress: ' 	 대구광역시 중구 대봉동 214 대구백화점플라자 1F 	 '
            },
            {
              storeName: '	대구 롯데백화점 상인점	',
              storeNum: '	053-258-3198	 ',
              storeAddress: ' 	 대구광역시 달서구 월배로 232 1F 	 '
            },
            {
              storeName: '	대구 롯데백화점 대구점	',
              storeNum: '	053-660-3009	 ',
              storeAddress: ' 	 대구 북구 태평로 161 롯데백화점 대구점 지하 1F 	 '
            }
          ]
        },
        {
          location: '대전',
          storeList: [
            {
              storeName: '	대전 롯데백화점 대전점	',
              storeNum: '	 042-601-2173 	 ',
              storeAddress: ' 	 대전광역시 서구 계룡로 598 롯데백화점대전점 1F 	 '
            },
            {
              storeName: '	대전세이점	',
              storeNum: '	042-224-6105	 ',
              storeAddress:
                ' 	우)34956 대전광역시 중구 계백로 1700 세이백화점 1층 동인비화장품	 '
            }
          ]
        },
        {
          location: '부산',
          storeList: [
            {
              storeName: '	부산 롯데백화점 동래점	',
              storeNum: '	 051-668-4166 	 ',
              storeAddress:
                ' 	 부산광역시 동래구 중앙대로 1393 롯데백화점동래점 1F 	 '
            },
            {
              storeName: '	부산 롯데백화점 광복점	',
              storeNum: '	 051-678-3148 	 ',
              storeAddress: ' 	 부산광역시 중구 중앙대로 2 롯데백화점광복점 1F 	 '
            },
            {
              storeName: '	부산 롯데백화점 센텀시티점	',
              storeNum: '	 051-730-3178 	 ',
              storeAddress:
                ' 	 부산광역시 해운대구 센텀남대로 59 (우동 1496) 1F 	 '
            }
          ]
        },
        {
          location: '서울',
          storeList: [
            {
              storeName: '서울 롯데백화점 관악점	',
              storeNum: '	 02-3289-8193 	 ',
              storeAddress:
                ' 	 서울특별시 관악구 봉천로 209 롯데백화점관악점 1F 	 '
            },
            {
              storeName: '서울 롯데백화점 김포공항점	',
              storeNum: '	 02-6116-3127 	 ',
              storeAddress:
                ' 	 서울특별시 강서구 하늘길 77 롯데백화점김포공항점 1F 	 '
            },
            {
              storeName: '서울 롯데백화점 잠실점	',
              storeNum: '	 02-2143-1778 	 ',
              storeAddress:
                ' 	 서울특별시 송파구 올림픽로 240 롯데백화점 잠실점 1F 	 '
            },
            {
              storeName: '서울 현대백화점 천호점	',
              storeNum: '	 02-2225-7141 	 ',
              storeAddress:
                ' 	 서울특별시 강동구 천호대로 1005 현대백화점천호점 1F 	 '
            },
            {
              storeName: '서울 롯데백화점 미아점	',
              storeNum: '	 02-944-2184 	 ',
              storeAddress: ' 	 서울특별시 강북구 도봉로62롯데백화점 미아점 1F 	 '
            },
            {
              storeName: '롯데백화점 청량리점	',
              storeNum: '	02-3707-1110	 ',
              storeAddress: ' 	 서울 동대문구 왕산로 214 1F 	 '
            },
            {
              storeName: '롯데백화점 영등포점	',
              storeNum: '	02-2164-5338	 ',
              storeAddress:
                ' 	서울특별시 영등포구 경인로 846 롯데백화점영등포점 3층 동인비	 '
            }
          ]
        },
        {
          location: '울산',
          storeList: [
            {
              storeName: '	울산 현대백화점 울산동구점	',
              storeNum: '	 052-250-4184 	 ',
              storeAddress:
                ' 	 울산광역시 동구 방어진순환도로 899 현대백화점울산동구점 1F 	 '
            },
            {
              storeName: '	울산 롯데백화점 울산점	',
              storeNum: '	 052-960-5501 	 ',
              storeAddress: ' 	 울산광역시 남구 삼산로 288 롯데백화점울산점 1F 	 '
            }
          ]
        },
        {
          location: '인천',
          storeList: [
            {
              storeName: '	인천 롯데백화점 인천터미널점	',
              storeNum: '	 032-242-2154 	 ',
              storeAddress:
                ' 	 인천광역시 미추홀구 연남로 35 롯데인천터미널점 1F 	 '
            }
          ]
        },
        {
          location: '충남',
          storeList: [
            {
              storeName: '	롯데충청점	',
              storeNum: '	041-640-5039	 ',
              storeAddress:
                ' 	 충청남도 천안시 동남구 만남로 43 신세계백화점충청점 1층 동인비화장품 	 '
            }
          ]
        },
        {
          location: '충북',
          storeList: [
            {
              storeName: '	현대백화점 충청점	',
              storeNum: '',
              storeAddress:
                ' 	충북 청주시 흥덕구 직지대로 208(복대동) 현대백화점충청점 1층 동인비	 '
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  watch: {
    userLocation(newval, oldval) {
      if (newval === undefined || newval === null || newval === '') {
        this.userStore = ''
        this.filteredList = [{ location: '', storeList: [] }]
        return false
      }
      this.filteredList = this.storeLists.filter((val) => {
        return val.location === this.userLocation
      })
      this.userStore = ''
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    closeAndInit() {
      this.closePop()
      this.$emit('sendEvent', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectBox--label {
  display: inline-block;
  // outline: 1px solid red;

  &[for='userlocation'] {
    width: 350px;
    height: 60px;
    margin: 30px;
  }

  &[for='userstore'] {
    width: 290px;
    height: 60px;
  }

  select {
    width: 100%;
    height: 100%;
    // background: #ffffff;
    font-size: 24px;
    padding: 0 20px;
    @include background(
      'https://donginbi.s3.amazonaws.com/static/kit/images/m/offline-store' +
        '/select-arrow.png',
      $color: #ffffff,
      $position: 90% 50%
    );
  }
}

.step--2 {
  height: 473px;
  .scrollable {
    height: 353px;
    overflow-y: auto;
    text-align: left;
  }

  .storeName {
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
  }

  .storeAddress {
    font-size: 18px;
    word-break: keep-all;
  }

  .storeNum {
    margin-left: 10px;
  }

  .row {
    margin-bottom: 10px;
  }
}
</style>
