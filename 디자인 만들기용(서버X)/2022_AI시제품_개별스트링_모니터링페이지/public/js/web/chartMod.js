$(document).ready(function(){
	
	//아코디언 메뉴
	$(function(){
		var accordion = $('.accordionWrap .accordion');
		accordion.addClass('hide');
		accordion.find('.accoCont').slideUp(0);
		$('.accordionWrap .accordion.active').addClass('show').removeClass('hide').find('.accoCont').slideDown(100);
		$('.accordionWrap .accordion .trigger').click(function(){
			var myaccordion = $(this).parents('.accordion');
			if(myaccordion.hasClass('hide')){
				accordion.addClass('hide').removeClass('show');
				accordion.find('.accoCont').slideUp(100);
				myaccordion.removeClass('hide').addClass('show');
				myaccordion.find('.accoCont').slideDown(100);
			} else {
				myaccordion.removeClass('show').addClass('hide');
				myaccordion.find('.accoCont').slideUp(100);
			}
		});
	});
	
});