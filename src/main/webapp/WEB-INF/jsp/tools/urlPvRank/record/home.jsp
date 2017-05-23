<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
  <title>受访页排名任务记录</title>
  <meta charset="UTF-8">
  <%@include file="../../../common/common.jsp" %>
  <script type="text/javascript">
    var taskId = '${taskId}';
    var fromType = '${fromType}';
  </script>
  <script type="text/javascript" src="<%=path%>/js/tools/record.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
  <form id="searchForm">
    <input type="hidden" id="taskId" name="taskId" value="${taskId}"/>
    <div class="search-div">
      <table class="table-search" width="auto;">
        <tr>
          <td><label>日期：</label></td>
          <td>
            <input id="startDate" name="startDate" class="easyui-datebox" editable="false" style="width:100px"/>
          </td>
          <td>-</td>
          <td>
            <input id="endDate" name="endDate" class="easyui-datebox" editable="false" style="width:100px"/>
          </td>
          <td width="80">
            <a class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">搜索</a>
          </td>
        </tr>
      </table>
    </div>
  </form>
</div>

<div id="task_record_center" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
  <table id="task_record_table" border="ture"></table>
</div>

<jsp:include page="dialog.jsp"/>

</body>
</html>