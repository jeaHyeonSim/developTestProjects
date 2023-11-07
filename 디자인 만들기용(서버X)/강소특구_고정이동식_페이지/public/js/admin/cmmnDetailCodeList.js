/* 함수설명: 조회처리. */
function fnSearch(){
    document.listForm.pageIndex.value = 1;
    document.listForm.submit();
}

/* 함수설명: 상세 화면으로 이동. */
function fnDetail(codeId, code){
    var varForm              = document.all["Form"];
    varForm.action           = "<c:url value='/sym/ccm/cde/EgovCcmCmmnDetailCodeModify.do'/>";
    varForm.codeId.value     = codeId;
    varForm.code.value       = code;
    varForm.submit();
}

/* 함수설명: 등록 버튼을 클릭하여 사용자를 등록. */
function fnRegist(){
    location.href = "<c:url value='/sym/ccm/cde/EgovCcmCmmnDetailCodeRegist.do'/>";
}

/* 함수설명: 수정 버튼을 클릭하여 사용자를 수정. */
function fnModify(){
    location.href = "";
}

//<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>