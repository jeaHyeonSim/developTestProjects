$(document).ready(function(){
	/**
	 * 아코디언 메뉴
	 */
	$(function(){
		var accordion = $('.accordionWrap .accordion');
		accordion.addClass('hide');
		accordion.find('.accoCont').slideUp(0);
		$('.accordionWrap .accordion.active').addClass('show').removeClass('hide').find('.accoCont').slideDown(100);
		$('.accordionWrap .accordion .trigger').click(function(){
			var myaccordion = $(this).parents('.accordion');
			if(myaccordion.hasClass('hide')){
				accordion.addClass('hide').removeClass('show');
				accordion.find('.accoCont').slideUp(100);
				myaccordion.removeClass('hide').addClass('show');
				myaccordion.find('.accoCont').slideDown(100);
			} else {
				myaccordion.removeClass('show').addClass('hide');
				myaccordion.find('.accoCont').slideUp(100);
			}
		});
	});


	/**
	 * 차트옵셥
	 * @param {arr} chartData 
	 */
	let setStringChartConfig = (chartData) => {
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
	let stringChart = function(chartData) {
		return new Chart($('#line_StringGraph'), setStringChartConfig(chartData));
	}();

	/**
	 * DB에서 데이터 조회 후 그래프 데이터 반영
	 */
	const setStringChartData = function() {
		let datasetItemList = [];
		datasetItemList.push({
			label: "발전량",
			fill : true,   
			backgroundColor: "rgba(254, 215, 245, 0.3)", 
			borderColor: 'rgba(254, 215, 245, 1)',  
			data: [100,200,300,400,500,600,700,800,300,500,100],
		});

		stringChart.data.datasets = datasetItemList;
		stringChart.update();
	};



	$('.accoTit').click( function() {
		console.log($(this).parents().index());
		// 데이터베이스 에서 클릭한 스트링의 모듈들의 정보 가져오기 (13개?)

		// let datasetItemList = [];
		// datasetItemList.push({
		// 	label: "발전량",
		// 	fill : true,   
		// 	backgroundColor: "rgba(254, 215, 245, 0.3)", 
		// 	borderColor: 'rgba(254, 215, 245, 1)',  
		// 	data: [177,277,377,477,577,677,777,877,377,577,177],
		// });

		// stringChart.data.datasets = datasetItemList;
		// stringChart.update();
	})




	


	setStringChartData(); // 스트링 발전량 그래프?


});