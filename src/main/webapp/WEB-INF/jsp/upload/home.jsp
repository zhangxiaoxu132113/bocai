<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>百度明细关键词导入</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/upload/upload.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 750px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>上传时间：</label></td>
                    <td>
                        <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td>到</td>
                    <td>
                        <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td>
                        <input style="width: 160px" id="description" name="description" class="easyui-textbox" type="text" placeholder="模糊匹配"/>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <%--<td>
                        <a class="easyui-linkbutton" iconCls="image-import" onclick="uploadDlg()">报表数据导入</a>
                    </td>--%>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-import" onclick="upKeyWordRemarkDlg()">关键词备注导入</a>
                    </td>
                    <td>
                        <div id="add_progressbar" class="easyui-progressbar" style="width:200px; display: none"></div>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="dg_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="dg" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>
</body>
</html>