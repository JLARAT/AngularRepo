/**
 * Created by JOCLAR on 11/12/2015.
 */
app.directive('sectionBdd', function(){
    return {
        restrict: 'E',
        controller: 'sectionBddController',
        templateUrl: 'partials/section-bdd.html'
    };
});

app.directive('sectionTable', function(){
    return {
        restrict: 'E',
        controller: 'sectionTableController',
        templateUrl: 'partials/section-table.html'
    };
});