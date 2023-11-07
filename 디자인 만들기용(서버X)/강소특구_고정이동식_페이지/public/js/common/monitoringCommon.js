let isNoticeLayerView = false;
let noticeCnt = 0;

let g_powerPlantInfo;

const setUserPowerPlantInfo = (rstData)=> {
    if(rstData == "0" ) {
        return;
    }

    g_powerPlantInfo = rstData;

    //console.log(rstData);
    let optionText = "";
    
    for (let i = 0; i < rstData.length; i++) {
        if(i == 0){
            optionText += `
                <select name="발전소" id="powerPlant_sel">
                <option value="${rstData[i].powerplantId}" selected>${rstData[i].powerplantName}</option>`
        }else if(i == rstData.length-1){
            optionText += `
                <option value="${rstData[i].powerplantId}">${rstData[i].powerplantName}</option>
                </select>
            `
        }
        else {
            optionText += `
                <option value="${rstData[i].powerplantId}">${rstData[i].powerplantName}</option>`
        }
    }
    
    // $('.selectBox #powerPlantTitle span').text(rstData[0].powerplantName);
    $('.selectBox #powerPlant').html(
        `
            ${optionText}
        `
    )
}

// 로그인한 유저가 선택한 발전소 보내기.
window.onload = function() {
    $('#powerPlant_sel').change( function() {
       
        //alert(this.value);

        $.get("/monitoring",
            { powerPlantFirstId: this.value }
            )
    });
}


// 로그인한 유저 발전소 정보 가져오기
function getUserPowerPlantInfo() {
    $.ajax({
        url : '/monitoringCommon/monitoring_userPowerPlantInfo'  ,
        dataType : 'json',
        type : "POST",
        success : (rstData) => {
            if(rstData){
                setUserPowerPlantInfo(rstData);
            }
        },
        error : (data, status, err) => {
            console.log(err);
            setUserPowerPlantInfo("0");
        }
    });
}


var mqttClient;
//var mqttHost = "greenfesco.iptime.org";
var mqttHost = "121.147.31.241";
var mqttPort = 9001;

function mqttConnect() {
    // Create a client instance
    mqttClient = new Paho.MQTT.Client(mqttHost, mqttPort, ("gf_spp_intergrated_monitoring" + getCurrtDateFormat().replace(/:/gi, "")));

    // set callback handlers
    mqttClient.onConnectionLost = onConnectionLost;
    mqttClient.onMessageArrived = onMessageArrived;
    
    var options = {
        timeout : 3,
        userName: "gflnMsqttUsr",
	    password: "gfln3023**mqttUsr",
        onSuccess: onConnect,
        onFailure: onFailure
    };

    // connect the client
    mqttClient.connect(options);
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    mqttClient.subscribe("/sspRtuMqttSubscribe");
    
    //msg = new Paho.MQTT.Message("Hello");
    //msg.destinationName = "World";
    //mqttClient.send(msg);
}

// called when the client connect fail
function onFailure() {
    console.log("onFailure:connection fail");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
        //재 접속
        mqttConnect();
    }
}

// called when a message arrives
function onMessageArrived(message) {
    //console.log("onMessageArrived:" + message.payloadString);

    let topicStr = message.destinationName;
    let jsonMsg = JSON.parse(message.payloadString);

    //알림 내용 표기 (RTU TCP통신에서 보낸 알림)
    if (topicStr == '/sspRtuMqttSubscribe') {
        //console.log('sspRtuMqttSubscribe');
        for (let idx = 0; idx < g_powerPlantInfo.length; idx++) {
            if (jsonMsg.powerPlantID == g_powerPlantInfo[idx].powerplantId) {
                if (jsonMsg.noticeType == 'D') {
                    $("#noticeAllSection").append("<br/><div class='dangerNotice'>" + "["  + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else if (jsonMsg.noticeType == 'W') {
                    $("#noticeAllSection").append("<br/><div class='warningNotice'>" + "["  + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else if (jsonMsg.noticeType == 'I') {
                    $("#noticeAllSection").append("<br/><div class='infoNotice'>" + "["  + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else {
                    $("#noticeAllSection").append("<br/><div class='nomalNotice'>" + "["  + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                }
                break;
            }
        }
    }

    //Div 스크롤 위치 하단 설정
    $("#noticeAllSection").scrollTop($("#noticeAllSection").prop("scrollHeight"));
    
    //알림 화면 출력
    if (!isNoticeLayerView) {
        if ((jsonMsg.noticeType == 'D') || (jsonMsg.noticeType == 'W')) {
            modalChttingShow();
            $("#newNoticeCnt").html("0건");
            //새로운 알림 초기화
            noticeCnt = 0;
        } else {
            noticeCnt++;
            $("#newNoticeCnt").html(noticeCnt + "건");
        }
    }
}

//알림창
function noticeInit() {
    //초기 로딩시 숨기기
	$("#modalNoticeLayer").hide();

    //Make the DIV element draggagle:
	dragElement(document.getElementById(("modalNoticeLayer")));

    //새로운 알림 초기화
    noticeCnt = 0;

    $("#noticeHideDiv").on("click", function () {
        isNoticeLayerView = false;
        //알림 화면 숨기기
	    //$("#modalNoticeLayer").fadeOut("slow");
        //$("#modalNoticeLayer").fadeOut("fast");
        $("#modalNoticeLayer").fadeOut();
    });

    $("#newNoteiceItem").on("click", function () {
        if (!isNoticeLayerView) {
            modalChttingShow();
            $("#newNoticeCnt").html("0건");
            //새로운 알림 초기화
            noticeCnt = 0;
        };
    });
}

//알림 화면 출력
function modalChttingShow()
{
	// var leftPoint = (screen.width - 600) / 3;
	
	// 좌표 새로 설정
	$("#modalNoticeLayer").css({
	   "top" : "520px",
	   "left" : "1030px"
	});
	
	// 화면 출력
	$("#modalNoticeLayer").fadeIn("slow");

    isNoticeLayerView = true;
}


(function () {
    getUserPowerPlantInfo(); // 유저 발전소
    getDataTime(); 

    let timerId = setTimeout(function tick() {
        getDataTime();
        timerId = setTimeout(tick, 1000);
    }, 1000);

    // let timerId1 = setTimeout(function tick() {
    //     getUserPowerPlantInfo();
    //     timerId1 = setTimeout(tick, 1000 * 60 * 60);
    // }, 1000 * 60 * 60);

    //Mqtt접속
    mqttConnect();

    //알림 창 초기 설정
    noticeInit();
})()
