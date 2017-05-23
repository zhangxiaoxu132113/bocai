var business;

$(document).ready(function () {
    var columns = [
        {field: 'keyword', title: '关键词', align: 'center', width: '200'}
    ];

    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            business = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var queryParams = [];

    s.datagrid('table', columns, {
        url: '../tools/getExpandKeywords.do',
        toolbar: "#top",
        pageList: [100, 500, 1000],
        pageSize: 100,
        queryParams: queryParams
    });
});

// 搜索
function doSearch() {
    var baseKeyword = $("#base_keyword").val();
    if (baseKeyword == undefined || baseKeyword == '') {
        s.error('请输入基础词');
        return false;
    }

    s.search('table', 'searchForm');
};

// 转词表对话框
function keywordsToDictionaryDlg() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词转为词表吗？(最多5W个)', function (r) {
        if (r) {
            s.popAdd('add_dictionary_dlg', {title: '转词表'});

            $("#business").combobox({data: business});
        }
    });
}

// 取消
function cancelKeywordsToDictionaryDlg() {
    s.closeDialog('add_dictionary_dlg');
};

// 转词表
function keywordsToDictionary() {
    var filters = {};

    var labels_json = [];
    var label = $("#add_dictionary_label").val();
    if (label != '') {
        var labels = label.split(',');
        $.each(labels, function (index, value) {
            if (value != '') {
                var id = label_map[value];
                var json = '{"id":"' + (id == undefined ? '-1' : id) + '","name":"' + value + '"}';
                labels_json.push(json);
            }
        });
        labels_json = '[' + labels_json + ']';
        filters['labels'] = decodeURIComponent(labels_json);
    }

    var name = $("#add_dictionary_name").textbox('getValue');
    filters['dictionaryName'] = decodeURIComponent(name);

    var baseKeyword = $("#base_keyword").val();
    filters['baseKeyword'] = decodeURIComponent(baseKeyword);

    var keyword = $("#keyword").val();
    filters['keyword'] = decodeURIComponent(keyword);

    var businessId = $('#business').combobox('getValue');//业务
    filters['businessId'] = decodeURIComponent(businessId);

    var validator = $('#add_dictionary_form').form('validate');
    if (validator) {
        $('#add_dictionary_dlg').dialog('close');
        $("#table").datagrid("loading");// 显示遮罩层
    } else {
        return;
    }

    $.post('../tools/keywordsToDictionary.do', filters, function (data) {
        $("#table").datagrid("loaded");// 关闭遮罩层
        if (data && data.code == 1) {
            s.success(data.msg);
            return;
        }
        s.error("没有数据需要转成词表");
    }, 'json');
}

// 关键词导出到excel
function exportKeywordsToExcel() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词导出到Excel吗？', function (r) {
        if (r) {
            var baseKeyword = $("#base_keyword").val();
            var keyword = $("#keyword").val();

            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../tools/exportKeywords.do', {
                "baseKeyword": baseKeyword,
                "keyword": keyword
            }, function (data) {
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