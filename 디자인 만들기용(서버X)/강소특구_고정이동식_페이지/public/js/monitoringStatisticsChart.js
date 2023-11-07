
// 년간 발전량 그래프
function setChatYearEneration(thisYearData, lastYearData, maxValue, stepSize, label) {
    let config = {
        type: 'line',
        data: {
            labels: ["1","2","3","4","5","6","7","8","9","10","11","12"], 
            datasets: [
            {
                label: `${label[0]}년 발전량`,
                fill : true,   
                // backgroundColor: "rgba(181, 15, 92, 0.3)", 
                borderColor: 'rgba(181, 15, 92, 1)',
                data: thisYearData
            },
            {
                label: `${label[1]}년 발전량`,
                fill : true,   
                // backgroundColor: "rgba(40, 144, 90, 0.3)", 
                borderColor: 'rgba(40, 144, 90, 1)',  
                data: lastYearData
            }
        ]
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
                borderWidth : 2, // 라인 넓이
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
                    ticks :{
                        stepSize : stepSize,
                        color :  "#fff",
                        font:{
                            size : 10
                        },
                        padding : 3,
                    },
                    grid: {
                        color : "rgba(132, 133, 142, 0.3)", 
                        drawTicks : false,                     
                    } 
                },
                x:{
                    display : true,
                    ticks :{
                        color :  "#fff",
                        font:{
                            size : 12
                        },
                        padding : 7,
                    },
                    grid: {
                        color : "rgba(132, 133, 142, 0.3)",
                        //color : "red",
                        drawTicks : false // 데이터 라벨이랑 그래프 라인이랑 연결되는 선 을 나태낼건지 말건지 
                    }, 
                }                  
            }
        }
    };
  	return config;
};

let titleChart01 = null;
// 년(월) 단위 발전량 그래프
async function setYearEnerationData(rstData, todayYear , lastYear01){

    let month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    let maxValue = 0;
    let stepSize = 0;
    let thisYearData = [];
    let lastYearData = [];
    let label = [todayYear, lastYear01];

    if(rstData == "undefined"){
        $("#graph1 > .contentBoxTit").html(`연간 발전량 그래프<span>발전량은 없습니다</span>`);
	}else{
        $("#graph1 > .contentBoxTit").html(`
            연간 발전량 그래프 [월]<span>${todayYear}년 발전량 [KWh]</span>
            <span style="color: rgba(181, 15, 92, 1);">━━ </span>
            <span>${lastYear01}년 발전량 [KWh] </span>
            <span style="color: rgba(40, 144, 90, 1);">━━ </span>
        `);

        let thisYear = rstData.result1;
        let lastYear = rstData.result2;

        if(thisYear.length > 0) {
            thisYearData = powMonthDataFn(thisYear, month);
        }
        if(lastYear.length > 0) {
            lastYearData = powMonthDataFn(lastYear, month);
        }

        [maxValue, stepSize] =  maxValueStepSize(thisYearData, lastYearData);
    }

    let ctx = $("#contentBoxCanvasYear > #line_yearGraph");
    if (titleChart01 == null) {
        titleChart01 = new Chart(ctx , setChatYearEneration(thisYearData, lastYearData, maxValue, stepSize, label));
    } 
    // else {
    //     titleChart01.data.datasets[0][0].data = thisYearData;  
    //     titleChart01.data.datasets[0][1].data = lastYearData;  
    //     titleChart01.options.scales.y.max = maxValue;
    //     titleChart01.options.scales.y.max.ticks.stepSize = stepSize;
    //     titleChart01.update(); 
    // }   
}
// 년(월) 간 데이터 처리
function powMonthDataFn(rstData, month) {
    let yearData;
    let pow_gen;
	let pow_month;
    let allmonth = month;

    pow_gen = rstData.map(function(v){
        return v.TYield;
    });
    pow_month = rstData.map(function(v){
        return v.MONTH;
    });

    let hNum = new Array(allmonth.length); // 하루 발전가능 예상시간 길이 만큼 배열 생성
    hNum.fill(0); // 초기값 0으로 
    // 데이터가 0인 hNum 배열에 설정한 시간대와 발전한 시간대의 위치를(인덱스)값 비교 => 해당 위치에(인덱스) 발전량 넣기.
    for (let i = 0; i < pow_month.length; i++) {
        for (let j = 0; j < allmonth.length; j++) {
            if(pow_month[i] == allmonth[j]){ // 발전한 시간(조회 된 시간) == 해당 시간에 생성된 시간
                hNum[j] = pow_gen[i]; 
            } 
        }
    }
    // 총 발전량에서 시간당 발전량으로 만들기( 시간별 발전량 = 현재발전량 - 직전시간 발전량 )
    // 예) 10시 = 09:59:59시 발전량 - 08:59:59시 발전량 [발전량이 누적되기 때문]
    let monthData = [];
    for(let i = hNum.length - 1 ; i >= 0 ; i--){
        if(i == 0){
            monthData.unshift(hNum[i]);
            break;
        }
        let monthOneData = hNum[i] - hNum[i-1];
        if(monthOneData < 0) {
            monthOneData = 0;
        }
        monthData.unshift(Number(monthOneData.toFixed(1))); // unshift 배열 앞에 넣기
    }

    // 현재시간까지 발전하고 있는 데이터 길이만큼의 배열 생성 
    yearData  = new Array(allmonth.indexOf(pow_month[pow_month.length -1]) +1);
    // hNum에서 발전중인 인데스 위치값에 발전량으로 변경
    for (let i = 0; i < yearData.length; i++) {
        yearData[i] = (hNum[i]); // hourData01의 0과 발전량이 들어 있는 배열에서 데이터 뽑아오기
    }
    // for (let i = 0; i < yearData.length; i++) {
    //     yearData[i] = (monthData[i]); // hourData01의 0과 발전량이 들어 있는 배열에서 데이터 뽑아오기
    // }
    console.log(yearData);

    return yearData;
}



