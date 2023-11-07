$(document).ready(function(){


	/**
	 * 차트옵셥
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
							display : false,
							text : "발  전  량 [ K W h ]",
							font:{
								size:12,
								weight :'bold', 
							},
							color : 'white'
						},
						display : true,
						min : 0,
						max : 550,
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
								size : 10
							},
							padding : 3,
						},
					}                  
				}
			}
		};
		return config;
	}

	/**
	 * 상세보기 팝업
	 * @param {obj} moduleData 
	 */
	const popupViewMod = (modDto) => {
		let modBoxData = {
			status : `cir0${modDto.index%2 == 0 ? 1 : 2}`,
			statusName : `${modDto.index%2 == 0 ? '정상' : '경고'}`,
			powData : '99.9',
			voltege : '999.9',
			electricCurrent : '999'
		}
	

		return `
			<div id='chartModPopup' class='popup chartModPopup''> 
				<div class="popupTit">
					<h3>${modDto.string} ${modDto.moduleName} 상세</h3>
					<button class="btn_close">닫기 X</button>
				</div>

				<div class="popupContent">	
					<div class='stringModChart'>
						<h4>그래프 <span>X: 시간[h] / Y: 발전량[kWh]</span></h4>
						<canvas id="line_StringModGraph"  ></canvas>
					</div>
					<div class='moduleStatus'> 
						<div class='modulContentTit'>
							<h4>모듈 상세</h4>
						</div>
						<div class='modulContentBox'> 
							<div class="innerBox">
								<h3>상태</h3>
								<p class="${modBoxData.status}">&nbsp;${modBoxData.statusName}</p>
							</div>
							<div class="innerBox">
								<h3>발전량</h3>
								<p>${modBoxData.powData}</p>
								<p>kW</p>
								
							</div>
							<div class="innerBox">
								<h3>전압</h3>
								<p>${modBoxData.voltege}</p>
								<p>V</p>
							</div>
							<div class="innerBox">
								<h3>전류</h3>
								<p>${modBoxData.electricCurrent}</p>
								<p>A</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
	}


	/**
	 * 모듈상세 팝업 열기
	 * 팝업 및 상세보기 HTML코드 생성
	 */
	$('.accordionWrap > li.accordion .accoCont > ul > li').on('click', async function(e){
		// console.log($(this).index());
		// console.log(e.target.innerText);

		let modDto = {
			string : $(this).parent().parent().siblings('.accoTit')[0].innerText,
			moduleName : e.target.innerText,
			index : $(this).index() + 1
		}

		let modPopup = await popupViewMod(modDto);
		$('.accordionWrap').prepend(modPopup);
		$('.accordionWrap').after();

		// $(this).siblings => 선택한 요소를 제외한 형제 요소를 모두 찾기
		// $('.accordionWrap').siblings('#line_StringGraph').show();
		$('.box01 > .contentBox').addClass('popupView');	

		/**
		* 그래프 생성
		*/
		setStringModChartData(); // 스트링 발전량 그래프?
		
	});

	/**
	 * 팝업 닫기 버튼
	 * 닫기 누르면 html 삭제
	 */
	 $(document).on("click", ".btn_close", function() {
		// $('.popup').hide();
		$('.popup').remove();
		$('.box01 > .contentBox').removeClass('popupView');
	});

	/**
	 * DB에서 데이터 조회 후 그래프 데이터 반영
	 */
	const setStringModChartData = function() {
		let chartData;
		let datasetItemList = [];
		datasetItemList.push({
			label: "발전량",
			fill : true,   
			backgroundColor: "rgba(254, 215, 245, 0.3)", 
			borderColor: 'rgba(254, 215, 245, 1)',  
			data: [70,150,270,350,470,490,500,440,300,380,100],
		});

		let stringChart = new Chart($('#line_StringModGraph'), setStringModChartConfig(chartData));
		stringChart.data.datasets = datasetItemList;
		stringChart.update();
	};

});

$(window).on('load' , function(){
	
})