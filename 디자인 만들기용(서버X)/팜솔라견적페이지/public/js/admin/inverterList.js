// 가상의 유저리스트 데이터
const inverterData = [
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6001J-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6002J-ET", price:"1234567", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6111J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6222J-ET", price:"0", pMax: "650", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6333J-ET", price:"250000", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6444J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6555J-ET", price:"0", pMax: "650", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6666J-ET", price:"1250000", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6777J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6888J-ET", price:"1250000", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6999J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "HIS-S6888J-ET", price:"0", pMax: "650", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },

    { manufacturerName: "그린훼스코", modelNm: "GF-G1000F-ET", price:"35000", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G1111F-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2000F-ET", price:"35000", pMax: "750", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2111F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2222F-ET", price:"0", pMax: "750", useStatus : "N",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2333F-ET", price:"1350000", pMax: "550", useStatus : "Y",  date: "2023-01-01", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2444F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2555F-ET", price:"0", pMax: "350", useStatus : "N",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2666F-ET", price:"800000", pMax: "550", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2777F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2888F-ET", price:"0", pMax: "350", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "팜솔라", modelNm: "GF-G2999F-ET", price:"238750", pMax: "550", useStatus : "N",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },

    { manufacturerName: "팜솔라", modelNm: "FM-F4000M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "팜솔라", modelNm: "FM-F4111M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    { manufacturerName: "팜솔라", modelNm: "FM-F4222M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02", width : "200", height : "600", detailFileName : "PDF주소 or 이름" },
    // ... 나머지 데이터들
];
const copyInverterData = [...inverterData];


const itemsPerPage = 10; // 페이지 에 보여질 리스트 갯수(고정값)
// 전체 데이터중 10개 나눈 갯수 , 페이지 갯수
// 타이틀 선택에 따른 갯수 변경
let totalPages = Math.ceil(copyInverterData.length / itemsPerPage); 
let currentPage = 1; // 페이지 번호, 변화가 있을경우 변함
let selectPmax = undefined;


// 선택한 타이틀 리스트 정보 보여주기
function selectModelNmValue(page, selectPmax) {
    $('#inverterContents').empty();
    let selectinverterData = [];
    copyInverterData.forEach(item => {
        if(selectPmax == "all") {
            selectinverterData.push(item);
        }else {
            if(selectPmax == item.pMax) {
                selectinverterData.push(item);
            }
        }

    });
    // console.log(Math.ceil(selectinverterData.length / itemsPerPage));
    totalPages = Math.ceil(selectinverterData.length / itemsPerPage); 


    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = selectinverterData.slice(start, end);
    let productDataList = ``;
    displayData.forEach(item => {
        if(pMax == item.pMax) {
            productDataList += `
            <tr>
                <td>${item.manufacturerName}</td>
                <td class="td">
                    <a href="#" data-user-modelNm="${item.modelNm}"> 
                        ${item.modelNm}
                    </a>
                </td>
                <td>${item.price}</td>
                <td>${item.pMax}</td>
                <td>${item.useStatus}</td>
                <td>${item.date}</td>
            </tr>
        `;
        }
    });
    // console.log(productDataList);
    $('#inverterContents').html(productDataList);

}

// 페이징 생성?
function createPaginationButtons() {
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
}

// 제조사 리스트 생성
function displayContentTitles(inverterData) {
    let titleList = [];
    let titleLiList = `<li class="on" data-name="all">전체</li>`;

    inverterData.forEach(item => {
        // titleList.push(item.manufacturerName);
        titleList.push(item.pMax);
    });
    const set = new Set(titleList);
    titleList = [...set];
    titleList.forEach(item => {
        titleLiList += `<li data-name="${item}">${item}</li>`
    });
    $('.pdCom > ul').html(titleLiList);
}


