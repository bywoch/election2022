/**
 * @name 최신투표정보값
 */
let VOTE_INFO = {};
/**
 * @title 2022 지방선거 선거 상태값
 */
const VOTE2022_STATUS = {
    /**
     * @name 선거상태
     */
    VOTE_STATUS: Number,
    /**
     * @name 개표상태
     */
    GEPYO_YN: String,
    /**
     * @name 출구조사상태
     */
    CG_YN: String,
    /**
     * @name 심층출구조사상태
     */
    DEEP_YN: String,
    /**
     * @name 보궐선거상태
     */
    BG_YN: String,
    /**
     * @name 선거방송Live상태
     */
    BS_YN: String,
    /**
     * @name 당선여부상태
     * @default N
     */
    DS_YN: String,
    /**
     * @name 전체업데이트-시간
     */
    UPT_DATE: String,
    /**
     * @name 데이터-업데이트시간
     */
    DATA_UPT_DATE: String,
    ///////////////// GPRATE API ////////////////
    /**
     * @name 개표율
     */
    GEPYO_RATE: Number,
    /**
     * @name 개표수
     */
    GEPYO_SUM: Number,
}

/**
 * @title 투표상태 String 팩토리
 * @param {number} 시간
 * @return 투표전, 투표중, 투표마감
 */
const getVoteStatusFacotry = () => {
    const now = new Date();
    const status_voteToday_Date = new Date('2022/06/01 00:00:00');
    const status_voteIng_Date = new Date('2022/06/01 07:00:00');
    const status_voteEnd_Date = new Date('2022/06/01 19:30:00');
    const status_openIng_Date = new Date('2022/06/01 21:00:00');

    if (VOTE2022_STATUS.GEPYO_RATE == 100 || VOTE2022_STATUS.GEPYO_RATE == 100.0) {
        return '개표완료'
    }
    else if (now >= status_openIng_Date || VOTE2022_STATUS.GEPYO_YN == 'Y') { //시간이 됫거나 개표Y일때
        return '개표중'
    }
    else if (now >= status_voteEnd_Date) {
        return '투표마감';
    }
    else if (now >= status_voteIng_Date) {
        return '투표중';
    }
    else if (now >= status_voteToday_Date && now <= status_voteIng_Date) {
        return '투표중';
    }
    else {
        return '투표중'
    }
}



/**
 * @name 소수점없게-반올림함수
 * @param {소수점숫자} num 
 */
const mathRoundUtil = (num) => {
    return Math.round(num);
}
/**
 * @name 소수점한자리-반올림함수
 * @param {소수점숫자} num 
 */
const mathRoundDotOneUtil = (num) => {
    return ((Math.round(num * 10)) / 10).toFixed(1);
}


/**
 * @title 선거관리상태
 */
const getStatus = () => {
    VoteLib.GetApiRequest(`Api/Status`, {}, 'Status', (data) => {
        try {
            VOTE2022_STATUS.VOTE_STATUS = data.VOTE_STATUS;
            VOTE2022_STATUS.GEPYO_YN = data.GEPYO_YN;
            VOTE2022_STATUS.CG_YN = data.CG_YN;
            VOTE2022_STATUS.DEEP_YN = data.DEEP_YN;
            VOTE2022_STATUS.BG_YN = data.BG_YN;
            VOTE2022_STATUS.BS_YN = data.BS_YN;
            VOTE2022_STATUS.DS_YN = data.DS_YN;
            VOTE2022_STATUS.UPT_DATE = data.UPT_DATE;
            VOTE2022_STATUS.DATA_UPT_DATE = data.DATA_UPT_DATE;
            //최신 투표율상태 반환(TP_RATE)
            getCommonTimeTpRate();
            getGPRATE();
        }
        catch (e) {
            console.log(e);
        };
    });
}
/**
 * @name 개표데이터
 */
const getGPRATE = () => {
    VoteLib.GetApiRequest(`Api/GPRate`, {}, 'Status', (data) => {
        try {
            VOTE2022_STATUS.GEPYO_RATE = data.GEPYO_RATE;
            VOTE2022_STATUS.GEPYO_SUM = data.GEPYO_SUM;
        }
        catch (e) {
            console.log(e);
        };
    });
}

/**
 * @title 숫자 한자리에 0붙이기 포매터
 * @param {숫자} num 
 * @returns 01, 02... 
 */
const paddedFormat = (num) => {
    return num < 10 ? "0" + num : num;
}

/**
 * @title 투표종료 카운트 interval
 * @param {투표종료일자시간} dt 
 * @param id
 */
const CountDownTimer = (dt, id) => {
    const end = new Date(dt);
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;
    let timer;
    showRemaining();

    function showRemaining() {
        const now = new Date();
        const distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            $('#rate_count').hide();
            return;
        }
        const hours = Math.floor((distance % _day) / _hour);
        const minutes = Math.floor((distance % _hour) / _minute);
        const seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = `
            투표 종료 19시 30분까지 
            <strong>
                <span class="rate_hour">${paddedFormat(hours)}</span>:
                <span class="rate_minute">${paddedFormat(minutes)}</span>:
                <span class="rate_second">${paddedFormat(seconds)}</span>
                남음
            </strong>`

        $('#rate_count').show();
    }

    timer = setInterval(showRemaining, 1000);
}

const onTimerHandler = () => {
    CountDownTimer('2022/06/01 19:30:00', 'rate_count');
}
/**
 * @name 가장최신-투표율
 */
const getCommonTimeTpRate = () => {
    VoteLib.GetApiRequest(`Api/TPTime`, {}, 'Status', ({ list }) => {
        try {
            if (list) {
                VOTE_INFO = list[list.length - 1];
            }
        }
        catch (e) {
            console.log(e);
        };
    });
}
/*
const getTpRateHeader = () => {
    try{
        let percent = 0;
        let statusName = '';
        let status = getVoteStatusFacotry();

        if(status.includes('투표')){
            if(VOTE_INFO){
                //투표율
                percent = VOTE_INFO.TP_RATE;
                statusName = '투표'
            }
        }
        else{
            //개표율
            percent = VOTE2022_STATUS.GEPYO_RATE;
            statusName = '개표'
        }
        $('.rate_onair').html(`
            <p class="r_o_time">전국 ${statusName}율<br><span class="rot_txt">${VOTE2022_STATUS.DATA_UPT_DATE} 기준</span></p>
            <p class="r_o_percent"><span class="counter">${percent}</span><span class="font_small">%</span></p>
            <p class="r_o_txt">${status}</p>`
        );
    }catch(e){
        console.log(e);
    }
}
*/
