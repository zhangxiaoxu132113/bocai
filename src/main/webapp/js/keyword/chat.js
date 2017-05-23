var vs_ = [{id: '-1', name: '全部'}];

$(document).ready(function () {
    initIndexTime();

    $.ajax({//表头
        url: "../header/getCheckHeaderIdJson.do?face=1&needAll=0",
        type: "post",
        cache: false,
        async: false,
        data: {"businessId": businessId},
        success: function (data, status) {
            if (data == null) {
                $("#compare").combobox('loadData', vs_);
                $("#compare").combobox('setValue', "-1");
                $("#origin").combobox('loadData', vs_);
                $("#origin").combobox('setValue', "-1");
                return;
            };
            $("#origin").combobox('loadData', data);
            var allData = vs_;
            $.each(data, function (index, value) {
                allData.push(value);
            });
            $("#compare").combobox('loadData', allData);
            $("#compare").combobox('setValue', "-1");
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    s.datagrid('keyword_data_table', [], {
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

    var origin = $("#origin").combobox('getValue');
    var compare = $("#compare").combobox('getValue');

    if(origin == compare){
        s.alert('请选择不同的对比维度');
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
        toolbox: {
            show: true,
            feature: {
                dataZoom: {},
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
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

    $('#searchForm').form('submit', {
        url: '../keyword/getKeywordDataForChat.do',
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
                yAxis: data.rows.yAxisArr,
                series: data.rows.dataArr
            });

            subtext = data.rows.subtext;
            dColumns = data.rows.dColumns;
            dColumnData = data.rows.dColumnData;

            if(dColumns == undefined){
                $('#keyword_data_table').datagrid('loadData', { total: 0, rows: [] });
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

            $('#keyword_data_table').datagrid({
                columns:columns,
                dataType: 'json',
                data: dColumnData.slice(0, 10),
                loadMsg: "正在处理，请稍待...",
                pagination: true,
                rownumbers: true,
                singleSelect: true,
                nowrap: true,
                pageSize: 10
            });

            var pager = $("#keyword_data_table").datagrid("getPager");
            pager.pagination({
                total: dColumnData.length,
                onSelectPage: function (pageNo, pageSize) {
                    var start = (pageNo - 1) * pageSize;
                    var end = start + pageSize;
                    $("#keyword_data_table").datagrid("loadData", dColumnData.slice(start, end));
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
    s.initRangeDateBeforeDays("startDate", 15);
};
