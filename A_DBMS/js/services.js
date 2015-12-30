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
                console.log(name + " => " + columns);
            }

            return 0;
        }


    };
});