// 가상의 유저리스트 데이터
const userData = [
    { name: "홍길동", empNumber: "111111111", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1212121212", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1313131313", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1414141414", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1515151515", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1616161616", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "1717171717", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "123456789", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "123456789", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "홍길동", empNumber: "123456789", dept:"연구기획본부", empDate: "2023-01-01", date: "2023-01-01" },

    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-01", date: "2023-01-01" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "세종대왕", empNumber: "22222222222", dept:"사업영업본부", empDate: "2023-01-02", date: "2023-01-02" },

    { name: "이순신", empNumber: "333333333333", dept:"연구개발본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "이순신", empNumber: "333333333333", dept:"연구개발본부", empDate: "2023-01-02", date: "2023-01-02" },
    { name: "이순신", empNumber: "333333333333", dept:"연구개발본부", empDate: "2023-01-02", date: "2023-01-02" },
    // ... 나머지 데이터들
];

const itemsPerPage = 10;
const totalPages = Math.ceil(userData.length / itemsPerPage);
let currentPage = 1;

function createPaginationButtons() {
    for (let i = 1; i <= totalPages; i++) {
        $('#pageNumbers').append(`<button class="pageBtn">${i}</button>`);
    }
}

function displayContents(page) {
    $('#userContents').empty();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayData = userData.slice(start, end);

    displayData.forEach(item => {
        // a태그에 견적서 링크 달기?
        $('#userContents').append(`
            <tr>
                <td>${item.name}</td>
                <td class="td">
                    <a href="#" data-user-empNumber="${item.empNumber}"> 
                        ${item.empNumber}
                    </a>
                </td>
                <td>${item.dept}</td>
                <td>${item.empDate}</td>
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
    // 선택한 유저 사원번호
    let selectUser = $(this).attr('data-user-empNumber');

    let setEmpNumber;
    userData.forEach((item, index) => {
        if(item.empNumber == selectUser){
            setEmpNumber = JSON.stringify(item);
        }
    });
    // 로컬 스토리지 설정
    localStorage.setItem('userInfo', setEmpNumber);
    // 데이터 준비
    let dataToSend = {
        selectUser: selectUser
    };

    // URL과 데이터를 조합하여 페이지 이동
    let url = './userInfo.html'; // 이동할 페이지 URL
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