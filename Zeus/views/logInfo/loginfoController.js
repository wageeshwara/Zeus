var scotchTodo = angular.module('scotchTodo', []);
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginInfoController', function ($scope, $log, $filter, $http, $location, $localStorage) {

            if ( $localStorage.token != undefined || $localStorage.token != null) {
                $scope.username = getUserFromToken()._doc.firstname;
            }
            //$log.info(getUserFromToken()._doc.firstname);

            $scope.logout = function () {
                $localStorage.token = null;
                $log.info($localStorage);
                $location.path('/');
                };

            $scope.login = function () {
                $http.post('/api/authenticate', $scope.username)
                    .then(function successCallback(data) {
                        $scope.username = {}; // clear the form so our user is ready to enter another
                        $localStorage.token = data.data.token;
                        if (data.data.success) {
                            //$log.info(data);
                            $location.path('/');
                        } else {
                            $scope.loginFail = true;
                            $scope.description = data.data.message;
                        }
                    }, function errorCallback(data) {
                        $log.error('Error: ' + data);
                    });
            };

            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            function getUserFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));

                }
                return user;
            }

        });
})();