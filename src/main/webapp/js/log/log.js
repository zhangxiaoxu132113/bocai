$(document).ready(function () {
    initIndexTime();

    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'objectId', title: 'objectId', align: 'center', hidden: true},
        {field: 'objectType', title: 'objectType', align: 'center', hidden: true},
        {field: 'businessId', title: 'taskId', align: 'center', hidden: true},
        {field: 'userName', title: '用户名', align: 'center', width: '150'},
        {field: 'businessName', title: '业务', align: 'center', width: '150'},
        {
            field: 'operationType', title: '操作类型', align: 'center', width: '100',
            formatter: function (row, index) {
                return formatOperationType(row);
            }
        },
        {field: 'description', title: '操作描述', align: 'center', width: '250'},
        {field: 'createTime', title: '创建时间', align: 'center', width: '150'}
    ];

    var queryParams = [];

    queryParams = {
        "startDate": $("#startDate").datebox('getValue'),
        "endDate": $("#endDate").datebox('getValue')
    };

    s.datagrid('ldg', columns, {
        url: '../log/getLogList.do',
        toolbar: "#top",
        queryParams: queryParams
    });

});

// 搜索
function doSearch() {
    s.search('ldg', 'searchForm');
};

/**
 * 初始化时间
 *
 * */
function initIndexTime() {
    s.initRangeDateBeforeDays("endDate", 0);
    s.initRangeDateBeforeDays("startDate", 7);
};

function formatOperationType(value) {
    var temp;
    if (value == "1") {
        temp = "增加";
    } else if (value == "2") {
        temp = "删除";
    } else if (value == "3") {
        temp = "修改";
    }

    return temp;
}