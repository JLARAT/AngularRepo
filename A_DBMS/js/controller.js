/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope){
    $scope.tables = [];
    //Init variable
    $scope.DisplayParallax = true;



});

//Parallax controller
app.controller('sectionParallaxController', function ($scope, $location){

    $scope.Launcher = function(){
        Materialize.toast("Enjoy !", 2000);
        $("#ParallaxContainer").addClass('animated bounceOut').delay(500).queue(function(next){
            next();
        });
        $location.path('/bdd');

    };
});


//Section Controllers
 app.controller('sectionBddController', function($scope, $location){
    $scope.DbModel = "";

    $scope.NextStep = function(){
        Materialize.toast($scope.DbModel, 2000);
        $("#ContainerDBSelect").addClass('animated zoomOutDown').delay(500).queue(function(next){
            next();
        });
        $location.path('/table');
    }

});

 app.controller('sectionTableController', function($scope){
     $scope.addTable = function(){
         var newTable = $scope.newTable.trim();
         if (!newTable.length) {
             // avoid void table
             return;
         }
         $scope.tables.push({
             title: newTable
         });

         $scope.newTable = "";
     };
});


app.controller('sectionListTables', function($scope){

    $scope.removeTable = function (table) {
        $scope.tables.splice($scope.tables.indexOf(table), 1);
    };
});