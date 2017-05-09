var app = angular.module("homeApp",['ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function($stateProvider,$urlRouterProvider,$httpProvider){

    $urlRouterProvider.otherwise("/accountInfo");
    $stateProvider
        .state('calendar',{
            url:"/calendar",
            templateUrl:"/production/calendar.html"
        })
        .state('redPacket',{
            url:"/redPacket",
            templateUrl:"/template/account/redpacket.html"
        })
        .state('tradLog',{
            url:"/tradLog",
            templateUrl:"/template/account/tradLog.html"
        })
        .state('integral',{
            url:"/integral",
            templateUrl:"/template/account/integral.html"
        })
        .state('member',{
            url:"/member",
            templateUrl:"/template/account/member.html"
        })
        .state('invite',{
            url:"/invite",
            templateUrl:"/template/account/invite.html"
        })
        .state('safe',{
            url:"/safe",
            templateUrl:"/template/account/safe.jsp"
        });

}]);

app.controller("personHomeCtrl",function($scope){
    $scope.username = "mrwater";

});

app.controller("xiazhuCtrl",function($scope, $http) {
    $scope.task = {};
    $scope.taskUserList = [];
    $scope.isFinished = false;


    //开始下注
    $scope.startTaskdlg = function() {
        $('.addRecordDlg').css('display', "block");
        $http({
            url:"/task/startTask",
            method:"POST"
        })
            .success(function(data) {
                if (data.code == 1) {
                    $scope.task = data.rows;
                } else {
                    alert("服务器异常，请联系管理员!");
                }
            })
            .error(function(data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
            });
    }


    $scope.saveTaskUser = function() {
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
        jQuery('.username').each(function(key,value){
            if ($(this).val() == '') {
                isOver = true;
                alert("输入的用户名不能为空！");
                return;
            }
            usernames[key] = $(this).val();
        });
        if (isOver) return;

        var nums = new Array();
        jQuery('.num').each(function(key,value){
            if ($(this).val() == '') {
                isOver = true;
                alert("输入红包序号不能为空！");
                return;
            }
            nums[key] = $(this).val();
        });
        if (isOver) return;

        var sums = new Array();
        jQuery('.sum').each(function(key,value){
            if ($(this).val() == '') {
                isOver = true;
                alert("输入的金额不能为空！");
                return;
            }
            sums[key] = $(this).val();
        });
        if (isOver) return;
        $http({
            url:"/task/saveTaskUser",
            method:"POST",
            data:{
                usernames:usernames,
                nums:nums,
                sums:sums,
                taskId:$scope.task.id
            }
        })
            .success(function(data) {
                $('.addRecordDlg').css('display', "none");
                $http({
                    url:"/task/taskUserList",
                    method:"POST",
                    data:{
                        taskId:$scope.task.id
                    }
                })
                    .success(function(data) {
                        if (data.code == 1) {
                            $scope.taskUserList = data.rows;
                            console.log($scope.taskUser);
                        } else {
                            alert("服务器异常，请联系管理员!");
                        }
                    })
                    .error(function(data) {
                        console.log(data);
                        alert("服务器异常，请联系管理员!");
                    });
            })
            .error(function(data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
            });
    }

    $scope.startSendRedPackgetdlg = function() {
        $('.resultDlg').css("display","block");
    }
    $scope.getTaskResultInfo = function() {
        var red1 = $('.red1').val();
        var red2 = $('.red2').val();
        var red3 = $('.red3').val();
        var red4 = $('.red4').val();
        var red5 = $('.red5').val();
        var red6 = $('.red6').val();
        $http({
            url:"/task/getLotteryResults",
            method:"POST",
            data:{
                red1:red1,
                red2:red2,
                red3:red3,
                red4:red4,
                red5:red5,
                red6:red6,
                taskId:$scope.task.id
            }
        })
            .success(function(data) {
                if (data.code == 1) {
                    $scope.taskUserList = data.rows;
                    $scope.isFinished = true;
                } else {
                    alert("服务器异常，请联系管理员!");
                }
                $('.resultDlg').css("display","none");
            })
            .error(function(data) {
                console.log(data);
                alert("服务器异常，请联系管理员!");
                $('.resultDlg').css("display","none");
            });
    }
});
