/**
 * Created by zhangmiaojie on 2016/11/22.
 */
var executeStatus = [{id: -3, text: '异常'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var taskType = [{id: 0, text: '任务'}, {id: 1, text: '任务ID'}];
var businessParentList = null;
var allBusinessList = null;

$(document).ready(function () {
    //获取一级业务的数据
    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            var defaultData = {'businessId': '-1', 'businessName': '请选择'};
            data.splice(0, 0, defaultData);
            businessParentList = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    //获取所有业务的数据
    $.ajax({
        url: "../business/getBusinessList.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            allBusinessList = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

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
        {field: 'businessName', title: '所属业务', align: 'center', width: '100'},
        {
            field: 'rankStatus', title: '排名状态', align: 'center', width: '100',
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
            field: 'pvStatus', title: 'PV状态', align: 'center', width: '100',
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
        {field: 'keywordNum', title: '关键词l数量', align: 'center', width: '100'},
        {field: 'searchTime', title: '搜索时间', align: 'center', width: '100'},
        {field: 'updateTime', title: '更新时间', align: 'center', width: '150'},
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
        url: '../tools/getKeywordRankPvTaskList.do',
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

    $.post('../tools/exportKeywordRankPvTaskResult.do', {
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

//建立任务对话框
function addTaskDlg() {
    //默认给搜索时间赋值为前两天的值
    s.popAdd('add_task_dlg', {title: '建立任务'});

    s.initRangeDateBeforeDays("add_task_searchDate", 2);
    //给一级业务赋值并监听事件
    $("#business_level_one").combobox({
        data: businessParentList,
        onSelect: function () {
            var level_one_id = $('#business_level_one').combobox('getValue');
            $.ajax({// 二级业务
                url: "../business/getBusinessListJsonByLevel.do",
                type: "post",
                cache: false,
                async: false,
                data: {
                    needAll: 1,
                    type: 2,
                    businessId: level_one_id
                },
                success: function (data, status) {
                    if (data == null) return;
                    $("#business_level_two").combobox({
                        data: data
                    });
                    $("#business_level_two").combobox('enable');
                },
                error: function () {
                    return false;
                },
                dataType: "json"
            });
        }
    });
    $('#business_level_one').combobox('setValue', '-1');
}

// 建立任务
function saveTask() {
    var businessId = $('#business_level_two').combobox('getValue');
    if (businessId == -1) {
        s.error("请选择二级业务！");
        return;
    }
    s.postSubmit('table', 'add_task_dlg', '../tools/saveKeywordRankPvTask.do');

}

// 删除任务
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该任务吗？', '../tools/deleteKeywordRankPvTask.do', {id: row.id});
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

// 检查搜素词的日期
function checkSearchDate() {
    var searchDate = $("#add_task_searchDate").datebox('getValue');
    var businessId = $('#business_level_two').combobox('getValue');
    console.log(searchDate);
    console.log(businessId);
    if (searchDate == "") {
        s.error("请选择搜索词日期！");
        return;
    }
    if (businessId == -1) {
        s.error("请选择二级业务！");
        return;
    }
    //检查搜索词是否已经爬取
    $.post('../tools/checkKywordBySearchDate.do', {
        secondBusinessId: businessId,
        searchDate: searchDate
    }, function (data) {
        if (data.result && data.result == 1) {
            s.success(data.msg);
            return;
        }
        s.error(data.msg);
    }, 'json');
}
