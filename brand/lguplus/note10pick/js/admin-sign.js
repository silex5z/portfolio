/*
 * 
 */
new Vue({
	el: '#admin-note10pick-sign',
	data: {
		dataFilters: {
			mobile: '',
			page:1,
			pageSize:20
		},
		data: []		
	},
	created () {
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
			$.get('/api/sign-pick/admin/sign', this.dataFilters, function (res) {
				self.data = res;
				//console.log(self.data);
			});
		},
		download: function () {
			location.href = '/upmn/sign-store/download';
		}	
	},
	filters: {
		moment: function (date) {
			return moment(date).format('YYYY-MM-DD H:mm:ss');
		}
	}
});