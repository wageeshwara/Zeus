(function () {
    'use strict';
    angular
        .module('app')
        .controller('CartController', ['$scope', '$cookies','$http','$log','$localStorage', function ($scope, $cookies,$http,$log,$localStorage) {

        $scope.products = productsData;
        $scope.cart = [];
        $scope.total = 0;
        var productsData;
        //$log.info($scope.cart);
        /*
          if ($cookieStore.get('cart') !== null) {
                      $scope.cart =  $cookieStore.get('cart');
          }
          */

        $http.get('/api/addProduct')
            .then(function successCallback(data) {
                //$log.info(data.data);
                $scope.products = data.data;
                //$log.info($scope.products);
            }, function errorCallback(data) {
                $log.error('Error: ' + data);
            });

        if (!angular.isUndefined($cookies.get('total'))) {
            $scope.total = parseFloat($cookies.get('total'));
        }
        //Sepetimiz daha önceden tanımlıysa onu çekelim
        if (!angular.isUndefined($cookies.get('cart'))) {
            $scope.cart = $cookies.getObject('cart');
            //$log.info($scope.cart);
        }

        $scope.addItemToCart = function (product) {

            if ($scope.cart.length === 0) {
                product.count = 1;
                $scope.cart.push(product);
            } else {
                var repeat = false;
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].id === product.id) {
                        repeat = true;
                        $scope.cart[i].count += 1;
                    }
                }
                if (!repeat) {
                    product.count = 1;
                    $scope.cart.push(product);
                }
            }
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
            $scope.cart = $cookies.getObject('cart');

            $scope.total += parseFloat(product.price);
            $cookies.put('total', $scope.total, { 'expires': expireDate });
        };

        $scope.removeItemCart = function (product) {

            if (product.count > 1) {
                product.count -= 1;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                $scope.cart = $cookies.getObject('cart');
            }
            else if (product.count === 1) {
                var index = $scope.cart.indexOf(product);
                $scope.cart.splice(index, 1);
                expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                $scope.cart = $cookies.getObject('cart');

            }

            $scope.total -= parseFloat(product.price);
            $cookies.put('total', $scope.total, { 'expires': expireDate });

        };

        $scope.order = function () {
            
            var oderData = [];
            oderData[0] = getUserFromToken();
            oderData[1] = $scope.cart;
            $log.info(JSON.stringify(oderData));
            $http.post('/api/order', JSON.stringify(oderData))
                .then(function successCallback(data) {
                    $log.info(data);
                }, function errorCallback(data) {
                    $log.error('Error: ' + data);
                })
        };


        $scope.cartRepopulate = function () {
            if (!angular.isUndefined($cookies.get('total'))) {
                $scope.total = parseFloat($cookies.get('total'));
                //$log.info($scope.total);
            }
            //Sepetimiz daha önceden tanımlıysa onu çekelim
            if (!angular.isUndefined($cookies.get('cart'))) {
                $scope.cart = $cookies.getObject('cart');
              //  $log.info($scope.cart);
            }
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

    }]);

    //var productsData = [{
    //    id: 1,
    //    name: 'product1',
    //    price: 100.0,
    //    image: ''
    //}, {
    //        id: 2,
    //        name: 'product2',
    //        price: 14.5,
    //        image: ''
    //    }, {
    //        id: 3,
    //        name: 'product3',
    //        price: 100.43,
    //        image: ''
    //    }, {
    //        id: 4,
    //        name: 'product4',
    //        price: 99.9,
    //        image: ''
    //    }];

     

        

})();