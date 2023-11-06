const express = require('express');
const router = express.Router();
const lawApiService = require('../services/lawAPI');
const LawApiServiceService = new lawApiService();
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');


// 엑셀파일로 저장된 전국 기관코드 가져오기
const readFileCode = (name) => {
    let pathFiles2 = path.join(__dirname, '../webapp/public/assets');
    return new Promise((resovle, reject) => {
        fs.readFile(`${pathFiles2}/기관코드.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            resovle(JSON.parse(data));
        });
    });
}

const searchData = (data, sel, text1, text2) => {
    return new Promise((resovle, reject) => {
        if(sel == 'lawSearch'){
            // 목록조회에 사용할 기관코드 가져오기(엑셀 파일로 저장되어 있음)
            data.some((el, index) => {
                let a = el['전체기관명'].indexOf(text1);
                let a2 = el['최하위기관명'].indexOf(text2);
                if(a >= 0 && a2 >= 0) {
                    resovle(el);
                    return true;
                }
                if (index == data.length - 1) {
                    resovle("0");
                    return true;
                }   
            });
            // `{
            //     '기관코드': 3000000,
            //     '전체기관명': '서울특별시 종로구',
            //     '최하위기관명': '종로구',
            //     '폐지구분': '현존'
            // }`
        }
        if(sel == 'lawService'){
            // 본문 조례 내용중에 태양광발전시설에 대한 파트만 가져오기
            data.some((el, index) => {
                let a = el['조내용']['_cdata'].indexOf(text1);
                if (a > 1) {
                    resovle(el);
                    return true;
                }
                if (index == data.length - 1) {
                    resovle("0");
                    return true;
                }   
            });
        }
    });
}

let oc = 'simjh7601';
// 국가법령정보(조례정보 목록-법규ID)
router.get('/getLawDataList', async (req, res) => {
    try {
        let addr_data = req.session.addr_data;
        if(addr_data == undefined) { // 테스트 용 -> 주소검색 후 접속하면 무조건 있어야할 데이터
            console.log("세션 초기화 => 주소부터 다시 시작");
            return res.send("0");
        }
        let siNm = addr_data.siNm;
        let sggNm = addr_data.sggNm;
        // `
        // - 도 -
        // siNm : 전라남도, sggNm : 강진군
        // - 광역시 -
        // sggNm: '광산구', siNm: '광주광역시',
        // `

        // 도로명주소 데이터에서 지역명 파라미터 받기
        let code = await readFileCode();
        // 도·특별시·광역시 기관코드조회
        let codeHigher = await searchData(code.Sheet1, 'lawSearch', siNm, siNm);
        // 시·군·구 기관코드조회
        let codeSub = await searchData(code.Sheet1, 'lawSearch', `${siNm} ${sggNm}`, sggNm);
        // codeHigher ::  { '기관코드': 6460000, '전체기관명': '전라남도', '최하위기관명': '전라남도', '폐지구분': '현존' }
        // codeSub ::  { '기관코드': 4920000, '전체기관명': '전라남도 강진군', '최하위기관명': '강진군', '폐지구분': '현존' }
        if(codeHigher == "0" || codeSub == "0"){
            return res.status(409).send({ errorMsg: "NO Search Data" });
        }
        let dto = {
            type : `xml`,
            knd : `30001`, // 법령종류 // 30001-조례(고정)
            org : codeHigher['기관코드'], // 도·특별시·광역시 기관코드
            sborg : codeSub['기관코드'], // 시·군·구 기관코드
            query : ""
        }

        // 광역시/도/특별시 조례검색
        dto.query = siNm + "도시계획";
        let re1 = await LawApiServiceService.getLawSearchHigherList(dto);
        // 구/군/시 조례검색
        dto.query = sggNm + "도시계획"; 
        let re2 = await LawApiServiceService.getLawSearchLowerList(dto);

        // XML => JSON 
        let jsonData1 =  JSON.parse( convert.xml2json(re1.data, {compact: true, spaces: 4}));
        let jsonData2 =  JSON.parse( convert.xml2json(re2.data, {compact: true, spaces: 4}));
        
        let jsonData1Cnt = Number(jsonData1.OrdinSearch.totalCnt['_text']);
        let jsonData2Cnt = Number(jsonData2.OrdinSearch.totalCnt['_text']);
        
        // 조회한 정보가 1개 또는 여러개 일 경우 
        // 1개면 배열에 담고, 여러개면 바로 담는다.
        let resultData = {};
        if(jsonData1Cnt > 1) { resultData.jsonData1 = jsonData1.OrdinSearch.law;}
        else { resultData.jsonData1 = [jsonData1.OrdinSearch.law];}
        if(jsonData2Cnt > 1) { resultData.jsonData2 = jsonData2.OrdinSearch.law;}
        else { resultData.jsonData2 = [jsonData2.OrdinSearch.law];}

        // 자치법규ID - 본문조회용
        req.session.lawId = jsonData2.OrdinSearch.law['자치법규ID']._text;
        req.session.save(()=> {
            return res.status(200).json(resultData);
        });
    } catch (error) {
        console.log("lawData_0 ERROR : ");
        console.log(error);
        return res.status(600).send({ errorMsg: error.message });
    }
});

// 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준  [ XML -> JSON ]
router.get('/getLawDataMain', async (req, res) => {
    try {
        let dto = {
            type : 'xml',
            id : req.session.lawId // 자치법규ID
        }
        let re = await LawApiServiceService.getLawSearchMain(dto);

        let jsonData =  JSON.parse( convert.xml2json(re.data, {compact: true, spaces: 4}));
        let lawDataArr = jsonData.LawService['조문']['조'];
        let serarchText = await searchData(lawDataArr, 'lawService', '태양광발전시설', "");
        return res.send(serarchText);
    } catch (error) {
        console.log("lawData_1 ERROR : ");
        console.log(error);
        return error;
    }
});

module.exports = router;