// 월간 발전량 그래프
function setChatMonthEneration(thisYearMonthData, previousYearMonthData, maxValue, stepSize, label) {
    let config = {
            type: 'line',
            data: {
                labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"], 
                datasets: [
                {
                    label: `${label[0]}월 발전량`,
                    fill : true,   
                    // backgroundColor: "rgba(181, 15, 92, 0.3)", 
                    borderColor: 'rgba(181, 15, 92, 1)',
                    data: thisYearMonthData
                },
                {
                    label: `${label[1]}월 발전량`,
                    fill : true,   
                    // backgroundColor: "rgba(40, 144, 90, 0.3)", 
                    borderColor: 'rgba(40, 144, 90, 1)',  
                    data: previousYearMonthData
                }
            ]
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
                    borderWidth : 2, // 라인 넓이
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
                        ticks :{
                            stepSize : stepSize,
                            color :  "#fff",
                            font:{
                                size : 10
                            },
                            padding : 3,
                        },
                        grid: {
                            color : "rgba(132, 133, 142, 0.3)", 
                            drawTicks : false,                     
                        } 
                    },
                    x:{
                        display : true,
                        ticks :{
                            color :  "#fff",
                            font:{
                                size : 12
                            },
                            padding : 7,
                        },
                        grid: {
                            color : "rgba(132, 133, 142, 0.3)",
                            //color : "red",
                            drawTicks : false // 데이터 라벨이랑 그래프 라인이랑 연결되는 선 을 나태낼건지 말건지 
                        }, 
                    }                  
                }
		    }
        };
  	return config;
};

let titleChart02 = null;
// 월간 실시간 발전량 그래프
function setMonthEnerationData(rstData, thisTime, previousTime){
    // console.log(rstData);

    let days = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    let maxValue = 0;
    let stepSize = 0;
    let thisYearMonthData = [];
    let previousYearMonthData = [];
    let label = [thisTime, previousTime];

    // let thisMonth = (String(thisTime)).substring(5);
    // let previousMonth = (String(previousTime)).substring(5);

    if(rstData == "undefined"){
        $("#graph1 > .contentBoxTit").html(`월간 발전량 그래프<span>현재 발전량은 없습니다</span>`);
	}else{
        $("#graph2 > .contentBoxTit").html(`
            월간 발전량 그래프 [일] <span>${thisTime}월 발전량 [KWh]</span>
            <span style="color: rgba(181, 15, 92, 1);">━━ </span>
            <span>${previousTime}월 발전량 [KWh] </span>
            <span style="color: rgba(40, 144, 90, 1);">━━ </span>
        `);
        // 이번달
        let thisYearMonth = rstData.result1;
        // 지난달
        let previousYearMonth = rstData.result2;

        if(thisYearMonth.length > 0) {
            thisYearMonthData = powDaysDataFn(thisYearMonth, days);
        }
        if(previousYearMonth.length > 0) {
            previousYearMonthData = powDaysDataFn(previousYearMonth, days);
        }

        [maxValue, stepSize] =  maxValueStepSize(thisYearMonthData, previousYearMonthData);

    }

    let ctx = $("#contentBoxCanvasMonth > #line_monthGraph");
    if (titleChart02 == null) {
        titleChart02 = new Chart(ctx , setChatMonthEneration(thisYearMonthData, previousYearMonthData, maxValue, stepSize , label));
    } 
    // else {
    //     titleChart02.data.datasets[0][0].data = thisYearMonthData;  
    //     titleChart02.data.datasets[0][1].data = previousYearMonthData;  
    //     titleChart02.options.scales.y.max = maxValue;
    //     titleChart02.options.scales.y.max.ticks.stepSize = stepSize;
    //     titleChart02.update(); 
    // }
}

