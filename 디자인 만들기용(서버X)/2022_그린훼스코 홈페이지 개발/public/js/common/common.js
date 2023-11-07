$(document).ready(function(){
    // console.log(screen.width);    
//     var dh = $(window).height();
//     var dw = $(window).width();
//     var cw = 400; // 내가 표시하고자 하는 컨텐츠, 예를 들어 동영상의 폭
//     var ch = 0;   // 내가 표시하고자 하는 컨텐츠, 예를 들어 동영상의 넓이
//     var per = dw/cw; // 내가 표시하고자 하는 컨텐츠의 현재 윈도우 대비 비율
//     var per2 =dh/ch;
//     if(per > per2 ){
//         per = per2;
//     }
//     var gapH = ( dh - (ch*per) )/2;
//     var gapW = ( dw - (cw*per) )/2
//      
//     $('body').css('margin-top', gapH ); // 세로방향의 중앙에 위치하게 할때 사용합니다. 
//     $('body').css('margin-left', gapW );
//      
//     $('meta[name=viewport]').attr('content','"width=device-width, initial-scale='+per+', maximum-scale=2.0, user-scalable=yes"');

});


(function (){
    getDataTime();

    setInterval(()=> { getDataTime();}, 1000);


    
})()
