// 현재 URL에서 쿼리 문자열 추출
let queryString = window.location.search;
// 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
let queryParams = new URLSearchParams(queryString);
let selectInverter = queryParams.get('selectInverter'); // key1에 해당하는 값(value1) 추출

// ========= 테스트 데이터 ==========
let inverterInfo = JSON.parse(localStorage.getItem('inverterInfo'));
const inverterData = { 
    modelNm: inverterInfo.modelNm,
    manufacturerName : inverterInfo.manufacturerName,
    price : Number(inverterInfo.price).toLocaleString('ko-KR'),
    pMax: inverterInfo.pMax, 
    detailFileName: inverterInfo.detailFileName, 
    width: inverterInfo.width, 
    height: inverterInfo.height, 
    date: inverterInfo.date ,
    useStatus : 1, // 사용여부 1: 사용, 0 : 비사용
}; 

// 이름
$('.content .infoBox .top .modelNm').text(inverterData.modelNm);

if(inverterData.useStatus == 1) {
    $('.content .infoBox .top .useStatus').removeClass('off');
    $('.content .infoBox .top .useStatus').addClass('on');
    $('.content .infoBox .top .useStatus').html(`
        <img src="../../public/imgs/admin/common/v.png" alt="">
        사용
    `);
}
if(inverterData.useStatus == 0) {
    $('.content .infoBox .top .useStatus').removeClass('on');
    $('.content .infoBox .top .useStatus').addClass('off');
    $('.content .infoBox .top .useStatus').html(`
        <img src="../../public/imgs/admin/common/x.png" alt="">
        미사용
    `);
}

// 유저 정보 
$('.content .infoBox .bot ul li').each(function(index, item) {
    let className = $(item).find('span').eq(1).attr('class');

    $(item).find('span').eq(1).text(inverterData[className])
});

// 유저 데이터 저장(수정하기에서 사용) 추후 => DB에서 조회해야함 각각페이지 에서?
localStorage.setItem('inverterInfo', JSON.stringify(inverterData));


$('gf-btn > .edit').on('click', function(e) {
    e.preventDefault();
    // 데이터 준비
    let dataToSend = {
        selectInverter : selectInverter
    };

    // URL과 데이터를 조합하여 페이지 이동
    let url = './userEdit.html'; // 이동할 페이지 URL
    let queryString = $.param(dataToSend); // 데이터를 쿼리 문자열로 변환

    // 데이터를 포함한 URL로 페이지 이동
    window.location.href = url + '?' + queryString;


});



