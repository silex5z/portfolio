<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'event'"
    :width="100"
    :measure="'%'"
    :mask="false"
    :class="{
      blur: $store.state.popup.currentPop.includes('participateEvent')
    }"
  >
    <template #contents>
      <div :class="`step${currentSceneIdx}`" class="event__wrap">
        <section ref="section0" class="event event__main">
          <div ref="section0Inner" class="event__inner">
            <h2 class="event__main__tit uppercase">
              Megazone<br />Cloud<br />
              <span class="color--point">big event</span>
              <Icon
                class="icon"
                :name="'dot'"
                :width="33"
                :view-box="33"
                :fill="'none'"
                :stroke="'#54daaf'"
                :stroke-width="4"
              ></Icon>
            </h2>
            <h3 class="event__main__stit">경품 안내 & 교환</h3>
            <p class="event__main__desc">
              세션 영상 시청 및 상담신청, 공유 등의 활동으로
              <br />적립된 포인트를 다양한 경품에 도전하고
              <br v-if="$device.isMobile" />미션 경품과 교환하세요!
            </p>
            <p class="event__main__date">
              <time datetime="2020-11-16">2020. 11. 16</time>(월) ~
              <time datetime="2020-11-29"
                ><template v-if="!$device.isMobile">2020.</template>11. 29</time
              >(일)
            </p>
            <button type="button" class="seal" @click="currentSceneIdx = 1">
              <svg
                width="128"
                height="128"
                viewBox="-10 -10 128 128"
                class="seal__text"
              >
                <defs>
                  <path
                    id="text-path"
                    fill-rule="evenodd"
                    fill="none"
                    d="M53.008,0.055 C81.886,0.055 105.297,23.645 105.297,52.746 C105.297,81.847 81.886,105.438 53.008,105.438 C24.129,105.438 0.719,81.847 0.719,52.746 C0.719,23.645 24.129,0.055 53.008,0.055 Z"
                  />
                </defs>
                <text class="cls-1">
                  <textPath xlink:href="#text-path">
                    <tspan class="cls-2">
                      3 BIG EVENT&nbsp; &nbsp;&nbsp; &nbsp; 3 BIG EVENT
                      &nbsp;&nbsp; &nbsp; &nbsp; 3 BIG EVENT &nbsp; &nbsp;&nbsp;
                      &nbsp;
                    </tspan>
                  </textPath>
                </text>
              </svg>
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                class="seal__circle"
              >
                <circle class="cls-3" cx="64" cy="64" r="40" />
                <image
                  x="57"
                  y="54"
                  width="15"
                  height="22"
                  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAqUlEQVQ4je2TsRHCMAxFn6FKmQ3IBpRsA3TZAmeCwAQkG1CyHZzuFE6xLUhDl99Ytv+TfLYVQl3jKAIXoNM40zf4ZeJQMmw8colWeIX/D0f9x/1C5qr+KI1hG2AAzhqXGkP2j7byzZhOwN2pOAOF24aqegINsNdFGXdmju5bcARa289pZk8CygmRypPnkZygpA+Ywr8SzMAS7CXIQA+eEshlHPQ12swBvAHwVBxfjDv0RQAAAABJRU5ErkJggg=="
                />
              </svg>
            </button>
          </div>
        </section>

        <!-- event1 -->
        <section ref="section1" class="event event1">
          <div ref="section1Inner" class="event__inner">
            <h2 class="event__tit uppercase">event 1</h2>
            <p class="event__desc">
              <em class="eng">I . P . A . D</em> 세션 카테고리별<br />
              매 주 2개의 <em class="eng uppercase">big</em> 경품이 공개됩니다!
            </p>
            <ul v-if="event1.isOpenEvents" class="category__list">
              <li
                v-for="(category, idx) in stateCategories"
                :key="idx"
                class="category"
              >
                <h3 class="category__name">
                  <span class="firstLetter">{{ category.name[0] }}</span
                  >{{ category.name.slice(1, category.name.length) }}
                </h3>
                <div class="category__gift">
                  <img
                    :src="`${imageUrl}/event/${category.name}_on.png`"
                    alt=""
                  />
                  <p class="category__giftName">
                    {{ stateCategories[idx].gift }}
                  </p>
                </div>
                <div class="participate">
                  <button
                    :id="`eventOneApplyBtn_${category.name}`"
                    type="button"
                    :class="[
                      'btn',
                      'btn--big',
                      'btn--white',
                      'btn__participate',
                      true ? 'btn--block' : ''
                    ]"
                    :disabled="true"
                    @click="
                      participateEvent('event1', category.value, category.gift)
                    "
                  >
                    <span>
                      이벤트 종료
                      <Icon
                        :name="'arrow'"
                        :size="30"
                        :flll="'none'"
                        :stroke="'#000'"
                        :stroke-width="2"
                      ></Icon>
                    </span>
                  </button>
                  <dl
                    v-if="
                      event1.isOpenEvents &&
                        event1.isOpenEvents[`${category.name}`]
                    "
                    class="participate__reqiredPoint color--point"
                  >
                    <dt>필요 포인트</dt>
                    <dd>1,000,000 P</dd>
                  </dl>
                </div>
              </li>
            </ul>
            <dl class="event__winnerNotice">
              <dt>당첨자 발표</dt>
              <dd><time datetime="2020-12-07">12.07</time>(월)</dd>
              <dd class="notice">
                * 응모 시 하단의 이벤트 유의사항을 확인하시고 응모해주시기
                바랍니다.
              </dd>
            </dl>
          </div>
        </section>

        <!-- event2 -->
        <section ref="section2" class="event event2">
          <div ref="section2Inner" class="event__inner">
            <h2 class="event__tit uppercase color--point">event 2</h2>
            <p class="event__desc">
              <em>어디서도 구할 수 없는 클라우드 리미티드 에디션</em>
              <br />국내외 대표 구름 아티스트와 메가존클라우드의 <br />상징성을
              담은 한정판 콜라보
            </p>

            <div class="event__contents">
              <dl class="artist__list">
                <dt class="artist__name">
                  <img :src="`${imageUrl}/artist_sign.png`" alt="강운" />
                </dt>
                <dd class="artist__desc">
                  하늘과 물빛, 바람의 모습을 서정적 회화로 표현하는 국내 대표
                  구름 작가
                </dd>
                <dt class="artist__name uppercase">Ian Fisher</dt>
                <dd class="artist__desc">
                  평범한 구름을 컬러풀하고 감성적인 작품으로 승화시키는 캐나다의
                  젊은 화가
                </dd>
              </dl>

              <div class="event__gifts">
                <div class="event__gifts__img">
                  <img :src="`${imageUrl}/event/e2_0${tshirtNum}.png`" alt />
                  <a
                    class="btn__e2GiftDetail"
                    :href="
                      tshirtNum === 1
                        ? '/collaboration?artist=kangun'
                        : '/collaboration?artist=ianfisher'
                    "
                    target="_blank"
                    >제품 상세 안내</a
                  >
                </div>
                <!-- <p class="event__gifts__desc">
                선착순
                <br />
                <span class="count">5,000</span>명
              </p> -->
                <div class="radioBox">
                  <label
                    v-for="idx in 2"
                    :key="idx"
                    :for="`tshrit${idx}`"
                    :class="{ '-isActive': tshirtNum === idx }"
                    class="event__gifts__radio"
                  >
                    <span class="uppercase">type {{ idx }}</span>
                    <input
                      :id="`tshrit${idx}`"
                      v-model="tshirtNum"
                      :value="idx"
                      type="radio"
                      name="tshirt"
                    />
                  </label>
                </div>
              </div>

              <div class="participate">
                <button
                  id="eventTwoApplyBtn"
                  type="button"
                  class="btn btn--big btn--white btn__participate"
                  :class="{ 'btn--block': true }"
                  :disabled="true"
                  @click="participateEvent('event2')"
                >
                  <span>
                    이벤트 종료
                    <Icon
                      :name="'arrow'"
                      :size="30"
                      :flll="'none'"
                      :stroke="'#000'"
                      :stroke-width="2"
                    ></Icon>
                  </span>
                </button>
                <dl class="participate__reqiredPoint color--point">
                  <dt>필요 포인트</dt>
                  <dd>500,000 P</dd>
                </dl>
              </div>

              <p class="event__tip">
                <em
                  >I . P . A . D 카테고리별
                  <span class="color--point"
                    >4개 Keynote 세션 시청 <br v-if="$device.isMobile" />
                    & 500,000</span
                  >
                  포인트로 응모 가능!</em
                >
              </p>

              <ul v-if="event2.categoryType" class="progressBox">
                <li
                  v-for="(category, idx) in stateCategories"
                  :key="idx"
                  :class="{
                    '-isActive':
                      event2.categoryType[category.name].isOpen &&
                      !event2.categoryType[category.name].watched
                  }"
                >
                  <p class="progressBox__tit eng capitalize">
                    {{ category.name }}
                  </p>
                  <button
                    v-if="!event2.categoryType[category.name].watched"
                    id="eventThreeApplyBtn"
                    type="button"
                    class="progressBox__state"
                    @click="
                      event2.categoryType[category.name].isOpen
                        ? participateMission('event2', idx)
                        : openAlert({
                            message: `${category.openDate}에 오픈됩니다!`
                          })
                    "
                  >
                    <span>
                      {{
                        event2.categoryType[category.name].isOpen
                          ? '바로가기 >'
                          : `오픈예정`
                      }}
                    </span>
                  </button>

                  <div
                    v-if="event2.categoryType[category.name].watched"
                    class="stemp"
                  >
                    <p class="stemp__txt">시청완료</p>
                    <svg width="82" height="82" viewBox="0 0 82 82">
                      <circle
                        class="cls-1"
                        cx="40.844"
                        cy="41.156"
                        r="40.219"
                        fill="#dc8421"
                        fill-opacity="0.7"
                        box-shadow="0px -3px 30px 0px rgba(0, 0, 0, 1)"
                      />
                      <circle
                        class="cls-2"
                        cx="40.844"
                        cy="41.156"
                        r="35.75"
                        fill="none"
                        stroke="#000"
                        stroke-width="2px"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
              <dl class="event__winnerNotice">
                <dt>당첨자 발표</dt>
                <dd><time datetime="2020-12-07">12.07</time>(월)</dd>
                <dd class="notice">
                  * 응모 시 하단의 이벤트 유의사항을 확인하시고 응모해주시기
                  바랍니다.
                </dd>
              </dl>
            </div>
          </div>
        </section>

        <!-- event3 -->
        <section ref="section3" class="event event3">
          <div ref="section3Inner" class="event__inner">
            <h2 class="event__tit color--point uppercase">event 3</h2>
            <p class="event__desc">
              간단한 3가지 미션을 완료하면 매주 900명<br
                v-if="$device.isMobile"
              />
              선착순 <em>100%</em> 지급! <br /><em class="uppercase">event3</em>
              참여자 대상 파트너사 <em class="capitalize">special gift</em>까지!
            </p>
            <div class="event__gifts">
              <div class="event__gifts__img">
                <img
                  :src="`${imageUrl}/event/event3_gift1.png`"
                  alt="스타벅스, 베스킨라빈스31, CU 모바일상품권"
                />
              </div>
            </div>

            <div class="event__contents">
              <ul class="progressBox">
                <li
                  v-for="(mission, idx) in missions"
                  :key="idx"
                  :class="{ '-isComplete': mission.isComplete }"
                >
                  <p
                    class="progressBox__tit eng capitalize"
                    v-html="mission.name"
                  ></p>
                  <button
                    v-if="event3[mission.isCompleteVal] !== 'Y'"
                    typ="button"
                    class="progressBox__state"
                    @click="participateMission('event3', idx)"
                  >
                    바로가기 >
                  </button>
                  <div
                    v-if="event3[mission.isCompleteVal] === 'Y'"
                    class="stemp"
                  >
                    <p class="stemp__txt">미션완료</p>
                    <svg width="82" height="82" viewBox="0 0 82 82">
                      <circle
                        class="cls-1"
                        cx="40.844"
                        cy="41.156"
                        r="40.219"
                        fill="#00a651"
                        fill-opacity="0.7"
                        box-shadow="0px -3px 30px 0px rgba(0, 0, 0, 1)"
                      />
                      <circle
                        class="cls-2"
                        cx="40.844"
                        cy="41.156"
                        r="35.75"
                        fill="none"
                        stroke="#000"
                        stroke-width="2px"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
              <button
                id="eventThreeApplyBtn"
                type="button"
                class="btn btn--big btn--white btn__participate"
                :class="{ 'btn--block': true }"
                :disabled="true"
                @click="participateEvent('event3')"
              >
                <span>
                  이벤트 종료
                  <Icon
                    :name="'arrow'"
                    :size="30"
                    :flll="'none'"
                    :stroke="'#000'"
                    :stroke-width="2"
                  ></Icon>
                </span>
              </button>
              <p class="notice">
                * 응모 시 하단의 이벤트 유의사항을 확인하시고 응모해주시기
                바랍니다.
              </p>

              <div class="row">
                <dl class="event__tip">
                  <dt
                    class="capitalize color--point"
                    :class="{ event__tit: $device.isMobile }"
                  >
                    파트너사 <span class="eng"> special gift</span>
                  </dt>
                  <dd class="uppercase">
                    event 1, 2 참여 시<br v-if="!$device.isMobile" />
                    당첨 확률 up!
                  </dd>
                </dl>

                <ul class="event__gifts__partner">
                  <li class="gift">
                    <p>
                      <img
                        :src="`${imageUrl}/event/partner1.png`"
                        alt="GitLab"
                      />
                      수량 50개 한정
                    </p>
                    <img
                      :src="`${imageUrl}/event/event3_gift2.png`"
                      alt="GitLab 티셔츠"
                      class="gift__img"
                    />
                  </li>
                  <li class="gift">
                    <p>
                      <img
                        :src="`${imageUrl}/event/partner2.png`"
                        alt="New Relic"
                      />
                      수량 50개 한정
                    </p>
                    <img
                      :src="`${imageUrl}/event/event3_gift3.png`"
                      alt="New Relic 백팩"
                      class="gift__img"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- notice -->
        <section
          v-if="!$device.isMobile"
          ref="section4"
          class="event event__notice"
        >
          <vue-scroll>
            <div class="event__inner">
              <h2 class="event__tit">이벤트 유의사항</h2>
              <dl class="notice">
                <dt class="notice__tit">공통 사항</dt>
                <dd class="notice__txt">
                  - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                  메가존클라우드의 마케팅 활용에 동의하신 분에 한하여
                  제공됩니다.
                </dd>
                <dd class="notice__txt">
                  - 이벤트 당첨자 선정 및 경품 전달을 위해 입력하신 회원 정보가
                  조회될 수 있습니다.
                </dd>
                <dd class="notice__txt">
                  - 이벤트 경품 발송은 당첨자 정보 취합 후 응모 당시 입력하신
                  개인 정보 기준으로 진행되며, 정보 오기입으로 인한 경품 미수령
                  시 재발송 되지 않습니다.
                </dd>
                <dd class="notice__txt">
                  - 모든 경품은 내부 사정에 따라 사전 고지 없이 변동될 수
                  있습니다.
                </dd>
                <dd class="notice__txt">
                  - 이벤트는 B2B 고객을 대상으로 하는 행사로, 경품 수령을
                  목적으로 참여하는 학생이나 일반인은 경품 제공 및 이벤트 참여가
                  제한됩니다.
                </dd>
              </dl>
              <dl class="notice">
                <dt class="notice__tit">EVENT 1. 매주 응모 BIG 경품</dt>
                <dd class="notice__txt">
                  - 경품은 중복 응모가 가능하며, 중복 응모 시 당첨 확률이
                  높아집니다.
                </dd>
                <dd class="notice__txt">
                  - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                  메가존클라우드의 마케팅 활용에 동의하신 분에 한하여 추첨을
                  통해 제공됩니다.
                </dd>
                <dd class="notice__txt">
                  - 제세공과금은 본인 부담이며, 현금 교환 및 중복 당첨은 불가
                  합니다.
                </dd>
                <dd class="notice__txt">
                  - 당첨자 발표일로부터 2주 이내 수령 거부, 연락 불능 등으로
                  경품 미수령 사유 발생시 당첨이 취소되며 재발송되지 않습니다.
                </dd>
              </dl>
              <dl class="notice">
                <dt class="notice__tit">
                  EVENT 2. 클라우드 리미티드 에디션
                </dt>

                <dd class="notice__txt">
                  - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                  메가존클라우드의 마케팅 활용에 동의하신 분에 한하여 추첨을
                  통해 제공됩니다.
                </dd>
                <dd class="notice__txt">
                  - 경품은 당첨자 발표일로부터 3주 이내 입력하신 주소로
                  배송되며, 주소 오기입으로 인한 경품 미수령은 재배송되지
                  않습니다.
                </dd>
                <dd class="notice__txt">
                  - 응모 완료 후 제품 타입 및 사이즈 변경은 불가합니다.
                </dd>
              </dl>
              <dl class="notice">
                <dt class="notice__tit">EVENT 3. 선착순 미션 완료</dt>
                <dd class="notice__txt">
                  - 경품은 이벤트 기간동안 응모요건 충족 후 이벤트에 응모하고
                  메가존클라우드 및 관련 파트너사 마케팅 활용 동의하신 분에
                  한하여 선착순으로 제공됩니다.
                </dd>
                <dd class="notice__txt">
                  - 한정 수량으로 경품은 조기 마감 될 수 있으며 경품 교환 및
                  환불은 불가합니다.
                </dd>
                <dd class="notice__txt">
                  - Event 3 경품의 일부는 파트너사의 후원으로 제작되었습니다.
                </dd>
                <dd class="notice__txt">
                  - Special Gift는 파트너사 GitLab과 New Relic의 후원 물품으로,
                  당첨 시에는 배송지 확인을 위해 등록하신 정보로 개별 안내드릴
                  예정입니다.
                </dd>
              </dl>
              <dl class="notice">
                <dt class="notice__tit">
                  세미나 및 이벤트 관련 문의
                  <a href="mailto:digitalspectrum_cs@dspectrum.com"
                    >digitalspectrum_cs@dspectrum.com</a
                  >
                </dt>
                <dd class="notice__txt">
                  - 본 세미나는 메가존클라우드 주식회사의 위탁을 받아
                  메가존㈜에서 대행, 운영됩니다.
                </dd>
              </dl>
              <button type="button" class="seal" @click="currentSceneIdx = 3">
                <svg
                  width="128"
                  height="128"
                  viewBox="-10 -10 128 128"
                  class="seal__text"
                >
                  <defs>
                    <path
                      id="text-path"
                      fill-rule="evenodd"
                      fill="none"
                      d="M53.008,0.055 C81.886,0.055 105.297,23.645 105.297,52.746 C105.297,81.847 81.886,105.438 53.008,105.438 C24.129,105.438 0.719,81.847 0.719,52.746 C0.719,23.645 24.129,0.055 53.008,0.055 Z"
                    />
                  </defs>
                  <text class="cls-1">
                    <textPath xlink:href="#text-path">
                      <tspan class="cls-2">
                        3 BIG EVENT&nbsp; &nbsp;&nbsp; &nbsp; 3 BIG EVENT
                        &nbsp;&nbsp; &nbsp; &nbsp; 3 BIG EVENT &nbsp;
                        &nbsp;&nbsp; &nbsp;
                      </tspan>
                    </textPath>
                  </text>
                </svg>
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  class="seal__circle"
                >
                  <circle class="cls-3" cx="64" cy="64" r="40" />
                  <image
                    x="57"
                    y="54"
                    width="15"
                    height="22"
                    xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAqUlEQVQ4je2TsRHCMAxFn6FKmQ3IBpRsA3TZAmeCwAQkG1CyHZzuFE6xLUhDl99Ytv+TfLYVQl3jKAIXoNM40zf4ZeJQMmw8colWeIX/D0f9x/1C5qr+KI1hG2AAzhqXGkP2j7byzZhOwN2pOAOF24aqegINsNdFGXdmju5bcARa289pZk8CygmRypPnkZygpA+Ywr8SzMAS7CXIQA+eEshlHPQ12swBvAHwVBxfjDv0RQAAAABJRU5ErkJggg=="
                  />
                </svg>
              </button>
            </div>
            <div class="intro__indicator indicator">
              <div class="indicator__container">
                <div class="bar"></div>
              </div>
            </div>
          </vue-scroll>
        </section>
        <section v-else ref="section4" class="event event__notice">
          <div ref="section4Inner" class="event__inner">
            <h2 class="event__tit">이벤트 유의사항</h2>
            <dl class="notice">
              <dt class="notice__tit">공통 사항</dt>
              <dd class="notice__txt">
                - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                메가존클라우드의 마케팅 활용에 동의하신 분에 한하여 제공됩니다.
              </dd>
              <dd class="notice__txt">
                - 이벤트 당첨자 선정 및 경품 전달을 위해 입력하신 회원 정보가
                조회될 수 있습니다.
              </dd>
              <dd class="notice__txt">
                - 이벤트 경품 발송은 당첨자 정보 취합 후 응모 당시 입력하신 개인
                정보 기준으로 진행되며, 정보 오기입으로 인한 경품 미수령 시
                재발송 되지 않습니다.
              </dd>
              <dd class="notice__txt">
                - 모든 경품은 내부 사정에 따라 사전 고지 없이 변동될 수
                있습니다.
              </dd>
              <dd class="notice__txt">
                - 이벤트는 B2B 고객을 대상으로 하는 행사로, 경품 수령을 목적으로
                참여하는 학생이나 일반인은 경품 제공 및 이벤트 참여가
                제한됩니다.
              </dd>
            </dl>
            <dl class="notice">
              <dt class="notice__tit">EVENT 1. 매주 응모 BIG 경품</dt>
              <dd class="notice__txt">
                - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                메가존클라우드의 마케팅 활용에 동의하신 분에 한하여 추첨을 통해
                제공됩니다.
              </dd>
              <dd class="notice__txt">
                - 제세공과금은 본인 부담이며, 현금 교환 및 중복 당첨은 불가
                합니다.
              </dd>
              <dd class="notice__txt">
                - 당첨자 발표일로부터 2주 이내 수령 거부, 연락 불능 등으로 경품
                미수령 사유 발생시 당첨이 취소될 수 있습니다.
              </dd>
              <dd class="notice__txt">
                - 경품은 중복 응모가 가능하며, 중복 응모 시 당첨 확률이
                높아집니다.
              </dd>
            </dl>
            <dl class="notice">
              <dt class="notice__tit">
                EVENT 2. 클라우드 리미티드 에디션
              </dt>
              <dd class="notice__txt">
                - 경품은 이벤트 기간 동안 응모 요건 충족 후 이벤트에 응모하고
                메가존클라우드의 마케팅 활용에 동의하신 분에 한하여 추첨을 통해
                제공됩니다.
              </dd>
              <dd class="notice__txt">
                - 경품은 당첨자 발표일로부터 3주 이내 입력하신 주소로 배송되며,
                응모 완료 후 제품 타입 및 사이즈 변경은 불가합니다.
              </dd>
              <dd class="notice__txt">
                - 별도의 당첨자 발표 고지 없이 당첨자에게는 개별 SMS로 당첨 안내
                문자 메시지가 발송됩니다.
              </dd>
            </dl>
            <dl class="notice">
              <dt class="notice__tit">EVENT 3. 선착순 미션 완료</dt>
              <dd class="notice__txt"></dd>
              <dd class="notice__txt">
                - 경품은 이벤트 기간동안 응모요건 충족 후 이벤트에 응모하고
                메가존클라우드 및 관련 파트너사 마케팅 활용 동의하신 분에 한하여
                선착순으로 제공됩니다.
              </dd>
              <dd class="notice__txt">
                - 한정 수량으로 경품은 조기 마감 될 수 있습니다.
              </dd>

              <!-- <dd class="notice__txt">
                  - Special Gift는 당첨 시 이벤트 종료 후 배송지 확인을 위해
                  등록하신 정보로 개별 안내드릴 예정입니다.
                </dd> -->
              <dd class="notice__txt">
                - Event 3 경품의 일부는 파트너사의 후원으로 제작되었습니다.
              </dd>
              <dd class="notice__txt">
                - Special Gift는 파트너사 GitLab과 New Relic의 후원 물품으로,
                당첨 시에는 배송지 확인을 위해 등록하신 정보로 개별 안내드릴
                예정입니다.
              </dd>
            </dl>
            <dl class="notice">
              <dt class="notice__tit">
                세미나 및 이벤트 관련 문의
                <a href="mailto:digitalspectrum_cs@dspectrum.com"
                  >digitalspectrum_cs@dspectrum.com</a
                >
              </dt>
              <dd class="notice__txt">
                - 본 세미나는 메가존클라우드 주식회사의 위탁을 받아 메가존㈜에서
                대행, 운영됩니다.
              </dd>
            </dl>
            <button type="button" class="seal" @click="currentSceneIdx = 3">
              <svg
                width="128"
                height="128"
                viewBox="-10 -10 128 128"
                class="seal__text"
              >
                <defs>
                  <path
                    id="text-path"
                    fill-rule="evenodd"
                    fill="none"
                    d="M53.008,0.055 C81.886,0.055 105.297,23.645 105.297,52.746 C105.297,81.847 81.886,105.438 53.008,105.438 C24.129,105.438 0.719,81.847 0.719,52.746 C0.719,23.645 24.129,0.055 53.008,0.055 Z"
                  />
                </defs>
                <text class="cls-1">
                  <textPath xlink:href="#text-path">
                    <tspan class="cls-2">
                      3 BIG EVENT&nbsp; &nbsp;&nbsp; &nbsp; 3 BIG EVENT
                      &nbsp;&nbsp; &nbsp; &nbsp; 3 BIG EVENT &nbsp; &nbsp;&nbsp;
                      &nbsp;
                    </tspan>
                  </textPath>
                </text>
              </svg>
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                class="seal__circle"
              >
                <circle class="cls-3" cx="64" cy="64" r="40" />
                <image
                  x="57"
                  y="54"
                  width="15"
                  height="22"
                  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAqUlEQVQ4je2TsRHCMAxFn6FKmQ3IBpRsA3TZAmeCwAQkG1CyHZzuFE6xLUhDl99Ytv+TfLYVQl3jKAIXoNM40zf4ZeJQMmw8colWeIX/D0f9x/1C5qr+KI1hG2AAzhqXGkP2j7byzZhOwN2pOAOF24aqegINsNdFGXdmju5bcARa289pZk8CygmRypPnkZygpA+Ywr8SzMAS7CXIQA+eEshlHPQ12swBvAHwVBxfjDv0RQAAAABJRU5ErkJggg=="
                />
              </svg>
            </button>
          </div>
        </section>
      </div>

      <div :class="{ bottom__main: currentSceneIdx === 0 }" class="navi">
        <ul class="navi__tab">
          <li
            v-for="idx in 3"
            :id="`eventNavEventType${idx}`"
            :key="idx"
            :class="{ '-isActive': currentSceneIdx === idx }"
            @click="navClickHandler(idx)"
          >
            <strong class="uppercase">event{{ idx }}</strong>
            <p>
              {{
                idx === 1
                  ? '매주 응모 BIG 경품'
                  : idx === 2
                  ? '클라우드 리미티드 에디션'
                  : '선착순 미션완료'
              }}
            </p>
          </li>
        </ul>
      </div>
    </template>
  </PopBase>
