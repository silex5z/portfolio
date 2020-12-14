<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'eventParticipate'"
    :width="$device.isMobile ? 580 : 500"
    :mask="false"
    :data-event-type="eventData.eventType"
  >
    <template #contents>
      <component
        :is="eventType(eventData.eventType)"
        :event-data="eventData"
        :is-show="initEvent"
      ></component>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import Event1 from '@/components/popup/part/Event1'
import Event2 from '@/components/popup/part/Event2'
import Event3 from '@/components/popup/part/Event3'

export default {
  name: 'PopEventParticipate',
  components: { PopBase },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    eventData: {
      type: Object,
      default: () => ({
        eventType: 'event1',
        giftType: ''
      }),
      required: true
    }
  },
  data() {
    return {
      initEvent: false
    }
  },
  watch: {
    isShow(isShow) {
      if (isShow) {
        setTimeout(() => {
          this.initEvent = true
        }, 500)
      } else {
        this.resetData()
      }
    }
  },
  methods: {
    eventType(eventType) {
      // return Event1
      return eventType === 'event1'
        ? Event1
        : eventType === 'event2'
        ? Event2
        : Event3
    }
  }
}
</script>

<style lang="scss">
.popup__eventParticipate {
  .popup__inner {
    position: relative;
    // display: flex;
    border-radius: 30px;
    background: #000;
    // box-shadow: 0px 34px 30px 0px rgba(50, 50, 50, 0.44);

    overflow: hidden;
    @include breakpoint() {
      width: 580px;
      margin: 0 auto;
      padding: 55px 30px 140px;
    }
    @include breakpoint('pc') {
      width: 500px;
      padding: 40px 30px 100px;
    }

    & > div {
      @include breakpoint() {
        width: 1740px;
      }
      @include breakpoint('pc') {
        width: 1500px;
      }

      left: 0;
      overflow: hidden;
      transition: height 0.5s ease;
      transition-delay: 0.3s;
    }
  }
  .postBox {
    margin-top: 30px;
  }

  .agree {
    &__group {
      margin-top: 25px;
    }
    // &__all {
    //   display: none;
    // }
    // &__item {
    //   margin-bottom: 10px;
    //   span {
    //     color: #fff;
    //   }
    //   &:last-child {
    //     margin-bottom: 0;
    //   }
    // }
  }

  &[data-event-type='event1'] {
    .popup__inner {
      border: 2px solid $pointBlueGreen2;
      .btnBox {
        button {
          background: $pointBlueGreen2;
        }
      }
    }
  }
  &[data-event-type='event2'] {
    .popup__inner {
      border: 2px solid $yellow;
      .btnBox {
        button {
          background: $yellow;
        }
      }
    }
  }
  &[data-event-type='event3'] {
    .popup__inner {
      border: 2px solid $green;
      .btnBox {
        button {
          background: $green;
        }
      }
    }
    .agree {
      &__group {
        // margin-top: 70px;
      }
    }
  }

  .popupBtn__close {
    display: none;
  }
}
</style>
