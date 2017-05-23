var type = [{id: 1, text: '监控'}, {id: 2, text: '单次'}];

$(document).ready(function () {
    var columns = [
        {field: 'taskId', title: 'id', align: 'center', width: '110', hidden: true},
        {
            field: 'type', title: '任务类型', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                var typeStr;
                $.each(type, function (index, t) {
                    if (t.id == value) {
                        typeStr = t.text;
                    }
                });
                return typeStr;
            }
        },
        {field: 'urlNum', title: 'url数量', align: 'center', width: '110'},
        {field: 'urlActualNum', title: '实际爬取url数量', align: 'center', width: '110'},
        {
            field: 'preFinish', title: '完成率', align: 'center', width: '110',
            formatter: function (row, index) {
                return formatRate(row);
            }
        },
        {field: 'finishTime', title: '完成时间', align: 'center', width: '150'},
        {
            field: 'download', title: '操作', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                var id = rowData.id;
                var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult();">任务结果</a>';
                return btn;
            }
        }
    ];

    var queryParams = [];
    queryParams = {
        taskId: taskId
    };

    s.datagrid('task_record_table', columns, {
        url: '../tools/getUrlRankTaskRecordList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.task-record-download').linkbutton({text: '任务结果', iconCls: 'image-download'});
        }
    });

});

// 搜索
function doSearch() {
    s.search('task_record_table', 'searchForm');
};

// 下载文件: 1-任务抓取结果, 2-抓取关键词的明细文件
// 导出任务结果
function exportTaskResult() {
    var row = $('#task_record_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    $.post('../tools/exportUrlRankPvTaskResult.do', {
        id: row.id
    }, function (data) {
        if (data.result && data.result == 1) {
            // 开始下载
            window.open("../" + data.path, '_self');
            return;
        }
        // 没有找到excel
        s.error("没有数据需要导出");
    }, 'json');
}
