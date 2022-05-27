$(function () {
    counterup('.fig_1');
    $('.dropdown').Dropdown();
});

//dropdown
$.Dropdown = function (element, options) {
    if (!element) {
        return false;
    }
    var dropdown = this,
        $this = $(element),
        $options = options || {},
        $buttonChoose = $this.find('.button-choose'),
        $list = $this.find('.list'),
        $listItems = $list.find('button'),
        $textChoose = $options.text || '',
        $index = $options.index || 1;

    dropdown.init = function () {
        if ($textChoose != '') {
            this.setSelectedText($buttonChoose, $textChoose);
        }
        this.bindHandlers();
    }
    dropdown.bindHandlers = function () {

        var self = this;
        $this.on('click', function (e) {
            var $target = $(e.target);
            if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                self.toggleListExpanded();
            } else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                $buttonChoose.text($target.text());
                self.unExpanded();
            }
        });
    }
    dropdown.setSelectedText = function (element, text) {
        element.text(text);
    }
    dropdown.toggleListExpanded = function () {
        if ($listItems.length < 1) {
            return;
        }
        if ($list.hasClass('attached')) {
            this.unExpanded()
        } else {
            this.expanded();
        }
    }
    dropdown.expanded = function () {
        if (!$list.hasClass('attached')) {
            $buttonChoose.addClass('expanded');
            $list.addClass('attached');
            $list.attr('aria-hidden', 'false');
        }
    }
    dropdown.unExpanded = function () {
        if ($list.hasClass('attached')) {
            $buttonChoose.removeClass('expanded');
            $list.removeClass('attached');
            $list.attr('aria-hidden', 'true');
        }
    }
    dropdown.init();
}

$.fn.Dropdown = function (options) {
    return this.each(function () {
        if (undefined == $(this).data('Dropdown')) {
            var plugin = new $.Dropdown(this, options);
            $(this).data('Dropdown', plugin);
        }
    });
}

// 숫자를 증가시키며 애니메이션하는 함수
function counterup(x) {
    // x 요소의 텍스트 값을 가져옴
    const value = $(x).text();

    // jQuery animate 메서드를 사용하여 숫자 증가 애니메이션 실행
    $({ val: 0 }).animate({ val: value }, {
        duration: 1000,
        step: function () {
            // 숫자에 쉼표를 추가한 형식으로 텍스트 업데이트
            const num = numberWithCommas(this.val.toFixed(1));
            $(x).text(num);
        },
        complete: function () {
            // 애니메이션 완료 후에도 숫자에 쉼표를 추가한 형식으로 텍스트 업데이트
            const num = numberWithCommas(this.val.toFixed(1));
            $(x).text(num);
        }
    });

    // 숫자에 쉼표를 추가하는 함수
    function numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

