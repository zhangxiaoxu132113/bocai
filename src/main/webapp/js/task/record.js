var type = [{id: 1, text: '监控'}, {id: 2, text: '单次'}];

$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '110', hidden: true},
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
        {
            field: 'area', title: '地域', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {field: 'topNum', title: '首位数', align: 'center', width: '110'},
        {
            field: 'topPer', title: '首位率', align: 'center', width: '110',
            formatter: function (row, index) {
                return formatRate(row);
            }
        },
        {field: 'indexNum', title: '首页数', align: 'center', width: '110'},
        {
            field: 'indexPer', title: '首页率', align: 'center', width: '110',
            formatter: function (row, index) {
                return formatRate(row);
            }
        },
        /*{
         field: 'naturalIndexPer', title: '自然首页率', align: 'center', width: '110',
         formatter: function (row, index) {
         return formatRate(row);
         }
         },*/
        {field: 'keywordActualNum', title: '实际爬取关键词数', align: 'center', width: '110'},
        {
            field: 'finishPer', title: '完成率', align: 'center', width: '110',
            formatter: function (row, index) {
                return formatRate(row);
            }
        },
        {field: 'finishTime', title: '完成时间', align: 'center', width: '150'}
    ];

    if (fromType == 1) {
        columns.push(
            {
                field: 'download', title: '操作', align: 'center', width: '400',
                formatter: function (value, rowData, rowIndex) {
                    var id = rowData.id;

                    var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult(1);">任务结果</a>';
                    btn += '<a style="margin-left: 3px;" class="original-keyword-download" href="javascript:; onclick=exportTaskResult(2);">关键词明细</a>';
                    btn += '<a style="margin-left: 3px;" class="task-record-repair" href="javascript:; onclick=repairTaskResult(1);">修正</a>';
                    btn += '<a style="margin-left: 3px;" class="task-record-recrawler" href="javascript:; onclick=repairTaskResult(2);">重爬</a>';
                    btn += '<a style="margin-left: 3px;" href="#" class="task-record-chart" onclick=addTab("报表分析","/task/record/chat.do?id=' + id + '")>报表分析</a>';
                    return btn;
                }
            }
        );
    } else {
        columns.push(
            {
                field: 'download', title: '操作', align: 'center', width: '350',
                formatter: function (value, rowData, rowIndex) {
                    var id = rowData.id;

                    var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult(1);">任务结果</a>';
                    btn += '<a style="margin-left: 3px;" class="original-keyword-download" href="javascript:; onclick=exportTaskResult(2);">关键词明细</a>';
                    btn += '<a style="margin-left: 3px;" class="task-record-recrawler" href="javascript:; onclick=repairTaskResult(3);">重爬</a>';
                    btn += '<a style="margin-left: 3px;" href="#" class="task-record-chart" onclick=addTab("报表分析","/task/record/chat.do?id=' + id + '")>报表分析</a>';
                    return btn;
                }
            }
        );
    }

    var queryParams = [];

    queryParams = {
        taskId: taskId
    };

    s.datagrid('task_record_table', columns, {
        url: '../task/getTaskRecordList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.task-record-download').linkbutton({text: '任务结果', iconCls: 'image-download'});
            $('.original-keyword-download').linkbutton({text: '关键词明细', iconCls: 'image-download'});
            $('.task-record-repair').linkbutton({text: '修正', iconCls: 'image-repair'});
            $('.task-record-recrawler').linkbutton({text: '重爬', iconCls: 'image-redo'});
            $('.task-record-chart').linkbutton({text: '报表分析', iconCls: 'image-chart'});
        }
    });

});

// 搜索
function doSearch() {
    s.search('task_record_table', 'searchForm');
};

// 下载文件: 1-任务抓取结果, 2-抓取关键词的明细文件
function exportTaskResult(type) {
    $dg = $('#task_record_table');
    var row = $dg.datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    $.post('../task/exportTaskResult.do', {
        id: row.id,
        type: type
    }, function (data) {
        if (data.result && data.result == 1) {
            // 开始下载
            if (type == 1) {
                window.open("../" + data.path, '_self');
            } else if (type == 2) {
                window.open("../" + data.path);
            }
            return;
        }
        // 没有找到excel
        s.error("没有数据需要导出");
    }, 'json');
};

// 修复爬取的任务记录: 1-重新计算, 2-重新爬取剩余未抓取的关键词
function repairTaskResult(type) {
    var row = $('#task_record_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    var msg;
    var url;
    if (type == 1) {
        msg = '确认重新计算一次任务关键词吗？（速度取决于关键词数量）';
        url = '../task/repairTaskResult.do';
    } else if (type == 2) {
        msg = '确认重新爬取任务中剩余未抓取的关键词吗？';
        url = '../task/recrawlerTask.do';
    } else if (type == 3) {
        msg = '确认重新爬取该任务吗？';
        url = '../task/crawlerTask.do';
    }

    s.postConfirm('task_record_table', msg, url, {
        id: row.id
    });
}

