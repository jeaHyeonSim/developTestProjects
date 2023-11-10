
/**
*  
    ladSn: "3532"
    ladUseSittn: "240"
    ladUseSittnNm: "상업기타"
    lastUpdtDt: "2023-07-12"
    ldCode: "4681025022" // 행정구역 코드
    ldCodeNm: "전라남도 강진군 강진읍 남성리"
    lndcgrCode: "08"
    lndcgrCodeNm: "대"
    lndpclAr: "1668"
    mnnmSlno: "170-1"

    lnbrMnnm: "170" // 번
    lnbrSlno: "1"   // 지

    pblntfPclnd: "436800"
    pnu: "4681025022101700001"
    prposArea1: "22"
    prposArea1Nm: "일반상업지역"
    prposArea2: "00"
    prposArea2Nm: "지정되지않음"
    regstrSeCode: "1"
    regstrSeCodeNm: "일반"
    roadSideCode: "04"
    roadSideCodeNm: "중로한면"
    stdrMt: "01"
    stdrYear: "2023"
    tpgrphFrmCode: "04"
    tpgrphFrmCodeNm: "사다리형"
    tpgrphHgCode: "02"
    tpgrphHgCodeNm: "평지"

 *  [126.66907912, 35.16897513, 126.66969669, 35.16856671, 126.6700771, 35.16895461, 126.66907912, 35.16897513]
    admCd         행정구역코드 : "2920016000"
    bdKdcd        공동주택여부 (1:공동주택, 0: 비공동주택) : "0"
    bdMgtSn       건물관리번호 : "2920016000109300000000001"
    bdNm          건물명 : ""
    buldMnnm      건물본번 : "15"
    buldSlno      건물부번 (부번이 없는 경우 0) : "0"
    detBdNmList   상세건물명 : ""
    emdNm         읍면동명 : "삼거동"
    emdNo         읍면동일련번호 : "01"
    engAddr       도로명주소(영문) : "15 Bitgeurin 18-ro, Gwangsan-gu, Gwangju"
    jibunAddr     지번 정보 : "광주광역시 광산구 삼거동 930"
    liNm          법정리명 : ""
    lnbrMnnm      지번본번(번지) : "930"
    lnbrSlno      지번부번(호) (부번이 없는 경우 0) : "0"
    mtYn          산여부 (0:대지, 1:산) : "0"
    rn            도로명 : "빛그린18로"
    rnMgtSn       도로명코드 : "292003352953"
    roadAddr      전체 도로명주소 : "광주광역시 광산구 빛그린18로 15 (삼거동)"
    roadAddrPart1 도로명주소(참고항목 제외): "광주광역시 광산구 빛그린18로 15"
    roadAddrPart2 도로명주소(참고항목): " (삼거동)"
    sggNm         시군구명 : "광산구"
    siNm          시도명 : "광주광역시"
    udrtYn        지하여부 (0:지상, 1:지하) : "0"
    zipNo         우편번호 : "62405"
    

    pnu 코드 규칙
    행정구역코드 (
        광역시도코드(2자리) 
        + 시/군/구 코드(3자리) 
        + 읍/면/동 코드(3자리) 
        + 리 코드(2자리) 
    )
    + 토지/임야 코드(1자리)
    + 본번 코드(4자리) 
    + 부번 코드(4자리)

    // pnu 코드 예시
    행정구역코드(2920016000) +
    1(필지구분, 일반은 1 산은 2) +
    0150(본번을 0000으로 패딩) + 
    0006(부번을 0000으로 패딩)


    pnu = admCd 행정구역코드 +
    mtYn 1(필지구분, 일반은 1 산은 2) +
    lnbrMnnm (본번을 0000으로 패딩) +
    lnbrSlno (부번을 0000으로 패딩) 

    pnu = '2920016000' + '1' + ('0'+'930') + ('000' + '0')
    pnu =>   2920016000109300000

    // 참고 사이트 리턴값
    bldnm : ""
    jibun : "광주광역시 광산구 삼거동 930"
    lat : "35.169122855"
    lng : "126.669652217"
    pnu : "2920016000109300000"
    roadAddress : "광주광역시 광산구 빛그린18로 15 (삼거동)"
    zipCode : "62405"


    lastUpdtDt: "2023-07-11"
    ldCode: "2917014100"
    ldCodeNm: "광주광역시 북구 오룡동"
    mnnmSlno: "1110-10"
    pblntfDe: "2023-04-28"
    pblntfPclnd: "348800"
    pnu: "2917014100111100010"
    regstrSeCode: "1"
    regstrSeCodeNm: "일반"
    stdLandAt: "N"
    stdrMt: "01"
    stdrYear: "2023"

    
    archArea: 81.12
    atchBldArea: 0
    atchBldCnt: 0
    bcRat: 0
    bjdongCd: "16000"
    bldNm: ""
    block: ""
    bun: "0930"
    bylotCnt: 0
    crtnDay: "20220427"
    dongNm: "주2동"
    emgenUseElvtCnt: 0
    engrEpi: 0
    engrGrade: ""
    engrRat: 0
    etcPurps: "공장"
    etcRoof: "판넬"
    etcStrct: "일반철골구조"
    fmlyCnt: 0
    gnBldCert: 0
    gnBldGrade: ""
    grndFlrCnt: 1
    heit: 5.16
    hhldCnt: 0
    hoCnt: 0
    indrAutoArea: 0
    indrAutoUtcnt: 0
    indrMechArea: 0
    indrMechUtcnt: 0
    itgBldCert: 0
    itgBldGrade: ""
    ji: "0000"
    lot: ""
    mainAtchGbCd: "0"
    mainAtchGbCdNm: "주건축물"
    mainPurpsCd: "17000"
    mainPurpsCdNm: "공장"
    mgmBldrgstPk: "29200-100356868"
    naBjdongCd: "16001"
    naMainBun: 15
    naRoadCd: "292003352953"
    naSubBun: 0
    naUgrndCd: "0"
    newPlatPlc: "광주광역시 광산구 빛그린18로 15"
    oudrAutoArea: 38.25
    oudrAutoUtcnt: 3
    oudrMechArea: 0
    oudrMechUtcnt: 0
    platArea: 0
    platGbCd: "0"
    platPlc: "광주광역시 광산구 삼거동 930번지"
    pmsDay: "20210930"
    pmsnoGbCd: "1101"
    pmsnoGbCdNm: "신축허가"
    pmsnoKikCd: "3630262"
    pmsnoKikCdNm: "건축과"
    pmsnoYear: "2021"
    regstrGbCd: "1"
    regstrGbCdNm: "일반"
    regstrKindCd: "2"
    regstrKindCdNm: "일반건축물"
    rideUseElvtCnt: 0
    rnum: 1
    roofCd: "90"
    roofCdNm: "기타지붕"
    rserthqkAblty: ""
    rserthqkDsgnApplyYn: "0"
    sigunguCd: "29200"
    splotNm: ""
    stcnsDay: "20211020"
    strctCd: "31"
    strctCdNm: "일반철골구조"
    totArea: 81.12
    totDongTotArea: 81.12
    ugrndFlrCnt: 0
    useAprDay: "20220421"
    vlRat: 0
    vlRatEstmTotArea: 81.12

 */




