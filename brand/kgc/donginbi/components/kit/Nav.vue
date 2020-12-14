<template>
  <div>
    <!-- nav : pc -->
    <nav v-if="deviceKind === 'pc'" role="navigation">
      <ul>
        <li
          v-for="(nav, idx) in navList"
          :key="nav.name"
          :class="{ on: currentSection == nav.name }"
          @click="goSection('#' + nav.name)"
          :data-gtm-action="nav.title"
          data-gtm-category="MENU"
        >
          <span
            :data-gtm-action="nav.title"
            class="nav__txt"
            data-gtm-category="MENU"
            >{{ nav.title }}</span
          >
          <span class="nav__icon">
            <img
              :data-gtm-action="nav.title"
              :src="`${imageUrl}/${deviceKind}/icon_nav${idx}.png`"
              data-gtm-category="MENU"
              alt
            />
          </span>
        </li>
        <li
          data-gtm-category="MENU"
          data-gtm-action="구매하기"
          onclick="
            window.open('https://www.kgcshop.co.kr/shop/goodsView?itemId=56399&utm_source=event_p&utm_medium=buy&utm_campaign=DongP_event')
          "
        >
          <span
            class="nav__txt"
            data-gtm-category="MENU"
            data-gtm-action="구매하기"
            >구매하기</span
          >
          <span class="nav__icon">
            <img
              :src="`${imageUrl}/${deviceKind}/icon_nav5.png`"
              data-gtm-category="MENU"
              data-gtm-action="구매하기"
              alt
            />
          </span>
        </li>
      </ul>
    </nav>

    <!-- nav : mo -->
    <h1 v-if="deviceKind === 'm'" :class="{ fixed: isNavOn }" class="logo">
      <svg width="121px" height="30px">
        <path
          :fill="isNavOn ? '#fff' : '#661017'"
          fill-rule="evenodd"
          d="M118.299,15.621 L118.299,0.492 L120.362,0.492 L120.362,15.621 L118.299,15.621 ZM109.673,15.621 L101.182,15.621 L101.182,0.492 L109.811,0.492 C111.069,0.492 112.063,0.868 112.785,1.623 C113.505,2.373 113.867,3.377 113.867,4.627 C113.867,6.009 113.326,7.074 112.247,7.827 C113.669,8.412 114.380,9.688 114.380,11.652 C114.380,14.297 112.811,15.621 109.673,15.621 ZM111.335,3.295 C110.995,2.930 110.527,2.749 109.928,2.749 L103.241,2.749 L103.241,6.824 L109.846,6.824 C110.416,6.824 110.895,6.623 111.281,6.225 C111.663,5.828 111.852,5.338 111.852,4.766 C111.852,4.147 111.685,3.660 111.335,3.295 ZM110.015,9.079 L103.241,9.079 L103.241,13.362 L109.687,13.362 C111.411,13.362 112.268,12.674 112.268,11.297 C112.268,9.818 111.518,9.079 110.015,9.079 ZM84.502,3.216 L84.502,15.621 L82.438,15.621 L82.438,0.492 L85.003,0.492 L94.509,12.901 L94.509,0.492 L96.569,0.492 L96.569,15.621 L94.001,15.621 L84.502,3.216 ZM75.394,0.492 L77.454,0.492 L77.454,15.621 L75.394,15.621 L75.394,0.492 ZM69.230,29.575 L69.230,28.934 C71.264,28.790 72.477,27.854 72.878,26.219 C72.378,26.661 71.735,26.978 70.643,26.978 C69.230,26.978 68.081,26.340 68.081,25.000 C68.081,23.615 69.319,22.905 70.931,22.905 C72.465,22.905 73.704,23.608 73.704,25.457 C73.704,27.134 72.619,29.405 69.230,29.575 ZM70.896,23.552 C69.616,23.552 68.930,24.130 68.930,24.965 C68.930,25.833 69.647,26.330 70.863,26.330 C72.091,26.330 72.850,25.789 72.850,24.965 C72.850,24.159 72.066,23.552 70.896,23.552 ZM63.322,16.058 C61.132,16.058 59.305,15.388 57.837,14.032 C56.177,12.501 55.343,10.502 55.343,8.036 C55.343,5.611 56.187,3.616 57.870,2.058 C59.349,0.697 61.225,0.012 63.495,0.012 C66.229,0.012 68.477,1.231 70.231,3.669 L68.304,4.836 C67.013,3.154 65.346,2.310 63.322,2.310 C61.739,2.310 60.417,2.783 59.349,3.731 C58.115,4.830 57.493,6.267 57.493,8.036 C57.493,9.735 58.025,11.114 59.093,12.174 C60.160,13.233 61.564,13.760 63.322,13.760 C66.215,13.760 68.423,12.097 68.781,9.854 L64.379,9.854 L64.379,7.601 L71.260,7.601 L71.260,7.827 C71.260,10.285 70.535,12.271 69.088,13.789 C67.640,15.302 65.718,16.058 63.322,16.058 ZM56.904,24.708 C56.904,25.400 56.437,25.816 55.734,26.074 C56.677,26.339 57.223,26.894 57.223,27.744 C57.223,29.002 56.132,29.660 54.430,29.660 C52.737,29.660 51.669,29.020 51.669,27.765 C51.669,26.917 52.215,26.360 53.151,26.095 C52.468,25.858 51.987,25.437 51.987,24.728 C51.987,23.720 52.863,22.991 54.457,22.991 C56.047,22.991 56.904,23.702 56.904,24.708 ZM52.490,27.744 C52.490,28.504 53.143,29.014 54.457,29.014 C55.770,29.014 56.401,28.526 56.401,27.765 C56.401,27.008 55.682,26.452 54.430,26.452 C53.183,26.452 52.490,26.989 52.490,27.744 ZM54.430,23.637 C53.239,23.637 52.812,24.163 52.812,24.708 C52.812,25.337 53.429,25.807 54.457,25.807 C55.453,25.807 56.077,25.323 56.077,24.728 C56.077,24.179 55.629,23.637 54.430,23.637 ZM39.510,3.216 L39.510,15.621 L37.449,15.621 L37.449,0.492 L40.010,0.492 L49.515,12.901 L49.515,0.492 L51.578,0.492 L51.578,15.621 L49.012,15.621 L39.510,3.216 ZM25.884,16.058 C23.684,16.058 21.847,15.388 20.381,14.032 C18.708,12.501 17.872,10.502 17.872,8.036 C17.872,5.611 18.721,3.616 20.415,2.058 C21.905,0.697 23.729,0.012 25.884,0.012 C28.051,0.012 29.866,0.697 31.336,2.058 C33.015,3.616 33.857,5.611 33.857,8.036 C33.857,10.514 33.022,12.522 31.351,14.053 C29.886,15.391 28.060,16.058 25.884,16.058 ZM29.856,3.731 C28.788,2.783 27.464,2.310 25.884,2.310 C24.153,2.310 22.742,2.849 21.654,3.930 C20.563,5.009 20.020,6.379 20.020,8.036 C20.020,9.749 20.552,11.132 21.619,12.184 C22.684,13.233 24.106,13.760 25.884,13.760 C27.651,13.760 29.063,13.233 30.123,12.174 C31.181,11.114 31.711,9.735 31.711,8.036 C31.711,6.267 31.091,4.830 29.856,3.731 ZM8.260,15.621 L-0.005,15.621 L-0.005,0.492 L7.866,0.492 C10.032,0.492 11.747,1.194 13.016,2.592 C14.281,3.990 14.915,5.867 14.915,8.225 C14.915,10.384 14.243,12.179 12.900,13.615 C11.651,14.954 10.106,15.621 8.260,15.621 ZM11.399,4.240 C10.542,3.244 9.422,2.749 8.036,2.749 L2.059,2.749 L2.059,13.362 L8.433,13.362 C9.671,13.362 10.686,12.879 11.484,11.905 C12.280,10.936 12.677,9.688 12.677,8.160 C12.677,6.537 12.250,5.232 11.399,4.240 ZM48.319,23.075 L48.319,29.644 L47.612,29.644 L47.612,23.773 L46.190,24.447 L46.017,23.821 L47.612,23.075 L48.319,23.075 ZM62.409,26.978 C60.996,26.978 59.847,26.340 59.847,25.000 C59.847,23.615 61.085,22.905 62.693,22.905 C64.229,22.905 65.469,23.608 65.469,25.457 C65.469,27.134 64.384,29.405 60.996,29.575 L60.996,28.934 C63.026,28.790 64.243,27.854 64.641,26.219 C64.141,26.661 63.501,26.978 62.409,26.978 ZM64.620,24.965 C64.620,24.159 63.836,23.552 62.658,23.552 C61.379,23.552 60.693,24.130 60.693,24.965 C60.693,25.833 61.417,26.330 62.631,26.330 C63.855,26.330 64.620,25.789 64.620,24.965 Z"
        />
      </svg>
    </h1>
    <div v-if="deviceKind === 'm'" class="header">
      <header>
        <button
          :class="{ on: isNavOn }"
          @click="toggleNav"
          class="btn__hamburger"
          type="button"
        >
          <span class="btn__hamburger-box">
            <span class="btn__hamburger-inner"></span>
          </span>
        </button>
      </header>

      <input
        ref="inputVirtual"
        :checked="isNavOn"
        type="checkbox"
        class="input__virtual"
      />
      <nav class="nav" role="navigation">
        <div @click.self="toggleNav()" class="dimm"></div>
        <div class="nav__inner">
          <a
            v-for="nav in navList"
            :class="{ on: currentSection == nav.name }"
            :href="nav.name"
            :key="nav.name"
            @click.prevent="goSection('#' + nav.name, true)"
            class="nav__btn"
            >{{ nav.title }}</a
          >
          <a
            class="nav__btn"
            href="https://www.kgcshop.co.kr/shop/goodsView?itemId=56399&utm_source=event_p&utm_medium=buy&utm_campaign=DongP_event"
            target="_blank"
            data-gtm-category="MENU"
            data-gtm-action="구매하기"
            >구매하기</a
          >
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Nav',
  data() {
    return {
      isNavOn: false,
      navList: [
        { name: 'visual', title: 'Home', area: null },
        { name: 'review', title: '리얼후기', area: null },
        { name: 'video', title: '공유하기', area: null },
        { name: 'event', title: '샘플 신청하기', area: null },
        { name: 'product', title: '제품정보', area: null }
      ],
      currentSection: null,
      deviceKind: this.$device.isDesktop ? 'pc' : 'm',
      scrollTop: 0
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.kit.imageUrlRoot}`
      }
    })
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent)

    this.hash = location.hash
    if (process.browser) {
      window.onNuxtReady((app) => {
        this.init()
      })
    }
    this.getCurrentSection()
    this.setSectionArea()
    this.$nextTick(function() {
      this.currentSection = this.getCurrentSection()
    })
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    init() {
      if (location.hash) {
        this.goSection(location.hash)
      }
    },
    toggleNav(e) {
      this.isNavOn = !this.isNavOn
    },
    setSectionArea() {
      // section 높이값 get

      let addValue
      this.deviceKind === 'pc' ? (addValue = 5) : (addValue = 100)
      return this.navList.map(function(section) {
        section.area = Math.ceil(
          $('#' + section.name).offset().top +
            $('#' + section.name).height() -
            addValue
        )
      })
    },
    getCurrentSection() {
      const self = this

      for (const section in self.navList) {
        if (self.scrollTop <= self.navList[section].area) {
          return self.navList[section].name
        }
      }
    },
    scrollEvent() {
      this.scrollTop = Math.ceil($(window).scrollTop())
      this.currentSection = this.getCurrentSection()
    },
    goSection(section, toggle) {
      const offsetTop = $(section).offset().top

      $('html, body').animate(
        {
          scrollTop: Math.ceil(offsetTop)
        },
        500
      )
      if (toggle) this.toggleNav()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/kit/_nav';
</style>
