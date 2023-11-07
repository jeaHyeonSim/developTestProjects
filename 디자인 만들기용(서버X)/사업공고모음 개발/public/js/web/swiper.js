$(document).ready(function(){
    newSpan();
});

// 스와이퍼 pagination 블릿효과
function newSpan() {
    let newSpan = `<span class='newSpanTag'></span>`;
    $('.swiper-pagination-bullet-active').html(newSpan);
}

// 타이틀 텍스트 애니매이션 효과
async function textDelayOn(eq) {
    $('.swiper-slide > .section-title').removeClass("on");
    $('.swiper-slide > .section-title').eq(eq).addClass("on");
    // 클래스 on 생성하고 나서 텀이 있어야 아래 클래스 on을 찾고나서 css를 적용할수 있다.
    setTimeout(()=>{
        $('.swiper-slide > .section-title.on').children('h1').children().css({
            'opacity': 1,
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)',
        });
    } , 100);
}
// 타이블 서브텍스트 애니매이션 효과
function textDelayPtagOn(eq, subText) {
    $('.swiper-slide > .section-title .subTextBox > p.subText').removeClass("on");
    $('.swiper-slide > .section-title ').eq(eq).children('.subTextBox').children('p').text(subText);
    let bTagLength = document.querySelectorAll(`.swiper-slide > .section${eq+1}-title > h1 > b`).length;
    setTimeout(() => {
        $('.swiper-slide > .section-title').eq(eq).children('.subTextBox').children('p.subText').addClass('on');
    }, 1000 * (Number(bTagLength) * 0.4))

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
    //touchRatio: 0, // 드래그 막기
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
            // 초기화
            let mainText = ["Green , &nbsp;New Deal,  &nbsp;Of,  &nbsp;GreenFesco"];
            let subText  = ['사업부지검토부터 금융자문까지 무료로 상담해드립니다.'];
            let title = $(".section-title h1").eq(0);
            await textDelay(mainText , 0).then(val => {
                title.html(val);
                textDelayOn(0);
                textDelayPtagOn(0 , subText[0]);
            });
        },
        slideChange : async function() {
            if($('.swiper-pagination-bullet').children().hasClass('newSpanTag')){
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
            let endIndex = swiper.slides.length -1;
            let title = $(".section-title h1").eq(thisRealIndex);
            // 타이틀 생성 
            await textDelay(mainText[thisRealIndex] , thisRealIndex)
            .then(val => {
                title.html(val);
                textDelayOn(thisRealIndex);
                textDelayPtagOn(thisRealIndex, subText[thisRealIndex]);
            });
            
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

            // 마지막 페이지
            if(thisRealIndex == endIndex) {
                console.log("마지막 페이지");
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
                appendText += `<b style='transition-delay: ${(0.4 * index)}s; opacity: 0;'>${text} </b>`;
            });
        });
        resolve(appendText);
    });
}
function textSplit(word) {
    var textAddr = word.split(",");
	return textAddr;
}

document.querySelectorAll('.bottom-icon').forEach(element => {
    element.innerHTML = `
        <ul>
            <li>
                <a class="iconBox" href="./home.html">
                    <img src="../public/imgs/web/common/svg/BusinessSiteReview.svg" alt="" >
                    <h5>사업부지 검토 ></h5>
                </a>
            </li>
            <li>
                <a class="iconBox" href="./home.html">
                    <img src="../public/imgs/web/common/svg/powerPlantConstruction.svg" alt="" >
                    <h5>발전소 시공 ></h5>
                </a> 
                
            </li>
            <li>
                <a class="iconBox" href="./home.html">
                    <img src="../public/imgs/web/common/svg/SolarO&M.svg" alt="" >
                    <h5>태양광 O&M ></h5>
                </a>
            </li>
            <li>
                <a class="iconBox" href="./home.html">
                    <img src="../public/imgs/web/common/svg/powerBrokerageBusiness.svg" alt="" >
                    <h5>전력중개사업 ></h5>
                </a> 
            </li>
        </ul> 
    `
});


// $('.swiper-pagination span').hasClass('.swiper-pagination-bullet-active')
// $('.swiper-pagination-bullet-active').children().html('<span></span>');
