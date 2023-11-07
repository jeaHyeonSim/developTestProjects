$(document).ready(function(){

    /**
     * 시간별 발전량 그래프 옵션
     * @param {Arr} hourData 
     * @returns config
     */
    function setChatTimeGraphConfig(hourData) {
        let config = {
                type: 'bar',
                data: {
                    labels: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], 
                    datasets: [{
                        label: '발전량',
                        fill : true,   
                        backgroundColor: "rgba(204, 188, 83, 0.3)", 
                        borderColor: 'rgba(204, 188, 83, 1)',  
                        data: hourData
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
                                color : "#000"
                            },
                            display : true,
                            min : 0,
                            max : 1200,
                            ticks :{
                                stepSize : 100,
                                color :  "#000",
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
                                color :  "#000",
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
    
    /**
     * 그래프 생성
     */
    let realTimeSolarpowerGeneration = function (timeData){ 
        return new Chart($("#line_timeGraph"), setChatTimeGraphConfig(timeData));
    }();


    /**
     * 시간별 발전량 그래프 데이터 처리
     */
    const setChatTimeGraphData = () => {
        let datasetItemList = [];
        datasetItemList.push({
            label: "발전량",
            fill : true,   
            backgroundColor: "rgba(204, 188, 83, 1)", 
            borderColor: 'rgba(204, 188, 83, 1)',  
            data: [100,200,300,400,500,600,700],
        });

        realTimeSolarpowerGeneration.data.datasets = datasetItemList;
        realTimeSolarpowerGeneration.update();
    }








    (function(){
        setChatTimeGraphData(); // 시간별 발전량
    })();
});



