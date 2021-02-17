isInapp = (navigator.userAgent.toUpperCase().match(/KAKAOTALK|KAKAOSTORY|KAKAO|TWITTER|FB|CriOS/i) ? true : false);
var checkMobile = {
	    Android: function () {
	        return navigator.userAgent.match(/Android/i) ? true : false;
	    },
	    BlackBerry: function () {
	        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	    },
	    iOS: function () {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	    },
	    Windows: function () {
	        return navigator.userAgent.match(/IEMobile/i) ? true : false;
	    },
	    any: function () {
	        return (checkMobile.Android() || checkMobile.BlackBerry() || checkMobile.iOS());
	    }
	};
var valentineDayModel = new Vue({
    el: '#valentineday',
    data: {
        isSns: false,
        instantPrize: "wyaescdhfagn",
        instantPrizeType: 0,
        instagramUrl:null,
        dataFilters: {
            limit: 100,
            page: 1,
            tags: '페레로로쉐_띠아모',
            types:'image'
        },
        data: []
    },
    created: function () {
        this.getInstagramList();
    },
    mounted: function () {
        if (checkMobile.any()) {
            $('.list-box').slick({
                lazyLoad: 'ondemand',
                centerMode: true,
                rows: 2,
                slidesToShow: 3,
                prevArrow: $('.btn-prev'),
                nextArrow: $('.btn-next'),
                dots: false,
                autoplay: true,
                autoplaySpeed: 2000
            });
        } else {
            $('.list-box').slick({
                lazyLoad: 'ondemand',
                centerMode: true,
                rows: 2,
                slidesToShow: 9,
                prevArrow: $('.btn-prev'),
                nextArrow: $('.btn-next'),
                dots: false,
                autoplay: true,
                autoplaySpeed: 2000
            });
        }
       
    },
    methods: {
        beginEntry: function () {
            $('#loading').show();
        },
        completeEntry: function () {
            $('#loading').hide();
        },
        successEntry: function (res) {
            if (res.result) {
                $('#loading').hide();
                this.isSns = false;
                closePop('entry-event1');
                openPop('share');
            } else {
                alert(res.message);
            }
        },
        successAddressEntry: function (res) {
            if (res.result) {
                $('#loading').hide();
                closePop('win');
            } else {
                alert(res.message);
            }
        },
        successInstagramEntry: function () {
            closePop('entry-event2');
            $('#frmValentineInstagramUrl').clearForm();
            alert('등록되었습니다.');
        },
        successInstagramUrl: function () {
            closePop('proofshot-reg');
            openPop('entry-event2');
        },
        failEntry: function (xhr, err) {
            $('#loading').hide();
            if (err !== 'abort') {
                alert("잠시 후 다시 시도해주세요.");
            }
        },
        failInstagramEntry: function (xhr, err) {
            $('#loading').hide();
            if (err !== 'abort') {
                alert(xhr.responseJSON.Message);
            }
        },
        openInstantLottery: function () {
            if (isInapp) {
                openPop('inapp');
                return;
            }
            openPop('mov-view');
        },
        createInstantLottery: function () {
            if (!this.isSns) {
                alert('공유를 진행하고 당첨 결과를 확인해주세요.');
                return;
            }
            $.ajax({
                url: '/tiamo/instant-lottery',
                type: 'post',
                success: function (res) {
                    if (res.result) {
                        closePop('share');
                        if (res.data.PrizeType == 0) {
                            openPop('fail');
                        } else {
                            this.instantPrizeType = res.data.PrizeType;
                            this.instantPrize = res.data.PrizeName;
                            setTimeout(function () {
                                openPop('win');
                            }, 100);
                        }
                    } else {
                        alert(res.message);
                    }
                    $('#loading').hide();
                }.bind(this),
                error: function (xhr, err, obj) {
                    $('#loading').hide();
                    if (err !== 'abort') {
                        alert(xhr.responseJSON.Message);
                    }
                }.bind(this),
                complete: function () {
                    $('#loading').hide();
                }.bind(this),
                beforeSend: function () {
                    $('#loading').show();
                }.bind(this)
            });
        },
        openPostCode: function () {
            closePop('win');
            openPop('post');
            new daum.Postcode({
                oncomplete: function (data) {
                    // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var fullAddr = data.address; // 최종 주소 변수
                    var extraAddr = ''; // 조합형 주소 변수

                    // 기본 주소가 도로명 타입일때 조합한다.
                    if (data.addressType === 'R') {
                        //법정동명이 있을 경우 추가한다.
                        if (data.bname !== '') {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있을 경우 추가한다.
                        if (data.buildingName !== '') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    $('#ValentineAddressModel_ZipCode').val(data.zonecode);
                    $('#ValentineAddressModel_Address').val(fullAddr);

                    // iframe을 넣은 element를 안보이게 한다.
                    closePop('post');
                    // 개인정보 팝업을 다시 연다.
                    openPop('win');

                    // 커서를 상세주소 필드로 이동한다.
                    $('#ValentineAddressModel_AddressDetail').focus();

                },
                /*
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
                onresize: function (size) {
                    element_wrap.style.height = size.height + 'px';
                },
                */
                width: '640px',
                height: '590px'
            }).embed(document.getElementById('searchPostCode'));
            return false;
        },
        getInstagramList: function () {
            var slideMinCount = 20;
            if(checkMobile.any()){
                slideMinCount = 8;
            }
            $.ajax({
                url: 'https://kr-api.awesomewallhq.com/posts/megazone2',
                type: 'get',
                data: this.dataFilters,
                async: false,
                success: function (res) {
         
                    this.data = res;
                    if (res.count < slideMinCount) {
                        for (var i = 0; i < slideMinCount - res.count ; i++) {
                            this.data.items.push(res.items[i]);
                        }
                    }
                    if (res.count % 2 == 1) {
                        this.data.items.push(res.items[0]);
                    }
                   
                }.bind(this)
            });
        },
        shareFacebook: function () {
            var url = 'http://' + document.domain + '/tiamo?utm_source=share&utm_campaign=tiamo&utm_medium=facebook';
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), "fbPop", "menubar=false, scrollbars=no,width=600px,height=450px");
            saveSnsShareInfo(1, null, null, null);
        },
        shareKakaostory: function () {
            var data = {};
            data.link = 'http://' + document.domain + '/tiamo?utm_source=share&utm_campaign=tiamo&utm_medium=kakaostory';
            data.description = '#페레로로쉐 #페레로로쉐_띠아모';
            kakaostoryShareVideo(data, function (snsId, snsNickName, scrapURL) {
                this.saveSnsShareInfo(4, snsId, snsNickName, scrapURL);
            }, function (e) {
                alert(e.msg);
            });

        },
        shareKakaotalk: function () {
            var data = {};
            data.btnText = '지금 확인하러 가기';
            data.link = 'http://' + document.domain + '/tiamo?utm_source=share&utm_campaign=tiamo&utm_medium=kakaotalk';
            data.picture = 'http://' + document.domain + '/Images/ValentineEvent/sns/kakaotalk.jpg';
            data.description = '#페레로로쉐 #페레로로쉐_띠아모\r\n#발렌타인데이\r\n\r\n이번 발렌타인 데이에는\r\n페레로 로쉐로 사랑하는 사람에게\r\n마음을 표현해보세요.\r\n\r\n페레로 로쉐 띠아모 영상을 공유하면 한정판 페레로 로쉐 패키지를 선물로 드립니다!';
            kakaotalkShare(data, function () {
                this.saveSnsShareInfo(5, null, null, null);
            }, function () {
                alert('모바일에서 참여가 가능합니다 ^^');
            });
        }
    }
});
var saveSnsShareInfo = function (snsType, snsId, snsName, scrapURL) {
    $.post('/tiamo/create-sns', {
        SnsType: snsType,
        SnsId: snsId,
        SnsName: snsName,
        Post: scrapURL
    }, function (res) {
        if (res.result) {
            if (snsType == 4) {
                alert('공유가 완료되었습니다.');
            }
            valentineDayModel.isSns = true;
        } else {
            alert(res.message);
        }
    }).error(function (xhr, err) {
        alert(xhr.responseJSON.Message);
    });
}