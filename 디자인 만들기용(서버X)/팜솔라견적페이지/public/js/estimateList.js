// 가상의 견적 데이터
const quoteData = [
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },
    { person: "홍길동", location: "전라남도 영암군 군서면 도장리 535(위석녀)", date: "2023-01-01" },

    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-01" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-01" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-01" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-01" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },
    { person: "세종대왕", location: "광주광역시 광산구 삼거동 930", date: "2023-01-02" },

    { person: "이순신", location: "광주광역시 북구 첨단과기로 208번길 50, 111호(연구소)", date: "2023-01-02" },
    { person: "이순신", location: "광주광역시 북구 첨단과기로 208번길 50, 111호(연구소)", date: "2023-01-02" },
    { person: "이순신", location: "광주광역시 북구 첨단과기로 208번길 50, 111호(연구소)", date: "2023-01-02" },
    // ... 나머지 데이터들
];

const itemsPerPage = 10;
const totalPages = Math.ceil(quoteData.length / itemsPerPage);
let currentPage = 1;

function createPaginationButtons() {
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
}

function displayContents(page) {
    $('#quoteContents').empty();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = quoteData.slice(start, end);

    displayData.forEach(item => {
        // a태그에 견적서 링크 달기?
        $('#quoteContents').append(`
            <tr>
                <td>${item.person}</td>
                <td>
                    <a href="#">${item.location} </a>
                </td>
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
    showPageNumbers();
    highlightCurrentPage();
});

$(document).on('click', '#prevBtn', function() {
    if (currentPage > 1) {
        currentPage--;
        displayContents(currentPage);
        showPageNumbers();
        highlightCurrentPage();
    }
});

$(document).on('click', '#nextBtn', function() {
    if (currentPage < totalPages) {
        currentPage++;
        displayContents(currentPage);
        showPageNumbers();
        highlightCurrentPage();
    }
});

// 초기 페이지 로딩 시 첫 번째 페이지의 내용을 표시하고 페이지 번호를 생성
displayContents(currentPage);
showPageNumbers();
highlightCurrentPage();