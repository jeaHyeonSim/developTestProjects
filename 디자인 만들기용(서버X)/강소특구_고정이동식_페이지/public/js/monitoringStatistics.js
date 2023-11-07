$( document ).ready(function() {
			
    function dailyGraphConfig(dailyData) {
        let config = {
                type: 'line',
                data: {
                    labels: ["05시","06시", "07시", "08시", "09시", "10시", "11시", "12시", "13시", "14시", "15시", "16시", "17시", "18시", "19시", "20시"], 
                    datasets: [{
                        label: '일간 발전량',
                        fill : true,   
                        backgroundColor: "#e0d6c82b", 
                        borderColor: 'yellow',  
                        data: dailyData,
                        },
                    ]
                },
                options: {
                    responsive : false,
                    plugins : {
                        legend :{
                            display : true,
                            labels: {
                                color: '#fff'
                            },
                        },
                    },
                    elements: {
                        line: {
                        borderWidth : 2, 				// 라인 넓이
                        borderCapStyle : 'round', 		// 라인 끝 스타일
                        tension : 0.4 					// 곡선
                        },
                    },
                    animation : {
                        duration : 0
                    },
                    animation:false,
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
                            max : 150,
                            ticks :{
                                stepSize : 20,
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
                        }                  
                    }
                }
            };
        return config;
    };
    
    function weeklyGraphConfig(labels, weeklyData) {
        let config = {
                type: 'line',
                data: {
                    labels: labels, 
                    datasets: [{
                        label: '발전량',
                        fill : true,   
                        backgroundColor: "rgba(254, 216, 167, 0.1)", 
                        borderColor: 'rgba(254, 216, 167, 1)', 
                        data: weeklyData
                        }
                    ],
                },
                options: {
                    responsive : false,
                    plugins : {
                        legend :{
                            labels: {
                                display : true,
                                color: '#fff'
                            },
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
                            max : 600,
                            ticks :{
                                stepSize : 100,
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
                        }                  
                    }
                }
            };
        return config;
    };
        
    function monthlyGraphConfig(monthlyData) {
        let config = {
                type: 'bar',
                data: {
                    labels: ["1일","2일","3일","4일","5일","6일","7일","8일","9일","10일","11일","12일","13일",
                            "14일","15일","16일","17일","18일","19일","20일","21일","22일","23일","24일","25일","26일","27일","28일","29일","30일","31일"], 
                    datasets: [{
                        label: '발전량',
                        fill : true,   
                        backgroundColor: "rgba(254, 215, 245, 0.3)", 
                        borderColor: 'rgba(254, 215, 245, 1)',  
                        data: monthlyData
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
                            max : 1200,
                            ticks :{
                                stepSize : 100,
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
                        }                  
                    }
                }
            };
        return config;
    };

    // 그래프 생성
    let dailyChart = function (dailyData){ 
        return new Chart($("#daily-graph"), dailyGraphConfig(dailyData));
    }();
    
    let weeklyChart = function (labels, weeklyData){
        return new Chart($("#weekly-graph"), weeklyGraphConfig(labels, weeklyData));
    }();

    let monthlyChart = function (monthlyData){ 
        return new Chart($("#monthly-graph") , monthlyGraphConfig(monthlyData));
    }();

    // 발전량 테이블 생성
    function insertDailyTableContent(data) {
        var data01 = data.slice(0,8);
        var data02 = data.slice(8);
        var max = 0;
        var min = 0;

        for (let index = 0; index < data01.length; index++) {
            if(max < parseFloat(data01[index])) max = data01[index];
            if(min > parseFloat(data01[index])) min = data01[index];
        }
        for (let index = 0; index < data02.length; index++) {
            if(max < parseFloat(data02[index])) max = data02[index];
            if(min > parseFloat(data02[index])) min = data02[index];
        }

        for (let index = 0; index < data01.length; index++) {
            if( max == data01[index]) {
                $("#dailyTableData01 td").eq(index).html("<span class='max'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data01[index]) {
                $("#dailyTableData01 td").eq(index).html("<span class='min'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            } 
            $("#dailyTableData01 td").eq(index).text(data01[index]);
        }
        for (let index = 0; index < data02.length; index++) {
            if( max == data02[index]) {
                $("#dailyTableData02 td").eq(index).html("<span class='max'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data02[index]) {
                $("#dailyTableData02 td").eq(index).html("<span class='min'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            $("#dailyTableData02 td").eq(index).text(data02[index]);
        }
    
        var sum = data.reduce(function add(sum, curVal){
            return parseFloat((sum) + parseFloat(curVal));
        });
        $("#dailyTableSum").text((sum.toFixed(1)).toLocaleString('ko-KR'));
    }

    // 주간 발전량 테이블 생성
    function comma(arr){
        let arrData = parseFloat(arr).toFixed(1);
        let front = String(arrData).split(".")[0];
        let back = String(arrData).split(".")[1];
        let reAll = front.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let str = [reAll ,back ].join(".");
        return str;			
    }
    function insertWeeklyTableContent(data , label) {
        let labelsName = [`(일)`,`(월)`,`(화)`,`(수)`,`(목)`,`(금)`,`(토)`];
        let sum;
        if(data.length > 0){
            let maxValue  = Math.max(...data);
            let minValue = Math.min(...data); 
            
            for (let index = 0; index < data.length; index++) {
                if(maxValue == data[index]){
                    $("#weeklyTableData td").eq(index).css({'color': 'rgb(255, 51, 0)'});
                    $("#weeklyTableData td").eq(index).text(comma(data[index]));
                }else if(minValue == data[index]){
                    $("#weeklyTableData td").eq(index).css({'color': 'rgb(61, 100, 228)'});
                    $("#weeklyTableData td").eq(index).text(comma(data[index]));
                }else { 
                    $("#weeklyTableData td").eq(index).css({'color': '#fff'});
                    $("#weeklyTableData td").eq(index).text(comma(data[index]));
                }
            }
            sum = data.reduce(function add(sum, curVal){
                return (parseFloat(sum) + parseFloat(curVal));
            });
            sum = comma(sum);
        }else {
            sum = 0;
            for (let index = 0; index < 7; index++) {
                $("#weeklyTableData td").eq(index).text("");
            }
        }

        $("#weeklyTableSum").text(sum);
        $('.weekly-table tbody tr').eq(0).html(label);
    }
        // 월간 발전량 데이블 생성

    function insertMonthlyTableContent(data) {
        var data01 = data.slice(0,11);
        var data02 = data.slice(11,22);
        var data03 = data.slice(22);
        var max = 0;
        var min = 0;

        for (let index = 0; index < data01.length; index++) {
            if(max < parseFloat(data01[index])) max = data01[index];
            if(min > parseFloat(data01[index])) min = data01[index];
        }
        for (let index = 0; index < data02.length; index++) {
            if(max < parseFloat(data02[index])) max = data02[index];
            if(min > parseFloat(data02[index])) min = data02[index];
        }
        for (let index = 0; index < data03.length; index++) {
            if(max < parseFloat(data03[index])) max = data03[index];
            if(min > parseFloat(data03[index])) min = data03[index];
        }

        for (let index = 0; index < data01.length; index++) {
            if( max == data01[index]) {
                $("#monthlyTableData01 td").eq(index).html("<span class='max'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data01[index]) {
                $("#monthlyTableData01 td").eq(index).html("<span class='min'>"+(data01[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            } 
            $("#monthlyTableData01 td").eq(index).text(data01[index]);
        }

        for (let index = 0; index < data02.length; index++) {
            if( max == data02[index]) {
                $("#monthlyTableData02 td").eq(index).html("<span class='max'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data02[index]) {
                $("#monthlyTableData02 td").eq(index).html("<span class='min'>"+(data02[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            $("#monthlyTableData02 td").eq(index).text(data02[index]);
        }


        for (let index = 0; index < data03.length; index++) {
            if( max == data03[index]) {
                $("#monthlyTableData03 td").eq(index).html("<span class='max'>"+(data03[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            if( min == data03[index]) {
                $("#monthlyTableData03 td").eq(index).html("<span class='min'>"+(data03[index]).toLocaleString('ko-KR')+"</span>");
                continue;
            }
            $("#monthlyTableData03 td").eq(index).text(data03[index]);
        }

        var sum = data.reduce(function add(sum, curVal){
            return parseFloat((sum) + parseFloat(curVal));
        });
        $("#monthlySum").text((sum).toLocaleString('ko-KR'));
    }

    function getToday() {
        let today = new Date(); 
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() +1)).slice(-2);
        let date = ('0' + today.getDate()).slice(-2);
        return todayAll = year+"-"+month+"-"+date;
    }

    function getDailyData() {

        $.ajax({
                url: '/monitoringStatistics/dailyinfo',
                dataType: 'json',
                type: 'get',
                data: {
                    inverterInfo: $("#inverter").val(),
                    date: $("#daily-date").val(),
                    powerPlant : $("#powerPlant_sel").val()}, 
                success: function(datalist) {

                    // 초기화
                    $("#dailyTableData01 td").empty();
                    $("#dailyTableData02 td").empty();
                    dailyChart.data.datasets = [];  
                    dailyChart.update();
                    if(datalist =="") return;

                    // 전체
                    if($("#inverter").val() =="all") {
                        var colorList = ["yellow","#f1c12f","lightblue"];
                        
                        // 발전량 합계
                        // 5시부터 ~ 20시 까지 초기화.
                        var dailyDataSum =[];
                        for (let index = 0; index < 16; index++) {
                            dailyDataSum.push(0);
                        }
                        var datasetItemList = [];
                        for (let index = 0; index < datalist.length; index++) {

                            // 5시부터 ~ 20시 까지 초기화.
                            var dailyData = [];
                            for (let index = 0; index < 16; index++) {
                                dailyData.push(0);
                            }

                            // 인버터 개수
                            const map = datalist[index];    // 인버터 발전량 전체 데이터
                            var key= Object.keys(map)[0];   // 발전 시간
                            var data = map[key];            // 발전 데이터
                            var lastTime = 0;

                            for (let index = 5; index < 21; index++) {
                                data.forEach((element, index2, array) => {

                                    // 5시부터(4시 최고값이 5시 값임)
                                    if((index-1) == parseInt(element.time) && parseInt(element.time) + 1  <= 20) {
                                        //05시 첫번째 시작인덱스(값을 빼지 않아도 됨)
                                        if(index2 == 0) {
                                                dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                                dailyDataSum[(parseInt(element.time)+1)-5] = +(dailyDataSum[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                        } else {
                                                dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                                dailyDataSum[(parseInt(element.time)+1)-5] = +(dailyDataSum[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                        }
                                        lastTime = parseInt(element.time);
                                    }
                                });
                            }
                            dailyData = dailyData.slice(0, lastTime-3);
                            dailyDataSum = dailyDataSum.slice(0, lastTime-3);
                            datasetItemList.push({
                                                label: $('#inverter option[value='+ key +']').text(),
                                                fill : true,   
                                                backgroundColor: "#e0d6c82b", 
                                                borderColor: colorList[index],  
                                                data: dailyData,
                                            });
                            }

                            dailyChart.options.scales.y.stacked = true;
                            dailyChart.data.datasets = datasetItemList;  
                            dailyChart.update();

                            insertDailyTableContent(dailyDataSum);
                    // 개별
                    } else {
                        var data = datalist;
                        let dailyData = [];
                        var lastTime = 0;
                        for (let index = 0; index < 16; index++) {
                            dailyData.push(0);
                        }

                        for (let index = 5; index < 21; index++) {
                            data.forEach((element, index2, array) => {
                                    if((index-1) == parseInt(element.time) && parseInt(element.time) + 1  <= 20) {
                                        //05시 첫번째 시작인덱스(값을 빼지 않아도 됨)
                                        if(index2 == 0) {
                                            dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +element.DYield.toFixed(1)).toFixed(1);
                                        } else {
                                            dailyData[(parseInt(element.time)+1)-5] = +(dailyData[(parseInt(element.time)+1)-5] + +(element.DYield - array[index2-1].DYield).toFixed(1)).toFixed(1);
                                        }
                                    }
                                    lastTime = parseInt(element.time);
                                });
                        }
                        dailyData = dailyData.slice(0, lastTime-3);
                        var datasetItem = [{
                            label: $('#inverter option[value='+ $("#inverter").val() +']').text(),
                            fill : true,   
                            backgroundColor: "#e0d6c82b", 
                            borderColor: 'yellow',  
                            data: dailyData
                        }];
                        dailyChart.data.datasets = datasetItem;
                        dailyChart.update();

                        insertDailyTableContent(dailyData);
                    }
                }, 
                error : function(data, status, err) {}
            });
        }

    function getWeeklyData() {
        $.ajax({
                url: '/monitoringStatistics/weeklyinfo',
                dataType: 'json',
                type: 'GET',
                data: {
                    inverterInfo: $(inverter).val(),
                    date: $("#weekly-date").val()}, 
                success: function(data) {	
                    let labelsName = [`(일)`,`(월)`,`(화)`,`(수)`,`(목)`,`(금)`,`(토)`];
                    let startDate = $("#weekly-date").val().split('~')[0].split(" ")[0];
                    let startDay = $("#weekly-date").val().split('~')[0].split(" ")[0].slice(-2);
                    let inverterInfo = $(inverter).val();
                    let thisWeekDay = [];
                    let labels = [];
                    let weeklyData = [];
                    let weeklyTableLabels = "";
                    
                    // 일주일 날짜+요일 만들기 위함
                    let mon = new Date(startDate);
                    mon.setDate(mon.getDate());
                    let days =[];
                    for(let i = 0 ; i < 8; i ++) {
                        if(i == 7){weeklyTableLabels += `<td>합계</td>`; break}
                        let sun = new Date(mon.getTime());
                        sun.setDate(sun.getDate() + i);
                        days.push(moment(sun).format('DD'));

                        let dd = ('0' + moment(sun).format('DD')).slice(-2);
                        let str = [dd ,labelsName[i]].join("");
                        labels.push(str);
                        thisWeekDay.push(dd);
                        weeklyTableLabels += `<td>${str}</td>`;
                    }
                    
                    $("#weeklyTableData td").empty();
                    weeklyChart.data.datasets = [];  
                    weeklyChart.update();
                    insertWeeklyTableContent(weeklyData, weeklyTableLabels);
                    if(data == "" || data.length <= 0 ) return;

                    // 전체
                    if(inverterInfo == 'all'){
                        var colorList = ["#FED8A7","#C9EFF9","#07A4B5"];
                        let datasetItemList = [];

                        let powGen = data.map((v) => { return v.DYield; });
                        let powDay = data.map((v) => { return v.day; });
                        let powSn = data.map((v) => { return v.SN; });
                        let powSeq = data.map((v) => { return v.snSeq; });

                        // 중복 날짜 제거
                        let powDayLen = new Set(powDay); 
                        let powDayArr = [...powDayLen]; // 일요일 ~ 현재 요일까지의 날짜 배열 (중복 제거 후)

                        let wNum = new Array(thisWeekDay.length); 
                        wNum.fill(0); 
                        for (let i = 0; i < thisWeekDay.length; i++) {
                            let dayDataSum01 = 0;
                            for (let j = 0; j < powDay.length; j++) {
                                if(String(thisWeekDay[i]) == String(powDay[j])){ 
                                    dayDataSum01 += Number(powGen[j]);
                                    wNum[j] = dayDataSum01.toFixed(1); 
                                } 
                            }
                        }

                        // 각 요일별 합계 리스트
                        let dayDataSum = [];
                        for (let i = 0; i < powDayArr.length; i++) { // 일요일 ~ 현재 요일까지의 길이
                            let dayDataSum01 = 0;
                            for (let j = 0; j < powDay.length; j++) {
                                if(String(powDayArr[i]) == String(powDay[j])) {
                                    dayDataSum01 += Number(powGen[j]);
                                    dayDataSum[i] = dayDataSum01.toFixed(1);
                                }
                            }
                        }

                        weeklyData  = new Array(thisWeekDay.indexOf(powDayArr[powDayArr.length -1]) +1);
                        for (let i = 0; i < weeklyData.length; i++) {
                            weeklyData[i] = (wNum[i]); 
                        }

                        //인버터 seq 번호 중복제거 => 객체반환 => 다시 배열로 변환하기 
                        let powSeqLen = new Set(powSeq);
                        let uniqueArr = [...powSeqLen];

                        let count = [];
                        for(let i = 0; i < uniqueArr.length; i++){
                            // 특정 값 갯수 구하기
                            count[i] = powSeq.filter(element => `${uniqueArr[i]}` === element).length;
                        } 

                        // 그래프 생성
                        weeklyChart.data.labels = labels;  
                        let sum = 0;
                        for(let i = 0; i < count.length; i++){
                            let powGenSnSlice = powGen.slice(sum, sum + Number(count[i]));
                            sum += Number(count[i]);

                            datasetItemList.push({
                                label: $('#inverter option[value='+ uniqueArr[i] +']').text(),
                                fill : true,   
                                backgroundColor: "#e0d6c82b", 
                                borderColor: colorList[i],  
                                data: powGenSnSlice,
                            });
                        }  

                        // 맥스값
                        let maxValue = 0;
                        for (let i = 0; i < dayDataSum.length; i++) {
                            if (maxValue < Number(dayDataSum[i])) {
                                maxValue = Number(dayDataSum[i]);
                            }
                        }
                        if(maxValue < 600){ maxValue = 600; }
                        else { maxValue = Math.floor(maxValue + (maxValue/10)); }

                        weeklyChart.data.datasets = datasetItemList;
                        weeklyChart.options.scales.y.stacked = true;  
                        weeklyChart.options.scales.y.max = maxValue;
                        weeklyChart.update();
                        insertWeeklyTableContent(dayDataSum, weeklyTableLabels);	

                    }else{ // 인버터 한개
                        let powGen = data.map((v) => { return v.DYield; });
                        let powDay = data.map((v) => { return v.day; });
                        let dNum = new Array(thisWeekDay.length); 
                        dNum.fill(0); 
                        for (let i = 0; i < powDay.length; i++) {
                            for (let j = 0; j < thisWeekDay.length; j++) {
                                if(powDay[i] == thisWeekDay[j]){ 
                                    dNum[j] = powGen[i]; 
                                } 
                            }
                        }
                        weeklyData  = new Array(thisWeekDay.indexOf(powDay[powDay.length -1]) +1);
                        for (let i = 0; i < weeklyData.length; i++) {
                            weeklyData[i] = (dNum[i]); 
                        }
                        var datasetItem = [{
                            label: $('#inverter option[value='+ $("#inverter").val() +']').text(),
                            fill : true,   
                            backgroundColor: "rgba(254, 216, 167, 0.1)", 
                            borderColor: 'rgba(254, 216, 167, 1)', 
                            data: weeklyData
                        }];
                        
                        weeklyChart.data.labels = labels;  
                        weeklyChart.data.datasets = datasetItem;
                        weeklyChart.update();
                        insertWeeklyTableContent(weeklyData, weeklyTableLabels);	
                    }				
                }, 
                error : function(data, status, err) {
                    getWeeklyData();
                }
        });
    }

    function getMonthlyData() {
        $.ajax({
                url: '/monitoringStatistics/monthlyinfo',
                dataType: 'json',
                type: 'get',
                data: {
                    inverterInfo: $("#inverter").val(),
                    date: $("#monthly-date").val(),
                    powerPlant : $("#powerPlant_sel").val()}, 
                success: function(data) {	

                    // 초기화
                    $("#monthlyTableData01 td").empty();
                    $("#monthlyTableData02 td").empty();
                    $("#monthlyTableData03 td").empty();
                    monthlyChart.data.datasets = [];  
                    monthlyChart.update();
                    if(data =="") return;

                    if($("#inverter").val() =="all") {
                        var colorList = ["yellow","#f1c12f","lightblue"];
                        var datasetItemList = [];
                        // 발전량 합계
                        var dataSum = [];
                        for (let index = 1; index < 32; index++) {
                            dataSum.push(0);
                        }

                        // 인버터 개수대로 순환
                        for (let inverterIndex = 0; inverterIndex < data.length; inverterIndex++) {
                            console.log(data[inverterIndex]);
                            // 개별 데이터
                            var dataList = [];
                            for (let index = 1; index < 32; index++) {
                                dataList.push(0);
                            }

                            for (let index = 1; index < 32; index++) {
                                    var hasData =false;
                                    var key = Object.keys(data[inverterIndex])[0];
                                
                                    data[inverterIndex][key].forEach((element, index2, array) => {
                                        if(index == parseInt(element.time)) {
                                            dataList[index-1] = parseFloat(element.DYield).toFixed(1);
                                            dataSum[index-1] = +(dataSum[index-1] + +(element.DYield).toFixed(1)).toFixed(1);
                                            hasData = true;
                                        }
                                    });

                                    if(!hasData) {
                                        dataList[index] = "0";
                                    }
                            }
                            datasetItemList.push({
                                                label: $('#inverter option[value='+ key +']').text(),
                                                fill : true,   
                                                backgroundColor: colorList[inverterIndex], 
                                                borderColor: "",  
                                                data: dataList,
                            });

                            var lastMonth = data[inverterIndex][Object.keys(data[inverterIndex])];
                            dataSum = dataSum.slice(0, parseInt(lastMonth[lastMonth.length-1].time));
                        }

                        monthlyChart.options.scales.x.stacked = true; 
                        monthlyChart.options.scales.y.stacked = true; 
                        monthlyChart.data.datasets = datasetItemList;  
                        monthlyChart.update();
                        
                        insertMonthlyTableContent(dataSum);
                    } else {
                            var dataList = [];
                            for (let index = 1; index < 32; index++) {
                                dataList.push(0);
                            }
                            
                            for (let index = 1; index < 32; index++) {
                                var hasData =false;
                                data.forEach(element => {
                                    if(index == parseInt(element.time)) {
                                        dataList[index-1] = parseFloat(element.DYield).toFixed(1);
                                        hasData = true;
                                    }
                                });

                                if(!hasData) {
                                    dataList[index] = "0";
                                }
                            }
                            dataList = dataList.slice(0, parseInt(data[data.length-1].time));
                            
                            var datasetItem = [{
                                label: $('#inverter option[value='+ $("#inverter").val() +']').text(),
                                fill : true,   
                                backgroundColor: "#e9bb30", 
                                borderColor: 'yellow',  
                                data: dataList
                            }];

                            monthlyChart.data.datasets = datasetItem;
                            monthlyChart.update();

                            insertMonthlyTableContent(dataList);
                    }

            },
                error : function(data, status, err) {
                }
            });
    }

    function getInverterInfo() {
        return new Promise(function (resolve, reject){
            $.ajax({
                url: '/monitoringStatistics/inverterinfo',
                dataType: 'json',
                type: 'get',
                data: { powerPlant : $("#powerPlant_sel").val()},
                success: function(data) {
                    var tag = "";
                    data.forEach((element,index) => {
                        tag += `<option value='${element.inverterSeq}'>${element.inverterName}</option>`;
                    });
                    $("#inverter").append(tag);
                    $("#inverter option:eq(1)").attr("selected", "selected");
                    resolve(data);
                },
                error : function(data, status, err) {
                    reject();
                }
            });
        });
    }
    
    // ----------- init ----------- 
    $(".weekly-table,.monthly-table").parent().hide();
    $(".weekly-select,.monthly-select").hide();
    $("#daily-graph + p").hide();
    $("#weekly-graph + p").hide();
    $("#monthly-graph + p").hide();

    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        // duration: 100,
        // showAnim: 'show',
        showMonthAfterYear: true,
        yearSuffix: '년'
    };
      $.datepicker.setDefaults($.datepicker.regional['ko']);

    $("#daily-date").datepicker({
        firstDay: 1,
        nextText: "다음",
        prevText: "이전",
        dateFormat: "yy-mm-dd",
        maxDate: "d",
    });     

    $("#weekly-date").datepicker({
        firstDay: 0,
        nextText: "다음",
        prevText: "이전",
        dateFormat: "yy-mm-dd",
        maxDate: "d",
        onSelect: function() {
            var mon = $(this).datepicker('getDate');
            mon.setDate(mon.getDate()  - (mon.getDay() || 7));
            var sun = new Date(mon.getTime());
            sun.setDate(sun.getDate() + 6);
            $("#weekly-date").val(moment(mon).format('YYYY-MM-DD') + ' ~ ' + moment(sun).format('YYYY-MM-DD'));
            $( "#changeSearchBound" ).trigger("change");
        },beforeShow : function() {}
    });     
    
    // monthpicker and year selector start/end year (10 year ago)
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear - 10;

    var options = {
        startYear: startYear,
        finalYear: currentYear,
        pattern: 'yyyy-mm',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    };
    $('#monthly-date').monthpicker(options);


    // initdate
    //일간 데이트 피커 세팅
    $("#daily-date").val(getToday());
    $("#weekly-date").val(getToday());
    var toDay = new Date();
    toDay.setDate(toDay.getDate()  - (toDay.getDay() || 7));
    var sun = new Date(toDay.getTime());
    sun.setDate(sun.getDate() + 6);
    $("#weekly-date").val(moment(toDay).format('YYYY-MM-DD') + ' ~ ' + moment(sun).format('YYYY-MM-DD'));
    $("#monthly-date").val(moment().format('YYYY-MM'));
    $(".monthtext").text($("#monthly-date").val().slice(-2));
    
    var dailytext = $("#daily-date").val().split("-");
    $(".dailytext").text(dailytext[0]+"년 "+dailytext[1]+"월 "+dailytext[2]+"일 ");

    // ----------- event ----------- 
    // 주간 데이터 피커 색상 설정
    $("#weekly-date").on("click", function(){
        setTimeout(() => {
            $(".ui-datepicker-calendar tr").addClass("tr-background");
        }, 200);
    });

    $( "#changeSearchBound" ).on( "change", function(event) {
        $(".daily-table,.weekly-table,.monthly-table").parent().hide();
        $(".daily-date,.weekly-date,.monthly-date").hide();
        $("."+$(this).val()+"-table").parent().show();
        $("."+$(this).val()+"-date").show();
        
        switch($(this).val()) {
            case 'daily': getDailyData(); break;
            case 'weekly': getWeeklyData(); break;
            case 'monthly': getMonthlyData(); break;
            default: break;
        }
    });

    setTimeout(() => {
        getInverterInfo().then(function(data){
            $( "#changeSearchBound" ).trigger("change");
        });
    }, 200);

    $("#inverter, #daily-date, #monthly-date").on("change",function(){
        $( "#changeSearchBound" ).trigger("change");
    });

    // 인버터 선택할 경우에 발생
    $("#inverter").on("change",function(){
        $( "#changeSearchBound" ).trigger("change");
    });

    $("#monthly-date").on("change",function(){
        $(".monthtext").text($(this).val().slice(-2));
    });
    $("#daily-date").on("change",function(){
        var dailytext = $("#daily-date").val().split("-");
        $(".dailytext").text(dailytext[0]+"년 "+dailytext[1]+"월 "+dailytext[2]+"일 ");
    });

});


//===============================================================================================================
// date picer 월
    (function($) {
        var methods = {
        init: function(options) {
            return this.each(function() {
            var
                $this = $(this),
                data = $this.data('monthpicker'),
                year = (options && options.year) ? options.year : (new Date()).getFullYear(),
                settings = $.extend({
                pattern: 'mm/yyyy',
                selectedMonth: null,
                selectedMonthName: '',
                selectedYear: year,
                startYear: year - 10,
                finalYear: year + 10,
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                id: "monthpicker_" + (Math.random() * Math.random()).toString().replace('.', ''),
                openOnFocus: true,
                disabledMonths: []
                }, options);

            settings.dateSeparator = settings.pattern.replace(/(mmm|mm|m|yyyy|yy|y)/ig, '');

            // If the plugin hasn't been initialized yet for this element
            if (!data) {

                $(this).data('monthpicker', {
                'target': $this,
                'settings': settings
                });

                if (settings.openOnFocus === true) {
                $this.on('focus', function() {
                    $this.monthpicker('show');
                });
                }

                $this.monthpicker('parseInputValue', settings);

                $this.monthpicker('mountWidget', settings);

                $this.on('monthpicker-click-month', function(e, month, year) {
                $this.monthpicker('setValue', settings);
                $this.monthpicker('hide');
                });

                // hide widget when user clicks elsewhere on page
                $this.addClass("mtz-monthpicker-widgetcontainer");
                $(document).unbind("mousedown.mtzmonthpicker").on("mousedown.mtzmonthpicker", function(e) {
                if (!e.target.className || e.target.className.toString().indexOf('mtz-monthpicker') < 0) {
                    $(this).monthpicker('hideAll');
                }
                });
            }
            });
        },

        show: function() {
            $(this).monthpicker('hideAll');
            var widget = $('#' + this.data('monthpicker').settings.id);
            widget.css("top", this.offset().top + this.outerHeight());
            if ($(window).width() > (widget.width() + this.offset().left)) {
            widget.css("left", this.offset().left);
            } else {
            widget.css("left", this.offset().left - widget.width());
            }
            widget.show();
            widget.find('select').focus();
            this.trigger('monthpicker-show');
        },

        hide: function() {
            var widget = $('#' + this.data('monthpicker').settings.id);
            if (widget.is(':visible')) {
            widget.hide();
            this.trigger('monthpicker-hide');
            }
        },

        hideAll: function() {
            $(".mtz-monthpicker-widgetcontainer").each(function() {
            if (typeof($(this).data("monthpicker")) != "undefined") {
                $(this).monthpicker('hide');
            }
            });
        },

        setValue: function(settings) {
            var
            month = settings.selectedMonth,
            year = settings.selectedYear;

            if (settings.pattern.indexOf('mmm') >= 0) {
            month = settings.selectedMonthName;
            } else if (settings.pattern.indexOf('mm') >= 0 && settings.selectedMonth < 10) {
            month = '0' + settings.selectedMonth;
            }

            if (settings.pattern.indexOf('yyyy') < 0) {
            year = year.toString().substr(2, 2);
            }

            if (settings.pattern.indexOf('y') > settings.pattern.indexOf(settings.dateSeparator)) {
            this.val(month + settings.dateSeparator + year);
            } else {
            this.val(year + settings.dateSeparator + month);
            }

            this.change();
        },

        disableMonths: function(months) {
            var
            settings = this.data('monthpicker').settings,
            container = $('#' + settings.id);

            settings.disabledMonths = months;

            container.find('.mtz-monthpicker-month').each(function() {
            var m = parseInt($(this).data('month'));
            if ($.inArray(m, months) >= 0) {
                $(this).addClass('ui-state-disabled');
            } else {
                $(this).removeClass('ui-state-disabled');
            }
            });
        },

        mountWidget: function(settings) {
            var
            monthpicker = this,
            container = $('<div id="' + settings.id + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" />'),
            header = $('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all mtz-monthpicker" />'),
            combo = $('<select class="mtz-monthpicker mtz-monthpicker-year" />'),
            table = $('<table class="mtz-monthpicker" />'),
            tbody = $('<tbody class="mtz-monthpicker" />'),
            tr = $('<tr class="mtz-monthpicker" />'),
            td = '',
            selectedYear = settings.selectedYear,
            option = null,
            attrSelectedYear = $(this).data('selected-year'),
            attrStartYear = $(this).data('start-year'),
            attrFinalYear = $(this).data('final-year');

            if (attrSelectedYear) {
            settings.selectedYear = attrSelectedYear;
            }

            if (attrStartYear) {
            settings.startYear = attrStartYear;
            }

            if (attrFinalYear) {
            settings.finalYear = attrFinalYear;
            }

            container.css({
            position: 'absolute',
            zIndex: 999999,
            whiteSpace: 'nowrap',
            width: '250px',
            overflow: 'hidden',
            textAlign: 'center',
            display: 'none',
            top: monthpicker.offset().top + monthpicker.outerHeight(),
            left: monthpicker.offset().left
            });

            combo.on('change', function() {
            var months = $(this).parent().parent().find('td[data-month]');
            months.removeClass('ui-state-active');
            if ($(this).val() == settings.selectedYear) {
                months.filter('td[data-month=' + settings.selectedMonth + ']').addClass('ui-state-active');
            }
            monthpicker.trigger('monthpicker-change-year', $(this).val());
            });

            // mount years combo
            for (var i = settings.startYear; i <= settings.finalYear; i++) {
            var option = $('<option class="mtz-monthpicker" />').attr('value', i).append(i+"년");
            if (settings.selectedYear == i) {
                option.attr('selected', 'selected');
            }
            combo.append(option);
            }
            header.append(combo).appendTo(container);

            // mount months table
            for (var i = 1; i <= 12; i++) {
            td = $('<td class="ui-state-default mtz-monthpicker mtz-monthpicker-month" style="padding:5px;cursor:default;" />').attr('data-month', i);
            if (settings.selectedMonth == i) {
                td.addClass('ui-state-active');
            }
            td.append(settings.monthNames[i - 1]);
            tr.append(td).appendTo(tbody);
            if (i % 3 === 0) {
                tr = $('<tr class="mtz-monthpicker" />');
            }
            }

            tbody.find('.mtz-monthpicker-month').on('click', function() {
            var m = parseInt($(this).data('month'));
            if ($.inArray(m, settings.disabledMonths) < 0) {
                settings.selectedYear = $(this).closest('.ui-datepicker').find('.mtz-monthpicker-year').first().val();
                settings.selectedMonth = $(this).data('month');
                settings.selectedMonthName = $(this).text();
                monthpicker.trigger('monthpicker-click-month', $(this).data('month'));
                $(this).closest('table').find('.ui-state-active').removeClass('ui-state-active');
                $(this).addClass('ui-state-active');
            }
            });

            table.append(tbody).appendTo(container);
            container.appendTo('body');
        },

        destroy: function() {
            return this.each(function() {
            $(this).removeClass('mtz-monthpicker-widgetcontainer').unbind('focus').removeData('monthpicker');
            });
        },

        getDate: function() {
            var settings = this.data('monthpicker').settings;
            if (settings.selectedMonth && settings.selectedYear) {
            return new Date(settings.selectedYear, settings.selectedMonth - 1);
            } else {
            return null;
            }
        },

        parseInputValue: function(settings) {
            if (this.val()) {
                if (settings.dateSeparator) {
                    var val = this.val().toString().split(settings.dateSeparator);
                    if (settings.pattern.indexOf('m') === 0) {
                    settings.selectedMonth = val[0];
                    settings.selectedYear = val[1];
                    } else {
                    settings.selectedMonth = val[1];
                    settings.selectedYear = val[0];
                    }
                }
            }
        }
        };

        $.fn.monthpicker = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mtz.monthpicker');
        }
        };
    })(jQuery);