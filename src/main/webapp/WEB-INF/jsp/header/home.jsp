<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>数据配置项</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/header/header.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 850px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="bs" name="businessId" class="easyui-combobox" valueField="businessId" textField="businessName" panelHeight="auto" style="width:120px" required="required"/>
                    </td>
                    <td><label>界面：</label></td>
                    <td>
                        <input id="face" name="face" class="easyui-combobox" valueField="face" textField="faceName" panelHeight="auto" style="width:120px" required="required"/>
                    </td>
                    <td width="100">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-save" onclick="saveOrUpdate(0)">保存</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="add()">新增</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="editDlg()">修改</a>
                    </td>
                    <td >
                        <a class="easyui-linkbutton" iconCls="icon-remove" onclick="deleteHeaders()">删除</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" onclick="uploadExcelDlg()">导入</a>
                    </td>
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