


// daum.maps.event.addListener(polygon, 'click', function () {
//     editpolygon = null;
//     let check = confirm('구역을 수정하시겠습니까?');
//     if (check) {
//         let path = polygon.getPath();
//         manager.put(daum.maps.drawing.OverlayType.POLYGON, path);
//         editpolygon = polygon;
//         console.log('editpolygon : ', editpolygon);
//         for (let i = 0, len = areas.length; i < len; i++) {
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
    let coordinateStr = "";
    let coordinateList = [];
    let coordinateList2 = [];
    let reverse = jsonStr[0].reverse();
    console.log(new kakao.maps.LatLng().la);
    for (let i = 0; i < reverse.length; i++) {
        if (i % 2 == 0) {
            coordinateStr += `new kakao.maps.LatLng(${reverse[i]}, `;
        } else {
            coordinateStr += `${reverse[i]}),`;
            coordinateList.push(coordinateStr);
            coordinateList2.push(new kakao.maps.LatLng(reverse[i - 1], reverse[i]),);
            coordinateStr = "";
        }

    }

    // console.log(coordinateList);
    // console.log(coordinateList2);


    let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(34.6403079026262, 126.767226879428), // 지도의 중심좌표
            level: 2 // 지도의 확대 레벨  
        };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다 
    let polygonPath = coordinateList2;
    // let polygonPath = [
    //     new kakao.maps.LatLng(34.64010354, 126.76727138),
    //     new kakao.maps.LatLng(34.64009173, 126.76716808),
    //     new kakao.maps.LatLng(34.64021073, 126.76706943),
    //     new kakao.maps.LatLng(34.64022066, 126.76708272),
    //     new kakao.maps.LatLng(34.64027978, 126.76701157),
    //     new kakao.maps.LatLng(34.64040706, 126.76690646),
    //     new kakao.maps.LatLng(34.64042987, 126.76694795),
    //     new kakao.maps.LatLng(34.64055512, 126.76716679),
    //     new kakao.maps.LatLng(34.64046846, 126.76727945),
    //     new kakao.maps.LatLng(34.64038782, 126.76739295),
    //     new kakao.maps.LatLng(34.6403464, 126.76747444),
    //     new kakao.maps.LatLng(34.64031806, 126.76751289),
    //     new kakao.maps.LatLng(34.64018744, 126.76749377),
    //     new kakao.maps.LatLng(34.64017464, 126.76749088),
    //     new kakao.maps.LatLng(34.64013609, 126.76748054),
    //     new kakao.maps.LatLng(34.64011821, 126.76731981),
    //     new kakao.maps.LatLng(34.64011381, 126.76730554),
    //     new kakao.maps.LatLng(34.64010354, 126.76727138)
    // ];

    // 지도에 표시할 다각형을 생성합니다
    let polygon = new kakao.maps.Polygon({
        path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: '#39DE2A', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: '#A2FF99', // 채우기 색깔입니다
        fillOpacity: 0.7 // 채우기 불투명도 입니다
    });

    // 지도에 다각형을 표시합니다
    polygon.setMap(map);

    // 다각형에 마우스오버 이벤트가 발생했을 때 변경할 채우기 옵션입니다
    let mouseoverOption = {
        fillColor: '#EFFFED', // 채우기 색깔입니다
        fillOpacity: 0.8 // 채우기 불투명도 입니다        
    };

    // 다각형에 마우스아웃 이벤트가 발생했을 때 변경할 채우기 옵션입니다
    let mouseoutOption = {
        fillColor: '#A2FF99', // 채우기 색깔입니다 
        fillOpacity: 0.7 // 채우기 불투명도 입니다        
    };

    // 다각형에 마우스오버 이벤트를 등록합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function () {

        // 다각형의 채우기 옵션을 변경합니다
        polygon.setOptions(mouseoverOption);

    });

    kakao.maps.event.addListener(polygon, 'mouseout', function () {

        // 다각형의 채우기 옵션을 변경합니다
        polygon.setOptions(mouseoutOption);

    });

    // 다각형에 마우스다운 이벤트를 등록합니다
    let downCount = 0;
    kakao.maps.event.addListener(polygon, 'mousedown', function () {
        console.log(event);
        let resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '다각형에 mousedown 이벤트가 발생했습니다!' + (++downCount);
    });



}


