function getAddr(){
	$.ajax({
		//  url :"https://business.juso.go.kr/addrlink/addrCoordUrl.do"  //인터넷망
        //  url : "https://business.juso.go.kr/addrlink/addrLinkUrl.do"
        //  url :"https://business.juso.go.kr/addrlink/addrCoordApiJsonp.do" 
        url :"https://business.juso.go.kr/addrlink/addrCoordApi.do" 
		,type:"post"
		,data:$("#form").serialize()
		// ,dataType:"jsonp"
		,crossDomain:true
		,success:function(jsonStr){
			$("#list").html("");
            console.log(jsonStr);
            console.log(jsonStr[0]);
			var errCode = jsonStr.results.common.errorCode;
			var errDesc = jsonStr.results.common.errorMessage;
			if(errCode != "0"){
				alert(errCode+"="+errDesc);
			}else{
				if(jsonStr != null){
					makeListJson(jsonStr);
					jusoCallBack(jsonStr);
					
				}
			}
		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}

function makeListJson(jsonStr){
	var htmlStr = "";
	htmlStr += "<table>";
	$(jsonStr.results.juso).each(function(){
		htmlStr += "<tr>";
		htmlStr += "<td>"+this.admCd+"</td>";
		htmlStr += "<td>"+this.rnMgtSn+"</td>";
		htmlStr += "<td>"+this.bdMgtSn+"</td>";
		htmlStr += "<td>"+this.udrtYn+"</td>";
		htmlStr += "<td>"+this.buldMnnm+"</td>";
		htmlStr += "<td>"+this.buldSlno+"</td>";
		htmlStr += "<td>"+this.entX+"</td>";
		htmlStr += "<td>"+this.entY+"</td>";
		htmlStr += "<td>"+this.bdNm+"</td>";
		htmlStr += "</tr>";
	});
	htmlStr += "</table>";
	$("#list").html(htmlStr);
}

function jusoCallBack(jsonStr) {
	let entX,entY,roadAddrPart;
	let proj4_01 = proj4;
	$(jsonStr.results.juso).each(function(index, el){
		entX = this.entX;
		entY = this.entY;
		roadAddrPart = this.admCd;
	});

    $('#h_addr').val(roadAddrPart);

    //소수점 자르고 시작
    let coord_X = Math.round(entX * 1000000) / 1000000;
    let coord_Y = Math.round(entY * 1000000) / 1000000;
    let point = [coord_X, coord_Y];

    proj4_01.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";//제공되는 좌표
	


    let grs80 = proj4_01.Proj(proj4_01.defs["EPSG:5179"])
    let wgs84 = proj4_01.Proj(proj4_01.defs["EPSG:4326"]); //경위도
	let aaa = `
	'16977914',
	'185584879',
	'16983525',
	'185539379',
	'16987005',
	'185582299',
	'16981393',
	'185627799',
	'16977914',
	'185584879'
	`


    let p = proj4_01.toPoint(point);
    p = proj4_01.transform(grs80, wgs84, p);

    console.log('위도: ' + p.y);
    console.log('경도: ' + p.x);
}




// 카카오 맵에 표시 할 수 있는 함수로 변경하기 및 실행
function kakaoMaps(jsonStr) {
	// console.log(jsonStr.length);
	let coordinateStr = "";
	let coordinateList = [];
	let reverse = jsonStr[0].reverse();
	for (let i = 0; i < reverse.length; i++) {
		if(i % 2 == 0) {
			coordinateStr += `new kakao.maps.LatLng(${reverse[i]}, `;
		}else {
			coordinateStr += `${reverse[i]}),`;
			coordinateList.push(coordinateStr);
			coordinateStr = "";
		}
		
	}

	console.log(coordinateList);
// 	new kakao.maps.LatLng(34.64010354, 126.76727138),
// new kakao.maps.LatLng(34.64009173, 126.76716808),
// new kakao.maps.LatLng(34.64021073, 126.76706943),
// new kakao.maps.LatLng(34.64022066, 126.76708272),
// new kakao.maps.LatLng(34.64027978, 126.76701157),
// new kakao.maps.LatLng(34.64040706, 126.76690646),
// new kakao.maps.LatLng(34.64042987, 126.76694795),
// new kakao.maps.LatLng(34.64055512, 126.76716679),
// new kakao.maps.LatLng(34.64046846, 126.76727945),
// new kakao.maps.LatLng(34.64038782, 126.76739295),
// new kakao.maps.LatLng(34.6403464, 126.76747444),
// new kakao.maps.LatLng(34.64031806, 126.76751289),
// new kakao.maps.LatLng(34.64018744, 126.76749377),
// new kakao.maps.LatLng(34.64017464, 126.76749088),
// new kakao.maps.LatLng(34.64013609, 126.76748054),
// new kakao.maps.LatLng(34.64011821, 126.76731981),
// new kakao.maps.LatLng(34.64011381, 126.76730554),
// new kakao.maps.LatLng(34.64010354, 126.76727138)
	// 'new kakao.maps.LatLng(33.450965145649576, 126.57020280169624),'
}






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
	})
	.fail(function (error) { // 서버요청이 에러시의 콜백함수
		console.log(error);
		// alert(error.responseJSON.errMsg);
		return reject("err");
	});
	})
	


    // $.ajax({
    //     url :`https://dapi.kakao.com/v2/local/search/address.json?query=전라남도 강진군 강진읍 남성리 170-1` 
	// 	,type:"get"
	// 	// ,dataType:"jsonp"
    //     ,headers : {'Authorization': `KakaoAK 5396bdb11af5af0741cf1ce924f30d27`}
	// 	,crossDomain:true
    //     ,dataType : 'json'
	// 	,success:function(jsonStr){
    //         console.log("-- 카카오 에서 제공하는 주소 정보 --");
    //         console.log(jsonStr);
    //         console.log(jsonStr.documents[0].address); // 지번주소
    //         console.log(jsonStr.documents[0].road_address); // 도로명 주소
    //         console.log(jsonStr.documents[0].x); 
    //         console.log(jsonStr.documents[0].y);
    //         console.log("-- 카카오 에서 제공하는 주소 정보 --");

	// 	}
	//     ,error: function(xhr,status, error){
    //         console.log(error);
	//     	alert("에러발생");
	//     }
	// });
}

const nsdi_landCharacteristicsWfs = () => {
	return new Promise((resolve, reject) => {
		$.ajax(`/coordinate/nsdi-landCharacteristicsWfs`,
			{
				method: 'post',
			}
		)
		.done(function (jsonStr) { // 서버요청이 성공시의 콜백함수
			resolve(jsonStr);
		})
		.fail(function (error) { // 서버요청이 에러시의 콜백함수
			// console.log('좌표 에러발생');
			// console.log(error);
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
	return

	
});

// getAddr3();
