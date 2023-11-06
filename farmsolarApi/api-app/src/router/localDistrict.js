const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require("moment");
const localDistrict = require('../services/localDistrict');
const LocalDistrictService = new localDistrict();


//  위는 구코드 =================================================================================================
//  아래 사용 =================================================================================================
//  =================================================================================================

// 소유 및 기타정보 조회 - 토지소유정보속성조회
router.post('/getLandPossessionService', async (req, res) => {
    try {
              // let pnu = req.session.pnu;
        // let stdrYear = req.body.stdrYear;
        // let format = "json";
        // let numOfRows = "10";
        // let pageNo = "1";

        // // 토지소유정보속성조회
        // let possessionKey = properties.nsdi_possessionKey;
        // let rs1 = await re1Fn(possessionKey, pnu, stdrYear, format, numOfRows, pageNo);
        

        if(req.session.pnu == undefined) {
            console.log("토지소유정보속성조회 주소 부터 다시 "); 
            return "0"
        }
        let dto = {
            pnu : req.session.pnu,
            stdrYear : req.body.stdrYear,
            format : "json",
            numOfRows : "10",
            pageNo : "1",
        }

        let rs = await LocalDistrictService.getPossessionService(dto);

        if((rs.field).length <= 0) {
            return res.status(209).send("0");
        }
        let rs_d = rs.field[0];

        // 필요한 속성
        let rstDataKeys = [
            'posesnSeCodeNm',
            'ownshipChgDe',
            'ownshipChgCauseCodeNm',
            'cnrsPsnCo'
        ];
        let rstData = {};

        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1 ) {
                rstData[rstDataKeys[i]] = rs_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
    } catch (error) {
        console.log("소유 및 기타정보 - 개별공시가 ERROR");
        console.log(error);
        return res.status(409).json({
            error : error
        });
    }
});
// 소유 및 기타정보 조회 - 개별공시지가속성조회
router.post('/getLandPriceService', async (req, res) => {
    try {
        if(req.session.pnu == undefined) {
            console.log("개별공시지가속성조회 주소 부터 다시 "); 
            return "0"
        }
        let dto = {
            pnu : req.session.pnu,
            stdrYear : req.body.stdrYear,
            format : "json",
            numOfRows : "10",
            pageNo : "1",
        }

        let rs = await LocalDistrictService.getIndvdLandPriceService(dto);
        if((rs.field).length <= 0) {
            return res.status(209).send("0");
        }
        let rs_d = rs.field[0];

        // 필요한 속성
        let rstDataKeys = [
            'pblntfPclnd',
            'pblntfDe'
        ];
        let rstData = {};

        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1 ) {
                rstData[rstDataKeys[i]] = rs_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
    } catch (error) {
        console.log("소유 및 기타정보 ERROR");
        console.log(error);
        return res.status(409).json({
            error : error
        });
    }
});

// 건축물 정보 - 국토교통부_건축물대장 표제부 조회
router.get('/getBldRgstService', async (req, res) => {
    try {
        if(req.session.addr_data == undefined) {
            console.log("건축물 정보 주소 부터 다시"); 
            return "0"
        }
        let addr_data = req.session.addr_data;
        let dto = {
            pnu : req.session.pnu,
            sigunguCd : addr_data.sigunguCd,  // 시군구코드-행정표준코드
            bjdongCd : addr_data.bjdongCd,  // 법정동코드-행정표준코드
            bun : addr_data.bun,  // 번-번지
            ji : addr_data.ji,  // 지-번지
            platGbCd : addr_data.platGbCd,  // 대지구분코드
            _type : "json"
        }
        let rs =  await LocalDistrictService.getBldRgstService_v2(dto);

        if ((rs.response.body.items.item).length <= 0) {
            return res.status(209).send("0");
        }
        // 필요한 데이터 초기화
        let rsInfo = {
            'cnt': 0, 
            'archArea': 0,
            'mainPurpsCdNm': [],
            'etcPurps': [],
            'pmsDay': ""
        };
        let rsData = rs.response.body.items.item;
        rsInfo['cnt'] = rs.response.body.totalCount;
        rsData.some((el, index) => {
            rsInfo['archArea'] = Number(rsInfo['archArea']) + Number(el.archArea);
            rsInfo['mainPurpsCdNm'].push(el.mainPurpsCdNm);
            rsInfo['etcPurps'].push(el.etcPurps);
            rsInfo['pmsDay'] = moment(el.pmsDay, "YYYYMMDD").format("YYYY-MM-DD");
        });
        return res.status(200).json(rsInfo);

    } catch (error) {
        console.log("건축물 정보 ERROR");
        console.log(error);
        return res.status(409).json({
            error: error
        });
    }
});


// eum에으로 요청
router.get('/getEum', async (req, res) => {
	console.log("getEum");
	try {
        if(req.session.addr_data == undefined) {
            console.log("getEum 정보 주소 부터 다시"); 
            return "0"
        }
        let addr_data = req.session.addr_data;
        let dto = {
            pnu : req.session.pnu,
            authCd : addr_data.sigunguCd,  // 시군구코드-행정표준코드
        }

        let rs = await LocalDistrictService.getEum(dto);

		return res.send(rs);
	} catch (error) {
		console.log("토지e음 조회");
		console.log(error);
		return;
	}


});



module.exports = router;