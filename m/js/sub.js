String.prototype.insert = function (index, string) {
    if (index > 0) {
        return this.substring(0, index) + string + this.substring(index, this.length);
    }
    return string + this;
};

/**
* @title 콤마 포함 스트링 숫자 반환
* @param {string} stringNumber 
* @returns integer
*/
const stringNumberToInt = (stringNumber) => {
    return parseInt(stringNumber.replace(/,/g, ''));
}
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * @title 여론조사 0000.00.00 format parsing
 * @param {date} date 
 * @returns 
 */
const getDateFormatter = (date) => {
    return date.insert(4, '.').insert(7, '.').substring(0, 10);
}

/**
 * @title 생년월일 파서
 * @param {생년월일} year 
 * @returns @Array
 */
const getAgeFormatter = (year) => {
    return [
        year.split('.')[0],
        year.split('.')[1],
        year.split('.')[2],
    ]
}

/**
 * @title 정당이름 없음, 모름/무응답 시 - 처리 포매터
 * @param {정당이름} jdTitle 
 * @return {boolean} true: - 처리 / false: - 원래 순위 반영
 */
const pollRankBarFormatter = (jdTitle) => {
    switch (jdTitle) {
        case '없음':
            return true;
            break;
        case '모름/무응답':
            return true;
            break;
        case '없음/무응답':
            return true;
            break;
        default:
            return false;
            break;
    }
}

/**
 * @name 판지비-클래스포매팅
 * @param {판단값} pangb @type {9:미판정,3:유력,2:확실,1:당선}
 */
const getPangbFormatting = (pangb) => {
    let str = ``;
    switch (pangb) {
        /**
         * @name 무투표당선
         */
        case 0:
            str = 'mylst_elected';
            break;
        /**
         * @name 당선
         */
        case 1:
            str = 'mylst_elected';
            break;
        /**
         * @name 확실
         */
        case 2:
            str = 'mylst_definite';
            break;
        /**
         * @name 유력
         */
        case 3:
            str = 'mylst_reliable';
            break;
    }
    return str;
}

/**
 * @title hexCode color 타입 변환 팩토리
 * @param {string} hexCode 
 * @return {number} string
 */
const getDeepPollBarHexColorFactory = (hexCode) => {
    return ['#6bb8b3', '#724888', '#465f88', '#97aab6', '#467b88', '#48446d', '#d1c0a5', '#d2d2d2', '#787878'].indexOf(hexCode) + 1;
}

/**
 * @title 심층 조사 양자가로구도 정당 컬러값 매핑 팩토리
 * @param {정당코드} jdCode 
 */
const getDeepPollTwoHorizonGudoColorFactory = (jdCode) => {
    switch (jdCode) {
        case '6', '7', '8', '9':
            return '9';
            break;
        case '5':
            return '7';
            break;
        default:
            return jdCode;
    }
}

/**
 * @title 정당코드 반환 팩토리
 * @param {정당이름} jdName 
 * @returns 
 */
const getJdCodeByJdName = (jdName) => {
    let jdCode = 0;
    switch (jdName) {
        case '국민의힘':
            jdCode = 1;
            break;
        case '더불어민주당':
            jdCode = 2;
            break;
        case '정의당':
            jdCode = 3;
            break;
        case '국민의당':
            jdCode = 4;
            break;
        case '그 외 정당':
            jdCode = 9;
            break;
        case '그 외':
            jdCode = 9;
            break;
        case '그외':
            jdCode = 9;
            break;
        default:
            jdCode = 99;
            break;
    }
    return jdCode;
}


/**
* @title 정당이름 그래프 바 색 팩토리
* @param {number} jdcode 정당이름
* @returns graph color
*/
const setGraphColorFactory = (jdcode) => {
    let color = '';
    switch (jdcode) {
        case '더불어민주당':
            color = 'thumin';
            break;
        case '국민의힘':
            color = 'ppp';
            break;
        case '정의당':
            color = 'justice';
            break;
        case '무소속':
            color = 'no';
            break;
        default:
            color = 'etc';

    }
    return color;
}

/**
 * @name 정당이름by정당코드
 * @param {*} jdcode 
 * @returns 
 */
