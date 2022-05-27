/* iMBC System Development Team BWC 211201 */
$(document).ready(function () {
    getStatus();
});

// Header
$(function (header) {
    let headerHtml = '';
    headerHtml += `
        <div class="logo_wrap">
            <div class="logo logo_imnews">
                <a href="https://imnews.imbc.com/">
                    <span class="blind">MBC 뉴스</span>
                </a>
            </div>
            <div class="logo logo_2022vote">
                <a href="https://imnews.imbc.com/issue/2022vote/m/main_m.html">
                    <h1 class="blind">선택 2022 - 제8회 전국동시지방선거</h1>
                </a>
            </div>`
    //라이브방송
    if (getHeaderStatusFacotry() == 'LIVE') {
        headerHtml += `
                <div class="logo live_day" onclick="window.open('http://m.imbc.com/onair')">
                    <p class="day_txt">선거 개표방송</p>
                    <p id="today" class="d_day"></p>
                `;
    }
    else {
        headerHtml += `
            <div class="logo logo_day">
                <p id="dday" class="d_day"></p>`
    }
    headerHtml += `           
            </div>
        </div>
        `;
    $('#header').append(headerHtml);
});

// Menu
$(function (naviMenu) {
    let naviHtml = '';
    naviHtml += `
        <ul id='gnb_header'>`;
    //투표중일때

    naviHtml += `
            <li class="vote_lst"><a href="//imnews.imbc.com/issue/2022vote/m/vote/index.html">투표현황</a></li>
        
        <li class="forecast_lst"><a href="${VOTE2022_STATUS.CG_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/forecast/index.html' : 'javascript:alert(`출구조사 발표 시 오픈됩니다.`);'}">출구조사</a></li>   
        <li class="open_lst"><a href="${VOTE2022_STATUS.GEPYO_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/open/index.html' : 'javascript:alert(`개표 시작 시 오픈됩니다.`);'}">개표현황</a></li>     
        <li class="district_lst"><a href="//imnews.imbc.com/issue/2022vote/m/district/index.html">화제지역</a></li>
        <li class="news_lst"><a href="//imnews.imbc.com/issue/2022vote/m/news/index.html">뉴스</a></li>
        <li class="winner_lst"><a href="${VOTE2022_STATUS.DS_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/winner/index.html' : 'javascript:alert(`당선자 확정 시 오픈됩니다.`);'}">당선자</a></li>`;

    naviHtml += `
            <li class="video_lst"><a href="//imnews.imbc.com/issue/2022vote/m/keyword/index.html">영상</a></li>
            <li class="research_lst"><a href="//imnews.imbc.com/issue/2022vote/m/research/index.html">판세</a></li>
            <li class="candidate_lst"><a href="//imnews.imbc.com/issue/2022vote/m/candidate/index.html">후보</a></li>
        </ul>
        <button type="button" class="menu_btn btn_gnb" title="전체 메뉴 펼치기"></button>
        <div class="menu_wrap">
            <div class="menu_top">
                <ul>
                <li><a href="https://imnews.imbc.com/m_main.html" target="_blank">MBC 뉴스</a></li>
                <li><a href="https://imnews.imbc.com/issue/2022vote/m/main_m.html" target="_blank">MBC (제8회 전국동시지방선거)</a></li>
                </ul>
            </div>
            <div class="menu_list">
                <ul>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/vote/index.html">투표현황</a></li>
                    <li><a href="${VOTE2022_STATUS.CG_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/forecast/index.html' : 'javascript:alert(`출구조사 발표 시 오픈됩니다.`);'}">출구조사</a></li>
                    <li><a href="${VOTE2022_STATUS.GEPYO_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/open/index.html' : 'javascript:alert(`개표 시작 시 오픈됩니다.`);'}">개표현황</a></li>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/district/index.html">화제지역</a></li>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/news/index.html">뉴스</a></li>
                    <li><a href="${VOTE2022_STATUS.DS_YN == 'Y' ? '//imnews.imbc.com/issue/2022vote/m/winner/index.html' : 'javascript:alert(`당선자 확정 시 오픈됩니다.`);'}">당선자</a></li>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/keyword/index.html">영상</a></li>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/research/index.html">판세</a></li>
                    <li><a href="//imnews.imbc.com/issue/2022vote/m/candidate/index.html">후보</a></li>
                </ul>
            </div>
            <button type="button" class="menu_btn btn_close" title="전체 메뉴 닫기"></button>
        </div>
        <div class="btnGnbEvent"></div>
    `;
    $('#navi').append(naviHtml);
    //gnb 너비 지정 및 플리킹 설정
    setGnbWidth();
});

