$(document).ready(function(){
	/**
	 * 아코디언 메뉴
	 */
	$(function(){
		var accordion = $('.accordionWrap .accordion');
		accordion.addClass('hide');
		accordion.find('.accoCont').slideUp(0);
		$('.accordionWrap .accordion.active').addClass('show').removeClass('hide').find('.accoCont').slideDown(100);
		
		$('.accordionWrap .accordion .trigger').on('click', function(e){
			var myaccordion = $(this).parents('.accordion');
			// var myaccordion = $(this);
			if(e.target.className == '') { // 스트링 텍스트 클릭하면 리스트는 안보이고 그래프만 팝업으로 보여주기 위한 조건문
				// return;
			}else {
				if(myaccordion.hasClass('hide')){
					accordion.addClass('hide').removeClass('show');
					accordion.find('.accoCont').slideUp(100);
					myaccordion.removeClass('hide').addClass('show');
					myaccordion.find('.accoCont').slideDown(100);
				} else {
					myaccordion.removeClass('show').addClass('hide');
					myaccordion.find('.accoCont').slideUp(100);
				}
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
				}]
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
	const popupViewDetail = (name) => {

		let modListBox = "";
		let modListBoxData = [
			{className : 'cir01' , pow : '1kW'},
			{className : 'cir01' , pow : '2kW'},
			{className : 'cir02' , pow : '3kW'},
			{className : 'cir02' , pow : '4kW'},
			{className : 'cir01' , pow : '5kW'},
			{className : 'cir01' , pow : '6kW'},
			{className : 'cir01' , pow : '7kW'},
			{className : 'cir03' , pow : '8kW'},
			{className : 'cir03' , pow : '9kW'},
			{className : 'cir01' , pow : '10kW'},
			{className : 'cir02' , pow : '11kW'},
			{className : 'cir01' , pow : '12kW'},
			{className : 'cir01' , pow : '13kW'},
			{className : 'cir01' , pow : '14kW'},
			{className : 'cir01' , pow : '15kW'},
			{className : 'cir01' , pow : '16kW'},
		];

		for (let index = 0; index < modListBoxData.length; index++) {
			if(modListBoxData[index].className == 'cir02'){
				modListBox += `
					<a href='#'> 
						<ul> 
							<li> 1-${index+1}</li>
							<li> <p class='cir02'></p></li>
							<li> ${modListBoxData[index].pow}</li>
						</ul>
					</a>
				`
			}else if(modListBoxData[index].className == 'cir03') {
				modListBox += `
					<a href='#'> 
						<ul> 
							<li> 1-${index+1}</li>
							<li> <p class='cir03'></p></li>
							<li> ${modListBoxData[index].pow}</li>
						</ul>
					</a>
				`
			}else {
				modListBox += `
					<a href='#'> 
						<ul> 
							<li> 1-${index+1}</li>
							<li> <p class='cir01'></p></li>
							<li> ${modListBoxData[index].pow}</li>
						</ul>
					</a>
				`
			}
		}

		return `
			<div id='chartPopup' class='popup chartPopup''> 
				<div class="popupTit">
					<h3>${name}  <!-- 스트링 표시 --></h3>
					<button class="btn_close">닫기 X</button>
				</div>
				<div class="popupContent">	
					<div class='stringChart'>
						<h4>그래프 <span>X: 시간[h] / Y: 발전량[kWh]</span></h4>
						<canvas id="line_StringGraph"  ></canvas>
					</div>
					<div class='moduleStatus'> 
						<div class='modulContentTit'>
							<h4>모듈 상태</h4>
						</div>
						<div class='modulContentBox'> 
							${modListBox}
						</div>
					</div>
				</div>
			</div>
		`
	}


	/**
	 * 팝업 열기
	 * 팝업 및 상세보기 HTML코드 생성
	 */
	$('.accordionWrap > li.accordion .trigger > a').on('click', async function(e){
		// console.log($(this).index());
		// console.log(e.target.innerText);
		let detailPopup = await popupViewDetail(e.target.innerText);
		$('.accordionWrap').prepend(detailPopup);
		$('.accordionWrap').after();

		// $(this).siblings => 선택한 요소를 제외한 형제 요소를 모두 찾기
		// $('.accordionWrap').siblings('#line_StringGraph').show();
		$('.box01 > .contentBox').addClass('popupView');	

		/**
		* 그래프 생성
		*/
		setStringChartData(); // 스트링 발전량 그래프?
		
	})

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
	const setStringChartData = function() {
		let chartData;
		let datasetItemList = [];
		datasetItemList.push({
			label: "발전량",
			fill : true,   
			backgroundColor: "rgba(254, 215, 245, 0.3)", 
			borderColor: 'rgba(254, 215, 245, 1)',  
			data: [70,150,270,350,470,490,500,440,300,380,100],
		});

		let stringChart = new Chart($('#line_StringGraph'), setStringChartConfig(chartData));
		stringChart.data.datasets = datasetItemList;
		stringChart.update();
	};

});

$(window).on('load' , function(){
	
})