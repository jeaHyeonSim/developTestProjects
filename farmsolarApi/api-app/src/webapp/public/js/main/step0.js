

const rest_api_collection = async () => {
    // $('.loading').css('display', 'flex');
    mapApi();
    getLandTypeSearch();
    rest_api_service();
    getLawDataList();
    // await getEum();
    console.log(_type)
    if(_type == "type1"){
        console.log("지붕형");
    }
    if(_type == "type2"){
        console.log("지상형");
        getLawDataMain();
    }
    

    
    // setTimeout(() => {
    //     $('.loading').css('display', 'none');
    // }, 2000);
    return;
}

(function(){

    rest_api_collection();

})();