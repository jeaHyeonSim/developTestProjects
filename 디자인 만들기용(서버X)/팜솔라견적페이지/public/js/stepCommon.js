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
