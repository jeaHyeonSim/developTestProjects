/** 목록 버튼을 클릭하여 리스트로 이동한다. **/
function fn_list_CmmnCode(){
    location.href = "/admin/cmmnCodeList";
}

/* 함수설명 : 저장 버튼을 클릭하여 저장처리한다. **/
function fn_regist_CmmnCode(form){
    if(confirm("코드 등록을 하시겠습니가?")){
        if(!validateCmmnCode(form)){      
            return;
        }else{
            form.submit();
        }
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
    if(form.codeId.value == "" || form.codeIdNm.value == "" || form.codeIdDc.value == "" ){
    //if(form.codeId.value == ""){
        console.log("아무 것도 입력 X");
        validation = false;
    }
    if(!validation){
        if (regExp.test(form.codeId.value) || regExp.test(form.codeIdNm.value) || regExp.test(form.codeIdDc.value)) {
            console.log("특수문자 입력");
            validation = false;
        }
    }
    return validation;
}
