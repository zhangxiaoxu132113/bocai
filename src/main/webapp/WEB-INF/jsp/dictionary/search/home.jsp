<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>词表查询</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/dictionary/search.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>词表ID：</label></td>
                    <td>
                        <input style="width: 100px" id="dictionaryId" name="dictionaryId" class="easyui-textbox" type="text" prompt="精确" re/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="image-chart" onclick="dictionaryAnalysis()">趋势分析</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="task_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="task_table" border="ture"></table>
</div>
</body>
</html>