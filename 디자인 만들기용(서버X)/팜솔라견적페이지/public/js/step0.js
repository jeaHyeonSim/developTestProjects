

const popTip = () => {
    // $(".gf_poptip.cc").show();
    // $(".gf_poptip.bb").show();

    $(".ico_i").hover(
        function () {
            // this => gf_tip 클래스
            let prevTr = $(this).parents('tr'); // (this) => tbody > tr
            let prevTd = $(this).parents('td'); // (this) => tbody > tr > td
    
            // prev.offset(); //  HTML 문서를 기준
            let prevTrPo = prevTr.position();  // tr 태그 포지션
            let prevTrTop = prevTrPo.top;
            let popH = 45; // 팝업 높이
            let poptipH = $(this).next().height();
            if(poptipH > 31){
                $(".gf_poptip .gf_con", $(this).parent()).css({
                    'margin-top': '2.5px'
                });
            }else {
                $(".gf_poptip .gf_con", $(this).parent()).css({
                    'margin-top': '7.5px'
                });
            }

            let prevTdW = (prevTd.outerWidth()/2); // td태그 총 넓이
            $(".gf_poptip", $(this).parent()).css({
                'top': (prevTrTop - popH) + 'px'
            });
            $(".gf_poptip > .popper_arrow", $(this).parent()).css({
                'left': (prevTdW -7) + 'px'
            })
            $(".gf_poptip", $(this).parent()).show();
        },
        function () {
            $(".gf_poptip", $(this).parent()).hide();
        }
    );


}
popTip()