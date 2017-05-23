<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>搜索词库</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/seo/search.js"></script>
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

            if (old_value != '') {
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
                        if (comText == value) {
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

        $("#keyword").textbox({
            iconWidth: 50,
            onClickButton: function () {
                doSearch();
            }
        });
    });
    </script>
    <style>
        table.table-search td:nth-child(odd) {
            text-align: right;
        }

        table.table-search td:first-child {
            text-align: left;
        }

        table.table-search .search-col span:first-child {
            text-align: center;
            float: left;
        }

        table.table-search .search-col span:last-child {
            text-align: center;
            float: left;
            border-right: 0;
        }

        .keyword-text {
            font-style: normal;
            font-weight: bold;
        }
        .ui_group {
            margin-right: 1em;
        }
    </style>
</head>
<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm" method="post" enctype="multipart/form-data">
        <div class="search-div" style="overflow: auto; width: auto">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>搜索词：</label></td>
                    <td>
                        <input id="keyword" style="width: 120px" name="keyword" class="easyui-textbox" type="text"/>
                    </td>
                    <td><label>特征：</label></td>
                    <td>
                        <input id="type" name="types" class="easyui-combobox" valueField="type" textField="typeName"
                               placeholder="请选择"
                               panelHeight="auto" style="width:120px;" data-options="multiple:true"/>
                    </td>
                </tr>
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="secondBussiness" name="secondBussiness" class="easyui-combobox"
                               valueField="businessId"
                               textField="businessName"
                               panelHeight="120px" style="width:120px;"/>
                    </td>
                    <td><label>排名：</label></td>
                    <td class="search-col">
                        <input id="rankModules_rank" style="width: 70px" name="rankModules_rank" class="easyui-textbox"
                               type="text"/>
                        <input id="rankModules_rank_operator" name="rankModules_rank_operator"
                               class="easyui-combobox operator" valueField="operatorValue"
                               textField="operatorName"
                               panelHeight="auto" style="width:50px;text-align: center"/>

                    </td>
                    <td><label>7日累计PV：</label></td>
                    <td class="search-col">
                        <input id="sumPvFor7Day_pv" style="width: 70px" name="sumPvFor7Day_pv" class="easyui-textbox"
                               type="text"/>
                        <input id="sumPvFor7Day_pv_operator" name="sumPvFor7Day_pv_operator"
                               class="easyui-combobox operator" valueField="operatorValue"
                               textField="operatorName"
                               panelHeight="auto" style="width:50px;border-left: 0;text-align: center;"/>

                    </td>
                    <td><label>排名前20的39产品数：</label></td>
                    <td class="search-col">
                        <input id="top20For39Modules_num" style="width: 70px" name="top20For39Modules_num"
                               class="easyui-textbox" type="text"/>
                        <input id="top20For39Modules_num_operator" name="top20For39Modules_num_operator"
                               class="easyui-combobox operator" valueField="operatorValue"
                               textField="operatorName"
                               panelHeight="auto" style="width:50px;"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="8">
                        <span class="ui_group">
                            <label>首页百度产品数：</label>
                            <span class="search-col" style="display: inline-block;">
                                <input id="top10ForBaiduModules_num" style="width: 70px" name="top10ForBaiduModules_num"
                                       class="easyui-textbox" type="text"/>
                                <input id="top10ForBaiduModules_num_operator" name="top10ForBaiduModules_num_operator"
                                       class="easyui-combobox operator" valueField="operatorValue"
                                       textField="operatorName"
                                       panelHeight="auto" style="width:50px;"/>

                            </span>
                        </span>
                        <span class="ui_group">
                            <label>首页高权重站点数：</label>
                            <span class="search-col" style="display: inline-block;">
                                 <input id="top10ForWeight5Modules_num" style="width: 70px;" name="top10ForWeight5Modules_num"
                                        class="easyui-textbox" type="text"/>
                                <input id="top10ForWeight5Modules_num_operator" name="top10ForWeight5Modules_num_operator"
                                       class="easyui-combobox operator" valueField="operatorValue"
                                       textField="operatorName"
                                       panelHeight="auto" style="width:50px;text-align: center;"/>
                            </span>

                        </span>
                        <span class="ui_group">
                            <a class="button button-primary button-rounded button-tiny" style="margin-left: 0.5em;"
                               onclick="doSearch()">搜索</a>
                            <a class="button button-primary button-rounded button-tiny" style="margin-left: 0.5em;"
                               onclick="clearUpQueryParam()">清除</a>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="search_result" style="display: none">
            <div style="width:100%;margin:0px auto;padding:0px;border-width: 0 0 1px 0; border-style:dashed;
            border-color:#d9d9d9;overflow:hidden;"></div>
            <div class="search-div3" style="overflow: auto;">
                <table class="table-search" width="auto;">
                    <tr>
                        <td style="font-size: 12px">
                            在SEO搜索词库中<span id="kw_info_show" style="display: none">
                            包含“<span class="keyword-text"id="keyword_text"></span>”搜索词的</span>共计 <span id="keyword_result_count"></span> 条，耗时<span id="took"></span>秒
                        </td>
                        <td>
                            <a class="button button-primary button-rounded button-tiny"
                               onclick="keywordsToDictionaryDlg()">转词表</a>
                        </td>
                        <td>
                            <a class="button button-primary button-rounded button-tiny"
                               onclick="exportKeywordsToExcel()">导出Excel</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</div>
<!--result-->
<div id="center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>