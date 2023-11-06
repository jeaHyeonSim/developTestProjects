// const jusoApi = require("../models/jusoApi");
// const JusoAPIModel = new jusoApi();
const axios = require('axios');
const properties = require('../config/properties');
class LawApiService {
    constructor() {
        this.OC = properties.lawKey;
    }

    // 국가법령정보(자치법규 목록 조회) - 광역시/도/특별시 조례검색
    async getLawSearchHigherList(dto) {
        try {
            let url1 = encodeURI(`https://www.law.go.kr/DRF/lawSearch.do?OC=${this.OC}&target=ordin&query=${dto.query}&type=${dto.type}&knd=${dto.knd}&org=${dto.org}`);
            let re1 = await axios.get(url1);
            return re1;
        } catch (error) {
            return error;
        }
    }

    // 국가법령정보(자치법규 목록 조회) - 구/군/시 조례검색
    async getLawSearchLowerList(dto) {
        try {
            let url2 = encodeURI(`https://www.law.go.kr/DRF/lawSearch.do?OC=${this.OC}&target=ordin&query=${dto.query}&type=${dto.type}&knd=${dto.knd}&org=${dto.org}&sborg=${dto.sborg}`);
            let re2 = await axios.get(url2);
            return re2;
        } catch (error) {
            return error;
        }
    }
    // 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
    async getLawSearchMain(dto) {
        try {
            let url = encodeURI(`https://www.law.go.kr/DRF/lawService.do?OC=${this.OC}&target=ordin&type=${dto.type}&ID=${dto.id}`);
            let re = await axios.get(url);
            return re;
        } catch (error) {
            return error;
        }
    }



}

module.exports = LawApiService;