const data = [
    {year:"2022", month:"7", contests:"ISO 14001 인증", text1:"", text2:""},
    {year:"2022", month:"7", contests:"ISO 14001 인증", text1:"", text2:""},
    {year:"2022", month:"7", contests:"태양광 발전 통합 모니터링 저작권 등록 (C-2022-027842)", text1:"", text2:""},
    {year:"2022", month:"7", contests:"태양광 발전량 예측 저작권 등록 (C-2022-027842)", text1:"", text2:""},
    {year:"2022", month:"8", contests:"원격단말장치 (GF-RTU01) KC인증", text1:"", text2:""},

]
let data3 = [
    [
        {year:"2020", month:"3", contests:"그린훼스코 주식회사 설립", list1:"", text2:""},
        {year:"2020", month:"3", contests:"연구개발부서 지정", list1:"", text2:""},
        {year:"2020", month:"3", contests:"조선대 창업보육센터 입주", list1:"", text2:""},
        {year:"2020", month:"3", contests:"한국산업기술진흥협회 연구개발전담부서 인정 (제 2020151669호)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"습식 미세먼지 저감장치 특허 출원 (10-2020-0027685)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"청년예비창업가발굴육성사업 ((재)광주테크노파크)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"광주SW창업랩 창업지원사업 ((재)광주정보문화산업진흥원)", list1:"", text2:""},
        {year:"2020", month:"6", contests:"초기창업패키지 (순천대창업지원단)", list1:"", text2:""},
        {year:"2020", month:"7", contests:"광주 국가혁신클러스터 지원 사업 에너지신산업 ((재)광주그린카진흥원)", list1:"", text2:""},
        {year:"2020", month:"10", contests:"습식 미세먼지 저감장치 특허 등록 (10-2171357)", list1:"", text2:""},
        {year:"2020", month:"12", contests:"여성기업 확인 (발급번호 :제 0114-2020-08102호)", list1:"", text2:""},
        {year:"2020", month:"12", contests:"지역혁신플랫폼 에너지신산업 R&D 참여 (지역혁신플랫폼 에너지신산업육성사업단)", list1:"", text2:""},
    ],
    [
        {year:"2021", month:"2", contests:"K-비대면바우처플랫폼 네이버 WORKPLACE 도입", list1:"", text2:""},
        {year:"2021", month:"2", contests:"에너지신산업 혁신생태계 OpenLab ((재)광주테크노파크)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"사물인테넛 기반 습식 미세먼지 저감장치 특허출원 (10-2021-0024819)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"신용보증기금 기술사업화자금 (운전자금 2억)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"소프트웨어 사업자등록 (B21-216160-001)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"투자유치 역량강화프로그램 IR제작 (전남대기술지주)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"중소기업 혁신바우처 (광주전남지방중소벤처기업청)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"광주디자인센터 디자인개발 지원", list1:"", text2:""},
        {year:"2021", month:"7", contests:"그린훼스코 나주지사 설립 (647-85-01673)", list1:"", text2:""},
        {year:"2021", month:"9", contests:"ISO-9001 인증", list1:"", text2:""},
        {year:"2021", month:"10", contests:"한전기술이전 심층신경망기반 수요예측 장치 및 방법 (출원 :10-2019-0207234)", list1:"", text2:""},
        {year:"2021", month:"10", contests:"기업부설연구소 인정(제 2021115322호)", list1:"", text2:""},
        {year:"2021", month:"11", contests:"한국전력공사 특허 기술양도 3건", list1:[
            "<b>-</b>HVDC 시스템의 전류 실패 방지를 위한 방법 및 시스템(10-1553765호)",
            "<b>-</b>전력 계통 시각화 장치 및 방법 (10-1503703호)"
        ], text2:""},
        {year:"2021", month:"11", contests:"한국전력공사 특허 기술양도 3건", list1:[
            "<b>-</b>배전기기의 전압 및 전류의 전송 오차에 대한 자동 보정 장치 및 방법(10-1307098호)",
            "<b>-</b>변전 자동화 시스템에서의 데이터 송수신 장치 및 방법 (10-1418800호)",
            "<b>-</b>전력 계통 시각화 장치 및 방법 (10-1503703호)",
        ], text2:""},
        {year:"2021", month:"12", contests:"AI기반 태양광 발전량 예측 시스템 특허 출원(10-2021-0175239)", list1:"", text2:""},
    ],
    [
        {year:"2022", month:"7", contests:"ISO 14001 인증", list1:"", text2:""},
        {year:"2022", month:"7", contests:"태양광 발전 통합 모니터링 저작권 등록 (C-2022-027842)", list1:"", text2:""},
        {year:"2022", month:"7", contests:"태양광 발전량 예측 저작권 등록 (C-2022-027842)", list1:"", text2:""},
        {year:"2022", month:"8", contests:"원격단말장치 (GF-RTU01) KC인증", list1:"", text2:""},
    ]
];



let data2 = {
    "2020": [
        {year:"2020", month:"3", contests:"그린훼스코 주식회사 설립", list1:"", text2:""},
        {year:"2020", month:"3", contests:"연구개발부서 지정", list1:"", text2:""},
        {year:"2020", month:"3", contests:"조선대 창업보육센터 입주", list1:"", text2:""},
        {year:"2020", month:"3", contests:"한국산업기술진흥협회 연구개발전담부서 인정 (제 2020151669호)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"습식 미세먼지 저감장치 특허 출원 (10-2020-0027685)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"청년예비창업가발굴육성사업 ((재)광주테크노파크)", list1:"", text2:""},
        {year:"2020", month:"3", contests:"광주SW창업랩 창업지원사업 ((재)광주정보문화산업진흥원)", list1:"", text2:""},
        {year:"2020", month:"6", contests:"초기창업패키지 (순천대창업지원단)", list1:"", text2:""},
        {year:"2020", month:"7", contests:"광주 국가혁신클러스터 지원 사업 에너지신산업 ((재)광주그린카진흥원)", list1:"", text2:""},
        {year:"2020", month:"10", contests:"습식 미세먼지 저감장치 특허 등록 (10-2171357)", list1:"", text2:""},
        {year:"2020", month:"12", contests:"여성기업 확인 (발급번호 :제 0114-2020-08102호)", list1:"", text2:""},
        {year:"2020", month:"12", contests:"지역혁신플랫폼 에너지신산업 R&D 참여 (지역혁신플랫폼 에너지신산업육성사업단)", list1:"", text2:""},
    ],
    "2021": [
        {year:"2021", month:"2", contests:"K-비대면바우처플랫폼 네이버 WORKPLACE 도입", list1:"", text2:""},
        {year:"2021", month:"2", contests:"에너지신산업 혁신생태계 OpenLab ((재)광주테크노파크)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"사물인테넛 기반 습식 미세먼지 저감장치 특허출원 (10-2021-0024819)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"신용보증기금 기술사업화자금 (운전자금 2억)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"소프트웨어 사업자등록 (B21-216160-001)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"투자유치 역량강화프로그램 IR제작 (전남대기술지주)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"중소기업 혁신바우처 (광주전남지방중소벤처기업청)", list1:"", text2:""},
        {year:"2021", month:"5", contests:"광주디자인센터 디자인개발 지원", list1:"", text2:""},
        {year:"2021", month:"7", contests:"그린훼스코 나주지사 설립 (647-85-01673)", list1:"", text2:""},
        {year:"2021", month:"9", contests:"ISO-9001 인증", list1:"", text2:""},
        {year:"2021", month:"10", contests:"한전기술이전 심층신경망기반 수요예측 장치 및 방법 (출원 :10-2019-0207234)", list1:"", text2:""},
        {year:"2021", month:"10", contests:"기업부설연구소 인정(제 2021115322호)", list1:"", text2:""},
        {year:"2021", month:"11", contests:"한국전력공사 특허 기술양도 3건", list1:[
            "<b>-</b>HVDC 시스템의 전류 실패 방지를 위한 방법 및 시스템(10-1553765호)",
            "<b>-</b>전력 계통 시각화 장치 및 방법 (10-1503703호)"
        ], text2:""},
        {year:"2021", month:"11", contests:"한국전력공사 특허 기술양도 3건", list1:[
            "<b>-</b>배전기기의 전압 및 전류의 전송 오차에 대한 자동 보정 장치 및 방법(10-1307098호)",
            "<b>-</b>변전 자동화 시스템에서의 데이터 송수신 장치 및 방법 (10-1418800호)",
            "<b>-</b>전력 계통 시각화 장치 및 방법 (10-1503703호)",
        ], text2:""},
        {year:"2021", month:"12", contests:"AI기반 태양광 발전량 예측 시스템 특허 출원(10-2021-0175239)", list1:"", text2:""},
    ],
    "2022": [
        {year:"2022", month:"7", contests:"ISO 14001 인증", list1:"", text2:""},
        {year:"2022", month:"7", contests:"태양광 발전 통합 모니터링 저작권 등록 (C-2022-027842)", list1:"", text2:""},
        {year:"2022", month:"7", contests:"태양광 발전량 예측 저작권 등록 (C-2022-027842)", list1:"", text2:""},
        {year:"2022", month:"8", contests:"원격단말장치 (GF-RTU01) KC인증", list1:"", text2:""},
    ],
    "2023": [
    ],
    "2024": [
    ]
}

const historyList = (selYear) => {
    let txt = "";
    if(selYear && selYear != 'all'){
        let copyData = JSON.parse(JSON.stringify(data2));
        let selData = copyData[selYear];

        if(selData.length > 0) {
            let yearData = "";
            for (let i = selData.length -1; i >= 0 ; i--) {
                txt += "<tr>";
    
                if(yearData != selData[i].year) {
                    txt += `<td class="cen">${selData[i].year}</td>`
                    yearData = selData[i].year;
                }else {
                    txt += `<td class="cen"></td>`
                }
    
                txt += `
                    <td class="cen">${selData[i].month}</td>
                    <td>${selData[i].contests}
                `

                if(selData[i].list1[0]) {
                    txt += `<ul>`
                    for (let j = 0; j < selData[i].list1.length; j++) {
                        txt += `<li>${selData[i].list1[j]}</li>`;
                    }
                    txt += `</ul>`
                }
                txt += "</td><td class='del cen'>삭제</td></tr>";
            }
        }else {
            txt += `
                <tr>
                    <td class="cen">${selYear}</td>
                    <td class="cen"></td>
                </tr>
            `
        }
    }else {
        let copyData = JSON.parse(JSON.stringify(data2));
        let keysName = Object.keys(copyData).reverse();
        for (let i = 0; i < keysName.length; i++) {
            let selData = copyData[keysName[i]];
            let reverseData = selData.reverse();
            if(reverseData.length > 0) {
                let yearData = "";
                reverseData.forEach(ele => {
                    txt += "<tr>";
        
                    if(yearData != ele.year) {
                        txt += `<td class="cen">${ele.year}</td>`
                        yearData = ele.year;
                    }else {
                        txt += `<td class="cen"></td>`
                    }
        
                    txt += `
                        <td class="cen">${ele.month}</td>
                        <td>${ele.contests}
                    `
        
                    if(ele.list1[0]) {
                        txt += `<ul>`
                        for(let i = 0; i < ele.list1.length; i++){
                            txt += `<li>${ele.list1[i]}</li>`;
                        }
                        txt += `</ul>`
                    }
                    
                    txt += "</td><td class='del cen'>삭제</td></tr>";
                });
            }else {
                txt += `
                    <tr>
                        <td class="cen">${keysName[i]}</td>
                        <td class="cen"></td>
                    </tr>
                `
            }
        }
    }
    
    $(".historyList").html(txt);
}

$('.yearBtn > button').on("click", function() {
    $('.yearBtn > button').removeClass("on")
    $(this).addClass("on");
    let selYear = $(this).data('year');
    historyList(selYear);
});

$('.hisRes button').on('click', function() {
    $('.hisRes button').removeClass("on")
    $(this).addClass("on");
});

$('.hisRes button.list').on('click', function() {
    $('.historyView').css('display', 'block');
    $('.historyRegister').css('display', 'none');
    historyList();
    $('.yearBtn > button').removeClass("on")
    $('.yearBtn > button.all').addClass("on");
});

$(document).on('click', '.del', function() {
    if(confirm("삭제 하시겠습니까?") == true){
        $(this).parent('tr').remove();
        // db 데이터 삭제 실행 
    }
});

function dsds() {
    $.ajax({  
        url: 'URL',  
        type: 'POST',  
        data: yourData,  
        datatype: 'json'
    })
    .done(function(data, textStatus, xhr) { })
    .fail(function(xhr, textStatus, errorThrown) { })
    // .always(function(data||xhr, textStatus, xhr||errorThrown) { }); // 요청의 성공 여부에 관계없이 실행
    
}




(function(){
    historyList();
    $('.historyView').css('display', 'block');
    $('.historyRegister').css('display', 'none');
    // $('.historyView').css('display', 'none');
    // $('.historyRegister').css('display', 'block');
})()