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
                    var queryParams = $('#root_extract_table').datagrid('options').queryParams;
                    queryParams.businessId=business;
                    $('#root_extract_table').datagrid('reload');

                    $('#businessId').val(business);
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
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

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'name', title: '词表', align: 'center', width: '200'},
        {field: 'lastExtractTime', title: '上次提取词根时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    var business = $('#business').combobox('getValue');
    $('#businessId').val(business);
    queryParams = {
        businessId: business
    };

    s.datagrid('root_extract_table', columns, {
        url: '../root/getDictionaryList.do',
        toolbar: "#top",
        singleSelect: false,
        queryParams: queryParams
    });
});

// 提取词根
function extractRoots() {
    var rows = $('#root_extract_table').datagrid('getSelections');

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }

    var categoryId = $("#category_id").combobox('getValue');

    if (rows.length != 0) {
        s.postConfirm('root_extract_table', '确认从所选的词表中在指定的分类提取词根吗？', '../root/extractRoots.do', {
            id: ids,
            categoryId:categoryId
        });
    } else {
        $.messager.show({title: '提示信息', msg: "请选择需要提取的词表"});
    }
}