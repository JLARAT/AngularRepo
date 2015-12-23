/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope){

    //Init variable
    $scope.DisplayParallax = true;
    $scope.DbModel = "";

    $scope.NextStep = function(){
        Materialize.toast($scope.DbModel, 2000);

        $('#ContainerDBSelect').addClass('zoomOutDown');
    }
});

//Parallax controller
app.controller('parallaxController', function ($scope){

    $scope.Launcher = function(){
        $scope.DisplayParallax = false;
    };
});
