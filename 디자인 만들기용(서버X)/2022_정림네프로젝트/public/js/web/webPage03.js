// JavaScript Document

$(function(){

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
	 * 차트옵셥
	 * @param {arr} chartData 
	 */
	 let setStringChartConfig = (chartData) => {
		let config = {
			type: 'line',
			data: {
				labels: ['00','01','02','03','04','05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], 
				datasets: [{
					label: '성정',
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
							text : "Y에 표시될 값",
							font:{
								size:16,
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
								size : 14
							},
							padding : 10,
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
								size : 14
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
		return new Chart($('#lineGraph'), setStringChartConfig(chartData));
	}();

	/**
	 * DB에서 데이터 조회 후 그래프 데이터 반영
	 */
	const setStringChartData = function(selBtnData) {
		// 제일처음 조회는 월간 기준
		let selBtnTime = moment().format('YYYY-MM');
		let xLabelList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
		let testTime = 12;
		let contentTitText = "월간";
		switch (selBtnData) {
			case 'monthBtn':
				selBtnTime = moment().format('YYYY-MM');
				xLabelList = xLabelFn(12);
				testTime = 12;
				contentTitText = "월간";
				break;
			case 'weekBtn':
				let thisWeek = currentTime()[16];
				selBtnTime = thisWeek;
				xLabelList = [];
				for (let i = 0; i < thisWeek.length; i++) {
					xLabelList.push(thisWeek[i].slice(-2));
				}
				testTime = 7;
				contentTitText = "주간";
				break;
			case 'hoursBtn':
				selBtnTime = moment().format('YYYY-MM-DD HH');
				xLabelList = xLabelFn(24);
				testTime = 24;
				contentTitText = "시간";
				break;
		}

		function xLabelFn(number) {
			xLabelList = [];
			let xList = [];
			for (let i = 0; i < number; i++) {
				xList.push(`0${i+1}`.slice(-2));
			}
			return xList;
		}

		// db에서 가져온 데이터를 바탕으로 그래프 표시하기 ( 나중에)
		// axios.post("/monitoring/growthChart", {
		// 	time : selBtnTime
		// })
		// .then(function(rs) {
		// 	console.log(rs);
		// 	setStringChartData(rs);
		// })
		// .catch(function (error) {

		// })

		let contentTit = document.querySelector('.sec.section01 > .contentTit');
		contentTit.innerText =`${contentTitText} 성장 그래프`;
		let datasetItemList = [];
		datasetItemList.push({
			label: "성정",
			fill : true,   
			backgroundColor: "rgba(254, 215, 245, 0.3)", 
			borderColor: 'rgba(254, 215, 245, 1)',  
			data: [100,200,300,400,500,600,700,800,300,500,100,100,200,300,400,500,600,700,800,300,500,100],
		});

		stringChart.data.labels = xLabelList;
		stringChart.data.datasets = datasetItemList;
		stringChart.update();
	};

	/**
	 * 날짜 선택 버튼 이벤트 
	 */
	let selBtn = document.querySelectorAll('.contentBox > .selBtn > .btn > button');
	selBtn.forEach((e)=> {
		e.addEventListener("mouseover", function() {
			selBtn.forEach((f) => {
				f.classList.remove('on');
			})
			// console.log(this.parentNode);
		});
		e.addEventListener("click", function() {
			// this.classList.add('on');
			setStringChartData(this.id)
		});
	});

	(function(){
		setStringChartData();
	})()
});

// window.onresize = function(e) {
// 	// console.log("사이즈 변화");
// 	console.log(e.target.innerHeight);
// 	console.log(e.target.innerWidth);
// 	if (e.target.innerWidth <= 767) {
// 		console.log("모바일");
// 	}
// }