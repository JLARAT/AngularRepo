/**
 * Created by JOCLAR on 03/12/2015.
 */
var app = angular.module('myModule', ['uiGmapgoogle-maps', 'ui.bootstrap']);

app.controller('mainCtrl', function ($scope) {

    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418}, zoom: 14};

    $scope.alerts = [];

    $scope.RefreshMap = function () {
        $scope.map = {center: {latitude: $scope.DataLat, longitude: $scope.DataLng}, zoom: 14};
    };

    /*
     $scope.addAlert = function () {
     $scope.alerts.push({msg: 'Another alert!'});
     $("#AlertContainer").animate({
     opacity: 0.1
     }, 3000);

     };
     */

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});


app.controller('ButtonsCtrl', function ($scope) {
    $scope.MapDisplay = "Hide";
});