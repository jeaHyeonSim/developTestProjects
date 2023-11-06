/**
 * 국가법령정보(조례정보 목록-법규ID)
 * @param {Object} rsData 
 */
const lawDataList = (rsData) => {

    if(rsData == "0" || rsData == "err") return;
    let jsonData1 = rsData.jsonData1; // 도·특별시·광역시 조례
    let jsonData2 = rsData.jsonData2; // 시·군·구 조례
    let str = "";

    jsonData1.forEach(el => {
        str += `
        <tr>
            <td><label class="label">${el['자치법규종류']['_text']}</label></td>
            <td><a href="https://www.law.go.kr/${el['자치법규상세링크']['_text']}"
                    class="title" target="_blank"><u>${el['자치법규명']['_cdata']}</u></a></td>
            <td>2022-12-29</td>
        </tr>
    `
    });
    jsonData2.forEach(el => {
        str += `
        <tr>
            <td><label class="label">${el['자치법규종류']['_text']}</label></td>
            <td><a href="https://www.law.go.kr/${el['자치법규상세링크']['_text']}"
                    class="title" target="_blank"><u>${el['자치법규명']['_cdata']}</u></a></td>
            <td>2022-12-29</td>
        </tr>
    `
    });

    $('.ordinanceData').html(str);

    return;

}

/**
 * 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
 * @param {Object} rsData 
 * @returns 
 * 
 */
const lawDataMain = (rsData) => {
    if(rsData == "0" || rsData == "err") return;
    let jsonData = rsData;
    let str = "";
    let jsonData1 = (jsonData['조내용']['_cdata']).split("\n");
    for (let i = 0; i < jsonData1.length; i++) {
        if(i == 0) {
            str += `<b>${jsonData1[i]}</b>`
        }else {
            str += `<br><br>${jsonData1[i]}`
        }
    }
    $('.text-list').html(str);
}


/** ajax 통신요청 */
// 국가법령정보(조례정보 목록-법규ID)
function getLawDataList() {
    $.ajax(`/lawAPI/getLawDataList`,
        {
            method: 'get'
        }
    )
    .done(function (rsData) { // 서버요청이 성공시의 콜백함수
        lawDataList(rsData);
        return;
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('lawDataList 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
        if(error.responseJSON.errorMsg == "NO Search Data") {
            alert("잘못 된 지역값");
        }
        return lawDataList("err");
    })
    // .always(function () { // 항상 실행 (finally 같은느낌)
    //     alert("complete");
    // });
}

// 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
function getLawDataMain() {
    $.ajax(`/lawAPI/getLawDataMain`,
        {
            method: 'get'
        }
    )
    .done(function (rsData) { // 서버요청이 성공시의 콜백함수
        lawDataMain(rsData);
        return;
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('lawData_1 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
        return lawDataMain("err");
    }); 
}

/** 버튼 클릭시 이벤트 */
$('.lawSearch').on('click', function() {
    getLawDataList();
});
$('.lawService').on('click', function() {
    getLawDataMain();
});


