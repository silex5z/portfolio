var isMobile = navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/);

$(function () {
    //구글애널리틱스
    $(document).on('click', '.vtag-event', function (e) {
        var $this = $(this);
        var depth = $this.attr('vtag-depth');
            
    	var mzRand = Math.random().toString();
        var mzOrd = mzRand.substring(2, mzRand.length);
        var mzImg = new Image();
        if (isMobile) {
        	mzImg.src = " https://mobile.midas-i.com/roianal.mezzo/tracking?cmp_no=1989&depth=" + depth + "&ord=" + mzOrd;
        } else {
        	mzImg.src = "https://vtag2.midas-i.com/vat-tag?cmp_no=3721&depth="+depth+"&ord=" + mzOrd;
        }
    });
});