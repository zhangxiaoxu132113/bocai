var dictionarySearchType = [{id: 0, text: '词表'}, {id: 1, text: '词表ID'}];
var business;

$(document).ready(function () {
    $("#dictionary_search_type").combobox({
        data: dictionarySearchType,
        onSelect: function (data) {
            if (data.id == 0) {
                $("#dictionaryName").textbox({prompt: '模糊'});
            } else if (data.id == 1) {
                $("#dictionaryName").textbox({prompt: '精确'});
            }
        }
    });
    $("#dictionary_search_type").combobox('setValue', 1);

    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            $("#business").combobox({
                data: data,
                onSelect: function () {
                    var business = $('#business').combobox('getValue');
                    var queryParams = $('#keyword_table').datagrid('options').queryParams;
                    queryParams.businessId = business;
                    load();
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    load();

});

/*
 * 初始列和数据
 */
function load() {
    business = $('#business').combobox('getValue');//业务
    $('#businessId').val(business);

    $.ajax({//下拉框
        url: "../header/getCheckHeaderIdJson.do?face=1&needAll=1",
        type: "post",
        cache: false,
        data: {"businessId": business},
        success: function (data, status) {
            $("#vs").combobox('loadData', data);
            $("#vs").combobox('setValue', "-1");
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $.ajax({// 二级业务
        url: "../business/getBusinessListJsonByLevel.do",
        type: "post",
        cache: false,
        async: false,
        data: {
            needAll: 1,
            type: 2,
            businessId: business
        },
        success: function (data, status) {
            if (data == null) return;
            $("#second_business").combobox({
                data: data
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var secondBusiness = $('#second_business').combobox('getValue');//业务

    $.ajax({
        url: "../common/getSearchEngineList.do?needAll=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            $("#search_engine_id").combobox({
                data: data
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var cols = [];// 第二层列
    cols.push(
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'businessId', title: 'businessId, ', align: 'center', width: '100', hidden: true},
        {field: 'keyword', title: '关键词', align: 'center', width: '200'},
        {
            field: 'rootList', title: '词根', align: 'center', width: '150',
            formatter: function (value, row, index) {
                if (row.rootList && row.rootList.length && row.rootList.length > 0) {
                    var arr = [];
                    $.each(row.rootList, function (index, root) {
                        arr.push(root.name);
                    });
                    return arr.join('、');
                }
                return '-';
            }
        },
        {
            field: 'specialList', title: '特征', align: 'center', width: '150',
            formatter: function (value, row, index) {
                if (row.specialList && row.specialList.length && row.specialList.length > 0) {
                    var arr = [];
                    $.each(row.specialList, function (index, special) {
                        arr.push(special.name);
                    });
                    return arr.join('、');
                }
                return '-';
            }
        }
    );

    var dataNum;
    var remarkNum;
    $.ajax({// 数据项表头
        url: "../header/getCheckHeaderJson.do?face=1&needAll=0",
        type: "post",
        cache: false,
        async: false,
        data: {"businessId": business},
        success: function (data, status) {
            if (data == null) {
                return;
            }
            dataNum = data.length;//动态列长度
            for (var i = 0; i < data.length; i++) {
                cols.push({field: data[i].id, title: data[i].name, align: 'center', width: '100'});//动态列
            }
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $.ajax({// 备注项表头
        url: "../header/getCheckHeaderJson.do?face=3&needAll=0",
        type: "post",
        cache: false,
        async: false,
        data: {"businessId": business},
        success: function (data, status) {
            if (data == null) {
                return;
            }
            remarkNum = data.length;//动态列长度
            for (var i = 0; i < data.length; i++) {
                cols.push({field: data[i].id, title: data[i].name, align: 'center', width: '100'});//动态列
            }
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    cols.push(
        {field: 'uploadDate', title: '数据上传日期', align: 'center', width: '150'},
        {
            field: 'operator', title: '操作', align: 'center', width: '100',
            formatter: function (value, row, index) {
                return '<a class="keyword-analysis" href="javascript:; onclick=toKeywordDataPage(\'' + secondBusiness + '\');">趋势分析</a>';
            }
        });

    var topCols = [];// 第一层列
    topCols.push(
        {title: '关键词', align: 'center', colspan: 3},
        {title: '分类', align: 'center', colspan: 2}
    );
    if (dataNum != undefined && dataNum > 0) {
        topCols.push(
            {title: '数据', align: 'center', colspan: dataNum}
        );
    }
    if (remarkNum != undefined && remarkNum > 0) {
        topCols.push(
            {title: '备注', align: 'center', colspan: remarkNum}
        );
    }
    topCols.push(
        {title: '操作', align: 'center', colspan: 2}
    );

    var keyword = $('#keyword').textbox('getText');
    var label = $('#label').val();

    var queryParams = [];
    queryParams = {
        "businessId": business,
        "keyword": keyword,
        "label": label
    };

    s.datagrid('keyword_table', [], {
        url: '../keyword/getKeywordsList.do',
        toolbar: "#top",
        autoRowHeight: false,
        queryParams: queryParams,
        columns: [
            topCols, cols
        ],
        onLoadSuccess: function (data) {
            $('.keyword-analysis').linkbutton({text: '分析', iconCls: 'image-chart'});
        }
    });
}

function toKeywordDataPage(businessId) {
    var row = $('#keyword_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    addTab("分析", "/keyword/chat.do?businessId=" + businessId + "&keywordId=" + row.id + "&keyword=" + row.keyword);
}

// 搜索
function doSearch() {
    var roots_json = [];
    var root = $("#root").val();
    if (root != '') {
        var roots = root.split(',');
        $.each(roots, function (index, value) {
            if (value != '') {
                var id = root_map[value];
                var json = '{"id":"' + (id == undefined ? '-1' : id) + '","name":"' + value + '"}';
                roots_json.push(json);
            }
        });
        roots_json = '[' + roots_json + ']';
    }
    $("#roots").val(roots_json);

    var specials_json = [];
    var special = $("#special").val();
    if (special != '') {
        var specials = special.split(',');
        $.each(specials, function (index, value) {
            if (value != '') {
                var id = special_map[value];
                var json = '{"id":"' + (id == undefined ? -1 : id) + '","name":"' + value + '"}';
                specials_json.push(json);
            }
        });
        specials_json = '[' + specials_json + ']';
    }
    $("#specials").val(specials_json);

    s.search('keyword_table', 'searchForm');
};

// 转词表对话框
function keywordsToDictionaryDlg() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词转为词表吗？(最多5W个)', function (r) {
        if (r) {
            s.popAdd('add_dictionary_dlg', {title: '转词表'});
        }
    });
}

// 转词表
function keywordsToDictionary() {
    var filters = {};
    var array = $('#searchForm').serialize().split('&');
    for (var i = 0; i < array.length; i++) {
        var entry = array[i].split('=');
        if (entry.length > 1) {
            filters[entry[0]] = decodeURIComponent(entry[1]);
        }
    }

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

    var validator = $('#add_dictionary_form').form('validate');
    if (validator) {
        $('#add_dictionary_dlg').dialog('close');
        $("#keyword_table").datagrid("loading");// 显示遮罩层
    } else {
        return;
    }

    $.post('../keyword/keywordsToDictionary.do', filters, function (data) {
        $("#keyword_table").datagrid("loaded");// 关闭遮罩层
        if (data && data.code == 1) {
            s.success(data.msg);
            return;
        }
        s.error("没有数据需要转成词表");
    }, 'json');
}

// 取消
function cancelKeywordsToDictionaryDlg() {
    s.closeDialog('add_dictionary_dlg');
};

// 修改关键词特征对话框
function updateKeywordSepcialDlg() {
    var row = $('#keyword_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('update_keyword_special_dlg', {title: '修改特征'});
    $('#update_keyword_special_id').val(row.id);
    $('#update_keyword_special_businessId').val(row.businessId);
    $('#update_keyword_special_keyword').val(row.keyword);
    $('#update_keyword_special_name').html(row.keyword);

    var arr = [];
    special_map = {};
    update = 0;
    $.each(row.specialList, function (index, special) {
        arr.push(special.name);
        special_map[special.name] = special.id;
    });
    arr.join(',');
    $('#update_keyword_special_label').val(arr.toString());
}

// 取消
function cancelKeywordSepcialDlg() {
    s.closeDialog('update_keyword_special_dlg');
};

// 修改关键词特征
function updateKeywordSepcial() {
    var specials_json = [];
    if (update == 1) {
        var special = $("#update_keyword_special_label").val();
        if (special != '') {
            var specials = special.split(',');
            $.each(specials, function (index, value) {
                if (value != '') {
                    var id = special_map[value];
                    var json = '{"id":"' + (id == undefined ? '-1' : id) + '","name":"' + value + '"}';
                    specials_json.push(json);
                }
            });
            specials_json = '[' + specials_json + ']';
        } else {
            $('#uupdate_keyword_special_operate').val(1);// 清空特征
        }
    } else {// 没有改动
        cancelKeywordSepcialDlg();
        return;
    }
    $("#update_keyword_special_labels").val(specials_json);

    s.postSubmit('keyword_table', 'update_keyword_special_dlg', '../keyword/updateKeywordSepcial.do');
}

// 修改关键词词根对话框
function updateKeywordRootDlg() {
    var row = $('#keyword_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('update_keyword_root_dlg', {title: '修改词根'});
    $('#update_keyword_root_id').val(row.id);
    $('#update_keyword_root_businessId').val(row.businessId);
    $('#update_keyword_root_keyword').val(row.keyword);
    $('#update_keyword_root_name').html(row.keyword);

    var arr = [];
    root_map = {};
    update = 0;
    $.each(row.rootList, function (index, root) {
        arr.push(root.name);
        root_map[root.name] = root.id;
    });
    arr.join(',');
    $('#update_keyword_root_label').val(arr.toString());
}

// 取消
function cancelKeywordRootDlg() {
    s.closeDialog('update_keyword_root_dlg');
};

// 修改关键词特征
function updateKeywordRoot() {
    var roots_json = [];
    if (update == 1) {
        var root = $("#update_keyword_root_label").val();
        if (root != '') {
            var roots = root.split(',');
            $.each(roots, function (index, value) {
                if (value != '') {
                    var id = root_map[value];
                    var json = '{"id":"' + (id == undefined ? '-1' : id) + '","name":"' + value + '"}';
                    roots_json.push(json);
                }
            });
            roots_json = '[' + roots_json + ']';
        } else {
            $('#uupdate_keyword_root_operate').val(1);// 清空词根
        }
    } else {// 没有改动
        cancelKeywordRootDlg();
        return;
    }
    $("#update_keyword_root_labels").val(roots_json);

    s.postSubmit('keyword_table', 'update_keyword_root_dlg', '../keyword/updateKeywordRoot.do');
}