/**
 * Created by zhangmiaojie on 2016/11/11.
 */
var allSeoTagList = null;
var levelData = [{id: -1, name: '全部'}, {id: 1, name: '一级'}, {id: 2, name: '二级'}, {id: 3, name: '三级'}];
var exportSeoKeywordRow = 0;
$(document).ready(function () {
    //获取所有的词根标签
    $.ajax({
        url: "../seo/getSeoTagList.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            allSeoTagList = data.rows;
            var defaultData = {'id': '-1', 'name': '请选择'};
            allSeoTagList.splice(0, 0, defaultData);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
    //设置词根的数量
    $.ajax({
        url: "../seo/getSeoTagList.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            allSeoTagList = data.rows;
            var defaultData = {'id': '-1', 'name': '请选择'};
            allSeoTagList.splice(0, 0, defaultData);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });

    $("#level").combobox({data: levelData});
    $("#level").combobox('setValue', -1);
    var queryParams = {'level': 1};
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'name', title: '词根', align: 'left', width: '400'},
        {field: 'level', title: '等级', align: 'center', hidden: true},
        {field: 'tagName', title: '词根标签', align: 'center', width: '150'},
        {field: 'keywordNum', title: '搜索词数', align: 'center', width: '150'},
        {field: 'pv', title: '百度指数', align: 'center', width: '150'},
        {field: 'updateTime', title: '指数更新时间', align: 'center', width: '150'},
        {field: 'createTime', title: '词根创建时间', align: 'center', width: '150'}
    ];
    s.treegrid('table', columns, {
        url: '../seo/getSeoRootList.do',
        idField: 'id',
        treeField: 'name',
        parentField: 'parentId',
        initialState: "collapsed",
        queryParams: queryParams,
        columns: [columns],
        toolbar: "#top",
        autoRowHeight: true,
        singleSelect: false,
        fitColumns: true,
        animate: false,
        rownumbers: false,
        onDblClickRow: function (node) {
            exportSeoKeywordRow = node;
            getMatchingTerms(node);
        },
        onLoadSuccess: function (row, data) {
            setRootNum(row, data); //设置词根的数量
            if (data.rows.length != 0 && data.rows[0].level != 3) {
                collapseAll(data, false);
            }
        },
        onBeforeExpand: function (node) {
            loadChildrenNodeList(node);
        }
    });
});

// 搜索
function doSearch() {
    var level = $('#level').combobox('getValue');
    var name = $('#name').val();
    if (level == -1 && name == '') {
        $('#level').combobox('setValue', '1');
    }
    var filters = s.getFilters('searchForm');
    $('#table').treegrid('load', filters);
}

// 导入词根对话框
function saveSeoRootDlg() {
    s.popAdd('add_root_dlg', {title: '导入词根'});
    $("#seoTagList").combobox({
        data: allSeoTagList
    });
    $("#seoTagList").combobox("setValue", '-1');
}

// 导入词根
function saveSeoRoot() {
    var tagId = $("#seoTagList").combobox("getValue");
    s.postSubmit('table', 'add_root_dlg', '../seo/saveSeoRoot.do');
}

// 取消导入词根对话框
function cancelSaveSeoRoot() {
    s.closeDialog('add_root_dlg');
}

//导出词根
function exportSeoRoot() {
    $("#table").datagrid("loading");// 显示遮罩层
    $.post('../seo/exportSeoRoot.do', function (data) {
        if (data.result && data.result == 1) {
            $("#table").datagrid("loaded");// 关闭遮罩层
            // 开始下载
            window.open("../" + data.path, '_self');
            return;
        }
        // 没有找到excel
        $("#table").datagrid("loaded");// 关闭遮罩层
        s.error("没有数据需要导出");
    }, 'json');
}

//删除词根
function deleteSeoRoot() {
    var rows = getMutilSeleted();
    if (rows.length <= 0) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    var idArr = [];
    for (var i = 0; i < rows.length; i++) {
        idArr.push(rows[i].id);
    }
    postConfirm('table', '确认删除该词根吗？', '../seo/deleteSeoRoot.do', {ids: idArr});

}

