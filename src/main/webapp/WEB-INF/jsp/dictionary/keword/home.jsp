<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript">
        var businessId = '${businessId}';
        var dictionaryId = '${dictionaryId}';
        var dictionaryName = '${dictionaryName}';
    </script>
    <script type="text/javascript">
        $(function(){
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });
        });
    </script>
    <script type="text/javascript" src="<%=path%>/js/dictionary/keyword.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="add_dictionary_dictionaryId" name="dictionaryId" value="${dictionaryId}"/>
        <div class="search-div" style="overflow: auto; width: 600px">
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>关键词：</label></td>
                    <td id="keyword_title">
                        <input style="width: 100px" id="keyword" name="keyword" class="easyui-textbox" type="text" placeholder="模糊"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-remove" onclick="delLastKeywordsDlg()">撤销</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-add" onclick="addKeywordDlg()">添加关键词</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                           iconCls="icon-remove" onclick="delKeywordDlg()">删除关键词</a>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="keyword_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="keyword_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>