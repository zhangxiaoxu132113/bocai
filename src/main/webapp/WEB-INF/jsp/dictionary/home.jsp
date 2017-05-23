<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>词表管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/dictionary/dictionary.js"></script>
    <script type="text/javascript">//标签联想
        var label_map = {};//存储标签id和标签名
        var label_id_list = [];
        var label_name_list = [];
        var update = 0;
        var old_value = "";
        var highlightindex = -1;   //高亮
        //自动完成
        function AutoComplete(auto, search) {
            if ($("#" + search).val() != old_value) {
                label_id_list = [];
                label_name_list = [];

                var autoNode = $("#" + auto);   //缓存对象（弹出框）
                var carlist = new Array();
                var n = 0;
                old_value = $("#" + search).val();
                var v = "";
                if (old_value.indexOf(',') > -1) {
                    v = old_value;
                    v = v.substring(0, old_value.lastIndexOf(',') + 1);
                    old_value = old_value.substr(old_value.lastIndexOf(',') + 1);
                }

                if(old_value != ''){
                    $.ajax({
                        url: "../label/getLabelsByConditions.do",
                        type: "post",
                        data: {'name': old_value},
                        cache: false,
                        async: false,
                        success: function (data, status) {
                            if (data.code == '1') {
                                $.each(data.rows, function (index, label) {
                                    label_id_list.push(label.id);
                                    label_name_list.push(label.name);
                                });
                            }
                        },
                        error: function () {
                        },
                        dataType: "json"
                    });
                }

                for (i in label_name_list) {
                    if (label_name_list[i].indexOf(old_value) >= 0) {
                        carlist[n++] = label_name_list[i];
                    }
                }
                if (carlist.length == 0) {
                    autoNode.hide();
                    return;
                }
                autoNode.empty();  //清空上次的记录
                for (i in carlist) {
                    var wordNode = carlist[i];   //弹出框里的每一条内容
                    var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
                    newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");
                    newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框
                    //鼠标移入高亮，移开不高亮
                    newDivNode.mouseover(function () {
                        if (highlightindex != -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
                            autoNode.children("div").eq(highlightindex).css("background-color", "white");
                        }
                        //记录新的高亮节点索引
                        highlightindex = $(this).attr("id");
                        $(this).css("background-color", "#ebebeb");
                    });
                    newDivNode.mouseout(function () {
                        $(this).css("background-color", "white");
                    });
                    //鼠标点击文字上屏
                    newDivNode.click(function () {
                        //取出高亮节点的文本内容
                        var comText = autoNode.hide().children("div").eq(highlightindex).text();
                        highlightindex = -1;
                        //文本框中的内容变成高亮节点的内容
                        $("#" + search).val(v + comText + ',');

                        $.each(label_name_list, function (index, value) {
                            if (comText == value){
                                label_map[value] = label_id_list[index];
                            }
                        });

                    })
                    if (carlist.length > 0) {    //如果返回值有内容就显示出来
                        autoNode.show();
                    } else {               //服务器端无内容返回 那么隐藏弹出框
                        autoNode.hide();
                        //弹出框隐藏的同时，高亮节点索引值也变成-1
                        highlightindex = -1;
                    }
                }
            }
            //点击页面隐藏自动补全提示框
            document.onclick = function (e) {
                var e = e ? e : window.event;
                var tar = e.srcElement || e.target;
                if (tar.id != search) {
                    if ($("#" + auto).is(":visible")) {
                        $("#" + auto).css("display", "none")
                    }
                }
            }
        }
        $(function () {
            old_value = $("#add_dictionary_label").val();
            $("#add_dictionary_label").keyup(function () {
                AutoComplete("add_dictionary_auto_div", "add_dictionary_label");
            });

            old_value = $("#update_dictionary_label").val();
            $("#update_dictionary_label").keyup(function () {
                update = 1;// 修改过标签
                AutoComplete("update_dictionary_auto_div", "update_dictionary_label");
            });

            old_value = $("#label").val();
            $("#label").keyup(function () {
                update = 1;// 修改过标签
                AutoComplete("auto_div", "label");
            });
        });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="businessId" name="businessId"/>
        <input type="hidden" id="labels" name="labels"/>
        <div class="search-div" style="overflow: auto; width: 700px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>搜索引擎类型：</label></td>
                    <td>
                        <input id="search_engine_type" name="searchEngineType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <input id="dictionary_search_type" name="dictionarySearchType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" prompt="精确"/>
                    </td>
                </tr>
            </table>
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>分类标签：</label></td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="label" name="label" type="text" autocomplete="off"/>
                        <div class="auto-div" id="auto_div" />
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="addDictionaryDlg()">添加词表</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-remove" onclick="deleteDictionary()">删除词表</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="dictionary_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="dictionary_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>