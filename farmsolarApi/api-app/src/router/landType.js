const express = require('express');
const router = express.Router();
const landType = require('../services/landType');
const LandTypeService = new landType();

// 토지특성속성조회,토지이동이력속성 조회하기
router.get('/nsdi-landTypeSearch', async (req, res) => {
    // console.log("토지유형 조회");
    try {
        let dto = {
            pnu : req.session.pnu,
            stdrYear : "2023",
            format : "json",
            numOfRows : "10",
            pageNo : "1",
            startDt : "",
            endDt : ""
        }
        // 국가공간 - 토지특성속성조회
        let rs1 = await LandTypeService.getLandCharacteristicsService(dto);
           // 국가공간 - 토지이동이력속성조회
        let rs2 = await LandTypeService.getLandMoveService(dto);
        // 필요한 속성
        let rstDataKeys = [
            'lndcgrCodeNm',
            'lndpclAr',
            'tpgrphHgCodeNm',
            'tpgrphFrmCodeNm',
            'roadSideCodeNm',
            'ladMvmnPrvonshCodeNm'
        ];
        let rs1_d = rs1.field[0];
        let rs2_d = rs2.field[0];
        let rstData = {};
        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1) {
                rstData[rstDataKeys[i]] = rs2_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
        
    } catch (error) {
        console.log("landTypeSearch ERROR : ");
        console.log(error);
        return res.status(600).send({ errorMsg: error.message });
    }
});










module.exports = router;