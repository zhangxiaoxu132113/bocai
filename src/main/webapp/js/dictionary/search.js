var status_ = [{id: -3, text: '异常'}, {id: -2, text: '已取消'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var type = [{id: -1, text: '全部'}, {id: 1, text: '监控'}, {id: 2, text: '单次'}];
var t;

$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'dictionaryId', title: '词表ID', align: 'center', width: '100'},
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
        {field: 'dictionaryName', title: '词表', align: 'center', width: '150'},
        {
            field: 'searchEngine', title: '搜索引擎', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {
            field: 'area', title: '地域', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {field: 'keywordNum', title: '词数', align: 'center', width: '100'},
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
        {field: 'lastFinishTime', title: '完成时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '抓取结果', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                return '<a href="#" class="dictionary-task" onclick=addTab("任务记录","/task/record.do?fromType=2&taskId=' + rowData.id + '")>任务记录</a>';
            }
        }
    ];

    var queryParams = [];
    queryParams = {
        dictionaryId: '123'
    };

    s.datagrid('task_table', columns, {
        url: '../task/getTaskList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.dictionary-task').linkbutton({text: '任务记录', iconCls: 'image-directory'});
        }
    });

});

// 搜索
function doSearch() {
    var dictionaryId = $('#dictionaryId').val();
    if (dictionaryId == '') {
        s.showMessage('请输入词表ID');
        return;
    }
    s.search('task_table', 'searchForm');
};

function dictionaryAnalysis() {
    var dictionaryId = $('#dictionaryId').val();
    if (dictionaryId == '') {
        s.showMessage('请输入词表ID');
        return;
    }
    $.ajax({
        url: "../dictionary/getDictionary.do?id=" + dictionaryId,
        type: "post",
        cache: false,
        success: function (result, status) {
            if (result.code == '1') {
                addTab("趋势分析", '/task/chat.do?dictionaryId=' + dictionaryId + '&rankType=2&dictionaryName=' + result.rows.name);
            } else {
                s.error(result.msg);
            }
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

}
