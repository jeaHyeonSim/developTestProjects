//사용자 조회
function actionSearchCheck(pageIdx) {
    document.userForm.pageIndex.value = pageIdx;
    document.userForm.submit();
}

//사용자 정보 등록
function fnRegistUser() {
    document.userForm.action = "/admin/userRegist";
    document.userForm.submit();
}

//사용자 정보 수정
function fnSelectUser(pAdminId) {
    //window.location.href = '/admin/userEdit/' + pAdminId;
    document.userForm.selAdminId.value = pAdminId;
    document.userForm.action = "/admin/userEdit";
    document.userForm.submit();
}

//사용자 정보 삭제 
function fnDeleteUser() {
		  
    if (!fncManageChecked()) {
        return;
    }

    if (!confirm("삭제하시겠습니까?")) {
        return;
    }
    
    var checkField = document.userForm.checkField;
    var id = document.userForm.checkId;
    var checkedIds = "";
    var checkedCount = 0;

    if (checkField) {
        if (checkField.length > 1) {
            for (var i=0; i < checkField.length; i++) {
                if (checkField[i].checked) {
                    checkedIds += ((checkedCount==0 ? "" : ",") + id[i].value);
                    checkedCount++;
                }
            }
        } else {
            if (checkField.checked) {
                checkedIds = id.value;
            }
        }
    }
    
    if (checkedIds.length > 0) {
        $.ajax({
            type: 'POST',
            url: '/admin/userDelete',
            data: {chkAdminIdForDel : checkedIds},
            dataType: 'text',
            success: function(result) {
                if (result == 'success') {
                    alert('정상적으로 삭제되었습니다.');
                    fnSearch(document.userForm.pageIndex.value);
                } else {
                    alert('삭제 처리 실패. 관리자에게 문의해 주세요.');
                }
            },
            error : function(data, status, error) {
                console.log(error);
                alert('삭제 처리 실패. 관리자에게 문의해 주세요.');
            }
        });
    }
}

function fncManageChecked() {

    var checkField = document.userForm.checkField;
    var checkId = document.userForm.checkId;
    var returnValue = "";

    var returnBoolean = false;
    var checkCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                    checkField[i].value = checkId[i].value;
                    if(returnValue == "") {
                        returnValue = checkField[i].value;
                    } else {
                        returnValue = returnValue + ";" + checkField[i].value;
                    }
                    checkCount++;
                }
            }
            if(checkCount > 0) {
                returnBoolean = true;
            } else {
                alert("선택된 사용자가 없습니다.");
                returnBoolean = false;
            }
        } else {
            if(document.userForm.checkField.checked == false) {
                alert("선택된 사용자가 없습니다.");
                returnBoolean = false;
            } else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("조회된 결과가 없습니다.");
    }

    return returnBoolean;
}

//그리드 체크박스 모두 체크
function fnCheckAll() {
    var checkField = document.userForm.checkField;
    if(document.userForm.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}

//로딩시 초기화 처리
(function () {

    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
