/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope, localStorageDataProvider) {
    $scope.tables = [];
    $scope.table = {
        name: "",
        columns: []
    };
    $scope.columns = [
        {
            idDel : 1,
            idPk : 100,
            title: "testTitle",
            type: "int",
            pk: false,
            del:false
        },
        {
            idDel: 2,
            idPk: 200,
            title: "test2",
            type: "varchar",
            pk: true,
            del:false
        },
        {
            idDel: 3,
            idPk: 300,
            title: "test3",
            type: "int",
            pk: false,
            del:false
        }];


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

    localStorageDataProvider.getLocalStorageTables();

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
        $location.path('/edit/'+table.title);
    };
});

app.controller('sectionEditTablesController', function ($scope, $location, $routeParams) {

    $('select').material_select();

    //récupération du nom de la table passée en url
    $scope.tableName = $routeParams.nomTable;

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

        console.log($scope.tableName, JSON.parse(localStorage.getItem($scope.tableName)));

        $scope.table = {};
    };

});