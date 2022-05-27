window.onload = () => {
    onTimerHandler();
    VoteNow2022.Init();
};

/**
 * @title 제 8대 지방선거 mbc 선택 2022 출구조사 페이지 cpr
 * @corp @mbc
 */
const VoteNow2022 = (function () {
    let tpData = {
        /**
         * @name 최고지역투표율
         */
        highLocationTPRate: String,
        /**
         * @name 최고투표율지역
         */
        highLocationTPCity: String,
        /**
        * @name 최저지역투표율
        */
        lowLocationTPRate: String,
        /**
        * @name 최저투표율지역
        */
        lowLocationTPCity: String,
    }
    let pretpData = {
        /**
         * @name 최고지역사전투표율
         */
        highLocationTPRate: String,
        /**
         * @name 최고사전투표율지역
         */
        highLocationTPCity: String,
        /**
        * @name 최저지역사전투표율
        */
        lowLocationTPRate: String,
        /**
        * @name 최저사전투표율지역
        */
        lowLocationTPCity: String,
    }
    const Init = () => {
        getStatus();
        getTpRateHeaderVote();
        getSidoTpRate(1);
        getBgTpRate();
        getTpSidoTop3(1);
    }
    /**
    * @name 투표중/투표마감 핸들러
    * @returns 
    */
    const getVoteStatus = () => {
        const now = new Date();

        const status_voteToday_Date = new Date('2022/06/01 00:00:00');
        const status_voteIng_Date = new Date('2022/06/01 07:00:00');
        const status_voteEnd_Date = new Date('2022/06/01 19:30:00');

        if (now >= status_voteEnd_Date) {
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
     * @name 투표중-헤더
     */
    const getTpRateHeaderVote = () => {
        try {
            let percent = 0;
            let statusName = '';
            let status = getVoteStatus();

            if (VOTE_INFO) {
                //투표율
                percent = VOTE_INFO.TP_RATE;
                statusName = '투표'
            }

            $('.rate_onair').html(`
                <p class="r_o_time">전국 투표율<br><span class="rot_txt">${VOTE2022_STATUS.DATA_UPT_DATE} 기준</span></p>
                <p class="r_o_percent"><span class="counter">${percent}</span><span class="font_small">%</span></p>
                <p class="r_o_txt">${status}</p>`
            );
        } catch (e) {
            console.log(e);
        }
    }


    /**
    * @title  { @투표율 최고 득표율 도시, 최저 득표율 도시, 최고 득표율, 최저 득표율}
    * @description  @필드값세팅
    * @param {Array} data
    */
    const getHighLowValueTPSido = (data) => {
        const arr = [...data].reverse();
        arr.sort((a, b) => b.TP_RATE_REAL - a.TP_RATE_REAL);
        tpData.highLocationTPRate = arr[0].TP_RATE;
        tpData.lowLocationTPRate = arr[arr.length - 1].TP_RATE;
        tpData.highLocationTPCity = arr[0].SDNAME;
        tpData.lowLocationTPCity = arr[arr.length - 1].SDNAME;
    }

    /**
    * @title  { @사전투표율 최고 득표율 도시, 최저 득표율 도시, 최고 득표율, 최저 득표율}
    * @description  @필드값세팅
    * @param {Array} data
    */
    const getHighLowValuePreVoteTPSido = (data) => {
        const arr = [...data].reverse();
        arr.sort((a, b) => b.REGEION_VOTE_RATE - a.REGEION_VOTE_RATE);
        pretpData.highLocationTPRate = arr[0].REGEION_VOTE_RATE;
        pretpData.lowLocationTPRate = arr[arr.length - 1].REGEION_VOTE_RATE;
        pretpData.highLocationTPCity = arr[0].REGEION_NAME_B;
        pretpData.lowLocationTPCity = arr[arr.length - 1].REGEION_NAME_B;
    }
    /**
     * @name 투표율그래프데이터-매핑
     */
    const getTimeTpRate = () => {
        const arr = new Array(14).fill(null);
        VoteLib.GetApiRequest(`Api/TPTime`, {}, 'Status', ({ list }) => {
            console.log(arr);
            for (let i = 0; i < list.length; i++) {
                const e = list[i];
                if (e.MTIME == 30) {
                    break;
                }
                else if (i > 0 && list[i].TP_RATE > 0 && list[i].TP_RATE <= list[i - 1].TP_RATE) {
                    arr[i] = (list[i - 1].TP_RATE);
                    break;
                }
                else if (e.MTIME == 20) {
                    arr[arr.length - 1] = (e.TP_RATE) == 0 ? null : e.TP_RATE;
                    continue;
                }
                if (e.TP_RATE) {
                    arr[i] = (e.TP_RATE);
                }
            }
        });
        console.log(arr);
        return arr;
    }

    /**
     * @name 시도별투표율
     * @param idx : 1: 현재, 2: 사전투표율
     */
    const getSidoTpRate = (idx) => {
        let html = ``;

        /**
         * @name 투표율-매핑
         */
        if (idx == 1) {
            $('#prevote_msg').hide();
            VoteLib.GetApiRequest(`Api/TPSido`, {}, 'Status', (data) => {
                if (data.length > 0) {
                    getHighLowValueTPSido(data);
                    try {
                        data.forEach((e, i) => {
                            html +=
                                `
                                    <li class="hex hexnum nh-line-${hexMapLocalValue[e.SDNAME].line} nh-${hexMapLocalValue[e.SDNAME].nh} 
                                        ${tpData.highLocationTPCity == e.SDNAME ? 'arvt_high arvt_shadow' : ''}
                                        ${tpData.lowLocationTPCity == e.SDNAME ? 'arvt_low arvt_shadow' : ''}
                                        ">
                                        <div class="hex_bx">
                                            <p class="hex_area">${e.SDNAME}</p>
                                            <span class="hex_percent"><span class="hp_count">${e.TP_RATE}</span>%</span>
                                        </div>
                                    </li>
                                `;
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    $('#tpRateByLocal').html(html);
                }
            });
        }
        /**
         * @name 사전투표율-매핑
         */
        if (idx == 2) {
            $('#prevote_msg').show();
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: `//vote2022.imbc.com/LocalEarlyVote/LateTPTime?d=${getStrDate()}`,
                async: false,
                success: function (res) {
                    const { data } = res;
                    if (data) {
                        getHighLowValuePreVoteTPSido(data);
                        try {
                            data.forEach((e, i) => {
                                html +=
                                    `
                                        <li class="hex hexnum nh-line-${hexMapLocalValue[e.REGEION_NAME_B].line} nh-${hexMapLocalValue[e.REGEION_NAME_B].nh} 
                                            ${pretpData.highLocationTPCity == e.REGEION_NAME_B ? 'arvt_high arvt_shadow' : ''}
                                            ${pretpData.lowLocationTPCity == e.REGEION_NAME_B ? 'arvt_low arvt_shadow' : ''}
                                            ">
                                            <div class="hex_bx">
                                                <p class="hex_area">${e.REGEION_NAME_B}</p>
                                                <span class="hex_percent"><span class="hp_count">${mathRoundDotOneUtil(e.REGEION_VOTE_RATE)}</span>%</span>
                                            </div>
                                        </li>
                                    `;
                            });
                        } catch (e) {
                            console.log(e);
                        }
                        $('#tpRateByLocal').html(html);
                    }
                },
            });
        }

    }

    /**
     * @name 구시군지역별-투표율-TOP3
     * @param {시도코드} sido 
     */
    const getTpSidoTop3 = (sido) => {
        let html = ``;
        VoteLib.GetApiRequest(`Api/TPSidoTop3`, { sido: sido }, 'Status', (data) => {
            if (data.length > 0) {
                data.forEach((e, i) => {
                    html += `
                        <li>
                            <span class="vl_num">${i + 1}위</span>
                            <span class="vl_area">${e.SDNAME}${e.SGNAME}</span><strong class="vl_percent"><span>${e.TP_RATE}</span>%</strong>
                        </li>
                    `;
                });
                $('#tpRateTop3').html(html);
            }
        });
    }

    /**
     * @name 구시군지역별-투표율-TOP3:onChange핸들러
     */
    const tpRateTopHandler = () => {
        const sido = $('#votelankSelect').val();
        getTpSidoTop3(sido);
    }
    /**
     * @name 보궐선거투표율  
     */
    const getBgTpRate = () => {
        let html = ``;
        VoteLib.GetApiRequest(`Api/TpBg`, {}, 'Status', (data) => {
            if (data.length > 0) {
                try {
                    data.forEach((e, i) => {
                        html += `
                            <li>
                                <span class="reBil_area">${e.SDNAME}<br>${e.SGNAME}</span>
                                <span class="reBil_percent">${e.TP_RATE}%</span>
                            </li>
                        `;
                    });
                    $('#BgTpRateZone').html(html);
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }
    /**
    * @title 역대 지방선거 득표율 핸들러
    */
    const alltimeVoteHandler = () => {
        const val = $('#alltimeVote').val();
        $('#alltimeVoteImg').html(`
            <img src="https://image.imnews.imbc.com/issue/2022vote/m/images/alltime_vote_${val}.jpg" alt="역대 지방선거 의석수 ${val}">
        `);
    }

    return {
        Init,
        getTimeTpRate,
        getSidoTpRate,
        alltimeVoteHandler,
        tpRateTopHandler,
    }
}());
