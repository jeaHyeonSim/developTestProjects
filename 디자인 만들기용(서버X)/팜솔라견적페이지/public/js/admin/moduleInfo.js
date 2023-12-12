// 현재 URL에서 쿼리 문자열 추출
let queryString = window.location.search;
// 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
let queryParams = new URLSearchParams(queryString);
let selectModule = queryParams.get('selectModule'); // key1에 해당하는 값(value1) 추출


// selectModule(사원번호) => DB 조회해서 유저 정보 가져오기
// ========= 테스트 데이터 ==========
let moduleInfo = JSON.parse(localStorage.getItem('moduleInfo'));
// moduleInfo.empNumber(사원번호로 검색하면 될듯?)
const userData = { 
    modelNm: moduleInfo.modelNm,
    manufacturerName : moduleInfo.manufacturerName,
    price : moduleInfo.price,
    pMax: moduleInfo.pMax, 
    detailFileName: moduleInfo.detailFileName, 
    width: moduleInfo.width, 
    height: moduleInfo.height, 
    date: "2023-01-01" ,
    useStatus : 1, // 사용여부 1: 사용, 0 : 비사용
}; 

// 이름
$('.content .infoBox .top .name').text(userData.name);
// 유저 정보 
$('.content .infoBox .bot ul li').each(function(index, item) {
    let className = $(item).find('span').eq(1).attr('class');
    if(className == 'empStatus') {
        if(userData[className] == 1) {
            $(item).find('span').eq(1).text("재직");
        }
        if(userData[className] == 0) {
            $(item).find('span').eq(1).text("퇴사");
        }
        return true;
    }
    if(className == 'gender') {
        if(userData[className] == 1) {
            $(item).find('span').eq(1).text("남성");
        }
        if(userData[className] == 0) {
            $(item).find('span').eq(1).text("여성");
        }
        return true;
    }
    $(item).find('span').eq(1).text(userData[className])
});

// 유저 데이터 저장(수정하기에서 사용) 추후 => DB에서 조회해야함 각각페이지 에서?
localStorage.setItem('moduleInfo', JSON.stringify(userData));


$('gf-btn > .edit').on('click', function(e) {
    e.preventDefault();
    // 데이터 준비
    let dataToSend = {
        selectModule : selectModule
    };

    // URL과 데이터를 조합하여 페이지 이동
    let url = './userEdit.html'; // 이동할 페이지 URL
    let queryString = $.param(dataToSend); // 데이터를 쿼리 문자열로 변환

    // 데이터를 포함한 URL로 페이지 이동
    window.location.href = url + '?' + queryString;


});



