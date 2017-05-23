<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>登录</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <%@include file="common/common.jsp" %>
    <link rel="stylesheet" type="text/css" href="css/input.css"/>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript">
        var errorMsg = '${errorMsg}';
        $(function () {
            if (errorMsg != '' && errorMsg != undefined) {
                $.messager.alert('错误', '${errorMsg}', 'error');
            }
        });
    </script>
</head>

<body>
<div class="wrap">
    <form method="post" id="fm" action="login.do">
        <section class="loginForm">
            <header>
                <h1>登录系统</h1>
            </header>
            <div class="loginForm_content">
                <fieldset>
                    <div class="inputWrap">
                        <input type="text" class="userName_input" name="name"
                               placeholder="请输入用户名" autofocus required>
                    </div>
                    <div class="inputWrap">
                        <input type="password" name="password" placeholder="请输入密码"
                               required>
                    </div>
                </fieldset>
                <%--<fieldset>
                    <div style="margin: 10px 10px 0; width: 120px; float: left;">
                        <input type="text"
                               name="kaptcha" placeholder="请输入验证码" class=""
                               style="width: 100px; height: 39px;" id="kaptcha" autofocus>
                    </div>
                    <div style="margin: 10px 10px 0; float: left;">
                        <img src="http://admin.imgcode.39.net/createImgCode.do"
                            id="kaptchaImage" />
                    </div>
                    <div style="margin: 10px 10px 0; float: left;">
                        <a href="#" onclick="changeCode()"><span
                            style="font-size: 14px;" ><br>换一张</span></a>
                    </div>
                </fieldset>--%>
                <fieldset>
                    <%--<input type="button" value="登录" onclick="verify()">--%>
                    <input  type="button" value="登录" onclick="loginSubmit()">
                </fieldset>

            </div>
        </section>
    </form>
</div>


</body>
<script type="text/javascript">
    function loginSubmit(){
       $("#fm").submit();
    }

    $(function () {
        document.onkeydown = function (e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                verify();
            }
        }
    });

    //jsonp的回调函数
    function callback(data) {
        if (data.result) {
            $("#fm").submit();
        } else {
            $.messager.alert({title: '提示信息', msg: '验证码错误'});
        }
    }

    function verify() {
        //var key = $.cookie("imgCodeKey");
        var value = $("#kaptcha").val();
        if (value == '') {
            $.messager.alert({title: '提示信息', msg: '请输入验证码'});
            return false;
        }
        if (value.length != 4) {
            $.messager.alert({title: '提示信息', msg: '验证码必须是4位字符'});
            return false;
        } else {
            var url = "http://admin.imgcode.39.net/verifyImgCode.do?kaptcha=" + value + "&callback=?"
            $.getJSON(url, function (data) {
            });
        }
    }

</script>
<script type="text/javascript">
    $(function () {
        $('#kaptchaImage')
                .click(
                function () {
                    $(this).hide().attr(
                            'src',
                            'http://admin.imgcode.39.net/createImgCode.do?'
                            + Math.floor(Math.random() * 100))
                            .fadeIn();
                });
    });


    function changeCode() {
        $('#kaptchaImage').hide().attr(
                'src',
                'http://admin.imgcode.39.net/createImgCode.do?'
                + Math.floor(Math.random() * 100)).fadeIn();

    }


</script>

</html>