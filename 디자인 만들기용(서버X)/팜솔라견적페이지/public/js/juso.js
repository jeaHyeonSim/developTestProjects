
// console.log($('body').height());
// let h = $('body').height() - (393.4);
// $('section').css({
//     'height' : `${h}px`
// });


// $(window).on('resize', function(){
//     let h = $('body').height() - 400.75;
//     $('main').css({
//         'height' : `${h}px`
//     });
//     console.log($('main').height());
// });

$(document).on('click', '.result_li', function() {
    // addr_data = addr_list[$(this).index()]; // 선택한 주소 데이터
    addr_index = $(this).index();
});

// 모달창 실행 이벤트
// $('.modal-btn').trigger("click");

function eventClass() {
    // 주소 리스트 생성될 경우 CSS 수정
    if($('.addr_list').hasClass('on')) {
        console.log($('.addr_list').hasClass('on'));
        $('#formBg #fsearch .word-del').addClass("on");
        $('#formBg').css({
            'border-bottom-left-radius': 'unset',
            'border-bottom-right-radius': 'unset'
        });
        $('.addr_list_inbox .addr_list').css({
            'box-shadow':'0px 5px 15px -10px #000000'
        });
    }
    if(!$('.addr_list').hasClass('on')) {
        console.log($('.addr_list').hasClass('on'));
        
        $('#formBg #fsearch .word-del').removeClass("on");
        $('#formBg').css({
            'border-bottom-left-radius': '30px',
            'border-bottom-right-radius': '30px'
        });
        $('.addr_list_inbox .addr_list').css({
            'box-shadow':'none'
        });
    }
}
eventClass();