<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>搜索词库</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/seo/maintenance.js"></script>

    <style type="text/css">
        .keyword-text {
            font-style: normal;
            font-weight: bold;
        }

        .search-div1 {
            padding: 8px 0 8px 5px;
            font-size: 18px;
            font-style: normal;
            font-weight: bold;
        }

        .search-div2 {
            background: #f5f5f5;
            border-width: 0 0 0 0;
            border-style: solid;
            border-color: #dedede;
            margin: 15px 0;
        }

        .search-div3 {
            background: #f5f5f5;
            border-width: 0 0 0 0;
            border-style: solid;
            border-color: #dedede;
            margin: 8px 0;
        }

        table.table-search1 {
            font-size: 16px;
            border: solid #dedede;
            border-width: 1px;
            border-collapse: collapse;
        }

        table.table-search1 th {
            width: 180px;
            height: 25px;
            border-width: 1px;
            text-align: center;
            padding: 8px;
            border-style: solid;
            border-color: #dedede;
        }

        table.table-search1 td {
            height: 25px;
            border-width: 1px;
            text-align: center;
            padding: 8px;
            border-style: solid;
            border-color: #dedede;
        }

        .search-result-button a {
            line-height: 22px;
            font-size: 12px;
            font-weight: bold;
            text-decoration: none;
            opacity: 0.6;
            filter: alpha(opacity=60);
        }

        .search-result-button a:hover {
            opacity: 1.0;
            filter: alpha(opacity=100);
        }

        .operator-btn a {
            margin-left: 0.5em;
        }
    </style>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <div class="search-div1">
        词库维护
    </div>
    <div style="width:100%;margin:0px auto;padding:0px;border-width: 0 0 2px 0; border-style:solid;
            border-color:#544e4e;overflow:hidden;"></div>
    <div class="search-div2" style="display: block">
        <table class="table-search table-search1" border="1">
            <tr>
                <th>词库总词数</th>
                <th>指数词数</th>
                <th>未匹配词根词数</th>
            </tr>
            <tr>
                <td>
                    <span id="keywordCount"></span> 个
                </td>
                <td>
                    <span id="pvCount" <%--onclick="exportMatchedKeywordPv()" title="点击下载匹配的指数词"--%>></span> 个
                </td>
                <td>
                    <span id="notMatchRootCount" <%--onclick="exportUnmatchedKeywordPv()" title="点击下载未匹配的指数词"--%>></span>
                    个
                </td>
            </tr>
        </table>
    </div>
    <div style="width:100%;height:20px;margin:0px auto;padding:0px;background-color:#fff;overflow:hidden;"></div>
    <form id="searchForm">
        <div class="search-div3" style="overflow: auto;">
            <h4 style="margin: 0.5em;">词库操作管理</h4>
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>操作者：</label></td>
                    <td><input style="width: 180px" id="userName" name="userName" class="easyui-textbox" type="text"/></td>
                    <td><label>操作描述：</label></td>
                    <td><input style="width: 180px" id="description" name="description" class="easyui-textbox" type="text"/></td>
                    <td><label>文件名：</label></td>
                    <td><input style="width: 180px" id="fileName" name="fileName" class="easyui-textbox" type="text"/></td>
                </tr>
                <tr>
                    <td><label>时间：</label></td>
                    <td>
                        <input id="startDate" name="startDate" class="easyui-datebox" style="width:100px"/>
                        -
                        <input id="endDate" name="endDate" class="easyui-datebox" style="width:100px"/>
                    </td>
                    <td colspan="4" class="operator-btn">
                        <a class="button button-primary button-rounded button-tiny" onclick="doSearch()">查询日志</a>
                        <a class="button button-primary button-rounded button-tiny" iconCls="image-import" onclick="addKeywordDlg()">导入搜索词</a>
                        <a class="button button-primary button-rounded button-tiny" onclick="openAdvanceQueryPage()">全量指标采集</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>