var note10spenSignStore = new Vue({
  el: '#app',
  data: {
    // imgUrl: '/note10spen/images',
    imgUrl: 'https://lguplus-event.s3.amazonaws.com/static/note10spen/images',
    pageInfo: '', // visual, store-authentication, draw-answer, draw-signature, select-video

    // initImg: new Image(650,455),
    
    // 매장 정보 확인 시
    storeData: {
      storePid: '',
      clerkName: '',
      clerkAgreement: null
    },

    // 본인 인증 시 개인정보 동의
    authData: {
      privacyOne: false,
      privacyTwo: false
    },

    // 사인, 문제 정답 캔버스 데이터
    canvasData:{
      // drawingBoard1: '',
      userAnswerDecode: '',
      initialData1: '',
      drawingBoard2: '',
      userSignatureDecode: '',
    },
    
    // 비디오 시청 체크
    videoData: {
      isVideoReady: 0,
      videoStartTime: 0,
      videoStopTime: 0,
      totalWatchingTime: 0,
      isSliderClicked: false,
      timeFlown: 0,
      videoList: []
    },

    // 팝업 데이터
    popupData: {
      dim: false,
      alertPc: false,
    },

    // 현재 팝업
    currentPopup: '',
    name: 'dbvmf',
    
    // 로딩 체크
    isSliderReady: false,
    isLoading: true,

    // 사인 캔버스 커버
    isClicked: false
  },
  computed: {
    
  },
  watch: {
    'videoData.isVideoReady': function(newVal, oldVal){
      // console.log(newVal, oldVal)
      if(newVal == this.videoData.videoList.length){
        this.swiper.init();
      }
    },
    currentPopup: function(newVal, oldVal){
      if(oldVal == 'prize') {
        this.resetProcess();
      }
    }
  },
  created: function () {
    // this.initImg.src = canvasInitCode;
    // 캔버스에 불러올 이미지 로딩
    alert('S펜 사인회 이벤트는 종료 되었습니다.\n10/2(수)부터 사인 투표이벤트가 진행중이니 많은 참여바랍니다.')
  },
  mounted: function () {
    var self = this;
    /* this.canvasData.drawingBoard1 = (function (DB) {
      return new DB.Board('canvas--answer', {
        controls: [
          { Size: { type: 'dropdown' } },
          'Color',
          { DrawingMode: { filler: false }},
          // 'Navigation'
        ],
        enlargeYourContainer: true,
        webStorage: false,
        background: false
      });
    })(DrawingBoard); */

    this.canvasData.drawingBoard2 = (function (DB) {
      return new DB.Board('canvas--signature', {
        controls: [
          { Size: { type: 'dropdown' } },
          'DrawingMode',
          { Navigation: {
              back: false,
		          forward: false
          }},
          'Color',
        ],
        enlargeYourContainer: true,
        webStorage: false,
        background: '#ffffff'
      });
    })(DrawingBoard);

    /* swipe 객체 생성 */    
    self.swiper = new Swiper(".swiper-container", {
      init: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      observer: true,
      observeParents: true
    });

    /* swipe 초기화 */
    self.swiper.on('init', function () {
      // console.log('swiper initiated')
      self.isSliderReady = true
      self.isLoading = false
    })

    /* swipe 슬라이드 시 영상 전체 멈춤, 이벤트 참여 조건(영상 2개 이상 시청) */
    self.swiper.on("slideChange", function () {
      // self.videoData.isSliderClicked = true;
      pauseAll(players);
    });


    /* 슬라이드 영상 이미지 초기화 */
    this.setSlideImg(videoList);

    /* 정답 캔버스 초기 이미지 로딩 이벤트 리스너 */
    // this.initImg.addEventListener('load', function(){
    //   // console.log('completed')
    //   self.initCanvas('drawingBoard1');
    // })
    
    /* 사인 캔버스 커버 클릭 이벤트 리스너 */
    this.$refs.cover.addEventListener('click', function(e){
      self.isClicked = true;
    })

    this.setPage('visual');

    /* if(hasVisited){
      this.setPage('visual');
    } else { 
      this.setPage('store-authentication');
    } */
    
  },
  updated: function () {
    
  },
  methods: {
    // 사인 남기기 버튼
    // 일요일 참여 확인 api
    onEntry: function() {
      var self = this;
      $.ajax({
        url: '/api/sign-store/authenticate/dow',
        type: 'GET',

        success: function (res) {
          if(res.result === true){
            self.setPage('select-video');
            
          } else {
            alert(res.message);
          }
        },
        error: function (res) {
          alert(res.responseJSON.error);
        }
      });
    },
    
    // 매장 코드 작성 후 확인 api
    onSubmit: function() {
      if(this.storeData.clerkAgreement !== true){
        return alert('필수 동의사항을 확인해주세요.')
      }
      var self = this;
      var sendData = {
        pcode: this.storeData.storePid,
        employeeName: this.storeData.clerkName,
        employeeAgree: this.storeData.clerkAgreement
      }
      // console.log(sendData)
      $.ajax({
        url: '/api/sign-store/store/check',
        type: 'GET',
        data: sendData,

        success: function (res) {
          self.setPage('visual');
        },
        error: function (res) {
          // console.log(res);
          alert(res.responseJSON.error);
        }
      });
    },

    // 정답 제출 (일 1500명 초과 체크)
    onSubmitAnswer: function(){
      this.checkCanvas('drawingBoard1', this.checkExceeded)
    },

    // 1500명 초과 확인 api
    checkExceeded: function(){
      var self = this;
      self.isLoading = true;
      $.ajax({
        url: '/api/sign-store/authenticate',
        type: 'GET',
        success: function (res) {
          self.isLoading = false;
          if (res.result) {
            self.setPage('draw-signature');
            self.showPopup('tips')

          }
          else {
        	  alert(res.message);
        	  self.resetProcess();  
          }
        },
        error: function (res) {
          self.isLoading = false;
          alert('오류가 발생하였습니다. 관리자에게 문의하세요.');
          self.resetProcess();
        }
      });
    },

    // 사인 제출
    onSubmitSign: function() {
      if(this.authData.privacyOne && this.authData.privacyTwo){
        this.checkCanvas('drawingBoard2', this.saveImage)
      } else {
        alert('본인 인증 프로세스와 필수 동의사항을 확인해주세요.');
      }
    },
    
    // 사인 제출 api
    saveImage: function() {
      var self = this;
      // console.log('drawing-api')
      // self.isLoading = true;
      // console.log(self.canvasData.userAnswerDecode)
      // console.log(self.canvasData.userSignatureDecode)
      $.ajax({
    	  url: '/api/sign-store/drawing',
    	  type: 'post',
    	  data: {signImage: self.canvasData.userSignatureDecode},
          beforeSend: function () {
              self.isLoading = true;
          },
          complete: function () {
              self.isLoading = false;
          },
    	  success: function (res) {
    		  $('#tr_cert').val(res.requestTrCert);
              $('#tr_url').val(res.requestTrUrl);
              $('#tr_add').val(res.requestTrAdd);
              openKMCISWindow();
              self.isLoading = false;
          },
          error: function (res) {
        	  alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
              self.isLoading = false;
          }
      });      
    },

    // 사인 api response 처리
    // callback.html 에서 호출 됨
    showPrizePopup: function(data) {
      var self = this;
      self.isLoading = true;
      // console.log(data)
      if(data.result){
        setTimeout(function(){
          self.isLoading = false;
          note10spenSignStore.name = data.prizeName;
          self.showPopup('prize');
        },1500)
      } else {
        self.isLoading = false;
        alert(data.message);
        self.resetProcess();
      }
    },

    // init process
    resetProcess: function(){
      location.reload();
    },

    // 사인 캔버스 리셋
    resetCanvas: function(canvasName){
      this.canvasData[canvasName].reset({background:'#ffffff'})
    },

    // 슬라이드 이미지 설정
    setSlideImg: function(arr) {
      this.videoData.videoList = arr;
      // console.log('tests' + arr)
    },

    // 정답 캔버스 리셋
    initCanvas: function(canvasName){
      this.canvasData[canvasName].ctx.drawImage(this.initImg,0,0)
      // console.log(this.canvasData[canvasName].getImg())
      this.canvasData.initialData1 = this.canvasData[canvasName].getImg();
    },

    // 캔버스 비었는지 체크
    checkCanvas: function(canvasName, callback){
      // document.getElementById('app').appendChild(this.testImg)
      if(canvasName == 'drawingBoard1') {
        if(this.canvasData.initialData1 == this.canvasData[canvasName].getImg()) {
          return alert('빈 캔버스입니다.')
        } else {
          this.canvasData.userAnswerDecode = this.canvasData[canvasName].getImg()
          // console.log('정답 저장')
          // console.log(this.canvasData.userAnswerDecode)
        }
      } else {
        var tempDecode = this.canvasData[canvasName].getImg();
        if(tempDecode == this.canvasData[canvasName].blankCanvas){
          return alert('빈 캔버스입니다.')
        } else {
          this.canvasData.userSignatureDecode = this.canvasData[canvasName].getImg();
          // console.log('사인 저장')
          // console.log(this.canvasData.userSignatureDecode)
        }
      }
      if(callback){
        callback();
      }
    },

    // 비디오 2가지, 10초 이상 시청했는지 체크
    checkVideoCondition: function() {
      // console.log(timer.getTotal())
      // if(timer.getTotal() >= 5000 && self.videoData.isSliderClicked)
      if(timer.getTotal() >= 10000){
        // console.log(self.videoData.totalWatchingTime)
        // self.setPage('draw-answer');
    	  this.checkExceeded();
      } else {
        // console.log('check-alert');
        alert('"갤럭시 노트 10" 영상을 10초 이상 시청해주세요 ')
      }
    },
    
    /* 비디오 시청 조건 체크 */
    checkVideoWatched: function() {
      var self = this;
      pauseAll(players, self.checkVideoCondition);
      
    },

    /* 페이지 설정 */
    // @params String
    setPage: function (pageName) {
      // console.log(pageName);
      window.scrollTo(0,0);
      // document.documentElement.scrollTop = 0
      this.pageInfo = pageName;
      
    },

    /* 팝업 */
    // 팝업 띄우기
    showPopup: function (popupName) {
      var popup = document.getElementById('popup');
      popup.style.cssText = 'top:'+ window.pageYOffset + 'px'
      this.popupData.dim = true;
      this.currentPopup = popupName;
      
    },

    // 팝업 닫기
    hidePopup: function (){
      this.popupData.dim = false;
      this.currentPopup = ''
    },

    // 이미지 크기 변경
    resizeImage: function () {
      var w = 600 / 2;
      var h = 710 / 2;

      var canvas = document.querySelector('#hidden-canvas');
      var ctx = canvas.getContext('2d');

      ctx.drawImage(drawingBoard.canvas, 0, 0, w, h);
      this.sendData.pictureDecode = canvas.toDataURL('image/png');

      this.entryPic();
    },

    //────  글자수 체크
    checkTextLength: function () {

      var maxLen = 20;

      if (this.description.length >= maxLen) {
        this.displayMsg(maxLen + this.msgData.OVERFLOWTEXT);
        this.description = this.description.slice(0, maxLen);
      }
    },

  } // methods
});


// =================================
// drawing
// =================================


var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS();
  }
};

