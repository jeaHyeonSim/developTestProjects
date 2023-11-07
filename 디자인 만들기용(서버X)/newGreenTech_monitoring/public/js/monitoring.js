// 시간별 발전량 그래프
function setChatTimeEneration(hourData, maxValue, time) {
    let config = {
            type: 'line',
            data: {
                labels: time, 
                datasets: [{
                    label: '추적식 발전량',
                    fill : true,   
                    backgroundColor: "rgba(255, 148, 54, 0.3)", 
                    borderColor: 'rgba(255, 148, 54, 1)', 
                    data: hourData
                },
                {
                    label: '고정식 발전량',
                    fill : true,   
                    backgroundColor: "rgba(201, 239, 249, 0.3)", 
                    borderColor: 'rgba(201, 239, 249, 1)', 
                    data: hourData
                }]
            },
            options: {
                responsive : false,
                plugins : {
                    legend :{
                        display : false,
                    },
                },
                elements: {
                    line: {
                    borderWidth : 3, // 라인 넓이
                    borderCapStyle : 'round', // 라인 끝 스타일
                    tension : 0.4 // 곡선
                    },
                },
                animation : {
                    duration : 0
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales:{
                    y:{ 
                        title:{
                            display : true,
                            text : "발  전  량 [ K W h ]",
                            font:{
                                size:12,
                                weight :'bold', 
                            },
                            color : 'white'
                        },
                        display : true,
                        min : 0,
                        max : maxValue,
                        // max : 100,
                        ticks :{
                            stepSize : 10,
                            color :  "#fff",
                            font:{
                                size : 11
                            },
                            padding : 3,
                        },
                        grid: {
                            color : "rgba(132, 133, 142, 0.2)", 
                            drawTicks : false,                     
                        } 
                    },
                    x:{
                        display : true,
                        ticks :{
                            color :  "#fff",
                            font:{
                                size : 11
                            },
                            padding : 7,
                        },
                        // grid: {
                        //     color : "rgba(132, 133, 142, 0.3)",
                        //     //color : "red",
                        //     drawTicks : false // 데이터 라벨이랑 그래프 라인이랑 연결되는 선 을 나태낼건지 말건지 
                        // }, 
                    }                  
                }
		    }
        };
  	return config;
};


let timeChart = function (totalData, maxValue, time){
    return new Chart($("#line_timeGraph"), setChatTimeEneration(totalData, maxValue, time));
}();

// 실시간 발전량 그래프
function setTimeEnerationData(){

    $("#Line_graph > .contentBoxTit").html(`
        <li>
            <span style="color: rgba(255, 148, 54, 1);">━ </span>
            <span>추적식[KWh]</span>
            <span style="color: rgba(201, 239, 249, 1);">━ </span>
            <span>고정식[KWh] </span>
            <span style='width:33%';></span>
            <span id='selectTime'>조회날짜: 2022-08-24 </span>
        </li>
    `);


    let maxValue = 1300;
    let labels = ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    let labelName = ['추적식 태양광','고정식 태양광'];
    let bgColorList = ["rgba(255, 148, 54, 0.3)","rgba(201, 239, 249, 0.3)"];
    let borderColorList = ["rgba(255, 148, 54, 1)","rgba(201, 239, 249, 1)"];
    let powGenSnSlice = [[123,456,789,135,246,369],[111,222,333,444,555,666]];
    let datasetItemList = [];

    for (let i = 0; i < 2; i++) {
        datasetItemList.push({
            label: labelName[i],
            fill : true,   
            backgroundColor: bgColorList[i], 
            borderColor: borderColorList[i],  
            data: powGenSnSlice[i],
        });
    }

    // 그래프 생성
    timeChart.data.labels = labels;  
    timeChart.data.datasets = datasetItemList;
    timeChart.options.scales.y.stacked = true;  
    timeChart.options.scales.y.max = maxValue;
    timeChart.update();
}

/**
 * 태양광 발전량 종합
 * Accumulated : 누적 , Quantity: 량 , Discharge : 방전 , Charging: 충전 , eneration: 발전
 */
function setOperationstatusData(){
//function setOperationstatusData(rstData){
    
    // 누적 발전량
    let all_tyield = 222222;

    // 하루전 발전량
    let yesterday_dyield = 700;
    // 금일 발전량
    let today_dyield = 500;
    // 년간 발전량
    let oneYear_tyield = 123456;

    // 게이지 퍼센트 
    let max_gage_yesterday = (yesterday_dyield/1200) * 100;
    let max_gage_today = (today_dyield/1200) * 100;
    // 게이지 퍼센트가 100%가 넘을경우 100%로 맞춰주기
    if( max_gage_today > 100){
        max_gage_today = 100;
    } else if(max_gage_today < 0) {
        max_gage_today = 0
    }
    if( max_gage_yesterday > 100) {
        max_gage_yesterday = 100;
    } else if(max_gage_yesterday < 0) {
        max_gage_yesterday = 0
    }
    
	// 이산화탄소 절감량  tCo2/년 = 발전량(MWh/년) * 온실가스배출계수(tCo2/MWh) [0.4585]
	let tCO2_ReductionQuantity = (oneYear_tyield/1000) * 0.4585;
    let reAll_tyield = all_tyield.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	$(".sTit").eq(1).next().html(reAll_tyield);
	$(".sTit").eq(2).next().html(tCO2_ReductionQuantity.toFixed(2));
	$(".amount").eq(0).html(today_dyield.toFixed(2) + "/1200"+'Kw');//금일
	$(".bar").eq(0).css("width",`${max_gage_today.toFixed(1) +'%'}`);
	$(".amount").eq(1).html(yesterday_dyield.toFixed(2) + "/1200"+ 'kWh');//전일
	$(".bar").eq(1).css("width",`${max_gage_yesterday +'%'}`);
}

/**
 * 현재 태양광 출력 (가장 최근데이터)
 * @param {json} rstData 가장 최신 인버터 데이터
 * @returns 
 */
function setOperationData(){
//function setOperationData(rstData){

    // 현재 태양광 발전량(출력) kW
    let realTime_dyield = 15;
    let trackingPdc = 15;
    let trackingPac = 15;
    let fixedPdc = 13;
    let fixedPac = 13;

    if(realTime_dyield < 0){
        realTime_dyield = 0;
    }
    
    // 태양광 발전량 종합 -  현재태양광 출력
	$(".sTit").eq(0).next().html(realTime_dyield); 

    // 현재 태양광 출력
    $(".tracking .valueBox .value .arrow").attr("class", "arrow right");
    $(".tracking .valueBox .value ul li b").eq(0).text(trackingPdc);
    $(".tracking .valueBox .value ul li b").eq(1).text(trackingPac); 

    $(".fixed .valueBox .value .arrow").attr("class", "arrow right");
    $(".fixed .valueBox .value ul li b").eq(0).text(fixedPdc);
    $(".fixed .valueBox .value ul li b").eq(1).text(fixedPac); 
    
}

// 태양광 설비 위치 기상정보
function setweatherData(rstData){
    if ('0' == rstData) {
        return;
    };

    let rn1vData = rstData?.rn1v;
    let rn1v;
    if (rn1vData == 0 || rn1vData === undefined) {
        rn1v = "-";
    }else {
        rn1v = rstData.rn1v + " mm";
    };

    let vec_num = rstData?.vec;
    let vec = "";
    if(vec_num === undefined){
        vec = "-"
    }else if (0 <= vec_num <= 44) {
        vec = "북-북동";
    } else if (45 <= vec_num <= 89) {
        vec = "북동-동";
    } else if (90 <= vec_num <= 134) {
        vec = "동-남동";
    } else if (135 <= vec_num <= 179) {
        vec = "남동-남";
    } else if (180 <= vec_num <= 224) {
        vec = "남-남서";
    } else if (225 <= vec_num <= 269) {
        vec = "남서-서";
    } else if (270 <= vec_num <= 314) {
        vec = "서-북서";
    } else if (315 <= vec_num <= 360) {
        vec = "북서-북";
    }

    // 날씨에 따른 이미지 변경
    let sky = rstData.sky;
    let pty = rstData.pty;
    let wiClassName = "";
    let wiName = "";

    if (sky == 1) {
        wiClassName = "wi-day-sunny";
        wiName = "맑음";
    } else if (sky == 3) {
        wiClassName = "wi-day-cloudy-high";
        wiName = "구름많음";
    } else if (sky == 4) {
        if (pty == 0) {
            wiClassName = "wi-cloudy";
            wiName = "흐림";
        } else if (pty == 1) {
            wiClassName = "wi-rain";
            wiName = "비";
        } else if (pty == 2) {
            wiClassName = "wi-sleet";
            wiName = "비/눈";
        } else if (pty == 3) {
            wiClassName = "wi-snow";
            wiName = "눈";
        } else if (pty == 5) {
            wiClassName = "wi-cloudy";
            wiName = "빗방울";
        } else if (pty == 6) {
            wiClassName = "wi-cloudy";
            wiName = "빗방울눈날림";
        } else if (pty == 7) {
            wiClassName = "wi-snow-wind";
            wiName = "눈날림";
        }
    }

    // wi 클래스 Name 변경
    document.getElementsByClassName("wi")[0].className =  `wi ${wiClassName}`;

    $(".t1h_value").html(rstData.t1h + "℃");
    $("#reh").html(rstData.reh + " %");
    $("#rn1v").html(rn1v);
    $("#vec").html(vec);
    $("#wsd").html(rstData.wsd + " m/s");
    $(".wi_name").html(wiName);

}

/**
 * 인버터 정보 조회하기
 */
const getSnIVTInfo = () =>{
    let btn = $('#mainContent .section .contentTit-div button');
    for (let i = 0; i < btn.length; i++) {
        let sn = btn.eq(i).attr("name");
        if(btn.eq(i).attr("id") == 'click') setIVTInfoData2(sn);
        //getIVTInfoData(sn);
    }
}

$('#mainContent .section .contentTit-div button').on('click' , function(e) {
    
    // 초기화
    let btn = $('#mainContent .section .contentTit-div button');
    btn.css({
        'font-size': '1em'
    })
    btn.attr("id","");

    // 클릭 이벤트 후 CSS 변경
    $(this).attr("id","click");
    $(this).css({
        'font-size': '1.2em'
    });

    let sn = $(this).attr("name");
    console.log(sn);
    setIVTInfoData2(sn);
    //getIVTInfoData(sn);
});

/**
 * 인버터 정보 가져오기
 * @param {json} rstData 가장 최신 인버터 데이터
 */
const setIVTInfoData = (rstData)=>{
    if(rstData == "outTime"){ //발전 시간 이외
        $('#mainContent .section.sec04 .contentBox .lightBox').hide();
        $('#mainContent .section.sec04 .contentBox .graphBox').hide();
        $('#mainContent .section.sec04 .contentBox').html(
            `
            <div class="outTimeText"> 
                <div><img src="/imgs/main/moon.png" alt=""></div>
                <div>현재 시간에는  <br>태양광 발전량이 없습니다. <br></div>
                <div>발전시간 : 05시 ~ 19시 </div>
            </div>
            `
        )
        return;
    }
    if(rstData == "undefined"){ // 데이터 없을경우(발전 해야하는 시간인데 데이터가 없을경우)
        $('#mainContent .section.sec04 .contentBox .lightBox').hide();
        $('#mainContent .section.sec04 .contentBox .graphBox').hide();
        $('#mainContent .section.sec04 .contentBox').html(
            `
            <div class="internetDisconnectedText"> 
                <div><img src="/imgs/main/internetD.png" alt=""> RTU 통신장애 발생</div>
                <div>통신(Wi-Fi포함)망의 일시적인 문제 발생 
                <br/>장비이상 발생</div>
            </div>
            `
        )
        return;
    }
    if(rstData == "err"){ //세션 끊어질때, 에러 발생시
        return;
    }

    // 발전 하지않는 시간
    //$('#mainContent .section.sec04 .contentBox .outTimeText').hide();

    // 모델:model, 그리드총에너지:TYield kWh, 당일 누적 에너지:DYield kWh, 효율:Eff %, 시작 현재 누적시간:RunT Min, AC유효전력:Pac kw
    // [A,B,C]상 전류:lalblc A, UPV[1,2,3] 전압:UPV V, IPV[1,2,3] 전류:IPV A, 주파수:Fred Hz, 
    // 변압기 온도:Tcoil, 방열판 온도: Tmod, 주위온도: Tamb

    // ----------------- 인버터 리스트 View ----------------- 
    let lightBoxIvt0 = $('.lightBox:eq(0) li');
    let lightBoxIvt1 = $('.lightBox:eq(1) li');

    let model,Tyield,Dyield,Eff,RunT,Pac,Tcoil;
    let sn,lalblc,UPV,IPV,Fred,PF,Tmod,Tamb,Pmax;
    let runtTime = (Number(rstData.RunT)) / 60;

    // 인버터 왼쪽 리스트
    model = {"name":"모델", "data": `${rstData.model}`};
    Tyield = {"name":"그리드총에너지", "data": `${rstData.TYield}`};
    Dyield = {"name":"금일 누적 발전량", "data": `${rstData.DYield}`};
    Eff = {"name":"인버터 효율", "data": `${rstData.Eff *10}`};
    RunT = {"name":"하루 누적발전시간", "data": `${runtTime.toFixed(1)}`};
    Pac = {"name":"AC유효전력", "data": `${rstData.Pac}`};
    Tcoil = {"name":"변압기 온도", "data": `${rstData.Tcoil}`};

    // 인버터 오른쪽 리스트
    sn = {"name":"SN", "data": `${rstData.SN}`};
    lalblc = {"name":"[A,B,C]상 전류", "data": `[ ${rstData.la}, ${rstData.lb}, ${rstData.lc} ]`};
    UPV = {"name":"UPV[1,2,3] 전압", "data": `[ ${rstData.Upv1}, ${rstData.Upv2}, ${rstData.Upv3} ]`};
    IPV = {"name":"IPV[1,2,3] 전류", "data": `[ ${rstData.Ipv1}, ${rstData.Ipv2}, ${rstData.Ipv3} ]`};
    Fred = {"name":"주파수", "data": `${rstData.Freq}`};
    PF = {"name":"역률", "data": `${rstData.PF}`};
    Pmax = {"name":"금일 AC최대 유효전력", "data": `${rstData.Pmax}`};

    // 인버터 그래프
    Tmod = {"name":"금일 발전량", "data": `${rstData.Tmod}`, "status": "","statusText":""};
    Tamb = {"name":"전일 발전량", "data": `${rstData.Tamb}`, "status": "","statusText":""};

    // 리스트 순서에 맞게 리스트 생성 
    let viewData01 = [
        model["data"], Tyield["data"], Dyield["data"], Eff["data"], RunT["data"], Pac["data"], Tcoil["data"]
    ]
    let viewData02 = [
        sn["data"], lalblc["data"], UPV["data"], IPV["data"], Fred["data"], PF["data"],Pmax["data"]
    ]

    // 순서에 맞게 생성한 리스트 웹 에 뿌려주기
    for (let i = 0; i < viewData01.length; i++) {
        if(viewData01[i] == null || viewData01[i] == undefined ){
            lightBoxIvt0.eq(i).find('.ivt-data').text('-');
        }
        lightBoxIvt0.eq(i).find('.ivt-data').text(viewData01[i]);
    }

    for (let i = 0; i < viewData02.length; i++) {
        if(viewData02[i] == null || viewData02[i] == undefined ){
            lightBoxIvt1.eq(i).find('.ivt-data').text('-');
        }
        lightBoxIvt1.eq(i).find('.ivt-data').text(viewData02[i]);   
    }
    // ----------------- 인버터 리스트 View ----------------- 

    // ----------------- 인버터 온도 -----------------
    // 방열판
    if(Number(Tmod.data) > 90){
        Tmod.statusText = "위험";
        Tmod.status = "state03";
    }else if(Number(Tmod.data) > 80) {
        Tmod.statusText = "경고";
        Tmod.status = "state02";
    }else {
        Tmod.statusText = "정상";
        Tmod.status = "state01";
    }
    // 주위
    if(Number(Tamb.data) > 80){
        Tamb.statusText = "위험";
        Tamb.status = "state03";
    }else if(Number(Tamb.data) > 60) {
        Tamb.statusText = "경고";
        Tamb.status = "state02";
    }else if(Number(Tamb.data) < 0) {
        Tamb.statusText = "정상";
        Tamb.status = "state01";
    }else {
        Tamb.statusText = "정상";
        Tamb.status = "state01";
    }
    
    
    let tmodTemp = ((Number(Tmod.data).toFixed(0))/100) * 100;
    if(tmodTemp > 100) {
        tmodTemp = 100;
    }else if(tmodTemp < 0) {
        tmodTemp = 0;
    }
    // 방열판 온도
    $('.gauge-temp').html(` 
        <div class="gauge_title">${Tmod.name}</div>
        <div class="gauge_body">
            <div class="gauge_fill per${tmodTemp.toFixed(0)} ${Tmod.status}"></div>
            <div class="gauge_cover"></div>
            <div class="gauge_text">
                <span class="text01">${Tmod.statusText}</span>
                <span class="text02 ${Tmod.status}">${Tmod.data} ℃</span>
            </div>
        </div>
    `)

    let tambData = Number(Tamb.data).toFixed(0);
    let tambTemp = ((tambData)/80) * 100;
    let tambTempMinus = (((tambData)/20) * 100) * -1;
    if(tambData >= 0) { // 영상
        if(tambData > 70) {
            tambTemp = 70;
        }else if(tambData < 0) {
            tambTemp = 0;
        }
        tambTempMinus = 0;
    }else if(tambData < 0){ // 영하
        if(tambData < -20) {
            tambTempMinus = 100;
        }
        tambTemp = 0;
        tambTempMinus = tambTempMinus;
    }

    // 주위 온도
    $('.gauge1-temp').html(`
        <div class="gauge_title">${Tamb.name}</div>
        <div class="gauge_body">
            <div class="gauge_fill per${tambTemp.toFixed(0)} ${Tamb.status}"></div>
            <div class="gauge_cover"></div>
            <div class="gauge_text">
                <span class="text01">${Tamb.statusText}</span>
                <span class="text02 ${Tamb.status}">${Tamb.data} ℃</span>
            </div>
        </div>
    `)
}
/**
 *  추적식/고정식 인버터 테스트 데이터
 * @param {Staing} sn 
 */
const setIVTInfoData2 = (sn) => {
    let lightBoxIvt0 = $('.lightBox:eq(0) li');
    let lightBoxIvt1 = $('.lightBox:eq(1) li');

    // 순서에 맞게 생성한 리스트 웹 에 뿌려주기
    for (let i = 0; i < 3; i++) {
        lightBoxIvt0.eq(i).find('.ivt-data').text(sn);
    }

    for (let i = 0; i < 3; i++) {
        lightBoxIvt1.eq(i).find('.ivt-data').text(sn);   
    }
    // 방열판 온도
    $('.gauge-temp').html(` 
        <div class="gauge_title">금일 발전량</div>
        <div class="gauge_body">
            <div class="gauge_fill per48 state01"></div>
            <div class="gauge_cover"></div>
            <div class="gauge_text">
                <span class="text01">38%</span>
                <span class="text02 state01">48 ℃</span>
            </div>
        </div>
    `)
    // 주위 온도
    $('.gauge1-temp').html(`
    <div class="gauge_title">전일 발전량</div>
    <div class="gauge_body">
        <div class="gauge_fill per48 state02"></div>
        <div class="gauge_cover"></div>
        <div class="gauge_text">
            <span class="text01">40%</span>
            <span class="text02 state02">48 ℃</span>
        </div>
    </div>
    `)
}



// 기상정보
function getweather(){
    $.ajax({
        url: '/monitoring/monitoringWeather',
        dataType: 'json',
        type: 'GET',
        success: function (rstData) {
            if (rstData) {
                setweatherData(rstData); // 날씨 정보 EJS에 설정하기
            }
        },
        error: function (data, status, err) {
            console.log(err);
            setweatherData("0");
        }
    });
}

/**
 * 태양광 발전량 종합 - ajax
 */
function getOperationstatus(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoring/monitoringOperationstatus',
		dataType: 'json',
		type: 'POST',
        data: {
            nowHour : time[1], // 16 현재 시간
            today : time[3], // 2022-07-07 오늘 날짜
            yesterday : time[5], // 2022-07-06 어제 날짜
            toDayMonth : time[8],
            todayOneHours : time[9], // 오늘 날짜한시간 2022-07-08 13
        },
		success: function(rstData) {
            if (rstData) {
                setOperationstatusData(rstData);
            }
		},
		error : function(data, status, err) {
			console.log(err);
            setOperationstatusData("err");
		}
	});
}

