
// 페이지 진입시 사용자 정보 표출하기
function editValueInti() {
    // 현재 URL에서 쿼리 문자열 추출
    let queryString = window.location.search;
    // 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
    let queryParams = new URLSearchParams(queryString);
    let selectUser = queryParams.get('selectUser');

    // selectUser : 사원번호 사용해서 DB에서 조회하기
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo);
    const userData = {
        modelNm: userInfo.modelNm,
        useStatus: userInfo.useStatus,
        manufacturerName: userInfo.manufacturerName,
        price: userInfo.price,
        pMax: userInfo.pMax,
        width: userInfo.width,
        height: userInfo.height,
        modulePhoto: userInfo.modulePhoto,
        detailFileName: userInfo.detailFileName,
    };

    // console.log(userData);

    // 사용여부 체크하기
    if(userData.useStatus == 1) {
        $('#useCheckbox').prop('checked', true)
        $('#useCheckbox').addClass('checkedGreen');
    }
    if(userData.useStatus == 0) {
        $('#unusedCheckbox').prop('checked', true)
        $('#unusedCheckbox').addClass('checkedGreen');
    }


    $('#modelNm').val(userData.modelNm);
    $('#useStatus').val(userData.useStatus);
    $('#manufacturerName').val(userData.manufacturerName);
    $('#price').val(userData.price);
    $('#pMax').val(userData.pMax);
    $('#width').val(userData.width);
    $('#height').val(userData.height);

    $('#modulePhoto').val(userData.modulePhoto);
    $('#detailFileName').val(userData.detailFileName);

}


function editValue() {
        
    // 현재 URL에서 쿼리 문자열 추출
    let queryString = window.location.search;
    // 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
    let queryParams = new URLSearchParams(queryString);
    let selectUser = queryParams.get('selectUser');

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const quoteData = { 
        name: userInfo.name,
        id : userInfo.empNumber,
        password : userInfo.empNumber,
        empNumber: userInfo.empNumber,
        dept: userInfo.dept,
        empDate: userInfo.empDate,
        empStatus : "재직",
        salary : "7,500",
        phoneNumber : "010-1111-2222",
        gender : "남성",
        birthDate : "1999.01.01",
        email : "gf@naver.com",
        date: "2023-01-01" ,
    };

    let userData = {
        name: $('#name').val(),
        useStatus: useStatus,
        id: $('#id').val(),
        password: $('#password').val(),
        empNumber: $('#empNumber').val(),
        dept: $('#dept').val(),
        empDate: $('#empDate').val(),
        empStatus: empStatus,
        salary: $('#salary').val(),
        phoneNumber: $('#phoneNumber').val(),
        gender: gender,
        birthDate: $('#birthDate').val(),
        email: $('#email').val(),
        userPhotoSearch: $('#userPhotoSearch').val(),
    };

}
$(document).ready(function() {


    // 저장 버튼 클릭시 서브밋 이벤트 발생
    $('#editForm').on('submit',function(event) {
        event.preventDefault();

        // 사용,재직 : 1
        // 미사용, 퇴사 : 0
        // 선택X : 2

        // 사용여부 체크 *
        let useChecked = $('#useCheckbox').is(':checked');
        let unusedChecked = $('#unusedCheckbox').is(':checked');
        let useStatus;
        if (useChecked) {
            useStatus = 1; // 사용
        } else if (unusedChecked) {
            useStatus = 0; // 미사용
        } else {
            alert("사용여부 선택");
            return;
        }


        let userData = {
            modelNm: $('#modelNm').val(),
            useStatus: useStatus, // 사용여부
            manufacturerName: $('#manufacturerName').val(),
            price: $('#price').val(),
            pMax: $('#pMax').val(),
            width: $('#width').val(),
            height: $('#height').val(),
            modulePhoto: $('#modulePhoto').val(),
            detailFileName: $('#detailFileName').val(),
        };

        // 서버로 데이터 전송 (예시 코드)
        // $.ajax({
        //     method: 'POST',
        //     url: '등록할_서버_URL',
        //     data: userData,
        //     success: function(response) {
        //         console.log('등록 성공:', response);
        //     },
        //     error: function(xhr, status, error) {
        //         console.error('등록 실패:', error);
        //     }
        // });

        console.log('사용자 데이터:', userData);
        // alert('등록이 완료되었습니다.');
        // $('#editForm')[0].reset(); // 폼 리셋
    });

    // 서브밋
    $('.submit').on('click', function(e) {
        e.preventDefault();
        // ./userInfo.html
        $('#editForm').trigger('submit');
    });

    // 체크박스
    $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false); // 한 개의 체크박스만 선택 가능하도록 설정
        if ($(this).prop('checked')) {
            $(this).addClass('checkedGreen'); // 추가로 체크된 체크박스에 클래스 추가
        } else {
            $(this).removeClass('checkedGreen'); // 체크 해제 시 클래스 제거
        }
    });


    let fileTarget1 = $('.filebox1 .upload-hidden');
    fileTarget1.on('change', function () {  // 값이 변경되면
        if (window.FileReader) {  // modern browser
            var filename = $(this)[0].files[0].name;
        }
        else {  // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
        }

        // 추출한 파일명 삽입
        $(this).siblings('.upload-name').val(filename);
    });

    // PDF 구현하기
    let fileTarget2 = $('.filebox2 .upload-hidden');
    fileTarget2.on('change', function () {  // 값이 변경되면
        if (window.FileReader) {  // modern browser
            var filename = $(this)[0].files[0].name;
        }
        else {  // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
        }

        // 추출한 파일명 삽입
        $(this).siblings('.upload-name').val(filename);
    });


    // $('#birthdateForm').submit(function(event) {
    //     event.preventDefault(); // 폼 제출 방지

    //     // 선택된 생년월일 가져오기
    //     var selectedDate = $('#birthdate').val();

    //     // 선택된 생년월일을 콘솔에 출력 (실제로 사용할 때 서버로 전송 가능)
    //     console.log('선택된 생년월일:', selectedDate);
    // });
});

(function(){
    // editValue();
    // editValueInti();
})();