var business;
var keyword;
var firstTime = 0;
var searchType; //0-单个词查询 1-批量查询 2-组合
$(document).ready(function () {
    var queryParams = {};
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'keyword', title: '关键词', align: 'center', width: '180'},
        {field: 'pv', title: '百度指数', align: 'center', width: '120'},
        {field: 'sumPv', title: '7日累计整站PV', align: 'center', width: '120'},
        {field: 'optimalRankingFor39', title: '业务最优排名', align: 'center', width: '120'},
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

    $.ajax({ //获取所有业务
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            business = data;
            $("#business").combobox({data: business});


        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    s.datagrid('table', columns, {
        url: '../seo/getExpandKeywords.do',
        toolbar: "#top",
        pageList: [100, 500, 1000],
        pageSize: 100,
        queryParams: queryParams,
        onLoadSuccess: function (data) {
            if (firstTime != 0) {
                $('#keyword_result_count').html(data.total);
                $('#keyword_text').html($("#keyword").val());
                $('#search_result').css('display', 'block');

                $('#took').html(data.took / 1000);
                if (keyword != undefined && keyword != '') {
                    $('#kw_info_show').css('display','inline-block');
                } else {
                    $('#kw_info_show').css('display','none');
                }
            }
        }
    });
});

// 搜索
function doSearch() {
    keyword = $('#keyword').textbox('getValue');
    if (keyword == undefined || keyword == '') {
        s.error('请输入搜索词');
        return false;
    }
    searchType = 0;
    firstTime = 1;
    s.search('table', 'searchForm');
}


// 批量挖掘
function batchExcavateDlg() {
    s.popAdd('batch_excavate_dlg', {title: '批量挖词'});

}

function batchExcavate() {
    var keywords = $('#add_task_keyword').val();
    if (keywords == "") {
        s.error("请输入关键词");
        return;
    }
    firstTime = 1;
    searchType = 1;
    keyword = "";
    s.closeDialog('batch_excavate_dlg');
    s.search('table', 'batch_excavate_form');
}

function cancelbatchExcavate() {
    s.closeDialog('batch_excavate_dlg');
}

// 組合挖掘
function groupExcavateDlg() {
    s.popAdd('group_excavate_dlg', {title: '組合挖掘'});
}

function groupExcavate() {
    var baseKeyword = $('#base_keyword').val();
    var expandKeyword = $('#expandKeyword').val();
    if (baseKeyword == undefined || baseKeyword == '') {
        s.error("请输入基础词");
        return;
    }

    if (expandKeyword == undefined || expandKeyword == '') {
        s.error("请输入扩展方向词");
        return;
    }
    keyword = "";
    searchType = 2;
    firstTime = 1;
    s.closeDialog('group_excavate_dlg');
    s.search('table', 'group_excavate_form');
}

function cancelGroupExcavate() {
    s.closeDialog('group_excavate_dlg');
}

//打开高级搜索页面
function openAdvanceQueryPage() {
    var url = "../seo/search.do";
    var title = "搜索词多维查询";
    var icon = "icon-ok";
    s.openTabs(title, url, icon);
}

// 转词表对话框
function keywordsToDictionaryDlg() {
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词转为词表吗？(最多5W个)', function (r) {
        if (r) {
            s.popAdd('add_dictionary_dlg', {title: '转词表'});

            $("#business").combobox({data: business});
        }
    });
}

// 取消
function cancelKeywordsToDictionaryDlg() {
    s.closeDialog('add_dictionary_dlg');
};

// 转词表
function keywordsToDictionary() {
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

    var name = $("#add_dictionary_name").textbox('getValue');
    filters['dictionaryName'] = decodeURIComponent(name);

    var name = $("#keyword").textbox('getValue');
    filters['keyword'] = decodeURIComponent(name);

    var businessId = $('#business').combobox('getValue');//业务
    filters['bindBussinessId'] = decodeURIComponent(businessId);

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
    var kw="";
    var exkw="";
    if (searchType == 0) {
        kw = $('#keyword').textbox('getValue');
    } else if (searchType == 1) {
        kw = $('#add_task_keyword').val();
    } else if (searchType == 2) {
        kw = $('#base_keyword').val();
        exkw = $('#expandKeyword').val();
    }
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词导出到Excel吗？(最多导出5W条)', function (r) {
        if (r) {
            var keyword = $("#keyword").val();
            $("#table").datagrid("loading");// 显示遮罩层
            $.post('../seo/exportKeywordByExcavate.do', {"keyword":kw,"expandKeyword":exkw}, function (data) {
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