const setUserPowerPlantInfo = (rstData)=> {
    if(rstData == "0" ) {
        return;
    }

    //console.log(rstData);
    let optionText = "";

    for (let i = 0; i < rstData.length; i++) {
        if(i == 0){
            optionText += `
                <select name="발전소" id="powerPlant_sel">
                <option value="${rstData[i].powerplantId}" selected>${rstData[i].powerplantName}</option>
                <option value="13213123">테스트</option>`
        }else if(i == rstData.length-1){
            optionText += `
                <option value="${rstData[i].powerplantId}">${rstData[i].powerplantName}</option>
                </select>
            `
        }
        else {
            optionText += `
                <option value="${rstData[i].powerplantId}">${rstData[i].powerplantName}</option>`
        }
    }
    
    // $('.selectBox #powerPlantTitle span').text(rstData[0].powerplantName);
    $('.selectBox #powerPlant').html(
        `
            ${optionText}
        `
    )
}

// 로그인한 유저가 선택한 발전소 보내기.
window.onload = function() {
    $('#powerPlant_sel').change( function() {
       
        //alert(this.value);

        $.get("/monitoring",
            { powerPlantFirstId: this.value }
            )
    });
}


// 로그인한 유저 발전소 정보 가져오기
function getUserPowerPlantInfo() {
    $.ajax({
        url : '/monitoringCommon/monitoring_userPowerPlantInfo'  ,
        dataType : 'json',
        type : "POST",
        success : (rstData) => {
            if(rstData){
                setUserPowerPlantInfo(rstData);
            }
        },
        error : (data, status, err) => {
            console.log(err);
            setUserPowerPlantInfo("0");
        }
    });
}



(function () {
    getUserPowerPlantInfo(); // 유저 발전소
    getDataTime(); 

    let timerId = setTimeout(function tick() {
        getDataTime();
        timerId = setTimeout(tick, 1000);
    }, 1000);

    // let timerId1 = setTimeout(function tick() {
    //     getUserPowerPlantInfo();
    //     timerId1 = setTimeout(tick, 1000 * 60 * 60);
    // }, 1000 * 60 * 60);
})()