<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>趋势分析</title>
    <meta charset="UTF-8">
    <%@include file="../../../common/common.jsp" %>
    <%@include file="../../../common/echarts.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/statistics/chat.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="type" name="type"/>
        <table class="table-search" width="auto;" style="overflow: auto">
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
                <td width="80">
                    <a class="easyui-linkbutton" iconCls="icon-search" onclick="searchKeywordRecord()">搜索</a>
                </td>
                <td>
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="image-excel"
                       onclick="exportTaskRecordForChat()">导出</a>
                </td>
            </tr>
        </table>
        <div id="task_record_his_center" style="height:400px;width: 48%;position: absolute">
        </div>
        <%--<div style="width: 1px;height:auto;border-bottom:1px dashed #000;"></div>--%>
        <div id="task_record_his_center2" style="height:400px;width: 48%;position: relative;margin-left: 50%">
        </div>
    </form>
</div>

<div id="task_record_his" region="center" border="true" style="overflow: auto;height:auto;width: auto;">
    <table id="task_record_his_table" border="ture"></table>
</div>

</body>
</html>