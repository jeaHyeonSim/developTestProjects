const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');

/* ========================================== */
/* ============ 주소기반 검색 API ============ */
/* ========================================== */
// 사용자가 입력한 주소 검색 API
let addr_list = new Array(); // 조회한 주소 데이터 담을 배열
router.get('/addrLinkApi', async (req, res) => {
	try {
		let confmKey = properties.confmKey;
		let txt = req.query.txt;
		let url = encodeURI(`https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${txt}&resultType=json&confmKey=${confmKey}`);
		await axios.get(url).then((ress) => {
			let data = ress.data.results.juso;
			for (let i = 0; i < data.length; i++) {
				addr_list[i] = data[i];
			}
			return res.send(ress.data);
		})
		.catch((err) => {
			console.log("주소 검색 ERR : ", err);
		})
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
		pnu += addr_data['mtYn'] == "1"?0:1 ;
		pnu += pd(addr_data['lnbrMnnm']);
		pnu += pd(addr_data['lnbrSlno']);
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

router.get('/addr_data', (req, res) => {
	// console.log();
	// console.log(req.query.addr_type);
	// console.log(JSON.parse(req.query.addr_data));
	// console.log(req.session.pnu);
			
	let addr_type = req.session.addr_type;
	let addr_data = req.session.addr_data;
	let pnu = req.session.pnu;
	// console.log(addr_type);
	// console.log(addr_data);
	res.render('main/dialog.html');
})

module.exports = router;