(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', function ($scope, $log, $http) {
            console.log($log);
            $log.info("First");
            
            $scope.register = function () {
                $log.info("After button click");
                $http.post('/api/create_user', $scope.user)
                    .then(function successCallback(data) {
                        $scope.user = {}; // clear the form so our user is ready to enter another
                       // $scope.todos = data;
                        $log.info(data);

                    }, function errorCallback(data) {
                        $log.error('Error: ' + data);
                    });
            };

        });
})();