/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope){

    //Init variable
    $scope.DisplayParallax = true;



});

//Parallax controller
app.controller('parallaxController', function ($scope){

    $scope.Launcher = function(){
        $scope.DisplayParallax = false;
    };
});


//Section Controllers
 routeAppControllers.controller('sectionBddController', function($scope){
    $scope.DbModel = "";

    $scope.NextStep = function(){
        Materialize.toast($scope.DbModel, 2000);
        $('#ContainerDBSelect').addClass('animated zoomOutDown');

        document.location.href="#/table";

    }

});

 routeAppControllers.controller('sectionTableController', function($scope){
     $('#ContainerTableSelect').addClass('animated zoomInUp');
});