// Footer
$(function (footer) {
    var footerHtml = '';
    footerHtml += `
        <div class="footer_wrap">
            <div class="footer_sns">
                <ul>
                    <li class="icon_youtube"><a href="https://www.youtube.com/mbcnews11" target="_blank" title="새창열림">유튜브</a></li>
                    <li class="icon_facebook"><a href="https://www.facebook.com/MBCnews" target="_blank" title="새창열림">페이스북</a></li>
                    <li class="icon_tweeter"><a href="http://twitter.com/mbcnews" target="_blank" title="새창열림">트위터</a></li>
                    <li class="icon_instagram"><a href="https://www.instagram.com/mbcnews_official/" target="_blank" title="새창열림">인스타그램</a></li>
                    <li class="icon_band"><a href="https://band.us/@mbcnewsofficial" target="_blank" title="새창열림">밴드</a></li>
                    <li class="icon_post"><a href="https://post.naver.com/mbcnews_official" target="_blank" title="새창열림">네이버 포스트</a></li>
                </ul>
            </div>
            <div class="footer_nav">
                <ul>
                    <li><a href="http://aboutmbc.imbc.com/">MBC소개</a></li>
                    <li><a href="https://imnews.imbc.com/more/privacy/">개인정보처리방침</a></li>
                    <li><a href="http://m.imbc.com/notice/terms.html">이용약관</a></li>
                </ul>
                <p>- 기사배열, 청소년보호 책임자 : 연보흠 -</p>
            </div>
            <div class="footer_copy">Copyrightⓒ MBC All rights reserved.</div>
            <div class="footer_active">
                <a target="_blank" href="https://www.nec.go.kr/site/lvt/main.do">
                    <img src="https://image.imnews.imbc.com/issue/vote2022/m/images/logo_active.png" alt="중앙선거관리위원회 로고">
                </a>
            </div>
        </div>`;
    $('#footer').append(footerHtml);
});

// D-day
$(function (dday) {
    let today = new Date();
    var dday = new Date(2022, 5, 1); // 선거일 6월 1일
    let gap = dday.getTime() - today.getTime();
    let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    //document.getElementById('dday').append("D- " + result);
    const status = getHeaderStatusFacotry();

    switch (status) {
        case 'DDAYCOUNT':
            $('#dday').html("D-" + result);
            break;
        case 'LIVE':
            document.getElementById('today').append("LIVE");
            break;
        case 'DONE':

            break;
    }
});

/**
 * @title 투표상태 String 팩토리
 * @param {number} 시간
 * @return 상태값
 */
const getHeaderStatusFacotry = () => {
    const now = new Date();

    /**
     * @name 투표날시작
     */
    const status_voteToday_Date = new Date('2022/06/01 00:00:00');

    if (VOTE2022_STATUS.BS_YN == 'Y') {
        return 'LIVE';
    }
    else if (VOTE2022_STATUS.BS_YN == 'N' && now > status_voteToday_Date) {
        return 'DONE';
    }
    else {
        return 'DDAYCOUNT';
    }
}

/**
 * @title gnb 자동 너비 조정 및 플리킹 지정
 */
const setGnbWidth = () => {
    $('#navi').addClass('fliking');
    const list = document.getElementById('gnb_header').getElementsByTagName('li');
    //let hamburgerBoxWidth = 35;
    let gnbHeaderWidth = 0;
    for (let item of list) {
        gnbHeaderWidth += item.offsetWidth;
    }
    gnbHeaderWidth += 40;
    $('#gnb_header').width(gnbHeaderWidth);
}

/**
 * @name gnb-클라이언트width
 * @param {} num: li태그 내부텍스트 길이
 */
const getClientWidth = (num) => {
    let width = 0;
    switch (num) {
        case 1:
            width = 35;
            break;
        case 2:
            width = 51;
            break;
        case 3:
            width = 66;
            break;
        case 4:
            width = 81;
            break;
        default:
            width = 81;
            break;
    }
    return width;
}

