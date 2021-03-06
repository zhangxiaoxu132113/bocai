<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <title>关键词管理</title>
    <meta charset="UTF-8">
    <%@include file="../../common/common.jsp" %>
    <script type="text/javascript" src="<%=path%>/js/tools/indexCrawl.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#keyword_title').tooltip({
                position: 'bottom',
                content: keyword_tooltip_content
            });

            var task_name_tooltip_content = '<table>';
            task_name_tooltip_content += '<tr><td>查询以日期为准，下拉框只为方便选择</td></tr>';
            task_name_tooltip_content += '</table>';
            $('#add_task_name_tip').tooltip({
                position: 'bottom',
                content: task_name_tooltip_content
            });
        });
    </script>
    <style>
        .operator-table {
            display: none;
        }
        .table-info tr td, .operator-table tr td {
            padding: 5px;
        }
    </style>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <div class="search-div" style="overflow: auto; width: 1150px">
            <table class="table-info">
                <tr class="ready_start_task">
                    <td>
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="readyTask()">准备发包</a>
                    </td>
                </tr>
                <tr class="runing_task_status" style="display: none" style="font-size: 16px">
                    <td>第<span class="taskName" style="margin: 0 0.25em"></span>期</td>
                    <td><lable>状态</lable><span class="statusName"></span></td>
                </tr>
            </table>
            <table class="operator-table">
                <td class="start_task_tr">
                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="addStartTaskDlg()">开始发包</a>
                </td>
                <td class="cancal_task_tr">
                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="cancelTask()">取消发包</a>
                </td>
                <td>
                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="exportSearchData()">筛选导出</a>
                </td>
                <td>
                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="exportAllData()">导出全部</a>
                </td>
                <td class="lottery_result_tr" style="display: none">
                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="openResultDlg()">开奖结果</a>
                </td>
            </table>
            <table class="table-search" width="auto;" style="display: none">
                <input class="hidden h_task_id" type="hidden" name="taskId"/>
                <tr>
                    <td>
                        <input id="task_type" name="searchType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:60px;float: left" required="required"/>
                        <input style="width: 100px;float: left" id="name" name="searchValue" class="easyui-textbox"
                               type="text" placeholder="精确"/>
                    </td>
                    <td>
                        <label>下注金额：</label>
                    </td>
                    <td>
                        <input style="width: 40px" id="last_rank_begin" name="moneyBegin" class="easyui-numberbox"
                               type="text"/>
                    </td>
                    <td>-</td>
                    <td>
                        <input style="width: 40px" id="last_rank_end" name="moneyEnd" class="easyui-numberbox"
                               type="text"/>
                    </td>
                    <td width="80">
                        <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch(0)">搜索</a>
                    </td>
                    <td class="crud_btn">
                        <a class="easyui-linkbutton" iconCls="icon-add" onclick="addTaskDlg()">批量导入</a>
                    </td>
                    <td class="crud_btn">
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="modifyTask()">修改</a>
                    </td>
                    <td class="crud_btn">
                        <a class="easyui-linkbutton" iconCls="icon-edit" onclick="deleteTask()">删除</a>
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