<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>竞争对手管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/business/compare.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="addCompareDlg()">添加竞争对手</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-edit" onclick="updateCompareDlg()">修改竞争对手</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="compare_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="compare_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>