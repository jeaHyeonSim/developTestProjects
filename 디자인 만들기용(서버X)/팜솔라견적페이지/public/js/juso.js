
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
// $('.modal-btn').trigger("click");

// 모달창 실행 이벤트
// $('.modal-btn').trigger("click");