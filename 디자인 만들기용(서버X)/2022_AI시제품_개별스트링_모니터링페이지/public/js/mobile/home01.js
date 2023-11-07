// JavaScript Document

/**
 * 현재상태 정보 표시
 * @param {object} modDto 
 * @returns 
 */
const contentDataHtml = (modDto) => {
		
	let classStatus = "";
	if(modDto.className == 'cir01'){
		classStatus = "정상"
	}
	else if(modDto.className == 'cir02'){
		classStatus = "경고"
	}
	else if(modDto.className == 'cir03'){
		classStatus = "위험"
	}

	return `
		<div class="contentDataTitle">
			<h4>현재상태</h4>
			<span class="${modDto.className}">${classStatus}</span>
		</div>
		<ul class="contentDataBox">
			<li class="innerBox"> 
				<h5>발전량</h5>	
				<strong>${modDto.powData}</strong>
				kW
			</li>
			<li class="innerBox"> 
				<h5>전압</h5>	
				<strong>${modDto.voltage}</strong>
				V
			</li>
			<li class="innerBox"> 
				<h5>전류</h5>	
				<strong>${modDto.electricCurrent}</strong>
				A
			</li>
		</ul>
	
	`
}

$(document).ready(function(){
	
	/**
	 * 모듈 위치 리스트 생성하기
	 */
	const moduleList = (rstData) => {

		let moduleList = "";
		// tr/td 길이는 발전소 에 따라 변함
		let trLen = 13;
		let tdLen = 16;
		for (let index = 0; index < trLen; index++) {
			let trClass = `0${index + 1}`.slice(-2);
			moduleList += `<li> <ul class="tr tr${trClass}">`
			for (let index2 = 0; index2 < tdLen; index2++) {
				let tdClass = `0${index2 + 1}`.slice(-2);
				
				if(index == 12) { // 실제 사용 X 
					// 제일 마지막줄 상태/길이 등 표시하기위함
					if(index2 == 0 || index2 == 7 || index2 == 8 || index2 == 15) {
						moduleList += `
						<li class="td td${tdClass}">
							<p class="cir03"></p> 
						</li>
						`
					}
					moduleList += `
					<li class="td td${tdClass}">
						<p class="cir01"></p> 
					</li>
					`
				}else if(true){
					// cir01 은 DB설계후 데이터 보고 만들기
					moduleList += `
					<li class="td td${tdClass}">
						<p class="cir01"></p> 
					</li>
					`
				}else {
					// off 조건은 DB설계후 데이터 보고 만들기
					moduleList += `
						<li class="td td${tdClass} off">
							<p class="cir01"></p> 
						</li>
					`
				}

			}
			moduleList += '</ul></li>'
		}
		
		// 모듈 html 뿌리기
		$('.contentBox .moduleStatus').html(moduleList);

	}


	/**
	 * 모듈위치 모듈 클릭시 발생 이벤트
	 */
	$('.moduleStatus > li > .tr > .td > p').not('.td.off > p').click( async function(e) {
		// console.log($(this).parent().index());
		// console.log(e);

		let tdIndex = $(this).parent().index()+1;
		let tdParenLi = $(this).parent().parent().parent().index()+1;
		let cirName = e.target.className;
		// 데이터 베이스에서 값 가져오기
		// let modData = getModData();

		// 데이터베이스에 저장된 실제 모듈 데이터 추후에 가져와야함
		let testVoltege = Number(tdIndex) + Number(tdParenLi) * 100;
		let testElectricCurrent = Number(tdIndex) + Number(tdParenLi) * 10;

		let modDto = {
			className : cirName,
			powData : (testVoltege * testElectricCurrent).toFixed(1),
			voltage : testVoltege,
			electricCurrent : testElectricCurrent
		}
		let modHtml = await contentDataHtml(modDto);
		$('.contentTit').html(`<h2>개별 모듈 현황</h2> ${tdParenLi} - ${tdIndex}`);
		$('.contentData').html(modHtml);
	});


	function getModData() {
		$.ajax({
			url : '',
			method: "POST",
			data : "",
		})
		.done(function(data){
			return data
		})
		.fail(function(err){
			console.log(err);
		})
	}
	/**
	 * 모듈 위치 리스트 생성하기
	 */
	function getModList() {
		$.ajax({
			url : '',
			method: "POST",
			data : "",
		})
		.done(function(data){
			moduleList(data);
		})
		.fail(function(err){
			console.log(err);
		})
	}

	(function(){
		// moduleList(); // 모듈 html코드 생성 
	})()
});


$(window).on('load', function() {

	/**
	 * 제일 처음 한번만 실행하기
	 * 모듈 제일 첫번째 값 가져오기
	 */
	function firstOnce() {

		// 데이터 베이스에서 값 가져오기
		// let modData = getFirstModData();

		let modDto = {
			className : 'cir01',
			powData : '1111.0',
			voltage : '101',
			electricCurrent : '11'
		}
		let modHtml = contentDataHtml(modDto);
		$('.contentTit').html(`<h2>개별 모듈 현황</h2> 1 - 1`);
		$('.contentData').html(modHtml);
	}
	function getFirstModData() {
		$.ajax({
			url : '',
			method: "POST",
			data : "",
		})
		.done(function(data){
			return data
		})
		.fail(function(err){
			console.log(err);
		})
	}

	firstOnce(); // 제일 처음 한번 만 실행
})