const getJdNameFactory = (jdcode) => {
    let jdName = ``;
    switch (jdcode) {
        case 0:
            jdName = '기타';
            break;
        case 1:
            jdName = '더불어민주당';
            break;
        case 2:
            jdName = '국민의힘';
            break;
        case 3:
            jdName = '정의당';
            break;
        case 99:
            jdName = '무소속';
            break;
        default:
            jdName = '기타';
            break;
    }
    return jdName;
}
/**
* @name 선거이름포매팅
* @param {*} typecode 
*/
const getPositionFormatting = (typecode) => {
    let positionType = ``;
    let positionNum = 0;
    switch (typecode) {
        case 2:
            positionType = '국회의원';
            positionNum = 7;
            break;
        case 3:
            positionType = `시·도지사`;
            positionNum = 17;
            break;
        case 4:
            positionType = `구·시·군의장`;
            positionNum = 226;
            break;
        case 5:
            positionType = `시·도·의회의원`;
            positionNum = 779;
            break;
        case 6:
            positionType = `구·시·군의회의원`;
            positionNum = 2601;
            break;
        case 8:
            positionType = `광역의원비례`;
            positionNum = 93;
            break;
        case 9:
            positionType = `기초의원비례`;
            positionNum = 386;
            break;
        case 11:
            positionType = `교육감`;
            positionNum = 17;
            break;
    }
    return { positionType, positionNum };
}

const SIDO_ENUM = {
    1: {
        name: '서울',
        full: '서울특별시'
    },
    2: {
        name: '부산',
        full: '부산광역시'
    },
    3: {
        name: '대구',
        full: '대구광역시'
    },
    4: {
        name: '인천',
        full: '인천광역시'
    },
    5: {
        name: '광주',
        full: '광주광역시'
    },
    6: {
        name: '대전',
        full: '대전광역시'
    },
    7: {
        name: '울산',
        full: '울산광역시'
    },
    8: {
        name: '세종',
        full: '세종특별자치시'
    },
    9: {
        name: '경기',
        full: '경기도'
    },
    10: {
        name: '강원',
        full: '강원도'
    },
    11: {
        name: '충북',
        full: '충청북도'
    },
    12: {
        name: '충남',
        full: '충청남도'
    },
    13: {
        name: '전북',
        full: '전라북도'
    },
    14: {
        name: '전남',
        full: '전라남도'
    },
    15: {
        name: '경북',
        full: '경상북도'
    },
    16: {
        name: '경남',
        full: '경상남도'
    },
    17: {
        name: '제주',
        full: '제주특별자치도'
    },
}
/**
 * @name 육각형맵클래스매핑
 */
const hexMapLocalValue = {
    '서울': {
        line: '2',
        nh: '2-2'
    },
    '부산': {
        line: '4',
        nh: '4-4'
    },
    '대구': {
        line: '3',
        nh: '3-4'
    },
    '인천': {
        line: '1',
        nh: '1-2'
    },
    '광주': {
        line: '1',
        nh: '1-5'
    },
    '대전': {
        line: '2',
        nh: '2-4'
    },
    '울산': {
        line: '4',
        nh: '4-3'
    },
    '세종': {
        line: '2',
        nh: '2-3'
    },
    '경기': {
        line: '3',
        nh: '3-2'
    },
    '강원': {
        line: '4',
        nh: '4-1'
    },
    '충북': {
        line: '3',
        nh: '3-3'
    },
    '충남': {
        line: '1',
        nh: '1-3'
    },
    '전북': {
        line: '1',
        nh: '1-4'
    },
    '전남': {
        line: '2',
        nh: '2-5'
    },
    '경북': {
        line: '4',
        nh: '4-2'
    },
    '경남': {
        line: '3',
        nh: '3-5'
    },
    '제주': {
        line: '1',
        nh: '1-6'
    },
}

/**
 * @name 타입코드이름
 * @param {typecode} typecode 
 */
const PositionCodeFormatter = (typecode) => {
    let str = ``;
    const t = Number(typecode);
    switch (t) {
        case 5:
            str = `의회 의원`;
            break;
        case 6:
            str = `의회 의원`;
            break;
    }
    return str;
}

/**
 * @title 정당지지도 bar 컬러 값
 * @param {string} jdCode
 */
const getBarGraphColorBar = (jdCode) => {
    return [''].indexOf(hexCode) + 1;
}

/**
 * @title 소수점 반올림
 * @param {double} val 
 * @returns 00
 */
const getMathRound = (val) => {
    return Math.round(Number(val));
}

