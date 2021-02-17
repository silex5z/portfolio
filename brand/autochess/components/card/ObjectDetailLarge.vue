<template>
  <div class="large__card purple">
    <img class="large__card__object" src="~@/assets/img/temp/warrior.png" alt />
    <div class="header__skill">
      <section class="large__card__header">
        <em class="header__text">조류/흑마법사</em>
        <h2 class="header__title">오우거 마법사</h2>
      </section>
      <article class="large__card__skill">
        <img class="skill__icon" src="~@/assets/img/temp/skill.png" alt />
        <span class="skill__name__icon">
          <em class="skill__name">드레곤 발리스타</em>
          <span class="skill__text__icon">패시브</span>
        </span>
        <p class="skill__description">
          공격할 때마다 상대의 마나를 30/60/90 소모시킵니다. 소모시킨 마나의
          60%만큼 추가 물리 피해를 줍니다.
        </p>
      </article>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.large__card {
  position: relative;
  border-radius: 4px;

  &.purple {
    @include background(
      '~@/assets/img/icons/bg/purple_large.png',
      center,
      null,
      null,
      cover
    );
  }
  &.yellow {
    @include background(
      '~@/assets/img/icons/bg/yellow_large.png',
      center,
      null,
      null,
      cover
    );
  }
  &.pink {
    @include background(
      '~@/assets/img/icons/bg/pink_large.png',
      center,
      null,
      null,
      cover
    );
  }
  &.blue {
    @include background(
      '~@/assets/img/icons/bg/blue_large.png',
      center,
      null,
      null,
      cover
    );
  }
  &.teal {
    @include background(
      '~@/assets/img/icons/bg/teal_large.png',
      center,
      null,
      null,
      cover
    );
  }
}

.large__card__object {
  position: absolute;
  top: 0;
  right: 4px;
  width: 250px;
  height: 250px;
}

.large__card__header {
  position: absolute;
  top: 46px;
  left: 16px;

  .header__text {
    color: #decfff;
    font-size: 14px;
  }

  .header__title {
    width: 70px;
    margin-top: 4px;
    line-height: 26px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}

.large__card__skill {
  position: absolute;
  bottom: 12px;
  left: 16px;
  width: 288px;
  height: 97px;
  padding: 32px 14px 12px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.3);

  .skill__icon {
    position: absolute;
    top: -24px;
    left: 14px;
    width: 48px;
    height: 48px;
  }

  .skill__description {
    display: block;
    margin-top: 7px;
    line-height: 14px;
    color: #9aa4af;
    font-size: 11px;
  }
}

.skill__name__icon {
  display: flex;
  align-items: center;

  .skill__name {
    color: #c3cbd1;
    font-size: 14px;
  }
  .skill__text__icon {
    margin-left: auto;
    padding: 3px 8px 1px;
    border-radius: 15px;
    background-color: #515163;
    color: #fff;
    font-size: 11px;
  }
}

@media (min-width: 768px) and (max-width: 1280px) {
  .large__card {
    display: flex;
  }

  .large__card__header {
    .header__title {
      width: 100%;
    }
  }

  .large__card__object {
    position: static;
    margin: 0 44px;
  }

  .header__skill {
    width: 100%;
    padding: 28px 12px 28px 0;
  }

  .large__card__header {
    position: static;
  }

  .large__card__skill {
    position: relative;
    top: 47px;
    left: 0;
  }
}

@media (max-width: 767px) {
  .large__card {
    border-radius: 0;
  }
}
</style>
