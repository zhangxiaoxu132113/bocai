<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>词表管理-趋势分析</title>
    <meta charset="UTF-8">
    <%@include file="../../../common/common.jsp" %>
    <%@include file="../../../common/echarts.jsp" %>
    <script type="text/javascript">
        var id = '${id}';
    </script>
    <script type="text/javascript" src="<%=path%>/js/task/record/tab2.js"></script>
</head>

<body>
<div id="top" region="north" border="false" style="overflow: auto;">
    <form id="searchForm">
        <input type="hidden" id="id" name="id" value="${id}"/>
        <input type="hidden" id="rank" name="rank" value="${rankType}"/>
        <div id="task_record_his_center" style="height:400px;">
        </div>
    </form>
</div>

<div id="task_record_his" region="center" border="true" style="overflow: hidden;height:auto;width: auto;">
    <table id="task_record_his_table" border="ture"></table>
</div>

</body>
</html>