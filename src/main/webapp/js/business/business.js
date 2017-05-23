var enabled = [{id: -1, text: '全部'}, {id: 0, text: '无效'}, {id: 1, text: '有效'}];
var searchEngineType = [{id: -1, text: '请选择'}, {id: 1, text: 'PC端'}, {id: 2, text: 'WAP端'}, {id: 3, text: '通用'}];
var type = [{id: -1, text: '请选择'}, {id: 1, text: '一级'}, {id: 2, text: '二级'}];
var type_ = [{id: -1, text: '全部'}, {id: 1, text: '一级'}, {id: 2, text: '二级'}];

$(document).ready(function () {
    $("#type").combobox({
        data: type_,
        onSelect: function (data) {
            if (data.id == 2) {
                $("#name").textbox({prompt: '精确的父业务'});
            } else {
                $("#name").textbox({prompt: '模糊'});
            }
        }
    });
    $("#type").combobox('setValue', -1);

    $("#enabled").combobox('loadData', enabled);
    $("#enabled").combobox('setValue', -1);

    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'parentId', title: 'parentId', align: 'center', hidden: true},
        {field: 'name', title: '业务', align: 'center', width: '150'},
        {
            field: 'site', title: '域名', align: 'center', width: '150',
            formatter: function (row, index) {
                if (row != undefined) {
                    return row.domain;
                } else {
                    return;
                }
            }
        },
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
        {
            field: 'enabled', title: '账号状态', align: 'center', width: '100',
            formatter: function (row, index) {
                return formatEnabled(row);
            }
        },
        {field: 'parentName', title: '父级业务', align: 'center', width: '150'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {field: 'updateTime', title: '更新时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    queryParams = {};

    s.datagrid('business_table', columns, {
        url: '../business/getBusinessList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onDblClickCell: updateBusinessDlg
    });

});

// 搜索
function doSearch() {
    s.search('business_table', 'searchForm');
};

// 添加业务对话框
function addBusinessDlg() {
    s.popAdd('add_business_dlg', {title: '添加业务'});

    $("#add_business_dlg").dialog('resize', {height: 180});
    $('#add_business_second_div').css('display', 'none');
    $("#add_business_site_domain").textbox({required: false});

    $("#add_business_search_engine_type").combobox('loadData', searchEngineType);
    $("#add_business_search_engine_type").combobox('setValue', -1);

    $("#add_business_type").combobox({
        data: type,
        onSelect: function (data) {
            if (data.id == 2) {
                $("#add_business_dlg").dialog('resize', {height: 280});
                $('#add_business_second_div').css('display', 'block');
                $("#add_business_site_domain").textbox({required: true});
            } else {
                $("#add_business_dlg").dialog('resize', {height: 180});
                $('#add_business_second_div').css('display', 'none');
                $("#add_business_site_domain").textbox({required: false});
            }

        }
    });
    $("#add_business_type").combobox('setValue', -1);

    $.ajax({
        url: "../business/getBusinessListJsonByLevel.do?needAll=1&type=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            $("#add_business_parent_id").combobox({
                data: data
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 取消
function cancelSaveBusiness() {
    s.closeDialog('add_business_dlg');
};

// 添加业务
function saveBusiness() {
    var type = $("#add_business_type").combobox('getValue');
    if (type == -1) {
        s.showMessage('请选择业务层级');
        return false;
    } else if (type == 2) {
        var parentId = $("#add_business_parent_id").combobox('getValue');
        if (parentId == -1) {
            s.showMessage('请选择父级业务');
            return false;
        }

        var searchEngineType = $("#add_business_search_engine_type").combobox('getValue');
        if (searchEngineType == -1) {
            s.showMessage('请选择搜索引擎类型');
            return false;
        }
    }

    s.postSubmit('business_table', 'add_business_dlg', '../business/saveBusiness.do');
}

// 修改业务对话框
function updateBusinessDlg() {
    var row = $('#business_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('update_business_dlg', {title: '修改业务'});

    $('#update_business_form').form('load', row);
    $('#update_business_id').val(row.id);

    var parentId = row.parentId;
    if (parentId != undefined && parentId != '') {
        $.ajax({
            url: "../business/getBusinessListJsonByLevel.do?needAll=0&type=1",
            type: "post",
            cache: false,
            async: false,
            success: function (data, status) {
                if (data == null) return;
                $("#update_business_parent_id").combobox({
                    data: data
                });
                $("#update_business_parent_id").combobox('setValue', parentId);
            },
            error: function () {
                return false;
            },
            dataType: "json"
        });
        $("#update_business_search_engine_type").combobox('loadData', searchEngineType);

        $('#update_business_sid').val(row.site.id);
        $('#update_business_business_type').val(2);
        $("#update_business_site_domain").textbox('setText', row.site.domain);

        $("#update_business_dlg").dialog('resize', {height: 280});
        $('#update_business_second_div').css('display', 'block');
        $("#update_business_site_domain").textbox({required: true});
    } else {
        $('#update_business_business_type').val(1);

        $("#update_business_dlg").dialog('resize', {height: 180});
        $('#update_business_second_div').css('display', 'none');
        $("#update_business_site_domain").textbox({required: false});
    }

    var enabled = "0";
    if (row.enabled) {
        enabled = "1";
    }
    var enabled_ridaolen = document.update_business_form.enabled.length;
    for (var i = 0; i < enabled_ridaolen; i++) {
        if (enabled == document.update_business_form.enabled[i].value) {
            document.update_business_form.enabled[i].checked = true
        }
    }
}

// 取消
function cancelUpdateBusiness() {
    s.closeDialog('update_business_dlg');
};

// 修改业务
function updateBusiness() {
    var type = $("#update_business_search_engine_type").combobox('getValue');
    if (type == -1) {
        s.showMessage('请选择爬取搜索引擎类型');
        return false;
    }

    s.postSubmit('business_table', 'update_business_dlg', '../business/updateBusiness.do');
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