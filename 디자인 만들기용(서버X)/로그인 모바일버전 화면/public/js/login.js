function actionLoginCheck() {
    if (document.loginForm.userId.value == "") {
        alert("아이디호를 입력하세요");
        return false;
    } else if (document.loginForm.userPw.value == "") {
        alert("비밀번호를 입력하세요");
        return false;
    } else {
        document.loginForm.action="/login";
        document.loginForm.submit();
    }
} 
