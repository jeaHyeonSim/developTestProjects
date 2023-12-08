$(window).on('resize', function(){
    if($('.botBox > div.top > div > ul').outerHeight() > 135) {
        $('.botBox > div.top > img').css(
            "bottom", `-25px`
        )
    }
});