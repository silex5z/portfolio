/**
 * 
 */
new Vue({
	el: '#admin-note10pick-prize',
	data: {
		prizeQtys: [],
		prizes: [],
		prizeStats: {
			stats: [],
			totalWinCount: 0,
			totalCount: 0			
		},
		today: ''
	},
	created () {
		this.getPrizeStatsCount();
		this.getPrize();
		this.today = moment(new Date()).format('YYYY-MM-DD');
	},
	methods: {
		getPrize: function () {
			var self = this;
			$.get('/api/sign-pick/admin/prize', function (res) {
				self.prizes = res;
				console.log(self.prizes);
			})
		},
		updatePrize: function (prize) {
			//console.log(prize);
			if(confirm('경품을 수정하시겠습니까?')) {
				$.ajax({
					url: '/api/sign-pick/admin/prize',
					method: 'put',
					data: prize,
					success: function () {
						alert('완료되었습니다.');
						this.getPrize();
					},
					error: function (xhr, err) {
						alert(xhr.responseJSON.error);
						this.getPrize();
					},
					context: this
				});
			}
		},
		getPrizeStatsCount: function () {
			var self = this;
			$.get('/api/sign-pick/admin/prize/stats', function (res) {
				self.prizeStats.stats = res;
				console.log(self.prizeStats.stats);
//				var totalWinCount=0;
//				var totalCount=0;
//				res.forEach(function (x) {
//					totalWinCount+=x.count;
//				});	
//				self.prizeStats.totalWinCount = totalWinCount;
//				self.prizeStats.totalCount = totalCount;
			})
		}
	}
});