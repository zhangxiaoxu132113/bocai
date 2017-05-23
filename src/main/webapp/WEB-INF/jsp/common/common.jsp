<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/themes/metro-blue/easyui.css"/>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/icon.css"/>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/image.css"/>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/custom.css"/>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/buttons.css"/>

<script type="text/javascript" src="<%=path%>/js/jquery.js"></script>
<script type="text/javascript" src="<%=path%>/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/extends.js"></script>
<script type="text/javascript" src="<%=path%>/js/util.js"></script>
<script type="text/javascript" src="<%=path%>/js/jsUtil.js"></script>

<style type="text/css">
    .datagrid-row {
        height: 38px;
    }

    table.table-search td {
        padding: 5px;
    }

    .search-button {
        padding: 0 0 5px 0;
    }

    .search-button a {
        margin-left: 5px;
    }

    table.table-dlg {
        width: 100%;
        border-collapse: collapse;
    }

    table.table-dlg td {
        height: 35px;
    }

    table.table-dlg tr > td:nth-child(1) {
        text-align: right;
        width: 35%;
    }

    table.table-dlg tr > td:nth-child(2) {
        width: 65%;
    }

    .auto-div {
        display: none;
        width: 160px;
        border: 1px #74c0f9 solid;
        background: #FFF;
        position: absolute;
        z-index: 100;
        color: #323232;
    }
</style>

<script>
    $(function () {
        window.onload = placeholder();

        $('.easyui-combobox').combobox({
            'editable': false // 下拉框不可编辑
        });

        $('.easyui-filebox').filebox({
            buttonText: '选择文件'
        });
    });

    var keyword_tooltip_content = '<table>';
    keyword_tooltip_content += '<th colspan="2">搜索优化建议：假如搜索“关键词”</th>';
    keyword_tooltip_content += '<tr><td style="text-align: right">关键词：</td><td>表示精确搜索，速度最快</td></tr>';
    keyword_tooltip_content += '<tr><td style="text-align: right">关键词*：</td><td>表示后模糊搜索，速度快</td></tr>';
    keyword_tooltip_content += '<tr><td style="text-align: right">*关键词：</td><td>表示前模糊搜索，速度非常慢</td></tr>';
    keyword_tooltip_content += '<tr><td style="text-align: right">*关键词*：</td><td>表示前后模糊搜索，速度最慢</td></tr>';
    keyword_tooltip_content += '</table>';

    /**
     * 添加tab标签
     * @param subtitle
     * @param url
     * @param icon
     */
    function addTab(subtitle, url, icon) {
        window.parent.addTab(subtitle, url, icon)
    }

    function placeholder() {
        $(".easyui-numberbox").each(function (i) {
            var span = $(this).siblings("span")[0];
            var targetInput = $(span).find("input:first");
            if (targetInput) {
                $(targetInput).attr("placeholder", $(this).attr("placeholder"));
            }
        });

        $(".easyui-textbox").each(function (i) {
            var span = $(this).siblings("span")[0];
            var targetInput = $(span).find("input:first");
            if (targetInput) {
                $(targetInput).attr("placeholder", $(this).attr("placeholder"));
            }
        });
    }

    function formatRate(value) {
        if (value == undefined) {
            return null;
        }
        var temp = parseInt(value * 100) + "%";
        return temp;
    }

    function getIFrame(url) {
        return '<iframe style="width:100%;height:100%;" scrolling="auto" frameborder="0" src="' + url + '"></iframe>';
    }

    // 获取指定长度的随机字符串
    function getRandomKey(len) {
        var str = "abcdefghijklmnopqrstuvwxyz";
        var s = "";
        for (var i = 0; i < len; i++) {
            var rand = Math.floor(Math.random() * str.length);
            s += str.charAt(rand);
        }
        return s;
    }

</script>