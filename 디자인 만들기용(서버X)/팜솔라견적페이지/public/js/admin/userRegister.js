$(document).ready(function() {
    $('#registrationForm').submit(function(event) {
        event.preventDefault();

        // 체크박스
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
            // useStatus = 2;// '선택되지 않음'
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
            gender = 1; // 남성
        } else if (femaleChecked) {
            gender = 0; // 여성
        } else {
            gender = 2; // '선택되지 않음'
        }




        let userData = {
            name: $('#name').val(),
            useStatus: useStatus, // 사용여부
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
        alert('등록이 완료되었습니다.');
        $('#registrationForm')[0].reset(); // 폼 리셋
    });

    // 서브밋
    $('.submit').on('click', function(e) {
        e.preventDefault();
        // ./userList.html
        $('#registrationForm').trigger('submit');
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
});