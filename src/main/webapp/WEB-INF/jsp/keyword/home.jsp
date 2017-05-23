<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/keyword/keyword.js"></script>
    <script type="text/javascript">//标签联想
    var label_map = {};//存储标签id和标签名
    var special_map = {};//存储特征id和标签名
    var root_map = {};//存储词根id和标签名
    var label_id_list = [];
    var label_name_list = [];
    var type_ = 0;
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

            var url;
            if (type_ == 0) {
                url = "../keyword/getSpecialList.do";
            } else if (type_ == 1) {
                url = "../root/getRootListForAuto.do";
            } else if (type_ == 2) {
                url = "../label/getLabelsByConditions.do";
            }

            if(old_value != ''){
                $.ajax({
                    url: url,
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
                            if (type_ == 0) {
                                special_map[value] = label_id_list[index];
                            } else if (type_ == 1) {
                                root_map[value] = label_id_list[index];
                            } else if (type_ == 2) {
                                label_map[value] = label_id_list[index];
                            }
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
        old_value = $("#special").val();
        $("#special").keyup(function () {
            type_ = 0;
            AutoComplete("auto_div", "special");
        });

        old_value = $("#root").val();
        $("#root").keyup(function () {
            type_ = 1;
            AutoComplete("auto_div_root", "root");
        });

        old_value = $("#add_dictionary_label").val();
        $("#add_dictionary_label").keyup(function () {
            type_ = 2;
            AutoComplete("add_dictionary_auto_div", "add_dictionary_label");
        });

        old_value = $("#update_keyword_special_label").val();
        $("#update_keyword_special_label").keyup(function () {
            type_ = 0;
            update = 1;// 有改动
            AutoComplete("update_keyword_special_auto_div", "update_keyword_special_label");
        });

        old_value = $("#update_keyword_root_label").val();
        $("#update_keyword_root_label").keyup(function () {
            type_ = 1;
            update = 1;// 有改动
            AutoComplete("update_keyword_root_auto_div", "update_keyword_root_label");
        });

        $('#keyword_title').tooltip({
            position: 'bottom',
            content: keyword_tooltip_content
        });
    });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1000px">
            <input type="hidden" id="businessId" name="businessId"/>
            <input type="hidden" id="specials" name="specials"/>
            <input type="hidden" id="roots" name="roots"/>
            <input type="hidden" id="custom" name="custom" value="0"/>
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName" panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>二级业务：</label></td>
                    <td>
                        <input id="second_business" name="secondBusinessId" class="easyui-combobox" valueField="businessId" textField="businessName" panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>搜索引擎：</label></td>
                    <td>
                        <input id="search_engine_id" name="searchEngineId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <input id="dictionary_search_type" name="dictionarySearchType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <input style="width: 100px" id="dictionaryName" name="dictionaryName" class="easyui-textbox" type="text" prompt="精确"/>
                    </td>
                    <td>
                        <label>关键词：</label>
                    </td>
                    <td id="keyword_title">
                        <input style="width: 100px" id="keyword" name="keyword" class="easyui-textbox" type="text" placeholder="模糊匹配"/>
                    </td>
                </tr>
            </table>
            <table class="table-search" width="auto;">
                <tr>
                    <td>
                        <label>特征：</label>
                    </td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="special" name="special" type="text" autocomplete="off"/>
                        <div class="auto-div" id="auto_div" />
                    </td>
                    <td>
                        <label>词根：</label>
                    </td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="root" name="root" type="text" autocomplete="off"/>
                        <div class="auto-div" id="auto_div_root" />
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="updateKeywordRootDlg()">编辑词根</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="updateKeywordSepcialDlg()">编辑特征</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="keywordsToDictionaryDlg()">转词表</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="keyword_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="keyword_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>