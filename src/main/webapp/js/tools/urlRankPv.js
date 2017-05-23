/**
 * Created by zhangmiaojie on 2016/11/22.
 */
var executeStatus = [{id: -3, text: '异常'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var taskType = [{id: 0, text: '任务'}, {id: 1, text: '任务ID'}];
var types = [{id: 1, text: '监控'}, {id: 2, text: '单次'}];
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
            field: 'rankWapStatus', title: 'WAP排名状态', align: 'center', width: '100',
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
        {
            field: 'rankPcStatus', title: 'PC排名状态', align: 'center', width: '100',
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
        {
            field: 'type', title: '执行类型', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                var statusStr;
                $.each(types, function (index, s) {
                    if (s.id == value) {
                        statusStr = s.text;
                    }
                });
                return statusStr;
            }
        },
        {
            field: 'status', title: '执行状态', align: 'center', width: '100',
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
        {field: 'lastFinishTime', title: '完成时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '抓取结果', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                return '<a href="#" class="dictionary-task" onclick=addTab("任务记录","/tools/record.do?fromType=1&taskId=' + rowData.id + '")>任务记录</a>';
            }
        }
    ];

    var queryParams = [];

    s.datagrid('table', columns, {
        url: '../tools/getUrlRankPvTaskList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.dictionary-task').linkbutton({text: '任务记录', iconCls: 'image-directory'});
        }
    });
});

// 搜索
function doSearch() {
    s.search('table', 'searchForm');
};



// 建立任务对话框
function addTaskDlg() {
    s.popAdd('add_task_dlg', {title: '建立任务'});

}

// 建立任务
function saveTask() {
    s.postSubmit('table', 'add_task_dlg', '../tools/saveUrlRankPvTask.do');

}

// 删除任务
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    console.log(row);
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该任务吗？', '../tools/deleteUrlRankPvTask.do', {id: row.id});
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};