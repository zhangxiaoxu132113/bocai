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