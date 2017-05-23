<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>业务管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/business/business.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 800px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务层级：</label></td>
                    <td>
                        <input id="type" name="type" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>业务：</label></td>
                    <td>
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" placeholder="模糊"/>
                    </td>
                    <td><label>状态：</label></td>
                    <td>
                        <input id="enabled" name="enabledInt" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="addBusinessDlg()">添加业务</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-edit" onclick="updateBusinessDlg()">修改业务</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="business_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="business_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>