// 월(일) 간데이터 처리
function powDaysDataFn(rstData, days) {
    let daysData;
    let pow_gen;
	let pow_days;
    let Alldays = days;

    pow_gen = rstData.map(function(v){
        return v.DYield;
    });
    pow_days = rstData.map(function(v){
        return v.days;
    });

    let dNum = new Array(Alldays.length); 
    dNum.fill(0);
    for (let i = 0; i < pow_days.length; i++) {
        for (let j = 0; j < Alldays.length; j++) {
            if(pow_days[i] == Alldays[j]){ 
                dNum[j] = pow_gen[i]; 
            } 
        }
    }

    daysData  = new Array(Alldays.indexOf(pow_days[pow_days.length -1]) +1);
    for (let i = 0; i < daysData.length; i++) {
        daysData[i] = (dNum[i]);
    }

    return daysData;
}

// 주간 발전량 그래프
function setChatWeekEneration(thisWeekData, previousWeekData, maxValue, stepSize) {
    let config = {
            type: 'line',
            data: {
                labels: [ "일","월", "화", "수", "목", "금", "토" ], 
                datasets: [
                {
                    label: '이번주 발전량',
                    fill : true,   
                    // backgroundColor: "rgba(181, 15, 92, 0.3)", 
                    borderColor: 'rgba(181, 15, 92, 1)',
                    data: thisWeekData
                },
                {
                    label: '지난주 발전량',
                    fill : true,   
                    // backgroundColor: "rgba(40, 144, 90, 0.3)", 
                    borderColor: 'rgba(40, 144, 90, 1)',  
                    data: previousWeekData
                }
            ]
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
                    borderWidth : 2, // 라인 넓이
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
                        ticks :{
                            stepSize : stepSize,
                            color :  "#fff",
                            font:{
                                size : 10
                            },
                            padding : 3,
                        },
                        grid: {
                            color : "rgba(132, 133, 142, 0.3)", 
                            drawTicks : false,                     
                        } 
                    },
                    x:{
                        display : true,
                        ticks :{
                            color :  "#fff",
                            font:{
                                size : 12
                            },
                            padding : 7,
                        },
                        grid: {
                            color : "rgba(132, 133, 142, 0.3)",
                            //color : "red",
                            drawTicks : false // 데이터 라벨이랑 그래프 라인이랑 연결되는 선 을 나태낼건지 말건지 
                        }, 
                    }                  
                }
		    }
        };
  	return config;
};

let titleChart03 = null;
// 주간 발전량 그래프
function setWeekEnerationData(rstData, thisWeekP, previousWeekP){

    let days = [ "일","월", "화", "수", "목", "금", "토" ];
    let maxValue = 0;
    let stepSize = 0;
    let thisWeekData = [];
    let previousWeekData = [];
    
    if(rstData == "undefined"){
        $("#graph1 > .contentBoxTit").html(`주간 발전량 그래프<span>현재 발전량은 없습니다</span>`);
	}else{
        $("#graph3 > .contentBoxTit").html(`
            주간 발전량 그래프 [요일]<span>이번주 발전량 [KWh]</span>
            <span style="color: rgba(181, 15, 92, 1);">━━ </span>
            <span>저번주 발전량 [KWh] </span>
            <span style="color: rgba(40, 144, 90, 1);">━━ </span>
        `);

        let thisWeek = rstData.result1;
        let previousWeek = rstData.result2;
        let thisWeekDay = [];
        let previousWeekDay = [];
        for(let i = 0; i < thisWeekP.length; i++){
            if(i != thisWeekP.length -1 ){
                thisWeekDay.push(thisWeekP[i].slice(-2));
            }
            if(i != 0){
                previousWeekDay.unshift(previousWeekP[i].slice(-2));
            }
        }
        if(thisWeek.length > 0) {
            thisWeekData = powWeekDataFn(thisWeek, thisWeekDay);
        }
        if(previousWeek.length > 0) {
            previousWeekData = powWeekDataFn(previousWeek, previousWeekDay);
        }

        [maxValue, stepSize] =  maxValueStepSize(thisWeekData, previousWeekData);
    }
    

    let ctx = $("#contentBoxCanvasWeek > #line_WeekGraph");
    if (titleChart03 == null) {
        titleChart03 = new Chart(ctx , setChatWeekEneration(thisWeekData, previousWeekData, maxValue, stepSize));
    } 
    // else {
    //     titleChart03.data.datasets[0][0].data = thisWeekData;  
    //     titleChart03.data.datasets[0][1].data = previousWeekData;  
    //     titleChart03.options.scales.y.max = maxValue;
    //     titleChart03.options.scales.y.max.ticks.stepSize = stepSize;
    //     titleChart03.update();
    // }   
}

