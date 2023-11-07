// JavaScript Document


$(document).ready(function(){

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

	// 상태 html 데이터베이스 에서 긁어 오기
	const statusHtml = (statusDto) => {
		let tempText = "";
		let humidityText = "";
		let illuminaceText = "";
		let co2Text = "";
		let soilText = "";

		`
			0  ~300 -> 건조한 토양
			300~700 -> 습한 토양
			700~950 -> 수중 토양
		`

		$('.section01 > .contentBox .boxContents').eq(0).text('21.5 ℃'); // 온도
		$('.section01 > .contentBox .boxContents').eq(1).text('66 %'); // 습도
		$('.section01 > .contentBox .boxContents').eq(2).text('222 lx'); // 조도
		$('.section01 > .contentBox .boxContents').eq(3).text('1444 ppm'); // co2
		$('.section01 > .contentBox .boxContents').eq(4).text('300'); // 토양정보

	}
	// 온도 조절
	const tempControl = (tempDto) => {
		console.log(tempDto);
		let temp = tempDto ?? "25";
		$('.section02 > .contentBox .boxContents .tempControlText').attr('value', temp);
		$('.section02 > .contentBox .boxContents .tempControlText').text(`${temp} ℃`);
	}

	// 송풍기,냉방,보온 클릭이벤트
	$(document).on('click', ".section02 > .contentBox .box:not(.box02):not(.box05) button", async function() {
		console.log($(this).parent().parent().parent().index());
		console.log("on 클릭");
		console.log($(this).attr('class'));
		let parentIndex = $(this).parent().parent().parent().index();// 0, 2,3
		let className = $(this).attr('class');
		if(className == 'on'){
			$(this).css({
				'background': 'rgba(14, 206, 10, 1)'
			});
			$(this).siblings('.off').css({
				'background': 'rgba(248, 4, 4, 0.2)'
			});
		}else {
			$(this).css({
				'background': 'rgba(248, 4, 4, 1)'
			});
			$(this).siblings('.on').css({
				'background': 'rgba(14, 206, 10, 0.2)'
			});
		}
	});
	// 밝기조절
	$(document).on('click', '.section02 > .contentBox .box.box02 button', async function() {
		let lightControlIndex = $(this).attr('name');
		$('.section02 > .contentBox .box.box02 .fontColor').css('color','');
		$('.section02 > .contentBox .box.box02 .fontColor').removeClass('fontColor');
		$(this).addClass('fontColor');
		// $(this).css({'color': '#000'});

		switch (lightControlIndex) {
			case 'off':
				console.log("off");
				break;
			case '1':
				console.log("1");
				break;
			case '2':
				console.log("2");
				break;
			case '3':
				console.log("3");
				break;
			case 'max':
				console.log("max");
				break;
		}
	});

	
	// 온도 조절 +
	$(document).on('click', '.section02 > .contentBox .box.box05 button.plus', async function() {
		// console.log($(this).parent().parent().parent().index());
		// console.log("+ 클릭");
		// console.log($(this).siblings('.tempControlText').attr('value'));
		let tempControlText = $(this).siblings('.tempControlText').attr('value');
		let tempDto = Number(tempControlText) + 0.5;
		if(tempDto < 10) {
			tempDto = 10;
		}
		if(tempDto > 30){
			tempDto = 30;
		}
		tempControl(tempDto);

	});
	// 온도 조절 -
	$(document).on('click', '.section02 > .contentBox .box.box05 button.minus', async function() {
		// console.log($(this).parent().parent().parent().index());
		// console.log("- 클릭");
		let tempControlText = $(this).siblings('.tempControlText').attr('value');
		let tempDto = Number(tempControlText) - 0.5;
		if(tempDto < 10) {
			tempDto = 10;
		}
		if(tempDto > 30){
			tempDto = 30;
		}
		tempControl(tempDto);
	});





	(function(){
		tempControl();
		statusHtml();
	})()
});


