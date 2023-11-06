// const jusoApi = require("../models/jusoApi");
// const JusoAPIModel = new jusoApi();
const axios = require('axios');
const properties = require('../config/properties');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class LandTypeApiService {
     // 국가공간 - 토지특성속성조회
    async getLandCharacteristicsService(dto) {
        return new Promise((resolve, reject)=> {
            try {
                let authkey = properties.nsdi_landCharacteristicsKey;
                let xhr = new XMLHttpRequest();     
                let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/LandCharacteristicsService/attr/getLandCharacteristics"; /*URL*/     
                let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
                parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(dto.pnu); /* 고유번호(8자리 이상) */  
                parameter += "&" + encodeURIComponent("stdrYear") + "=" + encodeURIComponent(dto.stdrYear); /* 기준연도(YYYY: 4자리) */  
                parameter += "&" + encodeURIComponent("format") + "=" + encodeURIComponent(dto.format); /* 응답결과 형식(xml 또는 json) */  
                parameter += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(dto.numOfRows); /* 검색건수 */  
                parameter += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(dto.pageNo); /* 페이지 번호 */  
                xhr.open('GET', HttpUrl + parameter);     
                xhr.send();
                xhr.onreadystatechange = function () {     
                    if (this.readyState == 4 && this.status == 200) {     
                        let jsonData = JSON.parse(this.responseText);
                        let rs = jsonData[Object.keys(jsonData)];
                        resolve(rs);
                    }
                };  
                return
            } catch (error) {
                console.log("토지유형 조회  에러 ", error);
                return reject(error);
            }
            
        });
    }

    // 국가공간 - 토지이동이력속성조회
    async getLandMoveService(dto) {
            return new Promise((resolve, reject)=> {
                try {
                    let authkey = properties.nsdi_landMoveAttrKey;
                    let xhr = new XMLHttpRequest();     
                    let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/LandMoveService/attr/getLandMoveAttr"; /*URL*/     
                    let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
                    parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(dto.pnu); /* 고유번호(8자리 이상) */  
                    parameter += "&" + encodeURIComponent("startDt") + "=" + encodeURIComponent(dto.startDt); /* 기준연도(YYYY: 4자리) */  
                    parameter += "&" + encodeURIComponent("endDt") + "=" + encodeURIComponent(dto.endDt); /* 기준연도(YYYY: 4자리) */  
                    parameter += "&" + encodeURIComponent("format") + "=" + encodeURIComponent(dto.format); /* 응답결과 형식(xml 또는 json) */  
                    parameter += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(dto.numOfRows); /* 검색건수 */  
                    parameter += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(dto.pageNo); /* 페이지 번호 */  
                    xhr.open('GET', HttpUrl + parameter);     
                    xhr.send();
                    xhr.onreadystatechange = function () {     
                        if (this.readyState == 4 && this.status == 200) {     
                            let jsonData = JSON.parse(this.responseText);
                            let rs = jsonData[Object.keys(jsonData)];
                            resolve(rs);
                        }
                    };  
                    return
                } catch (error) {
                    console.log("토지유형 조회  에러 ", error);
                    return reject(error);
                }

            });

        
    }

}

module.exports = LandTypeApiService;