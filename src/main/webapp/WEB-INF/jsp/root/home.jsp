<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>词根管理</title>
    <meta charset="UTF-8">
    <%@include file="../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/common/root.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 850px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>分类：</label></td>
                    <td>
                        <input id="category_id" name="categoryId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <label>词根：</label>
                    </td>
                    <td>
                        <input style="width: 100px" id="name" name="name" class="easyui-textbox" type="text" placeholder="模糊匹配"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="updateRootDlg()">修改分类</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-remove" onclick="delRootsDlg()">删除词根</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-remove" onclick="delCategoryDlg()">删除分类</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-import" onclick="uploadExcelDlg()">导入</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportRoots()">导出</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="root_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="root_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>