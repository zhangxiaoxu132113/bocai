<%--
  Created by IntelliJ IDEA.
  User: zhangmiaojie
  Date: 2016/11/11
  Time: 16:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/seo/tag.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });
        });
    </script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1150px">
            <table class="table-search" width="auto;">
                <tr>

                    <td>
                        <input style="width: 140px; height: 26px" id="name" name="name" class="easyui-textbox" type="text" placeholder="标签名"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch(0)">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="addSeoTagDlg()">新建标签</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="modifySeoTagDlg()">修改标签</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="deleteSeoTag()">删除标签</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="exportSeoRootOnTag()">导出标签词根</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="table" border="ture"></table>
</div>

<jsp:include page="../tag/dialog.jsp"/>

</body>
</html>
