//사용자 조회
function actionSearchCheck(pageIdx) {
    document.userPwInitForm.pageIndex.value = pageIdx;
    document.userPwInitForm.submit();
}

//비밀번호 초기화
function fnUserPWInit(selAdminId) {
    $.ajax({
        url: '/admin/passwordInit/' + selAdminId,
        dataType: 'text',
        type: 'GET',
        success: function(result) {
            if (result == 'success') {
                alert('정상적으로 비밀번호를 초기화했습니다.');
            } else {
                alert('비밀번호 초기화 실패. 관리자에게 문의해 주세요.');
            }
        },
        error : function(data, status, error) {
            alert('비밀번호 초기화 실패. 관리자에게 문의해 주세요.');
        }
    });
}

//로딩시 초기화 처리
(function () {

    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
