<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'popStore'">
      <template #header>
        <img :src="`${imageUrl}/tit_store.png`" alt="싱글에센스 구매하러가기" />
      </template>
      <template #content>
        <ul>
          <li v-for="store in storeList" :key="store.storeName">
            <a
              :href="store.url"
              :data-gtm-action="store.gtmActionTag"
              target="_blank"
              data-gtm-category="제품구매"
              >{{ store.storeName }}
            </a>
          </li>
        </ul>
      </template>
      <template #footer>
        <button
          @click="closePop"
          type="button"
          class="popupBtn popupBtn__close--full popupBtn--full"
        >
          닫기
        </button>
      </template>

      <template #closeButton>
        <button @click="closePop" type="button" class="popupBtn__close">
          닫기
        </button>
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
    }
  },
  data() {
    return {
      storeList: [
        {
          storeName: '정몰 바로가기',
          url: 'https://www.kgcshop.co.kr/shop/goodsView?itemId=48154',
          gtmActionTag: '구매하기_정몰'
        },
        {
          storeName: 'GS 바로가기',
          url:
            'http://www.gsshop.com/prd/prd.gs?prdid=58185313&kwd=동인비&ab=a&gsid=srcheshop-lresult&rank=1&lseq=395031',
          gtmActionTag: '구매하기_GS'
        },
        {
          storeName: 'SSG 바로가기',
          url:
            'http://www.ssg.com/item/itemView.ssg?itemId=1000044023246&siteNo=6009&salestrNo=1007&tildSrchwd=동인비&srchPgNo=1&src_area=ssglist',
          gtmActionTag: '구매하기_SSG'
        },
        {
          storeName: 'LOTTE 아이몰 바로가기',
          url:
            'http://www.lotteimall.com/goods/viewGoodsDetail.lotte?goods_no=1558104948&infw_disp_no_sct_cd=10&infw_disp_no=0&cart_sn=1&slog=80006_1&allViewYn=N',
          gtmActionTag: '구매하기_롯데'
        },
        {
          storeName: 'Hmall 바로가기',
          url:
            'https://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2104197150&sectId=141253',
          gtmActionTag: '구매하기_H몰'
        },
        {
          storeName: '현대 더 닷컴 바로가기',
          url:
            'http://www.thehyundai.com/front/pda/itemPtc.thd?slitmCd=40A1111973&sectId=&bfp=SearchList',
          gtmActionTag: '구매하기_현대'
        },
        {
          storeName: '갤러리아 바로가기',
          url:
            'https://www.galleria.co.kr/goods/initDetailGoods.action?target=_self&goods_no=2004218528&sale_shop_divi_cd=13&sale_shop_no=&sale_area_no=&tr_yn=&conts_form_cd=100&conts_dist_no=2004218528&conts_divi_cd=20&rel_no=2004218528&rel_divi_cd=10&openwinyn=&disp_ctg_no=&purch_age_limit_cd=00&liquor_yn=N&subs_poss_yn=N&eval_move_yn=N&searchTerm=%EB%8F%99%EC%9D%B8%EB%B9%84',
          gtmActionTag: '구매하기_갤러리아'
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
  methods: {
    ...mapActions('popup', ['openPop', 'closePop'])
  }
}
</script>
