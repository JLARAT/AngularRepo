/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope) {
    $scope.tables = [];
    $scope.columns = [{
        title: "testTitle",
        type: "int"
    }, {
        title: "test2",
        type: "int"
    }];

    $scope.filterCondition={
        operator: '2'
    }

    $scope.types = [{
        id:"1",
        title:"int"
    },
        {
           id:"2",
            title:"varchar"
        },
        {
            id:"3",
            title:"bool"
        }];



    //Init variable
    $scope.DisplayParallax = true;


});

//Parallax controller
app.controller('sectionParallaxController', function ($scope, $location) {

    $scope.Launcher = function () {
        Materialize.toast("Enjoy !", 2000);
        $("#ParallaxContainer").addClass('animated bounceOut').delay(1000).queue(function (next) {
            next();
        });
        $location.path('/bdd');

    };
});


//Section Controllers
app.controller('sectionBddController', function ($scope, $location) {
    $scope.DbModel = "";

    $scope.NextStep = function () {
        Materialize.toast($scope.DbModel, 2000);
        $("#ContainerDBSelect").addClass('animated zoomOutDown').delay(1000).queue(function (next) {
            next();
        });
        $location.path('/table');
    }

});

app.controller('sectionTableController', function ($scope) {
    $scope.addTable = function () {
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


    //ENTER Press
    $scope.keypressHandler = function ($event) {
        if ($event.keyCode == 13) {
            Materialize.toast("Adding Table...", 2000);
            $scope.addTable();
        }
    };
});

//Directive
app.controller('sectionListTables', function ($scope, $location) {

    $scope.removeTable = function (table) {
        $scope.tables.splice($scope.tables.indexOf(table), 1);
    };


    $scope.editTable = function (table) {
        $("#ContainerTableSelect").addClass('animated fadeOutLeft').delay(1000).queue(function (next) {
            next();
        });
        $location.path('/edit');
    };
});

app.controller('sectionEditTablesController', function ($scope) {

    $('select').material_select();

    $scope.addColumn = function (column) {
        $scope.columns.push(column);
        $scope.columns = {};
    };

    $scope.keypressHandler = function ($event) {
        if ($event.keyCode == 13) {
            Materialize.toast("Adding Column...", 2000);
            $scope.addColumn();
        }
    };

});