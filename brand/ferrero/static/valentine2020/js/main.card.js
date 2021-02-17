var app = new Vue({
  el: '#app',
  data: {
    isMobile: null,
    dimmed: false,
    loading: false,


    //event2 Card
    /* toName: null, */
    /* message: '', */
    /* fromName: '', */
    reply: '',
    // hasReply: false
  },

  computed: {
    hasReply: function(){
      return fetchedReply ? true : false
    }
  },
  created: function () {
    // this.isMobile = this.detactingDevice()
  },
  mounted: function () {
    var self = this;
    
    this.$nextTick(function () {

    })

  },
  methods: {
    countLength: function (e) {
      if(e.target.value.length > 24) {
        return alert('24자 이상 입력하실 수 없습니다.')
      }

      if (e.target.value.split('\n').length > 2) {
        e.target.value = e.target.value.replace(/\n([^\n]*)$/g, '$1')
        this.reply = e.target.value
        alert('2줄 이상 입력할 수 없습니다.')
      }
    },

    //api
    sendCardReply: function () {
      //영상즉당
      var self = this
      
      if (self.hasReply) {
        return alert('이미 답변이 있습니다.')
      }

      var data = {
        reply: self.reply,
        rcode: rcode
      }

      $.ajax({
        url: '/api/2020-valentines/card/reply',
        type: 'POST',
        data: data,
  
        success: function (res) {
          if (res.result) {
            location.reload()
          } else {
            alert(res.message)
          }
        },
        error: function (err) {
          alert(err.responseJSON.error)
        },
        beforeSend: function () {
          self.loading = true
        },
        complete: function () {
          self.loading = false
        }
      })
    },

    //sns share    
    shareKakaotalk: function () {
    	var url = 'https://' + location.host + '/2020-valentines/card/'+ rcode +'?utm_source=kakaotalk&utm_medium=sns&utm_campaign=vday&evt=VS03'
    	Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: '',
              description: '답장이 도착하였습니다. 클릭하여 확인해보세요!',
              imageUrl: 'https://fr-ferrerorocher.s3.amazonaws.com/static/2020-valentine/sns/cd03-kakaotalk.jpg',
              imageWidth: 300,
              imageHeight: 200,
              link: {
                mobileWebUrl: url,
                webUrl: url
              }
            }
        });	
    }
  }
})
