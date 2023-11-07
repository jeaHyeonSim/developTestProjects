// const swiper = new Swiper('.swiper', {
//     speed : 500,
//     spaceBetween: 100,
//     // Optional parameters
//     direction: 'vertical',

//     slidesPerView : 'auto',
//     spaceBetween : 5,

//     // If we need pagination // 페이저 버튼 사용자 설정
//     pagination: {   
//         el: '.swiper-pagination',  // 페이저 버튼을 담을 태그 설정
//         clickable: true,  // 버튼 클릭 여부
//         type: 'bullets', // 버튼 모양 결정 "bullets", "fraction" 
//         // renderBullet: function (index, className) {  // className이 기본값이 들어가게 필수 설정
//         //     return '<a href="#" class="' + className + '">' + (index + 1) + '</a>'
//         // },
//         // renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
//         //     return '<span class="' + currentClass + '"></span>' +
//         //         '<span class="' + totalClass + '"></span>';
//         // }
//     },

//     // Navigation arrows
//     navigation: {   // 버튼 사용자 지정
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },

//     slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
//     spaceBetween : 6, // 슬라이드 사이 여백
//     loop : true, // 슬라이드 반복 여부
//     loopAdditionalSlides : 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정

//     autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
//         delay : 1000,   // 시간 설정
//         disableOnInteraction : true,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
//     },
//     freeMode: false, // 슬라이드 넘길 때 위치 고정 여부
//     autoHeight: true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
//     a11y: false, // 접근성 매개변수(접근성 관련 대체 텍스트 설정이 가능) - api문서 참고!
//     resistance: false, // 슬라이드 터치에 대한 저항 여부 설정
//     slideToClickedSlide: true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
//     // centeredSlides: true, // true시에 슬라이드가 가운데로 배치
//     // allowTouchMove: true, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
//     // watchOverflow: true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
//     // slidesOffsetBefore: number, // 슬라이드 시작 부분 여백
//     // slidesOffsetAfter: number, // 슬라이드 시작 부분 여백


// });


$(document).ready(function(){
    newSpan();
    

});

function newSpan() {
    let newSpan = `<span class='newSpanTag'></span>`;
    $('.swiper-pagination-bullet-active').html(newSpan);
}

async function textDelayOn(eq) {
    // const slideTitle = document.querySelector('.swiper-slide > .section-title');
    // slideTitle.classList.remove('on');
    // slideTitle.classList.add('on')
    $('.swiper-slide > .section-title').removeClass("on");
    // $('.swiper-slide > .section-title').eq(eq).addClass(function( index, currentClass){
    //     return "on"
    // });

    $('.swiper-slide > .section-title').eq(eq).addClass("on");
    // 클래스 on 생성하고 나서 텀이 있어야 아래 클래스 on을 찾고나서 css를 적용할수 있다.
    console.log(1);
    setTimeout(()=>{
        $('.swiper-slide > .section-title.on').children('h1').children().css({
            'opacity': 1,
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)',
        });
    } , 100);
    console.log(3);
    

}
function textDelayPtagOn(eq, subText) {
    console.log(subText);
    $('.swiper-slide > .section-title').children('p').text("");
    $('.swiper-slide > .section-title').eq(eq).children('p').text(subText);
    // $('.swiper-slide > .section-title').children('p').removeClass('on').css({display:'none'});
    // setTimeout(() => {
    //     $('.swiper-slide > .section-title').eq(eq).children('p').addClass('on').css({display:'block'});
    // }, 1000)

}

let swiperIndex = 0;
var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    mousewheel: true,
    spaceBetween : 5,
    slidesPerView : 'auto',
    // autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
    //     delay : 4000,   // 시간 설정
    //     disableOnInteraction : true,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
    // },
    // loop : true,
    onTransitionStart : function(swiper){
        console.log("swiper : ", swiper);
    },
    on : {
        init : async function () {
            let mainText = ["Green , &nbsp;New Deal,  &nbsp;Of,  &nbsp;GreenFesco"];
            let subText  = ['사업부지검토부터 금융자문까지 무료로 상담해드립니다.'];
            let title = $(".section-title h1").eq(0);
            let text =  await textDelay(mainText , 0).then(val => {
                title.html(val);
                textDelayOn(0);
            })
            .then(() => {
                textDelayPtagOn(0 , subText[0]);

            });
            // $(".section-title:eq(0)").addClass("on");
            // $(".section-title:eq(0) p").addClass("on");
        },
        slideChange : async function() {
            if($('.swiper-pagination-bullet').children().hasClass('newSpanTag')){
                // console.log("삭제?");
                $('span.newSpanTag').remove();
            }
            newSpan();

            let mainText = [["Green , &nbsp;New Deal,  &nbsp;Of,  &nbsp;GreenFesco"],['S,u,p,p,o,r,t'],['I,n,s,t,a,l,l'],
            ['M,a,n,a,g,e,m,e,n,t'],['Virtual, &nbsp;Power, &nbsp;Plant']];
            let subText  = ['사업부지검토부터 금융자문까지 무료로 상담해드립니다.', '전력중개사업으로 추가수익을 드립니다.', '사업부지검토부터 금융자문까지 무료로 상담해드립니다.', 
                '자사만의 기술과 특허로 최대효율의 발전소를 시공해드립니다.', '발전소의 발전 공백이 없도록 신속하게 유지보수 해드립니다.' ];
            $('.scroll-dot').removeClass('wheel-down');
            $('.scroll-dot').removeClass('wheel-up');

            //console.log(this.activeIndex); // 무슨 번호지? 
            //console.log(this.realIndex); // 현재 슬라이드 번호

            let thisRealIndex = this.realIndex;
            let title = $(".section-title h1").eq(thisRealIndex);
            let text =  await textDelay(mainText[thisRealIndex] , thisRealIndex)
            .then(val => {
                title.html(val);
                textDelayOn(thisRealIndex);
            });
            textDelayPtagOn(thisRealIndex, subText[thisRealIndex]);
            
            if(thisRealIndex == 0){
                $('.span-text').text('SCROLL');
                swiperIndex = 0;
            }else if(Number(swiperIndex) < Number(thisRealIndex)){ // down
                $('.scroll-dot').addClass('wheel-down');
                $('.span-text').text('SCROLL DOWN');
                swiperIndex = thisRealIndex;
            }else { // up
                $('.scroll-dot').addClass('wheel-up');
                $('.span-text').text('SCROLL UP');
                swiperIndex = thisRealIndex;
            }
        },
    }
});

// setTimeout(function () { // 시작하면 클래스 on 추가
	
// });


function textDelay(wordArray, index) {
    return new Promise((resolve ,reject)=>{
        let appendText = "";
        wordArray.forEach((word, index01) => {
            textSplit(word).forEach((text, index) => {
                appendText += `<b style='transition-delay: ${(0.5 * index)}s; opacity: 0;'>${text} </b>`;
            });
        });
        resolve(appendText);
    })


}
function textSplit(word) {
    var textAddr = word.split(",");
	return textAddr;
}

// $('.swiper-pagination span').hasClass('.swiper-pagination-bullet-active')
// $('.swiper-pagination-bullet-active').children().html('<span></span>');

