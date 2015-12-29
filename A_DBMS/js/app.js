/**
 * Created by JOCLAR on 10/12/2015.
 */
'use strict'
var app = angular.module('myApp',['ngRoute']);


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
            .when('/index', {
                templateUrl: 'partials/section-parallax.html',
                controller: 'sectionParallaxController'
            })
            .when('/edit/:nomTable', {
                templateUrl: 'partials/section-editTable.html',
                controller: 'sectionEditTablesController'
            })
            .otherwise({
            redirectTo: '/index'
            });
    }
]);

