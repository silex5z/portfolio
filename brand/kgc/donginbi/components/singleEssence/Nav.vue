<template>
  <div>
    <!-- nav : pc -->
    <nav v-if="deviceKind === 'pc'">
      <ul>
        <li
          v-for="(nav, idx) in navList"
          :key="nav.name"
          :class="{ on: currentSection == nav.name }"
          @click="goSection('#' + nav.name)"
        >
          <span class="nav__txt">{{ nav.title }}</span>

          <span class="nav__icon">
            <img :src="`${imageUrl}/` + 'icon_nav' + idx + '.png'" alt="" />
          </span>
        </li>
        <li @click="openPop({ popName: 'PopStore' })">
          <span
            class="nav__txt"
            data-gtm-category="제품구매"
            data-gtm-action="구매하기"
            >구매하기</span
          >
          <span class="nav__icon"
            ><img :src="`${imageUrl}/` + 'icon_nav5.png'" alt="" />
          </span>
        </li>
      </ul>
    </nav>

    <!-- nav : mo -->
    <div v-else class="header">
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
          >
            {{ nav.title }}
          </a>
          <a
            @click.prevent="openPop({ popName: 'PopStore' })"
            class="nav__btn"
            href="#"
            target="_blank"
            data-gtm-category="제품구매"
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
        { name: 'visual', title: '메인', area: null },
        { name: 'video', title: '공유하기', area: null },
        { name: 'event1', title: '샘플신청', area: null },
        { name: 'event2', title: '공유이벤트', area: null },
        { name: 'product', title: '제품소개', area: null }
      ],
      currentSection: null,
      deviceKind: this.$device.isDesktop ? 'pc' : 'm',
      scrollTop: 0
    }
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.singleEssence.imageUrlRoot}/${this.deviceKind}`
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
