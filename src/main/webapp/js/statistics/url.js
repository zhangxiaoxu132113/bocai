var status_ = [{id: -3, text: '异常'}, {id: -2, text: '已取消'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var dateType = [{id: 1, text: '今天'}, {id: 2, text: '昨天'}, {id: 3, text: '最近7天'}, {id: 4, text: '最近30天'}];
var taskType = [{id: 0, text: '任务'}, {id: 1, text: '任务ID'}];

$(document).ready(function () {
    $("#task_type").combobox({
        data: taskType,
        onSelect: function (data) {
            if (data.id == 0) {
                $("#name").textbox({prompt: '模糊'});
            } else if (data.id == 1) {
                $("#name").textbox({prompt: '精确'});
            }
        }
    });
    $("#task_type").combobox('setValue', 1);

    $("#task_status").combobox({data: status_});
    $("#task_status").combobox('setValue', -1);

    var columns = [
        {field: 'id', title: '任务ID', align: 'center', width: '100'},
        {field: 'name', title: '任务', align: 'center', width: '200'},
        {field: 'urlNum', title: '任务URL数量', align: 'center', width: '100'},
        {
            field: 'status', title: '状态', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                var statusStr;
                $.each(status_, function (index, s) {
                    if (s.id == value) {
                        statusStr = s.text;
                    }
                });
                return statusStr;
            }
        },
        {field: 'startTime', title: '开始查询日期', align: 'center', width: '150'},
        {field: 'endTime', title: '结束查询日期', align: 'center', width: '150'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '操作', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult();">任务结果</a>';
                return btn;
            }
        }
    ];

    var queryParams = [];

    s.datagrid('table', columns, {
        url: '../statistics/getBaiduUrlStatisticsList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.task-record-download').linkbutton({text: '任务结果', iconCls: 'image-download'});
        }
    });
});

// 搜索
function doSearch() {
    s.search('table', 'searchForm');
};

function exportTaskResult() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    $.post('../statistics/exportTaskResult.do', {
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
};

// 建立任务对话框
function addTaskDlg() {
    s.popAdd('add_task_dlg', {title: '建立任务'});

    $("#date_type").combobox({
        data: dateType,
        onSelect: function (data) {
            if (data.id == 1) {
                setTime(0, 0);
            } else if (data.id == 2) {
                setTime(1, 1);
            } else if (data.id == 3) {
                setTime(7, 0);
            } else if (data.id == 4) {
                setTime(30, 0);
            }
        }
    });
    $("#date_type").combobox('setValue', 1);

    setTime(0, 0);
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

// 建立任务
function saveTask() {
    var startDate = $("#add_task_startDate").datebox('getValue');
    if (startDate == undefined || startDate == '') {
        s.error('请选择开始日期');
        return false;
    }

    var endDate = $("#add_task_endDate").datebox('getValue');
    if (endDate == undefined || endDate == '') {
        s.error('请选择结束日期');
        return false;
    }

    if (new Date(endDate).getTime() > (new Date().getTime())) {
        s.error('结束日期不正确');
        return false;
    }

    var day = s.getDifferDays(startDate, endDate);
    if (day < 0) {
        s.error('结束日期必须大于开始日期');
        return false;
    }

    s.postSubmit('table', 'add_task_dlg', '../statistics/saveUrlTask.do');
}

// 删除词表
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该任务吗？', '../statistics/deleteTask.do', {id: row.id});
}

function setTime(startDate, endDate) {
    s.initRangeDateBeforeDays("add_task_endDate", endDate);
    s.initRangeDateBeforeDays("add_task_startDate", startDate);
};