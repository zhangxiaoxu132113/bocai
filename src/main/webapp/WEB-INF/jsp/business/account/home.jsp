<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>账户管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/business/account.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 600px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>账户名：</label></td>
                    <td>
                        <input style="width: 100px" id="username" name="username" class="easyui-textbox" type="text" placeholder="模糊"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="addAccountDlg()">添加账户</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-edit" onclick="updateAccountDlg()">修改账户</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-edit" onclick="bindAccountDlg()">綁定业务</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="account_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="account_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>