// 데이터 리스트 생성
function displayContents(page, selectPmax) {
    $('#inverterContents').empty();
    let selectinverterData = [];
    console.log(selectPmax);
    if(selectPmax != undefined) {
        copyInverterData.forEach(item => {
            if(selectPmax == "all") {
                selectinverterData.push(item);
            }else {
                if(selectPmax == item.pMax) {
                    selectinverterData.push(item);
                }
            }
        });
        totalPages = Math.ceil(selectinverterData.length / itemsPerPage); 
    }else {
        copyInverterData.forEach(item => {
            selectinverterData.push(item);
        });
    }


    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = selectinverterData.slice(start, end);

    let productDataList = ``;
    displayData.forEach(item => {
        // a태그에 견적서 링크 달기?
        productDataList += `
            <tr>
                <td>${item.manufacturerName}</td>
                <td class="td">
                    <a href="#" data-user-modelNm="${item.modelNm}"> 
                        ${item.modelNm}
                    </a>
                </td>
                <td>${item.price}</td>
                <td>${item.pMax}</td>
                <td>${item.useStatus}</td>
                <td>${item.date}</td>
            </tr>
        `;
    });
    
    

    $('#inverterContents').html(productDataList);
}

// 페이지 넘버 표시
function showPageNumbers() {
    console.log(totalPages);
    $('#pageNumbers').empty();
    const prevBtn = `<button id="prevBtn" class="prevBtn"><</button>`;
    const nextBtn = `<button id="nextBtn" class="nextBtn">></button>`;
    $('#pageNumbers').append(prevBtn);
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
    $('#pageNumbers').append(nextBtn);
}

// 페이지 배경 색상
function highlightCurrentPage() {
    $('.pageBtn').removeClass('active'); // 모든 페이지 번호에서 active 클래스 제거
    $(`.pageBtn:contains(${currentPage})`).addClass('active'); // 현재 페이지 번호에 active 클래스 추가
}

// 페이지 넘버
$(document).on('click', '.pageBtn', function() {
    currentPage = parseInt($(this).text());
    displayContents(currentPage);
    showPageNumbers();
    highlightCurrentPage();
});

// 이전 페이지
$(document).on('click', '#prevBtn', function() {
    if (currentPage > 1) {
        currentPage--;
        displayContents(currentPage);
        showPageNumbers();
        highlightCurrentPage();
    }
});
// 다음 페이지
$(document).on('click', '#nextBtn', function() {
    if (currentPage < totalPages) {
        currentPage++;
        displayContents(currentPage);
        showPageNumbers();
        highlightCurrentPage();
    }
});

// 초기 페이지 로딩 시 첫 번째 페이지의 내용을 표시하고 페이지 번호를 생성
displayContents(currentPage, selectPmax); // 해당 페이지 정보 보여주기
showPageNumbers();
highlightCurrentPage();

displayContentTitles(copyInverterData); // 제조사 리스트 생성하기

// 해당 모듈 모델명 클릭 시 정보보기 이동
$('.td a').on('click', function(e) {
    e.preventDefault();// 기본 이벤트 동작 차단
    console.log();
    // 선택한 유저 사원번호
    let selectInverter = $(this).attr('data-user-modelnm');

    let inverterInfo;
    copyInverterData.forEach((item, index) => {
        if(item.modelNm == selectInverter){
            inverterInfo = JSON.stringify(item);
        }
    });
    console.log(inverterInfo);
    // 로컬 스토리지 설정
    localStorage.setItem('inverterInfo', inverterInfo);
    // 데이터 준비
    let dataToSend = {
        selectInverter: selectInverter
    };

    // URL과 데이터를 조합하여 페이지 이동
    let url = './inverterInfo.html'; // 이동할 페이지 URL
    let queryString = $.param(dataToSend); // 데이터를 쿼리 문자열로 변환

    // 데이터를 포함한 URL로 페이지 이동
    window.location.href = url + '?' + queryString;

    // 현재 페이지를 덮어 씌우기 때문에 replace를 사용해서 페이지를 넘어가게 되면 이전 페이지로 돌아갈 수 없다.
    // window.location.replace('link')
});

// 등록하기 버튼 -> 등록하기 페이지 이동
$('.inverterRegister').on('click', function() {
    window.location.href = "./inverterRegister.html";
});

// 제조사 선택시 이벤트
$('.content .pdCom ul li').on({
    'click':function() {
        // console.log("클릭");
        $('.content .pdCom ul li').removeClass('on');
        $(this).addClass("on");
        selectPmax = $(this).attr('data-name');
    
        displayContents(currentPage, selectPmax);
        // selectModelNmValue(currentPage, $(this).attr('data-name'));
        showPageNumbers();
        highlightCurrentPage();
    }
});