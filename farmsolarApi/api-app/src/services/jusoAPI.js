// const jusoApi = require("../models/jusoApi");
// const JusoAPIModel = new jusoApi();
const axios = require('axios');
const properties = require('../config/properties');

// let addr_list = new Array();
class JusoApiService {
    async getAddrLinkApi(dto) {
		let rsData;
		let confmKey = properties.confmKey;
		let txt = dto.txt;
		let url = encodeURI(`https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${txt}&resultType=json&confmKey=${confmKey}`);
		await axios.get(url)
		.then((ress) => {
			rsData = ress.data;
		})
		.catch((err) => {
			console.log("주소 검색 ERR : ", err);
			rsData = err;
		})
		return rsData;
    }

}

module.exports = JusoApiService;