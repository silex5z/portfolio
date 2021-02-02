<template>
  <div class="wrap">
    <div v-show="isShowBrowserNotice" class="browser-notice">
      <p>
        <svg width="18px" height="18px">
          <image
            x="0px"
            y="0px"
            width="18px"
            height="18px"
            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAXVBMVEXZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpUL///8rvy5UAAAAHXRSTlMAMJHZ+QeX/QbDmC+7ku4z1kT0EVWId5nXCJra+tutF1EAAAABYktHRB5yCiArAAAAB3RJTUUH5QEPEgENl1YjlQAAAIJJREFUGNNlkOkSgjAQg9OD06LiVSnk/V9ToNsqNr8y32x2dgOsUtpY0hqtEFXVDUVNXW2k7fijrl1Rz4N64BRTDpCsguYRcYCJ5oyLoCusOIxibmmc90dyGY3PjFLw5XMwrXdO0BtDeYQqT/1/yJdv71VM4VuOn6QxFeaFXOawV/gBUPgaxWO8PIgAAAAASUVORK5CYII="
          />
        </svg>
        해당 브라우저에서는 원활한 이벤트참여가 불가합니다. 다른 브라우저(크롬,
        웨일, 파이어 폭스 등)로 참여해 주세요!
        <button
          @click="isShowBrowserNotice = false"
          type="button"
          class="popupBtn__close"
        ></button>
      </p>
    </div>

    <!-- <div ref="textBox" class="testBox"></div> -->
    <nav v-show="!isShowTarotFortune" class="gnb">
      <h1 class="logo">
        <img :src="`${urlRoot}/images/${deviceType}/logo-uplus.png`" alt="" />
      </h1>
      <transition name="fade">
        <h2 v-show="currentSceneIdx > 1" class="title">
          <img :src="`${urlRoot}/images/${deviceType}/nav-title.png`" alt="" />
        </h2>
      </transition>

      <div class="btn-group">
        <button
          @click="toggleBGM"
          :class="{ '-isActive': isPlayingBGM }"
          type="button"
          class="btn__bgm"
        >
          <span class="a11y">음량 제어</span>
        </button>
        <button @click="refresh" type="button" class="btn__exit">
          <img
            :src="`${urlRoot}/images/${deviceType}/btn-exit.png`"
            alt=""
          /><span class="a11y">나가기</span>
        </button>
      </div>
    </nav>

    <!-- scene1 :: intro -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 0" class="scene scene0">
        <div class="scene__contents">
          <h2 class="scene__tit">
            <img
              :src="`${urlRoot}/images/${deviceType}/scene0-tit.png`"
              alt="당신의 일상을 바꿀 시크릿카드"
            />
          </h2>
          <p class="scene__txt">
            <img
              :src="`${urlRoot}/images/${deviceType}/scene0-txt.png`"
              alt="클릭하면 입장할 수 있습니다"
            />
          </p>
          <button
            @click="nextScene(`${isRetry ? '1_retry' : '1'}`)"
            :disabled="isLoading"
            type="button"
            class="btn-reg  btn__enter"
          >
            <LoadingIcon
              v-if="isLoading"
              :bgColor="'#f0ce95'"
              class="loading"
            ></LoadingIcon>
            <template v-else>
              입장하기
              <img
                :src="`${urlRoot}/images/${deviceType}/btn-arrow.png`"
                alt=""
              />
            </template>
          </button>
        </div>

        <!-- video -->
        <video
          id="loop"
          :src="`${urlRoot}/video/STEP1_loop.mp4`"
          playsinline
          class="video--full"
          muted
          loop
          autoplay
          preload
        ></video>
      </section>
    </transition>

    <!-- scene1 -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 1" class="scene scene1">
        <div class="scene__contents">
          <h2 class="scene__tit">
            <img
              :src="`${urlRoot}/images/${deviceType}/scene1-tit.png`"
              alt="당신의 일상을 바꿀 시크릿카드"
            />
          </h2>
          <button
            v-show="currentVideo.time > 5"
            @click="nextScene('2')"
            type="button"
            class="btn-reg btn__start"
          >
            Start
            <img
              :src="`${urlRoot}/images/${deviceType}/btn-arrow.png`"
              alt=""
            />
          </button>
        </div>

        <!-- video -->
        <video
          id="intro"
          ref="vid1"
          :src="
            `${urlRoot}/video/${isRetry ? 'STEP9_re_hi' : 'STEP1_intro'}.mp4`
          "
          @timeupdate="timeUpdateVideo"
          @play="playVideo(`${isRetry ? '1_retry' : '1'}`)"
          playsinline
          preload
          class="video--full"
        ></video>
      </section>
    </transition>

    <!-- scene2 :: 해시태그 선택 -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 2" class="scene scene2">
        <div
          v-show="
            keywordList &&
              ((currentVideo.name === '2' && currentVideo.time > 8) ||
                currentVideo.name === '2_1')
          "
          :class="[{ '-isActive': selectedKeyword.idx !== null }]"
          class="scene__contents"
        >
          <div ref="hashtagSwiper" v-swiper:hashtagSwiper="swiperOption">
            <div class="swiper-wrapper hashtag-wrapper">
              <div
                v-for="(list, i) in keywordList"
                :key="`list${i}`"
                class="swiper-slide hashtag-slide"
              >
                <transition-group
                  @enter="hashtagEnter"
                  @leave="hashtagLeave"
                  name="fade"
                  tag="div"
                >
                  <button
                    v-show="isShowHashtag && i === swiperActiveIndex"
                    :data-index="Math.floor(Math.random() * 10)"
                    v-for="keyword in list"
                    :key="keyword.id"
                    :class="[
                      selectedKeyword.idx !== null
                        ? selectedKeyword.idx === keyword.id
                          ? '-isActive'
                          : '-isInactive'
                        : ''
                    ]"
                    @click="selectKeyword(keyword.id)"
                    class="hashtag"
                  >
                    <span> #{{ keyword.keyword }}</span>
                  </button>
                </transition-group>
              </div>
            </div>
            <div class="swiper-pagination-group">
              <div slot="pagination" class="swiper-pagination"></div>
              <div
                slot="button-prev"
                class="swiper-button swiper-button-prev"
              ></div>
              <div
                slot="button-next"
                class="swiper-button swiper-button-next"
              ></div>
            </div>
          </div>

          <transition name="fade">
            <!-- 클릭 유도 문구 -->
            <button
              v-show="selectedKeyword.idx !== null"
              @click="nextScene('3')"
              :disabled="selectedKeyword.idx === null"
              type="button"
              class="btns btn__select-hashtag"
            >
              <span class="a11y">구슬 클릭</span>
            </button>
          </transition>

          <p
            v-if="!isMobile"
            v-show="selectedKeyword.idx !== null"
            class="scene__txt"
          >
            <img
              :src="`${urlRoot}/images/${deviceType}/scene2-txt-hashtag.png`"
              alt="이 해시태그를 원하면 구슬을 눌러주세요"
            />
          </p>
        </div>

        <!-- video -->
        <video
          id="step2"
          ref="vid2"
          :src="`${urlRoot}/video/STEP2.mp4`"
          @timeupdate="timeUpdateVideo"
          @play="playVideo('2')"
          @ended="endedVideo()"
          playsinline
          class="video--full"
        ></video>
        <transition name="fade">
          <video
            id="step2_1"
            ref="vid2_1"
            @play="playVideo('2_1')"
            v-show="selectedKeyword.idx !== null"
            :src="
              `${urlRoot}/video/${
                keywords[selectedKeyword.idx ? selectedKeyword.idx : 0]
                  .categoryReactVid
              }.mp4`
            "
            playsinline
            class="video--full"
          ></video>
        </transition>
      </section>
    </transition>

    <!-- scene3 -->
    <transition name="fade" mode="in-out">
      <section
        v-show="currentSceneIdx === 3"
        @click="setCard"
        class="scene scene3"
      >
        <div class="scene__contents">
          <transition name="fade">
            <div v-show="scene3ShowCards" class="btn-group cards">
              <button
                v-for="i in 2"
                :key="i"
                @click="openCard"
                :class="['card', { '-isActive': scene4ClickCount >= i }]"
                type="button"
              >
                <span class="a11y"
                  >{{ i === 1 ? '첫번째' : '두번째' }} 카드 클릭</span
                >
                <span class="card-front"
                  ><img :src="`${urlRoot}/images/card-bg-back.png`" alt=""
                /></span>
                <span class="card-back"
                  ><img :src="`${urlRoot}/images/card-bg-blank${i}.png`" alt=""
                /></span>
              </button>
            </div>
          </transition>
        </div>

        <!-- video -->
        <video
          id="step3"
          ref="vid3"
          v-if="!!selectedKeyword.category"
          @ended="endedVideo('3')"
          :src="`${urlRoot}/video/STEP4.mp4`"
          @play="playVideo('3')"
          @timeupdate="timeUpdateVideo"
          playsinline
          class="video--full"
        ></video>
      </section>
    </transition>

    <!-- scene4 :: 타로카드 결과 -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 4" class="scene scene4">
        <transition name="fade">
          <div
            v-if="selectedCardIdx === 1 && !isShowTarotFortune"
            class="cards"
          >
            <div :class="['card', 'card1']">
              <span
                ><img
                  :src="
                    `${urlRoot}/images/card/${selectedCardList[0].name}.jpg`
                  "
                  alt="첫번째 카드"
              /></span>
            </div>

            <div
              :class="[
                'card',
                'card2',
                {
                  '-isActive': selectedCardIdx === 1 && currentVideo.time > 3
                }
              ]"
            >
              <span class="card-front"
                ><img
                  :src="
                    `${urlRoot}/images/card/${selectedCardList[1].name}.jpg`
                  "
                  alt="두번째 카드"
              /></span>
              <span class="card-back"
                ><img :src="`${urlRoot}/images/card-bg-back.png`" alt=""
              /></span>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div
            v-if="isShowTarotFortune"
            :class="[
              'scene__contents',
              {
                '-noService':
                  selectedCardList[selectedCardIdx].relativeService === null ||
                  selectedCardList[selectedCardIdx].isWinner
              },
              { '-isActive': isShowTarotFortune }
            ]"
          >
            <div v-if="isMobile" class="swiper-pagination-group">
              <div slot="pagination" class="swiper-pagination"></div>
              <div
                slot="button-prev"
                class="swiper-button swiper-button-prev"
              ></div>
              <div
                slot="button-next"
                class="swiper-button swiper-button-next"
              ></div>
            </div>
            <div
              ref="cardSwiper"
              v-swiper:cardSwiper="cardSwiperOption"
              v-if="selectedKeyword.idx !== null"
            >
              <div class="swiper-wrapper card-result-wrapper">
                <div class="swiper-slide card-result-slide">
                  <dl class="card-result__desc">
                    <dt class="card-front">
                      <a
                        v-if="isMobile"
                        :download="
                          `${selectedCardList[selectedCardIdx].name}.jpg`
                        "
                        :href="
                          `${urlRoot}/images/card/download/${selectedCardList[selectedCardIdx].name}.jpg`
                        "
                        target="_blank"
                      >
                        <img
                          :src="
                            `${urlRoot}/images/card/${selectedCardList[selectedCardIdx].name}.jpg`
                          "
                          alt=""
                        />
                      </a>
                      <img
                        v-else
                        :src="
                          `${urlRoot}/images/card/${selectedCardList[selectedCardIdx].name}.jpg`
                        "
                        alt=""
                      />
                    </dt>
                    <dd class="card-back">
                      <img
                        v-if="selectedCardList[selectedCardIdx].isWinner"
                        :src="
                          `${urlRoot}/images/${deviceType}/scene4-img-celebrate.png`
                        "
                        alt="축하합니다"
                        class="img"
                      />
                      <p class="mean">
                        이 카드의 의미<br />
                        <strong
                          v-html="selectedCardList[selectedCardIdx].mean"
                        ></strong>
                        <strong
                          v-if="selectedCardList[selectedCardIdx].isWinner"
                          >선물</strong
                        >
                      </p>
                      <p
                        v-html="selectedCardList[selectedCardIdx].desc"
                        class="desc"
                      ></p>
                      <!-- 당첨자 유의사항 pc용 -->
                      <p
                        v-if="
                          !isMobile &&
                            selectedCardList[selectedCardIdx].isWinner
                        "
                        class="card-result__notice"
                      >
                        <svg width="18px" height="18px">
                          <image
                            x="0px"
                            y="0px"
                            width="18px"
                            height="18px"
                            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflARITEBwNjsUCAAAAxUlEQVQoz42SPQrCQBSEh0USwSoXELGwNZAr6EVyo1QxuYmktLYVYiXYa2WRQPgsYtDd9W+WZWF23s5j3wg9VkxGTQNAQ01GPNz1R0hOh4uOnHAQBez4hB1BL9rwDRsklpZRhZBjGhulMvoGo1TUVt0FkTiGB6OZVRc99iumRoFDRZ5o4veTKPHbaj2R+9LN6GQRV600d0TnkbZavBB7rSVhiSoR//7M32Mp/hlwOERlTPk2KgXjZ5760JUcaQFoOVI+Q3cHOBpZ+jPnLJQAAAAASUVORK5CYII="
                          />
                        </svg>
                        중복 당첨자는 경품 제공이 제한 됩니다.
                      </p>
                    </dd>
                  </dl>

                  <!-- 당첨자 유의사항 Mobile용 -->
                  <template v-if="isMobile">
                    <p class="card-result__notice">
                      <svg width="12px" height="20px">
                        <path
                          fill-rule="evenodd"
                          fill="rgb(224, 170, 68)"
                          d="M10.702,19.031 L1.330,19.031 C0.871,19.031 0.500,18.660 0.500,18.202 L0.500,17.831 C0.500,17.372 0.871,17.001 1.330,17.001 L10.702,17.001 C11.161,17.001 11.532,17.372 11.532,17.831 L11.532,18.202 C11.532,18.660 11.161,19.031 10.702,19.031 ZM10.507,10.645 L6.774,14.374 C6.569,14.579 6.302,14.681 6.015,14.681 C5.728,14.681 5.461,14.579 5.256,14.374 L1.523,10.645 C1.113,10.215 1.113,9.539 1.523,9.129 C1.933,8.699 2.610,8.699 3.041,9.129 L4.948,11.035 L4.948,1.856 C4.948,1.261 5.420,0.790 6.015,0.790 C6.610,0.790 7.082,1.261 7.082,1.856 L7.082,11.035 L8.989,9.129 C9.420,8.719 10.097,8.719 10.507,9.129 C10.917,9.559 10.917,10.236 10.507,10.645 Z"
                        /></svg
                      >이미지를 누르면 타로 저장이 됩니다.
                    </p>
                    <p
                      v-if="selectedCardList[selectedCardIdx].isWinner"
                      class="card-result__notice"
                    >
                      <svg width="18px" height="18px">
                        <image
                          x="0px"
                          y="0px"
                          width="18px"
                          height="18px"
                          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAXVBMVEXZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpULZpUL///8rvy5UAAAAHXRSTlMAMJHZ+QeX/QbDmC+7ku4z1kT0EVWId5nXCJra+tutF1EAAAABYktHRB5yCiArAAAAB3RJTUUH5QEPEgENl1YjlQAAAIJJREFUGNNlkOkSgjAQg9OD06LiVSnk/V9ToNsqNr8y32x2dgOsUtpY0hqtEFXVDUVNXW2k7fijrl1Rz4N64BRTDpCsguYRcYCJ5oyLoCusOIxibmmc90dyGY3PjFLw5XMwrXdO0BtDeYQqT/1/yJdv71VM4VuOn6QxFeaFXOawV/gBUPgaxWO8PIgAAAAASUVORK5CYII="
                        />
                      </svg>
                      중복 당첨자는 경품 제공에 제한 되는 점 참고 바랍니다.
                    </p>
                  </template>
                </div>
                <div
                  v-if="
                    selectedCardList[selectedCardIdx].relativeService !== null
                  "
                  class="swiper-slide card-result-slide"
                >
                  <aside class="card-result__service">
                    <h3>
                      {{ selectedCardList[selectedCardIdx].serviceTitle
                      }}<br /><strong>
                        <img
                          :src="`${urlRoot}/images/uplus.png`"
                          alt="유플러스"
                        />
                        추천 서비스</strong
                      >
                    </h3>
                    <ul class="service-list">
                      <li
                        v-for="serviceIdx in selectedCardList[selectedCardIdx]
                          .relativeService"
                        :key="serviceIdx"
                        class="service"
                      >
                        <h4 class="service__tit">
                          <img
                            :src="
                              `${urlRoot}/images/${deviceType}/tit-service${serviceIdx}.png`
                            "
                            :alt="`${serviceList[serviceIdx].title}`"
                          />
                        </h4>
                        <p
                          v-html="serviceList[serviceIdx].desc"
                          class="service__desc"
                        ></p>
                        <a
                          :href="`${serviceList[serviceIdx].link}`"
                          class="service__link-more"
                          target="_blank"
                        >
                          더 알아보기
                        </a>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
            <div class="btn-group">
              <!-- <div class="btn-box"> -->
              <a
                v-if="!isMobile"
                :download="`${selectedCardList[selectedCardIdx].name}.jpg`"
                :href="
                  `${urlRoot}/images/card/download/${selectedCardList[selectedCardIdx].name}.jpg`
                "
                target="_blank"
                type="button"
                class="btn-big btn-big--deep-purple"
              >
                <span class="a11y"
                  >{{ selectedCardIdx === 0 ? '첫번째' : '두번째' }} </span
                >카드 저장
                <img
                  :src="`${urlRoot}/images/${deviceType}/btn-arrow.png`"
                  alt=""
                />
              </a>
              <!-- </div> -->
              <!-- <div class="btn-box"> -->
              <button
                @click="selectedCardIdx === 0 ? prevScene() : nextScene('5')"
                type="button"
                class="btn-big"
              >
                {{ selectedCardIdx === 0 ? '다른 카드 보기' : '확인하기' }}
                <img
                  :src="`${urlRoot}/images/${deviceType}/btn-arrow.png`"
                  alt=""
                />
              </button>
              <!-- </div> -->
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="isShowTarotFortune" class="dimm">
            <!-- 경품 영상 -->
            <video
              ref="vidGift"
              v-if="selectedCardList[1].isWinner && selectedCardIdx === 1"
              :src="
                `${urlRoot}/video/STEP5_Card_reaction_gift_${selectedCardList[1].name}.mp4`
              "
              preload
              playsinline
              class="video--full"
            ></video>
          </div>
        </transition>

        <!-- video -->
        <video
          id="step4"
          ref="vid4"
          @ended="endedVideo('4')"
          :src="`${urlRoot}/video/STEP5_${scene4Video}.mp4`"
          @timeupdate="timeUpdateVideo"
          @play="playVideo(`4_${scene4Video}`)"
          playsinline
          class="video--full"
        ></video>
      </section>
    </transition>

    <!-- scene5 :: 개인정보 입력 -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 5" class="scene scene5">
        <video
          id="step5"
          ref="vid5"
          @ended="endedVideo('5')"
          :src="
            `${urlRoot}/video/STEP6_0${
              selectedCardList[1].isWinner ? 1 : 2
            }.mp4`
          "
          @timeupdate="timeUpdateVideo"
          @play="playVideo(`5_${selectedCardList[1].isWinner ? 1 : 2}`)"
          playsinline
          class="video--full"
        ></video>
      </section>
    </transition>

    <!-- scene8 :: 이름 + 리액션 + 공유 (마지막씬) -->
    <transition name="fade" mode="in-out">
      <section v-show="currentSceneIdx === 6" class="scene scene6">
        <div
          v-show="currentVideo.name === '6_2' && currentVideo.time > 10"
          :class="{ '-isIE': isIE }"
          class="scene__contents"
        >
          <div class="share-box">
            <h2>
              <img
                :src="
                  `${urlRoot}/images/${deviceType}/scene5-tit-share${
                    deviceType !== 'm' && isIE ? '-ie' : ''
                  }.png `
                "
                alt="나만 알기 아깝다면?!"
              />
            </h2>
            <div class="btn-group">
              <button @click="shareSns('kakaotalk')" typb="button">
                <span class="a11y">카카오톡 공유하기</span>
              </button>
              <button @click="shareSns('facebook')" typb="button">
                <span class="a11y">페이스북 공유하기</span>
              </button>
              <button @click="shareSns('twitter')" typb="button">
                <span class="a11y">트위터 공유하기</span>
              </button>
              <button @click="shareSns('url')" typb="button">
                <span class="a11y">링크URL 생성하기</span>
              </button>
            </div>
          </div>
          <div v-if="!isIE" class="retry-box">
            <h2>
              <img
                :src="`${urlRoot}/images/${deviceType}/scene5-tit-retry.png `"
                alt="다른 시크릿 카드를 보고 싶다면?!"
              />
            </h2>
            <button
              @click="initEvent()"
              type="button"
              class="btn-reg btn__retry"
            >
              다시하기
              <img
                :src="`${urlRoot}/images/${deviceType}/btn-arrow.png`"
                alt=""
              />
            </button>
          </div>
        </div>
        <transition name="fade">
          <video
            id="step6"
            ref="vid6"
            v-if="currentVideo.id === '6' && nameIdx !== null"
            @ended="endedVideo('6')"
            :src="`${urlRoot}/video/name/STEP7_name_${nameIdx}.mp4`"
            @play="playVideo('6')"
            preload
            playsinline
            class="video--full"
          ></video>
        </transition>
        <transition name="fade">
          <video
            id="step6_1"
            ref="vid6_1"
            v-show="currentVideo.id === '6_1'"
            :src="`${urlRoot}/video/STEP7_01_${nameReactionVid}.mp4`"
            @play="playVideo(`6_1_${nameReactionVid}`)"
            @timeupdate="timeUpdateVideo"
            @ended="endedVideo('6_1')"
            preload
            playsinline
            class="video--full vid6_1"
          ></video>
        </transition>
        <transition name="fade">
          <video
            id="step6_2"
            ref="vid6_2"
            v-show="currentVideo.id === '6_2'"
            :src="`${urlRoot}/video/STEP8_end.mp4`"
            @play="playVideo('6_2')"
            @timeupdate="timeUpdateVideo"
            :poster="`${urlRoot}/video/STEP8_end.jpg`"
            @ended="endedVideo()"
            preload
            playsinline
            class="video--full vid6_2"
          ></video>
        </transition>
      </section>
    </transition>

    <PopPersonal
      :cards="selectedCardList"
      :serviceList="serviceList"
      @setUser="setUser"
      @goEndScene="goEndScene()"
      :imageUrlRoot="`${urlRoot}/images`"
      :isShow="currentPop === 'personal'"
    ></PopPersonal>

    <audio
      ref="bgm"
      :src="`${urlRoot}/voice/bgm.mp3`"
      @play="isPlayingBGM = true"
      @pause="isPlayingBGM = false"
      class="bgm"
      loop="true"
      autoplay
    ></audio>

    <div v-show="currentDesc !== null" class="video__desc">
      <p>{{ currentDesc }}</p>
      <p
        v-if="currentSceneIdx === 3 && scene4ClickCount >= 2"
        class="scene__txt"
      >
        <img
          :src="`${urlRoot}/images/${deviceType}/scene3-txt.png`"
          alt="자 이제 고른 카드를 한번 클릭해봐"
        />
      </p>
    </div>
    <!-- <button
      v-show="
        (currentSceneIdx === 2 && !isShowHashtag) ||
          (currentSceneIdx === 3 &&
            currentVideo.id === '3_1' &&
            !scene3ShowCards) ||
          (currentSceneIdx === 5 && currentVideo.state === 'play') ||
          (currentSceneIdx === 6 &&
            currentVideo.id === '6_2' &&
            currentVideo.state === 'play')
      "
      @click="videoSkip"
      class="btn__skip"
    >
      <span class="a11y"> 멘트 Skip</span>
    </button>
    <button
      v-show="
        (currentSceneIdx === 3 &&
          currentVideo.name === '3_1' &&
          currentVideo.state === 'end' &&
          scene4ClickCount === 0) ||
          (currentSceneIdx === 4 &&
            (currentVideo.name === '4_2nd_common' ||
              currentVideo.name === '4_2nd_gift') &&
            currentVideo.state === 'end') ||
          (currentSceneIdx === 6 &&
            currentVideo.name === '6_2' &&
            currentVideo.state === 'end' &&
            userInfo.name != null)
      "
      @click="videoPrev"
      class="btn__prev"
    >
      <span class="a11y"> 이전</span>
    </button> -->
  </div>
