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
function kakaoMaps(jsonStr, kakaoData) {
    let coordinateList = [];
    let reverse = jsonStr[0].reverse();
    for (let i = 0; i < reverse.length; i++) {
        if (i % 2 == 0) {
        } else {
            coordinateList.push(new kakao.maps.LatLng(reverse[i - 1], reverse[i]),);
        }
    }

    let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(kakaoData[0].y, kakaoData[0].x), // 지도의 중심좌표
            level: 2 // 지도의 확대 레벨  
        };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다 
    let polygonPath = coordinateList;
    // let polygonPath = [
    //     new kakao.maps.LatLng(34.64010354, 126.76727138),
    //     new kakao.maps.LatLng(34.64009173, 126.76716808), .....
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


