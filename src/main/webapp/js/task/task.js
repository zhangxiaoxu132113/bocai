var dictionarySearchType = [{id: 0, text: '词表'}, {id: 1, text: '词表ID'}];
var status_ = [{id: -3, text: '异常'}, {id: -2, text: '已取消'}, {id: -1, text: '全部'},
    {id: 0, text: '等待中'}, {id: 1, text: '爬取中'}, {id: 2, text: '完成'}];
var type = [{id: -1, text: '全部'}, {id: 1, text: '监控'}, {id: 2, text: '单次'}];
var t;

$(document).ready(function () {
    $("#dictionary_search_type").combobox({
        data: dictionarySearchType,
        onSelect: function (data) {
            if (data.id == 0) {
                $("#dictionary_name").textbox({prompt: '模糊'});
            } else if (data.id == 1) {
                $("#dictionary_name").textbox({prompt: '精确'});
            }
        }
    });
    $("#dictionary_search_type").combobox('setValue', 1);

    $("#status").combobox('loadData', status_);
    $("#status").combobox('setValue', -1);

    $("#type").combobox('loadData', type);
    $("#type").combobox('setValue', -1);

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
                    var queryParams = $('#task_table').datagrid('options').queryParams;
                    queryParams.businessId = business;
                    $('#task_table').datagrid('reload');

                    $('#businessId').val(business);
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [
        {field: 'id', title: 'id', align: 'center', width: '100', hidden: true},
        {field: 'dictionaryId', title: '词表ID', align: 'center', width: '100'},
        {
            field: 'type', title: '任务类型', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                var typeStr;
                $.each(type, function (index, t) {
                    if (t.id == value) {
                        typeStr = t.text;
                    }
                });
                return typeStr;
            }
        },
        {field: 'dictionaryName', title: '词表', align: 'center', width: '150'},
        {
            field: 'searchEngine', title: '搜索引擎', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {
            field: 'area', title: '地域', align: 'center', width: '150',
            formatter: function (value, rowData, index) {
                return value.name;
            }
        },
        {field: 'keywordNum', title: '词数', align: 'center', width: '100'},
        {
            field: 'status', title: '状态', align: 'center', width: '100',
            formatter: function (value, rowData, index) {
                var statusStr;
                $.each(status_, function (index, s) {
                    if (s.id == value) {
                        statusStr = s.text;
                    }
                });
                return statusStr;
            }
        },
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'},
        {field: 'lastFinishTime', title: '完成时间', align: 'center', width: '150'},
        {
            field: 'operation', title: '抓取结果', align: 'center', width: '100',
            formatter: function (value, rowData, rowIndex) {
                return '<a href="#" class="dictionary-task" onclick=addTab("任务记录","/task/record.do?fromType=1&taskId=' + rowData.id + '")>任务记录</a>';
            }
        }
    ];

    var queryParams = [];

    var business = $('#business').combobox('getValue');
    $('#businessId').val(business);
    queryParams = {
        businessId: business
    };

    s.datagrid('task_table', columns, {
        url: '../task/getTaskList.do',
        toolbar: "#top",
        queryParams: queryParams,
        singleSelect: false,
        onLoadSuccess: function (data) {
            $('.dictionary-task').linkbutton({text: '任务记录', iconCls: 'image-directory'});
        }
    });

});

// 搜索
function doSearch() {
    s.search('task_table', 'searchForm');
};

// 撤销任务对话框
function cancelTaskDlg() {
    var rows = $('#task_table').datagrid('getSelections');
    if (rows.length == 0) {
        s.showMessage('请选中需要操作的行');
        return;
    } else if (rows.length > 1) {
        s.showMessage('请选中需要操作的单行');
        return;
    }

    var row = rows[0];
    s.postConfirm('task_table', '确认取消爬取该任务吗？', '../task/cancelTask.do', {
        id: row.id,
        dictionaryId: row.dictionaryId
    });
}

