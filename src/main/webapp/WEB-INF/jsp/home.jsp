<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>关键词系统后台</title>
    <meta charset="UTF-8">
    <%@include file="common/common.jsp" %>
    <link href="css/default.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${path}/js/menu.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            window.setTimeout("getTime()", 0);
            window.setInterval("getTime()", 1000);
        });

        function downloadExampleExcel() {
            window.open("../example/example.xlsx");
        }
    </script>
    <script type="text/javascript">
        /*var menuList = ${json};*/
        var temp = ${json};
        var menuList = eval('(' + temp + ')');

        function getTime() {
            var week = "日一二三四五六".charAt(new Date().getDay())
            var today = new Date().Format("yyyy年MM月dd日 hh:mm:ss");
            $('#today').html(today + " 星期" + week);
        }
    </script>
</head>
<body>
<div class="easyui-layout" style="width:auto; height:100%; overflow:hidden;">
    <div region="north" split="true" border="false"
         style="overflow:hidden; height:30px; background:url(../../css/images/layout-browser-hd-bg.gif) #7f99be repeat-x center 50%; line-height: 20px; color: #fff; font-family: Verdana, 微软雅黑, 黑体">
			<span style="float: right; padding-right: 20px;" class="head">
				欢迎 ${userName} 今天是 <span id="today"></span> <a href="http://admin.right.39.net/update.do" target="_blank" id="changePwd">修改密码</a> <a href="#" id="loginOut">安全退出</a>
			</span>
			<span style="padding-left: 10px; font-size: 16px; float: left;">
				<img src="css/images/blocks.gif" width="20" height="20" align="absmiddle"/>
				关键词系统后台
			</span>
    </div>

    <div region="south" split="true" style="height:30px;">
        <div class="footer">By www.39.net</div>
    </div>

    <div region="west" id="p" title="菜单" style="width:170px; padding:0px">
        <div class="easyui-accordion" id="wnav"
             data-options="border:false,collapsed:false,collapsible:false"></div>
    </div>

    <div region="center">
        <div id="tabs" class="easyui-tabs" fit="true">
            <div id="home" title="欢迎使用" style="padding:20px; overflow:scroll; font-size: 16px;">
                <h1>欢迎使用关键词系统！</h1>
                <h4>功能说明</h4>
                <ul class="info">
                    <li><strong>关键词管理</strong>
                        <ol>关键词：关键词的管理、趋势分析</ol>
                        <ol>报表导入：可按要求导入其他平台的统计数据，根据<strong>业务数据项</strong>上传的表头一一对应</ol>
                        <ol>词根提取：用于词表词根的提取</ol>
                        <ol>词根管理：用于上传词根</ol>
                    </li>
                    <li><strong>词表管理</strong>
                        <ol>词表管理：关键词的集合，用于管理关键词和建立任务，趋势分析</ol>
                        <ol>词表标签：词表的标签管理</ol>
                        <ol>抓取任务：任务管理，单次任务<strong>即时</strong>生效抓取；监控任务每天<strong>19点</strong>开始抓取；监控任务才列入趋势分析</ol>
                    </li>
                    <li><strong>业务配置</strong>
                        <ol>业务管理：需要添加新业务时联系管理员</ol>
                        <ol>账户管理：需要添加新账号时联系管理员</ol>
                        <ol>竞争对手：各业务可管理自己想要对比的竞争对手</ol>
                        <ol>业务数据项：自定义表头，可在<strong>关键词管理</strong>的数据列查看</ol>
                        <ol>日志：可查看当前登录账号所属业务的操作日志</ol>
                    </li>
                </ul>
                <h4><img src="${path}/css/icons/tip.png" title="小提示"/>上传各示例模板&nbsp;<a class="easyui-linkbutton"
                                                                                  onclick="downloadExampleExcel()">点击下载</a>
                </h4>
                <h4><img src="${path}/css/icons/tip.png" title="小提示"/>一般数据列支持双击修改</h4>
                <h4>一般跑任务操作</h4>
                <ul style="list-style: none">
                    <li>1、<strong>竞争对手 - </strong>配置竞争对手</li>
                    <li>2、<strong>词表管理 - </strong>新建词表</li>
                    <li>3、<strong>词表管理 - </strong>新建单次或者监控任务</li>
                    <li>4、<strong>抓取任务 - </strong>导出抓取结果或者报表趋势分析</li>
                </ul>
                <h4>一般第三方数据导入操作</h4>
                <ul style="list-style: none">
                    <li>1、<strong>业务数据项 - </strong>上传业务数据项，也就是表头</li>
                    <li>2、<strong>报表导入 - </strong>第三方报表导入</li>
                    <li>3、<strong>关键词 - </strong>关键词管理界面分析数据</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div id="mm" class="easyui-menu" style="width: 150px;">
    <div id="mm-tabupdate">刷新</div>
    <div class="menu-sep"></div>
    <div id="mm-tabclose">关闭</div>
    <div id="mm-tabcloseall">全部关闭</div>
    <div id="mm-tabcloseother">除此之外全部关闭</div>
    <div class="menu-sep"></div>
    <div id="mm-tabcloseright">当前页右侧全部关闭</div>
    <div id="mm-tabcloseleft">当前页左侧全部关闭</div>
    <div class="menu-sep"></div>
    <div id="mm-exit">退出</div>
</div>
</body>
</html>