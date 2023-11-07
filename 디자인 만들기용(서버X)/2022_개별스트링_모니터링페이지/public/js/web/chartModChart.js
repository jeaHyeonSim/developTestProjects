
$(document).ready(function(){

    /**
     * 차트 옵션
     * @param {arr} chartData 
     */
    let setStringModChartConfig = (chartData) => {
        let config = {
            type: 'line',
            data: {
                labels: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], 
                datasets: [{
                    label: '발전량',
                    fill : true,   
                    backgroundColor: "rgba(254, 215, 245, 0.3)", 
                    borderColor: 'rgba(254, 215, 245, 1)',  
                    data: chartData
                }
            ]
            },
            options: {
                responsive : false,
                maintainAspectRatio	: false,
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
    }

    /**
    * 그래프 생성
    */
    let stringModChart = function(chartData) {
        return new Chart($('#line_StringModGraph'), setStringModChartConfig(chartData));
    }();

    const setStringModChartData = () => {
        let datasetItemList = [];
        datasetItemList.push({
            label: "발전량",
            fill : true,   
            backgroundColor: "rgba(254, 215, 245, 0.3)", 
            borderColor: 'rgba(254, 215, 245, 1)',  
            data: [155,255,355,455,555,655,755,855,455,155,955],
        });

        stringModChart.data.datasets = datasetItemList;
        stringModChart.update();
    }




    
    (function(){
        setStringModChartData(); // 스트링 발전량 그래프?
    })();

});
































