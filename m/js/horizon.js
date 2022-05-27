// Fn 객체가 없으면 빈 객체를 생성
var Fn = Fn || {};

// 문서가 로드되면 실행되는 함수
$(function () {
    // 만약 페이지에 .bar-horizontal 클래스를 가진 요소가 존재하면
    if ($(".bar-horizontal").length) {
        // Fn 객체의 makeBarHorizontal 메서드를 호출하여 수평 막대 그래프를 생성
        Fn.makeBarHorizontal();
    }
    
    // .wrap-horizontal .graph-tab li 요소들에 대해 반복문 실행
    $('.wrap-horizontal .graph-tab li').each(function (index) {
        // 각 li 요소에 클릭 이벤트 리스너 추가
        $(this).on('click', function (e) {
            // 모든 li 요소의 'on' 클래스를 제거하고 현재 클릭한 li 요소에 'on' 클래스를 추가
            $('.wrap-horizontal .graph-tab li').removeClass('on');
            $(this).addClass('on');
            
            // 모든 .wrap-pre-vote > div 요소를 숨기고, 클릭한 li에 해당하는 요소를 보여줌
            $('.wrap-pre-vote > div').hide();
            $('.pre-vote' + (index + 1)).show();
            
            // 다시 한 번 .bar-horizontal 클래스를 가진 요소가 존재하는지 확인하고 그래프를 생성
            if ($(".bar-horizontal").length) {
                Fn.makeBarHorizontal();
            }
        });
    });
});

// Fn 객체의 makeBarHorizontal 메서드 정의
Fn.makeBarHorizontal = function () {
    // 애니메이션의 지속 시간과 딜레이 초기화
    var dur = 700;
    var del = 0;
    
    // .bar-horizontal 클래스를 가진 모든 요소에 대해 반복문 실행
    $(".bar-horizontal").each(function () {
        if ($(this).hasClass('opp')) {
            // 'opp' 클래스가 있는 경우 (상대전의 경우)
            
            // 두 개의 수치를 가져와서 숫자로 변환
            var num1 = Number($(this).children('.win1').find(".num").text());
            var num2 = Number($(this).children('.win2').find(".num").text());
            
            // 각각의 막대 요소와 합계 계산
            var $bar1 = $(this).children('.win1').find('.bar');
            var $bar2 = $(this).children('.win2').find('.bar');
            var sum = num1 + num2;
            
            // 각 막대의 너비 및 위치 계산하여 애니메이션 적용
            var per1 = (100 * num1) / sum;
            var per2 = (100 * num2) / sum;
            $bar1.stop().css({ "width": 0 }).animate({ "width": per1 + "%" }, dur);
            $bar2.stop().css({ "width": 0 }).animate({ "width": per2 + "%" }, dur);
            
            // 특정 조건일 때 추가적인 애니메이션 처리
            if ($('#vote_container').hasClass('spacialM')) {
                if ($(this).parent('.top-rank').length) {
                    var temp = Math.floor(Number($(this).children('.win1').width()) * (per1 * 0.01));
                    $('.rank-state').stop().animate({ "left": temp }, dur);
                }
            }
        } else if ($(this).hasClass('vs')) {
            // 'vs' 클래스가 있는 경우 (대결의 경우)
            
            // 텍스트 요소, 숫자, 막대 요소를 가져옴
            var $txt1 = $(this).children('.win1').find('.ft_rbt');
            var $txt2 = $(this).children('.win2').find('.ft_rbt');
            var num1 = Number($(this).children('.win1').find(".num").text());
            var num2 = Number($(this).children('.win2').find(".num").text());
            var $bar1 = $(this).children('.win1').find('.bar');
            var $bar2 = $(this).children('.win2').find('.bar');
            
            // 막대 및 텍스트에 애니메이션 적용
            $bar1.stop().css({ "width": 0 }).animate({ "width": num1 + "%" }, dur);
            $bar2.stop().css({ "width": 0 }).animate({ "width": num2 + "%" }, dur);
            $txt1.addClass('txt-out').stop().css({ 'right': 7 }).animate({ 'right': num1 + "%" }, dur);
            $txt2.addClass('txt-out').stop().css({ 'left': 7 }).animate({ 'left': num2 + "%" }, dur);
        } else {
            // 그 외의 경우 (일반적인 경우)
            
            // 각 li 요소에 대해 반복문 실행
            $(this).children('li').each(function (index) {
                var $bar = $(this).find('.bar');
                var num = Number($(this).find(".num").text());
                
                // 각 막대의 너비를 계산하여 애니메이션 적용
                $bar.stop().css({ "width": 0 }).delay(index * del).animate({ "width": num + "%" }, dur);
            });
        }
    });
};

// 숫자 카운터
$(function (pollCounter) {
    $('.counter').counterUp({
        delay: 5,
        time: 500
    });
});