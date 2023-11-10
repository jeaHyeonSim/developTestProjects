

// fetch 참고 폼
const fetchForm = () => {
    fetch('URL', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            a:1
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        // 결과 리턴
        return;
    })
    .catch((err) => {
        // 에러 리턴
        return;
    })
}
// ajax 참고 폼
const GetAddr = () => {
    if(checkSearchedWord(document.fsearch.keyword) == false)
    {
        $("#fsearch_addr").val("");
        return false;
    }
    
    var txt = $("#fsearch_addr").val();
    if(txt.length >= 2){
        $.ajax({
            url: `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${txt}&resultType=json
            &confmKey=devU01TX0FVVEgyMDIzMDkyNTE0MDk1MDExNDEyODQ=`,
            // dataType: 'json',
            type: 'GET',
            // data : {
                
            // },
            success: function (data) {
                // 결과 리턴
                if(data && data.results.juso){
                    console.log(data.results.juso);
                    // for (let i = 0; i < data.results.juso.length; i++) {
                    //     console.log(data.results.juso[i].roadAddr);
                        
                    // }
                }
                // 결과 값 초기화
                $('.search_result_title').remove();
                $('.search_result_ul').remove();

                // 에러코드
                var errCode = data.results.common.errorCode;
                var errDesc = data.results.common.errorMessage;
                console.log(errCode);
                // errorCode가 0인 경우 정상
                if (errCode == '0') {
                    // 받아온 결과가 1개 이상인 경우
                    if (data.results.common.totalCount > 0) {
                        $('.addr_list_inbox').append(
                            '<ul class="search_result_ul"></ul>'
                        );
                        //roadAddr
                        $.each(data.results.juso, function (i, v) {
                            $('.search_result_ul').append(
                                "<li class='search_result_li' data->" +
                                "<span class='search_result_jibunAddr' >" +
                                v['jibunAddr'] +
                                "<br></span>" +
                                "<span class='search_result_roadAddr'>" +
                                v['roadAddr'] +
                                "</span>" +
                                "</li>"
                            );
                            // $('.search_result_addr').highlight(addr);
                        });
                    }
                    else {
                        $('.addr_list_inbox').append(
                            '<p class="search_result_title">검색 결과가 존재하지 않습니다.</p>'
                        );
                    }
                }
                else {
                    alert(errCode + '=' + errDesc);
                }
            },
            error: function (data, status, err) {
                // 에러 리턴
                console.log(err);
            }
        });
    }else {
        console.log("뭐든 에러");
    }
    
}