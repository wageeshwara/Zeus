(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', function ($scope, $log, $http) {
            $scope.register = function () {
                
                if ($scope.firstname != 'undefined' || $scope.secondname != 'undefined' || $scope.password != 'undefined' || $scope.email != 'undefined') {
                    $log.info("register");
                    $http.post('/api/create_user', $scope.user)
                        .then(function successCallback(data) {
                            $scope.user = {}; // clear the form so our user is ready to enter another
                            $log.info(data);
                            if (data.data.success) {
                                //$log.info(data);
                                $location.path('/login');
                            } else {
                                $scope.regFail = true;
                                $scope.description = data.data.message;
                            }

                        }, function errorCallback(data) {
                            $log.error('Error: ' + data);
                        });
                }
            };

        });
})();