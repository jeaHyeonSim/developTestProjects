$('.step-state ul li').on('click', function() {
    $('.step-state ul li').removeClass("on");
    $('.step-state ul li > span').removeClass("on");

    $(this).find('span').addClass('on');
    $('.step-state ul li').slice(0, $(this).index()+1).addClass('on');
});