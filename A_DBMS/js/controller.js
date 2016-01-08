/**
 * Created by JOCLAR on 10/12/2015.
 */

//MainController
app.controller('mainController', function ($scope, $location, localStorageDataProvider) {
    $scope.tables = [];
    $scope.table = {
        name: "",
        columns: [],
        pkIsDefined: false
    };
    $scope.columns = [];
    $scope.column = {
        idC: 0,
        title: "",
        type: "",
        pk: false,
        fk: {}
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

    $scope.tablePK = [];

    //Init variable
    $scope.DisplayParallax = true;
    $scope.tableName = "";

    //localStorageDataProvider.getLocalStorageTables();

    $scope.clearAllData = function () {
        Materialize.toast("Clearing data...", 2000);
        localStorage.clear();
        $scope.tablePK = [];
        $scope.tables = [];
        $location.path('/table');
    }
});

//Parallax controller
app.controller('sectionParallaxController', function ($scope, $location) {
    $scope.Launcher = function () {
        Materialize.toast("Enjoy !", 2000);
        $("#ParallaxContainer").addClass('animated bounceOut').delay(2000).queue(function (next) {
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
        $scope.tablePK = $scope.tablePK.filter(function(el){
            return el.PKtable != table.title;
        });

        $("#ContainerTableSelect").addClass('animated fadeOutLeft').delay(2000).queue(function (next) {
            next();
        });
        $location.path('/edit/' + table.title);
    };

    $scope.clearAllTables = function () {
        if (confirm("Sure to delete all tables ?")) {
            localStorageDataProvider.removeAllTables();
            $scope.tables = [];
            $scope.tablePK = [];
            $location.path('/table');
        }

    }

});

app.controller('sectionEditTablesController', function ($scope, $location, $routeParams, localStorageDataProvider) {

    var tableRecup = {};

    //récupération du nom de la table passée en url
    $scope.tableName = $routeParams.nomTable;
    tableRecup = localStorageDataProvider.getTable($scope.tableName);

    //Recup Data
    if (tableRecup.name === undefined) {
        $scope.columns = [];
        $scope.column = {};
    }
    else {
        $scope.table = tableRecup;
        $scope.columns = $scope.table.columns;
    }

    function saveColumn(){
        Materialize.toast("Saving Table...", 2000);

        $scope.table.name = $scope.tableName;
        $scope.table.columns = $scope.columns;

        localStorage.setItem($scope.tableName, JSON.stringify($scope.table));

        $scope.table = {};
    };

    $scope.addColumn = function () {
        if (!$scope.column.title) {
            Materialize.toast("Column Name is void !", 2000);
            return;
        }
        else if (!$scope.column.type) {
            Materialize.toast("Column type is void !", 2000);
            return;
        }
        Materialize.toast("Adding Column...", 2000);

        $scope.columns.push({
            idC: Object.keys($scope.columns).length,
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

    $scope.delColumn = function (col) {
        $scope.columns.splice($scope.columns.indexOf(col), 1);
    };

    $scope.checkPk = function (col) {

        if ( $scope.columns[col].pk) {
            $scope.tablePK.push({
                PKtable: $scope.tableName,
                PKcolumn: $scope.columns[col].title
            });
        }
        else {
            for (var i =0; i < $scope.tablePK.length; i++)
                if ($scope.tablePK[i].PKcolumn === $scope.columns[col].title) {
                    $scope.tablePK.splice(i,1);
                    break;
                }
        }
    };

    $scope.returnToListTables = function () {
        $location.path('/table');
    };

    $scope.nextTable = function(currentTable){
        saveColumn();

        var nameTab = "";
        for (var i =0; i < $scope.tables.length; i++) {
            if ($scope.tables[i].title === currentTable) {
                //Next table to edit -> indice i+1
                if(i == $scope.tables.length - 1){
                    nameTab = $scope.tables[0].title;
                }
                else {
                    nameTab = $scope.tables[i + 1].title;
                }
                break;
            }
        }



        $("#ContainerTableSelect").addClass('animated fadeOutLeft').delay(2000).queue(function (next) {
            next();
        });
        $location.path('/edit/' + nameTab);
    };

    $scope.previousTable = function(currentTable){
        saveColumn();

        var nameTab = "";
        for (var i =0; i < $scope.tables.length; i++) {
            if ($scope.tables[i].title === currentTable) {
                if(i == 0){
                    nameTab = $scope.tables[$scope.tables.length - 1].title;
                }
                else {
                    nameTab = $scope.tables[i - 1].title;
                }
                break;
            }
        }


        $("#ContainerTableSelect").addClass('animated fadeOutLeft').delay(2000).queue(function (next) {
            next();
        });
        $location.path('/edit/' + nameTab);
    };


});