var isModalView = false;

//아이이 중복 확인
function fnIdDoubleCheck() {
    
    var l_adminId = document.registUserForm.adminId.value;

    if (l_adminId == "") {
        alert("[사용자 아이디]를 입력해 주세요.");
        return;
    }

    fnIdCheck(l_adminId);
}

//아이이 중복 확인 모달창 용
function fnCheckId() {
    var checkId = $('#checkId').val();

    if (checkId == "") {
        alert("[사용자 아이디]를 입력해 주세요.");
        return;
    }

    fnIdCheck(checkId);
}

//아이이 중복 확인 선택
function fnReturnId() {

    var isPossible = $('#isPossible').val();
    var checkId = $('#checkId').val();
    var hiddenCheckId = $('#hiddenCheckId').val();
    
    if (checkId == "") {
        alert("[사용자 아이디]를 입력해 주세요.");
        return;
    } else if (isPossible == "N") {
        if (checkId == hiddenCheckId) {
            alert("사용할 수 없는 아이디입니다.");
            return;
        } else {
            alert("아이디 중복 확인을 다시 진행해 주세요.");
            return;
        }
    } else if (checkId != hiddenCheckId) {
        alert("아이디 중복 확인을 다시 진행해 주세요.");
        return;
    }

    $("#adminId").val(checkId);
    $("#chekAdminId").val(checkId);

    isModalView = false;
    //상제 화면 숨기기
    $("#searchContent").html('');
    $("#modalSearchLayer").fadeOut();
}

//아이이 중복 확인 모달창 닫기
function fnClose() {
    isModalView = false;
    //상제 화면 숨기기
    $("#searchContent").html('');
    $("#modalSearchLayer").fadeOut();
}

//아이이 중복 확인 실행
function fnIdCheck(adminId) {

    $.ajax({
        url: '/admin/idDoubleCheck/' + adminId,
        dataType: 'json',
        type: 'GET',
        success: function(result) {
            if (result.stts == 'success') {
                $("#searchContent").html('');
                $("#searchContent").append(`
                    <div class="col-12">
                        <div class="col-auto d-sm-block mb-3" style="margin-top:10px;">
                            <h4>
                                <i class="bi bi-clipboard-fill"></i>&nbsp;<strong>아이디 중복확인</strong>
                            </h4>
                        </div>
                        <div class="card">
                            <div class="card-body p-2">
                                <div class="col-md-6">
                                    <label class="form-label">사용자아이디</label>
                                    <input type="text" name="checkId" id="checkId" title="선택여부" value="${adminId}" maxlength="20"  class="form-control form-control-sm" />
                                </div>
                                <p></p>
                                <div class="col-md-12">
                                    <label class="form-label">
                                        ${result.chkMsg}
                                    </label>
                                    <input type="hidden" name="isPossible" id="isPossible" value="${result.isPossible}"/>
                                    <input type="hidden" name="hiddenCheckId" id="hiddenCheckId" value="${adminId}"/>
                                </div>
                                <p></p>
                                <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                                    <button type="submit" class="btn btn-primary pr-1"  onclick="fnCheckId(); return false;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search align-middle mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        조회
                                    </button>
                                    <button type="submit" class="btn btn-primary pr-1" onclick="fnReturnId(); return false;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save align-middle mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                        선택
                                    </button>
                                    <button type="submit" class="btn btn-secondary pr-1" onclick="fnClose(); return false;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list align-middle mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                if (!isModalView) {
                    //화면 출력
                    var width = 513;
                    var height = 313;
                    var popx = (window.screen.width/2) - (width/2);
                    var popy = (window.screen.height/2) - (height/2) - 30;

                    // 좌표 새로 설정
                    $("#modalSearchLayer").css({
                        "top" : popy,
                        "left" : popx
                    });
                    
                    // 화면 출력
                    $("#modalSearchLayer").fadeIn("slow");

                    isModalView = true;
                }
            } else {
                alert('조회되지 않았습니다. 관리자에게 문의해 주세요.');
            }
        },
        error : function(data, status, error) {
            alert('조회되지 않았습니다. 관리자에게 문의해 주세요.');
        }
    });
}

//비밀번호 수정
function fnRegistUser() {

    var l_adminId = document.registUserForm.adminId.value;
    var l_chekAdminId = document.registUserForm.chekAdminId.value;
    var l_adminNm = document.registUserForm.adminNm.value;
    var l_password = document.registUserForm.password.value;
    var l_pwCfrm = document.registUserForm.pwCfrm.value;

    if (l_adminId == "") {
        alert("[사용자 아이디]를 입력해 주세요.");
        return false;
    } else if (l_adminNm == "") {
        alert("[이름]를 입력해 주세요.");
        return false;
    } else if (l_password == "") {
        alert("[비밀번호]를 입력해 주세요.");
        return false;
    } else if (l_pwCfrm == "") {
        alert("[비밀번호 확인]을 입력해 주세요.");
        return false;
    } else if (l_adminId != l_chekAdminId) {
        alert("중복 아이디 검색을 진행해 주세요.");
        return false;
    } else if (l_password != l_pwCfrm) {
        alert("확인 비밀번호가 일치하지 않습니다.");
        return false;
    } else if (!passwordCheck(l_password)) {
        alert("비밀번호는 문자, 숫자, 특수문자 포함 형태의 8~12자리를 사용하셔야 합니다.");
        return false;
    } else {
        document.registUserForm.altMsg.value = "정상적으로 등록되었습니다.";
        document.registUserForm.submit();
    }
}

//비번정합성 확인
function passwordCheck(l_passwd) {
    var regex = /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return regex.test(l_passwd);
}


//폼 초기화
function fnFormInit() {
    $('#adminId').val('');
    $('#chekAdminId').val('');
    $('#adminNm').val('');
    $('#password').val('');
    $('#pwCfrm').val('');
}

//목록 이동
function fnListPage() {
    document.registUserForm.action="/admin/selectUserList"
    document.registUserForm.submit();
}

//아이디 중복 확인 화면 초기화
function idDoubleCheckInit() {
    isModalView = false;
    //초기 로딩시 숨기기
	$("#modalSearchLayer").hide();

    //Make the DIV element draggagle:
	dragElement(document.getElementById(("modalSearchLayer")));

    $("#searchHideDiv").on("click", function () {
        isModalView = false;
        //상제 화면 숨기기
	    //$("#modalSearchLayer").fadeOut("slow");
        //$("#modalSearchLayer").fadeOut("fast");
        $("#searchContent").html('');
        $("#modalSearchLayer").fadeOut();
    });
}

//로딩시 초기화 처리
(function () {

    //아이디 중복 확인 화면 초기화
    idDoubleCheckInit();

    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
