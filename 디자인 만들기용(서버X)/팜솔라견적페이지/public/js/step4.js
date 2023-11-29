$('.plusbtn').click(function(){
    // 모달창 실행 이벤트
    $('.modal-btn').trigger("click");
});




$('.modal-body .pdCom ul li').on({
    'click':function() {
        console.log("클릭");
        $('.modal-body .pdCom ul li').removeClass('on');
        $(this).addClass("on");
    },
    // 'mouseenter': function(){
    //     console.log('마우스커서가 문장 위로 들어옴');
    // },
    // 'mouseleave': function(){
    //     console.log('마우스커서가 문장을 빠져 나감');
        
    // }
});
$('.modal-body .module-select .moduleBox').on({
    'click':function() {
        $('.modal-body .module-select .moduleBox').removeClass('on');
        $(this).addClass("on");
    },
})