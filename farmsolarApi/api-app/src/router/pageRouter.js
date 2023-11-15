const express = require('express');
const router = express.Router();
const axios = require('axios');

// root: dashboard/ 

// 순서 0 : 사용자 주소 입력페이지
router.get('/', async function (req, res) {
	try {
		res.render('main/juso.html');
	} catch (error) {
		return(error)
	}
});
// 순서 1 : 주소+설치타입 선택 후=> 표시할 첫번째 페이지
router.get('/step0', async function (req, res) {
	let pnu = req.session.pnu;
	try {
		res.render('main/step0.html', {
			pnu : pnu,
			stdrYear : "2023",
			_type  : req.session.addr_type
		});
	} catch (error) {
		return(error)
	}
});


router.get('/dialog', async function (req, res) {
	try {
		res.render('main/dialog.html');
	} catch (error) {
		return(error)
	}
});
router.get('/test', async function (req, res) {
	try {
		res.render('main/test.html');
	} catch (error) {
		return(error)
	}
});
// root: dashboard/ 
router.get('/juso', async function (req, res) {
	try {
		res.render('main/juso.html');
	} catch (error) {
		return(error)
	}
});
router.get('/juso', async function (req, res) {
	try {
		res.render('view에 있는 html 파일');
	} catch (error) {
		return(error)
	}
});
router.get('/coordinate', async function (req, res) {
	try {
		res.render('main/coordinate.html');
	} catch (error) {
		return(error)
	}
});
router.get('/law', async function (req, res) {
	try {
		res.render('main/lawData.html');
	} catch (error) {
		return(error)
	}
});
router.get('/landType', async function (req, res) {
	try {
		res.render('main/landType.html');
	} catch (error) {
		return(error)
	}
});
router.get('/localDistrict', async function (req, res) {
	try {
		res.render('main/localDistrict.html');
	} catch (error) {
		return(error)
	}
});
router.get('/localDistrict-2', async function (req, res) {
	try {
		res.render('main/localDistrict-2.html');
	} catch (error) {
		return(error)
	}
});
// 한전 전력계통
router.get('/kecpoInformation', async function (req, res) {
	try {
		res.render('main/kecpoInformation.html');
	} catch (error) {
		return(error)
	}
});


module.exports = router;