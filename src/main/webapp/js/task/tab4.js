$(document).ready(function () {
    initIndexTime();

    $.ajax({
        url: "../common/getSearchEngineListByDictionaryId.do", // 获取已经爬取任务的所使用的搜索引擎
        type: "post",
        data: {"dictionaryId": dictionaryId, "needAll": 0},
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            $("#search_engine_id").combobox('loadData', data);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

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

    var myChart = echarts.init(document.getElementById('task_record_his_center'), 'macarons');
    myChart.setOption({
        title: {},
        grid: {
            left: '1%',
            right: '3%',
            bottom: '4%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            data: []
        },
        toolbox: {
            show: true,
            axisPointer : {
                type : 'shadow'
            },
            feature: {
                dataZoom: {},
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            boundaryGap: true,
            nameLocation: 'middle',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        axisTick: {
            alignWithLabel: true
        },
        series: []
    });

    myChart.showLoading();// 显示遮罩层

    $('#searchForm').form('submit', {
        url: '../task/getTaskRecordListForChat.do',
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            var data = $.parseJSON(result);
            myChart.hideLoading();
            if (data == null) return;

            myChart.setOption({
                title: {
                    text: data.rows.text
                },
                legend: {
                    data: data.rows.legendArr
                },
                xAxis: {
                    data: data.rows.dateArr
                },
                yAxis: {
                    name: data.rows.yAxisName
                },
                series: data.rows.dataArr
            });

            subtext = data.rows.subtext;
            dColumns = data.rows.dColumns;
            dColumnData = data.rows.dColumnData;

            if(dColumns == undefined){
                $('#task_record_his_table').datagrid('loadData', { total: 0, rows: [] });
                return false;
            }
            var array = [];
            var columns = [];
            // table数据
            $(dColumns).each(function () {
                array.push({field: '', title: '', width: '', align: ''});
            });
            columns.push(array);
            $(dColumns).each(function (index, col) {
                columns[0][index]['field'] = col['field'];
                columns[0][index]['title'] = col['title'];
                columns[0][index]['width'] = col['width'];
                columns[0][index]['align'] = col['align'];
            });

            $('#task_record_his_table').datagrid({
                columns:columns,
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
            myChart.hideLoading();
            return false;
        }
    });
};

