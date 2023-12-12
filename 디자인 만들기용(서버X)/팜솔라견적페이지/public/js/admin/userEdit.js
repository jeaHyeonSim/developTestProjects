
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
        name: userInfo.name,
        id: userInfo.id,
        password: userInfo.password,
        empNumber: userInfo.empNumber,
        dept: userInfo.dept,
        empDate: userInfo.empDate,
        empStatus: userInfo.empStatus,
        salary: userInfo.salary,
        phoneNumber: userInfo.phoneNumber,
        gender: userInfo.gender,
        birthDate: userInfo.birthDate,
        email: userInfo.email,
        date: userInfo.date,
        useStatus : userInfo.useStatus
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

    // 고용상태 체크박스
    if(userData.empStatus == 1) {
        $('#tenureCheckbox').prop('checked', true)
        $('#tenureCheckbox').addClass('checkedGreen');
    }
    if(userData.empStatus == 0) {
        $('#leaveCheckbox').prop('checked', true)
        $('#leaveCheckbox').addClass('checkedGreen');
    }


    // 성별 체크박스
    if(userData.gender == 1) {
        $('#maleCheckbox').prop('checked', true)
        $('#maleCheckbox').addClass('checkedGreen');
    }
    if(userData.gender == 0) {
        $('#femaleCheckbox').prop('checked', true)
        $('#femaleCheckbox').addClass('checkedGreen');
    }


    $('#name').val(userData.name);
    $('#id').val(userData.id);
    $('#password').val(userData.password);
    $('#empNumber').val(userData.empNumber);
    $('#dept').val(userData.dept);
    $('#empDate').val(userData.empDate);
    $('#salary').val(userData.salary);
    $('#phoneNumber').val(userData.phoneNumber);
    $('#birthDate').val(userData.birthDate);
    $('#email').val(userData.email);
    $('#userPhotoSearch').val(userData.userPhotoSearch);

    // 생년월일 입력 태그
    $('#birthdate').datepicker({
        dateFormat: 'yy-mm-dd', // 날짜 형식 지정
        changeMonth: true,
        changeYear: true
    })
    // .datepicker('widget').wrap('<div class="custom-datepicker"></div>');
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

        // 고용상태 체크
        let tenureChecked = $('#tenureCheckbox').is(':checked');
        let leaveChecked = $('#leaveCheckbox').is(':checked');
        let empStatus;
        if (tenureChecked) {
            empStatus = 1; // 재직
        } else if (leaveChecked) {
            empStatus = 0; // 퇴사
        } else {
            empStatus = 2; // '선택되지 않음'
        }


        // 성별 체크
        let maleChecked = $('#maleCheckbox').is(':checked');
        let femaleChecked = $('#femaleCheckbox').is(':checked');
        let gender;
        if (maleChecked) {
            gender = 1; // 재직
        } else if (femaleChecked) {
            gender = 0; // 퇴사
        } else {
            gender = 2; // '선택되지 않음'
        }

        // 날짜 가져오기
        let selectedDate = $('#birthdate').datepicker('getDate');

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
            birthDate: moment(selectedDate).format("YYYY-MM-DD"),
            email: $('#email').val(),
            userPhotoSearch: $('#userPhotoSearch').val(),
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


    let fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function () {  // 값이 변경되면
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
    editValueInti();
})();