$(function () {

    // 이 시각 대선 현장
    var onAirHtml = '';
    onAirHtml += '<div class="live_img">' +
        '<img src="images/live_img_01.jpg" alt="이 시각 대선 현장 가상 이미지">' + // ← 영상 임베드 시 수정 작업 필요
        '</div>';
    $(".live_on").append(onAirHtml);

    $(".live_on").on("click", function () {
        $(this).children('.live_img').slideToggle(500);
    });    

    // 이벤트
    $('.promo_wrap ul').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    var slickDotsWidth = $('.slick-dots li').outerWidth(true);
    var slickDotsLength = $('.slick-dots li').length;
    var slickDotsBox = slickDotsWidth * slickDotsLength

    $('.slick-dots').css('width', slickDotsBox);
    $(window).resize(function () {
        var slickResizeWidth = $('.slick-dots li').width();
        var slickDotsBox = slickDotsWidth * slickDotsLength;
        if ($(window).width() > 700, slickResizeWidth = 80) {
            $('.slick-dots').css('width', slickDotsBox);
        }
    });

    var promoList = $('.promo_wrap .slick-slide').length;

    if (promoList === 1) {
        $('.promo_wrap .slick-dots li').hide();
    } else {
        $('.promo_wrap .slick-dots li').show();
    }

    //해시태그 선택
    $('.keyword_tab ul li').on('click', function () {
        $(this).addClass('keyword_active');
        $(this).siblings().removeClass('keyword_active');
    });
    
});
