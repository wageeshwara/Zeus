var scotchTodo = angular.module('scotchTodo', []);
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', function ($scope, $log, $filter, $http, $localStorage) {



            $scope.rowLen = 3
            $scope.maxProduct = 6
            $scope.username = getUserFromToken()._doc.username;
            $log.info(getUserFromToken()._doc.username);
          
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

            $http.get('/api/addProduct')
                .then(function successCallback(data) {
                    //$log.info(data.data);
                    $scope.products = data.data;
                    //$log.info($scope.products);
                }, function errorCallback(data) {
                    $log.error('Error: ' + data);
                });
        });
})();