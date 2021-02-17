<template>
  <div class="wrap">
    <table class="table--left">
      <thead>
        <tr>
          <th>#</th>
          <th class="underline--blue">티어</th>
          <th>기물이름</th>
          <th>종족/직업</th>
          <th>성급</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <Tier :num="'1'" />
          </td>
          <td>
            <Card-Text
              :name="'object'"
              :text="'부패한 영혼 수확자'"
            />
          </td>
          <td>
            <TribeJob :tribeName="'Goblin'" :jobName="'Assassin'" />
          </td>
          <td>
            <Three-Star :rank="'1'" />
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td>
            <Tier :num="'2'" />
          </td>
          <td>
            <Card-Text
              :name="'object'"
              :text="'부패한 영혼 수확자'"
            />
          </td>
          <td>
            <TribeJob :tribeName="'Goblin'" :jobName="'Assassin'" />
          </td>
          <td>
            <Three-Star :rank="'2'" />
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table--right">
      <thead>
        <tr>
          <th>추천 아이템</th>
          <th class="underline--blue">게임수(선택비율)</th>
          <th class="underline--blue">평균라운드</th>
          <th class="underline--blue">최종순위</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Objects
              :names="['Abyssal Guard', 'Abyssalcrawler', 'Argali Knight']"
            />
          </td>
          <td>55.71(12%)</td>
          <td>16.12%</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>

        <tr>
          <td>
            <Objects
              :names="['Abyssal Guard', 'Abyssalcrawler', 'Argali Knight']"
            />
          </td>
          <td>55.71(12%)</td>
          <td>16.12%</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Tier from '@/components/icons/Tier/index'
import Objects from '@/components/icons/Objects/index'
import CardText from '@/components/text/CardText'
import TribeJob from '@/components/icons/TribeJob/index'
import ThreeStar from '@/components/icons/Shape/Three-Star'
import BarChart from '@/components/chart/BarChart'

export default {
  name: 'HomeTable',
  components: {
    Tier,
    Objects,
    CardText,
    TribeJob,
    ThreeStar,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  overflow-x: auto;
  max-width: 740px;
  margin: 12px auto 24px;
  border-radius: 4px;
  background-color: #fff;

  table {
    width: 100%;
    font-size: 12px;

    thead {
      color: #9aa4af;

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
      th {
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
