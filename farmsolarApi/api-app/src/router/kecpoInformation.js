const express = require('express');
const router = express.Router();
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');
const kecpoInformation = require('../services/kecpoInformation');
const KecpoInformationService = new kecpoInformation();


// 엑셀파일로 저장된 전국 기관코드 가져오기
const readFileCode = (name) => {
    let pathFiles2 = path.join(__dirname, '../webapp/public/assets');
    return new Promise((resovle, reject) => {
        fs.readFile(`${pathFiles2}/kecpo사업소정보.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            resovle(JSON.parse(data));
        });
    });
}

// 전력계통 - 한국전력공사 분산전원 연계정보
router.get('/getGenerationService', async (req, res) => {
    try {
        // if(req.session.addr_data == undefined) {
        //     console.log("건축물 정보 주소 부터 다시"); 
        //     return "0"
        // }
        let addr_data = req.session.addr_data;

        let dto = {
            addrDo : addr_data.siNm,
            addrSi : "",
            addrGu : addr_data.sggNm,
            addrLidong : "",
            addrLi : addr_data.liNm,
            addrJibun : "170-1"`${addr_data.bun}-${addr_data.ji}`,
            substCd : ""
        }

        let rs = await KecpoInformationService.getGenerationService(dto);
        console.log("43번줄 ");
        console.log(rs.response.body.items);
        let rsList = rs.response.body.items;
        return res.json(rsList);
    } catch (error) {
        return (error);
    }
})


/**
 * 
 * @param {json} data 
 * @param {지사이름} text1 
 * @param {지역번호} text2 
 * @returns 
 */
const searchData = (data, text1, text2) => {
    return new Promise((resovle, reject) => {
        // 목록조회에 사용할 기관코드 가져오기(엑셀 파일로 저장되어 있음)
        data.some((el, index) => {
            let a = el['지사'].indexOf(text1);
            let a2 = el['번호'].indexOf(text2);
            if(a >= 0 && a2 >= 0) {
                resovle(el);
                return true;
            }
            if (index == data.length - 1) {
                resovle("0");
                return true;
            }   
        });
        // [
        //     { '지사': '서울지역 본부직할', '번호': '02-758-3433' },
        // ....
        
    });
}

router.get('/getBusinessInfoService', async (req, res) => {
    let info = await readFileCode();
    // console.log(info.Sheet1);
    searchData(info.Sheet1, "");
    console.log(req.session);
});



module.exports = router;