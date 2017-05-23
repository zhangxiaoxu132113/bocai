<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>词表管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/task/task.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="businessId" name="businessId"/>
        <div class="search-div" style="overflow: auto; width: 800px">
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
                    <td>
                        <input style="width: 100px" id="dictionary_name" name="dictionaryName" class="easyui-textbox" type="text" prompt="精确"/>
                    </td>
                    <td><label>状态：</label></td>
                    <td>
                        <input id="status" name="status" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>任务类型：</label></td>
                    <td>
                        <input id="type" name="type" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                </tr>
            </table>
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>日期：</label></td>
                    <td>
                        <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="image-cancel" onclick="cancelTaskDlg()">取消任务</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="image-zip" onclick="downloadLastTastRecords()">批量下载</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="image-queue" onclick="queueLenDlg()">队列情况</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="task_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="task_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>