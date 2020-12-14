/**
 * 
 */
new Vue({
	el: '#admin-note10spen-store',
	data: {
		storeList: []
	},
	created () {
		this.getStoreList();
	},
	methods: {
		getStoreList: function () {
			var self = this;
			$.get('/api/sign-store/admin/store', function (res) {
				self.storeList = res;
			})
		},
		updateStoreIsYN: function (storeId) {
			$.ajax({
				url: '/api/sign-store/admin/store/isyn',
				method: 'put',
				data: {storeId: storeId},
				success: function () {
					this.getStoreList();
				},
				error: function (xhr, err) {
					alert(xhr.responseJSON.error);
					this.getStoreList();
				},
				context: this
			});
		},
		updateStoreInfo: function (data) {
			var self = this;
			if (!confirm('[' + data.name + '] 매장 정보를 변경하시겠습니까?')) return;

			$.ajax({
				url: '/api/sign-store/admin/store',
				method: 'put',
				data: data,
				success: function () {
					this.getStoreList();
				},
				error: function (xhr, err) {
					alert(xhr.responseJSON.error);
					this.getStoreList();
				},
				context: this
			});
		}
	}
});