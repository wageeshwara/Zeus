var scotchTodo = angular.module('scotchTodo', []);
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', function ($scope, $log, $filter, $http, $location, $localStorage) {
            //console.log($log);
            //$log.log("This is log");
            //$log.info("This is information");
            //$log.warn("Wanrinig");
           // $log.debug("Debug inforamtion");
            //$log.error("This is error");
            $scope.loginFail = false;
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

            

            $scope.lowerCasepass = function () {
                return $filter('uppercase')($scope.password);
            };
        });
})();