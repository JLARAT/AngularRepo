/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope, $location, localStorageDataProvider) {
    $scope.tables = [];
    $scope.table = {
        name: "",
        columns: []
    };
    $scope.columns = [];

    $scope.column = {
        idDel : 0,
        idPk : 0,
        title: "",
        type: "",
        pk: false,
        del:false
    };

    $scope.types = [
        {
            id: "1",
            type: "int"
        },
        {
            id: "2",
            type: "varchar"
        },
        {
            id: "3",
            type: "bool"
        },
        {
            id: "4",
            type: "date"
        }];


    //Init variable
    $scope.DisplayParallax = true;
    $scope.tableName = "";

    //localStorageDataProvider.getLocalStorageTables();

    $scope.clearAllData = function(){
        localStorage.clear();
        $location.path('/table');
    }
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
app.controller('sectionListTables', function ($scope, $location, localStorageDataProvider) {

    $scope.removeTable = function (table) {
        localStorageDataProvider.removeTable(table.title);
        $scope.tables.splice($scope.tables.indexOf(table), 1);
    };

    $scope.editTable = function (table) {
        $("#ContainerTableSelect").addClass('animated fadeOutLeft').delay(1000).queue(function (next) {
            next();
        });
        $location.path('/edit/'+table.title);
    };

    $scope.clearAllTables = function(){
        if (confirm("Sure to delete all tables ?")) {
            localStorageDataProvider.removeAllTables();
                $scope.tables = [];
                $location.path('/table');
            }

    }

});

app.controller('sectionEditTablesController', function ($scope, $location, $routeParams, localStorageDataProvider) {

    var tableRecup = {};

    //récupération du nom de la table passée en url
    $scope.tableName = $routeParams.nomTable;

    tableRecup = localStorageDataProvider.getTable($scope.tableName);
    console.log("tableRecup : "+tableRecup.name);
    console.log("ls : "+JSON.parse(localStorage.getItem($scope.tableName)));


    if(tableRecup.name === undefined) {
        $scope.columns = [];
        $scope.column = {};
    }
    else{
        $scope.table = tableRecup;
        $scope.columns = $scope.table.columns;

    }

    $scope.addColumn = function () {
        if (!$scope.column.title) {
            // avoid void column
            Materialize.toast("Column Name is void !", 2000);
            return;
        }
        else if (!$scope.column.type) {
            // avoid void column
            Materialize.toast("Column type is void !", 2000);
            return;
        }
        Materialize.toast("Adding Column...", 2000);

        $scope.columns.push({
            idDel: Object.keys($scope.columns).length+1,
            idPk: (Object.keys($scope.columns).length+1)*100,
            title: $scope.column.title,
            type: $scope.column.type,
            pk: false
        });
        $scope.column = {};
    };

    $scope.keypressHandler = function ($event) {
        if ($event.keyCode == 13) {
            $scope.addColumn();
        }
    };

    $scope.clearColumns = function () {
        $scope.columns  = $scope.columns.filter(function (column) {
            return !column.del;
        });
    };

    $scope.checkPk = function(id){
        Materialize.toast("Changing Primary Key", 2000);
        for (var c in $scope.columns){
            if($scope.columns[c].idPk != id){$scope.columns[c].pk = false;}
        }
    };

    $scope.returnToListTables = function(){
        $location.path('/table');
    };

    $scope.saveTable = function(){
        Materialize.toast("Saving Table...", 2000);

        $scope.table = {
            name: $scope.tableName,
            columns: $scope.columns
        };

        localStorage.setItem($scope.tableName, JSON.stringify($scope.table));

        //console.log($scope.tableName, JSON.parse(localStorage.getItem($scope.tableName)));

        $scope.table = {};
    };

});