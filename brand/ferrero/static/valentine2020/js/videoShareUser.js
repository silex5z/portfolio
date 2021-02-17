$(function() {
	$( "#selectDate" ).datepicker({ minDate: 0});
});
new Vue({
	el: '#video-share-user',
	data: {
		data: [],
		dataFilters:{
			page:1,
			pageSize:20
		},
	},
	created() {
		this.goToPage(1);
	},
	computed: {
        pages: function () {
            var pageCount = parseInt(this.data.totalPages);
            var number = parseInt(this.data.number);
            var pageSlide = 10;
            var pageFrom = Math.max(1, number - pageSlide);
            var pageTo = Math.min(pageCount, number + pageSlide);
            pageFrom = Math.max(1, Math.min(pageTo - 2 * pageSlide, pageFrom));
            pageTo = Math.min(pageCount, Math.max(pageFrom + 2 * pageSlide, pageTo));

            var result = [];
            for (var i = pageFrom; i <= pageTo; i++) {
                result.push(i);
            }
            return result;
        }
    },
	methods: {
		goToPage: function (page) {
			var self = this;
			
			this.dataFilters.page = (page > 0 ? page : 1);
			$.ajax({
				url: '/api/admin/2020_valentine/video-share-user',
				dataType : "json",
				contentType : 'application/json',
				data: self.dataFilters,
				method: 'get',
				beforeSend: function () {
				}, complete: function () {
				}, success: function (res) {
					this.data = res;
					
				}.bind(this)
			});
		},
		excelDown:function(){
			var date = $( "#selectDate" ).val();
			
			location.href = "/pe-management/2020_valentine/excel/" + date;
		}
	},
	filters: {
	  moment: function (date) {
	    return moment(date).format('YYYY-MM-DD');
	  }
	}
})