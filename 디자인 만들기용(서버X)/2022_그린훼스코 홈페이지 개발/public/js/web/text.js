$(document).ready(function () {

	var footer = $("footer");
	var nextBtn = $(".next-btn");
	var pagination = $(".swiper-pagination");
	var listPagination = ["", "유류유통사업", "정보통신사업", "복합세차사업", "신재생에너지"];
	var swiper = new Swiper(".swiper-container", {
		direction: "horizontal",
		mousewheelControl: true,
		slidesPerView: 1,
		speed: 1000,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		pagination: pagination,
		paginationClickable: true,
		paginationBulletRender: function (swiper, index, className) {
			return '<div class="' + className + '"><span>' + (listPagination[index]) + '</span></div>';
		},
		onTransitionStart: function (swiper) {
			if (swiper.previousIndex) {
				$("section.swiper-slide-prev").removeClass("on");
				$("section.swiper-slide-next").removeClass("on");

			}
			if (swiper.realIndex == 1) {
				$("section.section1").addClass("off");
				$(".section1-title").removeClass("on");
			}
		},
		onTransitionEnd: function (swiper) {
			if (swiper.activeIndex == 0) {
				$("section.section1").removeClass("off");
				$(".section1-title").addClass("on");
			}
			if (swiper.activeIndex == 4) {
				nextBtn.on("click", function () {
					footer.css({
						"transition": "all 0.6s"
					});
					footer.addClass("on");
				});
			}
		}
	});

	pagination.on("click", function () {
		footer.removeClass("on");
	});

	// next button
	nextBtn.on("click", function () {
		swiper.slideNext();
		if ($(this).hasClass("home")) {
			window.location.href = "/index.asp";
		}
	});

	// main title
	setTimeout(function () {
		$(".section1-title").addClass("on");
	});

	var mainText = ["FUTURE"]
	textDelay(mainText)

	function textDelay(wordArray) {
		wordArray.forEach(function (word, index) {
			var Title = $(".section1-title h1");
			textSplit(word).forEach(function (text, index) {
				Title.append("<b>" + text + "</b>")
				Title.find("b").eq(index).css({
					"transitionDelay": (0.2 * index) + "s"
				})
			})
		});
	}
	function textSplit(word) {
		var textAddr = word.split("");
		return textAddr;
	}

	$(window).on("load resize", function () {
		if ($(window).width() <= 768) {

		} else {
			$(".section5").on("scroll mousewheel DOMMouseScroll", function (e) {
				var E = e.originalEvent;
				delta = E.wheelDelta;
				if (delta < 0) {
					$(".section5-img").addClass("off");
					footer.css({
						"transition": "all 0.6s"
					});
					footer.addClass("on");
					nextBtn.addClass("home");
				} else if (footer.hasClass("on") && delta > 0) {
					swiper.disableMousewheelControl();
					$(".section5-img").removeClass("off");
					footer.css({
						"transition": "all 0.6s"
					});
					footer.removeClass("on");
					nextBtn.removeClass("home");
				} else {
					setTimeout(function () {
						swiper.enableMousewheelControl();
					}, 800)
				}
			});
		}
	});

});