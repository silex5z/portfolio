var note10spenPick = new Vue({
  el: '#app',
  data: {
    imgUrl: 'https://lguplus-event.s3.amazonaws.com/static/note10pick/images',
    currentPopup: '',
    privacyOne: '',
    privacyTwo: '',
    swiper: '',
    isLoading: false,
    pickList: [],
    usersPick: [],
    eman: 'dbvmf',
    hasSwipeInitiated: false,
    isClose: null,
    // 선택된 이미지
    selectedImg: 'default',
    // 추가 팝업
    extraPopup: '',
    winnersNote19: [],
    winnersBuds: []

  },
  computed: {
    pickedNum: function () {
      return this.usersPick.length
    },
    pickStr: function () {
      var temp = null;
      this.usersPick.forEach(function (val, idx) {
        // console.log(val)
        temp = idx != 4 ? temp + val + ',' : temp + val;
      })
      return temp
    }
  },

  created: function () {
    var self = this;
    self.winnersNote10 = winnersNote10;
    self.winnersBuds = winnersBuds;
    this.getPickList();
    if(!isClose){
      this.checkIsClose();
    } else {
      this.showPopup('eventWinner')
    }
    
  },

  mounted: function(){
    var self = this;
    
    /* swipe 객체 생성 */

    self.swiper = new Swiper(".swiper-container", {
      init: false,
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerGroup:2,
      slidesPerColumnFill: 'row',
      // allowTouchMove: false,
      
      // width: 594,
      // spaceBetween: 14,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true
    });
    
    self.swiper.on('init', function () {
      // console.log('swiper initiated')
      // self.isSliderReady = true
      self.hasSwipeInitiated = true;
      self.isLoading = false
    })

    // this.$nextTick(function(){
    //   console.log('nextTick')
    // })

    /* if(isClose) {
      this.showPopup('noticeEndEarly');
    } */
  },

  updated: function () {
    var self = this;
    // console.log('updated')
    // self.swiper.init();

    if(self.hasSwipeInitiated == false) {
      // console.log('init')
      self.swiper.init();
    }
  },

  methods: {
    showExtraPopup: function (popupName) {
      var popup = document.getElementById('extraPopup');
      popup.style.cssText = 'top:' + (window.pageYOffset + 200) + 'px'
      
    },
    hideExtraPopup: function(){
      this.selectedImg = 'default'
    },

    // 팝업 당첨자 이미지 클릭시 
    onImgClicked: function(imgName){
      // console.log(imgName)
      this.showExtraPopup()
      this.selectedImg = this.selectedImg == 'default' ? imgName : 'default';
    },
    
    checkIsClose: function () {
      var self = this;
      $.ajax({
        url: 'api/note-ten-pick/get-close-flag',
        type: 'GET',

        success: function (res) {
          if(res) {
            self.isClose = true;
            self.showPopup('noticeEndEarly');
          } else {
            self.isClose = false;
          }
        },
        complete: function(){

        },
        error: function (res) {
          // console.log(res);
          alert(res.responseJSON.error);
        }
      });
    },

    // 투표 이미지 리스트 불러오기
    getPickList: function () {
      var self = this;
      $.ajax({
        url: '/api/note-ten-pick/sign-list',
        type: 'GET',

        success: function (res) {
          // console.log(res.data)
          // self.pickList = res.data;
          self.pickList = self.checkListLength(res.data)
          // console.log(self.pickList)
        },
        complete: function(){

        },
        error: function (res) {
          // console.log(res);
          alert(res.responseJSON.error);
        }
      });
    },
    
    /* 투표 리스트 슬라이드 4개 기준 한 슬라이드로 만들기 */
    checkListLength: function(arr){
      var self = this;
      var cnt = arr.length % 4;
      if(cnt > 0) {
        for(var i = 0; i < 4 - cnt; i++ ){
          arr.push({
            id: 'default' + i,
            voteCount: 0,
            signImage: self.imgUrl + '/img-list-default.png'
          })
        }
        return arr
      } else {
        return arr
      }
    },

    /* 투표 리스트 5개 이상 선택 시 alert */
    onChange: function(id){
      var self = this;
      if(this.pickedNum > 5) {
        alert('사인은 5개 까지만 선택가능합니다.')
        setTimeout(function(){
          self.$refs[id][0].click();  
        },0)
      }
    },

    /* 투표 리스트에 추가된건 disabled 시키기 */
    isDisabled: function(str){
      return str.toString().indexOf('default') != -1
    },

    // 투표 api
    sendVote: function () {
      var self = this;
      
      if(isClose){
        return alert('이벤트가 종료되었습니다.')
      }
      
      if(self.isClose){
        return alert('이벤트가 종료되었습니다.')
      }
      /* if(!isOpen) {
    	  return alert('10월 2일 오픈을 기다려주세요.');
      } */

      if(self.pickedNum < 5){
        return alert('5가지 사인을 선택해주세요.')
      }

      if(self.privacyOne == false || self.privacyTwo == false){
        return alert('필수 동의사항을 확인해주세요.')
      }

      $.ajax({
        url: '/api/note-ten-pick/authenticate-setting',
        type: 'post',
        data: { pickStr: self.pickStr }, // 투표 이미지 아이디 값 string
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

    // callback.html 에서 호출 됨
    showPrizePopup: function (data) {
      var self = this;
      self.isLoading = true;
      // console.log(data)
      if (data.result) {
        note10spenPick.eman = data.prizeName;
        setTimeout(function () {
          self.isLoading = false;
          self.showPopup('prize');
        }, 1500)
      } else {
        self.isLoading = false;
        setTimeout(function () {
          alert(data.message);
        }, 0)
      }
    },

    // 팝업 띄우기
    showPopup: function (popupName) {
      var popup = document.getElementById('popup');
      popup.style.cssText = 'top:' + window.pageYOffset + 'px'
      this.currentPopup = popupName;
    },

    // 팝업 닫기
    hidePopup: function (name) {
      this.currentPopup = '';
      if(name == 'init') {
        location.reload();
      }
    },

    // url 복사
    copyUrl: function () {
      var clipboard = new ClipboardJS(".btn--copyUrl");
      clipboard.on("success", function (e) {
        alert("URL이 복사되었습니다. SNS에 공유 후 링크를 입력해주세요.");
        e.clearSelection();
      });
    },

    shareKakaotalk: function () {
      Kakao.Link.sendCustom({
        templateId: 18344
      });
    }

  }

})
