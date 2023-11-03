const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let proj4 = require('proj4');
router.get('/vworldAPI3', async function (req, res) {
	let arr5174 = [
		169779.14,
		185584.879
	];
	let arr5174All = [
		169779.14,
		185584.879,

		169835.25,
		185539.379,

		169870.05,
		185582.299,

		169813.93,
		185627.799,
	];

	let arr900913 = [
		1.4068568559086557E7,
		4424310.719125545,

	];
	let arr900913All = [
		1.4068568559086557E7,
		4424310.719125545,
		1.4231986854239704E7,
		4619376.856818209
	];

	// 국가공간 토지특성WFS조회 정보
	let arr5179All = [
		924332.39663099, 1686283.05165414, 
		924388.25847712, 1686237.28684275, 
		924423.26103982, 1686280.01703969, 
		924367.38920167, 1686325.78190201, 
	];
	let arr5179 = [
		924332.39663099, 
		1686283.05165414
	];
	// EPSG:4019  (Korean 2000)
	let arr4019All_2 = [
		126.67113135, 35.16647099,
		126.67174897, 35.16606252,
		126.67212942, 35.16645046,
		126.67151169, 35.16685894,
	];
	// V-WORD 토지소유정보WFS조회 정보
	let arr5179All_2 = [
		924332.3713692,1686283.05573868,
		924367.36393998,1686325.7859865,
		924423.23577799,1686280.02112397,
		924388.23321517,1686237.29092707,
	];
	let arr5179_2 = [
		924332.3713692,1686283.05573868
	];
	// EPSG:4326  (Korean 1995) WGS84 카카오
	let arr4326All = [
		126.66907884,35.16897513,
		126.66945915,35.16936303,
		126.67007683,35.16895461,
		126.66969641,35.16856671,
	];
	let arr4326 = [
		126.66907884,35.16897513
	];
	// EPSG:4019  (Korean 2000)
	let arr4019All = [
		126.66907884,35.16897513,
		126.66945915,35.16936304,
		126.67007683,35.16895461,
		126.66969641,35.16856671,
	];
	let arr4019 = [
		126.66907884,35.16897513
	];



	try
	{
		console.log("공간좌표");
		
		// *UTM-K (GRS80 중부원점): 네이버지도에서 사용중인 좌표계
		let eps5179 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
		// *보정된 중부원점(Bessel): KLIS에서 중부지역에 사용중
		let eps5174 = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
		//wgs84(위경도)좌표계
		let wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

		//*Google Mercator: 구글지도/빙지도/야후지도/OSM 등 에서 사용중인 좌표계

		// EPSG:3857(공식), EPSG:900913(통칭) 구글
		let eps900913 =  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";

		// let bbb = [];
		// for (let i = 0; i < (arrB.length)/2; i++) {
		// 	let grs80P = proj4(grs80, wgs84, arrB);
		// 	console.log("grs80P :: ", grs80P);
		// 	bbb[i] = [];
			
		// }
		// let grs80P = proj4(eps5179, wgs84, arrA);
		// console.log("grs80P 변환좌표 => ", grs80P);


		// let eps5174P = proj4(eps5174, wgs84, arr5174);
		// console.log("eps5174P 변환좌표 => ", eps5174P);


		let eps900913P = proj4(eps900913, wgs84, arr900913);
		console.log("eps900913P 변환좌표 => ", eps900913P);
	
	} catch (error) {
		return(error)
	}
});


