// 시간별 발전량 그래프
function setChatTimeEneration(hourData, maxValue, time) {
    let config = {
            type: 'line',
            data: {
                labels: time, 
                datasets: [{
                    label: '발전량',
                    fill : true,   
                    backgroundColor: "rgba(255, 148, 54, 0.3)", 
                    borderColor: 'rgba(255, 148, 54, 1)', 
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

let titleChart = null;
// 실시간 발전량 그래프
function setTimeEnerationData(rstData ,nowHour, month){
	let pow_gen;
	let pow_hour;
	let pow_selectTime;
	let maxValue = 0;

    let m03_10 = ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']; // 03월 ~ 10월 일출 시간
    let m03_101 = ['04','05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']; 
    let m11_02 = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']; // 11월 ~ 02월 일출 시간
    let m11_0201 = ['05','06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']; 
    let m03_10_ck = ['03','04','05','06','07','08','09','10']; // 03월 ~ 10월

    let time;
    let time02;
    // 일출 시간 구분
    if(m03_10_ck.indexOf(month)  > -1) {
        time = m03_10;
        time02 = m03_101;
    }else {
        time = m11_02;
        time02 = m11_0201;
    }

    // 현재 시간까지 발전량 담을 변수.
    //(전)
    let totalData;
    //(후)
    let totalData01;
    if(rstData == "err"){ //세션 끊어질때, 에러 발생시
        return;
    }
	if(rstData == "outTime"){
		$("#Line_graph > .v1").html('<li> 현재 발전량은 없습니다. </li>');
	}else{
        pow_selectTime = rstData.map(function(v){
			return v.selectTime;
		});
        $("#Line_graph > .v1").html(`
            <li>
                <span style="color: rgba(255, 148, 54, 0.8);">━</span>
                <span>시간별 발전 량 [KWh] </span>
                <span></span>
                <span id='selectTime'>조회날짜: ${pow_selectTime[0]} </span>
            </li>
        `);
        // 발전량 데이터
		pow_gen = rstData.map(function(v){
			return v.pow_gen;
		});
		pow_hour = rstData.map(function(v){
			return v.HOUR;
		});

        //(전)
        let hNum = new Array(time.length); // 하루 발전가능 예상시간 길이 만큼 배열 생성
        hNum.fill(0); // 초기값 0으로 
        // 데이터가 0인 hNum 배열에 설정한 시간대와 발전한 시간대의 위치를(인덱스)값 비교 => 해당 위치에(인덱스) 발전량 넣기.
        for (let i = 0; i < pow_hour.length; i++) {
            for (let j = 0; j < time.length; j++) {
                if(pow_hour[i] == time[j]){ // 발전한 시간(조회 된 시간) == 해당 시간에 생성된 시간
                    hNum[j] = pow_gen[i]; 
                } 
            }
        }

        //(후)
        let hNum01 = new Array(time02.length); // 하루 발전가능 예상시간 길이 만큼 배열 생성
        hNum01.fill(0); // 초기값 0으로 
        // 데이터가 0인 hNum 배열에 설정한 시간대와 발전한 시간대의 위치를(인덱스)값 비교 => 해당 위치에(인덱스) 발전량 넣기.
        for (let i = 0; i < pow_hour.length; i++) {
            for (let j = 0; j < time02.length; j++) {
                if(pow_hour[i] == time02[j]){ // 발전한 시간(조회 된 시간) == 해당 시간에 생성된 시간
                    hNum01[j] = pow_gen[i]; 
                } 
            }
        }

        // 총 발전량에서 시간당 발전량으로 만들기( 시간별 발전량 = 현재발전량 - 직전시간 발전량 )
        // 예) 10시 = 09:59:59시 발전량 - 08:59:59시 발전량 [발전량이 누적되기 때문]
        // (전)
        let hourData = [];
        for(let i = hNum.length - 1 ; i >= 0 ; i--){
            if(i == 0){
                hourData.unshift(hNum[i]);
                break;
            }
            let oneTimeData = hNum[i] - hNum[i-1];
            if(oneTimeData < 0) {
                oneTimeData = 0;
            }
            hourData.unshift(Number(oneTimeData.toFixed(1))); // unshift 배열 앞에 넣기
        }
        // (후)
        let hourData01 = [];
        for(let i = hNum01.length - 1 ; i >= 0 ; i--){
            if(i == 0){
                hourData01.unshift(hNum01[i]);
                break;
            }
            let oneTimeData = hNum01[i] - hNum01[i-1];
            if(oneTimeData < 0) {
                oneTimeData = 0;
            }
            hourData01.unshift(Number(oneTimeData.toFixed(1))); // unshift 배열 앞에 넣기
        }

        // (전)현재시간까지 발전하고 있는 데이터 길이만큼의 배열 생성 
        totalData  = new Array(time.indexOf(pow_hour[pow_hour.length -1]) +1);
        // (전)hNum에서 발전중인 인데스 위치값에 발전량으로 변경
        for (let i = 0; i < totalData.length; i++) {
            totalData[i] = (hourData[i]); // hourData의 0과 발전량이 들어 있는 배열에서 데이터 뽑아오기
        }

        // (후)현재시간까지 발전하고 있는 데이터 길이만큼의 배열 생성 
        totalData01  = new Array(time02.indexOf(pow_hour[pow_hour.length -1]) +1);
        // (후))hNum01에서 발전중인 인데스 위치값에 발전량으로 변경
        for (let i = 0; i < totalData01.length; i++) {
            totalData01[i] = (hourData01[i]); // hourData01의 0과 발전량이 들어 있는 배열에서 데이터 뽑아오기
        }

        // (전)맥스값 
		for (let i = 0; i < totalData.length; i++) {
			if (maxValue < hourData[i]) {
				maxValue = hourData[i];
			}
		}
        // (후)맥스값
		for (let i = 0; i < totalData01.length; i++) {
			if (maxValue < hourData01[i]) {
				maxValue = hourData01[i];
			}
		}

		maxValue = Math.floor(maxValue);
	}
	
    if (maxValue % 2 == 0) {
        maxValue += 8;
    }else if(maxValue % 2 != 0){
        maxValue += 7;
    }

    let ctx = $("#Line_graph > #line_timeGraph");
    if (titleChart == null) {
        titleChart = new Chart(ctx , setChatTimeEneration(totalData01, maxValue, time));
    } else {
        titleChart.data.datasets[0].data = totalData01;  
        titleChart.options.scales.y.max = maxValue;
        titleChart.update();
    }   
}


// 태양광 발전량 종합
let kW = "kW";
let kWh = " kWh" 
//  Accumulated : 누적 , Quantity: 량 , Discharge : 방전 , Charging: 충전 , eneration: 발전
function setOperationstatusData(rstData){
    if ('0' == rstData) {
        return;
    };

    // 누적 발전량
    let all_tyield = rstData[0].Tyield

    // 하루전 발전량
    let yesterday_dyield = rstData[0].yesterdayDyield
    // 금일 발전량
    let today_dyield = rstData[0].toDayDyield
    // 년간 발전량
    let oneYear_tyield = rstData[0].oneYearTyield

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
	$(".amount").eq(0).html(today_dyield.toFixed(2) + "/1200"+kWh);//금일
	$(".bar").eq(0).css("width",`${max_gage_today.toFixed(1) +'%'}`);
	$(".amount").eq(1).html(yesterday_dyield.toFixed(2) + "/1200"+ kWh);//전일
	$(".bar").eq(1).css("width",`${max_gage_yesterday +'%'}`);

}

/**
 * 현재 태양광 출력 (가장 최근데이터)
 * @param {json} rstData 가장 최신 인버터 데이터
 * @returns 
 */
function setOperationData(rstData){
    //세션 끊어질때, 에러 발생시
    if(rstData == "err" || rstData == "undefined"){ return; };

    let time = currentTime();
    let ivtLastDate = new Date(rstData[0].lastTime); // 6분전
    var sixMinutesAgoDate = new Date(time[19]); // 현재 시간
    var thisTimeMinutesDate = new Date(time[20]);// 조회 시간

    // 현재 태양광 발전량(출력) kW
    let realTime_dyield = rstData[0].sumPdc;
    let sumPdc = rstData[0].sumPdc;
    let sumPac = rstData[0].sumPdc;
    if( ivtLastDate < sixMinutesAgoDate ){
        // 발전이 중지 된 상태
        if(sumPac == 0.00 || sumPdc == 0.00){
            console.log("발전 중지 시간");
            // 발전 이외 시간
            // 태양광운영현황 현재태양광 출력
            $(".sec03box.nowPowGen").eq(0).html(`<h3 class="sTit">현재 <br />태양광 출력</h3> <strong>발전없음</strong>`); 

            // 이목태양광 실시간 운영현황
            $(".valueBox .value .arrow").attr("class", "");
            $(".valueBox .value ul li").eq(0).html(`발전 없음`);
            $(".valueBox .value ul li").eq(1).text("발전 없음");
            return;
        };
        // RTU 이상발생
        console.log("마지막 시간이 현재시간 6분전보다 이전에 RTU통신된 시간이다 => RTU 이상");
        $(".sec03box.nowPowGen").eq(0).html(`<h3 class="sTit">현재 <br />태양광 출력</h3> <strong style='color:#FEE5B1; font-size: 17px;'>RTU 통신장애<br />발생</strong>`); 

        // 이목태양광 실시간 운영현황
        $(".valueBox .value .arrow").attr("class", "");
        $(".valueBox .value ul").eq(0).html(`<li style='color:#FEE5B1; font-weight: 400;'>RTU 통신장애</li>`);
        $(".valueBox .value ul").eq(1).html(`<li style='color:#FEE5B1; font-weight: 400;'>RTU 통신장애</li>`);
        return;
    } 
    // 정상 발전 상태 
    else if( sixMinutesAgoDate <= ivtLastDate <= thisTimeMinutesDate){
        if(realTime_dyield < 0) realTime_dyield = 0;
        
        // 태양광운영현황 현재태양광 출력
        $(".sTit").eq(0).next().html(realTime_dyield); 
        $(".sec03box.nowPowGen").eq(0).html(`<h3 class="sTit">현재 <br />태양광 출력</h3> <strong> ${realTime_dyield}</strong>kW`); 

        // 이목태양광 실시간 운영현황
        $(".valueBox .value > div").attr("class", "arrow right");
        $(".valueBox .value ul li").eq(0).html(`<b>${sumPdc}</b> kW`);
        $(".valueBox .value ul li").eq(1).html(`<b>${sumPac}</b> kW`);
        return;
    }
    // 태양광운영현황 현재태양광 출력
    $(".sec03box.nowPowGen").eq(0).html(`<h3 class="sTit">현재 <br />태양광 출력</h3> <strong> 0</strong>kW`); 

    // 이목태양광 실시간 운영현황
    $(".valueBox .value").attr("class", "arrow right");
    $(".valueBox .value ul li").eq(0).html(`<b>0</b> kW`);
    $(".valueBox .value ul li").eq(1).html(`<b>0</b> kW`);
}

// 태양광 설비 위치 기상정보
function setweatherData(rstData){
    if ('0' == rstData) return;

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
        if(btn.eq(i).attr("id") == 'click') getIVTInfoData(sn);
    }
}

$('#mainContent .section .contentTit-div button').on('click' , function(e) {
    
    // 초기화
    let btn = $('#mainContent .section .contentTit-div button');
    btn.css({'font-size': '1em'});
    btn.attr("id","");

    // 클릭 이벤트 후 CSS 변경
    $(this).attr("id","click");
    $(this).css({ 'font-size': '1.2em'});

    let sn = $(this).attr("name");
    getIVTInfoData(sn);
});

/**
 * 시간과 관계없이 해당 인버터의 가장 마지막 데이터 조회
 * @param {json} rstData 
 */
const setIVTInfoData = (rstData) => {
    if(rstData == "err" || rstData == "undefined"){ //세션 끊어질때, 에러 발생시
        return;
    }

    let time = currentTime();
    let ivtLastDate = new Date(rstData.lastTime); // 조회 시간
    var sixMinutesAgoDate = new Date(time[19]); // 6분전
    var thisTimeMinutesDate = new Date(time[20]); // 현재 시간 

    let lightBoxIvt0 = $('.lightBox:eq(0) li');
    let lightBoxIvt1 = $('.lightBox:eq(1) li');

    // 모델:model, 그리드총에너지:TYield kWh, 당일 누적 에너지:DYield kWh, 효율:Eff %, 시작 현재 누적시간:RunT Min, AC유효전력:Pac kw
    // [A,B,C]상 전류:lalblc A, UPV[1,2,3] 전압:UPV V, IPV[1,2,3] 전류:IPV A, 주파수:Fred Hz, 
    // 변압기 온도:Tcoil, 방열판 온도: Tmod, 주위온도: Tamb

    let model,Tyield,Dyield,Eff,RunT,Pac,Pdc,Tcoil;
    let sn,lalblc,UPV,IPV,Fred,PF,Tmod,Tamb,Pmax;
    let runtTime = (Number(rstData.RunT)) / 60;

    // 인버터 왼쪽 리스트
    model = {"name":"모델", "data": `${rstData.model}`};
    Tyield = {"name":"그리드총에너지", "data": `${rstData.TYield}`};
    Dyield = {"name":"금일 누적 발전량", "data": `${rstData.DYield}`};
    Eff = {"name":"인버터 효율", "data": `${rstData.Eff *10}`};
    RunT = {"name":"하루 누적발전시간", "data": `${runtTime.toFixed(1)}`};
    Pac = {"name":"AC유효전력", "data": `${rstData.Pac}`};
    Pdc = {"name":"DC유효전력", "data": `${rstData.Pdc}`};
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
    Tmod = {"name":"방열판 온도", "data": `${rstData.Tmod}`, "status": "","statusText":""};
    Tamb = {"name":"주위온도", "data": `${rstData.Tamb}`, "status": "","statusText":""};

    // 리스트 순서에 맞게 리스트 생성 
    let viewData01 = [
        model["data"], Tyield["data"], Dyield["data"], Eff["data"], RunT["data"], Pac["data"], Tcoil["data"]
    ];
    let viewData02 = [
        sn["data"], lalblc["data"], UPV["data"], IPV["data"], Fred["data"], PF["data"],Pmax["data"]
    ];
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
    // 주위 온도
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


    if( ivtLastDate < sixMinutesAgoDate ){
        // 발전이 중지 된 상태
        let PacData = Pac.data;
        let PdcData = Pdc.data;
        if(PacData == 0.00 || PdcData == 0.00){
            console.log("발전 중지 시간");
            $('#mainContent .section.sec04 .contentBox .lightBox').hide();
            $('#mainContent .section.sec04 .contentBox .graphBox').hide();
            $('#mainContent .section.sec04 .contentBox').html(
                `
                <div class="outTimeText"> 
                    <div><img src="/imgs/main/moon.png" alt=""></div>
                    <div>현재 시간에는  <br>태양광 발전량이 없습니다. <br></div>
                    <div>평균 발전시간 : 05시 ~ 19시 </div>
                </div>
                `
            )
            return;
        }
        // RTU 이상발생
        console.log("마지막 시간이 현재시간 6분전보다 이전에 RTU통신된 시간이다 => RTU 이상");
        $('#mainContent .section.sec04 .contentBox .lightBox').hide();
        $('#mainContent .section.sec04 .contentBox .graphBox').hide();
        $('#mainContent .section.sec04 .contentBox').html(
            `
            <div class="internetDisconnectedText"> 
                <div><img src="/imgs/main/networkErr.png" alt=""> RTU 통신장애 발생</div>
                <div>네트워크 일시적인 문제 발생 
                <br/>장비이상 발생</div>
            </div>
            `
        );
        return
    } 
    // 정상 발전 상태 
    else if( sixMinutesAgoDate <= ivtLastDate && ivtLastDate <= thisTimeMinutesDate){
        console.log("정상 발전 중");
        //$('#mainContent .section.sec04 .contentBox > div').hide();
        if($('#mainContent .section.sec04 .contentBox .internetDisconnectedText').length > 0){
            $('#mainContent .section.sec04 .contentBox .lightBox').toggle();
            $('#mainContent .section.sec04 .contentBox .graphBox').toggle();
        }
        if($('#mainContent .section.sec04 .contentBox .outTimeText').length > 0){
            $('#mainContent .section.sec04 .contentBox .lightBox').toggle();
            $('#mainContent .section.sec04 .contentBox .graphBox').toggle();
        }

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

        // ----------------- 인버터 온도 -----------------
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
            <div class="gauge1_title">${Tamb.name}</div>
            <div class="gauge1_num">0℃</div>
            <div class="gauge1_body">
                <div class="gauge1_line"></div>
                <div class="gauge1_minusBg"></div>
                <div class="gauge1_fillBg ${Tamb.status}"></div>

                <div class="gauge1_fill per${Number(tambTemp).toFixed(0)}"></div>
                <div class="gauge1_minus per${Number(tambTempMinus)}"></div>

                <div class="gauge1_cover"></div>
                <div class="gauge1_text">
                    <span class="text01">${Tamb.statusText}</span>
                    <span class="text02 ${Tamb.status}">${Tamb.data} ℃</span>
                </div> 
            </div>
        `)
        // --------------- 인버터 온도 -----------------
    }
}  

function setErrorCode(rstData) {
    if(rstData == "undefined" || rstData == "err" ){
        $('.sec05 .contentBox').find('div').eq(0).html("");
        return;
    }

    let errorCode = errorDescription();
    let errCk = false;
    let codeNumArr = new Array(16); // 16비트
    codeNumArr.fill(0); // 초기값 0으로 
    
    let appendHtml = '';
    for (let i = 0; i < rstData.length; i++) {
        let errorCodeName = [
            {"name": "Pfault", 'ivtName' : rstData[0].inverterName, "codeNum" : rstData[i].Pfault },
            {"name": "Warm", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].Warm },
            {"name": "Fault0", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].Fault0 },
            {"name": "fault1", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].fault1 },
            {"name": "fault2", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].fault2 },
            {"name": "fault3", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].fault3 },
            {"name": "fault4", 'ivtName' : rstData[i].inverterName, "codeNum" : rstData[i].fault4 },
        ]
        let errCodeDesc = [
            {'errCodeDesc' : errorCode.Pfault},
            {'errCodeDesc' : errorCode.Warm},
            {'errCodeDesc' : errorCode.Fault0},
            {'errCodeDesc' : errorCode.fault1},
            {'errCodeDesc' : errorCode.fault2},
            {'errCodeDesc' : errorCode.fault3},
            {'errCodeDesc' : errorCode.fault4},
        ]
        
        for (let j = 0; j < errorCodeName.length; j++) { // 7번 반복
            let errCodeTrueNum = [];
            for (let k = 0; k < 16; k++) {
                if(errorCodeName[j].codeNum[k] == '1'){
                    errCodeTrueNum.push(k);
                }
            }
            if(errCodeTrueNum.length > 0){
                appendHtml += `<div class="errCodeDesc"> ${rstData[i].crt_dttm} <span class="ivtName">[${rstData[i].inverterName}]</span>`
            }
            for (let k = 0; k < errCodeTrueNum.length; k++) {
                if(errCodeDesc[j].errCodeDesc[errCodeTrueNum[k]] != undefined){
                    errCk = true;
                    appendHtml += `<p><span>[ ${errorCodeName[j].name} ]</span>  ${errCodeDesc[j].errCodeDesc[errCodeTrueNum[k]]}</p>`;
                }
            }
        }

        appendHtml += '</div>';
    }
    if(errCk){
        $('.sec05 .contentBox').html(`${appendHtml}`);
    }else {
        $('.sec05 .contentBox').html(``);
    }
}

  

// 기상정보
function getweather(){
    $.ajax({
        url: '/monitoring/monitoringWeather',
        dataType: 'json',
        type: 'GET',
        success: function (rstData) {
            if (rstData) {
                setweatherData(rstData);
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
  	$.ajax({
		url: '/monitoring/monitoringOperationData',
		dataType: 'json',
		type: 'POST',
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

/**
 * 인버터 에러코드 조회 - ajax
 */
function getErrorCode(){
  	$.ajax({
		url: '/monitoring/monitoringErrorCode',
		dataType: 'json',
		type: 'GET',
		success: function(rstData) {
            if (rstData) {
                setErrorCode(rstData);
            }
		},
		error : function(data, status, err) {
			console.log(err);
            setErrorCode("err");
		}
	});
}

/**
 * [ 가장 마지막 인버터 정보 조회 - ajax ]
 * 발전 여부 상관 없이 가져오기
 * 발전 여부는 가져온 데이터와 조회 시간을 js에서 비교해서 처리하기
 */
function getIVTInfoData(sn) {
    $.ajax({
        url: '/monitoring/monitoringIvtInfo',
		dataType: 'json',
		type: 'POST',
        data : {
            sn : sn  ,
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
    })
}

(function () {

    // 인버터
    getSnIVTInfo(); // 최신
    getHourlyIVTData(); // 시간별
    getOperationstatus(); // 운영
    getOperationData(); // 이목
    getErrorCode(); 
    getDataTime(); 
    getweather(); // 날씨

    setInterval(()=>{ getDataTime(); }, 1000);
    setInterval(()=>{ getweather(); }, 1000 * 60 * 20);
    setInterval(()=>{ getSnIVTInfo(); }, 1000 * 60 * 1);
    setInterval(()=>{ getOperationstatus(); }, 1000 * 60 * 10);
    setInterval(()=>{ getErrorCode(); }, 1000 * 60 * 1);
    setInterval(()=>{ getOperationData(); }, 1000 * 60 * 1);
    setInterval(()=>{ getHourlyIVTData(); }, 1000 * 60 * 1);



})()
