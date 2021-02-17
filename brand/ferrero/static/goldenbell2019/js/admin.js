new Vue({
	el: '#valentine-2019-prize-setting',
	data: {
		data: [],
	},
	created() {
		this.getList();
	},
	methods: {
		getList: function () {
			var self = this;
			$.ajax({
				method: 'get',
				url: '/api/admin/2019_goldenbell/prize',						
				beforeSend: function () {
				}, complete: function () {
				}, success: function (res) {
					self.data = res;
				},error: function (xhr, err) {
					alert(xhr.responseJSON.message);
				}
			});
		},
		update: function(item) {
			var self = this;
			console.log(item);
			$.ajax({
				method: 'post',
				url: '/api/admin/2019_goldenbell/prize/update',
	            contentType : "application/json",
				data: JSON.stringify(item),
//	            data: item,
				beforeSend: function () {
				}, complete: function () {
				}, success: function (res) {
					alert('수정되었습니다.');
					self.getList();
				},error: function (res) {
					alert(res.responseJSON.error);
					self.getList();
				}
			});
		}
	},
	filters: {
	  moment: function (date) {
	    return moment(date).format('YYYY-MM-DD');
	  }
	}
})