var note10spenSign = new Vue({
  el: '#app',
  data: {
    // imgUrl: '/note10spen/images',
    imgUrl: 'https://lguplus-event.s3.amazonaws.com/static/note10spen/images',
    currentPopup: '',
    storeList: [],
    filteredList: [],
    searchWord: ''
  },

  created: function(){
    this.getStoreList();
    alert('S펜 사인회 이벤트는 종료 되었습니다.\n10/2(수)부터 사인 투표이벤트가 진행중이니 많은 참여바랍니다.')
  },

  methods: {

    // 매장 리스트 불러오기
    getStoreList: function(){
      var self = this;
      $.ajax({
        url: '/api/sign-store/store',
        type: 'GET',

        success: function (res) {
          // console.log(res)
          self.storeList = res;
          self.initList();
        },
        error: function (res) {
          // console.log(res);
          alert(res.responseJSON.error);
        }
      });
    },

    // 매장 리스트 초기화
    initList: function(){
      this.filteredList = this.storeList;
    },

    // 매장 리스트 
    filterStore: function(){
      var self = this;
      this.filteredList = this.storeList.filter(function(store){
        return store.address.indexOf(self.searchWord) >= 0 ? true :false
      })
    },

    // 팝업 띄우기
    showPopup: function(popupName){
      return alert('S펜 사인회 이벤트는 종료 되었습니다.\n10월 2일 투표 이벤트가 진행되니 기대해주세요')
      var popup = document.getElementById('popup');
      popup.style.cssText = 'top:'+ window.pageYOffset + 'px'
      this.currentPopup = popupName;
    },
    
    // 팝업 닫기
    hidePopup: function(){
      this.initList();
      this.searchWord = '';
      this.currentPopup = '';
    },
    
    // url 복사
    copyUrl: function(){
      var clipboard = new ClipboardJS(".btn--copy-url");
      clipboard.on("success", function (e) {
        alert("URL이 복사되었습니다. SNS에 공유 후 링크를 입력해주세요.");
        e.clearSelection();
      });
    },
    shareKakaotalk: function () {
    	Kakao.Link.sendCustom({
            templateId: 17458
        });
    }

  }

})
