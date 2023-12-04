$('.slideToggle button').on('click', function(e) {
    let width = $('#l-area').outerWidth();
    $('.l-area').show().animate({
        left: '-'+width+'px'
    }, function(){
        $('.slideToggle button').addClass("open");
    });
});
$(document).on('click', '.slideToggle button.open', function(){
    $('.l-area').show().animate({
        left: '0px'
    }, function(){
        $('.slideToggle button').removeClass("open");
    });
});

$('.plusbtn').click(function(){
    $('.modal-body .modal-body_select > div').removeClass("on");
    // 모달창 실행 이벤트
    $('.modal-btn').trigger("click");
});

$('.modal-body .modal-body_select > div').on('click', function() {
    $('.modal-body .modal-body_select > div').removeClass("on");
    $(this).addClass('on');
});