/*자치법규 html 폼 복사해온거?

<form id="lawSearchForm" method="post" action="/DRF/lawSearch.do">
			<div class="conwrap1">
				<!-- number -->
				<div class="lelitop">
					<div class="num">총<strong>2</strong>건</div>
				</div>
				<!-- number //-->
				<!-- list -->
				<!--
	<table cellpadding="0" cellspacing="0" class="tbl1 tbd1" summary="순번, 법령명, 소관부처, 제개정구분, 법령종류, 공포번호, 공포일자, 시행일로 구성됨">
			<colgroup><col width="8%" /><col width="32%" /><col width="12%" /><col width="13%" /><col width="12%" /><col width="12%" /><col width="12%" /></colgroup>
			<caption>펼친화면 목록</caption>

			<thead>
				<tr>
					<th scope="col">순번</th>
					<th scope="col">자치법규명</th>
					<th scope="col">제개정구분</th>
					<th scope="col">법령종류</th>
					<th scope="col">공포번호</th>
					<th scope="col">공포일자</th>
					<th scope="col" class="bano">시행일</th>
				</tr>
			</thead>
	</table>
	-->
				<table cellpadding="0" cellspacing="0" class="tbl8 wd"
					summary="순번, 자치법규명, 제개정구분, 법령종류, 공포번호, 공포일자, 시행일로 구성됨">
					<colgroup>
						<col width="8%" />
						<col width="32%" />
						<col width="12%" />
						<col width="13%" />
						<col width="12%" />
						<col width="12%" />
						<col width="12%" />
					</colgroup>
					<caption>자치법규 목록 : 순번, 자치법규명, 제개정구분, 법령종류, 공포번호, 공포일자, 시행일로 구성됨</caption>
					<thead>
						<tr>
							<th scope="col">순번</th>
							<th scope="col">자치법규명</th>
							<th scope="col">제개정구분</th>
							<th scope="col">법령종류</th>
							<th scope="col">공포번호</th>
							<th scope="col">공포일자</th>
							<th scope="col" class="bano">시행일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="ce">1</td>
							<td><a
									href="/DRF/lawService.do?OC=simjh7601&amp;target=ordin&amp;MST=1607111&amp;type=HTML&amp;mobileYn="><strong
										class="tbl_tx_type">광주광역시</strong>
									동구 <strong class="tbl_tx_type">태양광</strong> 등 친환경에너지 시설 보급 촉진에 관한 조례</a></td>
							<td class="ce">제정</td>
							<td class="ce">조례</td>
							<td class="ce">제1485호</td>
							<td class="ce">2021.6.30.</td>
							<td class="ce">2021.6.30.</td>
						</tr>
					</tbody>
					<tbody>
						<tr class="gr">
							<td class="ce">2</td>
							<td><a
									href="/DRF/lawService.do?OC=simjh7601&amp;target=ordin&amp;MST=1665107&amp;type=HTML&amp;mobileYn="><strong
										class="tbl_tx_type">광주광역시</strong>
									북구 <strong class="tbl_tx_type">태양광</strong>·풍력 등 친환경에너지 시설 보급 촉진에 관한 조례</a></td>
							<td class="ce">일부개정</td>
							<td class="ce">조례</td>
							<td class="ce">제1735호</td>
							<td class="ce">2022.1.5.</td>
							<td class="ce">2022.1.13.</td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" id="query" name="query" value='광주광역시 태양광' />
				<input type="hidden" id="target" name="target" value="ordin" />
				<input type="hidden" id="OC" name="OC" value="simjh7601" />
				<input type="hidden" id="search" name="search" value="1" />
				<input type="hidden" id="display" name="display" value="20" />
				<input type="hidden" id="sort" name="sort" value="" />
				<input type="hidden" id="date" name="date" value="" />
				<input type="hidden" id="nb" name="nb" value="" />
				<input type="hidden" id="refAdr" name="refAdr" value="" />
				<input type="hidden" id="org" name="org" value="" />
				<input type="hidden" id="sborg" name="sborg" value="" />
				<input type="hidden" id="knd" name="knd" value="" />
				<input type="hidden" id="nw" name="nw" value="3" />
				<input type="hidden" id="gana" name="gana" value="" />
				<input type="hidden" id="rrClsCd" name="rrClsCd" value="" />
				<input type="hidden" id="efYd" name="efYd" value="" />
				<input type="hidden" id="ancYd" name="ancYd" value="" />
				<input type="hidden" id="ancNo" name="ancNo" value="" />
				<input type="hidden" id="ordinFd" name="ordinFd" value="" />
				<input type="hidden" id="popYn" name="popYn" value="N" />
				<input type="hidden" id="page" name="page" value="1" />
				<input type="hidden" id="type" name="type" value="HTML" />
				<!-- list //-->
				<!-- paging -->
				<div class="paging mar5">
					<!-- paging -->
					<div class="paging">
						<img src="/DRF/images/button/page_first.gif" alt="처음으로" />
						<img src="/DRF/images/button/page_prev.gif" alt="이전으로" />
						<ol start="1">
							<li class="on">1</li>
						</ol>
						<img src="/DRF/images/button/page_next.gif" alt="다음으로" />
						<img src="/DRF/images/button/page_last.gif" alt="마지막으로" />
					</div>
					<!-- paging //-->
				</div>
				<!-- paging //-->
			</div>
		</form>

 */