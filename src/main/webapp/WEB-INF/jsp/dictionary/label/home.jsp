<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>标签管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/dictionary/label.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 600px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>标签名：</label></td>
                    <td>
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" placeholder="模糊"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="add()">新增标签</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="editDlg()">修改标签</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-remove" onclick="deleteLabel()">删除标签</a>
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