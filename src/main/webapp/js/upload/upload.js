var type = [{id: '0', type: 'zip上传(csv,xls,xlsx)'},{id: '1', type: 'excel上传(xls,xlsx)'}];
var getBusinessJson;
$(document).ready(function () {

    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'userId', title: 'userId', align: 'center', hidden: true},
        {field: 'businessId', title: 'businessId', align: 'center', hidden: true},
        {field: 'userName', title: '用户名', align: 'center', width: '100'},
        {field: 'businessName', title: '业务', align: 'center', width: '100'},
        {
            field: 'uploadType', title: '上传类型', align: 'center', width: '150',
            formatter: function (row, index) {
                return formatOperationType(row);
            }
        },
        {field: 'fileName', title: '文件名', align: 'center', width: '250'},
        {field: 'description', title: '操作描述', align: 'center', width: '250'},
        {field: 'uploadTime', title: '上传时间', align: 'center', width: '150'}
    ];

    var queryParams = {
        "startDate": $("#startDate").datebox('getValue'),
        "endDate": $("#endDate").datebox('getValue')
    };

    s.datagrid('dg', columns, {
        url: '../upload/getUploadLogList.do',
        toolbar: "#top",
        queryParams: queryParams
    });

    initIndexTime();

    $.ajax({
        url: "../business/getBusinessListJson.do",
        type: "post",
        cache: false,
        async: false,
        success: function (data, status) {
            if (data == null) return;
            data.push({businessId: '-1', businessName: '---请选择业务---'});
            getBusinessJson = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
});


function uploadDlg(){
    s.popAdd('upload_add_dlg', {title: '报表上传'});

    $("#type").combobox('loadData', type);
    $("#type").combobox('setValue', "0");
    $("#businessId").combobox('loadData', getBusinessJson);
    $("#businessId").combobox('setValue', "-1");
}

function save() {
    var id = $("#businessId").combobox('getValue');
    if(id == -1){
        s.showMessage("请选择业务");
        return ;
    }

    $.ajax({
        url: "../common/getProgress.do",
        type: "post",
        cache: false,
        data: {"type": -2},
        success: function (data, status) {
            return data;
        },
        error: function () {
        },
        dataType: "json"
    });

    loadProgress();
    s.postSubmit('dg', 'upload_add_dlg', '../upload/save.do');
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
            data: {"type": 2},
            success: function (data, status) {
                if (data != null) {
                    $add_progressbar.progressbar('setValue', data);
                }
            },
            error: function () {
            },
            dataType: "json"
        });

        setTimeout(arguments.callee, 3000);
    } else {
        $add_progressbar.css("display", "none");
        $add_progressbar.progressbar('setValue', 0);
    }
}

function upKeyWordRemarkDlg(){
    s.popAdd('uploadKeyWord_add_dlg', {title: '关键词备注导入'});
    $("#business_id").combobox('loadData', getBusinessJson);
    $("#business_id").combobox('setValue', "-1");
}

function saveKeyWordRemark() {
    var id = $("#business_id").combobox('getValue');
    if(id == -1){
        s.showMessage("请选择业务");
        return ;
    }
    s.postSubmit('dg', 'uploadKeyWord_add_dlg', '../keyword/uploadRemark.do');
}

// 搜索
function doSearch() {
    s.search('dg', 'searchForm');
};

function downFile(path,name){
    window.location.href = "../upload/downFile.do?filePath="+path+"&fileName="+name;
}

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
        temp = "报表zip上传";
    } else if (value == "2") {
        temp = "excel单文件上传";
    } else if (value == "3") {
        temp = "excel多文件上传";
    } else if (value == "4") {
        temp = "关键词备注";
    }

    return temp;
}
