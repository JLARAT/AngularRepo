/**
 * Created by JOCLAR on 10/12/2015.
 */
'use strict'
var app = angular.module('myApp',['ngRoute','routeAppControllers']);
var routeAppControllers = angular.module('routeAppControllers', []);

app.config(['$routeProvider',
    function($routeProvider) {

        //Routage
        $routeProvider
            .when('/bdd', {
                templateUrl: 'partials/section-bdd.html',
                controller: 'sectionBddController'
            })
            .when('/table', {
                templateUrl: 'partials/section-table.html',
                controller: 'sectionTableController'
            })
            .otherwise({
            redirectTo: '/bdd'
            });
    }
]);

