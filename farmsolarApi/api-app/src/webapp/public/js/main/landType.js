/**
 * 토지특성속성조회,토지이동이력속성 조회하기
 * @param {Object} data 
 * @returns 
 */
const setLandTypeSearch = (data) => {
    if(data == "err") return;
    $('.trData').html(`
        <td>${data['lndcgrCodeNm']}</td>
        <td>${data['lndpclAr']} m<sup>2</sup></td>
        <td>${data['tpgrphHgCodeNm']}</td>
        <td>${data['tpgrphFrmCodeNm']}</td>
        <td>-</td>
        <td>${data['roadSideCodeNm']}</td>
        <td>${data['ladMvmnPrvonshCodeNm']}</td>
    
    `);

}

/** 비동기 통신 */
// 토지특성속성조회,토지이동이력속성 조회하기
function getLandTypeSearch() {
    $.ajax(`/landType/getNsdiLandTypeSearch`,
        {
            method: 'get'
        }
    )
    .done(function (rsData) { // 서버요청이 성공시의 콜백함수
        // console.log(typeof landTypeSearch);
        setLandTypeSearch(rsData);
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('landTypeSearch 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
        setLandTypeSearch("err");
        // if(error.responseJSON.errorMsg == "NO Search Data") {
        //     alert("잘못 된 지역값");
        // }
    })
}


/** 버튼 클릭시 이벤트 */
$('.landTypeSearchBtn').on('click', function() {
    getLandTypeSearch();
});