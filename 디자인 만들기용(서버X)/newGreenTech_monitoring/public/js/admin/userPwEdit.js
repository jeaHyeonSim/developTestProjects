//비밀번호 수정
function fnEditUserPw() {
    var l_oldPassword = document.editUserPwForm.oldPassword.value;
    var l_newPassword = document.editUserPwForm.newPassword.value;
    var l_newPwCfrm = document.editUserPwForm.newPwCfrm.value;

    if (l_oldPassword == "") {
        alert("[기존 비밀번호]를 입력해 주세요.");
        return false;
    } else if (l_newPassword == "") {
        alert("[비밀번호]를 입력해 주세요.");
        return false;
    } else if (l_newPwCfrm == "") {
        alert("[비밀번호 확인]을 입력해 주세요.");
        return false;
    } else if (l_newPassword != l_newPwCfrm) {
        alert("확인 비밀번호가 일치하지 않습니다.");
        return false;
    } else if (!passwordCheck(l_newPassword)) {
        alert("비밀번호는 문자, 숫자, 특수문자 포함 형태의 8~12자리를 사용하셔야 합니다.");
        return false;
    } else {
        document.editUserPwForm.altMsg.value = "정상적으로 수정되었습니다.";
        document.editUserPwForm.errMsg.value = "사용자 비밀번호 변경 실패. 관리자에게 문의해 주세요.";
        document.editUserPwForm.submit();
    }
}

//비번정합성 확인
function passwordCheck(l_passwd) {
    var regex = /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return regex.test(l_passwd);
}

//폼 초기화
function fnFormInit() {
    $('#oldPassword').val('');
    $('#newPassword').val('');
    $('#newPwCfrm').val('');
}

//목록 이동
function fnListPage() {
    document.editUserPwForm.action="/admin/selectUserList"
    document.editUserPwForm.submit();
}

//로딩시 초기화 처리
(function () {

    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
