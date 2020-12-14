new Vue({
	el: '#admin-note10spen-stats',
	data: {
		stores: [],
		dates: []
	},
	created () {
		this.getList('store');
	},
	methods: {
		getStatsByStores: function () {
			var self = this;
			$.get('/api/sign-store/admin/prize/stats-store', function (res) {
				self.stores = res;
				$('#storelist').show();
				$('#datelist').hide();
			});
		},
		getStatsByDates: function (storeId) {
			var self = this;
			$.get('/api/sign-store/admin/prize/stats-date', {storeId: (storeId? storeId: null) }, function (res) {
				self.dates = res;
				$('#storelist').hide();
				$('#datelist').show();
			});
		},
		getList: function (type) {
			if (type === 'store')  this.getStatsByStores();
			else this.getStatsByDates();
		},
		getStatsByDatesForStore: function (storeId) {
			this.getStatsByDates(storeId);
		},
		download: function (type) {
			location.href = '/upmn/sign-store/download-stats-' + type;
		}
	}
});