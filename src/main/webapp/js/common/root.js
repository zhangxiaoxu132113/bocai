var categoryRoot;

$(document).ready(function () {

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'name', title: '词根', align: 'center', width: '200'},
        {
            field: 'category', title: '分类', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    s.datagrid('root_table', columns, {
        url: '../root/getRootList.do',
        toolbar: "#top",
        singleSelect: false,
        queryParams: queryParams
    });

    $.ajax({
        url: "../root/getCategoryList.do?needAll=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            categoryRoot = data;
            $("#category_id").combobox('loadData', data);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

});

// 搜索
function doSearch() {
    s.search('root_table', 'searchForm');
};

// 上传词根对话框
function uploadExcelDlg() {
    s.popAdd('add_root_dlg', {title: '上传词根'});
}

// 取消
function cancelUploadExcel() {
    s.closeDialog('add_root_dlg');
};

// 上传词根
function uploadExcel() {
    s.postSubmit('root_table', 'add_root_dlg', '../root/uploadExcel.do');
}

// 删除词根对话框
function delRootsDlg() {
    var rows = $('#root_table').datagrid('getSelections');

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }

    if (rows.length != 0) {
        s.postConfirm('root_table', '确认删除所选的词根吗？', '../root/delRoots.do', {
            id: ids
        });
    } else {
        s.showMessage('请选择需要删除的词根');
    }
}

// 删除词根分类对话框
function delCategoryDlg() {
    var categoryId = $('#category_id').combobox('getValue');
    var categoryName = $('#category_id').combobox('getText');

    if (categoryId == '-1' || categoryId == undefined) {
        s.showMessage('请在分类下拉框选择需要删除的分类');
    } else {
        s.postConfirm('root_table', '确认删除所选的分类吗？', '../root/delCategory.do', {
            categoryId: categoryId,
            categoryName: categoryName
        });
    }
}

// 修改分类对话框
function updateRootDlg() {
    var rows = $('#root_table').datagrid('getSelections');
    if (rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    } else if (rows.length > 1) {
        s.showMessage('请选中需要操作的单行');
        return;
    }

    var row = rows[0];
    s.popAdd('update_root_dlg', {title: '修改分类'});

    $('#update_root_form').form('load', row);
    $('#update_root_id').val(row.id);
    $('#name').val(row.category);
    $("#category").combobox('loadData', categoryRoot);
    $("#category").combobox('setValue', row.categoryId);
}

// 取消
function cancelUpdateRoot() {
    s.closeDialog('update_root_dlg');
};

// 修改词表
function updateRoot() {
    var id = $("#category").combobox('getValue');
    if(id == -1){
        s.showMessage("请选择分类");
        return ;
    }
    s.postSubmit('root_table', 'update_root_dlg', '../root/updateRoot.do');
}

// 词根导出
function exportRoots() {
    $.messager.confirm('提示信息', '确认导出该筛选条件下的所有词根吗？(最多5W个)', function (r) {
        if (r) {
            var filters = {};
            var array = $('#searchForm').serialize().split('&');
            for (var i = 0; i < array.length; i++) {
                var entry = array[i].split('=');
                if (entry.length > 1) {
                    filters[entry[0]] = decodeURIComponent(entry[1]);
                }
            }

            $("#root_table").datagrid("loading");// 显示遮罩层
            $.post('../root/exportRoots.do', filters, function (data) {
                $("#root_table").datagrid("loaded");// 关闭遮罩层
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