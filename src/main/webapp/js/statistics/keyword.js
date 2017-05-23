var searchEngineList;
var status_ = [{id: -1, text: '全部'}, {id: 1, text: '在线'}, {id: 2, text: '下线'}];

$(document).ready(function () {
    $("#status").combobox('loadData', status_);
    $("#status").combobox('setValue', -1);

    $.ajax({
        url: "../common/getKeywordRankSearchEngineList.do?needAll=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            searchEngineList = data;
            $("#search_engine_id").combobox({
                data: data
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'ck', align: 'center', checkbox: true},
        {field: 'keyword', title: '关键词', align: 'center', width: '200'},
        {
            field: 'keywordRankSearchEngine', title: '搜索引擎', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {field: 'serverName', title: '链接', align: 'center', width: '200'},
        {field: 'initialRank', title: '初始排名', align: 'center', width: '100', sortable: true,
            formatter: function (value, rowData, index) {
                if (value > 100) {
                    return '100+';
                }
                return value;
            }},
        {field: 'lastRank', title: '最新排名', align: 'center', width: '100', sortable: true},
        {
            field: 'lastChangeRank', title: '最新变化', align: 'center', width: '100', sortable: true,
            formatter: function (value, rowData, index) {
                return getFontColor(value);
            }
        },
        {
            field: 'allChangeRank', title: '总变化量', align: 'center', width: '100', sortable: true,
            formatter: function (value, rowData, index) {
                return getFontColor(value);
            }
        },
        {field: 'clickCount', title: '日点击', align: 'center', width: '100'},
        {field: 'todayClickCount', title: '今日点击', align: 'center', width: '100'},
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
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {field: 'updateTime', title: '最后点击时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    s.datagrid('table', columns, {
        url: '../statistics/getKeywordRankList.do',
        toolbar: "#top",
        singleSelect: false,
        multiSort: true,
        pageList: [10, 15, 20, 50, 100, 200, 500, 1000],
        queryParams: queryParams
    });
});

function getFontColor(value) {
    if (value == 0) {
        return value;
    } else if (value > 0) {
        return '<font style="color: red;">' + value + '</font>';
    } else {
        return '<font style="color: green;">' + value + '</font>';
    }
}

// 搜索
function doSearch() {
    s.search('table', 'searchForm');
};

// 建立任务对话框
function addTaskDlg() {
    s.popAdd('add_task_dlg', {title: '建立任务'});

    $("#add_task_search_engine_id").combobox({
        data: searchEngineList
    });
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

// 建立任务
function saveTask() {
    var searchEngineId = $("#add_task_search_engine_id").combobox('getValue');
    if (searchEngineId == '-1') {
        s.error('请选择搜索引擎');
        return false;
    }

    s.postSubmit('table', 'add_task_dlg', '../statistics/saveTask.do');
}

// 修改任务对话框
function updateTaskDlg() {
    var rows = $('#table').datagrid('getSelections');
    if (rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }
    $('#update_task_id').val(ids);

    s.popAdd('update_task_dlg', {title: '修改任务'});
}

// 取消
function cancelUpdateTask() {
    s.closeDialog('update_task_dlg');
};

// 修改任务
function updateTask() {
    $('#update_task_type').val(4);

    s.postSubmit('table', 'update_task_dlg', '../statistics/updateTask.do');
}

// 1-开始任务对话框 2-终止任务对话框 3-删除任务对话框
function updateTaskStatusDlg(type) {
    var rows = $('#table').datagrid('getSelections');

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }

    var msg;
    if (type == 1) {
        msg = '确认上线所选的关键词吗？';
    } else if (type == 2) {
        msg = '确认下线所选的关键词吗？'
    } else if (type == 3) {
        msg = '确认删除所选的关键词吗？'
    }

    if (rows.length != 0) {
        s.postConfirm('table', msg, '../statistics/updateTask.do', {id: ids, type: type});
    } else {
        s.showMessage('请选中需要操作的行');
    }
}

/**
 * 导出数据到excel
 */
function exportTaskRecord() {
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

            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../statistics/exportTaskRecord.do', filters, function (data) {
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
