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
    {field: 'updateTime', title: '更新时间', align: 'center', width: '150'},
    {field: 'createOn', title: '创建时间', align: 'center', width: '150'},
    {
        field: 'operation', title: '操作', align: 'center', width: '100',
        formatter: function (value, rowData, rowIndex) {
            var btn = '<a class="task-record-download" style="text-decoration: none" href="javascript:; onclick=openIncomeInfoTag();">历史记录</a>';
            return btn;
        }
    }
];

var columns_result = [
    {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
    {field: 'userId', title: '玩家', align: 'center', width: '200'},
    {field: 'num', title: '包位', align: 'center', width: '100'},
    {field: 'sum', title: '下注', align: 'center', width: '100'},
    {
        field: 'bonus', title: '盈利', align: 'center', width: '100',
        formatter: function (value, rowData, rowIndex) {
            var btn;
            if (value > 0) {
                btn = "<span style='color:green'>+"+value+"</span>";
            } else {
                btn = "<span style='color:red'>"+value+"</span>";
            }
            return btn;
        }
    },
    {field: 'updateTime', title: '创建时间', align: 'center', width: '150'},
    {field: 'createOn', title: '创建时间', align: 'center', width: '150'},
    {
        field: 'operation', title: '操作', align: 'center', width: '100',
        formatter: function (value, rowData, rowIndex) {
            var btn = '<a class="task-record-download" style="text-decoration: none" href="javascript:; onclick=openIncomeInfoTag();">历史记录</a>';
            return btn;
        }
    }
];

var result_detail_columns = [
    {field: 'num', title: '包位', align: 'center', width: '100'},
    {field: 'num', title: '金额', align: 'center', width: '100'},
    {field: 'num', title: '牛几', align: 'center', width: '100'},
    {field: 'sum', title: '共投', align: 'center', width: '100'},
    {field: 'sum', title: '结果', align: 'center', width: '100'},
    {field: 'sum', title: '盈利', align: 'center', width: '100'},
    {
        field: 'operation', title: '操作', align: 'center', width: '100',
        formatter: function (value, rowData, rowIndex) {
            var btn = '<a class="task-record-download" style="text-decoration: none" href="javascript:; onclick=openIncomeInfoTag();">查看详细</a>';
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
        $('.operator-table').css('display', 'block');
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
    s.postSubmit('table', 'add_task_dlg', '../task/saveTaskUser.do?taskId=' + taskId, false, function () {
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

function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该记录吗？', '../task/deleteTaskUserRecord.do', {id: row.id});
}

function modifyTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.popAdd('modify_task_dlg', {title: '修改下注信息'});
    console.log(row);
    $('#modify_id').val(row.id);
    $('#modify_num').val(row.num);
    $('#modify_sum').val(row.sum);
    $('#modify_player_name').html(row.userId);

}

function updateTaskUser() {
    //modify_task_dlg
    s.postSubmit('table', 'modify_task_dlg', '../task/updateTaskUser.do', false, function() {
        $('#table').datagrid('reload');
    });
}

function cancelUpdateTask() {
    s.closeDialog('modify_task_dlg');
}

function jishu_result() {
    s.postSubmit('table', 'update_task_dlg', '../task/getLotteryResults?taskId='+task.id, false, function(obj) {
        console.log(obj);
        if (obj.code == 1) {
            $('.crud_btn').css('display', 'none');
            $('.start_task_tr').css('display', 'none');
            $('.cancal_task_tr').css('display', 'none');
            $('.lottery_result_tr').css('display', 'block');

            var result = obj.rows;
            var inPackageNumsStr = '';
            var outPackageNumsStr = '';
            var tiePackageNUmsStr = '';
            if (result.inPackageNums.length > 0) {
                for (var i=0; i<result.inPackageNums.length; i++) {
                    inPackageNumsStr +=
                        "<span>" + result.inPackageNums[i] + "</span>,";
                }
            } else {
                inPackageNumsStr = '无';
            }

            if (result.outPackageNums.length > 0) {
                for (var i=0; i<result.outPackageNums.length; i++) {
                    outPackageNumsStr +=
                        "<span>" + result.outPackageNums[i] + "</span>,";
                }
            } else {
                outPackageNumsStr = '无';
            }

            if (result.tiePackageNUms.length > 0) {
                for (var i=0; i<result.tiePackageNUms.length; i++) {
                    tiePackageNUmsStr +=
                        "<span>" + result.tiePackageNUms[i] + "</span>,";
                }
            } else {
                outPackageNumsStr = '无';
            }
            console.log(inPackageNumsStr);
            console.log(outPackageNumsStr);
            console.log(tiePackageNUmsStr);
            $('.packageNum').html(result.packageNum);
            $('.profit').html(result.profit);
            $('.inCount').html(result.inCount);
            $('.moneyIn').html(result.moneyIn);
            $('.tieCount').html(result.tieCount);
            $('.outCount').html(result.outCount);
            $('.moneyOut').html(result.moneyOut);
            $('.agencyFee').html(result.agencyFee);
            $('.inPackageNums').html(inPackageNumsStr);
            $('.outPackageNums').html(outPackageNumsStr);
            $('.tiePackageNUms').html(tiePackageNUmsStr);
            s.popAdd('result_info_dlg', {title: '开奖结果'});

            var taskId = task.id;
            var queryParams = {taskId: taskId};
            s.datagrid('table', columns_result, {
                url: '../task/taskUserList.do?',
                toolbar: "#top",
                queryParams: queryParams,
                onLoadSuccess: function (data) {
                    $('.task-record-download').linkbutton({text: '历史记录', iconCls: 'image-download'});
                }
            });
        } else {
            s.showMessage(obj.msg);
        }
        s.closeDialog('update_task_dlg');
    });
    //$.ajax({
    //    type: 'POST',
    //    url: '/task/getLotteryResults',
    //    cache: false,
    //    data: {
    //        red1: $('.red1').val(),
    //        red2: $('.red2').val(),
    //        red3: $('.red3').val(),
    //        red4: $('.red4').val(),
    //        red5: $('.red5').val(),
    //        red6: $('.red6').val(),
    //        taskId: task.id,
    //        packageNum: $('.packageNum').val()
    //    },
    //    success: function(data) {
    //        if (data.code == 1) {
    //            $('.crud_btn').css('display', 'none');
    //            $('.start_task_tr').css('display', 'none');
    //            $('.cancal_task_tr').css('display', 'none');
    //            $('.lottery_result_tr').css('display', 'block');
    //
    //
    //            var result = data.rows;
    //            var inPackageNumsStr = '';
    //            var outPackageNumsStr = '';
    //            var tiePackageNUmsStr = '';
    //            if (result.inPackageNums.length > 0) {
    //                for (var i=0; i<result.inPackageNums.length; i++) {
    //                    inPackageNumsStr +=
    //                        "<span>" + result.inPackageNums[i] + "</span>,";
    //                }
    //            } else {
    //                inPackageNumsStr = '无';
    //            }
    //
    //            if (result.outPackageNums.length > 0) {
    //                for (var i=0; i<result.outPackageNums.length; i++) {
    //                    outPackageNumsStr +=
    //                        "<span>" + result.outPackageNums[i] + "</span>,";
    //                }
    //            } else {
    //                outPackageNumsStr = '无';
    //            }
    //
    //            if (result.tiePackageNUms.length > 0) {
    //                for (var i=0; i<result.tiePackageNUms.length; i++) {
    //                    tiePackageNUmsStr +=
    //                        "<span>" + result.tiePackageNUms[i] + "</span>,";
    //                }
    //            } else {
    //                outPackageNumsStr = '无';
    //            }
    //            console.log(inPackageNumsStr);
    //            console.log(outPackageNumsStr);
    //            console.log(tiePackageNUmsStr);
    //            $('.packageNum').html(result.packageNum);
    //            $('.profit').html(result.profit);
    //            $('.inCount').html(result.inCount);
    //            $('.moneyIn').html(result.moneyIn);
    //            $('.tieCount').html(result.tieCount);
    //            $('.outCount').html(result.outCount);
    //            $('.moneyOut').html(result.moneyOut);
    //            $('.agencyFee').html(result.agencyFee);
    //            $('.inPackageNums').html(inPackageNumsStr);
    //            $('.outPackageNums').html(outPackageNumsStr);
    //            $('.tiePackageNUms').html(tiePackageNUmsStr);
    //            s.popAdd('result_info_dlg', {title: '开奖结果'});
    //
    //            var taskId = task.id;
    //            var queryParams = {taskId: taskId};
    //            s.datagrid('table', columns_result, {
    //                url: '../task/taskUserList.do?',
    //                toolbar: "#top",
    //                queryParams: queryParams,
    //                onLoadSuccess: function (data) {
    //                    $('.task-record-download').linkbutton({text: '历史记录', iconCls: 'image-download'});
    //                }
    //            });
    //        } else {
    //            s.showMessage(data.msg);
    //        }
    //        s.closeDialog('update_task_dlg');
    //        console.log(data);
    //    },
    //    error: function () {
    //        s.closeDialog('update_task_dlg');
    //        return false;
    //    },
    //    dataType: 'json'
    //});
}

function close_result_info_dlg() {
    s.closeDialog('result_info_dlg');
}

function openIncomeInfoTag() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    var url = "../user/incomeInfo.do?taskId=" + row.userId;
    var title = "用户收益情况";
    var icon = "icon-ok";
    var jq = top.jQuery;
    if (jq("#tabs").tabs('exists', title)) {
        jq("#tabs").tabs("close", title);
    }
    s.openTabs(title, url, icon);
}

function cancelTask() {
    $.messager.confirm('提示信息', '确认取消这次发包吗？', function (r) {
        if (r) {
            $.ajax({
                type: "GET",
                url: "/task/cancalTask",
                data: {taskId:task.id},
                dataType: "json",
                success: function(data){
                    s.showMessage(data.msg);
                   if (data.code == 1) {
                       location.reload();
                   }

                }
            });
        }
    });
}

function cancelUpdateTask() {

}

function setTime(startDate, endDate) {
    s.initRangeDateBeforeDays("add_task_endDate", endDate);
    s.initRangeDateBeforeDays("add_task_startDate", startDate);
}



function openResultDlg() {
    var queryParams = {taskId: task.id};
    s.datagrid('table', columns, {
        url: '../task/getTaskResult.do?',
        toolbar: "#top",
        queryParams: queryParams
    });
    s.popAdd('result_dlg', {title: '开奖结果'});

}

function exportAllData() {
    $.messager.confirm('提示信息', '确认导出所有数据吗？', function (r) {
        if (r) {
            var filters = {};
            var array = $('#searchForm').serialize().split('&');
            for (var i = 0; i < array.length; i++) {
                var entry = array[i].split('=');
                if (entry.length > 1) {
                    filters[entry[0]] = decodeURIComponent(entry[1]);
                }
            }

            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../task/exportAllData.do', filters, function (data) {
                $("#table").datagrid("loaded");// 关闭遮罩层
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
