const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// 토지영역 좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
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

// 토지영역 좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
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


