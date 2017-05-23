var dictionarySearchType = [{id: 0, text: '词表'}, {id: 1, text: '词表ID'}];
var searchEngineType = [{id: -1, text: '全部'}, {id: 1, text: 'PC端'}, {id: 2, text: 'WAP端'}];
var searchEngineList = null;
var areaId = [{id: '-1', name: '全部'}];
var areaParentList = null;
var business;

$(document).ready(function () {
    $("#dictionary_search_type").combobox({
        data: dictionarySearchType,
        onSelect: function (data) {
            if (data.id == 0) {
                $("#name").textbox({prompt: '模糊'});
            } else if (data.id == 1) {
                $("#name").textbox({prompt: '精确'});
            }
        }
    });
    $("#dictionary_search_type").combobox('setValue', 1);

    $("#search_engine_type").combobox('loadData', searchEngineType);
    $("#search_engine_type").combobox('setValue', -1);

    $.ajax({
        url: "../common/getAreaList.do?needAll=1",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            areaParentList = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

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
                    business = $('#business').combobox('getValue');
                    var queryParams = $('#dictionary_table').datagrid('options').queryParams;
                    queryParams.businessId = business;
                    $('#dictionary_table').datagrid('reload');

                    $('#businessId').val(business);
                }
            });
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    var columns = [];

    var queryParams = [];

    business = $('#business').combobox('getValue');
    $('#businessId').val(business);
    queryParams = {
        businessId: business
    };

    getSearchEngineList();

    s.datagrid('dictionary_table', columns, {
        url: '../dictionary/getDictionaryList.do',
        toolbar: "#top",
        autoRowHeight: false,
        queryParams: queryParams,
        columns: [
            [
                {title: '词表', align: 'center', colspan: 3},
                {title: '分类', align: 'center', colspan: 1},
                {title: '数据', align: 'center', colspan: 6},
                {title: '备注', align: 'center', colspan: 1}
            ],
            [
                {field: 'id', title: '词表ID', align: 'center', width: '100'},
                {field: 'taskId', title: 'taskId', align: 'center', width: '100', hidden: true},
                {field: 'name', title: '词表', align: 'center', width: '150'},
                {
                    field: 'labelList', title: '分类标签', align: 'center', width: '200',
                    formatter: function (value, row, index) {
                        if (row.labelList && row.labelList.length && row.labelList.length > 0) {
                            var arr = [];
                            $.each(row.labelList, function (index, label) {
                                arr.push(label.name);
                            });
                            return arr.join('、');
                        }
                        return '-';
                    }
                },
                {field: 'keywordNum', title: '关键词数', align: 'center', width: '80'},
                {field: 'topNum', title: '首位数', align: 'center', width: '80'},
                {
                    field: 'topPer', title: '首位率', align: 'center', width: '80',
                    formatter: function (value, rowData, rowIndex) {
                        var rate = formatRate(value);
                        if (rate != null) {
                            var dictionaryId = rowData.id;
                            var dictionaryName = rowData.name;
                            return '<a href="#" style="text-decoration:none;" onclick=addTab("趋势分析","/task/chat.do?dictionaryId=' + dictionaryId + '&rankType=1&dictionaryName=' + dictionaryName + '")>' + rate + '</a>';
                        } else {
                            return rate;
                        }
                    }
                },
                {field: 'indexNum', title: '首页数', align: 'center', width: '80'},
                {
                    field: 'indexPer', title: '首页率', align: 'center', width: '80',
                    formatter: function (value, rowData, rowIndex) {
                        var rate = formatRate(value);
                        if (rate != null) {
                            var dictionaryId = rowData.id;
                            var dictionaryName = rowData.name;
                            return '<a href="#" style="text-decoration:none;" onclick=addTab("趋势分析","/task/chat.do?dictionaryId=' + dictionaryId + '&rankType=2&dictionaryName=' + dictionaryName + '")>' + rate + '</a>';
                        } else {
                            return rate;
                        }
                    }
                },
                /*{
                    field: 'naturalIndexPer', title: '自然首页率', align: 'center', width: '80',
                    formatter: function (value, rowData, rowIndex) {
                        var rate = formatRate(value);
                        if (rate != null) {
                            var dictionaryId = rowData.id;
                            var dictionaryName = rowData.name;
                            return '<a href="#" style="text-decoration:none;" onclick=addTab("趋势分析","/task/chat.do?dictionaryId=' + dictionaryId + '&rankType=3&dictionaryName=' + dictionaryName + '")>' + rate + '</a>';
                        } else {
                            return rate;
                        }
                    }
                },*/
                {field: 'lastFinishTime', title: '最后抓取时间', align: 'center', width: '100'},
                {
                    field: 'operation', title: '操作', align: 'center', width: '350',
                    formatter: function (value, rowData, rowIndex) {
                        var dictionaryId = rowData.id;
                        var dictionaryName = rowData.name;
                        var hasTask = rowData.hasTask;

                        var bt1 = '<a class="dictionary-edit" href="javascript:; onclick=updateDictionaryDlg();">编辑</a>';
                        var bt2 = '<a style="margin-left: 3px;" href="#" class="dictionary-keyword" onclick=addTab("关键词管理","/dictionary/keword.do?dictionaryId=' + dictionaryId + '&businessId=' + business + '&dictionaryName=' + dictionaryName + '")>关键词管理</a>';
                        if (hasTask) {
                            var bt3 = '<a style="margin-left: 3px;" class="dictionary-update-task" href="javascript:; onclick=updateTaskDlg();">修改任务</a>';
                        } else {
                            var bt3 = '<a style="margin-left: 3px;" class="dictionary-add-task"  href="javascript:; onclick=addTaskDlg();">建立任务</a>';
                        }
                        var bt4 = '<a style="margin-left: 3px;" href="#" class="dictionary-task-analysis" onclick=addTab("趋势分析","/task/chat.do?dictionaryId=' + dictionaryId + '&rankType=2&dictionaryName=' + dictionaryName + '")>趋势分析</a>';
                        return bt1 + bt2 + bt3 + bt4;

                    }
                }
            ]
        ],
        onDblClickCell: updateDictionaryDlg,
        onLoadSuccess: function (data) {
            $('.dictionary-edit').linkbutton({text: '编辑', iconCls: 'icon-edit'});
            $('.dictionary-keyword').linkbutton({text: '关键词管理', iconCls: 'icon-edit'});
            $('.dictionary-add-task').linkbutton({text: '建立任务', iconCls: 'icon-add'});
            $('.dictionary-update-task').linkbutton({text: '修改任务', iconCls: 'icon-edit'});
            $('.dictionary-task-analysis').linkbutton({text: '趋势分析', iconCls: 'image-chart'});
        }
    });

    $('#add_task_area_selected').click(function () {
        var bischecked = $('#add_task_area_selected').is(':checked');
        if (bischecked) {
            $('#add_task_areaParentId').combobox('enable');
            $('#add_task_areaId').combobox('enable');
        } else {
            $('#add_task_areaParentId').combobox('disable');
            $('#add_task_areaId').combobox('disable');
        }
    });
    
    $('#update_task_area_selected').click(function () {
        var bischecked = $('#update_task_area_selected').is(':checked');
        if (bischecked) {
            $('#update_task_areaParentId').combobox('enable');
            $('#update_task_areaId').combobox('enable');
        } else {
            $('#update_task_areaParentId').combobox('disable');
            $('#update_task_areaId').combobox('disable');
        }
    })
});