/**
 * 현재 태양광 출력 (가장 최근데이터) - ajax
 */
function getOperationData(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoring/monitoringOperationData',
		dataType: 'json',
		type: 'POST',
        data: {
            nowHour : time[1], // 16 현재 시간
            todayMonth : time[8],
            sixMinutesAgo : time[19],
            thisTimeMinutes : time[20]
        },
		success: function(rstData) {
            if (rstData) {
                setOperationData(rstData);
            }
		},
		error : function(data, status, err) {
			console.log(err);
            setOperationData("error");
		}
	});
}

/**
 * 인버터 정보 조회 - ajax
 */
function getIVTInfoData(sn){
    let time = currentTime();
  	$.ajax({
		url: '/monitoring/monitoringIvtInfo',
		dataType: 'json',
		type: 'POST',
        data : {
            nowHour : time[1], // 16 현재 시간
            todayMonth : time[8],
            sn : sn  ,
            sixMinutesAgo : time[19],
            thisTimeMinutes : time[20]
        },
		success: function(rstData) {
            if (rstData) {
                setIVTInfoData(rstData);
            }
		},
		error : function(data, status, err) {
			console.log(err);
            setIVTInfoData("err");
		}
	});
}

/**
 * 인버터 => 시간당 발전량 조회 - ajax
 */
