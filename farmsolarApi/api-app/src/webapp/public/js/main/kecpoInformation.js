
function getBusinessInfoService() {
    $.ajax(`/kecpoInformation/getBusinessInfoService`,
        {
            method: 'get'
        }
    )
    .done(function (rsData) { // 서버요청이 성공시의 콜백함수
        // console.log("setBldRgstService : ", setBldRgstService);
        // setBldRgstService(rsData);
        return;
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('setBldRgstService 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
    });
}
// getBldRgstService();

getBusinessInfoService();

function getGenerationService() {
    $.ajax(`/kecpoInformation/getGenerationService`,
        {
            method: 'get'
        }
    )
    .done(function (rsData) { // 서버요청이 성공시의 콜백함수
        // console.log("setBldRgstService : ", setBldRgstService);
        // setBldRgstService(rsData);
        console.log(rsData);
        return;
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('setBldRgstService 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
    });
}
// getBldRgstService();

getGenerationService();