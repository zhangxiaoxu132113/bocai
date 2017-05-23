$(document).ready(function () {
    initIndexTime();

    s.datagrid('task_record_his_table', [], {
        url: '',
        toolbar: "#top"
    });

    searchKeywordRecord();
});

var subtext;
var dColumns;
var dColumnData;
function searchKeywordRecord() {
    var validator = $('#searchForm').form('validate');
    if (!validator) {
        return false;
    }

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

    var myChart1 = echarts.init(document.getElementById('task_record_his_center'), 'macarons');
    myChart1.setOption({
        title: {
        },
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
        toolbox: {
            show: true
        },
        xAxis: {
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type : 'value'
        },
        series: []
    });
    myChart1.showLoading();// 显示遮罩层

    var myChart2 = echarts.init(document.getElementById('task_record_his_center2'), 'macarons');
    myChart2.setOption({
        title: {
        },
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
        toolbox: {
            show: true
        },
        xAxis: {
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type : 'value'
        },
        series: []
    });
    myChart2.showLoading();// 显示遮罩层

    $('#type').val(1);
    $('#searchForm').form('submit', {
        url: '../getDailyListForChat.do',
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            var data = $.parseJSON(result);
            myChart1.hideLoading();
            if (data == null) return;

            myChart1.setOption({
                legend: {
                    data: data.rows.legendArr
                },
                xAxis: {
                    data: data.rows.dateArr
                },
                yAxis: {
                    name: data.rows.yAxisName
                },
                grid:{
                    x:30
                },
                series: data.rows.dataArr
            });

            $('#type').val(2);
            $('#searchForm').form('submit', {
                url: '../getDailyListForChat.do',
                onSubmit: function () {
                    return $(this).form('validate');
                },
                success: function (result) {
                    var data = $.parseJSON(result);
                    myChart2.hideLoading();
                    if (data == null) return;

                    myChart2.setOption({
                        legend: {
                            data: data.rows.legendArr
                        },
                        xAxis: {
                            data: data.rows.dateArr
                        },
                        yAxis: {
                            name: data.rows.yAxisName
                        },
                        grid:{
                            x:30
                        },
                        series: data.rows.dataArr
                    });

                    dColumnData = data.rows.dColumnData;

                    var columns = [
                        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
                        {field: 'finishTime', title: '日期', align: 'center', width: '100'},
                        {field: 'keywordNum', title: '优化词数', align: 'center', width: '150'},
                        {field: 'clickNum', title: '点击次数', align: 'center', width: '150'},
                        {field: 'promoteKeywordNum', title: '排名提升词数', align: 'center', width: '150'},
                        {field: 'topNum', title: '排名进入TOP10', align: 'center', width: '150'},
                        {field: 'outNum', title: '排名跌出TOP100', align: 'center', width: '150'}
                    ];

                    $('#task_record_his_table').datagrid({
                        columns:[columns],
                        toolbar: "#top",
                        dataType: 'json',
                        data: dColumnData.slice(0, 10),
                        loadMsg: "正在处理，请稍待...",
                        pagination: true,
                        rownumbers: true,
                        singleSelect: true,
                        nowrap: true,
                        pageSize: 10
                    });

                    var pager = $("#task_record_his_table").datagrid("getPager");
                    pager.pagination({
                        total: dColumnData.length,
                        onSelectPage: function (pageNo, pageSize) {
                            var start = (pageNo - 1) * pageSize;
                            var end = start + pageSize;
                            $("#task_record_his_table").datagrid("loadData", dColumnData.slice(start, end));
                            pager.pagination('refresh', {
                                total: dColumnData.length,
                                pageNumber: pageNo
                            });
                        }
                    });
                },
                error: function () {
                    myChart2.hideLoading();
                    return false;
                }
            });
        },
        error: function () {
            myChart1.hideLoading();
            return false;
        }
    });
};

/**
 * 初始化时间
 *
 * */
function initIndexTime() {
    s.initRangeDateBeforeDays("endDate", 1);
    s.initRangeDateBeforeDays("startDate", 8);
};

