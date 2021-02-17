<template>
  <div class="wrap">
    <table class="table--left">
      <thead>
        <tr>
          <th>#</th>
          <th>매치승률</th>
          <th>라인업</th>
          <th>핵심기물 TOP5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>45%</td>
          <td>
            <div class="lineUp__box">
              <Line-Up :name="'Mech'" :num="'6'" />
              <Line-Up :name="'Assassin'" :num="'2'" />
              <Line-Up :name="'Druid'" :num="'2'" />
            </div>
          </td>
          <td>
            <Objects
              :names="[
                'Abyssal Guard',
                'Abyssalcrawler',
                'Argali Knight',
                'Ashes Hell Knight',
                'Berserker'
              ]"
            />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>45%</td>
          <td>
            <div class="lineUp__box">
              <Line-Up :name="'Hunter'" :num="'3'" />
              <Line-Up :name="'Knight'" :num="'1'" />
              <Line-Up :name="'Mage'" :num="'5'" />
            </div>
          </td>
          <td>
            <Objects
              :names="[
                'Defector',
                'Desperate Doctor',
                'Devastator',
                'Doom Arbiter',
                'Dragon Knight'
              ]"
            />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>45%</td>
          <td>
            <div class="lineUp__box">
              <Line-Up :name="'Priest'" :num="'4'" />
              <Line-Up :name="'Shaman'" :num="'6'" />
              <Line-Up :name="'Warlock'" :num="'1'" />
            </div>
          </td>
          <td>
            <Objects
              :names="[
                'Evil Knight',
                'Fallen Witcher',
                'Flame Wizard',
                'Fortune Teller',
                'Frost Knight'
              ]"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table--right">
      <thead>
        <tr>
          <th>게임수(선택비율)</th>
          <th>최종순위</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>55.71(12%)</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>
        <tr>
          <td>54.23(11%)</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>
        <tr>
          <td>54.09(10%)</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LineUp from '@/components/icons/LineUp/index'
import Objects from '@/components/icons/Objects/index'
import BarChart from '@/components/chart/BarChart'

export default {
  components: {
    LineUp,
    Objects,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  overflow-x: auto;
  max-width: 740px;
  margin: 12px auto 0;
  background-color: #fff;

  table {
    width: 100%;
    font-size: 12px;

    thead {
      th {
        padding: 12px 0 6px;
        background-color: #f7f7f9;
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          td {
            background-color: #f7f7f9;
          }
        }
      }
      td {
        vertical-align: middle;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #ebeef1;
      }

      tr {
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    table {
      flex: 0 0 100%;
    }
  }

  .table--left {
    thead {
      color: #9aa4af;

      th {
        &:first-child {
          padding: 0 12px;
          border-radius: 4px 0 0 0;
        }
      }
    }

    tbody {
      tr {
        &:last-child {
          td {
            &:first-child {
              border-radius: 0 0 0 4px;
            }
          }
        }
      }
    }
  }
  .table--right {
    thead {
      color: #9aa4af;

      th {
        padding-bottom: 4px;

        &:last-child {
          border-radius: 0 4px 0 0;
        }
      }
    }

    tbody {
      tr {
        &:last-child {
          td {
            &:last-child {
              border-radius: 0 0 4px 0;
            }
          }
        }
      }
    }
  }
}
</style>
