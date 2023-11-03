// 카카오에서 입력한 주소 좌표 얻기
function kakaoAddress() {
	return new Promise((resolve, reject) => {
		$.ajax(`/coordinate/kakao-kakaoAddress`,
			{
				method: 'post'
			}
		)
		.done(function (jsonStr) { // 서버요청이 성공시의 콜백함수
			return resolve(jsonStr);
//         console.log(jsonStr.documents[0].address); // 지번주소
//         console.log(jsonStr.documents[0].road_address); // 도로명 주소
//         console.log(jsonStr.documents[0].x); 
//         console.log(jsonStr.documents[0].y);
		})
		.fail(function (error) { // 서버요청이 에러시의 콜백함수
			console.log(error);
			// alert(error.responseJSON.errMsg);
			return reject("err");
		});
	})
}

// 토지영역 좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
const nsdi_landCharacteristicsWfs = () => {
	return new Promise((resolve, reject) => {
		$.ajax(`/coordinate/nsdi-landCharacteristicsWfs`,
			{
				method: 'post',
			}
		)
		.done(function (jsonStr) { // 서버요청이 성공시의 콜백함수
			resolve(jsonStr);
			return;
		})
		.fail(function (error) { // 서버요청이 에러시의 콜백함수
			reject(error.responseJSON.errMsg);
			return;
		});
	});
}


$('.searchLand').on('click', async function(){

	let kakaoData = await kakaoAddress();
	let landCharacteristics = await nsdi_landCharacteristicsWfs();
	console.log(kakaoData);
	console.log(landCharacteristics);
	kakaoMaps(landCharacteristics);
	return;

	
});

// getAddr3();
