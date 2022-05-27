var isData = {
    서울: true,
    경기: true,
    인천: true,
    대전: true,
    충북: true,
    충남: true,
    강원: true,
    전남: true,
    전북: false,
    부산: false,
    대구: false,
    광주: false,
    제주: true,
    세종: false,
    경남: false,
    경북: false,
    울산: false,
};

$(document).ready(function (i, d) {
    // setData 함수를 호출하여 "서울" 데이터를 설정
    setData("서울");

    // 모든 .tab-button 요소에 대해 반복문을 실행
    $.each($(".tab-container .tab-button"), function (i, d) {
        // 현재 요소에 'value' 속성이 있는지 확인하고, 해당 값에 따라 클래스를 추가
        $(d).addClass(isData[$(this).attr("value")] ? "" : "deactive");
    });

    // .tab-button 요소가 클릭되었을 때 실행할 함수를 정의
    $(".tab-container .tab-button").on("click", function () {
        // 클릭된 버튼의 'value' 속성을 기반으로 setData 함수를 호출
        setData($(this).attr("value"));
    });
});


function setData(region) {
    modalDataArray = candi_data[0][region];
    if (isData[region]) {
        if (region == "서울") {
            modalData = SeoulApprove;
        } else if (region == "경기") {
            modalData = GGApprove;
        } else if (region == "인천") {
            modalData = ICApprove;
        } else if (region == "대전") {
            modalData = DJApprove;
        } else if (region == "충북") {
            modalData = CBApprove;
        } else if (region == "충남") {
            modalData = CNApprove;
        } else if (region == "강원") {
            modalData = KWApprove;
        } else if (region == "전남") {
            modalData = JNApprove;
        } else if (region == "전북") {
            modalData = JBApprove;
        } else if (region == "대구") {
            modalData = DGApprove;
        } else if (region == "부산") {
            modalData = BSApprove;
        } else if (region == "경남") {
            modalData = KNApprove;
        } else if (region == "광주") {
            modalData = GJApprove;
        } else if (region == "제주") {
            modalData = JJApprove;
        } else if (region == "세종") {
            modalData = SJApprove;
        } else if (region == "울산") {
            modalData = UlsanApprove;
        } else if (region == "경북") {
            modalData = KBApprove;
        } else if (region == "전북") {
            modalData = JBApprove;
        }

        var data = [];
        if (isData) {
            // modalDataArray 배열의 각 요소에 대해 반복문을 실행
            $.each(modalDataArray, function (i, d) {
                // 데이터 배열에 다음과 같은 객체를 추가
                data.push({
                    name: d.name, // 데이터의 이름
                    data: [], // 그래프에 표시할 데이터
                    zIndex: 1, // 그래프의 층위
                    lineWidth: 1.5, // 선의 너비
                    color: partyColor[d.party], // 그래프의 색상
                    marker: {
                        fillColor: "white", // 마커 색상
                        lineWidth: 1, // 마커 선의 너비
                        lineColor: partyColor[d.party], // 마커 선의 색상
                    },
                });

                // 데이터 배열에 다음과 같은 객체를 추가 (arearange 타입의 그래프).
                data.push({
                    name: d.name,
                    type: "arearange",
                    lineWidth: 0,
                    enableMouseTracking: false,
                    linkedTo: ":previous", // 이전 그래프와 연결
                    color: partyColor[d.party],
                    data: [], // arearange 그래프에 표시할 데이터
                    zIndex: 0,
                    fillOpacity: 0.3,
                    marker: {
                        enabled: false, // 마커 비활성화
                    },
                });

                // 데이터 배열에 다음과 같은 객체를 추가 (scatter 타입의 그래프).
                data.push({
                    name: d.name,
                    data: [], // scatter 그래프에 표시할 데이터
                    type: "scatter",
                    enableMouseTracking: false,
                    linkedTo: ":previous", // 이전 그래프와 연결
                    opacity: 0.2,
                    color: partyColor[d.party],
                });
            });

            // modalDataArray와 modalData 배열을 사용하여 그래프의 데이터를 채움
            $.each(modalDataArray, function (i, d) {
                $.each(modalData, function (j, e) {
                    if (modalData[j]["mean_" + d.name]) {
                        // 데이터 배열에 값을 추가
                        data[i * 3].data.push([
                            to_date(modalData[j]["date"]), // x 축 값
                            modalData[j]["mean_" + d.name], // y 축 값
                        ]);

                        // arearange 타입의 데이터 배열에 값을 추가
                        data[i * 3 + 1].data.push([
                            to_date(modalData[j]["date"]), // x 축 값
                            modalData[j]["upper_" + d.name], // 상한 값
                            modalData[j]["lower_" + d.name], // 하한 값
                        ]);
                    }
                });
            });

            $("#region-graph").html("");
            drawGraph(data, region);
        }
    } else {
        console.log("???");
        var noDataContainer =
            "<div class='no-data'>여론조사가 없거나 부족 </div>";
        $("#region-graph").html(noDataContainer);
    }

    function drawGraph(data) {
        var chart = new Highcharts.chart("region-graph", {
            title: {
                text: region,
            },
            credits: {
                enabled: false,
            },
            xAxis: {
                type: "datetime",
                labels: {
                    formatter: function formatter() {
                        return Highcharts.dateFormat("%m월 %e일", this.value);
                    },
                },
                max: 1654646401000,
                plotLines: candiPlot,
            },

            yAxis: {
                title: {
                    text: null,
                },
                min: 0,
            },
            plotOptions: {
                arearange: {
                    tooltip: {
                        enabled: false,
                    },
                },
                series: {
                    marker: {
                        enabled: false,
                    },
                },
                scatter: {
                    marker: {
                        radius: 3,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: "rgb(100,100,100)",
                            },
                        },
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false,
                            },
                        },
                    },

                    tooltip: {
                        headerFormat: "<b>{point.y}</b><br>",
                        pointFormat: "{point.x} cm, {point.y} kg",
                    },
                },
            },

            tooltip: {
                crosshairs: true,
                shared: true,
                split: true,
                formatter: function formatter() {
                    // The first returned item is the header, subsequent items are the
                    // points
                    return ["<b>" + timeStampToDate(this.x) + "</b>"].concat(
                        this.points ?
                            this.points.map(function (point) {
                                return point.series.name + ": <b>" + point.y + "</b>%";
                            }) :
                            []
                    );
                },
                style: {
                    fontSize: "14px",
                },
            },

            series: data,
        });
    }
}

// yyyy-MM-dd 형식의 문자열을 JavaScript Date 객체로 변환하여 반환하는 함수
function to_date(date_str) {
    // yyyy-MM-dd 형식의 문자열을 입력
    var yyyyMMdd = String(date_str);

    // 연도, 월, 일을 추출
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(5, 7);
    var sDate = yyyyMMdd.substring(8, 10);

    // Date.UTC를 사용하여 새로운 Date 객체를 생성하고 반환
    // 연도, 월, 일은 숫자로 변환됩니다. (월은 0부터 시작하므로 -1)
    return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

// 타임스탬프를 "yy년 MM월 dd일" 형식의 문자열로 변환하는 함수
function timeStampToDate(data) {
    // 입력된 타임스탬프를 기반으로 Date 객체를 생성
    var date = new Date(data);

    // 년, 월, 일을 추출하고 각각 문자열로 변환
    var year = date.getFullYear().toString().slice(-2); // 년도에서 마지막 2자리 추출
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 표현하고 0으로 채움
    var day = ("0" + date.getDate()).slice(-2); // 일을 2자리로 표현하고 0으로 채움

    // "yy년 MM월 dd일" 형식의 문자열로 반환
    return year + "년 " + month + "월 " + day + "일";
}

