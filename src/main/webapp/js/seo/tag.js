/**
 * Created by zhangmiaojie on 2016/11/11.
 */
$(document).ready(function () {
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'name', title: '标签名', align: 'center', width: '150'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'}
    ];

    var queryParams = [];
    s.datagrid('table', columns, {
        url: '../seo/getSeoTagList.do',
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

// 建立词根标签对话框
function addSeoTagDlg() {
    s.popAdd('add_task_dlg', {title: '添加标签'});

}

// 建立词根标签
function saveSeoTag() {
    s.postSubmit('table', 'add_task_dlg', '../seo/saveSeoTag.do');

}

// 删除词根标签
function deleteSeoTag() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('table', '确认删除该标签吗？', '../seo/deleteSeoTag.do', {id: row.id});
}

//修改词根标签
function modifySeoTagDlg() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage("请选中需要操作的行");
        return;
    }
    s.popAdd('modify_task_dlg', {title: '修改标签'});
    $('#seoTagName').textbox("setValue", row.name);
    $('#seoTagId').val(row.id);
}

//导出标签下所属的词根列表
function exportSeoRootOnTag() {
    var row = $('#table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    $.messager.confirm('提示信息', '确定导出该标签所属的词根？', function (r) {
        if (r) {
            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../seo/exportSeoRoot.do', {"tagId": row.id}, function (data) {
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

//更新词根标签
function updateSeoTag() {
    var row = $('#table').datagrid('getSelected');
    var origin_name = row.name;
    var modify_name = $('#seoTagName').textbox('getValue');
    if (origin_name == modify_name) {
        s.showMessage("不能提交未修改过的词根标签");
        return;
    }
    s.postSubmit('table', 'modify_task_dlg', '../seo/updateSeoTag.do');
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

function cancelUpdateTask() {
    s.closeDialog('modify_task_dlg');
}