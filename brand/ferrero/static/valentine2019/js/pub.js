var app = new Vue({
  el: '#app',

  data: {
    picDatas: [],
    //picDatas: ["https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548773863107.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548773636097.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548772709858.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548769661932.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548763419477.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548760089301.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548759366172.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758436946.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758203775.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758110153.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548757951299.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548756109147.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548755949238.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548754465025.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548751862530.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548747355887.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548745662984.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548745508052.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548743105694.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742828385.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742549564.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742271942.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742158669.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742115507.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742022766.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548741700234.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548738949952.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737674077.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737435037.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737363924.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548735928470.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548734539774.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548733293392.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548731896900.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727837610.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727801090.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727757187.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727601912.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727569492.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726430395.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726384694.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726355086.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726299950.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725886674.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725841314.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725776702.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725603670.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725519397.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725406053.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725377988.png"],
    selectDatas: {
      ages: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
      q1: ['연인', '가족', '친구', '직장 동료 및 지인', '직접 입력'],
      q2: ['편지', '화장품 또는 향수', '쥬얼리 및 패션 액세서리', '전자제품', '꽃다발', '직접입력']
    },
    valentinePrizeList: {
      first: ['김*윤	(2062)', '김*기	(1285)', '김*현	(9177)', '한*민	(4467)', '김*한	(6493)', '이*은	(3411)', '이*훈	(6066)', '이*언	(5516)', '김*은	(0224)', '김*화	(1906)', '서*영	(9412)', '김*신	(5015)', '안*연	(3089)', '이*미	(9715)', '임*민	(5556)', '정*영	(2952)', '최*정	(3892)', '이*	(7725)', '양*일	(3280)', '오*영	(1265)'],
      sec: ['김*을	(4080)', '김*망	(3318)', '한*봄	(8364)', '소*리	(8332)', '유*선	(7190)', '김*영	(2747)', '최*연	(6406)', '김*비	(2227)', '한*정	(0506)', '윤*희	(0000)'],
      third: ['이*서	(7406)', '박*영	(0093)', '최*아	(0082)', '이*기	(2992)', '윤*	(3311)', '성*지	(7741)', '김*영	(3502)', '최*리	(0247)', '윤*현	(9050)', '이*정	(6294)', '이*지	(2436)', '김*율	(8559)', '박*수	(0034)', '박*우	(2453)', '황*은	(3736)', '권*은	(2895)', '이*웅	(3892)', '이*리	(3029)', '박*아	(4091)', '강*율	(8559)', '이*리	(3029)', '양*진	(8129)', '민*찬	(7938)', '이*애	(5985)', '김*지	(9501)', '강*혜	(3563)', '한*애	(1341)', '정*복	(8888)', '이*숙	(9625)', '박*선	(3091)', '안*현	(0414)', '김*우	(5656)', '양*지	(0754)', '이*정	(0569)', '김*인	(8569)', '남*영	(7763)', '석*수	(7935)', '박*경	(3155)', '장*영	(3410)', '전*임	(8929)', '전*선	(2431)', '구*주	(7479)', '진*일	(4362)', '남*현	(1849)', '박*현	(9349)', '김*규	(4004)', '조*일	(8212)', '이*영	(1418)', '최*태	(1067)', '이*균	(2436)']
    },
    romanticUserData: {
      name: '',
      mobile: '',
      age: '',
      gender: '',
      q1: {
        num: '',
        visibleDirectInput: false,
        answer: ''
      },
      q2: {
        num: '',
        visibleDirectInput: false,
        answer: ''
      },
      agree1: false,
      agree2: false
    },
    valentineUserData: {
      name: '',
      mobile: '',
      age: '',
      gender: '',
      isVisit: '',
      upload: null,
      agree1: false,
      agree2: false,
      orientation: 1
    },
    userImg: '',
    isShowFinal: false,
    isMobile: false,
    isScrolled: false,
    giftLink: 'http://item.gmarket.co.kr/Item?goodscode=1512258043',
    navCss: {
      top: '',
      left: 0
    },
    popupTop: '',
    dim: false,
    visiblePopupData: {
      result: false,
      sns: false,
      romantic: false,
      valentine: false,
      caution: false,
      agree: false,
      prize: false
    },
    resultType: 'bang', // win / bang
    typeOfUserInfo: 'romantic', // romantic / valentine,
    navLinks: ['event1', 'event2', 'gift'],
    showNav: '',
    playBtnState: true,
    imgUrl: 'https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/',
    msg: {
      NOTMVEND: '영상을 시청 완료해야 이벤트에 참여 가능합니다!',
      NOTIMG: '파일 형식은 jpeg, png, gif만 올릴 수 있습니다',
      NOTCHECKINFOCOLLECTION: '개인정보 처리에 동의해 주세요',
    },
    mobileOnly: {
      chunkPicData: []
    }
  },
  created: function () {
    this.isMobile = this.detactingDevice();
    this.setUserPic();
  },
  mounted: function () {
    this.onScroll();
    if (!this.isMobile) {
      this.windowEvent(['load', 'resize'], 'add', this.onResize);
    }
    this.windowEvent(['scroll'], 'add', this.onScroll);

    //--- ie slide image cover
    this.$nextTick(function () {
      if (!this.isMobile) this.setResponsiveSlide();
    });
  },
  beforeDestroy: function () {
    if (!this.isMobile) {
      this.windowEvent(['load', 'resize'], 'add', this.onResize);
    }
    this.windowEvent(['scroll'], 'remove', this.onScroll);
  },
  computed: {
    navStyle: function () {
      return 'left: ' + this.navCss.left + 'px; top: ' + this.navCss.top + 'px;';
    },
    userInfoTitle: function () {
      return this.kindUserInfo === 'user-info-romantic' ? '로멘틱 이벤트' : '발렌타인 데이 이벤트';
    },
    popupTopStyle: function () {
      return 'top: ' + this.popupTop + 'px;';
    }
  },
  updated: function () {
    this.$nextTick(this.updateSlider);
  },
  methods: {
    //--- ie slide image cover
    setResponsiveSlide: function () {
      if ('objectFit' in document.documentElement.style === false) {
        utils.toCoverImg('.frame-inner , .image-upload img');
      }
    },
    setUserPic: function () {
    	this.$nextTick(function () {
    		this.chunkPic();
    	});
    },
    updateSlider: function () {

      var options = this.isMobile ? {
        slidesPerView: 2,
      } : {
        slidesPerView: 9,
        breakpoints: {
          2370: {
            slidesPerView: 8
          },
          2100: {
            slidesPerView: 7
          },
          1860: {
            slidesPerView: 6
          },
          1580: {
            slidesPerView: 5
          },
          1320: {
            slidesPerView: 4
          }
        }
      };
      var newOption = this.setSliderOption(options);
      // console.log(newOption);
      var slider = new Swiper('.swiper-container', newOption);
    },
    setSliderOption: function (opt) {
      var option = {
        freeMode: true,
        scrollbar: {
          hide: false,
          el: '.swiper-scrollbar'
        }
      };
      for (var prop in opt) {
        option[prop] = opt[prop];
      }

      return option;
    },
    chunkPic: function (data) {
      // debugger;
      var tempArr = ["https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548773863107.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548773636097.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548772709858.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548769661932.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548763419477.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548760089301.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548759366172.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758436946.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758203775.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548758110153.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548757951299.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548756109147.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548755949238.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548754465025.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548751862530.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548747355887.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548745662984.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548745508052.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548743105694.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742828385.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742549564.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742271942.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742158669.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742115507.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548742022766.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548741700234.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548738949952.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737674077.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737435037.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548737363924.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548735928470.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548734539774.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548733293392.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548731896900.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727837610.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727801090.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727757187.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727601912.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548727569492.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726430395.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726384694.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726355086.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548726299950.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725886674.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725841314.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725776702.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725603670.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725519397.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725406053.png","https://fr-ferrerorocher.s3.amazonaws.com/static/2019-valentine/picture/valentine2019_1548725377988.png"]; //data;
      tempArr.splice(2, 0, this.imgUrl + 'temp/fix2.jpg');
      this.picDatas = tempArr;

      if (this.isMobile) {
        this.processPics();
      }
    },
    insertTempData: function () {
      var arr = [];
      for (var i = 0; i < 6; i += 1) {
        arr.push(this.imgUrl + 'temp/fix' + i + '.jpg');
      }
      return arr;
    },
    processPics: function () {
      // debugger;
      var perChunk = 2;

      this.mobileOnly.chunkPicData = this.picDatas.reduce(function (newArr, pic, idx) {
        if ((idx % perChunk) === 0 || !(idx % perChunk)) {
          newArr.push(this.picDatas.slice(idx, idx + perChunk));
        }
        return newArr;
      }.bind(this), []);
    },
    detactingDevice: function () {
      return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false;
    },
    checkOS: function () {
      return navigator.userAgent.match(/(iPad|iPod|iPhone)/i) ? true : false;
    },
    displayMsg: function (msg) {
      alert(msg);
    },
    windowEvent: function (list, type, handler) {
      list.forEach(function (evName) {
        window[type + 'EventListener'](evName, handler);
      });
    },
    _getScrollY: function () {
      return window.scrollY || window.pageYOffset;
    },
    onScroll: function (e) {
      var defaultY = 515;
      var nav = this.$refs.nav;
      var scrollYpos = this._getScrollY();
      var stickTop = this.$refs.mv.offsetTop;
      var defaultNavPosY = (window.innerHeight - nav.clientHeight) / 2;

      this.navCss.top = scrollYpos <= stickTop ? defaultY - scrollYpos : '';

      this.activeAnchor(scrollYpos);
    },
    onResize: function () {
      var wrap = this.$refs.wrap;
      var nav = this.$refs.nav;
      var totalWrapDistance = wrap.offsetLeft + wrap.clientWidth;

      this.navCss.left = totalWrapDistance - nav.clientWidth;

      if (this.navCss.left) {
        this.showNav = 'is-active';
      }
    },
    activeAnchor: function (scrollY) {
      this.navLinks.forEach(function (link) {
        // debugger;
        var section = document.querySelector('#' + link);
        var offset = section.offsetTop - 100;
        var height = section.clientHeight;
        var anchor = document.querySelector('[href="#' + link + '"]');

        var items = document.querySelectorAll('.nav__list .is-active');

        (scrollY >= offset && scrollY < (offset + height)) ? anchor.classList.add('is-active'): anchor.classList.remove('is-active');
      });
    },
    animScrollTop: function (scrollTop) {
      anime({
        targets: [document.body, document.documentElement],
        scrollTop: scrollTop,
        easing: 'easeInOutCubic',
        duration: 1000
      });
    },
    goSection: function (link) {
      var selector = document.querySelector('#' + link);
      var scrollYpos = window.scrollY || window.pageYOffset;
      var scrollTop = scrollYpos + selector.getBoundingClientRect().top;

      // console.log(link);
      scrollTop = link === 'gift' ? document.querySelector('.wrap').clientHeight : scrollTop;
      this.animScrollTop(scrollTop);
    },
    joinEvent: function (eventType, top) {
      // 영상을 끝까지 다 안봤다면
      if (eventType === 'romantic') {
        if (!this.isShowFinal) {
          this.displayMsg(this.msg.NOTMVEND);
          return;
        }
      }

      this.popupTop = top;

      this.visibleUserInfo(eventType);
      this.animScrollTop(top);
    },
    playMv: function () {
      this.playBtnState = false;
      onPlayerReady();
    },
    setPopupStatus: function (name) {
      var poupObj = this.visiblePopupData;
      // this.scrollTop = this._getScrollY();
      this.dim = name ? true : false;

      for (var item in poupObj) {
        poupObj[item] = item === name ? true : false;
      }
    },
    visibleResult: function (type) {
      this.resultType = type === 'winyqowuenra' ? 'win' : 'bang';

      this.setPopupStatus('result');
      this.popupTop = this.isMobile ? 890 : 0;

      this.animScrollTop(this.popupTop);
    },
    onInvisiblePopup: function () {
      this.setPopupStatus();
    },
    visibleSnsPopup: function (type) {
      this.setPopupStatus('sns');
      this.typeOfUserInfo = type;

      if (type === 'romantic') {
        this.popupTop = this.isMobile ? 890 : 0;
      } else if (type === 'valentine') {
        this.popupTop = this.isMobile ? 1800 : 1260;
      }

      this.animScrollTop(this.popupTop);
    },
    visibleUserInfo: function (type) {
      this.setPopupStatus(type);
      this.typeOfUserInfo = type;
    },
    visibleDirectInput: function (type) {
      var survey = this.romanticUserData[type];
      var selectData = this.selectDatas[type];
      survey.visibleDirectInput = survey.num === selectData.length - 1 ? true : false;
      survey.answer = survey.visibleDirectInput ? '' : selectData[survey.num];
    },
    visibleCaution: function (top) {
      this.popupTop = top;
      this.setPopupStatus('caution');
      this.animScrollTop(top);
    },
    visibleAgree: function (top) {
      this.popupTop = top === 1260 && this.isMobile ? 1800 : top;
      this.setPopupStatus('agree');
      this.animScrollTop(this.popupTop);
    },

    onUploadImg: function (e) {
      // debugger;
      var file = e.target.files[0];
      var types = ['image/png', 'image/jpeg', 'image/gif'];

      loadImage.parseMetaData(file, function (data) {
        var orientation = 0;
        if (data.exif) {
          if (data.exif.get('Orientation') != undefined) {
            orientation = data.exif.get('Orientation');
          }
        }

        app.valentineUserData.orientation = orientation;
        var loadingImage = loadImage(
          file,
          function (canvas) {
            //here's the base64 data result
            var base64data = canvas.toDataURL('image/jpeg');
            //here's example to show it as on imae preview
            var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
            // $('.prev-img').attr('src', base64data);
            app.userImg = base64data;
            // alert('hey canvas~~~~');
          }, {
            //should be set to canvas : true to activate auto fix orientation
            canvas: true,
            orientation: orientation,
            maxWidth: 275,
            maxHeight: 275
          }
        );
      });
    },
    sendRomanticEvent: function () {
    },
    sendValentineEvent: function (data) {
    },
    enterRomanticEvent: function () {
    },
    enterValentineEvent: function () {
    },
    resetAgreePrev: function (type) {
      for (var prop in type) {
        if (prop === 'agree1' || prop === 'agree2') {
          type[prop] = false;
        }
      }

      this.userImg = '';
    },
    shareFacebook: function () {
      var url = 'https://' + location.host + '/2019-valentines?utm_source=event01&utm_campaign=valentines2019&utm_medium=facebook';
      if (this.typeOfUserInfo == 'valentine') url = 'https://' + location.host + '/2019-valentines?utm_source=event02&utm_campaign=valentines2019&utm_medium=facebook';
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
    },
    shareKakaostory: function () {
      var url = 'https://' + location.host + '/2019-valentines?utm_source=event01&utm_campaign=valentines2019&utm_medium=kakaostory';
      if (this.typeOfUserInfo == 'valentine') url = 'https://' + location.host + '/2019-valentines?utm_source=event02&utm_campaign=valentines2019&utm_medium=kakaostory';
      window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
    },
    shareKakaotalk: function () {
      var templateId = 14244;
      if (this.typeOfUserInfo == 'valentine') templateId = 14245;
      Kakao.Link.sendCustom({
        templateId: templateId,
        success: function () {}
      });
    }
  }
});

(function () {
  var $loading = $('.loading');
  $(document).ajaxStart(function () {
    $loading.addClass('is-active');
  }).ajaxStop(function () {
    $loading.removeClass('is-active');
  });

}());