// 토지유형/좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
const nsdi_landCharacteristicsWfs = (authkey, pnu) => {
    const convert = require('xml-js');

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();     
        let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/LandCharacteristicsService/wfs/getLandCharacteristicsWFS"; /*URL*/     
        let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
        parameter += "&" + encodeURIComponent("typename") + "=" + encodeURIComponent('F251'); /* 질의 대상인 하나 이상의 피처 유형 이름의 리스트, 값은 쉼표로 구분화면 하단의 [레이어 목록] 참고 */  
        // parameter += "&" + encodeURIComponent("bbox") + "=" + encodeURIComponent(); /* 좌표로 이루어진 사각형 안에 담겨 있는 (또는 부분적으로 걸쳐 있는) 피처를 검색. 좌표 순서는 사용되는 좌표 시스템을 따름.일반적 표현은 하단좌표, 상단좌표, 좌표체계 순서입니다.(lc1,lc2,uc1,uc2,좌표체계) */  
        parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(pnu); /* 필지고유번호 19자리중 최소 8자리(시도[2]+시군구[3]+읍면동[3])(입력시 bbox값은 무시) */  
        parameter += "&" + encodeURIComponent("maxFeatures") + "=" + encodeURIComponent(10); /* 요청에 대한 응답으로 WFS가 반환해야하는 피처의 최대 값(최대 허용값 : 100) */  
        parameter += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent('results'); /* 요청에 대하여 WFS가 어떻게 응답할 것인지 정의.results 값은 요청된 모든 피처를 포함하는 완전한 응답이 생성되어야 함을 나타내며, hits 값은 피처의 개수만이 반환되어야 함을 의미 */  
        parameter += "&" + encodeURIComponent("srsName") + "=" + encodeURIComponent('EPSG:4326'); /* 반환되어야 할 피처의 기하에 사용되어야 할 WFS가 지원하는 좌표체계 */  

        xhr.open('GET', HttpUrl + parameter);     
        xhr.send();
        xhr.onreadystatechange = function () {     
            
            // 여러개중 조건문에 해당하는 부분에 데이터 있음
            if (this.readyState == 4 && this.status == 200) {
                try {
                    let xmlTojsonString = convert.xml2json( this.responseText, {compact: true, spaces: 4});
                    let jsonStringTojson = JSON.parse(xmlTojsonString);
    
                    let jsonData = jsonStringTojson['wfs:FeatureCollection']['gml:featureMember']['NSDI:F251'];
                    let posListData = jsonData['NSDI:SHAPE']['gml:Polygon']['gml:exterior']['gml:LinearRing']['gml:posList'];
                    let jsonDataKeys = Object.keys(jsonData);
                    
    
                    let rsDataList = [];
                    let posList = posListData['_text'].split(" ");
                    rsDataList[0] = posList;
                    // 좌표 정보 말고 다른 정보는 토지특성WFS조회 말구 토지특성조회 에서 찾아사용하기?
                    return resolve(rsDataList);
                } catch (error) {
                    let xmlTojsonString = convert.xml2json( this.responseText, {compact: true, spaces: 4});
                    let jsonStringTojson = JSON.parse(xmlTojsonString);


                    if(!jsonStringTojson['gml:featureMember'] || jsonStringTojson['response']){
                        return reject({errMsg : jsonStringTojson.response.resultMsg._text});
                    }else if(jsonStringTojson['gml:featureMember'] || !jsonStringTojson['response']){
                        return reject({errMsg : 'No response data'});
                    }else {
                        return reject({errMsg : error});
                    }
                }
            }
        };     
    });
}

// 토지유형/좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
router.post('/nsdi-landCharacteristicsWfs', async (req,res) => {
    try {
        let landCharacteristicsWfsKey = properties.nsdi_landCharacteristicsWfsKey;
        let pnu = req.session.pnu;
        let rsList = await nsdi_landCharacteristicsWfs(landCharacteristicsWfsKey, pnu);

        console.log(rsList.length);
        if(rsList.length <= 0) {
            res.send("No search data");
        }
        return res.status(200).json(rsList);
    
    } catch (error) {
        console.log("토지특성WFS조회 ERROR => ",error);
        return res.status(501).json(error);
    }
});

// kakao 지도 좌표값 얻기
router.post('/kakao-kakaoAddress', async (req,res) => {
    try {
        let jibunAddr =  req.session.addr_data != undefined ? req.session.addr_data.jibunAddr  : false; // 
        let kakaoAKkey = properties.kakaoAKkey;
        let url = encodeURI(`https://dapi.kakao.com/v2/local/search/address.json?query=${jibunAddr}`);

        let re = await axios.get(url, {
            headers : {'Authorization': `KakaoAK ${kakaoAKkey}`}
        });
        if(re.data.meta.total_count > 0){
            return res.status(200).json(re.data.documents);
        }else {
            return res.status(200).json("0");
        }
    
    } catch (error) {
        console.log("kakao 좌표 정보 ERROR => ",error);
        return res.status(501).json(error);
    }
});


module.exports = router;


