$(document).ready(function(){

	// form
	$(function(){
		var $inputRadio = $('.input_radio > .radio'), //input radio
			$inputCheck = $('.input_chk > .check'); //input checkbox

		$inputRadio.on('click', function(){
			$(this).parent('.input_radio').toggleClass('active');
		});

		$inputCheck.on('click', function(){
			$(this).parent('.input_chk').toggleClass('active');
		});
	});	
	
	// 전체메뉴 보기
	$(function(){
		var el = $('#all_menu');
		var header = $('#header');

		$('.all_btn a', header).on('click', function(){
			el.slideDown(300);
			header.addClass('open');
			imgReplace($('.logo a img'),'on');
			console.log();
			
		});
		$('.close', el).on('click', function(){
			el.slideUp(300);
			header.removeClass('open');
			imgReplace($('.logo a img'),'off');
		});
	});

	// 엔크린보너스카드 이용안내
	$(function(){
		var el = $('.enc_useinfo');

		$('dt a', el).on('click', function(){
			$(this).parent('dt').next('dd').slideToggle('fast');
			return false;
		});
	});	
});

// 전체보기메뉴 로고이미지 치환
function imgReplace(obj,flag){
	var imgSrc = obj.attr("src");
	if(flag == "on"){
		imgSrc = imgSrc.replace("logo_skenclean.","logo_skenclean_on.");
	} else if(flag == "off"){
		imgSrc = imgSrc.replace("logo_skenclean_on","logo_skenclean");
	}
	obj.attr("src",imgSrc);
}


function ResizeContentImages(content) {
	var margin = 20
	var maxWidth = $(content).innerWidth() - margin;
		$("img", content).each(function() {
			var img = $(this);
			img.load(function() {
			if (img.width() > maxWidth)
				img.width(maxWidth);
		});
	});
}

/* 안드로이드용 주소창 삭제*/
window.addEventListener('load', function() {
	setTimeout(scrollTo, 0, 0, 1);
}, false);


$.fn.serializeObject = function () {
    "use strict";
    var result = {};
    var extend = function (i, element) {
        var node = result[element.name];
        if ('undefined' !== typeof node && node !== null) {
           if ($.isArray(node)) {
               node.push(element.value);
           } else {
               result[element.name] = [node, element.value];
           }
        } else {
            result[element.name] = element.value;
        }
    };
 
    $.each(this.serializeArray(), extend);
    return result;
};