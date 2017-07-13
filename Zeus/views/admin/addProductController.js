(function () {
    'use strict';
    angular
        .module('app')
        .controller('AddProductController', ['$scope', '$http', '$log', function ($scope, $http, $log) {

            $scope.save = function () {

                if ($scope.productId != 'undefined' || $scope.name != 'undefined' || $scope.price != 'undefined' || $scope.quantity != 'undefined') {
                    $log.info("addproduct");
                    $http.post('/api/addProduct', $scope.product)
                        .then(function successCallback(data) {
                            $scope.product = {}; 
                            $log.info(data);
                            if (data.data.success) {
                                $log.info(data);
                               // $location.path('/login');
                            } else {
                                $scope.saveFail = true;
                                $scope.description = data.data.message;
                            }

                        }, function errorCallback(data) {
                            $log.error('Error: ' + data);
                        });
                }
            };

        }]);
})();