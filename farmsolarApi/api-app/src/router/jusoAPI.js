const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const jusoAPI = require('../services/jusoAPI');
const JusoApiService = new jusoAPI();
/* ========================================== */
/* ============ 주소기반 검색 API ============ */
/* ========================================== */
// 사용자가 입력한 주소 검색 API
let addr_list = new Array(); // 조회한 주소 데이터 담을 배열
router.get('/addrLinkApi', async (req, res) => {
	let dto = {
		txt : req.query.txt
	}
	try {
		let rsData = await JusoApiService.getAddrLinkApi(dto);
		if(rsData.results.juso == undefined || rsData.results.juso == null) {
			return "0"
		}
		let data = rsData.results.juso;
		for (let i = 0; i < data.length; i++) {
			addr_list[i] = data[i];
		}
		return res.send(rsData);
	} catch (error) {
		console.log("주소 검색 ERROR : ", error);
	}
});

// 주소 검색 후 => 설치타입 클릭시 호출
router.get('/addrLinkMove', async (req, res) => {
	try {
		let addr_type = req.query.addr_type;
		let addr_index = req.query.addr_index;
		let addr_data = addr_list[addr_index];
		let pnu = "";
		pnu += addr_data['admCd'];
		pnu += addr_data['mtYn'] == "0"? "0":"1";
		pnu += pd(addr_data['lnbrMnnm']); // 번
		pnu += pd(addr_data['lnbrSlno']); // 지
		addr_data['pnu'] = pnu;
		addr_data['platGbCd'] = addr_data['mtYn'] == "0"? "0":"1";
		addr_data['bun'] = pd(addr_data['lnbrMnnm']);
		addr_data['ji'] = pd(addr_data['lnbrSlno']);
		addr_data['sigunguCd'] = addr_data['admCd'].slice(0,5); // 시군구코드-행정표준코드
		addr_data['bjdongCd'] = addr_data['admCd'].slice(5); // 법정동코드-행정표준코드

		function pd(str){
			let rs = "";
			if(str.length == 1){
				rs = `000${str}`;
			}
			if(str.length == 2){
				rs = `00${str}`;
			}
			if(str.length == 3){
				rs = `0${str}`;
			}
			if(str.length == 4){
				rs = `${str}`;
			}
			return rs;
		}

		req.session.addr_type = addr_type;
		req.session.addr_data = addr_data;
		req.session.pnu = pnu;

		req.session.save( (err) => {
			return res.redirect('/jusoAPI/addr_data');
        });
	} catch (error) {
		console.log("addrLinkMove ERROR : ", error);
		return res.redirect('/juso');
	}
});
// 설치 타입 선택 후 => 페이지 이동
router.get('/addr_data', (req, res) => {
	let addr_type = req.session.addr_type;
	let addr_data = req.session.addr_data;
	let pnu = req.session.pnu;
	res.redirect('/step0');
})

module.exports = router;