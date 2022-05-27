function doughnutGraph() {
    // Make monochrome colors
    var pieColors = (function () {
        var colors = ['#6bb8b3', '#724888', '#d2d2d2'],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    
    Highcharts.chart('doughnutGraph', {
        chart: {
            type: 'pie',
        },
        legend: {
            align: 'top',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 230,
            itemMarginTop: 8,
            width: 200,
            labelFormatter: function () {
                return this.y + " % " + this.name;
            }
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            enabled: false,
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                colors: pieColors,
                dataLabels: {
                    enabled: true,
                    format: '{y} %',
                    distance: -28,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 10
                    },
                    style: {
                        color: "#fff",
                        textOutline: 0,
                    },
                },
                innerSize: '40%',
                showInLegend: true,
                center: ["50%", "105"],
            },
        },
        series: [
            {
                name: 'Share',
                data: [
                    {
                        name: '긍정',
                        y: 60
                    },
                    {
                        name: '부정',
                        y: 30
                    },
                    {
                        name: '모름/무응답',
                        y: 10
                    },
                ],
                size: 175,
                events: {
                    click: function (e) {
                        e.preventDefault();
                    },
                },
                enableMouseTracking: false,
                dataLabels: {
                    style: {
                        fontFamily: 'notokr-regular',
                        fontSize: 16,
                        fontWeight: 400,
                    }
                },
            },
        ]
    });
}
