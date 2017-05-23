/**
 * Created by zhangmiaojie on 2016/11/11.
 */

var executeStatus = [{id: -3, text: '异常'}, {id: -2, text: '已取消'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
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

    $("#execution_status").combobox({
        data: executeStatus,
        onSelect: function (data) {
            console.log("获取下拉的框中的数据：" + data.text);
        }
    });
    $("#execution_status").combobox('setValue', -1);

    var columns = [
        {field: 'id', title: '任务Id', align: 'center', width: '100'},
        {field: 'name', title: '备注', align: 'center', width: '150'},
        {
            field: 'status', title: '执行状态', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                var statusStr;
                $.each(executeStatus, function (index, s) {
                    if (s.id == value) {
                        statusStr = s.text;
                    }
                });
                return statusStr;
            }
        },
        {field: 'urlNum', title: '任务url数量', align: 'center', width: '100'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '操作', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                var id = rowData.id;

                var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult();">任务结果</a>';
                return btn;
            }

        }
    ];

    var queryParams = [];

    s.datagrid('table', columns, {
        url: '../statistics/getBaiduUrlIndexStatisticsList.do',
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

// 导出任务结果
function exportTaskResult() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    $.post('../statistics/exportUrlIndexTaskResult.do', {
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

// 建立任务
function saveTask() {
    s.postSubmit('table', 'add_task_dlg', '../statistics/saveUrlIndexTask.do');

}

// 删除任务
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    console.log(row);
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该任务吗？', '../statistics/deleteUrlIndexTask.do', {id: row.id});
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};