$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'keywordId', title: 'keywordId', align: 'center', width: '100', hidden: true},
        {field: 'keyword', title: '关键词', align: 'center', width: '250'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '操作', align: 'center', width: '150',
            formatter: function (value, rowData, rowIndex) {
                return  '<a class="dictionary-keyword-analyze" href="javascript:; onclick=toKeywordDataPage(\''+businessId+'\');">趋势分析</a>';
            }
        }
    ];

    var queryParams = [];

    queryParams = {
        dictionaryId: dictionaryId
    };

    s.datagrid('keyword_table', columns, {
        url: '../dictionary/getKeywordList.do',
        toolbar: "#top",
        singleSelect: false,
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            $('.dictionary-keyword-analyze').linkbutton({text: '趋势分析', iconCls: 'image-chart'});
        }
    });
});

function toKeywordDataPage(businessId) {
    var row = $('#keyword_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    addTab("分析", "/keyword/chat.do?businessId=" + businessId + "&keywordId=" + row.keywordId + "&keyword=" + row.keyword);
}

// 搜索
function doSearch() {
    s.search('keyword_table', 'searchForm');
};

// 添加关键词对话框
function addKeywordDlg() {
    s.popAdd('add_keyword_dlg', {title: '添加关键词'});

    $('#add_keyword_dictionary_name').html(dictionaryName);
}

// 取消
function cancelSaveKeyword() {
    s.closeDialog('add_keyword_dlg');
};

// 添加关键词
function saveKeyword() {
    var keywords = $('#add_keyword_keywords').val();
    var file = $('#add_keyword_file').textbox('getValue');
    if (keywords == '' && file == '') {
        s.showMessage('关键词或者TXT文件至少二选一');
        return false;
    }

    s.postSubmit('keyword_table', 'add_keyword_dlg', '../dictionary/addKeywords.do');
}

// 删除关键词对话框
function delKeywordDlg() {
    var rows = $('#keyword_table').datagrid('getSelections');

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }

    if (rows.length != 0) {
        s.postConfirm('keyword_table', '确认删除所选的关键词吗？', '../dictionary/delKeywords.do', {
            dictionaryId: dictionaryId,
            id: ids
        });
    } else {
        s.showMessage('请选择需要删除的关键词');
    }
}

// 撤销关键词对话框
function delLastKeywordsDlg() {
    s.postConfirm('keyword_table', '确认撤销最近一次添加的关键词的操作吗？', '../dictionary/delLastKeywords.do', {dictionaryId: dictionaryId});
}
