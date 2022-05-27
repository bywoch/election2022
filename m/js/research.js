// 판세 여론조사 
var Fn = Fn || {};

//bar 그래프 막대 세로
Fn.makeBarVertical = function () {
    const dur = 600;
    const del = 0;

    // .bar-vertical 클래스를 가진 요소들을 순회
    $(".bar-vertical").each(function () {
        // 각 .bar-vertical 요소 내의 li 요소들을 순회
        $(this).children('li').each(function (index) {
            const grp_w = $(this).height();
            const $bar = $(this).find('.bar');
            const $move = $(this).find('.move');
            const num = (Number($bar.attr("data-height")) / 100) * grp_w;

            // 바와 이동 요소의 애니메이션 설정
            $bar.stop().css({
                "bottom": -num,
                "height": num
            }).stop().animate({
                "bottom": 0
            }, dur);

            $move.stop().css({
                "bottom": 0
            }).stop().animate({
                "bottom": num + 10
            }, dur);
        });
    });
};

//bar 그래프 막대 가로
Fn.makeBarH1 = function () {
    const dur = 600;
    const del = 0;

    // .bar-horizontal 클래스를 가진 요소들을 순회
    $(".bar-horizontal").each(function () {
        // 각 .bar-horizontal 요소 내의 li 요소들을 순회
        $(this).children('li').each(function (index) {
            const grp_w = $(this).width();
            const $bar = $(this).find('.bar');
            const $move = $(this).find('.move');
            const num = ((Number($bar.attr("data-width")) / 100) * grp_w) / 2;

            // 바와 이동 요소의 애니메이션 설정
            $bar.stop().css({
                "width": 0
            }).stop().animate({
                "width": num
            }, dur);

            $move.stop().css({
                "left": 0
            }).stop().animate({
                "left": num
            }, dur);
        });
    });
};


// bar 그래프 가로
Fn.makeBarH2 = function () {
    $(".graph-group").each(function () {
        const grp_data = [];
        let sum = 0;
        const grp_w = $(this).width();

        // 각 그래프의 데이터와 너비 계산
        $(this).find('.graph > .gbar').each(function (index) {
            const $per = $(this).find('.per');
            grp_data.push(Number($per.text()));
            const wv = (grp_data[index] * 0.01) * grp_w;
            const w = Math.floor(wv);

            // 그래프 너비 설정
            $(this).css({
                'width': w
            });

            // 너비에 따라 ft_rbt 요소 표시/숨김 처리
            if ($(this).width() <= 65) {
                $(this).find('.ft_rbt').hide();
            } else {
                $(this).find('.ft_rbt').show();
            }
            sum += w;
        });

        // 그래프 총 너비가 부모 요소 너비보다 큰 경우 부모 요소 너비로 조정
        if (sum > $(this).find('.graph').width()) {
            $(this).find('.graph').css({
                'width': sum
            });
        }

        // grp-txt 요소 업데이트
        $(this).find('.grp-txt > li').each(function (index) {
            const $num = $(this).find('.ft_rbt');
            $num.text(grp_data[index] + ' %');
        });
    });
};

// bar 그래프 막대 가로
Fn.makeBarH3 = function () {
    const dur = 600;
    const del = 0;

    // $(".graph-horizontal").each(function () {
    $(".graph-horizontal").children('li').each(function (index) {
        const grp_w = $(this).width();
        const $bar = $(this).find('.bar');
        const $move = $(this).find('.move');
        const num = ((Number($bar.attr("data-width")) / 100) * grp_w) / 2;

        // 바와 이동 요소의 애니메이션 설정
        $bar.stop().css({
            "width": 0
        }).stop().animate({
            "width": num
        }, dur);

        $move.stop().css({
            "left": 0
        }).stop().animate({
            "left": num
        }, dur);

    });
    return false;
    // });
};

// bar 그래프 가로 Window Resize 이벤트 리스너
$(window).resize(() => {
    //Fn.makeBarH1();
    Fn.makeBarH2();
    Fn.makeBarH3();
});

$(function () {
    if ($(".bar-vertical").length) {
        Fn.makeBarVertical();
    }
    if ($(".bar-horizontal").length) {
        Fn.makeBarH1();
    }
    Fn.makeBarH2();

    // 여론조사 플리킹
    const resultCont = $(".wrap-result");
    resultCont.hide();
    resultCont.first().show();

    const srt = $('.poll-date ul li').eq(1).outerWidth(true);
    const dfg = $('.poll-date ul li').length;
    const zxc = srt * dfg;
    $('.poll-date ul').css('width', zxc + 'px');

    $('.poll-date li').first().addClass('on');
    $('.poll-date li').on('click', function () {
        // 클릭 이벤트 처리
        $(".poll-date li").removeClass('on');
        $(this).addClass('on');
        const index = $(this).index();
        resultCont.hide();
        resultCont.eq(index).show();

        // 클릭시 해당 위치로 스크롤 이동
        const lthPrvA = $(this).prevAll().length;
        const lthOwdh = 135 * lthPrvA;
        $('.poll-date').animate({
            scrollLeft: lthOwdh
        }, 500);
    });
});