// voteLib
Date.prototype.yyyymmdd = () => {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};

Date.prototype.hhmm = () => {
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();

    return [(hh > 9 ? '' : '0') + hh,
    (mm > 9 ? '' : '0') + mm,
    ].join('');
};
Date.prototype.yyyymmddhhmmss = () => {
    return this.yyyymmdd() + this.hhmm();
};

const baseURl = `//vote2022local.imbc.com/`;

const VoteLib = {
    GetApiRequest: (apiLink, params, retCallback, callback) => {
        const sLink = apiLink.split("/");
        const controlUrl = `${baseURl}${apiLink}?d=${getStrDate()}`;

        $.ajax({
            type: "GET",
            dataType: 'json',
            data: params,
            url: controlUrl,
            cache: true,
            async: false,
            success: function (data) {
                if (data) {
                    return callback(data);
                }
            },
            error: function (request, status, error) {
            }
        });
    }
}


/**
 * @title timecode 리턴
 * @returns 타임코드
 */
const getStrDate = () => {
    let tday = new Date();
    let tYear = tday.getFullYear();
    let tMonth = tday.getMonth() + 1;
    let tDate = tday.getDate();
    let tHours = tday.getHours();
    let tMinutes = tday.getMinutes();
    let tSecond = tday.getSeconds();

    tMonth = tMonth > 9 ? tMonth : "0" + tMonth;
    tDate = tDate > 9 ? tDate : "0" + tDate;
    tHours = tHours > 9 ? tHours : "0" + tHours;
    tMinutes = tMinutes > 9 ? tMinutes : "0" + tMinutes;
    tSecond = Math.floor(tSecond / 10);

    return tYear.toString() + tMonth.toString() + tDate.toString() + tHours.toString() + tMinutes.toString() + tSecond.toString();
}

// 여론조사
function researchDate() {
    $('.poll-date ul').slick({
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        speed: 300,
        arrows: false,
        dots: false,
    });
}

$(function () {

    $('.deep_tab li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('.deep_tab li').removeClass('on');
        $('.deep_wrap').removeClass('on');
        $(this).addClass('on');
        $("#" + tab_id).addClass('on');
    });

    // 방송3사 예측순위 탭
    $('.mayor_lst ul li').on('click', function () {
        $('.mayor_lst ul li').removeClass('on');
        $(this).addClass('on');

        $('.mayor_lst ul li').attr('title', '');
        $(this).attr('title', '선택됨');
    });

    // 화제지역 탭
    $('.rlg_section .dstrt_area ul li').on('click', function () {
        $('.rlg_section .dstrt_area ul li').removeClass('on');
        $(this).addClass('on');

        $('.rlg_section .dstrt_area ul li').attr('title', '');
        $(this).attr('title', '선택됨');
    });
    $('.remc_section .dstrt_area ul li').on('click', function () {
        $('.remc_section .dstrt_area ul li').removeClass('on');
        $(this).addClass('on');

        $('.remc_section .dstrt_area ul li').attr('title', '');
        $(this).attr('title', '선택됨');
    });
    // 화제지역-재보궐 국회의원 탭
    $('.remc_section .dstrt_area ul li').on('click', function () {
        $('.remc_section .dstrt_area ul li').removeClass('on');
        $(this).addClass('on');

        $('.remc_section .dstrt_area ul li').attr('title', '');
        $(this).attr('title', '선택됨');
    });

    // 전국 예측 1위 판세 탭

    $('.hex_map_lst li').on('click', function () {
        $('.hex_map_lst li').removeClass('on');
        $(this).addClass('on');

        $('.hex_map_lst li').attr('title', '');
        $(this).attr('title', '선택됨');
    });

    // 전국 예측 1위 판세 탭
    $('.nowtop_lst li').on('click', function () {
        var tab_id = $(this).attr('data-tab');
        $('.nowtop_lst li').removeClass('on');
        $('.nowtop_wrap').removeClass('on');
        $(this).addClass('on');
        $("#" + tab_id).addClass('on');

        $('.nowtop_lst li').attr('title', '');
        $(this).attr('title', '선택됨');
    });


    // 당선자 탭
    $('.win_lst ul li').on('click', function () {
        $('.win_lst ul li').removeClass('on');
        $(this).addClass('on');

        $('.win_lst ul li').attr('title', '');
        $(this).attr('title', '선택됨');
    });
});
