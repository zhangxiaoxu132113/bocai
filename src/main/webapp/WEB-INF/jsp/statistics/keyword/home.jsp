<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored ="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/statistics/keyword.js"></script>
    <script type="text/javascript">
        $(function(){
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
        <div class="search-div" style="overflow: auto; width: 1250px">
            <table class="table-search" width="auto;">
                <tr>
                    <td>
                        <label>关键词：</label>
                    </td>
                    <td id="keyword_title">
                        <input style="width: 100px" id="keyword" name="keyword" class="easyui-textbox" type="text" placeholder="模糊匹配"/>
                    </td>
                    <td>
                        <label>链接：</label>
                    </td>
                    <td>
                        <input style="width: 100px" id="server_name" name="serverName" class="easyui-textbox" type="text" placeholder="精确匹配"/>
                    </td>
                    <td><label>搜索引擎：</label></td>
                    <td>
                        <input id="search_engine_id" name="searchEngineId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>状态：</label></td>
                    <td>
                        <input id="status" name="status" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                    <td><label>创建日期：</label></td>
                    <td>
                        <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
                    </td>
                </tr>
            </table>
            <table class="table-search" width="auto;">
                <tr>
                    <td><label>最新排名：</label></td>
                    <td>
                        <input style="width: 40px" id="last_rank_begin" name="lastRankBegin" class="easyui-numberbox" type="text"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input style="width: 40px" id="last_rank_end" name="lastRankEnd" class="easyui-numberbox" type="text"/>
                    </td>
                    <td><label>最新变化：</label></td>
                    <td>
                        <input style="width: 40px" id="last_change_rank_begin" name="lastChangeRankBegin" class="easyui-numberbox" type="text"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input style="width: 40px" id="last_change_rank_end" name="lastChangeRankEnd" class="easyui-numberbox" type="text"/>
                    </td>
                    <td><label>总变化量：</label></td>
                    <td>
                        <input style="width: 40px" id="all_change_rank_begin" name="allChangeRankBegin" class="easyui-numberbox" type="text"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input style="width: 40px" id="all_change_rank_end" name="allChangeRankEnd" class="easyui-numberbox" type="text"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch(0)">搜索</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="addTaskDlg()">新增</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="updateTaskDlg()">修改</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-online" onclick="updateTaskStatusDlg(1)">上线</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-offline" onclick="updateTaskStatusDlg(2)">下线</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-offline" onclick="updateTaskStatusDlg(3)">删除</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportTaskRecord()">导出</a>
                    </td>
                    <td>
                        <a class="easyui-linkbutton" iconCls="image-chart" onclick="addTab('优化报告','/statistics/keyword/chat.do')">查看优化报告</a>
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