function getSearchEngineList(businessId) {
    $.ajax({
        url: "../common/getSearchEngineList.do?needAll=0",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            searchEngineList = data;
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 搜索
function doSearch() {
    var labels_json = [];
    var label = $("#label").val();
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
    }
    $("#labels").val(labels_json);

    s.search('dictionary_table', 'searchForm');
};

// 删除词表
function deleteDictionary() {
    var row = $('#dictionary_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.postConfirm('dictionary_table', '确认删除该词表吗？（同时删除依赖的任务）', '../dictionary/deleteDictionary.do', {id: row.id});
}

// 添加词表对话框
function addDictionaryDlg() {
    s.popAdd('add_dictionary_dlg', {title: '添加词表'});

    var business = $('#business').combobox('getValue');
    $('#add_dictionary_businessId').val(business);// 业务id
}

// 取消
function cancelSaveDictionary() {
    s.closeDialog('add_dictionary_dlg');
};

// 添加词表
function saveDictionary() {
    $("#add_dictionary_labels").val('');// 清空标签

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
        $("#add_dictionary_labels").val(labels_json);
    }

    s.postSubmit('dictionary_table', 'add_dictionary_dlg', '../dictionary/saveDictionary.do');
}

// 修改词表对话框
function updateDictionaryDlg() {
    var row = $('#dictionary_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('update_dictionary_dlg', {title: '修改词表'});

    $('#update_dictionary_form').form('load', row);

    $('#update_dictionary_id').val(row.id);

    var arr = [];
    label_map = {};
    update = 0;
    $.each(row.labelList, function (index, label) {
        arr.push(label.name);
        label_map[label.name] = label.id;
    });
    arr.join(',');
    $('#update_dictionary_label').val(arr.toString());
}

// 取消
function cancelUpdateDictionary() {
    s.closeDialog('update_dictionary_dlg');
};

// 修改词表
function updateDictionary() {
    var labels_json = [];
    if (update == 1) {
        var label = $("#update_dictionary_label").val();
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
        } else {
            $('#update_dictionary_dictionarySearchType').val(3);// 清空标签绑定
        }
    }
    $("#update_dictionary_labels").val(labels_json);

    s.postSubmit('dictionary_table', 'update_dictionary_dlg', '../dictionary/updateDictionary.do');
}

function setProxyCount(spanId, areaId) {
    $.ajax({
        url: "../common/getProxyCount.do?areaId=" + areaId,
        type: "post",
        cache: false,
        success: function (data, status) {
            $("#" + spanId).html(data);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 建立任务对话框
function addTaskDlg() {
    var row = $('#dictionary_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.popAdd('add_task_dlg', {title: '建立任务'});

    $('#add_task_dictionayId').val(row.id);
    $('#add_task_dictionary_name').html(row.name);
    $("#add_task_search_engine_id").combobox({
        data: searchEngineList
    });
    setProxyCount('add_task_proxy_count', '-1');
    $("#add_task_areaParentId").combobox({
        data: areaParentList,
        onSelect: function () {
            var parentId = $('#add_task_areaParentId').combobox('getValue');
            setProxyCount('add_task_proxy_count', parentId);
            if (parentId == '-1') {
                $("#add_task_areaId").combobox('loadData', areaId);
                $("#add_task_areaId").combobox('setValue', "-1");
            } else {
                $("#add_task_areaId").combobox({
                    url: "../common/getAreaList.do?needAll=1&parentId=" + parentId,
                    valueField: "id",
                    textField: "name",
                    onSelect: function (data) {
                        if (data.id != "-1") {
                            setProxyCount('add_task_proxy_count', data.id);
                        } else {
                            setProxyCount('add_task_proxy_count', parentId);
                        }
                    }
                });
            }
            $('#add_task_areaId').combobox('enable');
        }
    });

    $("#add_task_areaId").combobox('loadData', areaId);
    $("#add_task_areaId").combobox('setValue', "-1");
}

// 取消
function cancelSaveTask() {
    s.closeDialog('add_task_dlg');
};

// 建立任务
function saveTask() {
    s.postSubmit('dictionary_table', 'add_task_dlg', '../task/saveTask.do');
}

// 修改任务对话框
function updateTaskDlg() {
    var row = $('#dictionary_table').datagrid('getSelected');
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }

    s.popAdd('update_task_dlg', {title: '修改任务'});
    $('#update_task_id').val(row.taskId);
    $('#update_task_dictionayId').val(row.id);
    $('#update_task_dictionary_name').html(row.name);
    $("#update_task_search_engine_id").combobox({
        data: searchEngineList,
        onSelect: function () {
            s.showMessage('修改搜索引擎将新建新的任务');
        }
    });
    $("#update_task_areaParentId").combobox({
        data: areaParentList,
        onSelect: function () {
            var parentId = $('#update_task_areaParentId').combobox('getValue');
            setProxyCount('update_task_proxy_count', parentId);
            if (parentId == '-1') {
                $("#update_task_areaId").combobox('loadData', areaId);
                $("#update_task_areaId").combobox('setValue', "-1");
            } else {
                $("#update_task_areaId").combobox({
                    url: "../common/getAreaList.do?needAll=1&parentId=" + parentId,
                    valueField: "id",
                    textField: "name",
                    onLoadSuccess: function () {
                        $("#update_task_areaId").combobox('setValue', "-1");
                    },
                    onSelect: function (data) {
                        if (data.id != "-1") {
                            setProxyCount('update_task_proxy_count', data.id);
                        } else {
                            setProxyCount('update_task_proxy_count', parentId);
                        }
                    }
                });
            }
            $('#update_task_areaId').combobox('enable');
        }
    });

    $.ajax({
        url: "../task/getTask.do",
        type: "post",
        cache: false,
        data: {id: row.taskId},
        success: function (data, status) {
            if (data == null) return;
            var row = data.rows;

            $("#update_task_search_engine_id").combobox('setValue', row.searchEngineId);
            var type = row.type;

            var type_ridaolen = document.update_task_form.type.length;
            for (var i = 0; i < type_ridaolen; i++) {
                if (type == document.update_task_form.type[i].value) {
                    document.update_task_form.type[i].checked = true
                }
            }

            if (row.saveOriginalResult) {
                $("#update_task_save_original_result").attr("checked", true);
            } else {
                $("#update_task_save_original_result").removeAttr("checked");
            }

            if (row.areaParentId == undefined && row.areaId == undefined) {
                $("#update_task_areaParentId").combobox('setValue', "-1");

                setProxyCount('update_task_proxy_count', '-1');

                $("#update_task_areaId").combobox('loadData', areaId);
                $("#update_task_areaId").combobox('setValue', "-1");
            } else if (row.areaParentId != "-1" && row.areaId != "-1") {
                $("#update_task_area_selected").attr("checked", true);

                $("#update_task_areaParentId").combobox('setValue', row.areaParentId);

                setProxyCount('update_task_proxy_count', row.areaId);

                $("#update_task_areaId").combobox({
                    url: "../common/getAreaList.do?needAll=1&parentId=" + row.areaParentId,
                    valueField: "id",
                    textField: "name",
                    onLoadSuccess: function () {
                        $("#update_task_areaId").combobox('setValue', row.areaId);
                    }
                });
            } else if (row.areaParentId != "-1" && row.areaId == "-1") {
                $("#update_task_area_selected").attr("checked", true);

                $("#update_task_areaParentId").combobox('setValue', row.areaParentId);

                setProxyCount('update_task_proxy_count', row.areaParentId);

                $("#update_task_areaId").combobox({
                    url: "../common/getAreaList.do?needAll=1&parentId=" + row.areaParentId,
                    valueField: "id",
                    textField: "name",
                    onLoadSuccess: function () {
                        $("#update_task_areaId").combobox('setValue', row.areaId);
                    }
                });
            }
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

// 取消
function cancelUpdateTask() {
    s.closeDialog('update_task_dlg');
};

// 修改任务
function updateTask() {
    s.postSubmit('dictionary_table', 'update_task_dlg', '../task/updateTask.do');
}