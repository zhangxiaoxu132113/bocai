<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>日志管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/log/log.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>日期：</label></td>
                    <td>
                        <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td>到</td>
                    <td>
                        <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td><label>内容：</label></td>
                    <td>
                        <input style="width: 100px" id="description" name="description" class="easyui-textbox" type="text" placeholder="模糊匹配"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="log_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="ldg" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>
</body>
</html>