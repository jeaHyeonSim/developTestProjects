/* 함수설명: 조회처리. */
function fnSearch(){
    document.listForm.pageIndex.value = 1;
    document.listForm.submit();
}

/* 함수설명: 상세 화면으로 이동. */
function fnDetail(codeId){
    var varForm = document.getElementById("Form")
    varForm.action           = "/admin/ccmCmmnCodeModify";
    varForm.codeId.value     = codeId;
    varForm.submit();
}

/* 함수설명: 등록 버튼을 클릭하여 사용자를 등록. */
function fnRegist(){
    location.href = "/admin/ccmCmmnCodeRegist";
}

/* 함수설명: 수정 버튼을 클릭하여 사용자를 수정. */
function fnModify(){
    location.href = "";
}