$(document).ready(function () {
    makeRateChart(seriesData);
});
var seriesData = [{
    showInLegend: false,
    name: '제 8회 지선',
    data: VoteNow2022.getTimeTpRate(),
    zIndex: 1,
    lineWidth: 3,
    marker: {
        symbol: 'circle',
        radius: 6,
        states: {
            hover: {
                fillColor: '#FFFFFF',
                lineColor: '#8957a1',
                lineWidth: 4,
            }
        }
    },
    color: '#8957a1'
}, {
    showInLegend: false,
    name: '제 20대 대선',
    data: [2.1, 5.0, 8.1, 11.8, 16, 20.3, 61.3, 64.8, 68.1, 71.1, 73.6, 75.7, null, 77.1],
    zIndex: 0,
    marker: {
        radius: 5
    },
    color: '#bab9e3'
},
{
    showInLegend: false,
    name: '제 7회 지선',
    data: [2.2, 4.6, 7.7, 11.5, 15.7, 19.7, 43.5, 46.8, 50.1, 53.2, 56.1, 60.2, null, null],
    zIndex: 0,
    marker: {
        radius: 5
    },
    color: '#b4b4b4'
}];

function makeRateChart(seriesData) {
    $(function () {
        if (!Array.prototype.filter) {
            Array.prototype.filter = function (fun /*, thisp */) {
                "use strict";
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();
                var res = [];
                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i]; // in case fun mutates this
                        if (fun.call(thisp, val, i, t))
                            res.push(val);
                    }
                }
                return res;
            };
        }
        Highcharts.chart('vote-container', {
            chart: {
                type: 'line',
                events: {
                    load: function (chart) {
                        var thisChart = chart.target;
                        var data = thisChart.series[0].data;

                        var filterData = data.filter(function (data) {
                            return data.isNull == false;
                        });

                        let dataLength = 0;

                        out: for (let i = thisChart.series[0].data.length - 1; i >= 0; i--) {
                            if (thisChart.series[0].data[i].y) {
                                dataLength = i;
                                break out;
                            }
                        };

                        const v20 = thisChart.series[0].data[dataLength];
                        const v19 = thisChart.series[1].data[dataLength];
                        const v18 = thisChart.series[2].data[dataLength];

                        setTimeout(function () {

                            if (v18.y === null && v19.y === null) {
                                thisChart.tooltip.refresh([v20]);
                            } else if (v18.y === null) {
                                thisChart.tooltip.refresh([v20, v19]);
                            } else if (v20.y === null) {
                                thisChart.tooltip.refresh([v18, v19]);
                            } else {
                                thisChart.tooltip.refresh([v20, v19, v18]);
                            }
                            thisChart.xAxis[0].drawCrosshair(null, data[dataLength]);
                        }, 500);
                        try {
                            thisChart.xAxis[0].labelGroup.element.childNodes[dataLength].classList.add('active');
                        } catch (e) { }
                    }
                },
            },
            title: {
                text: ''
            },
            xAxis: {
                crosshair: {
                    width: 2,
                    color: '#8957a1',
                    dashStyle: 'dot',
                },
                categories: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '19:30'],
                labels: {
                    step: 1,
                },
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        if (this.isFirst) return this.value + '<br/>(%)';
                        else return this.value;
                    }
                },
                min: 0,
                max: 100
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                useHTML: true,
                padding: 0,
                borderRadius: 5,
                formatter: function () {
                    let s = '';
                    s += "<div class='tooltips'>";
                    $.each(this.points, function (i, point) {
                        s += (point.series.name === '제 8회 지선') ?
                            `<span><b>${point.series.name}&nbsp;${point.y} %</b></span>&nbsp;&nbsp;` :
                            `<span>${point.series.name}&nbsp;${point.y} %</span>&nbsp;&nbsp;`;
                    });
                    s += '</div>';
                    return s;
                },
                style: {
                    fontSize: "20px"
                },
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    connectNulls: true,
                    point: {
                        events: {
                            mouseOver: function () {
                                $(this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x]).addClass('active');
                            },
                            mouseOut: function () {
                                $(this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x]).removeClass('active');
                            }
                        }
                    }
                }
            },
            series: seriesData
        });
        //pointer 남기기
        //  Highcharts.Pointer.prototype.reset = function () {
        //    return undefined;
        // };
    });
}
