var status_ = [{id: -3, text: '异常'}, {id: -2, text: '已取消'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var dictionarySearchType = [{id: 0, text: '词表'}, {id: 1, text: '词表ID'}];
var business;
var businessId;

$(document).ready(function () {
    $("#dictionary_search_type").combobox({
        data: dictionarySearchType,
        onSelect: function (data) {
            if (data.id == 0) {
                $("#name").textbox({prompt: '模糊'});
            } else if (data.id == 1) {
                $("#name").textbox({prompt: '精确'});
            }
        }
    });
    $("#dictionary_search_type").combobox('setValue', 1);

    $("#task_status").combobox({data: status_});
    $("#task_status").combobox('setValue', -1);

    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            business = data;
            $("#business").combobox({
                data: data,
                onSelect: function () {
                    businessId = $('#business').combobox('getValue');
                    var queryParams = $('#table').datagrid('options').queryParams;
                    queryParams.businessId = businessId;
                    $('#table').datagrid('reload');

                    $('#businessId').val(businessId);
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'dictionaryId', title: '词表ID', align: 'center', width: '100'},
        {field: 'name', title: '词表  ', align: 'center', width: '200'},
        {field: 'keywordNum', title: '关键词数量', align: 'center', width: '100'},
        {field: 'enabledCompare', title: '爬取竞争对手', align: 'center', width: '100',
            formatter: function (row, index) {
                return formatEnabled(row);
            }
        },
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
        {
            field: 'operation', title: '操作', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                var btn = '<a class="task-record-download" href="javascript:; onclick=exportTaskResult();">任务结果</a>';
                return btn;
            }
        }
    ];

    var queryParams = [];

    businessId = $('#business').combobox('getValue');
    $('#businessId').val(businessId);
    queryParams = {
        businessId: businessId
    };

    s.datagrid('table', columns, {
        url: '../tools/getBaiduKeywordZhanneiList.do',
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

// 检测词表id是否存在
function checkDictionary() {
    var dictionaryId = $("#add_task_dictionary_id").textbox('getValue');
    if (dictionaryId == '' || dictionaryId == undefined) {
        s.error('请输入词表ID');
        return false;
    }

    var businessId = $('#add_business_id').combobox('getValue');

    $.ajax({
        url: "../dictionary/getDictionary.do",
        type: "post",
        cache: false,
        data: {'id': dictionaryId, 'businessId': businessId},
        success: function (data, status) {
            if (data == null) return;
            if (data.code == '0') {
                s.error(data.msg);
                return false;
            } else {
                s.showMessage("词表ID正确");
                return true;
            }
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
};

// 建立任务对话框
function addTaskDlg() {
    s.popAdd('add_task_dlg', {title: '建立任务'});

    $("#add_business_id").combobox({data: business});
};

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

// 建立任务
function saveTask() {
    s.postSubmit('table', 'add_task_dlg', '../tools/saveBaiduKeywordZhanneiTask.do');
};

// 删除词表
function deleteTask() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该任务吗？', '../tools/deleteBaiduKeywordZhanneiTask.do', {id: row.id});
};

function exportTaskResult() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    $.post('../tools/exportZhanneiTaskResult.do', {
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

function formatEnabled(value) {
    var temp;
    if (value == "0") {
        temp = "否";
    } else if (value == "1") {
        temp = "是";
    }
    return temp;
}