//变更匹配标签
function changeRootTag() {
    var rows = getMutilSeleted();
    if (rows.length <= 0) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    var flag = false;
    $.each(rows, function (index, row) {
        if (row.level != 1) {
            s.showMessage('请选择一级标签');
            flag = true;
            return;
        }
    });
    if (flag) return;
    $.ajax({
        url: "../seo/getSeoTagList.do",
        type: "post",
        cache: false,
        success: function (data, status) {
            if (data == null) return;
            allSeoTagList = data.rows;
            var defaultData = {'id': '-1', 'name': '请选择'};
            allSeoTagList.splice(0, 0, defaultData);
            s.popAdd('modify_rootTag_dlg', {title: "变更匹配标签"});
            $("#seoTagList2").combobox({
                data: allSeoTagList
            });
            $("#seoTagList2").combobox("setValue", '-1');
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

//查看匹配搜索词
function getMatchingTerms(row) {
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    s.popAdd('keyword_list_dlg', {title: row.name + '--匹配搜索词列表'});
    var columns = [
        {field: 'id', title: 'id', align: 'center', hidden: true},
        {field: 'keyword', title: '搜索词', align: 'left', width: '380'},
        {field: 'pv', title: '指数', align: 'center', width: '300'}
    ];
    var queryParams = {'id': row.id};
    s.datagrid('queue_table', columns, {
        url: '../seo/getMatchedKeywords.do',
        queryParams: queryParams,
        loadMsg: "正在处理，请稍待...",
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        nowrap: false,
        pageSize: 10
    });
}

//导出匹配搜索词
function exportSeoKeyword() {
    var row = exportSeoKeywordRow;
    if (!row) {
        s.showMessage('请选中需要操作的行');
        return;
    }
    $.messager.confirm('提示信息', '确认将该筛选条件下的所有关键词导出到Excel吗？', function (r) {
        if (r) {
            $("#queue_table").datagrid("loading");// 显示遮罩层
            $.post('../seo/exportMatchedKeywords.do', {"id": row.id}, function (data) {
                $("#queue_table").datagrid("loaded");// 关闭遮罩层
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

var postConfirm = function (datagridId, msg, url, options) {
    $.messager.confirm('提示信息', msg, function (r) {
        if (r) {
            $('#table').treegrid('loading');
            $.post(url, options, function (result) {
                $('#table').treegrid('loaded');
                if (result.code == '1') {
                    s.success(result.msg);
                    //var row = $('#table').datagrid('getSelected');
                    var rows = getMutilSeleted();
                    $.each(rows, function (index, row) {
                        $('#table').treegrid('remove', row.id);
                    });
                } else {
                    s.error(result.msg);
                }
            }, 'json');
            return true;
        }
    });
}

// 更换匹配标签
var updateRootTag = function () {
    var tagId = $("#seoTagList2").combobox('getValue');
    if (tagId == -1) {
        s.error('请选择词根标签');
        return;
    }
    var rows = getMutilSeleted();
    var idArr = [];
    for (var i = 0; i < rows.length; i++) {
        idArr.push(rows[i].id);
        $('#table').treegrid('unselectRow', rows[i].id); //去除选中行的高亮显示
    }
    $('#ids').val(idArr);
    $('#tagId').val(tagId);
    s.postSubmit('table', 'modify_rootTag_dlg', '../seo/updateSeoRootTag.do');
}

// 取消更换匹配标签对话框
function cancelUpdateRootTag() {
    s.closeDialog('modify_rootTag_dlg');
}

// 关闭搜索词列表框
function closeKeywordListDlg() {
    s.closeDialog('keyword_list_dlg');
}

//根据父节点加载子节点
var loadChildrenNodeList = function (node) {
    //清除旧的数据
    if (node.level == 1 || node.level == 2) {
        if ($('#datagrid-row-r1-2-' + node.id).next().hasClass('treegrid-tr-tree')) {
            $('#datagrid-row-r1-2-' + node.id).next().remove();
        }
    }
    //获取新的数据
    $.ajax({
        url: "../seo/getSeoRootList.do?id=" + node.id,
        type: "post",
        cache: false,
        success: function (data, status) {
            if (node.level == 2) { // 点击二级节点的时候，删除三级节点的children属性
                setData(data.rows);
            }
            $('#table').treegrid('append', {
                parent: node.id,
                data: data.rows
            });
            collapseAll(data, true);
        },
        error: function () {
            return false;
        },
        dataType: "json"
    });
}

//关闭所有的节点
function collapseAll(data, lazyLoad) {
    var list = data.rows;
    if (list.length != 0) {
        if (list[0].level == 1 || (list[0].level == 2 && lazyLoad)) {
            $.each(list, function (i, val) {
                if (list[i].id != null) {
                    $('#table').treegrid('collapseAll', list[i].id);
                }
            });
        }
    }
}

function setData(list) {
    $.each(list, function (index, row) {
        delete row.children;
    });
}

function setRootNum(row, data) {
    if (data.levelNum != undefined && data.levelNum.length != 0) {
        if (data.levelNum.length == 3) {
            $('#levelOneNum').text(data.levelNum[0]);
            $('#levelOneNumPanel').css('display', 'inline-block');
            $('#levelTwoNum').text(data.levelNum[1]);
            $('#levelTwoNumPanel').css('display', 'inline-block');
            $('#levelThreeNum').text(data.levelNum[2]);
            $('#levelThreeNumPanel').css('display', 'inline-block');
            $('#rootName').css('display', 'none');
        } else if (data.levelNum.length == 2) {
            $('#rootName').css('display', 'inline-block');
            $('#rootName').text(row.name);
            $('#levelOneNumPanel').css('display', 'none');
            $('#levelTwoNum').text(data.levelNum[0]);
            $('#levelTwoNumPanel').css('display', 'inline-block');
            $('#levelThreeNum').text(data.levelNum[1]);
            $('#levelThreeNumPanel').css('display', 'inline-block');
        } else if (data.levelNum.length == 1) {
            $('#rootName').css('display', 'inline-block');
            $('#rootName').text(row.name);
            $('#levelOneNumPanel').css('display', 'none');
            $('#levelTwoNumPanel').css('display', 'none');
            $('#levelThreeNum').text(data.levelNum[0]);
        }
    }
}

function getMutilSeleted() {
    var arr = [];
    var rows = $('#table').treegrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        arr.push(rows[i]);
        console.log(rows[i]);
    }
    return arr;
}

function manageRootTag() {
    var title = "多级词根标签";
    var url = "../seo/tag.do";
    var icon = "icon-ok";
    s.openTabs(title, url, icon);
}
