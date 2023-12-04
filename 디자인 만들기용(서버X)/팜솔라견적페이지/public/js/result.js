// 금융조건
$('.box > div > ul.box3-ul > li > div  section.sec1 > button').on('click', function() {
    if($(this).hasClass('on')) {
        $('.box > div > ul.box3-ul > li > div  section.sec1 ul').css({
            'display': 'none'
        });
    }else {
        $('.box > div > ul.box3-ul > li > div  section.sec1 ul').css({
            'display': 'block'
        });
    }
    $(this).toggleClass('on');
});
$('.box > div > ul.box3-ul > li > div  section.sec1 li > button').on('click', function() {
    $('.box > div > ul.box3-ul > li > div  section.sec1 > button').removeClass('on');
    $('.box > div > ul.box3-ul > li > div  section.sec1 > button span').text($(this).val())
    $('.box > div > ul.box3-ul > li > div  section.sec1 ul').css({
        'display': 'none'
    });
});

$('.box > div > ul.box3-ul > li > div  section.sec2 > button').on('click', function() {
    if($(this).hasClass('on')) {
        $('.box > div > ul.box3-ul > li > div  section.sec2 ul').css({
            'display': 'none'
        });
    }else {
        $('.box > div > ul.box3-ul > li > div  section.sec2 ul').css({
            'display': 'block'
        });
    }
    $(this).toggleClass('on');
});
$('.box > div > ul.box3-ul > li > div  section.sec2 li > button').on('click', function() {
    $('.box > div > ul.box3-ul > li > div  section.sec2 > button').removeClass('on');
    $('.box > div > ul.box3-ul > li > div  section.sec2 > button span').text($(this).val())
    $('.box > div > ul.box3-ul > li > div  section.sec2 ul').css({
        'display': 'none'
    });
});

// 판매조건
$('.box > div > ul.box4-ul > li > div  section.sec1 > button').on('click', function() {
    if($(this).hasClass('on')) {
        $('.box > div > ul.box4-ul > li > div  section.sec1 ul').css({
            'display': 'none'
        });
    }else {
        $('.box > div > ul.box4-ul > li > div  section.sec1 ul').css({
            'display': 'block'
        });
    }
    $(this).toggleClass('on');
});
$('.box > div > ul.box4-ul > li > div  section.sec1 li > button').on('click', function() {
    $('.box > div > ul.box4-ul > li > div  section.sec1 > button').removeClass('on');
    $('.box > div > ul.box4-ul > li > div  section.sec1 > button span').text($(this).val())
    $('.box > div > ul.box4-ul > li > div  section.sec1 ul').css({
        'display': 'none'
    });
});

$('.box > div > ul.box4-ul > li > div  section.sec2 > button').on('click', function() {
    if($(this).hasClass('on')) {
        $('.box > div > ul.box4-ul > li > div  section.sec2 ul').css({
            'display': 'none'
        });
    }else {
        $('.box > div > ul.box4-ul > li > div  section.sec2 ul').css({
            'display': 'block'
        });
    }
    $(this).toggleClass('on');
});
$('.box > div > ul.box4-ul > li > div  section.sec2 li > button').on('click', function() {
    $('.box > div > ul.box4-ul > li > div  section.sec2 > button').removeClass('on');
    $('.box > div > ul.box4-ul > li > div  section.sec2 > button span').text($(this).val())
    $('.box > div > ul.box4-ul > li > div  section.sec2 ul').css({
        'display': 'none'
    });
});
