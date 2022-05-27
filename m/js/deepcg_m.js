$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "//vote2020.imbc.com/Api/Status",
        dataType: "jsonp",
        async: false,
        success: function (jsonData) {
            if (jsonData.DEEP_YN == "Y") {
                SetDeepcg_v1(1, 'q1');
                SetDeepcg_v2(2, 'q2');
                SetDeepcg_v2(3, 'q3');
                SetDeepcg_v2(4, 'q4');
                SetDeepcg_v2(5, 'q5');
                SetDeepcg_v2(6, 'q6');
                SetDeepcg_v2(7, 'q7');
                SetDeepcg_v1(8, 'q8');
                SetDeepcg_v1(9, 'q9');
                SetDeepcg_v1(10, 'q10');
                SetDeepcg_v1(11, 'q11');
                SetDeepcg_v1(12, 'q12');
                SetDeepcg_v1(13, 'q13');
                SetDeepcg_v2(14, 'q14');
                SetDeepcg_v2(15, 'q15');
                SetDeepcg_v2(16, 'q16');
                SetDeepcg_v2(17, 'q17');
            } else {
                location.href = "/issue/vote2020/elect/m/index.html";
            }
        },
        error: function () { }
    });
});

function SetDeepcg_v1(qno, did) {
    $.ajax({
        type: "get",
        url: "//vote2020.imbc.com/Api/DeepLayer?pcno=1&qno=" + qno,
        dataType: "jsonp",
        async: false,
        success: function (data) {
            var pidx = qno - 1;
            var strHtml = "";
            var q_perHtml = "";
            var q_txtHtml = "";

            for (var i = 0; i < data.length; i++) {
                if (data[i].REPVAL < 10) {
                    q_perHtml += "<li class='bar_graph bar_" + (i + 1) + "' style='width:" + data[i].REPVAL + "%'><span class='percent'></span></li>"
                } else {
                    q_perHtml += "<li class='bar_graph bar_" + (i + 1) + "' style='width:" + data[i].REPVAL + "%'><span class='percent'>" + data[i].REPVAL + "%</span></li>"
                }

                q_txtHtml += "<li class='bar_" + (i + 1) + "'><span class='percent'>" + data[i].REPVAL + "%</span><span class='about'>" + data[i].REPNM + "</span></li>"

            }
            strHtml += "        <div class='bar'>";
            strHtml += "            <ul>";
            strHtml += q_perHtml;
            strHtml += "            </ul>";
            strHtml += "        </div>";
            strHtml += "        <div class='answer'>";
            strHtml += "            <ul>";
            strHtml += q_txtHtml;
            strHtml += "            </ul>";
            strHtml += "        </div>";

            $("#" + did).append(strHtml);

        },
        error: function () { }
    });
}

function SetDeepcg_v2(qno, did) {
    $.ajax({
        type: "get",
        url: "//vote2020.imbc.com/Api/DeepLayer?pcno=1&qno=" + qno,
        dataType: "jsonp",
        async: false,
        success: function (data) {
            var pidx = qno - 1;
            var strHtml = "";
            strHtml += "<ul>";
            for (var i = 0; i < data.length; i++) {
                strHtml += "<li>";

                strHtml += "    <div class='bar_wrap'><div class='bar_graph bar_" + (i + 1) + "' style='width:" + data[i].REPVAL + "%'><span class='percent'>" + data[i].REPVAL + "%</span></div></div>"

                strHtml += "    <div class='about'>" + data[i].REPNM + "</div>"
                strHtml += "</li>";
            }
            strHtml += "</ul>";
            $("#" + did).append(strHtml);
        },
        error: function () { }
    });
}
