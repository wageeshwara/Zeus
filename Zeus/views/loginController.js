var scotchTodo = angular.module('scotchTodo', []);
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', function ($scope,$log,$filter,$http) {
            console.log($log);
            //$log.log("This is log");
            //$log.info("This is information");
            //$log.warn("Wanrinig");
           // $log.debug("Debug inforamtion");
            //$log.error("This is error");
            //$scope.LoginResult = 'None';

            $scope.login = function () {
                //$scope.LoginResult = "This works"
                //$scope.createTodo = function () {
                $http.post('/api/todos', $scope.username)
                    .then(function successCallback(data) {
                        $scope.username = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data;
                        $log.debug(data);

                    }, function errorCallback(data) {
                        $log.error('Error: ' + data); 
                    });
                        //.error(function (data) {
                          //  console.log('Error: ' + data);
                        //});
            };

            $scope.password = '';

            $scope.lowerCasepass = function () {
                return $filter('uppercase')($scope.password);
            };
        });
})();