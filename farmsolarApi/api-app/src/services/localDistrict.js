// const jusoApi = require("../models/jusoApi");
// const JusoAPIModel = new jusoApi();
const axios = require('axios');
const properties = require('../config/properties');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class LocalDistrictApiService {
    // 국가법령정보(자치법규 목록 조회) - 광역시/도/특별시 조례검색
    async getPossessionService(dto) {
        return new Promise(function (resolve, reject) {
            try {
                let authkey = properties.nsdi_possessionKey;
                let xhr = new XMLHttpRequest();     
                let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/PossessionService/attr/getPossessionAttr"; /*URL*/     
                let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
                parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(dto.pnu); /* 고유번호(8자리 이상) */  
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
            } catch (error) {
                reject(error);
            }
    });

    }

    // 국가법령정보(자치법규 목록 조회) - 구/군/시 조례검색
    async getIndvdLandPriceService(dto) {
        return new Promise(function (resolve, reject) {
            try {
                let authkey = properties.nsdi_indvdLandKey;
                let xhr = new XMLHttpRequest();     
                let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr"; /*URL*/     
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
            } catch (error) {
                reject(error);
            }
        });
    }
    // 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
    async getBldRgstService_v2(dto) {
        try {
            let rsData;
            let serviceKey = properties.bldKey;
            let url = `https://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo`;
            let queryParams = '?' + encodeURIComponent('serviceKey') + `=${serviceKey}`; /* Service Key*/
                queryParams += '&' + encodeURIComponent('sigunguCd') + '=' + encodeURIComponent(dto.sigunguCd); /* */
                queryParams += '&' + encodeURIComponent('bjdongCd') + '=' + encodeURIComponent(dto.bjdongCd); /* */
                queryParams += '&' + encodeURIComponent('platGbCd') + '=' + encodeURIComponent(dto.platGbCd); /* */
                queryParams += '&' + encodeURIComponent('bun') + '=' + encodeURIComponent(dto.bun); /* */
                queryParams += '&' + encodeURIComponent('ji') + '=' + encodeURIComponent(dto.ji); /* */
                queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
                queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
                
                // queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent(''); /* */
                // queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent(''); /* */
            await axios.get(url + queryParams,{
                headers: {
                    'Content-Type' : 'application/xml;charset=UTF-8'
                }
            })
            .then((ress) => {
                // console.log(ress.data);
                rsData = ress.data;
            })
            .catch((err) => {
                console.log(err);
                rsData = err;
            })

            return rsData
        } catch (error) {
            return (error);
        }
    }

    // eum에 요청
    async getEum(dto) {
        try {
            // 한글 깨지는 현상 인코딩 하기
            let iconv = require('iconv-lite');
            let url = encodeURI(`https://www.eum.go.kr/web/ar/lu/luLandDetActPopAjax.jsp?luGrStr=발전시&ucodes=발전소로 사용되는 건축물&authCd=${dto.authCd}&pnu=${dto.pnu}`)
            let response = await axios.get(url, {
                responseType: 'arraybuffer',
            });
    
            let contentType = response.headers['content-type'];
    
            let charset = contentType.includes('charset=')
                ? contentType.split('charset=')[1]
                : 'EUC-KR';
    
            let responseData = await response.data;
    
            let data = iconv.decode(responseData, charset);
            return data;
        } catch (error) {
            return error
        }

    }


}

module.exports = LocalDistrictApiService;