function getHourlyIVTData(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoring/monitoringHourlyIVT',
		dataType: 'json',
		type: 'POST',
        data: {
            nowHour : time[1], // 14
            nowTime : time[3], // 오늘 날짜 2022-08-05
            todayOneHours : time[9], // 오늘 날짜시간 2022-08-05 14
            todayOneHoursAgo : time[7], // 오늘 날짜 한시간 전 2022-08-05 13
            toDayMonth : time[8], // 7월
            yesterdayTime : time[5], // 어제 날짜 2022-08-04
        }
        ,
		success: function(rstData) {
            if (rstData) {
                setTimeEnerationData(rstData, time[1], time[8]);
            }
		},
		error : function(data, status, err) {
            setTimeEnerationData("err", time[1], time[8]);
		}
	});
}


(function () {
    // 인버터
    getDataTime(); 
    //getweather(); // 날씨

    setOperationstatusData(); // 태양광 발전 종합
    setOperationData(); // 현재태양광 출력
    setTimeEnerationData(); // 실시간 발전량
    getSnIVTInfo();// 인버터

    // 2022-08-23 데이터 1분간격으로 리로드하기
    setInterval(()=>{ getDataTime(); }, 1000);
    //setInterval(()=>{ getweather(); }, 1000 * 60 * 20);




})()
