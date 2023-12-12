// 가상의 유저리스트 데이터
const userData = [
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6001J-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6002J-ET", price:"1234567", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6111J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6222J-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6333J-ET", price:"250000", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6444J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6555J-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6666J-ET", price:"1250000", pMax: "600", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6777J-ET", price:"0", pMax: "600", useStatus : "N",  date: "2023-01-01" },
    { manufacturerName: "현대에너지솔루션", modelNm: "HIS-S6888J-ET", price:"0", pMax: "600", useStatus : "Y",  date: "2023-01-01" },

    { manufacturerName: "그린훼스코", modelNm: "GF-G2000F-ET", price:"35000", pMax: "550", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2111F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2222F-ET", price:"0", pMax: "550", useStatus : "N",  date: "2023-01-01" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2333F-ET", price:"1350000", pMax: "550", useStatus : "Y",  date: "2023-01-01" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2444F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2555F-ET", price:"0", pMax: "550", useStatus : "N",  date: "2023-01-02" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2666F-ET", price:"800000", pMax: "550", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2777F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2888F-ET", price:"0", pMax: "550", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "그린훼스코", modelNm: "GF-G2999F-ET", price:"238750", pMax: "550", useStatus : "N",  date: "2023-01-02" },

    { manufacturerName: "팜솔라", modelNm: "FM-F4000M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "팜솔라", modelNm: "FM-F4111M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02" },
    { manufacturerName: "팜솔라", modelNm: "FM-F4222M-ET", price:"0", pMax: "500", useStatus : "Y",  date: "2023-01-02" },
    // ... 나머지 데이터들
];

class Paging {
    constructor(totalContent, contentPerPage) {
        this.currentPage = 1; // 현재 페이지 번호
        this.totalContent = totalContent; // 전체 콘텐츠 수
        this.contentPerPage = contentPerPage; // 페이지 당 콘텐츠 수
        // this.totalPages = Math.ceil(this.totalContent / this.contentPerPage); // 전체 페이지 수
        this.itemsPerPage = 10;
        this.totalPages = Math.ceil(userData.length / itemsPerPage);
    }

    // 현재 페이지 설정
    set setCurrentPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    // 현재 페이지 반환
    get getCurrentPage() {
        return this.currentPage;
    }

    // 다음 페이지로 이동
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    // 이전 페이지로 이동
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    // 페이지에 따른 콘텐츠 표시
    displayContent(page) {
        $('#moduleContents').empty();
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const displayData = userData.slice(start, end);
    
        displayData.forEach(item => {
            // a태그에 견적서 링크 달기?
            $('#moduleContents').append(`
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
            `);
        });
    }
}

// Paging 클래스 사용 예시
const paging = new Paging(30, 10); // 전체 콘텐츠 수와 페이지 당 콘텐츠 수 입력

paging.setCurrentPage = 3; // 현재 페이지를 3페이지로 설정
paging.nextPage(); // 다음 페이지로 이동
paging.prevPage(); // 이전 페이지로 이동

// 현재 페이지 확인
console.log(`현재 페이지: ${paging.getCurrentPage}`);

// 페이지에 따른 콘텐츠 표시
paging.displayContent();





function setValueInit() {
    


    let titleList = [];
    let titleLiList = `<li class="on" data-name="all">전체</li>`;
    userData.forEach(item => {
        titleList.push(item.manufacturerName);
    });
    const set = new Set(titleList);
    titleList = [...set];
    titleList.forEach(item => {
        titleLiList += `<li data-name="${item}">${item}</li>`
    });

    $('.pdCom > ul').html(titleLiList);
}

const itemsPerPage = 10;
const totalPages = Math.ceil(userData.length / itemsPerPage);
let currentPage = 1;

function createPaginationButtons() {
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
}

// 데이터 리스트 생성
function displayContents(page) {
    $('#moduleContents').empty();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = userData.slice(start, end);

    displayData.forEach(item => {
        // a태그에 견적서 링크 달기?
        $('#moduleContents').append(`
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
        `);
    });
}

function showPageNumbers() {
    $('#pageNumbers').empty();
    const prevBtn = `<button id="prevBtn" class="prevBtn"><</button>`;
    const nextBtn = `<button id="nextBtn" class="nextBtn">></button>`;
    $('#pageNumbers').append(prevBtn);
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
    $('#pageNumbers').append(nextBtn);
}

function highlightCurrentPage() {
    $('.pageBtn').removeClass('active'); // 모든 페이지 번호에서 active 클래스 제거
    $(`.pageBtn:contains(${currentPage})`).addClass('active'); // 현재 페이지 번호에 active 클래스 추가
}

$(document).on('click', '.pageBtn', function() {
    currentPage = parseInt($(this).text());
    displayContents(currentPage);
    // showPageNumbers();
    highlightCurrentPage();
});

$(document).on('click', '#prevBtn', function() {
    if (currentPage > 1) {
        currentPage--;
        displayContents(currentPage);
        // showPageNumbers();
        highlightCurrentPage();
    }
});

$(document).on('click', '#nextBtn', function() {
    if (currentPage < totalPages) {
        currentPage++;
        displayContents(currentPage);
        // showPageNumbers();
        highlightCurrentPage();
    }
});

// 초기 페이지 로딩 시 첫 번째 페이지의 내용을 표시하고 페이지 번호를 생성
displayContents(currentPage);
// showPageNumbers();
highlightCurrentPage();


// 해당 사원번호 클릭 시 정보보기 이동
$('.td a').on('click', function(e) {
    e.preventDefault();// 기본 이벤트 동작 차단
    console.log();
    // 선택한 유저 사원번호
    let selectModule = $(this).attr('data-user-modelnm');

    let setModelnm;
    userData.forEach((item, index) => {
        if(item.modelNm == selectModule){
            setModelnm = JSON.stringify(item);
        }
    });
    console.log(setModelnm);
    // 로컬 스토리지 설정
    localStorage.setItem('moduleInfo', setModelnm);
    // 데이터 준비
    let dataToSend = {
        selectModule: selectModule
    };

    // URL과 데이터를 조합하여 페이지 이동
    let url = './moduleInfo.html'; // 이동할 페이지 URL
    let queryString = $.param(dataToSend); // 데이터를 쿼리 문자열로 변환

    // 데이터를 포함한 URL로 페이지 이동
    window.location.href = url + '?' + queryString;

    // 현재 페이지를 덮어 씌우기 때문에 replace를 사용해서 페이지를 넘어가게 되면 이전 페이지로 돌아갈 수 없다.
    // window.location.replace('link')
});

// 등록하기 버튼 -> 등록하기 페이지 이동
$('.userRegister').on('click', function() {
    window.location.href = "./userRegister.html";
});

// 제조사 선택시 이벤트
$('.content .pdCom ul li').on({
    'click':function() {
        // console.log("클릭");
        $('.content .pdCom ul li').removeClass('on');
        $(this).addClass("on");

    }


    
});