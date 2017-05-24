<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词趋势管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <%@include file="../../common/echarts.jsp" %>
    <script type="text/javascript">
        var businessId = '${businessId}';
        var keywordId = '${keywordId}';
        var keyword = '${keyword}';
    </script>
    <script type="text/javascript" src="<%=path%>/js/keyword/chat.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="businessId" name="businessId" value="${businessId}"/>
        <input type="hidden" id="id" name="id" value="${keywordId}"/>
        <input type="hidden" id="keyword" name="keyword" value="${keyword}"/>
        <table class="table-search" width="auto;" style="overflow: auto; width: 800px">
            <tr>
                <td><label>日期：</label></td>
                <td>
                    <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
                </td>
                <td>到</td>
                <td>
                    <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
                </td>
                <td>
                    <input id="origin" name="origin" class="easyui-combobox" valueField="id" textField="name" panelHeight="auto" style="width:100px;" required="required"/>
                </td>
                <td>vs</td>
                <td>
                    <input id="compare" name="compare" class="easyui-combobox" valueField="id" textField="name" panelHeight="auto" style="width:100px;"/>
                </td>
                <td width="80">
                    <a class="easyui-linkbutton" iconCls="icon-search" onclick="searchKeywordRecord()">搜索</a>
                </td>
                <td>
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="image-excel" onclick="exportKeywordDataForChat()">导出</a>
                </td>
            </tr>
        </table>
        <div id="keyword_data_center" style="height:400px;">
        </div>
    </form>
</div>

<div id="keyword_data" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="keyword_data_table" border="ture"></table>
</div>
</body>
</html>