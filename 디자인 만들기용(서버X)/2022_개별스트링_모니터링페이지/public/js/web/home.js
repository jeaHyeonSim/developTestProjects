// JavaScript Document


$(document).ready(function(){
	/**
	 * 미니팝업
	 * @param {obj} moduleData 
	 */
	const popupViewMini = (moduleData) => {
		let tdClassNumber = Number(moduleData.tdClassNumber);
		let rotate =  ((-(moduleData.rotate)) * 1.5) * tdClassNumber; 
		let thisParentLeft = Number(moduleData.thisParentLeft);
		let thisParentTop = Number(moduleData.thisParentTop) + 100 - (rotate);
		let thisLeft = Number(moduleData.thisLeft);

		// 모듈상태 => 상태에 따라 class명 노출 변경 / 정상-cir01 / 주의-cir02 / 경고-cir03
		return `
		<div id="miniPopup" class="popup miniPopup" style="top:${thisParentTop}px; left:${thisParentLeft + thisLeft}px;">
			<div class="popupTit">
				<h3></h3>
				<button class="btn_close">닫기 X</button>
			</div>
			<div class="popupContent">
				<ul>
					<li>
						<h4>모듈번호</h4>
						<p>${(Number(moduleData.trCLassNumber)+1)} - ${(Number(moduleData.tdClassNumber)+1)} <!-- 모듈 번호 표시 --></p>
					</li>
					<li>
						<h4>모듈상태</h4>
						<p class="${moduleData.stateClass}">${moduleData.state} </p>
					</li>
					<li>
						<h4>전압</h4>
						<p>${moduleData.voltage} V</p>
					</li>
					<li>
						<h4>전류</h4>
						<p>${moduleData.electricCurrent} A</p>
					</li>
					<li>
						<h4>발전량</h4>
						<p>${moduleData.solarpowerGa} kW</p>
					</li>
				</ul>
				<!-- <button class="btn_detail">상세보기</button> --> 
			</div>
		</div>
		`
	};

	/**
	 * 미니팝업02
	 * @param {obj} moduleData 
	 */
	const popupViewMini02 = (moduleData) => {
		let thisParentIndex =  Number(moduleData.thisParentIndex);
		let tdClassNumber = Number(moduleData.tdClassNumber);
		let rotate =  ((-(moduleData.rotate)) * 1.5) * tdClassNumber; 
		let thisParentLeft = Number(moduleData.thisParentLeft);
		let thisParentTop = Number(moduleData.thisParentTop) + 100 - (rotate);
		let thisLeft = Number(moduleData.thisLeft);
		let thisLastDivNum = moduleData.thisLastDivNum;
		let thisFistDivNum = moduleData.thisFistDivNum;
		let thisParentDivNum = moduleData.thisParentDivNum

		let miniPopLeft = ((thisParentLeft +(thisLastDivNum * 86) /2) ).toFixed(1);
		let miniPopTop = (thisParentTop + (thisParentIndex * 94)).toFixed(1);

		// 모듈상태 => 상태에 따라 class명 노출 변경 / 정상-cir01 / 주의-cir02 / 경고-cir03
		return `
		<div id="miniPopup" class="popup miniPopup" style="top:${miniPopTop}px; left:${thisParentLeft + thisLeft}px;">
			<div class="popupTit">
				<h3></h3>
				<button class="btn_close">닫기 X</button>
			</div>
			<div class="popupContent">
				<ul>
					<li>
						<h4>모듈번호</h4>
						<p>${(Number(moduleData.trCLassNumber)+1)} - ${(Number(moduleData.tdClassNumber)+1)} <!-- 모듈 번호 표시 --></p>
					</li>
					<li>
						<h4>모듈상태</h4>
						<p class="${moduleData.stateClass}">${moduleData.state} </p>
					</li>
					<li>
						<h4>전압</h4>
						<p>${moduleData.voltage} V</p>
					</li>
					<li>
						<h4>전류</h4>
						<p>${moduleData.electricCurrent} A</p>
					</li>
					<li>
						<h4>발전량</h4>
						<p>${moduleData.solarpowerGa} kW</p>
					</li>
				</ul>
				<!-- <button class="btn_detail">상세보기</button> --> 
			</div>
		</div>
		`
	};

	/**
	 * 상세보기 팝업
	 * @param {obj} moduleData 
	 */
	const popupViewDetail = (moduleData) => {
		let innerBoxHtml  = '';

		// 모듈 위치 나타내기 
		for (let i = 1; i < 14; i++) {
			innerBoxHtml += `<li> `;
			let trNum;
			if(i < 10){trNum = `0${i}`} else trNum = i;
			for (let j = 1; j < 17; j++) {
				let tdNum;
				if(j < 10){tdNum = `0${j}`} else tdNum = j;

				if(j === 1) {
					innerBoxHtml += `
						<ul class="tr tr${trNum}"> 
						<li class="td td${tdNum}"></li>`
				}else if(j === 16){
					innerBoxHtml += `
						<li class="td td${tdNum}"></li> 
						</ul>`
				}else if( i == Number(moduleData.trCLassNumber) +1 && j == Number(moduleData.tdClassNumber) +1){
					innerBoxHtml += `<li class="td td${tdNum} focus"></li>`
				}else {
					innerBoxHtml += `<li class="td td${tdNum}"></li>`
				}
			}
			if(i === 13){
				innerBoxHtml += `</li> `;
			}
		}

		return `
		<!-- 미니 팝업에서 상세보기 클릭시 노출되는 팝업 Start-->
		<div id="detailPopup" class="popup detailPopup">
			<div class="popupTit">
				<h3>모듈번호 : ${(Number(moduleData.trCLassNumber)+1)} - ${(Number(moduleData.tdClassNumber)+1)}  <!-- 모듈 번호 표시 --></h3>
				<button class="btn_close">닫기 X</button>
			</div>
			<div class="popupContent">
				<h4>현재상태 
					<!-- 상태에 따라 class명 노출 변경 / 정상-cir01 / 주의-cir02 / 경고-cir03 -->
					<span class="${moduleData.stateClass}">${moduleData.state} <!-- 상태 문구 표시 --></span>
				</h4>
				<ul>
					<li class="innerBox">
						<h5>발전량</h5>
						<strong>${moduleData.solarpowerGa}</strong> <!-- 발전량 표시 -->
						kW
					</li>
					<li class="innerBox">
						<h5>전압</h5>
						<strong>${moduleData.voltage}</strong> <!-- 전압 표시 -->
						V
					</li>
					<li class="innerBox">
						<h5>전류</h5>
						<strong>${moduleData.electricCurrent}</strong> <!-- 전류 표시 -->
						A
					</li>
				</ul>
				<h4>모듈위치</h4>
				<ul class="innerBox">
					${innerBoxHtml}
				</ul>
			</div>
		</div>
		<!-- // 미니 팝업에서 상세보기 클릭시 노출되는 팝업 End -->
		`
	}

	/**
	 * 미니팝업 열기
	 * 미니팝업 및 상세보기 HTML코드 생성
	 */
	$('.moduleStatus > li > .tr > .td > p').not('.td.off > p').click( async function() {
		let tdClassNumber = $(this).parents().index();
		let trCLassNumber = $(this).parents().parents().parents().index();

		// 팝업에 보내줄 데이터 => 추후 데이터베이스에서 조회해야함
		let moduleData = {
			number : 1,
			state : '정상',
			stateClass : "cir01",
			solarpowerGa : "9.2",
			tdClassNumber : tdClassNumber,
			trCLassNumber : trCLassNumber,
			voltage : 105,
			electricCurrent : 9
		}

		let miniPopup = await popupViewMini(moduleData);
		let detailPopup = await popupViewDetail(moduleData);
		$(this).after(detailPopup);
		$(this).after(miniPopup);
		$(this).siblings('#miniPopup').show();
		$('.box01 > .contentBox').addClass('popupView');	
	});

	/**
	 * 디데일 팝업 열기 버튼
	 */
	$(document).on("click", ".btn_detail", function() {
		$('#miniPopup').hide();
		$(this).parents('#miniPopup').siblings('#detailPopup').show();				
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
	 * 발전소 정보 
	 * sTit 0 ~ 2
	 */
	const setDataPowerPlantInfo = () => {

		$('.sec02 > .box02 > .contentBox').html(
			`
			<div class="location">광주광역시 북구 첨단과기로 그린훼스코</div> <!-- 현재 위치 표시 -->
			<div class="innerBox scale">
				<h3 class="sTit">규모</h3>
				<strong>3,358</strong> <!-- 발전소 규모 표시 -->
				kW/년
			</div>
			<div class="innerBox model">
				<h3 class="sTit">인버터 모델</h3>
				<strong>SIN17</strong> <!-- 발전소 인버터 모델 표시 -->
			</div>
			<div class="innerBox count">
				<h3 class="sTit">인버터 수</h3>
				<strong>208</strong> <!-- 발전소 인버터 수 표시 -->
				대
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

	/**
	 * 스트링별 모듈 클릭 이벤트
	 */
	$(document).on('click', '.moduleStatus > .stringModule .panelDiv', async function() {
		$('.popup').remove();
		$('.box01 > .contentBox').removeClass('popupView');
		let string = $(this).attr('string');
		let modeuleNum = $(this).attr('modeuleNum');
		let transformStyle = $(this).parent().attr('style').split(";")[0].split(":")[1].split("(")[1].split("deg")[0];
		let thisParentLeft = $(this).parent().css('left').split("p")[0];
		let thisLeft = $(this).css('left').split("p")[0];
		let thisParentTop = $(this).parent().css('top').split("p")[0];
		// console.log(transformStyle);
		// console.log(string, modeuleNum);
		// console.log(thisParentLeft, thisParentTop, thisLeft);
		// 데이터베이스에서 실제 클릭한 모듈값 가져와야함
		let voltage = 600;
		let electricCurrent = 15.4;
		let moduleData = {
			number : 1,
			trCLassNumber : string,
			tdClassNumber : modeuleNum,
			state : '정상',
			stateClass : "cir01",
			solarpowerGa : ((voltage * electricCurrent)/1000).toFixed(1),
			voltage : voltage,
			electricCurrent : electricCurrent,
			rotate : transformStyle,
			thisParentLeft : thisParentLeft, 
			thisParentTop : thisParentTop,
			thisLeft : thisLeft
		}
		let miniPopup = await popupViewMini(moduleData);
		//let detailPopup = await popupViewDetail(moduleData);
		$(this).parent().parent().prepend(miniPopup)
		// $(this).after(miniPopup);
		// $(this).after(detailPopup);
		$(this).parent().siblings('#miniPopup').show();
		$('.box01 > .contentBox').addClass('popupView');	
	});

	/**
	 * 토지별 스트링별 모듈 클릭 이벤트
	 */
	$(document).on('click', '.moduleStatus .landStructure .stringModule .panelDiv', async function() {
		$('.popup').remove();
		$('.box01 > .contentBox').removeClass('popupView');
		let string = $(this).attr('string');
		let modeuleNum = $(this).attr('modeuleNum');
		let thisParentIndex = $(this).parent().index();
		let transformStyle = $(this).parent().parent().attr('style').split(";")[0].split(":")[1].split("(")[1].split("deg")[0];
		let thisParentLeft = $(this).parent().parent().css('left').split("p")[0];
		let thisLeft = $(this).css('left').split("p")[0];
		let thisParentTop = $(this).parent().parent().css('top').split("p")[0];
		let thisLastDivNum = $(this).parent().children('.panelDiv').last().attr('modeuleNum');
		let thisFistDivNum = $(this).parent().children('.panelDiv').first().attr('modeuleNum');
		let thisParentDivNum = ($(this).parent().parent().children('.stringModule').length);

		// console.log(transformStyle);
		// console.log(string, modeuleNum);
		// console.log(thisParentLeft, thisParentTop, thisLeft);
		// 데이터베이스에서 실제 클릭한 모듈값 가져와야함
		let voltage = 600;
		let electricCurrent = 15.4;
		let moduleData = {
			number : 1,
			trCLassNumber : string,
			tdClassNumber : modeuleNum,
			thisParentIndex : thisParentIndex,
			state : '정상',
			stateClass : "cir01",
			solarpowerGa : ((voltage * electricCurrent)/1000).toFixed(1),
			voltage : voltage,
			electricCurrent : electricCurrent,
			rotate : transformStyle,
			thisParentLeft : thisParentLeft, 
			thisParentTop : thisParentTop,
			thisLeft : thisLeft,
			thisLastDivNum : Number(thisLastDivNum),
			thisFistDivNum : Number(thisFistDivNum),
			thisParentDivNum : Number(thisParentDivNum)
		}
		let miniPopup = await popupViewMini02(moduleData);
		//let detailPopup = await popupViewDetail(moduleData);
		$(this).parent().parent().parent().prepend(miniPopup)
		// $(this).after(miniPopup);
		// $(this).after(detailPopup);
		$(this).parent().parent().siblings('#miniPopup').show();
		$('.box01 > .contentBox').addClass('popupView');	
	});




	(function(){
		setDataPowerPlantInfo();
		setDataSolarPower();
	})()
});


