/*
 * 도로명주소 API 리턴값 형태
    roadAddr	String	Y		전체 도로명주소
    roadAddrPart1	String	Y		도로명주소(참고항목 제외)
    roadAddrPart2	String	N		도로명주소 참고항목
    jibunAddr	String	Y		지번 정보
    engAddr	String	Y		도로명주소(영문)
    zipNo	String	Y		우편번호
    admCd	String	Y		행정구역코드
    rnMgtSn	String	Y		도로명코드
    bdMgtSn	String	Y		건물관리번호
    detBdNmList	String	N		상세건물명
    bdNm	String	N		건물명
    bdKdcd	String	Y		공동주택여부 (1:공동주택, 0: 비공동주택)
    siNm	String	Y		시도명
    sggNm	String	N		시군구명
    emdNm	String	Y		읍면동명
    liNm	String	N		법정리명
    Rn	String	Y		도로명
    udrtYn	String	Y		지하여부 (0:지상, 1:지하)
    buldMnnm	Number	Y		건물본번
    buldSlno	Number	Y		건물부번 (부번이 없는 경우 0)

    mtYn	String	Y		산여부 (0:대지, 1:산)
    lnbrMnnm	Number	Y		지번본번(번지)
    lnbrSlno	Number	Y		지번부번(호) (부번이 없는 경우 0)
    emdNo	String	Y		읍면동일련번호
    hstryYn	String	Y		"* 2020년12월8일 추가된 항목 변동이력여부(0: 현행 주소정보, 1: 요청변수의 keyword(검색어)가 변동된
    주소정보에서 검색된 정보)"
    relJibun	String	Y		"* 2020년12월8일 추가된 항목 관련지번"
    hemdNm	String	Y		"* 2020년12월8일 추가된 항목 관할주민센터
    ※ 참고정보이며, 실제와 다를 수 있습니다."


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