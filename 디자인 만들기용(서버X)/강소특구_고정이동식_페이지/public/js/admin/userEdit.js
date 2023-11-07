//수정
function fnUpdate() {
    document.editUserForm.altMsg.value = "정상적으로 수정되었습니다.";
    document.editUserForm.errMsg.value = "사용자 정보 수정 실패. 관리자에게 문의해 주세요.";
    document.editUserForm.submit();
}

//삭제
function fnDeleteUser() {
    if (!confirm("사용자 정보를 삭제하시겠습니까?")) {
        return;
    }

    document.editUserForm.altMsg.value = "정상적으로 삭제되었습니다.";
    document.editUserForm.errMsg.value = "사용자 정보 삭제 실패. 관리자에게 문의해 주세요.";
    document.editUserForm.action="/admin/deleteUser"
    document.editUserForm.submit();
}

//비밀번호 변경
function fnPasswordMove() {
    document.editUserForm.action="/admin/userPwEdit"
    document.editUserForm.submit();
}

//비밀번호 초기화
function fnPasswordInit() {
    $.ajax({
        url: '/admin/passwordInit/' + document.editUserForm.selAdminId.value,
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

//목록 이동
function fnListPage() {
    document.editUserForm.action="/admin/selectUserList"
    document.editUserForm.submit();
}

//로딩시 초기화 처리
(function () {

    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
