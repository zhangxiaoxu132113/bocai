var business;
$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'userName', title: '用户名', align: 'center', width: '150'},
        {field: 'uploadTime', title: '时间', align: 'center', width: '150'},
        {field: 'fileName', title: '文件名称', align: 'center', width: '150'},
        {field: 'description', title: '操作描述', align: 'center', width: '250'}
    ];

    countKeywords();
    var queryParams = [];
    s.datagrid('table', columns, {
        url: '../seo/getLogList.do',
        toolbar: "#top",
        queryParams: queryParams
    });
});

function countKeywords() {
    $.ajax({
        url: "../seo/countKeywords.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            $('#keywordCount').html(data.rows.keywordCount);
            $('#pvCount').html(data.rows.pvCount);
            $('#notMatchRootCount').html(data.rows.notMatchRootCount);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 搜索
function doSearch() {
    s.search('table', 'searchForm');
}

// 添加关键词对话框
function addKeywordDlg() {
    s.popAdd('add_keyword_dlg', {title: '添加关键词'});
}

// 取消
function cancelSaveKeyword() {
    s.closeDialog('add_keyword_dlg');
};

// 添加关键词
function saveKeyword() {
    var file = $('#add_keyword_file').textbox('getValue');
    if (file == '' || (!file.endsWith('.xls') && !file.endsWith('.xlsx'))) {
        s.error('请选择Excel文件');
        return false;
    }

    var form = $('#add_keyword_dlg').find('form');
    var validator = form.form('validate');
    if (validator) {
        $('#add_keyword_dlg').dialog('close');
        $('#table').datagrid("loading");// 显示遮罩层
    }

    var formDefault = {
        url: '../seo/addKeywords.do',
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            $('#table').datagrid("loaded");// 关闭遮罩层
            var result = $.parseJSON(result);
            if (result.code == '1') {
                s.success(result.msg);
                $('#table').datagrid('reload');

                countKeywords();
            } else {
                s.error(result.msg);
            }
        },
        error: function () {
            s.error('操作失败');
            return false;
        }
    }
    form.form('submit', formDefault);
}