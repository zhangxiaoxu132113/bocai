
var vi = [{face: '1', faceName: '关键词'}, {face: '2', faceName: '词表'}, {face: '3', faceName: '备注'}];
var val;
$(document).ready(function () {

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '50', hidden: true},
        {field: 'name', title: '数据项', align: 'center', width: '200'},
        {field: 'description', title: '描述', align: 'center', width: '200'},
        {field: 'sort', title: '排序', align: 'center', width: '100'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '200'},
        {
            field: 'view', title: '是否可见', align: 'center', width: '100',
            formatter: function (value,row, index) {
                var type="";
                if(row.isView == 1) type = "checked=checked";
                return '<input type="checkbox" value="'+row.id+'" id="isView" name="isView" '+type+' />';
            }
        }
    ];


    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            $("#bs").combobox({
                data: data,
                onSelect: function () {
                    var bss = $('#bs').combobox('getValue');
                    var queryParams = $('#dg').datagrid('options').queryParams;
                    queryParams.businessId=bss;
                    $('#dg').datagrid('reload');
                },
                onLoadSuccess: function () { //加载完成后,设置选中第一项
                    val = $('#bs').combobox('getValue');
                    $("#bs").combobox('setValue', val);
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $("#face").combobox('loadData', vi);
    $("#face").combobox('setValue', "1");

    var queryParams = [];

    queryParams = {
        businessId: $('#bs').combobox('getValue'),
        face:$('#face').combobox('getValue')
};

    s.datagrid('dg', columns, {
        url: '../header/getHeadersList.do',
        toolbar: "#top",
        singleSelect: false,
        queryParams:queryParams
    });

    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            doSearch();
        }
    };
});

// 搜索
function doSearch() {
    s.search('dg', 'searchForm');
};

// 添加账户对话框
function add() {
    s.popAdd('header_add_dlg', {title: '添加数据项'});

    var businessId = $('#bs').combobox('getValue');
    var faces = $('#face').combobox('getValue');

    $("#header_add_businessId").val(businessId);
    $("#header_add_faces").val(faces);
    $("#header_add_type").val(1);
}

// 修改账户对话框
function editDlg() {

    var row = $('#dg').datagrid('getSelections');
    if (!row) {
        s.showMessage("请选中需要操作的行");
        return;
    }
    if (row.length != 1) {
        s.showMessage("请只选中一行进行操作");
        return;
    }
    s.popAdd('header_update_dlg', {title: '修改标签'});
    $('#update_form').form('load', row[0]);
    $('#id').val(row[0].id);
    $("#update_name").textbox('setText',row[0].name);
    $("#update_description").textbox('setText',row[0].description);
    var businessId = $('#bs').combobox('getValue');
    $("#header_update_businessId").val(businessId);
    $("#header_update_type").val(2);
}

// 上传对话框
function uploadExcelDlg() {
    s.popAdd('upload_header_dlg', {title: '上传数据项'});
    var businessId = $('#bs').combobox('getValue');
    var faces = $('#face').combobox('getValue');
    $("#businessId").val(businessId);
    $("#faces").val(faces);
}

function uploadExcel() {
    s.postSubmit('dg','upload_header_dlg','../header/uploadHeader.do');
}

// 取消
function closeDlg() {
    s.closeDialog('header_add_dlg');
};

function saveOrUpdate(id){//0:更新 1:新增 2:修改数据

    var businessId = $('#bs').combobox('getValue');
    var faces = $('#face').combobox('getValue');
    if(id==1){//新增

        s.postSubmit('dg', 'header_add_dlg', '../header/saveOrUpdate.do');
    }
    if(id==0){//更新选中CheckBox状态

        var allIDS =getAllIDS();
        var ckIDS =getCheckIDS();
        s.postConfirm('dg', '是否更新当前页标头可见状态？', '../header/saveOrUpdate.do',
            {
                allIDS: allIDS,
                ckIDS:ckIDS,
                businessId:businessId,
                type:id
            });
    }
    if(id==2) {//修改数据

        s.postSubmit('dg', 'header_update_dlg', '../header/saveOrUpdate.do');
    }
}

function deleteHeaders(){//批量删除

    var ids  = getSelectedRow();
    var businessId = $('#bs').combobox('getValue');
    if (ids=='' || ids == null) {
        s.showMessage("请选中需要操作的行");
        return;
    }
    s.postConfirm('dg', '是否确定删除选中数据？', '../header/delete.do', {ids: ids,businessId:businessId});
}

function getCheckIDS(){//是否可见栏，checkbox选中值
    var ids="";
    $('input[name="isView"]:checked').each(function(){
        ids += ($(this).val()+",");
    });
    return ids;
}

function getAllIDS(){//获取当页所有ID
    var str="" ;
    var rows = $("#dg").datagrid('getData').rows;
    for(var i=0;i<rows.length;i++){
        str += (rows[i]['id']+",");
    }
    return str;
}

function getSelectedRow(){//获取选中行
    var str="" ;
    var rows  = $('#dg').datagrid('getSelections');
    if (!rows) {
        s.showMessage("请选中需要操作的行");
        return;
    }else {
        for (var i = 0; i < rows.length; i++) {
            str += (rows[i]['id'] + ",");
        }
    }
    return str;
}
