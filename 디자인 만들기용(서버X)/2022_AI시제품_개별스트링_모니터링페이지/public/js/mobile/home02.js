// JavaScript Document
$(document).ready(function(){
	/**
	 * 발전소 정보 
	 * sTit 0 ~ 2
	 */
	const setDataPowerPlantInfo = () => {

		$('.sec02 > .box02 > .contentBox').html(
			`
			<div class="location">광주광역시 북구 첨단과기로 그린훼스코 123123123</div> 
			<div class="innerBoxDiv">
				<div class="innerBox scale">
					<h3 class="sTit">규모</h3>
					<strong>3,358</strong>
					kW/년
				</div>
				<div class="innerBox model">
					<h3 class="sTit">인버터 모델</h3>
					<strong>SIN17</strong>
				</div>
				<div class="innerBox count">
					<h3 class="sTit">인버터 수</h3>
					<strong>208</strong>
					대
				</div>
			</div>
			`
		);
	}



	/**
	 * 발전정보 
	 * sTit 3 ~ 7
	 */
	const setDataSolarPower = () => {

		// 발전량 백분율
		let todayBar = 35;
		let yesterdayBar = 50;
		// 발전량 수치
		let todayData = comma('34567');
		let yesterdayData = comma('56789');

		// 현재 태양광 발전량
		let nowDyield = comma('12.6');
		// 누적 발전량
		let allTyield = comma('879483');
		// 년간 발전량
		let oneYearTyield = '456789';
		// 이산화탄소 절감량  tCo2/년 = 발전량(MWh/년) * 온실가스배출계수(tCo2/MWh) [0.4585]
		let tCO2ReductionQuantity = ((oneYearTyield/1000) * 0.4585).toFixed(3);


		$('.sec02 > .box04 > .contentBox').html(`
			<div class="innerBox today">
				<h3 class="sTit">현재 <br />태양광 출력</h3>
				<strong>${nowDyield}</strong> <!-- 현재 태양광 값 표시 -->
				kW
			</div>
			<div class="innerBox accumulate">
				<h3 class="sTit">누적 <br />태양광 발전량</h3>
				<strong>${allTyield}</strong> <!-- 태양광 발전량 값 표시 -->
				MWh
			</div>
			<div class="innerBox CO2">
				<h3 class="sTit">이산화탄소 <br />절감량</h3>
				<strong>${tCO2ReductionQuantity}</strong> <!-- 이산화탄소 절감량 표시 -->
				tCo2/년
			</div>
			<div class="barBox">
				<h3 class="sTit">금일 태양광 발전량</h3>
				<div class="barCont">
					<span class="bar bar01" style="width:${todayBar}%"></span>
					<span class="amount">${todayData} kWh</span> <!-- 금일 태양광 발전량 표시 -->
				</div>
			</div>
			<div class="barBox">
				<h3 class="sTit">전일 태양광 발전량</h3>
				<div class="barCont">
					<span class="bar bar02" style="width:${yesterdayBar}%"></span>
					<span class="amount">${yesterdayData}  kWh</span> <!-- 전일 태양광 발전량 표시 -->
				</div>
			</div>
		`);
		
	}


	/**
	 * 수치 콤마 찍어주기
	 * @param {float} arr 
	 */
	function comma(arr){
        let arrData = parseFloat(arr).toFixed(1);
        let front = String(arrData).split(".")[0];
        let back = String(arrData).split(".")[1];
        let reAll = front.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let str = [reAll ,back ].join(".");
        return str;			
    }

	(function(){
		setDataPowerPlantInfo();
		setDataSolarPower();
		locationResize();
	})()

	// 사이즈변경 감지
	$(window).on('resize', function(){
		locationResize();
	});

});


// 발전소 정보 사이즈 감지
function locationResize() {
	let location = $('#mainContent > .section > .box.box02 > .contentBox > .location');
	let innerBox = $('#mainContent .section .box.box02 .contentBox .innerBoxDiv .innerBox');
	let locationHeight = $('#mainContent .section .box.box02');

	// 주소 박스 크기 감지 후 발전소 정보 박스 사이즈 변경하기
	if(location.height() > 24) {
		locationHeight.css({
			'min-height' : '180px'
		});
		// 205
	}else{
		locationHeight.css({
			'min-height' : '160px'
		})
	}

	// innerBox 박스 크기 비교 => 주소박스 크기에 맞춰서 발전소 정보 박스 사이즈 변경하기
	if(innerBox.height() > 48){
		let locationHeightResize = locationHeight.css('min-height');
		locationHeight.css({
			'min-height' : `${Number(locationHeightResize.slice(0, -2))+25}px`
		});
	}else {
		let locationHeightResize = locationHeight.css('min-height');
		locationHeight.css({
			'min-height' : `${locationHeightResize}`
		});
	}
}




