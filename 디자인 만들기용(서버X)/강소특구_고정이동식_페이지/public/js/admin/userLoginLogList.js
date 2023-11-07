function actionSearchCheck(pageIdx) {
    
    var l_startDt = document.loginLogForm.startDt.value;
    var l_endDt = document.loginLogForm.endDt.value;

    document.loginLogForm.pageIndex.value = pageIdx;

    if (l_startDt == "") {
        alert("검색 시작일을 선택해 주세요.");
        return false;
    } else if (l_endDt == "") {
        alert("검색 종료일를 선택해 주세요.");
        return false;
    } else if (l_startDt > l_endDt) {
        alert("검색 시작일을 검색 종료일 이전으로 선택해 주세요.");
    } else {
        document.loginLogForm.submit();
    }
}

function initDataPicker() {

    $.datetimepicker.setLocale('kr');

    $('#startDt').datetimepicker({
        timepicker:false,
        format:'Y-m-d'
    });

    $('#endDt').datetimepicker({
        timepicker:false,
        format:'Y-m-d'
    });
}

//검색조건 초기화
function actionInit() {
    $('#startDt').val(getCurrtDay());
    $('#endDt').val(getCurrtDay());
}

//로그인 정보 상세
function fn_inqire_loginLog(pLogId) {

    $.ajax({
        url: '/admin/loginLog/' + pLogId,
        dataType: 'json',
        type: 'GET',
        success: function(result) {
            if (result.stts == 'success') {
                $("#inqireContent").html('');
                $("#inqireContent").append(`
                    <div class="col-12">
                        <div class="col-auto d-sm-block mb-3">
                            <h4>
                                <strong>로그인 상세</strong>
                            </h4>
                        </div>
                        <div class="card">
                            <table class="table table-bordered" style="margin-bottom: 0px">
                                <tbody>
                                    <tr>
                                        <td class="bg-gray" style="width: 40%;"><strong>로그인일시</strong></td>
                                        <td>${result.creatDt}</td>
                                    </tr>
                                    <tr>
                                        <td class="bg-gray"><strong>로그유형</strong></td>
                                        <td>${result.conectMthd}</td>
                                    </tr>
                                    <tr>
                                        <td class="bg-gray"><strong>로그인ID</strong></td>
                                        <td>${result.loginId}</td>
                                    </tr>
                                    <tr>
                                        <td class="bg-gray"><strong>로그인IP</strong></td>
                                        <td>${result.conectIp}</td>
                                    </tr>
                                    <tr>
                                        <td class="bg-gray"><strong>로그인 사용자 이름</strong></td>
                                        <td>${result.loginNm}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `);

                //화면 출력
                var width = 573;
                var height = 313;
                var popx = (window.screen.width/2) - (width/2);
                var popy = (window.screen.height/2) - (height/2) - 30;

                // 좌표 새로 설정
                $("#modalInqireLayer").css({
                    "top" : popy,
                    "left" : popx
                });
                
                // 화면 출력
                $("#modalInqireLayer").fadeIn("slow");
            } else {
                alert('조회되지 않았습니다. 관리자에게 문의해 주세요.');
            }
        },
        error : function(data, status, error) {
            alert('조회되지 않았습니다. 관리자에게 문의해 주세요.');
        }
    });
}

function inqireInit() {
    //초기 로딩시 숨기기
	$("#modalInqireLayer").hide();

    //Make the DIV element draggagle:
	dragElement(document.getElementById(("modalInqireLayer")));

    $("#inqireHideDiv").on("click", function () {
        //상제 화면 숨기기
	    //$("#modalInqireLayer").fadeOut("slow");
        //$("#modalInqireLayer").fadeOut("fast");
        $("#inqireContent").html('');
        $("#modalInqireLayer").fadeOut();
    });
}

//로딩시 초기화 처리
(function () {

    //데이터Picker초기화
    initDataPicker();

    //상세화면 초기화
    inqireInit();
    
    getDataTime();
    
    let timerId = setTimeout(function tick() {

        getDataTime();

        timerId = setTimeout(tick, 1000);
    }, 1000);
})()
