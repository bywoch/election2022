// BarGraph 모듈 정의 (클로저를 사용하여 모듈 패턴 적용)
var BarGraph = (function () {

    // BarGraph 생성자 함수 정의
    function BarGraph(target, direction, positionTarget, max, bg) {
        // 생성자 함수에서 사용할 속성 초기화
        this.target = target; // 그래프가 그려질 대상 요소 선택자
        this.direction = direction; // 그래프의 방향 ('width' 또는 'height')
        this.positionTarget = positionTarget; // 애니메이션 시작 위치를 결정할 대상 요소 선택자
        this.max = max; // 그래프의 최대 값 (옵션)
        this.bg = bg; // 그래프의 배경 효과 레이어 수 (옵션)

        // 초기화 함수 정의
        this.init = function (start) {
            // start 매개변수가 true일 경우 초기화 작업 수행
            if (start) {
                if (this.direction == 'width') {
                    $(this.target).width(0);
                } else {
                    $(this.target).height(0);
                }
            }
        };
    }

    // makeBg 메서드 정의 - 그래프의 배경 효과 레이어를 생성
    BarGraph.prototype.makeBg = function () {
        var bgHtml = '';
        var bgMax = this.max != undefined ? this.max : 100;
        var bgLayer = this.bg != undefined ? this.bg : 4;
        var bgNum = bgMax / bgLayer;
        if (bgLayer < 4) {
            $(this.target).parents('.graph_wrap').addClass('column_' + bgLayer + 'y');
        }
        bgHtml += '<li><span>(%)</span></li><li><span>0</span></li>';
        for (var i = 0; i < bgLayer; i++) {
            bgHtml += '<li><span>' + Math.floor((i + 1) * bgNum) + '</span></li>';
        }
        $('ul.column_bg').html(bgHtml);
    }

    // animationDefault 메서드 정의 - 그래프의 기본 애니메이션 효과 적용
    BarGraph.prototype.animationDefault = function () {
        var max = this.max;
        this.makeBg();
        if ($(this.target).length) {
            var direct = this.direction;
            if (direct == 'width') {
                $(this.target).each(function (idx, item) {
                    var skills = $(item).data('width');
                    var skillsMax = max != undefined ? 100 * skills / max : skills;
                    setTimeout(function () {
                        $(item).width(skillsMax + '%');
                    }, (idx + 1) * 10);
                    $(item).find('.move').text(skills);
                    if (skillsMax < 5) {
                        $(item).find('.move').hide();
                    } else if (skillsMax <= 20) {
                        $(item).find('.move').addClass('small');
                    }
                });
            } else if (direct == 'height') {
                $(this.target).each(function (idx, item) {
                    var skills = $(item).data('height');
                    var skillsMax = max != undefined ? 100 * skills / max : skills;
                    setTimeout(function () {
                        $(item).height(skillsMax + '%');
                    }, (idx + 1) * 20);
                    $(item).parent().find('.move').text(skills);
                    if (skillsMax < 5) {
                        $(item).find('.move').hide();
                    } else if (skillsMax <= 20) {
                        $(item).find('.move').addClass('small');
                    }
                });
            }
        }
    }

    // animationStart 메서드 정의 - 애니메이션 시작 위치에 따라 애니메이션 실행
    BarGraph.prototype.animationStart = function (on) {
        if ($(this.positionTarget).length) {
            var thisTarget = document.querySelector(this.positionTarget);
            var contentTop = window.pageYOffset + thisTarget.getBoundingClientRect().top + (thisTarget.clientHeight / 3);
            var thisScrollTop = window.scrollY || document.documentElement.scrollTop || $(window.parent).scrollTop();
            var thisHeight = window.outerHeight;
            if (contentTop < thisHeight + thisScrollTop) {
                this.animationDefault();
            }
        }
        if (on) {
            $(this.positionTarget).find(on).addClass('on');
        }
    }

    // 생성자 함수를 반환하여 모듈을 외부에서 사용할 수 있도록 함
    return BarGraph;

})();


var barVote = new BarGraph('#voteGraph .bar', 'height', '#voteGraph', 30, 3); // 사전투표율 1일차 그래프

$(window.parent).on('load scroll resize', function () {
    barVote.animationStart(); // 사전투표율 그래프
});
