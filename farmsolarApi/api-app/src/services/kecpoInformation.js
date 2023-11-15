// const jusoApi = require("../models/jusoApi");
// const JusoAPIModel = new jusoApi();
const axios = require('axios');
const properties = require('../config/properties');

class KecpoInformationApiService {
    // 전력계통 - 한국전력공사 분산전원 연계정보
    async getGenerationService(dto) {
        try {
            let rsData;
            let serviceKey = properties.openApiKey;
            let url = 'http://openapi.kepco.co.kr/service/dispersedGenerationService/getDispersedGerSearch';
            var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '6k2L7BPQSL%2FxyWg%2FxvLVQROoTjmVCHD8kZIZWSerUyQflQmCzpiISiBhJnPkJwCQup056yMhd3ivUKxOOjCPgg%3D%3D'; /* Service Key*/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
            queryParams += '&' + encodeURIComponent('addrDo') + '=' + encodeURIComponent(dto.addrDo); /* */
            queryParams += '&' + encodeURIComponent('addrSi') + '=' + encodeURIComponent(dto.addrSi); /* */
            queryParams += '&' + encodeURIComponent('addrGu') + '=' + encodeURIComponent(dto.addrGu); /* */
            queryParams += '&' + encodeURIComponent('addrLidong') + '=' + encodeURIComponent(dto.addrLidong); /* */
            queryParams += '&' + encodeURIComponent('AddrLi') + '=' + encodeURIComponent(dto.addrLi); /* */
            queryParams += '&' + encodeURIComponent('addrJibun') + '=' + encodeURIComponent(dto.addrJibun); /* */
            // queryParams += '&' + encodeURIComponent('substCd') + '=' + encodeURIComponent(dto.substCd); /* */
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

            /*
                var request = require('request');

                request({
                    url: url + queryParams,
                    method: 'GET'
                }, function (error, response, body) {
                    //console.log('Status', response.statusCode);
                    //console.log('Headers', JSON.stringify(response.headers));
                    //console.log('Reponse received', body);
                });
             */

            return rsData
        } catch (error) {
            return (error);
        }
    }



}

module.exports = KecpoInformationApiService;