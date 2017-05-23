var val;
$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '50', hidden: true},
        {field: 'name', title: '标签名', align: 'center', width: '200'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '200'}
    ];

    var queryParams = [];
    queryParams = {
        name: $("#name").val()
    };

    s.datagrid('dg', columns, {
        url: '../../label/getLabelList.do',
        toolbar: "#top",
        queryParams: queryParams,
        singleSelect: false
    });

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            doSearch();
        }
    };
});

// 搜索
function doSearch() {
    s.search('dg', 'searchForm');
};

// 添加对话框
function add() {
    s.popAdd('label_add_dlg', {title: '添加标签'});
}

// 取消
function closeDlg() {
    s.closeDialog('label_add_dlg');
};

// 修改账户对话框
function editDlg() {
    var rows = $('#dg').datagrid('getSelections');
    if (rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    } else if (rows.length > 1) {
        s.showMessage('请选中需要操作的单行');
        return;
    }

    s.popAdd('label_update_dlg', {title: '修改标签'});

    var row = rows[0];
    $('#label_update_form').form('load', row);

    $('#label_update_id').val(row.id);
}

//批量删除
function deleteLabel() {
    var ids = getSelectedRow();
    if (ids == '' || ids == null) {
        s.showMessage("请选中需要操作的行");
        return;
    }

    s.postConfirm('dg', '是否确定删除选中数据？', '../label/delete.do', {ids: ids});
}

function saveOrUpdate(type) {//0:更新 1:新增
    if (type == 1) {//新增
        s.postSubmit('dg', 'label_add_dlg', '../label/saveOrUpdate.do');
    }
    if (type == 0) {//更新
        var row = $('#dg').datagrid('getSelected');
        if (!row) {
            s.showMessage('请选中需要操作的行');
            return;
        }

        s.postSubmit('dg', 'label_update_dlg', '../label/saveOrUpdate.do');
    }
}

function getCheckIDS() {//是否可见栏，checkbox选中值
    var ids = "";
    $('input[name="isView"]:checked').each(function () {
        ids += ($(this).val() + ",");
    });
    return ids;
}

function getSelectedRow() {
    var str = "";
    var rows = $('#dg').datagrid('getSelections');
    if (!rows) {
        s.showMessage('请选中需要操作的行');
        return;
    } else {
        for (var i = 0; i < rows.length; i++) {
            str += (rows[i]['id'] + ",");
        }
    }
    return str;
}


