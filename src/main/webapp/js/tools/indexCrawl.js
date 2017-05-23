var executeStatus = [{id: -1, text: '全部'},
    {id: -3, text: '异常'},
    {id: 0, text: '等待中'},
    {id: 1, text: '爬取中'},
    {id: 2, text: '完成'}];
var taskType = [{id: 0, text: '玩家'}, {id: 1, text: '包位'}];
var types = [{id: -1, text: '全部'}, {id: 1, text: '监控'}, {id: 2, text: '单次'}];
var columns = [
    {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
    {field: 'userId', title: '玩家', align: 'center', width: '200'},
    {field: 'num', title: '包位', align: 'center', width: '100'},
    {field: 'sum', title: '下注', align: 'center', width: '100'},
    {field: 'createOn', title: '创建时间', align: 'center', width: '150'},
    {
        field: 'operation', title: '操作', align: 'center', width: '100',
        formatter: function (value, rowData, rowIndex) {
            var btn = '<a class="task-record-download" style="text-decoration: none" href="javascript:; onclick=exportTaskResult();">历史记录</a>';
            return btn;
        }
    }
];
var task = {};
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
    $("#execute_type").combobox({data: types});
    $("#execute_type").combobox('setValue', -1);

    $("#task_status").combobox({data: executeStatus});
    $("#task_status").combobox('setValue', -1);

    var queryParams = [];
    s.datagrid('table', columns, {
        url: '../task/taskUserList.do?',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.task-record-download').linkbutton({text: '历史记录', iconCls: 'image-download'});
        }
    });
});

//准备状态
function readyTask() {
    $.post('../task/startTask.do', function (data) {
        console.log(data);
        $('.ready_start_task').remove();
        $('.taskName').html(data.rows.name);
        $('.statusName').html(data.rows.statusName);
        $('.table-search').css('display', 'block');
        $('.runing_task_status').css('display', 'block');
        $('.h_task_id').val(data.rows.id);
        task = data.rows;
    }, 'json');
}

//开始zhuangtai
function cancelTask() {

}

// 搜索
function doSearch() {
    s.search('table', 'searchForm');
};

// 查看任务执行状态
function checkTaskExecutetatus() {
    s.popAdd('task_execute_status_dlg', {title: '任务执行信息'});
}

// 关闭任务执行状态窗口
function closeTaskExecuteStatusDlg() {
    s.closeDialog('task_execute_status_dlg');
}

// 导出任务执行结果
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
}

// 建立任务对话框
function addTaskDlg() {
    s.popAdd('add_task_dlg', {title: '建立任务'});
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
}

// 建立任务
function saveTaskUser() {
    var taskId = task.id;
    s.postSubmit('table', 'add_task_dlg', '../task/saveTaskUser.do?taskId=' + taskId, false, function() {
        var queryParams = {taskId: taskId};
        s.datagrid('table', columns, {
            url: '../task/taskUserList.do',
            toolbar: "#top",
            queryParams: queryParams,
            onLoadSuccess: function (data) {
                $('.task-record-download').linkbutton({text: '历史记录', iconCls: 'image-download'});
            }
        });
    });

}

function addStartTaskDlg() {
    s.popAdd('update_task_dlg', {title: '请输入红包的金额'});
}

function cancelStartTask() {
    s.closeDialog('update_task_dlg');
}

// 删除词表
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该记录吗？', '../task/deleteTaskUserRecord.do', {id:row.id});
}

function setTime(startDate, endDate) {
    s.initRangeDateBeforeDays("add_task_endDate", endDate);
    s.initRangeDateBeforeDays("add_task_startDate", startDate);
}