// 批量下载最近一次的任务记录对话框
function downloadLastTastRecords() {
    var rows = $('#task_table').datagrid('getSelections');

    var ids = "";
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i].id + ",";
    }

    if (rows.length != 0) {
        $.messager.confirm('提示信息', '确认下载所选的最近一次任务记录吗？（将打包成zip）', function (r) {
            if (r) {
                $("#task_table").datagrid("loading");// 显示遮罩层
                $.post('../task/downloadLastTastRecords.do', {id: ids}, function (data) {
                    $("#task_table").datagrid("loaded");// 关闭遮罩层
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
    } else {
        s.showMessage('请选中需要操作的行');
    }
}

function getProxyListDlg() {
    s.popAdd('proxy_list_dlg', {title: '独享IP列表'});

    var columns = [
        {field: 'ip', title: 'IP', align: 'center', width: '100'},
        {field: 'port', title: '端口', align: 'center', width: '100'},
        {field: 'publicip', title: '公网IP', align: 'center', width: '100'},
        {field: 'area', title: '地区', align: 'center', width: '150'},
        {field: 'carrier', title: '运营商', align: 'center', width: '100'},
        {field: 'logdt', title: '更新时间', align: 'center', width: '150'}
    ];

   /* s.datagrid('queue_table', columns, {
        url: '../common/getProxyList.do',
        toolbar: "#queue_top"
    });*/

   $('#queue_table').datagrid({
        url: '../common/getProxyList.do',
        columns:[columns],
        toolbar: "#queue_top",
        loadMsg: "正在处理，请稍待...",
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        nowrap: true,
        pageSize: 10
    });
}

// 队列长度对话框
function queueLenDlg() {
    s.popAdd('queue_len_dlg', {title: '队列情况（30秒自动更新一次）', closable: false});
    queueLenReload();
    t = window.setInterval("queueLenReload()", 30000);
}

function closeQueueLenDlg() {
    window.clearInterval(t);
    s.closeDialog('queue_len_dlg');
}

function queueLenReload() {
    $.post('../common/getQueueLenList.do', {}, function (data) {
        if (data && data.code == 1) {
            $.each(data.rows, function (index, val) {
                if (val.baidu != undefined) {
                    $('#queue_len_baidu').html(val.baidu);
                } else if (val.wapbaidu != undefined) {
                    $('#queue_len_wapbaidu').html(val.wapbaidu);
                } else if (val.so != undefined) {
                    $('#queue_len_so').html(val.so);
                } else if (val.wapso != undefined) {
                    $('#queue_len_wapso').html(val.wapso);
                } else if (val.sogou != undefined) {
                    $('#queue_len_sogou').html(val.sogou);
                } else if (val.wapsogou != undefined) {
                    $('#queue_len_wapsogou').html(val.wapsogou);
                } else if (val.sm != undefined) {
                    $('#queue_len_sm').html(val.sm);
                } else if (val.bing != undefined) {
                    $('#queue_len_bing').html(val.bing);
                }
                else if (val.baidu_vip != undefined) {
                    $('#queue_len_baidu_vip').html(val.baidu_vip);
                } else if (val.wapbaidu_vip != undefined) {
                    $('#queue_len_wapbaidu_vip').html(val.wapbaidu_vip);
                } else if (val.so_vip != undefined) {
                    $('#queue_len_so_vip').html(val.so_vip);
                } else if (val.wapso_vip != undefined) {
                    $('#queue_len_wapso_vip').html(val.wapso_vip);
                } else if (val.sogou_vip != undefined) {
                    $('#queue_len_sogou_vip').html(val.sogou_vip);
                } else if (val.wapsogou_vip != undefined) {
                    $('#queue_len_wapsogou_vip').html(val.wapsogou_vip);
                } else if (val.sm_vip != undefined) {
                    $('#queue_len_sm_vip').html(val.sm_vip);
                } else if (val.bing_vip != undefined) {
                    $('#queue_len_bing_vip').html(val.bing_vip);
                }
                else if (val.ce_http_proxy_pool_len != undefined) {
                    $('#ce_http_proxy_pool_len').html(val.ce_http_proxy_pool_len);
                } else if (val.ce_https_proxy_pool_len != undefined) {
                    $('#ce_https_proxy_pool_len').html(val.ce_https_proxy_pool_len);
                } else if (val.ce_http_private_proxy_pool_len != undefined) {
                    $('#ce_http_private_proxy_pool_len').html(val.ce_http_private_proxy_pool_len);
                } else if (val.all_finish_task_id_len != undefined) {
                    $('#all_finish_task_id_len').html(val.all_finish_task_id_len);
                } else if (val.running_finish_task_count != undefined) {
                    $('#running_finish_task_count').html(val.running_finish_task_count);
                } else if (val.all_vip_finish_task_id_len != undefined) {
                    $('#all_vip_finish_task_id_len').html(val.all_vip_finish_task_id_len);
                }
                else if (val.all_click_keyword_count_baidu != undefined) {
                    $('#all_click_keyword_count_baidu').html(val.all_click_keyword_count_baidu);
                } else if (val.all_click_keyword_count_wapbaidu != undefined) {
                    $('#all_click_keyword_count_wapbaidu').html(val.all_click_keyword_count_wapbaidu);
                } else if (val.all_click_keyword_count_so != undefined) {
                    $('#all_click_keyword_count_so').html(val.all_click_keyword_count_so);
                } else if (val.all_click_keyword_count_wapso != undefined) {
                    $('#all_click_keyword_count_wapso').html(val.all_click_keyword_count_wapso);
                } else if (val.all_click_keyword_count_sogou != undefined) {
                    $('#all_click_keyword_count_sogou').html(val.all_click_keyword_count_sogou);
                } else if (val.all_click_keyword_count_wapsogou != undefined) {
                    $('#all_click_keyword_count_wapsogou').html(val.all_click_keyword_count_wapsogou);
                } else if (val.all_click_keyword_count_sm != undefined) {
                    $('#all_click_keyword_count_sm').html(val.all_click_keyword_count_sm);
                } else if (val.all_click_keyword_count_bing != undefined) {
                    $('#all_click_keyword_count_bing').html(val.all_click_keyword_count_bing);
                }
                else if (val.need_click_keyword_count_baidu != undefined) {
                    $('#need_click_keyword_count_baidu').html(val.need_click_keyword_count_baidu);
                } else if (val.need_click_keyword_count_wapbaidu != undefined) {
                    $('#need_click_keyword_count_wapbaidu').html(val.need_click_keyword_count_wapbaidu);
                } else if (val.need_click_keyword_count_so != undefined) {
                    $('#need_click_keyword_count_so').html(val.need_click_keyword_count_so);
                } else if (val.need_click_keyword_count_wapso != undefined) {
                    $('#need_click_keyword_count_wapso').html(val.need_click_keyword_count_wapso);
                } else if (val.need_click_keyword_count_sogou != undefined) {
                    $('#need_click_keyword_count_sogou').html(val.need_click_keyword_count_sogou);
                } else if (val.need_click_keyword_count_wapsogou != undefined) {
                    $('#need_click_keyword_count_wapsogou').html(val.need_click_keyword_count_wapsogou);
                } else if (val.need_click_keyword_count_sm != undefined) {
                    $('#need_click_keyword_count_sm').html(val.need_click_keyword_count_sm);
                } else if (val.need_click_keyword_count_bing != undefined) {
                    $('#need_click_keyword_count_bing').html(val.need_click_keyword_count_bing);
                } else if (val.count_submited_bdc != undefined) {
                    $('#count_submited_bdc').html(val.count_submited_bdc);
                } else if (val.surplus_bdc_queue_len != undefined) {
                    $('#surplus_bdc_queue_len').html(val.surplus_bdc_queue_len);
                } else if (val.count_submited_bdc_agg != undefined) {
                    $('#count_submited_bdc_agg').html(val.count_submited_bdc_agg);
                } else if (val.surplus_bdc_agg_queue_len != undefined) {
                    $('#surplus_bdc_agg_queue_len').html(val.surplus_bdc_agg_queue_len);
                }

            });
            return;
        }
    }, 'json');
}

