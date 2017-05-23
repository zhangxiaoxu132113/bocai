var operate_ = [{id: 1, text: '>'}, {id: 2, text: '>='}, {id: 3, text: '='}, {id: 4, text: '<='}, {id: 5, text: '<'}];
var colNames;
var dictionarySearchType = [{id: 0, text: '词表'}, {id: 1, text: '词表ID'}];
var searchEngineId = [{id: -1, text: '请选择'}];
var business;

$(document).ready(function () {
    initIndexTime();

    $("#search_engine_id").combobox('loadData', searchEngineId);
    $("#search_engine_id").combobox('setValue', "-1");

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
                data: data,
                onSelect: function (data) {
                    $.ajax({
                        url: "../common/getSearchEngineList.do?needAll=0",
                        type: "post",
                        cache: false,
                        data: {secondBusinessId: data.businessId},
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

                    showOperateDiv();
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $('#custom').val('0');

    getLsit();
}

function getLsit() {
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

    var filters = s.getFilters('searchForm');

    var dataNum;
    var custom = $('#custom').val();
    if (custom == '1') {
        $.ajax({// 数据项表头
            url: "../header/getCheckHeaderJson.do?face=1&needAll=0&isView=0",
            type: "post",
            cache: false,
            async: false,
            data: filters,
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
    }

    cols.push(
        {field: 'uploadDate', title: '数据上传日期', align: 'center', width: '150'}
    );

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
    topCols.push(
        {title: '日期', align: 'center', colspan: 1}
    );

    var queryParams = [];
    queryParams = filters;

    s.datagrid('keyword_table', [], {
        url: '../keyword/getCustomKeywordsList.do',
        toolbar: "#top",
        autoRowHeight: false,
        queryParams: queryParams,
        columns: [
            topCols, cols
        ]
    });
}

// 检查输入参数
function checkOperation() {
    var secondBusiness = $('#second_business').combobox('getValue');//业务
    if (secondBusiness == undefined || secondBusiness == '' || secondBusiness == '-1') {
        s.error('请选择二级业务');
        return false;
    }
    var searchEngineId = $('#search_engine_id').combobox('getValue');//业务
    if (searchEngineId == undefined || searchEngineId == '' || searchEngineId == '-1') {
        s.error('请选择搜索引擎');
        return false;
    }

    var startDate = $("#startDate").datebox('getValue');
    if (startDate == undefined || startDate == '') {
        s.error('请选择开始日期');
        return false;
    }

    var endDate = $("#endDate").datebox('getValue');
    if (endDate == undefined || endDate == '') {
        s.error('请选择结束日期');
        return false;
    }

    if (new Date(endDate).getTime() > (new Date().getTime())) {
        s.error('结束日期不正确');
        return false;
    }

    var day = s.getDifferDays(startDate, endDate);
    if (day < 0) {
        s.error('结束日期必须大于开始日期');
        return false;
    }

    return true;
}

// 搜索
function doSearch() {
    if (!checkOperation()) {
        return false;
    }

    $('#custom').val('1');

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

    getLsit();
};

// 关键词列表导出
function exportKeywordsForChat() {
    if (!checkOperation()) {
        return false;
    }

    var exportCount = $("#exportCount").textbox('getText');
    if (exportCount == undefined || exportCount == '') {
        s.error('请选择查询导出条数');
        return false;
    }

    $.messager.confirm('提示信息', '确认导出该筛选条件下的所有关键词吗？', function (r) {
        if (r) {
            var filters = s.getFilters('searchForm');

            $.ajax({
                url: "../common/getProgress.do",
                type: "post",
                cache: false,
                data: {"type": -1},
                success: function (data, status) {
                    return data;
                },
                error: function () {
                },
                dataType: "json"
            });

            $("#keyword_table").datagrid("loading");// 显示遮罩层
            loadProgress();
            $.post('../keyword/exportKeywordsForChat.do', filters, function (data) {
                $("#keyword_table").datagrid("loaded");// 关闭遮罩层
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

function loadProgress() {
    var $add_progressbar = $('#add_progressbar');
    $add_progressbar.css("display", "inline-block");
    var value = $add_progressbar.progressbar('getValue');
    if (value < 100) {
        $.ajax({
            url: "../common/getProgress.do",
            type: "post",
            cache: false,
            data: {"type": 1},
            success: function (data, status) {
                if (data != null) {
                    $add_progressbar.progressbar('setValue', data);
                }
            },
            error: function () {
            },
            dataType: "json"
        });

        setTimeout(arguments.callee, 5000);
    } else {
        $add_progressbar.css("display", "none");
        $add_progressbar.progressbar('setValue', 0);
    }
}

function showOperateDiv() {
    var secondBusiness = $('#second_business').combobox('getValue');//业务
    if (secondBusiness == undefined || secondBusiness == '' || secondBusiness == '-1') {
        s.error('请选择二级业务');
        return false;
    }

    $('#table1').css('display', 'block');
    $.ajax({// 数据项表头
        url: "../header/getCheckHeaderIdJson.do?face=1&needAll=0&isView=0",
        type: "post",
        cache: false,
        async: false,
        data: {"businessId": business, "secondBusinessId": secondBusiness},
        success: function (data, status) {
            if (data == null) {
                return;
            }
            colNames = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
    addOperation();
}

var num = 1;
function addOperation() {
    var child = '<tr id="tr' + num + '">';
    child += '<td>';
    child += '<label>条件' + num + '：</label>';
    child += '</td>';
    child += '<td>';
    child += '<input id="colNames' + num + '" name="colNames" class="easyui-combobox" valueField="id" textField="name" panelHeight="auto" style="width:160px;" editable="false"/>';
    child += '</td>';
    child += '<td>';
    child += '<input id="colOperate' + num + '" name="colOperate" class="easyui-combobox" valueField="id" textField="text" panelHeight="auto" style="width:50px;" editable="false"/>';
    child += '</td>';
    child += '<td>';
    child += '<input style="width: 40px" id="colLimit' + num + '" name="colLimit" class="easyui-numberbox" type="text" placeholder="数值"/>';
    child += '</td>';
    child += '<td>';
    child += '<a no="' + num + '" id="colRemove' + num + '" onclick="delOperation(this)" title="删除" class="easyui-linkbutton" iconCls="image-remove"></a>';
    child += '</td>';
    child += '<td>';
    child += '<a no="' + num + '" id="colAdd' + num + '" onclick="addOperation()" title="增加" class="easyui-linkbutton" iconCls="image-add"></a>';
    child += '</td>';
    child += '</tr>';
    var childObj = $(child).appendTo('#table2');
    $.parser.parse(childObj);

    $("#colOperate" + num).combobox('loadData', operate_);
    $("#colOperate" + num).combobox('setValue', 1);

    $("#colNames" + num).combobox('loadData', colNames);

    num++;
}

//动态删除行
function delOperation(row) {
    var no = $("#" + row.id).attr('no');
    $("#tr" + no).remove();
}

function showTips() {
    s.popAdd('show_tips', {title: '帮助'});
};

/**
 * 初始化时间
 *
 * */
function initIndexTime() {
    s.initRangeDateBeforeDays("endDate", 2);
    s.initRangeDateBeforeDays("startDate", 9);
};