function mzSendClickTag(cmpNo,depth,device) {
    var mzRand = Math.random().toString();
    var mzOrd = mzRand.substring(2, mzRand.length);
    var mzImg = new Image();
    if (device == 'pc') {
        mzImg.src = "https://vtag2.midas-i.com/vat-tag?cmp_no="+cmpNo+"&depth="+depth+"&ord=" + mzOrd;
    } else {
        mzImg.src = " https://mobile.midas-i.com/roianal.mezzo/tracking?cmp_no=" + cmpNo + "&depth=" + depth + "&ord=" + mzOrd;
    }

}