// 가상의 견적 데이터
const quoteData = [
    { person: "홍길동", empNumber: "111111111", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1212121212", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1313131313", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1414141414", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1515151515", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1616161616", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "1717171717", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "123456789", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "123456789", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "홍길동", empNumber: "123456789", department:"연구기획본부", startSate: "2023-01-01", date: "2023-01-01" },

    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-01", date: "2023-01-01" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "세종대왕", empNumber: "22222222222", department:"사업영업본부", startSate: "2023-01-02", date: "2023-01-02" },

    { person: "이순신", empNumber: "333333333333", department:"연구개발본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "이순신", empNumber: "333333333333", department:"연구개발본부", startSate: "2023-01-02", date: "2023-01-02" },
    { person: "이순신", empNumber: "333333333333", department:"연구개발본부", startSate: "2023-01-02", date: "2023-01-02" },
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
                <td class="td">
                    <a href="#" data-user-empNumber="${item.empNumber}"> 
                        ${item.empNumber}
                    </a>
                </td>
                <td>${item.department}</td>
                <td>${item.startSate}</td>
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


// 해당 사원번호 클릭 시 정보보기 이동
$('.td a').on('click', function(e) {
    e.preventDefault();// 기본 이벤트 동작 차단
    console.log();
    window.location.href = `../../views/admin/userInfo?empNumber=${$(this).attr('data-user-empNumber')}`;

    // 현재 페이지를 덮어 씌우기 때문에 replace를 사용해서 페이지를 넘어가게 되면 이전 페이지로 돌아갈 수 없다.
    // window.location.replace('link')
});