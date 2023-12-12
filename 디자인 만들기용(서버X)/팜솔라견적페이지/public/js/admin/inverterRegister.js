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

        

        let inverterData = {
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

        // console.log('인버터 데이터:', userData);
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


    // 옵션 클릭 시 해당 값을 input에 표시
    $('.options li').click(function() {
        var selectedValue = $(this).text(); // 선택된 값을 가져오기
        $('#selectedOption').val(selectedValue); // input에 표시
        $('.options').removeClass('active');
        $('.custom-select').removeClass('active'); // 옵션 숨기기
    });

    // input 클릭 시 옵션 보이기/숨기기
    $('#selectedOption').click(function() {
        $('.custom-select').toggleClass('active');
        $('.options').toggleClass('active');
    });

    // 옵션 영역 외의 다른 곳을 클릭하면 옵션 숨기기
    $(document).on('click', function(event) {
        var target = $(event.target);
        if (!target.closest('.custom-select').length) {
            $('.custom-select').removeClass('active');
            $('.options').removeClass('active');
            // $('.custom-select .arrow').removeClass('on');
        }
    });
});