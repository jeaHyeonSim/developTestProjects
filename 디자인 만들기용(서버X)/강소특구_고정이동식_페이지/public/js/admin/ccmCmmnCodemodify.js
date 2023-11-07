/** 목록 버튼을 클릭하여 리스트로 이동한다. **/
function fn_egov_list_CmmnCode(){
    location.href = "/admin/cmmnCodeList";
}

/* 함수설명 : 저장 버튼을 클릭하여 저장처리한다. **/
function fn_egov_modify_CmmnCode(form, codeId){
    if(confirm("코드를 수정 하시겠습니가?")){
        if(!validateCmmnCode(form)){            
            return;
        }else{
            form.cmd.value = "Modify";
            form.codeId.value = codeId;
            form.submit();
        }
    }
}

/* 함수설명 : 삭제 버튼을 클릭하여 삭제처리한다. **/
function fn_egov_delete_CmmnCode(form, codeId){
    if(confirm("코드를 삭제 하시겠습니가?")){
            form.cmd.value = "Delete";
            form.codeId.value = codeId;
            form.submit();
    }
}

/**************************************** 
* [3] 유효성 체크.
* Validation
***************************************/
// 특수문자 입력 방지
function validateCmmnCode(form) {
    var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    // 허용할 특수문자는 여기서 삭제하면 됨
    // 지금은 띄어쓰기도 특수문자 처리됨 참고

    let validation = true;
    //if(form.codeId.value == "" || form.codeIdNm.value == "" || form.codeIdDc.value == ""){
    if(form.codeIdNm.value == ""){
        validation = false;
    }
    if(!validation){
        if (regExp.test(form.codeId.value) || regExp.test(form.codeIdNm.value) || regExp.test(form.codeIdDc.value)) {
            validation = false;
        }
    }
    return validation;
}
