<template>
  <div class="batch">
    <div class="batch__header">
      <span class="header__date">10.01 21:33</span>
      <hr class="line" />
      <div class="header__info">
        <span class="info__object">
          <img src="~@/assets/img/icons/object/queen.png" alt />
          퀸(220)
        </span>
        <span class="info__round">25 Round</span>
      </div>
    </div>
    <div class="batch__items__wrap">
      <ul class="batch__items">
        <li class="batch__item">
          <Batch-Icon />
        </li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
      </ul>
      <ul class="batch__items">
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
      </ul>
      <ul class="batch__items">
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
      </ul>
      <ul class="batch__items">
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
        <li class="batch__item"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import BatchIcon from '@/components/icons/Batch/index'
export default {
  components: {
    BatchIcon
  }
}
</script>

<style lang="scss" scoped>
.batch {
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 740px;
  padding: 11px 12px;
  background-color: #fff;
}

@media (max-width: 767px) {
  .batch {
    width: 100%;
  }
}

.batch__header {
  width: 147px;
  margin-right: 28px;
  color: #9aa4af;
  font-size: 12px;

  .header__date {
    font-family: 'Roboto';
  }

  .line {
    margin: 6px 0 8px;
  }

  .header__info {
    display: flex;

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 7px 1px;
      border-radius: 50px;
      background-color: #ebeef1;
    }

    .info__object {
      > img {
        width: 18px;
        height: 18px;
      }
    }

    .info__round {
      margin-left: 4px;
      font-family: 'Roboto';
    }
  }
}

.batch__items {
  display: flex;
  width: 366px;

  .batch__item {
    width: 44px;
    height: 44px;
    margin: 1px;
    border: 1px solid #dbe0e4;
    border-radius: 4px;
    background-color: #fff;
  }
}

@media (max-width: 600px) {
  .batch__header {
    font-size: 11px;

    .header__info {
      > span {
        padding: 2px 4px 1px;
      }

      .info__object {
        min-width: 62px;
      }

      .info__round {
        min-width: 53px;
      }
    }
  }
  .batch__items {
    .batch__item {
      width: 32px;
      height: 32px;
    }
  }
}

@media (max-width: 470px) {
  .batch {
    flex-direction: column;
  }
  .batch__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 270px;
    margin-right: 0;
    border-bottom: 1px solid #ebeef1;
    padding-bottom: 8px;
    margin-bottom: 8px;

    .header__date {
      margin-right: 7px;
    }

    .line {
      display: none;
    }

    .header__info {
      .info__object {
        > img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .batch__items {
    width: 272px;
  }
}
</style>
