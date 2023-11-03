$('.type-select1 a').on('click', function(){
    console.log("---");
    console.log($(this).attr('class'));
    console.log(addr_list);
    console.log(formData.get('addr_list'));
}) 