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
    <script type="text/javascript" src="<%=path%>/js/seo/root.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });

            var task_name_tooltip_content = '<table style="text-align:center">';
            task_name_tooltip_content += '<tr><td>导入文件格式为四列excel文件，</td></tr>';
            task_name_tooltip_content += '<tr><td>第一列为一级词根（必填），第二列为二级词根（可选）</td></tr>';
            task_name_tooltip_content += '<tr><td>第三列为三级词根（可选），第四列为指数（可选）</td></tr>';
            task_name_tooltip_content += '</table>';
            $('#add_name_tip').tooltip({
                position: 'bottom',
                content: task_name_tooltip_content
            });
        });
    </script>
    <style>
        .tree-folder-open ,.tree-folder, .tree-file { display: none}
        #searchForm .search-div tr td i {margin: 0 0.5em;color:#404067}
        #searchForm .search-div tr td span.textbox {float: left; margin-right: 0.5em;}
    </style>
</head>
<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1150px">
            <table class="table-search" width="auto;">
                <tr>

                    <td>
                        <input id="level" name="level" class="easyui-combobox" valueField="id"
                               textField="name" panelHeight="auto" style="width:60px;height: 26px;" required="required"/>
                        <textarea id="name" style="width: 140px; height: 20px;resize: none" name="name"
                                  class="easyui-validatebox" placeholder="一行一个词根"></textarea>
                        <a class="easyui-linkbutton" style="float: right" iconCls="icon-search" onclick="doSearch(0)">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-import" onclick="saveSeoRootDlg()">导入词根</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportSeoRoot()">导出词根</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="deleteSeoRoot()">删除词根</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="changeRootTag(0)">变更标签</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="manageRootTag()">标签管理</a>
                    </td>
                </tr>
                <tr>
                    <td style="color:#a2a2a2" colspan="5">
                        <div># 双击词根，查看其匹配的搜索词<%--，KW系统会在每天03:30点 10:30点 13:30点 全量对词根匹配搜索词--%></div>
                        <div># 当前<span id="rootName" style="margin:0 0.5em;color:#404067;"></span>共计
                            <span id="levelOneNumPanel">一级词根<i id="levelOneNum"></i>个，</span>
                            <span id="levelTwoNumPanel">二级词根<i id="levelTwoNum"></i>个，</span>
                            <span id="levelThreeNumPanel">三级词根<i id="levelThreeNum"></i>个</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="table" border="ture" style="width: 1200px"></table>
</div>
<jsp:include page="../root/dialog.jsp"/>
</body>
</html>
