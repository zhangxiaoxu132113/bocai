<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词拓展搜索</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/tools/search.js"></script>
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
    });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1250px">
            <table class="table-search" width="auto;">
                <tr>
                    <td>
                        <textarea id="base_keyword" class="easyui-validatebox" name="baseKeyword" rows="10" cols="25"
                                  placeholder="基础词（一行一个）。eg：&#10;感冒&#10;发烧"></textarea>
                    </td>
                    <td>
                        +
                    </td>
                    <td>
                        <textarea id="keyword" class="easyui-validatebox" name="keyword" rows="10" cols="25"
                                  placeholder="拓展方向词（一行一个）。eg：&#10;怎么办&#10;吃什么"></textarea>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">拓展搜索</a><br/><br/>
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="keywordsToDictionaryDlg()">转词表</a><br/><br/>
                        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportKeywordsToExcel()">导出Excel</a>
                    </td>
                </tr>
                <tr>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>