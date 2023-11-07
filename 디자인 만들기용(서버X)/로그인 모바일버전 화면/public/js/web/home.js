// JavaScript Document

// $(window).load(function () {
// 	var theWindow = $(window),
// 		$bg = $("#wrap"),
// 		aspectRatio = $bg.width() / $bg.height();
// 	function resizeBg() {
// 		if ((theWindow.width() / theWindow.height()) < aspectRatio) {
// 			$bg
// 				.removeClass()
// 				.addClass('bgheight');
// 		} else {
// 			$bg
// 				.removeClass()
// 				.addClass('bgwidth');
// 		}
// 	}
// 	theWindow.resize(resizeBg).trigger("resize");
// });


$(function(){
	/**
	 * 수치 콤마 찍어주기
	 * @param {float} arr 
	 */
	 function comma(arr){
        let arrData = parseFloat(arr).toFixed(1);
        let front = String(arrData).split(".")[0];
        let back = String(arrData).split(".")[1];
        let reAll = front.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let str = [reAll ,back ].join(".");
        return str;			
    }

	$('#header .menuBox > ul.mainManu > li a> ').not('ul.subMenu').on({
		mouseover : function(){
			console.log("마우스 오버");
			// $(this).children('.subMenu').slideDown(400).show();
			// $(this).siblings('.subMenu').slideDown(400).show();
			// $(this).siblings('.subMenu');
		},
		mouseout : function(){
			console.log("마우스 아웃");
			// $(this).children('.subMenu').slideUp().hide();
			// $(this).siblings('.subMenu').slideUp(400);
			// $(this).siblings('.subMenu').hide();

		}
	});

	const defaultFn = () => {
		// $('.subMenu').hide();
	}
	/* 
	    $("html, body").on('mousewheel DOMMouseScroll', function(e) {
         // html, body 에 마우스 휠 이벤트와 돔마우스스크롤 이벤트를 걸었습니다.
        var E = e.originalEvent;
        	// 변수 E 에다가는 이벤트 객체의 속성으로 사용할 수 있는 속성 인 originalEvent 를 넣었습니다.
        delta = 0;
        	// 변수 delta 에다가는 숫자 자료형 0 을 넣어 두었습니다.
        if (E.detail) {
            // 이 조건에서는 e.originalEvent 의 속성으로 detail 가 있다면 입니다.
            // 익스, 크롬 등은 e.originalEvent 에 detail 의 속성이 없으나,
            // 파이어 폭스 일 경우엔 detail 속성이 있습니다.
            // 그래서 이 조건을 실행 시킵니다.
            delta = E.detail * -40;
            // 이렇게 해주는 이유는 detail 의 값이 익스와 크롬과는 다르게 3 이 찍힙니다.
            // 익스, 크롬은 120 이 찍히죠.
            // 익스, 크롬과 동일하게 해주기 위해서 이렇게 해줍니다.
            $('span').text(delta);
        }else{
            // 이곳에서는 익스, 크롬의 e.originalEvent 의 속성으로 wheelDelta 를 사용할 수 있습니다.
            delta = E.wheelDelta;
             $('span').text(delta);
        };
    });
	
	*/

    // $("html, body").on('mousewheel DOMMouseScroll', function(e) {
	// 	// e.preventDefault();
	// 	var E = e.originalEvent;
	// 	delta = 0;
	// 	if (E.detail) {
	// 		delta = E.detail * -40;
	// 	}else{
	// 		delta = E.wheelDelta;
	// 	}
		
	// 	if(delta < 0){
	// 		// down
	// 		$('.scroll-dot').removeClass('wheel-up');
	// 		$('.scroll-dot').addClass('wheel-down');
	// 	} else {
	// 		// up
	// 		$('.scroll-dot').removeClass('wheel-down');
	// 		$('.scroll-dot').addClass('wheel-up');
	// 	}
	// });

	(function(){
		defaultFn();
	})()
});