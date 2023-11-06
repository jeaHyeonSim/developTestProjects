const express = require('express');
const router = express.Router();
const coordinate = require('../services/coordinate');
const CoordinateService = new coordinate();

// 토지영역 좌표 [ 국가공간 - 토지특성WFS조회 REST API ]
router.post('/nsdi-landCharacteristicsWfs', async (req,res) => {
    
    try {
        let dto = {
            pnu : req.session.pnu
        }
        let rsList = await CoordinateService.getNsdi_landCharacteristicsWfs(dto);
        // console.log(rsList.length);
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
        if(req.session.addr_data == undefined) {
            console.log("kakao 지도 좌표값 주소부터 다시");
            return "0"
        }
        let dto = {
            jibunAddr : req.session.addr_data != undefined ? req.session.addr_data.jibunAddr  : false
        }
        let rsData = await CoordinateService.getKakao_kakaoAddress(dto);
        return res.status(200).json(rsData.documents);
    } catch (error) {
        console.log("kakao 좌표 정보 ERROR => ",error);
        return res.status(501).json(error);
    }
});


module.exports = router;


