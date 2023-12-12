
// 페이지 진입시 사용자 정보 표출하기
function editValueInit() {
    // 현재 URL에서 쿼리 문자열 추출
    let queryString = window.location.search;
    // 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
    let queryParams = new URLSearchParams(queryString);
    let selectInverter = queryParams.get('selectInverter');

    // selectUser : 사원번호 사용해서 DB에서 조회하기
    let inverterInfo = JSON.parse(localStorage.getItem('inverterInfo'));
    // console.log(inverterInfo);
    const inverterData = {
        modelNm: inverterInfo.modelNm,
        useStatus: inverterInfo.useStatus,
        manufacturerName: inverterInfo.manufacturerName,
        price: inverterInfo.price,
        pMax: inverterInfo.pMax,
        width: inverterInfo.width,
        height: inverterInfo.height,
        modulePhoto: inverterInfo.modulePhoto,
        detailFileName: inverterInfo.detailFileName,
    };

    // console.log(inverterData);

    // 사용여부 체크하기
    if(inverterData.useStatus == 1) {
        $('#useCheckbox').prop('checked', true)
        $('#useCheckbox').addClass('checkedGreen');
    }
    if(inverterData.useStatus == 0) {
        $('#unusedCheckbox').prop('checked', true)
        $('#unusedCheckbox').addClass('checkedGreen');
    }


    $('#modelNm').val(inverterData.modelNm);
    $('#useStatus').val(inverterData.useStatus);
    $('#manufacturerName').val(inverterData.manufacturerName);
    $('#price').val(inverterData.price);
    $('#pMax').val(inverterData.pMax);
    $('#width').val(inverterData.width);
    $('#height').val(inverterData.height);

    $('#modulePhoto').val(inverterData.modulePhoto);
    $('#detailFileName').val(inverterData.detailFileName);

}


function editValue() {
        
    // 현재 URL에서 쿼리 문자열 추출
    let queryString = window.location.search;
    // 추출된 쿼리 문자열을 객체로 변환하여 데이터 추출
    let queryParams = new URLSearchParams(queryString);
    let selectUser = queryParams.get('selectUser');

    let inverterInfo = JSON.parse(localStorage.getItem('inverterInfo'));
    const quoteData = { 
        name: inverterInfo.name,
        id : inverterInfo.empNumber,
        password : inverterInfo.empNumber,
        empNumber: inverterInfo.empNumber,
        dept: inverterInfo.dept,
        empDate: inverterInfo.empDate,
        empStatus : "재직",
        salary : "7,500",
        phoneNumber : "010-1111-2222",
        gender : "남성",
        birthDate : "1999.01.01",
        email : "gf@naver.com",
        date: "2023-01-01" ,
    };

    let inverterData = {
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
        //     data: inverterData,
        //     success: function(response) {
        //         console.log('등록 성공:', response);
        //     },
        //     error: function(xhr, status, error) {
        //         console.error('등록 실패:', error);
        //     }
        // });

        console.log('사용자 데이터:', inverterData);
        // alert('등록이 완료되었습니다.');
        // $('#editForm')[0].reset(); // 폼 리셋
    });

    // 서브밋
    $('.submit').on('click', function(e) {
        e.preventDefault();
        // ./inverterInfo.html
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

    // 사용자가 인풋 입력 할 경우 내부 벨류값 초기화
    $('.userInput').on('input', function() {
        // $(this).val(null); // 사용자 입력 시 값을 초기화
        let enteredValue =  $(this).val();
        console.log(enteredValue);
          // 입력된 값이 있을 경우 입력란에 반영하여 출력
        if (enteredValue !== '') {
            $('#userInput').val(enteredValue);
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


(function(){
    // editValue();
    editValueInit();
})();