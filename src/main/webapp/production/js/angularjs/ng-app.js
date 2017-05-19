var app = angular.module("homeApp", ['ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/accountInfo");
    $stateProvider
        .state('calendar', {
            url: "/calendar",
            templateUrl: "/production/calendar.html"
        })
        .state('wxlogin', {
            url: "/wxlogin",
            templateUrl: "/production/wxlogin.html"
        })
        .state('chart_report', {
            url: "/chart_report",
            templateUrl: "/production/chart_report.html"
        })
        .state('integral', {
            url: "/integral",
            templateUrl: "/template/account/integral.html"
        })
        .state('member', {
            url: "/member",
            templateUrl: "/template/account/member.html"
        })
        .state('invite', {
            url: "/invite",
            templateUrl: "/template/account/invite.html"
        })
        .state('safe', {
            url: "/safe",
            templateUrl: "/template/account/safe.jsp"
        });

}]);

app.controller("wxCtrl", function ($scope, $http) {
    $scope.isLogin = false;
    $scope.qrcodeImgPath;
    $scope.uuid;
    $scope.redirect_uri;
    $scope.pgv_pvi;
    $scope.pgv_si;
    $scope.device_id;

    function getDeviceid() {
        return "e" + ("" + Math.random().toFixed(15)).substring(2, 17);
    }

    function r(c) {
        return (c || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10;
    }

    if (!$scope.isLogin) {
        $http({
            url: "/wx/qrcode",
            method: "GET"
        })
            .success(function (data) {
                if (data.code == 1) {
                    console.log("获取二维码成功，请扫描二维码");
                    $scope.qrcodeImgPath = data.qr_code_img_path;
                    $scope.uuid = data.uuid;
                    if ($scope.qrcodeImgPath != undefined && $scope.qrcodeImgPath != '') {
                        $http({
                            url: "/wx/checkIsLogin?uuid=" + $scope.uuid,
                            method: "GET"
                        })
                            .success(function (data) {
                                //console.log("login success!");
                                //if (data.code == 1) {
                                //    $scope.redirect_uri = data.redirect_uri;
                                //    $scope.pgv_pvi = r();
                                //    $scope.pgv_si = r("s");
                                //    $http({
                                //        url: "/wx/initData",
                                //        method: "POST",
                                //        params: {
                                //            redirect_uri: $scope.redirect_uri,
                                //            pgv_pvi: $scope.pgv_pvi,
                                //            pgv_si: $scope.pgv_si,
                                //            r: ~new Date,
                                //            deviceid: getDeviceid()
                                //        }
                                //    })
                                //        .success(function (data) {
                                //            setInterval(function () {
                                //                $http({
                                //                    url: "/wx/synccheck",
                                //                    method: "POST",
                                //                    params:{
                                //                        pgv_pvi: $scope.pgv_pvi,
                                //                        pgv_si: $scope.pgv_si,
                                //                        deviceid: getDeviceid()
                                //                    }
                                //                })
                                //                    .success(function (data) {
                                //                        console.log(data);
                                //                        if(data.selector >= 2) {
                                //                            console.log("有未读消息");
                                //                        } else {
                                //                            console.log("没有未读消息");
                                //                        }
                                //                    })
                                //                    .error(function (data) {
                                //                        console.log(data);
                                //                        alert("服务器异常，请联系管理员!");
                                //                    });
                                //            }, 1000);
                                //        })
                                //        .error(function (data) {
                                //            console.log(data);
                                //            alert("服务器异常，请联系管理员!");
                                //        });
                                //} else {
                                //    alert("服务器异常，请联系管理员!");
                                //}
                                var redirectResponseData = data.redirectResponseData;
                                var cookieStore = data.cookieStore;
                                sessionStorage.pass_ticket = redirectResponseData.pass_ticket;
                                var init_url = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=" + ~new Date + "&lang=en_US&pass_ticket=" + redirectResponseData.pass_ticket;
                                $http({
                                    url: init_url,
                                    method: "JSONP",
                                    contentType: 'application/json; charset=utf-8', // 很重要
                                    traditional: true,
                                    header: {
                                        "access-control-allow-origin": "*",
                                        "Referer": "https://wx2.qq.com/?&lang=zh_CN",
                                        "Originn": "https://wx2.qq.com/?&lang=zh_CN"
                                    },
                                    dataType: 'JSONP',
                                    data: {
                                        BaseRequest: {
                                            DeviceID: getDeviceid(),
                                            Sid: redirectResponseData.wxsid,
                                            Skey: redirectResponseData.skey,
                                            Uin: redirectResponseData.wxuin
                                        }
                                    }

                                })
                                    .success(function (data) {
                                        console.log(data);
                                    })
                                    .error(function (data) {
                                        console.log(data);
                                        alert("服务器异常，请联系管理员!");
                                    });

                                    //$.ajax({
                                    //    url: init_url,
                                    //    type: "POST",
                                    //    contentType: 'application/json; charset=utf-8', // 很重要
                                    //    traditional: true,
                                    //    dataType: 'JSONP',// 解决跨域问题
                                    //    //header: {
                                    //    //    "access-control-allow-origin": "*",
                                    //    //    "Referer": "https://wx2.qq.com/?&lang=zh_CN",
                                    //    //    "Originn": "https://wx2.qq.com/?&lang=zh_CN"
                                    //    //},
                                    //    data: {
                                    //        BaseRequest: {
                                    //            Uin: redirectResponseData.wxuin,
                                    //            Sid: redirectResponseData.wxsid,
                                    //            Skey: redirectResponseData.skey,
                                    //            DeviceID: getDeviceid()
                                    //        }
                                    //    },
                                    //    success: function (data) {
                                    //        console.log(data);
                                    //    }
                                    //});
                            })

                            .error(function (data) {
                                console.log(data);
                                alert("服务器异常，请联系管理员!");
                            });

                    }
                } else {
                    alert("服务器异常，请联系管理员!");
                }
            })
            .error(function (data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
            });
    }
});

app.controller("xiazhuCtrl", function ($scope, $http) {
    $scope.task = {};
    $scope.taskUserList = [];
    $scope.isFinished = false;


    //开始下注
    $scope.startTaskdlg = function () {
        $('.addRecordDlg').css('display', "block");
        $http({
            url: "/task/startTask",
            method: "POST"
        })
            .success(function (data) {
                if (data.code == 1) {
                    $scope.task = data.rows;
                } else {
                    alert("服务器异常，请联系管理员!");
                }
            })
            .error(function (data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
            });
    }


    $scope.saveTaskUser = function () {
        var usernames = $('.username').val();
        var nums = $('.num').val();
        var sums = $('.sum').val();

        if (usernames == '') {
            alert("输入的用户名不能为空！");
            return;
        } else if (nums == '') {
            alert("输入红包序号不能为空！");
            return;
        } else if (sums == '') {
            alert("输入的金额不能为空！");
            return;
        }

        var isOver = false;
        var usernames = new Array();
        jQuery('.username').each(function (key, value) {
            if ($(this).val() == '') {
                isOver = true;
                alert("输入的用户名不能为空！");
                return;
            }
            usernames[key] = $(this).val();
        });
        if (isOver) return;

        var nums = new Array();
        jQuery('.num').each(function (key, value) {
            if ($(this).val() == '') {
                isOver = true;
                alert("输入红包序号不能为空！");
                return;
            }
            nums[key] = $(this).val();
        });
        if (isOver) return;

        var sums = new Array();
        jQuery('.sum').each(function (key, value) {
            if ($(this).val() == '') {
                isOver = true;
                alert("输入的金额不能为空！");
                return;
            }
            sums[key] = $(this).val();
        });
        if (isOver) return;
        $http({
            url: "/task/saveTaskUser",
            method: "POST",
            data: {
                usernames: usernames,
                nums: nums,
                sums: sums,
                taskId: $scope.task.id
            }
        })
            .success(function (data) {
                $('.addRecordDlg').css('display', "none");
                $http({
                    url: "/task/taskUserList",
                    method: "POST",
                    data: {
                        taskId: $scope.task.id
                    }
                })
                    .success(function (data) {
                        if (data.code == 1) {
                            $scope.taskUserList = data.rows;
                            console.log($scope.taskUser);
                        } else {
                            alert("服务器异常，请联系管理员!");
                        }
                    })
                    .error(function (data) {
                        console.log(data);
                        alert("服务器异常，请联系管理员!");
                    });
            })
            .error(function (data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
            });
    }

    $scope.startSendRedPackgetdlg = function () {
        $('.resultDlg').css("display", "block");
    }
    $scope.getTaskResultInfo = function () {
        var red1 = $('.red1').val();
        var red2 = $('.red2').val();
        var red3 = $('.red3').val();
        var red4 = $('.red4').val();
        var red5 = $('.red5').val();
        var red6 = $('.red6').val();
        $http({
            url: "/task/getLotteryResults",
            method: "POST",
            data: {
                red1: red1,
                red2: red2,
                red3: red3,
                red4: red4,
                red5: red5,
                red6: red6,
                taskId: $scope.task.id
            }
        })
            .success(function (data) {
                if (data.code == 1) {
                    $scope.taskUserList = data.rows;
                    $scope.isFinished = true;
                } else {
                    alert("服务器异常，请联系管理员!");
                }
                $('.resultDlg').css("display", "none");
            })
            .error(function (data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
                $('.resultDlg').css("display", "none");
            });
    }
});

app.controller("chartCtrl", function($scope, $http) {
    var myChart = echarts.init(document.getElementById('chart'), 'macarons');

    var options = {
        title : {
            text: '可视化报表',
            subtext: '一周的数据'
        },
        grid: {
            left: '1%',
            right: '3%',
            bottom: '4%',
            containLabel: true
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['纯收益','共进金额', "赔出金额"]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} ￥'
                }
            }
        ],
        series : [
            {
                name:'纯收益',
                type:'line',
                data:[12000, 8000, 20000, -2000, 7000, 8000, 10000],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'共进金额',
                type:'line',
                data:[2000,4500, 8000, 14000, 3000, 2100, 1560],
                markPoint : {
                    data : [
                        {name : '最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            },
            {
                name:'赔出金额',
                type:'line',
                data:[400, 800, 7000, 500, 300, 200, 1000],
                markPoint : {
                    data : [
                        {name : '最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    myChart.setOption(options);
    myChart.setOption({
        title: {
            text: data.rows.text
        },
        legend: {
            data: data.rows.legendArr
        },
        xAxis: {
            data: data.rows.dateArr
        },
        yAxis: data.rows.yAxisArr,
        series: data.rows.dataArr
    });
});