


// daum.maps.event.addListener(polygon, 'click', function () {
//     editpolygon = null;
//     var check = confirm('구역을 수정하시겠습니까?');
//     if (check) {
//         var path = polygon.getPath();
//         manager.put(daum.maps.drawing.OverlayType.POLYGON, path);
//         editpolygon = polygon;
//         console.log('editpolygon : ', editpolygon);
//         for (var i = 0, len = areas.length; i < len; i++) {
//             if (areas[i].polygon == editpolygon) {
//                 selectKey = areas[i].key;
//                 break;
//             }
//         }
//         editFlag = true;
//         newFlag = false;
//     }
// });


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


