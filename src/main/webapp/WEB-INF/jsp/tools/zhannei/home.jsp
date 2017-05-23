<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/tools/zhannei.js"></script>
    <script type="text/javascript">
        $(function(){
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });

            $("#add_task_dictionary_id").textbox({
                onClickButton: function () {
                    checkDictionary();
                }
            });

            var task_compare_tooltip_content = '<table>';
            task_compare_tooltip_content += '<tr><td>如果选择是，爬取数量将成倍增长，具体数量：关键词数x竞争对手数量</td></tr>';
            task_compare_tooltip_content += '</table>';
            $('#add_task_compare_tip').tooltip({
                position: 'bottom',
                content: task_compare_tooltip_content
            });
        });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="businessId" name="businessId"/>
        <div class="search-div" style="overflow: auto; width: 1150px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <input id="dictionary_search_type" name="dictionarySearchType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td id="keyword_title">
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" placeholder="精确"/>
                    </td>
                    <td>
                        <label>执行状态：</label>
                    </td>
                    <td>
                        <input id="task_status" name="status" class="easyui-combobox" valueField="id"
                               textField="text" panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch(0)">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="addTaskDlg()">新增</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="deleteTask()">删除</a>
                    </td>
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