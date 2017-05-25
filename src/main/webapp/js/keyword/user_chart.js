var vs_ = [{id: '-1', name: '全部'}];
var columns = [
    //{field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
    {field: 'touZhuTotal', title: '投注金额', align: 'center', width: '100'},
    {field: 'moneyInTotal', title: '共进', align: 'center', width: '150'},
    {field: 'moneyOutTotal', title: '共处', align: 'center', width: '150'},
    {field: 'profitTotal', title: '纯收益', align: 'center', width: '150'},
    {field: 'time', title: '时间', align: 'center', width: '150'}
];
$(document).ready(function () {
    var taskId = $('.userId').val();
    console.log(taskId);
    initIndexTime();
    s.datagrid('keyword_data_table', columns, {
        url: '',
        toolbar: "#top"
    });

    searchKeywordRecord();
});

var subtext;
var dColumns;
var dColumnData;
function searchKeywordRecord() {
    //var validator = $('#searchForm').form('validate');
    //if (!validator) {
    //    return false;
    //}
    var startDate = $("#startDate").datebox('getValue');
    var endDate = $("#endDate").datebox('getValue');
    if (new Date(endDate).getTime() > (new Date().getTime())) {
        s.error('结束日期不正确');
        return false;
    }

    var day = s.getDifferDays(startDate, endDate);
    if (day < 0) {
        s.error('结束日期必须大于开始日期');
        return false;
    } else if (day > 31) {
        s.error('开始日期和结束日期不能超过一个月');
        return false;
    }

    var myChart = echarts.init(document.getElementById('keyword_data_center'), 'macarons');
    myChart.setOption({
        title: {},
        grid: {
            left: '1%',
            right: '3%',
            bottom: '4%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        //toolbox: {
        //    show: true,
        //    feature: {
        //        dataZoom: {},
        //        dataView: {readOnly: false},
        //        magicType: {type: ['line', 'bar']},
        //        restore: {},
        //        saveAsImage: {}
        //    }
        //}, v1
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis:  [
            {
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: {
        },
        series: []
    });

    myChart.showLoading();// 显示遮罩层

    $.ajax({
        url: "/task/getChartData",
        method: "POST",
        data: {
            queryStartTime: startDate,
            queryEndTime: endDate
        },
        dataType: 'json'
    })
        .success(function (data) {
            //console.log(data.code);
            var resultList = data.rows;
            if (data.code == 1) {
                myChart.setOption({
                    title: {
                        text: data.title_text,
                        subtext:  data.title_subtext
                    },
                    legend: {
                        data: data.legend_data
                    },
                    xAxis: {
                        data: data.xAxis
                    },
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} ￥'
                            }
                        }
                    ],
                    series: data.series
                });


                $('#keyword_data_table').datagrid({
                    columns:[columns],
                    toolbar: "#top",
                    dataType: 'json',
                    data: resultList.slice(0, 10),
                    loadMsg: "正在处理，请稍待...",
                    pagination: true,
                    rownumbers: true,
                    singleSelect: true,
                    nowrap: true,
                    pageSize: 10
                });
                myChart.hideLoading();
            } else {
                alert("服务器异常，请联系管理员!");
                myChart.hideLoading();
            }
        })
        .error(function (data) {
            console.log(data);
            alert("服务器异常，请联系管理员!");
            myChart.hideLoading();
        });

};

/**
 * 导出数据到excel
 */
function exportKeywordDataForChat() {
    if(dColumnData == undefined){
        s.alert('暂无数据');
        return false;
    }
    $.messager.confirm('提示信息', '确认导出该筛选条件下的所有数据吗？', function (r) {
        if (r) {
            var filters = {};
            var array = $('#searchForm').serialize().split('&');
            for (var i = 0; i < array.length; i++) {
                var entry = array[i].split('=');
                if (entry.length > 1) {
                    filters[entry[0]] = decodeURIComponent(entry[1]);
                }
            }

            filters['dColumns'] = decodeURIComponent(JSON.stringify(dColumns));
            filters['dColumnData'] = decodeURIComponent(JSON.stringify(dColumnData));

            $("#keyword_data_table").datagrid("loading");// 显示遮罩层
            $.post('../keyword/exportKeywordDataForChat.do', filters, function (data) {
                $("#keyword_data_table").datagrid("loaded");// 关闭遮罩层
                if (data.result && data.result == 1) {
                    // 开始下载
                    window.open("../" + data.path, '_self');
                    return;
                }
                // 没有找到excel
                s.error("没有数据需要导出");
            }, 'json');
        }
    });
}

/**
 * 初始化时间
 *
 * */
function initIndexTime() {
    s.initRangeDateBeforeDays("endDate", 0);
    s.initRangeDateBeforeDays("startDate", 8);
};
