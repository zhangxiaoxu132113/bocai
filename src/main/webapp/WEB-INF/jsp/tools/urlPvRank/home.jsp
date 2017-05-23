<%--
  Created by IntelliJ IDEA.
  User: zhangmiaojie
  Date: 2016/11/11
  Time: 16:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/tools/urlRankPv.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });

            var task_name_tooltip_content = '<table>';
            task_name_tooltip_content += '<tr><td>查询以日期为准，下拉框只为方便选择</td></tr>';
            task_name_tooltip_content += '</table>';
            $('#add_task_name_tip').tooltip({
                position: 'bottom',
                content: task_name_tooltip_content
            });
        });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1150px">
            <table class="table-search" width="auto;">
                <tr>
                    <td>
                        <input id="task_type" name="taskType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td id="keyword_title">
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" placeholder="精确"/>
                    </td>
                    <td>
                        <label>执行状态：</label>
                    </td>
                    <td>
                        <input id="execution_status" name="status" class="easyui-combobox" valueField="id"
                               textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
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

<jsp:include page="../urlPvRank/dialog.jsp"/>

</body>
</html>
