var roleList;
$(document).ready(function () {
    $.ajax({
        url: "../common/getRoleList.do?needAll=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            roleList = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [
        {field: 'id', title: '用户ID', align: 'center', width: '100'},
        {field: 'username', title: '用户名', align: 'center', width: '150'},
        {
            field: 'role', title: '角色', align: 'center', width: '150',
            formatter: function (value, row, index) {
                if (row.roleList && row.roleList.length && row.roleList.length > 0) {
                    var arr = [];
                    $.each(row.roleList, function (index, role) {
                        arr.push(role.name);
                    });
                    return arr.join('、');
                }
                return '无';
            }
        },
        {
            field: 'enabled', title: '账号状态', align: 'center', width: '100',
            formatter: function (row, index) {
                return formatEnabled(row);
            }
        },
        {
            field: 'businessList', title: '绑定业务', align: 'center', width: '200',
            formatter: function (value, row, index) {
                if (row.businessList && row.businessList.length && row.businessList.length > 0) {
                    var arr = [];
                    $.each(row.businessList, function (index, business) {
                        arr.push(business.businessName);
                    });
                    return arr.join('、');
                }
                return '无';
            }
        },
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {field: 'updateTime', title: '更新时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    queryParams = {};

    s.datagrid('account_table', columns, {
        url: '../account/getAccountList.do',
        toolbar: "#top",
        queryParams: queryParams,
        onDblClickCell: updateAccountDlg
    });

});

// 搜索
function doSearch() {
    s.search('account_table', 'searchForm');
};

// 添加账户对话框
function addAccountDlg() {
    s.popAdd('business_add_account_dlg', {title: '添加账号'});

    $("#business_add_role_id").combobox({
        data: roleList
    });
}

// 取消
function cancelSaveAccount() {
    s.closeDialog('business_add_account_dlg');
};

// 添加账户
function saveAccount() {
    var roleIds = $('#business_add_role_id').combobox('getValues');
    if ('-1' == roleIds) {
        s.error('请为账号配置角色');
        return false;
    }

    s.postSubmit('account_table', 'business_add_account_dlg', '../account/saveAccount.do');
}

// 修改账户对话框
function updateAccountDlg() {
    var row = $('#account_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('business_update_account_dlg', {title: '修改账号'});

    $('#business_update_account_form').form('load', row);

    $('#business_update_account_id').val(row.id);

    $("#business_update_role_id").combobox({
        data: roleList
    });

    if (row.roleList && row.roleList.length && row.roleList.length > 0) {
        var arr = [];
        $.each(row.roleList, function (index, role) {
            arr.push(role.roleId);
        });
        $('#business_update_old_role_id').val(arr);
        $('#business_update_role_id').combobox('setValues', arr);
    }

    var enabled = "0";
    if (row.enabled) {
        enabled = "1";
    }
    var enabled_ridaolen = document.business_update_account_form.enabled.length;
    for (var i = 0; i < enabled_ridaolen; i++) {
        if (enabled == document.business_update_account_form.enabled[i].value) {
            document.business_update_account_form.enabled[i].checked = true
        }
    }
}

// 取消
function cancelUpdateAccount() {
    s.closeDialog('business_update_account_dlg');
};

// 修改账户
function updateAccount() {
    var roleIds = $('#business_update_role_id').combobox('getValues');
    if ('-1' == roleIds) {
        s.error('请为账号配置角色');
        return false;
    }

    s.postSubmit('account_table', 'business_update_account_dlg', '../account/updateAccount.do');
}

// 绑定业务对话框
function bindAccountDlg() {
    var row = $('#account_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.popAdd('business_bind_account_dlg', {title: '绑定业务'});

    $('#from').datagrid({
        url: '../account/getAccountBusinessBindList.do?type=1&accountId=' + row.id
    });

    $('#to').datagrid({
        url: '../account/getAccountBusinessBindList.do?type=2&accountId=' + row.id
    });
}

// 取消
function cancelBindAccount() {
    s.closeDialog('business_bind_account_dlg');
};

// 添加绑定业务-单个或者多个
function addOnes() {
    var rows = $("#from").datagrid('getSelections');
    addBinds(rows);
}
// 添加绑定业务-所有
function addAll() {
    var rows = $("#from").datagrid('getRows');
    addBinds(rows);
}

// 添加绑定业务
function addBinds(rows) {
    var arow = $("#account_table").datagrid('getSelected');
    if (!rows || rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    var businessIds = "";
    for (var i = 0; i < rows.length; i++) {
        businessIds += rows[i].businessId + ",";
    }

    $.post('../account/addAccountBusinessBind.do', {
        accountId: arow.id,
        username: arow.username,
        businessId: businessIds
    }, function (result) {
        if (result.code == '1') {
            s.success(result.msg);
            $('#from').datagrid('reload');
            $('#to').datagrid('reload');
        } else {
            s.error(result.msg);
        }
    }, 'json');
}

// 删除绑定业务-单个或者多个
function removeOnes() {
    var rows = $("#to").datagrid('getSelections');
    removeBinds(rows, 1);
}
// 删除绑定业务-所有
function removeAll() {
    var rows = $("#to").datagrid('getRows');
    removeBinds(rows, 2);
}

// 删除绑定业务
function removeBinds(rows, type) {
    var arow = $("#account_table").datagrid('getSelected');
    if (!rows || rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    var businessIds = "";
    for (var i = 0; i < rows.length; i++) {
        businessIds += rows[i].businessId + ",";
    }

    $.post('../account/removeAccountBusinessBind.do', {
        accountId: arow.id,
        username: arow.username,
        businessId: businessIds,
        type: type
    }, function (result) {
        if (result.code == '1') {
            s.success(result.msg);
            $('#from').datagrid('reload');
            $('#to').datagrid('reload');
        } else {
            s.error(result.msg);
        }
    }, 'json');
}

// 业务排序
function updateSort() {
    var arow = $("#account_table").datagrid('getSelected');
    var rows = $('#to').datagrid('getSelections');
    if (rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    } else if (rows.length > 1) {
        s.showMessage('请选中需要操作的单行');
        return;
    }
    var row = rows[0];
    $.post('../account/updateSort.do', {
        id: row.id,
        username: arow.username,
        businessId: row.businessId
    }, function (result) {
        if (result.code == '1') {
            s.success(result.msg);
            $('#to').datagrid('reload');
        } else {
            s.error(result.msg);
        }
    }, 'json');
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
