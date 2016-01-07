/**
 * Created by JOCLAR on 30/12/2015.
 */
'use strict'

app.factory('localStorageDataProvider', function () {
    return {
        //Get all tables in the local storage
        getLocalStorageTables: function () {
            var lsTables = [];
            var lsTable = {};

            for(var i=0; i<localStorage.length;  i++) {
                var name = localStorage.key(i);
                var columns = localStorage[name];
                var pkIsDefined = localStorage[pkIsDefined];
                lsTable.name = name;
                lsTable.colums = columns;
                lsTable.pkIsDefined =
                lsTables.push(lsTable);
            }

            return 0;
        },

        getTable: function(tableNom){
            var table= {};

            if(localStorage.getItem(tableNom) != null) {
                table = JSON.parse(localStorage.getItem(tableNom));
            }
            return table;
        },

        removeAllTables: function(){
            localStorage.clear();
        },

        removeTable: function (tableNom){
            localStorage.removeItem(tableNom);

        }


    };
});
