<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/common/rootExtract.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="businessId" name="businessId"/>
        <div class="search-div">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>分类：</label></td>
                    <td>
                        <input id="category_id" name="categoryId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="extractRoots()">提取词根</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="root_extract_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="root_extract_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>