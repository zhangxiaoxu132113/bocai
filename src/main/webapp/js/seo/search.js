var firstTime = 0;
var characts = [{id: 1, name: "优质聚合 | 三甲视频"}, {id: 2, name: "优质聚合"}, {id: 3, name: "三甲视频"}];
var kwtypes;
var operators;
var colArr = [
    "rankModules_rank",
    "top20For39Modules_num",
    "top10ForBaiduModules_num",
    "top10ForWeight5Modules_num",
    "sumPvFor7Day_pv"
];
$(document).ready(function () {
    var queryParams = {};
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {
            field: 'keyword', title: '关键词', align: 'center', width: '180',
            formatter: function (value, rowData, index) {
                if (value == undefined || value == '') return "";
                return "<a  target='_blank' style='text-decoration:none;color:black' href='https://www.baidu.com/s?wd=" + value + "'>" + value + "<//a>";
            }
        },
        {field: 'pv', title: '百度指数', align: 'center', width: '100'},
        {field: 'sumPv', title: '7日累计整站PV', align: 'center', width: '100'},
        {field: 'optimalRankingFor39', title: '39全站最优排名', align: 'center', width: '100'},
        {
            field: 'optimalRankingUrl', title: '最优排名链接', align: 'center', width: '120',
            formatter: function (value, rowData, index) {
                if (value == undefined || value == '') return "";
                return "<a href='" + value + "'  target='_blank' style='text-decoration:none'> 链接 <//a>";
            }
        },
        {field: 'rankTop20Num', title: '排名前20的39产品数', align: 'center', width: '120'},
        {field: 'baiduProductNum', title: '首页百度产品数', align: 'center', width: '120'},
        {field: 'weightWebsiteNum', title: '首页高权重站点数', align: 'center', width: '120'},
        {field: 'typeName', title: '特征', align: 'center', width: '200'}
    ];

    $.ajax({// 二级业务
        url: "../business/getBusinessListJsonByLevel.do",
        type: "post",
        cache: false,
        async: false,
        data: {
            needAll: 0,
            type: 2
        },
        success: function (data, status) {
            if (data == null) return;
            data.unshift({
                'businessId': '39.net',
                'businessName': '全部'
            });
            $("#secondBussiness").combobox({data: data});
            $("#secondBussiness").combobox('setValue', '39.net');
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $.ajax({ //获取特征词类型
        url: "../seo/getQueryParam.do",
        type: "get",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            kwtypes = data.types;
            operators = data.opertors;
            $("#type").combobox({
                data: kwtypes,
                onSelect: function (obj) {
                    if (obj.type == -1) return;
                    var selectdObjs = $("#type").combobox("getValues");
                    for (var i = 0; i < selectdObjs.length; i++) {
                        if (selectdObjs[i] == -1) {
                            selectdObjs.splice($.inArray(selectdObjs[i], selectdObjs), 1);
                        }
                    }
                    $("#type").combobox("setValues", selectdObjs);
                },
                onChange: function () {
                    var selectdObjs = $('#type').combobox("getValues");
                    if (selectdObjs.length == 0) {
                        $("#type").combobox("setValue", -1);
                    }
                }
            });
            $(".operator").combobox({data: operators});
            $(".operator").combobox('setValue', "GT");
            $('#rankModules_rank_operator').combobox('setValue', 'LTE');
            $("#type").combobox('setValue', -1);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    s.datagrid('table', columns, {
        url: '../seo/searchKeyword.do',
        toolbar: "#top",
        pageList: [100, 500, 1000],
        pageSize: 100,
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            var took = data.took / 1000;
            if (firstTime != 0) {
                $('#keyword_result_count').html(data.total);
                $('#keyword_text').html($("#keyword").val());
                $('#search_result').css('display', 'block');
                $('#took').html(took);
                var keyword = $('#keyword').textbox('getValue');
                if (keyword != undefined && keyword != '') {
                    $('#kw_info_show').css('display', 'inline-block');
                } else {
                    $('#kw_info_show').css('display', 'none');
                }
            }
        }
    });
});

function loadLevelTwoBusiness(business) {
    if (business == undefined || business == "39.net") {
        $("#secondBussiness").combobox('disable');
        $("#secondBussiness").combobox('setValue', "");
        return;
    }
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
            $("#secondBussiness").combobox({data: data});
            $("#secondBussiness").combobox('enable');
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 搜索
function doSearch() {
    for (var i = 0; i < colArr.length; i++) {
        var flag = checkInput(colArr[i]);
        if (flag == -1) return;
    }
    firstTime = 1;
    s.search('table', 'searchForm');
}

function checkInput(id) {
    var reg = new RegExp("^[0-9]+.?[0-9]*$");
    var checkObj = $("#" + id).textbox('getValue');
    if (checkObj == "") return 1;
    if (!reg.test(checkObj)) {
        s.error('请输入数字,或者输入的值不能小于或等于0');
        $("#" + id).focus();
        return -1;
    }
    if (checkObj < 0) {
        s.error('输入的值不能小于或等于0');
        $("#" + id).focus();
        return -1;
    }
    return 1;
}
/**
 * 获取参数
 */
function getqueryParams() {
    var filters = {};

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

    var dictionaryName = $("#add_dictionary_name").textbox('getValue');
    filters['dictionaryName'] = decodeURIComponent(dictionaryName);

    var keyword = $("#keyword").textbox('getValue');
    filters['keyword'] = decodeURIComponent(keyword);

    var businessId = $('#secondBussiness').combobox('getValue');//查询的业务
    filters['secondBussiness'] = decodeURIComponent(businessId);

    var bindBussinessId = $('#business1').combobox('getValue');//转词表绑定业务
    filters['bindBussinessId'] = decodeURIComponent(bindBussinessId);

    for (var i = 0; i < colArr.length; i++) {
        var colName = colArr[i];
        var colValue = $("#" + colName).textbox('getValue');
        filters[colName] = decodeURIComponent(colValue);

        var operatorColName = colName + "_operator";
        var operatorColValue = $("#" + operatorColName).textbox('getValue');
        filters[operatorColName] = decodeURIComponent(operatorColValue);
    }

    var types = $('#type').combobox('getValue');
    if (types != undefined) filters['types'] = decodeURIComponent(types);

    return filters;
}

// 转词表对话框
function keywordsToDictionaryDlg() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词转为词表吗？(最多5W个)', function (r) {
        if (r) {
            s.popAdd('add_dictionary_dlg', {title: '转词表'});
            $.ajax({
                url: "../business/getBusinessListJson.do",
                type: "post",
                cache: false,
                async: false,
                data: {
                    needAll: 1
                },
                success: function (data, status) {
                    $("#business1").combobox({data: data});
                    $("#business1").combobox('setValue', -1);
                },
                error: function () {
                    return false;
                },
                dataType: "json"
            });
        }
    });
}

// 取消
function cancelKeywordsToDictionaryDlg() {
    s.closeDialog('add_dictionary_dlg');
}

// 转词表
function keywordsToDictionary() {
    var filters = getqueryParams();
    if (filters.bindBussinessId == undefined || filters.bindBussinessId == -1) {
        s.error("请选择业务！");
        return;
    }
    var validator = $('#add_dictionary_form').form('validate');
    if (validator) {
        $('#add_dictionary_dlg').dialog('close');
        $("#table").datagrid("loading");// 显示遮罩层
    } else {
        return;
    }
    $.post('../seo/keywordsToDictionary.do', filters, function (data) {
        $("#table").datagrid("loaded");// 关闭遮罩层
        if (data && data.code == 1) {
            s.success(data.msg);
            return;
        }
        s.error("没有数据需要转成词表");
    }, 'json');
}

// 关键词导出到excel
function exportKeywordsToExcel() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词导出到Excel吗？(最多导出5W条)', function (r) {
        if (r) {
            var keyword = $("#keyword").val();
            var filters = getqueryParams();
            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../seo/exportKeywords.do', filters, function (data) {
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

//查看聚合特征词列表
function getAggregateCharactWords() {
    s.popAdd('add_list_dlg', {title: '聚合特征词列表'});
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'keyword', title: '搜索词', align: 'left', width: '380'},
        {
            field: 'type', title: '搜索词特征', align: 'center', width: '300',
            formatter: function (value, rowData, index) {
                var name;
                $.each(characts, function (index, s) {
                    if (s.id == value) {
                        name = s.name;
                    }
                });
                return name;
            }
        }
    ];
    s.datagrid('aggregate_words_table', columns, {
        url: '../seo/getAggregateCharactWords.do',
        loadMsg: "正在处理，请稍待...",
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        nowrap: false,
        pageSize: 10,
        onLoadSuccess: function (data) {
            $('#youzhiTotal').text(data.youzhiTotal);
            $('#sanjiaTotal').text(data.sanjiaTotal);
            $('#countCompleteAggs').text(data.countCompleteAggs);
        }
    });
}

//将聚合特征词导出excel
function exportAggregateCharactWords() {
    $.messager.confirm('提示信息', '确认将聚合特征关键词导出到Excel吗？', function (r) {
        if (r) {
            s.closeDialog('add_list_dlg');
            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../seo/exportAggregateCharactWords.do', function (data) {
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

//关闭聚合特征词列表框
function closeAggregateCharactWordsListDlg() {
    s.closeDialog('add_list_dlg');
}

//清除查询参数
function clearUpQueryParam() {
    $('#keyword').textbox('setValue', '');
    $("#type").combobox("setValue", -1);
    $(".operator").combobox('setValue', "GT");
    $('#rankModules_rank_operator').combobox('setValue', 'LTE');
    $("#secondBussiness").combobox('setValue', '39.net');
    for (var i = 0; i < colArr.length; i++) {
        $('#' + colArr[i]).textbox('setValue', '');
    }
}