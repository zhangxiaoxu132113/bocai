var searchEngineType = [{id: -1, text: '请选择'}, {id: 1, text: 'PC端'}, {id: 2, text: 'WAP端'}, {id: 3, text: '通用'}];

$(document).ready(function () {
    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            $("#business").combobox({
                data: data,
                onSelect: function () {
                    var business = $('#business').combobox('getValue');
                    var queryParams = $('#compare_table').datagrid('options').queryParams;
                    queryParams.businessId = business;
                    $('#compare_table').datagrid('reload');
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'businessId', title: 'businessId', align: 'center', hidden: true},
        {field: 'siteName', title: '对手', align: 'center', width: '150'},
        {field: 'domain', title: '域名', align: 'center', width: '150'},
        {
            field: 'searchEngineType', title: '搜索引擎爬取类型', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                var typeStr;
                $.each(searchEngineType, function (index, t) {
                    if (t.id == value) {
                        typeStr = t.text;
                    }
                });
                return typeStr;
            }
        },
        {field: 'sort', title: '排序', align: 'center', width: '100'},
        {field: 'remark', title: '备注', align: 'center', width: '150'},
        {
            field: 'enabled', title: '状态', align: 'center', width: '100',
            formatter: function (row, index) {
                return formatEnabled(row);
            }
        }
    ];

    var queryParams = [];

    var business = $('#business').combobox('getValue');
    queryParams = {
        businessId: business
    };

    s.datagrid('compare_table', columns, {
        url: '../compare/getCompareList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onDblClickCell: updateCompareDlg
    });

});

// 搜索
function doSearch() {
    s.search('compare_table', 'searchForm');
};

// 添加竞争对手对话框
function addCompareDlg() {
    s.popAdd('add_compare_dlg', {title: '添加竞争对手'});

    $("#add_compare_site_search_engine_type").combobox('loadData', searchEngineType);
    $("#add_compare_site_search_engine_type").combobox('setValue', -1);

    var business = $('#business').combobox('getValue');
    $('#add_compare_businessId').val(business);// 业务id
}

// 取消
function cancelSaveCompare() {
    s.closeDialog('add_compare_dlg');
};

// 添加竞争对手
function saveCompare() {
    var searchEngineType = $("#add_compare_site_search_engine_type").combobox('getValue');
    if (searchEngineType == -1) {
        s.showMessage('请选择搜索引擎类型');
        return false;
    }

    s.postSubmit('compare_table', 'add_compare_dlg', '../compare/saveCompare.do');
}

// 修改竞争对手对话框
function updateCompareDlg() {
    var row = $('#compare_table').datagrid('getSelected');
    if (!row) {
        $.messager.show({title: '提示信息', msg: "请选中需要操作的行"});
        return;
    }
    s.popAdd('update_compare_dlg', {title: '修改竞争对手'});

    $("#update_compare_site_search_engine_type").combobox('loadData', searchEngineType);

    $('#update_compare_form').form('load', row);

    $('#update_compare_id').val(row.id);

    var enabled = "0";
    if (row.enabled) {
        enabled = "1";
    }
    var enabled_ridaolen = document.update_compare_form.enabled.length;
    for (var i = 0; i < enabled_ridaolen; i++) {
        if (enabled == document.update_compare_form.enabled[i].value) {
            document.update_compare_form.enabled[i].checked = true
        }
    }
}

// 取消
function cancelUpdateCompare() {
    s.closeDialog('update_compare_dlg');
};

// 修改竞争对手
function updateCompare() {
    var type = $("#update_compare_site_search_engine_type").combobox('getValue');
    if (type == -1) {
        s.showMessage('请选择爬取搜索引擎类型');
        return false;
    }

    s.postSubmit('compare_table', 'update_compare_dlg', '../compare/updateCompare.do');
}

function formatEnabled(value) {
    var temp;
    if (value == "0") {
        temp = "无效";
    } else if (value == "1") {
        temp = "有效";
    }
    return temp;
}