</template>

<script>
import { EventBus } from '@/assets/js/event-bus.js'

import Icon from '@/components/ui/Icon'
import PopBase from '@/components/shared/PopBase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopEvent',
  components: { Icon, PopBase },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {
      isSceneBlock: false,
      isScrollBlock: false,
      currentSceneIdx: 0,
      event1: {
        isOpenEvents: {
          infrastructure: true,
          platform: true,
          application: true,
          data: true
        }
      },
      event2: {
        categoryType: {
          application: { type: 'application', watched: false, isOpen: true },
          data: { type: 'data', watched: false, isOpen: true },
          infrastructure: {
            type: 'infrastructure',
            watched: false,
            isOpen: true
          },
          platform: { type: 'platform', watched: false, isOpen: true }
        }
      },

      event3: {},
      // event1
      event1SelectedWeekIdx: '0',
      // event2
      tshirtNum: 1,
      // event3
      missions: [
        {
          name: '추가정보<br>입력하기',
          isCompleteVal: 'isWriteAddtional',
          // isComplete: false,
          action: `${this.openPopAdditionalInfo}`
        },
        {
          name: '키노트 영상<br>1회 시청',
          // isComplete: false,
          isCompleteVal: 'isWatchSession'
        },
        {
          name: '공유하기<br>1회',
          // isComplete: false,
          isCompleteVal: 'isShared'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot,
      stateCategories: (state) => state.session.categories,
      isLogin: (state) => state.auth.user.isLogin,
      isNecessaryUpdateEvent: (state) => state.isNecessaryUpdateEvent
    })
    // event1SelectedWeekName() {
    //   // return 'data'
    //   // return this.satateCategories[this.event1SelectedWeekIdx].name
    //   return this.stateCategories
    //     ? this.stateCategories[this.event1SelectedWeekIdx].name
    //     : 'infrastructure'
    // }
  },
  watch: {
    async isShow(isShow) {
      if (isShow) {
        this.addEventListner()
        if (!this.isLogin) return
        await this.setEventZone()
      } else {
        this.resetData()
        this.removeEventListner()
      }
    },
    currentSceneIdx(newVal) {
      setTimeout(() => {
        this.isSceneBlock = false
      }, 1000)
    },
    isNecessaryUpdateEvent(boolean) {
      if (boolean) {
        this.setEventZone()
        setTimeout(() => {
          this.toggleNecessaryEventStateUpdate(false)
        }, 1000)
      }
    }
  },
  mounted() {
    if (process.browser) {
      EventBus.$on('setEvent3Complete', (boolean) => {
        this.event3.isEntry = boolean
      })
      EventBus.$on('setEvent2Complete', (boolean) => {
        this.event2.isEntry = boolean
      })
    }
  },
  methods: {
    ...mapActions(['showNav', 'gotoZone', 'toggleNecessaryEventStateUpdate']),
    ...mapActions('popup', [
      'openPop',
      'closePop',
      'openAbovePop',
      'openAlert'
    ]),
    ...mapActions('auth', ['getAdditionalInfo']),
    ...mapActions('event', ['getUserEventInfo']),
    ...mapActions('session', ['toggleNecessaryCategoryListUpdate']),
    async setEventZone() {
      const userEventInfo = await this.getUserEventInfo()
      if (!userEventInfo) return

      this.event1 = userEventInfo.event1
      this.event2 = userEventInfo.event2
      this.event3 = userEventInfo.event3
    },
    participateEvent(eventType, giftType, giftName) {
      if (!this.isLogin) {
        this.openPop({ name: 'login', isOverlap: true })
        return
      }
      const isApplying = this[`${eventType}`].isApplying.isApplying

      if (eventType === 'event1') {
        if (isApplying === 'N') {
          const type = this[`${eventType}`].isApplying.type
          if (type === 'point') {
            this.openAlert({
              message:
                '응모 가능 포인트가 부족합니다!<br>세션 영상 시청 및 설문 조사, 공유 등의 활동으로 포인트를 적립해보세요.'
            })
            return
          }
        }
      }

      if (eventType === 'event2') {
        const categoryType = this[`${eventType}`].categoryType
        for (const value of Object.entries(categoryType)) {
          // console.log(categoryType[value[0]].isOpen)
          if (!categoryType[value[0]].isOpen) {
            this.openAlert({
              message: '11월 23일부터 응모가 가능합니다.'
            })
            return
          }
        }

        if (isApplying === 'N') {
          const type = this[`${eventType}`].isApplying.type

          if (type === 'point') {
            this.openAlert({
              message:
                '응모 가능 포인트가 부족합니다!<br>세션 영상 시청 및 설문 조사, 공유 등의 활동으로 포인트를 적립해보세요.'
            })
            return
          }

          if (type === 'key-note') {
            this.openAlert({
              message: 'KeyNote 세션 4개를 모두 시청해주세요.'
            })
            return
          }
        }
      }

      if (eventType === 'event3' && isApplying === 'N') {
        const isWriteAddtional = this[`${eventType}`].isWriteAddtional
        const isWatchSession = this[`${eventType}`].isWatchSession
        const isShared = this[`${eventType}`].isShared

        if (isWriteAddtional !== 'Y') {
          this.openAlert({
            message: '추가정보 입력하기 미션을 완료해주세요.'
          })
          return
        }
        if (isWatchSession !== 'Y') {
          this.openAlert({
            message: '키노트 영상 1회 시청 미션을 완료해주세요.'
          })
          return
        }
        if (isShared !== 'Y') {
          this.openAlert({ message: '공유하기 미션을 완료해주세요.' })
          return
        }
      }
      // giftType은 event1 만 넘겨 받으면 됨
      this.$emit('setEventType', { eventType, giftType, giftName })
      this.openPop({ name: 'participateEvent', isOverlap: true })
      // this.openAbovePop({ name: eventType, message })
    },
    participateMission(eventName, categoryIdx) {
      if (!this.isLogin) {
        this.openPop({ name: 'login', isOverlap: true })
        return
      }
      if (eventName === 'event2') {
        this.closePop()
        this.showNav(false)
        this.toggleNecessaryCategoryListUpdate(true)
        this.gotoZone(['session', 1, categoryIdx])
      }
      // event3 -> categoryIdx만 보내도 될듯
      else if (eventName === 'event3') {
        switch (categoryIdx) {
          case 0:
            this.openPopAdditionalInfo()
            break
          case 1:
            this.closePop()
            this.showNav(false)
            this.gotoZone(['session', 0, null])
            break
          case 2:
            this.closePop()
            this.showNav('menu')
            break
        }
      }
    },
    openPopAdditionalInfo() {
      this.openPop({ name: 'additionalInfo', isOverlap: true })
      // this.isExistAdditionalInfo
      //   ? this.openPop({ name: 'additionalInfo', isOverlap: true })
      //   : this.getAdditionalInfo()
    },

    addEventListner() {
      // pc
      if (this.$device.isDesktop) {
        document
          .querySelector('.event__wrap')
          .addEventListener('mousewheel', this.wheelHandler)
      }
      // mobile & tablet
      else {
        const eventList = document.querySelectorAll('.event')
        eventList.forEach((list) => {
          list.addEventListener('scroll', this.scrollHandler)
        })
        document
          .querySelector('.event__wrap')
          .addEventListener('touchstart', this.touchStartHandler)
        document
          .querySelector('.event__wrap')
          .addEventListener('touchend', this.touchEndHandler)
      }
    },
    removeEventListner() {
      // pc
      if (this.$device.isDesktop) {
        document
          .querySelector('.event__wrap')
          .removeEventListener('mousewheel', this.wheelHandler)
      }
      // mobile & tablet
      else {
        document
          .querySelector('.event__wrap')
          .removeEventListener('touchstart', this.touchStartHandler)
        document
          .querySelector('.event__wrap')
          .removeEventListener('touchend', this.touchEndHandler)
      }
    },

    // ui
    wheelHandler(e) {
      if (!this.isScrollBlock) {
        let isScrollDown
        e.wheelDelta < 0 ? (isScrollDown = true) : (isScrollDown = false)
        if (isScrollDown && !this.isSceneBlock) {
          if (this.currentSceneIdx === 4) return
          this.isSceneBlock = true
          this.currentSceneIdx++
        } else if (!isScrollDown && !this.isSceneBlock) {
          if (this.currentSceneIdx === 0) return
          this.isSceneBlock = true
          this.currentSceneIdx--
        }
      }
    },
    scrollHandler(e) {
      const vh = parseFloat(
        getComputedStyle(document.body).getPropertyValue('--vh')
      )
      const DOMRect = this.$refs[
        `section${this.currentSceneIdx}Inner`
      ].getBoundingClientRect()

      // alert('DOMRect.top :: ' + DOMRect.top)
      // alert('DOMRect.height :: ' + DOMRect.height)
      // alert('vh :: ' + vh)
      if (
        Math.floor(DOMRect.top) < 0 &&
        Math.floor(DOMRect.top) >
          Math.floor(vh) - 100 - Math.floor(DOMRect.height)
      ) {
        this.isScrollBlock = true
      } else {
        this.isScrollBlock = false
      }
      // alert(this.isScrollBlock)
    },
    touchStartHandler(e) {
      this.ts = e.touches[0].clientY
    },
    touchEndHandler(e) {
      if (!this.isScrollBlock && !this.isSceneBlock) {
        // if (e.target.tagName === 'BUTTON') return false
        const te = e.changedTouches[0].clientY

        const tAmount = this.ts - te
        if ((tAmount >= 0 && tAmount <= 50) || (tAmount < 0 && tAmount >= -50))
          return

        let isTouchDown
        tAmount < 0 ? (isTouchDown = false) : (isTouchDown = true)

        if (isTouchDown) {
          if (this.currentSceneIdx === 4) return
          // else if (this.$refs.vs[`section${this.currentSceneIdx}`].scrollTop > 0) return
          this.isSceneBlock = true
          this.currentSceneIdx++
        } else if (!isTouchDown) {
          // alert('위로')
          if (this.currentSceneIdx === 0) return
          // else if (this.$refs.vs.scrollTop > 0) return
          this.isSceneBlock = true
          this.currentSceneIdx--
        }
      }
    },
    navClickHandler(idx) {
      this.currentSceneIdx = idx
      if (this.$device.isMobile) {
        this.$refs[`section${idx}`].scrollTo(0, 0)
      }
    }
  }
}
</script>

<style lang="scss">
.popup__event {
  .popup__inner {
    @include breakpoint() {
      @include background(
        map-get($mzc, 'image-url') + '/event/bg_event_m.jpg',
        $position: top center,
        $size: cover
      );
    }
  }
  @include breakpoint('pc') {
    @include background(
      map-get($mzc, 'image-url') + '/event/bg_event.jpg',
      $position: center center,
      $size: cover
    );
  }
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/pages/event.scss';
</style>
