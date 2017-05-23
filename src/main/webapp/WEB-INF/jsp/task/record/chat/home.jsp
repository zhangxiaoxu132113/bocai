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
        var rankType = '${rankType}';
    </script>
    <script type="text/javascript" src="<%=path%>/js/task/record/chat.js"></script>
</head>

<body>
<div id="tt" class="easyui-tabs" region="north" border="false" style="width:100%;height:100%;overflow: auto;">
</div>

</body>
</html>