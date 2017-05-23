<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>词表管理-趋势分析</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <%@include file="../../common/echarts.jsp" %>
    <script type="text/javascript">
        var dictionaryId = '${dictionaryId}';
        var dictionaryName = '${dictionaryName}';
        var rankType = '${rankType}';
    </script>
    <script type="text/javascript" src="<%=path%>/js/task/tab2.js"></script>
    <script type="text/javascript" src="<%=path%>/js/task/chartUtil.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="dictionaryId" name="dictionaryId" value="${dictionaryId}"/>
        <input type="hidden" id="dictionaryName" name="dictionaryName" value="${dictionaryName}"/>
        <input type="hidden" id="rank" name="rank" value="${rankType}"/>
        <table class="table-search" width="auto;" style="overflow: auto; width: 700px">
            <tr>
                <td><label>日期：</label></td>
                <td>
                    <input id="startDate" name="startDate" class="easyui-datebox" editable="false"
                           style="width:100px"/>
                </td>
                <td>到</td>
                <td>
                    <input id="endDate" name="endDate" class="easyui-datebox" editable="false"
                           style="width:100px"/>
                </td>
                <td><label>搜索引擎：</label></td>
                <td>
                    <input id="search_engine_id" name="searchEngineId" class="easyui-combobox" valueField="id"
                           textField="text"
                           panelHeight="auto" style="width:100px;" required="required"/>
                </td>
                <td width="80">
                    <a class="easyui-linkbutton" iconCls="icon-search" onclick="searchKeywordRecord()">搜索</a>
                </td>
                <td>
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="image-excel"
                       onclick="exportTaskRecordForChat()">导出</a>
                </td>
            </tr>
        </table>
        <div id="task_record_his_center" style="height:400px;">
        </div>
    </form>
</div>

<div id="task_record_his" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="task_record_his_table" border="ture"></table>
</div>

</body>
</html>