$(function () {
    /* gnb button */
    $('.btn_gnb').on('click', () => { // 191211 .m_header 추가
        // 메뉴 슬라이드 인
        $('.menu_wrap').stop().animate({
            'right': '0'
        }, 400).addClass('active');
        $('.btn_close').css('display', 'block');
        $('.btn_gnb').css('display', 'none');
        $('.btnGnbEvent').css('display', 'block');
        $('html, body').addClass('sortable-handler');
        $('#navi').height('100%');
        $('.navi>ul').css('background', 'rgba(255, 255, 255, 0.9)');
        $('.navi').css('background', '');
    });

    /* gnb close button */
    $('.btn_close, .btnGnbEvent').on('click', () => {
        // 메뉴 슬라이드 아웃
        $('.menu_wrap').stop().animate({
            'right': '-90%'
        }, 400).removeClass('active');
        $('.btn_close').css('display', 'none');
        $('.btn_gnb').css('display', 'block');
        $('.btnGnbEvent').css('display', 'none');
        $('html, body').removeClass('sortable-handler');

        // debounce 함수 호출
        debounce();
    });
});

function applyHeight() {
    $('.navi>ul').css('background', '');
    $('.navi').height('auto');
    $('.navi').css('background', 'rgba(255, 255, 255, 0.9)');
}

function debounce(delay = 500) {
    let timer = null;

    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(applyHeight, delay);
}

$(function () {
    // 스크롤 이벤트 리스너 등록
    $(window).scroll(() => {
        // 스크롤 이벤트 발생 시 호출되는 함수 정의
        function scrollFix() {
            const scroll_top = $(window).scrollTop();
            const header_h = 60;

            if (scroll_top > header_h) {
                // 스크롤 위치가 헤더 아래에 있는 경우
                $('.navi').addClass('fixed');
                $('.btn_gnb').css({
                    'top': '13px',
                    'position': 'fixed'
                });
                $('.navi .nav_blur').css({
                    'top': '0',
                    'position': 'fixed'
                });
                $('.container').css('margin-top', '45px');
            } else {
                // 스크롤 위치가 헤더 내에 있는 경우
                $('.navi').removeClass('fixed');
                $('.btn_gnb').css({
                    'top': '73px',
                    'position': 'absolute'
                });
                $('.navi .nav_blur').css({
                    'top': '60px',
                    'position': 'absolute'
                });
                $('.container').css('margin-top', '0');
            }
        }

        // 스크롤 이벤트 발생 시 스크롤 위치에 따라 화면 조정 함수 호출
        scrollFix();
    });
});

// 뉴스 리스트 반응형 height resize
$(function () {
    // .keyword_more 요소에 클릭 이벤트 리스너 추가
    $('.mbc-research .keyword_more').on('click', () => {
        // 클릭한 요소의 형제 요소 중 .news_bx를 찾고, 그 하위 ul li a 요소의 높이를 계산
        const alinkBx = $(this).siblings('.news_bx').find('ul li a').outerHeight(true);
        
        // 계산된 높이를 정수로 변환하여 newsListBx 변수에 저장
        const newsListBx = Math.floor(alinkBx);
        
        // 해당 .news_bx 내부의 ul li 요소의 높이를 newsListBx로 설정
        $(this).siblings('.news_bx').find('ul li').css('height', newsListBx);
        
        // 창 크기 변경 시 이벤트 리스너 추가
        $(window).resize(() => {
            // .news_bx 내부의 ul li a 요소의 높이를 다시 계산
            const alink2Bx = $('.news_bx ul li a').outerHeight(true);
            
            // 계산된 높이를 정수로 변환하여 newsList2Bx 변수에 저장
            const newsList2Bx = Math.floor(alink2Bx);
            
            // .news_bx 내부의 ul li 요소의 높이를 newsList2Bx로 설정
            $('.news_bx ul li').css('height', newsList2Bx);
        });
    });
});


// href="#" 동작 제거
$(function () {
    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });
});

function SetV22ErrorImage(obj) {
    obj.src = "https://image.imnews.imbc.com/issue/vote2022/images/default_2022.jpg";
}