// 주간 데이터 처리
function powWeekDataFn(rstData, week) {
    let pow_gen;
	let pow_week;
    let AllWeek = week;

    pow_gen = rstData.map(function(v){
        return v.DYield;
    });
    pow_week = rstData.map(function(v){
        return v.days;
    });

    let wNum = new Array(AllWeek.length); // 일주일 길이의 배열 생성
    wNum.fill(0); // 초기값 0으로 
    // 데이터가 0인 wNum 배열에 요일(0~6)인덱스와  발전한 날짜의 위치(인덱스)값 비교 => 해당 위치에(인덱스) 발전량 넣기.
    for (let i = 0; i < pow_week.length; i++) {
        for (let j = 0; j < AllWeek.length; j++) {
            if(pow_week[i] == AllWeek[j]){ // 발전한 시간(조회 된 요일) == 해당 시간에 생성된 시간
                wNum[j] = pow_gen[i]; 
            } 
        }
    }

    weekData  = new Array(AllWeek.indexOf(pow_week[pow_week.length -1]) +1);
    for (let i = 0; i < weekData.length; i++) {
        weekData[i] = (wNum[i]);
    }
    return weekData;
}

// 멕스값, 스텝사이즈 설정 함수
function maxValueStepSize(thisData , previousData) {
    let maxValue = 0;
    let stepSize = 0;

    // 맥스값
    for (let i = 0; i < thisData.length; i++) {
        if (maxValue < Number(thisData[i])) {
            maxValue = Number(thisData[i]);
        }
    }
    for (let i = 0; i < previousData.length; i++) {
        if (maxValue < Number(previousData[i])) {
            maxValue = Number(previousData[i]);
        }
    }

    maxValue = Math.floor(maxValue + (maxValue/10));
    let stepSizeNum = `${Math.floor(maxValue/8)}`;
    stepSize = stepSizeNum;

    return [maxValue, stepSize]
}


// 년(월)간 발전량 그래프
function getYearEnerationData(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoringStatistics/statisticsYearEnerationData',
		dataType: 'json',
		type: 'POST',
        data: {
            todayTime : time[3], // 2022-07-26
            todayYear : time[10], // 2022
            lastYear : time[11], // 2021
            twoAgoYear : time[18]
        }
        ,
		success: function(rstData) {
            if (rstData) {
                setYearEnerationData(rstData, time[10], time[11]);
            }
		},
		error : function(data, status, err) {
            setYearEnerationData("0", time[10], time[11]);
		}
	});
}

// 월(일)간 발전량 그래프
function getMonthEnerationData(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoringStatistics/statisticsMonthEnerationData',
		dataType: 'json',
		type: 'POST',
        data: {
            thisYearMonth : time[12], // 2022-07
            previousYearMonth : time[13] // 2022-06
        }
        ,
		success: function(rstData) {
            if (rstData) {
                setMonthEnerationData(rstData, time[14], time[15]);
            }
		},
		error : function(data, status, err) {
            setMonthEnerationData("0",  time[14], time[15]);
		}
	});
}

// 주 간 발전량 그래프
function getWeekEnerationData(){
    let time = currentTime();
  	$.ajax({
		url: '/monitoringStatistics/statisticsWeekEnerationData',
		dataType: 'json',
		type: 'POST',
        data: {
            thisWeek : time[16], // 이번주
            previousWeek : time[17] // 저번주
        }
        ,
		success: function(rstData) {
            if (rstData) {
                setWeekEnerationData(rstData, time[16],time[17]);
            }
		},
		error : function(data, status, err) {
            setWeekEnerationData("0", time[16],time[17]);
		}
	});
}


(function () {
    // 년간
    getYearEnerationData();
    // 월간
    getMonthEnerationData();
    // 주간
    getWeekEnerationData();

//     let timerId1 = setTimeout(function tick() {

//         getweather();

//         timerId1 = setTimeout(tick, 120000);

})()