</template>

<script>
import { shuffle } from 'lodash'
import { mapActions, mapState } from 'vuex'
import {
  keywordList,
  giftList,
  serviceList,
  nameList,
  nameCharismaList
} from '@/assets/js/tarot/data.js'

import LoadingIcon from '@/components/shared/LoadingIcon'
import PopPersonal from '@/components/tarot/PopPersonal'

export default {
  name: 'Tarot',
  layout: 'tarot',
  components: { LoadingIcon, PopPersonal },
  props: {
    descJson: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  data() {
    return {
      keywords: keywordList,
      serviceList,
      nameList,

      urlRoot: 'https://lguplus-event.s3.amazonaws.com/static/tarot',
      isIE: false,
      isShowBrowserNotice: false,

      isLoading: true,
      isRetry: false,
      isPlayingBGM: false,

      currentAudio: null,
      currentSceneIdx: 0,
      currentVideo: {
        id: '0',
        name: '0',
        time: 0,
        state: 'ready'
      },

      selectedKeyword: {
        idx: null,
        category: null
      },

      selectedCardIdx: 0,

      scene3ShowCards: false,
      scene4ClickCount: 0,
      isShowTarotFortune: null,

      userInfo: {}, // 참여자 정보(이름, 연락처, 중복 당첨 여부)
      isShowHashtag: false,
      swiperActiveIndex: 0,
      swiperOption: {
        effect: 'fade',
        setWrapperSize: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          init: (e) => {},
          slideChange: (e) => {
            if (!this.$refs.vid2_1.paused) this.$refs.vid2_1.pause()
            this.selectedKeyword.idx = null
            this.swiperActiveIndex = this.$refs.hashtagSwiper.swiper.activeIndex
          }
        }
      },
      cardSwiperOption: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          init: (e) => {
            // console.log('카드 스와이퍼 init')
            setTimeout(() => {
              // pc일 때 swipder destroy
              if (!this.isMobile) this.$refs.cardSwiper.swiper.destroy()
            })
          }
        }
      }
    }
  },

  computed: {
    ...mapState({
      currentPop: (state) => state.popup.currentPop
    }),
    deviceType() {
      return this.$device.isMobile ? 'm' : 'pc'
    },
    isMobile() {
      return this.$device.isMobile
    },
    // 자막
    currentDesc() {
      // "자 이제 고른 카드를 한번 클릭해봐!"
      if (this.currentSceneIdx === 3 && this.scene4ClickCount >= 2) {
        return ''
      }
      // 카드 설명 창
      if (this.isShowTarotFortune) {
        return ''
      }
      // 이름
      if (this.currentVideo.name === '6') return this.userInfo.name
      const desc = this.descJson[this.currentVideo.name]

      const idx = desc.findIndex(
        (list) =>
          list.startTime <= this.currentVideo.time &&
          list.endTime > this.currentVideo.time
      )
      return idx === -1 ? null : desc[idx].text
    },

    keywordList() {
      const keywords = shuffle(this.keywords)
      const arr = []
      const n = this.isMobile ? 5 : 10
      const cnt = keywords.length / n
      for (let i = 0; i < cnt; i++) {
        arr.push(keywords.splice(0, n))
      }
      return arr
    },
    scene4Video() {
      return this.selectedCardList.length > 0 && this.selectedCardIdx === 0
        ? `1st_0${this.selectedCardList[this.selectedCardIdx].reaction}`
        : this.selectedCardIdx === 1 && this.selectedCardList[1].isWinner
        ? '2nd_gift'
        : '2nd_common'
    },
    nameReactionVid() {
      // 카리스마
      const name = this.userInfo.name
      // 이름 리액션 비디오 index
      if (this.userInfo.alreadyWin) return 12

      // 카리스마
      if (nameCharismaList.includes(name)) return 8
      // 경혜
      else if (name === '경혜') return 9
      // special
      else if (this.userInfo.special != null) return this.userInfo.special
      else return Math.floor(Math.random() * (7 - 1) + 1)
    },
    nameIdx() {
      const nameIdx = this.nameList.indexOf(this.userInfo.name)
      return nameIdx !== -1 ? nameIdx : null
    },
    selectedCardList() {
      const idx =
        this.selectedKeyword.idx === null ? 0 : this.selectedKeyword.idx
      return shuffle(this.keywords[idx].cardList)
    }
  },
  watch: {
    currentVideo: {
      deep: true,
      handler(value) {
        if (value.id === '2' && value.time > 8.5) this.isShowHashtag = true
      }
    }
  },
  mounted() {
    if (process.browser) {
      const isIE = /* @cc_on!@ */ false || !!document.documentMode
      this.isShowBrowserNotice = isIE
      this.isIE = isIE
      // console.log('ie ::::::: ' + this.isIE)

      window.Kakao.init('e19917bac451ab82c155ae1e141309d5')
      window.addEventListener('load', () => {
        this.isLoading = false
      })

      this.$refs.bgm.play()
    }
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    nextScene(videoId) {
      this.playNextVideo(videoId)
      this.currentSceneIdx++

      switch (videoId) {
        case '1':
          this.$refs.bgm.volume = 0.7
          if (this.$refs.bgm.paused) this.$refs.bgm.play()
          break
        case '3':
          this.$refs.vid2_1.pause()
          break
        case '4':
          break
        case '5':
          this.isShowTarotFortune = false
          break
      }
    },
    prevScene(videoId) {
      this.currentVideo.id = videoId
      if (this.currentAudio) this.currentAudio.pause()

      if (this.currentSceneIdx === 4) {
        this.openCard()
        this.selectedCardIdx++
      }
      --this.currentSceneIdx
    },
    playNextVideo(videoId) {
      const beforeVideoId = this.currentVideo.id

      // 재생중인 영상 및 음향 정지
      if (this.$refs[`vid${beforeVideoId}`])
        this.$refs[`vid${beforeVideoId}`].pause()
      if (this.currentAudio) this.currentAudio.pause()

      // 시간 초기화
      this.currentVideo.time = 0
      if (this.$refs[`vid${videoId}`])
        this.$refs[`vid${videoId}`].currentTime = 0
      this.currentVideo.id = videoId
      setTimeout(() => {
        // this.currentVideo.name = videoName
        this.$refs[`vid${videoId}`].play()
      }, 600)
    },
    selectKeyword(keywordIdx) {
      this.selectedKeyword = {
        idx: keywordIdx,
        category: this.keywords[keywordIdx].category
      }

      // 키워드(해시태그)별 비디오 제어
      this.$refs.vid2.pause()
      setTimeout(() => {
        this.$refs.vid2_1.play()
      }, 500)
    },
    setCard() {
      // 영상 끝나기 전까지 선택 안되도록 return 처리
      if (this.currentVideo.state !== 'end' || this.scene4ClickCount >= 2)
        return
      if (this.scene4ClickCount === 0) {
        this.$axios
          .post('/api/tarot', {
            keyword: this.keywords[this.selectedKeyword.idx].keyword
          })
          .then((res) => {
            console.log(res.data)
            if (res.data.result) {
              if (res.data.win) {
                const type = res.data.prizeType.toLowerCase()
                this.selectedCardList.splice(1, 1, {
                  isWinner: res.data.win,
                  type,
                  ...giftList[type]
                })
              }
              this.scene4ClickCount++
            } else {
              alert(res.data.message)
            }
          })
          .catch((err) => {
            console.log(err)
            alert(err.response.data.error)
          })
      } else {
        this.scene4ClickCount++
      }
    },
    setUser(userInfo) {
      this.userInfo = userInfo
      this.nextScene(this.nameIdx !== null ? '6' : '6_1')
    },
    openCard() {
      if (this.scene4ClickCount < 2) return
      this.isShowTarotFortune = false
      this.nextScene('4')
    },
    goEndScene() {
      this.currentSceneIdx = 6
      const beforeVideoId = this.currentVideo.id

      // 재생중인 영상 및 음향 정지
      if (this.$refs[`vid${beforeVideoId}`])
        this.$refs[`vid${beforeVideoId}`].pause()
      if (this.currentAudio) this.currentAudio.pause()

      // 시간 초기화
      this.currentVideo.time = 0
      if (this.$refs.vid6_2) this.$refs.vid6_2.currentTime = 0
      this.currentVideo.id = '6_2'
      this.$refs.vid6_2.play()
    },
    // 이벤트 재참여
    initEvent() {
      this.$refs.vid6_2.pause()
      this.$refs.hashtagSwiper.swiper.slideTo(0)
      // data init
      Object.assign(this.$data, this.$options.data())
      this.isPlayingBGM = true
      this.isRetry = true
      this.currentSceneIdx = 0
      this.nextScene('1')
    },
    // 사이트 새로고침
    refresh() {
      location.reload()
    },
    // video event
    playVideo(videoName) {
      this.currentVideo.state = 'play'
      this.currentVideo.name = videoName
    },
    endedVideo(videoName) {
      this.currentVideo.state = 'end'

      switch (videoName) {
        case '3':
          this.scene3ShowCards = true
          break
        case '4':
          this.isShowTarotFortune = true
          // 리액션 영상 끝난 후 카드 결과 처리
          // 경품 당첨시에는 영상 재생 나머지는 음성만
          if (
            this.scene4ClickCount === 2 &&
            this.selectedCardList[this.selectedCardIdx].isWinner
          ) {
            setTimeout(() => {
              this.$refs.vidGift.play()
            }, 500)
          } else {
            this.currentAudio = new Audio(
              `https://lguplus-event.s3.amazonaws.com/static/tarot/voice/${
                this.selectedCardList[this.selectedCardIdx].voiceFile
              }.mp3`
            )
            this.currentAudio.play()

            if (this.isMobile) {
              setTimeout(() => {
                if (this.$refs.cardSwiper) {
                  this.$refs.cardSwiper.swiper.slideTo(2, 1000, false)
                }
              }, 4000)
            }
          }
          break
        case '5':
          this.openPop({ popName: 'personal' })
          break
        case '6':
          this.playNextVideo('6_1')
          break
        case '6_1':
          this.playNextVideo('6_2')
          break
      }
    },
    timeUpdateVideo(e) {
      this.currentVideo.time = e.target.currentTime
    },
    // BGM on/off
    toggleBGM() {
      this.isPlayingBGM ? this.$refs.bgm.pause() : this.$refs.bgm.play()
    },
    // 공유
    async shareSns(channel) {
      const shareUrl =
        location.origin +
        location.pathname +
        '?utm_source=facebook&utm_medium=share&utm_campaign=tarot'

      switch (channel) {
        case 'kakaotalk':
          window.Kakao.Link.sendCustom({
            templateId: 44515
          })
          break
        case 'facebook':
          window.open(
            'https://www.facebook.com/sharer/sharer.php?u=' +
              encodeURIComponent(shareUrl),
            'fbPop',
            'menubar=false, scrollbars=no,width=600px,height=450px'
          )
          break
        case 'twitter':
          window.open(
            'https://twitter.com/share?text=' +
              encodeURIComponent(
                '어머 무슨 일이 있었던 거야? 지금 드루와\r\n당신의 고민을 해결해 줄 시크릿 카드를 알려드립니다'
              ) +
              '&url=' +
              encodeURIComponent(shareUrl),
            'twPop',
            'menubar=false, scrollbars=no,width=600px,height=450px'
          )
          break

        case 'url':
          try {
            await this.$copyText(location.href)
            alert('URL 복사가 완료되었습니다')
          } catch (e) {
            // console.error(e);
            alert('URL 복사에 실패했습니다')
          }
          break
      }
    },
    // 해시태그 뿌려질때 animation
    hashtagEnter(el, done) {
      const delay = el.dataset.index * 50
      setTimeout(() => {
        this.$velocity(el, { opacity: 1 }, { complete: done })
      }, delay)
    },
    hashtagLeave(el, done) {
      this.$velocity(el, { opacity: 0 }, { complete: done })
    }
    //   videoPrev() {
    //   const beforeVideoId = this.currentVideo.id

    //   // 재생중인 영상 및 음향 정지
    //   if (this.$refs[`vid${beforeVideoId}`])
    //     this.$refs[`vid${beforeVideoId}`].pause()
    //   if (this.currentAudio) this.currentAudio.pause()
    //   switch (beforeVideoId) {
    //     case '3_1':
    //       Object.assign(this.$data, this.$options.data())
    //       this.$refs.hashtagSwiper.swiper.slideTo(0)
    //       this.playNextVideo('2')
    //       this.currentSceneIdx = 2
    //       this.$refs.vid2.currentTime = 20
    //       this.currentVideo.state = 'end'
    //       this.isShowHashtag = true
    //       break
    //     case '4':
    //       this.currentVideo.name = '4_1st_03'
    //       this.selectedCardIdx = 0
    //       if (this.$refs.vidGift) {
    //         this.$refs.vidGift.pause()
    //       }
    //       break
    //     case '6_2':
    //       this.currentSceneIdx = 5
    //       this.nextScene('6')
    //       break
    //   }
    // },
    // videoSkip() {
    //   const beforeVideoId = this.currentVideo.id

    //   // 재생중인 영상 및 음향 정지
    //   if (this.$refs[`vid${beforeVideoId}`])
    //     this.$refs[`vid${beforeVideoId}`].pause()
    //   if (this.currentAudio) this.currentAudio.pause()

    //   switch (beforeVideoId) {
    //     case '2':
    //       this.$refs.vid2.currentTime = 20
    //       this.currentVideo.state = 'end'
    //       break
    //     case '3_1':
    //       this.$refs.vid3_1.currentTime = 16
    //       this.currentVideo.id = '3_1'
    //       this.currentVideo.name = '3_1'
    //       this.currentVideo.state = 'end'
    //       this.scene3ShowCards = true
    //       break
    //     case '5':
    //       this.$refs.vid5.currentTime = 10.688
    //       this.openPop({ popName: 'personal' })
    //       break
    //     case '6_2':
    //       this.$refs.vid6_2.currentTime = 26.496
    //       this.currentVideo.state = 'end'
    //       break
    //   }
    // },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/tarot/common';
</style>
