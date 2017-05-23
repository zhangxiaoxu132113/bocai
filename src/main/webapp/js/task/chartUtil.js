/**
 * 导出数据到excel
 */
function exportTaskRecordForChat() {
    if(dColumnData == undefined){
        s.alert('暂无数据');
        return false;
    }
    $.messager.confirm('提示信息', '确认导出该筛选条件下的所有数据吗？', function (r) {
        if (r) {
            var filters = {};
            var array = $('#searchForm').serialize().split('&');
            for (var i = 0; i < array.length; i++) {
                var entry = array[i].split('=');
                if (entry.length > 1) {
                    filters[entry[0]] = decodeURIComponent(entry[1]);
                }
            }

            filters['dColumns'] = JSON.stringify(dColumns);
            filters['dColumnData'] = JSON.stringify(dColumnData);

            $("#task_record_his_table").datagrid("loading");// 显示遮罩层
            $.post('../task/exportTaskRecordForChat.do', filters, function (data) {
                $("#task_record_his_table").datagrid("loaded");// 关闭遮罩层
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

/**
 * 初始化时间
 *
 * */
function initIndexTime() {
    s.initRangeDateBeforeDays("endDate", 0);
    s.initRangeDateBeforeDays("startDate", 15);
};