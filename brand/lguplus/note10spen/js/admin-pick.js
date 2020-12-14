/**
 * 
 */
new Vue({
	el: '#admin-note10spen-prize',
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
			$.get('/api/sign-store/admin/prize', function (res) {
				self.prizes = res;
			})
		},
		updatePrize: function (prize) {
			if(confirm('경품을 수정하시겠습니까?')) {
				$.ajax({
					url: '/api/sign-store/admin/prize',
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
			$.get('/api/sign-store/admin/prize/stats', function (res) {
				self.prizeStats.stats = res;
				var totalWinCount=0;
				var totalCount=0;
				res.forEach(function (x) {
					totalWinCount+=x.winCount;
					totalCount+=x.totalCount;
				});	
				self.prizeStats.totalWinCount = totalWinCount;
				self.prizeStats.totalCount = totalCount;
			})
		}
	}
});