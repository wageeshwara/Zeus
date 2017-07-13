(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngStorage'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
    function config($routeProvider, $locationProvider,$httpProvider) {
        $routeProvider

            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/homeView.html',
                controllerAs: 'vm'
            })


            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'UserController',
                templateUrl: 'User_registration.html',
                controllerAs: 'vm'
            })

            .when('/cart', {
                controller: 'CartController',
                templateUrl: 'cart/cartView.html',
                controllerAs: 'vm'
            })

            .when('/product', {
                controller: 'ProductController',
                templateUrl: 'product/productView.html',
                controllerAs: 'vm'
            })

            .when('/admin', {
                controller: 'AddProductController',
                templateUrl: 'admin/addProductView.html',
                controllerAs: 'vm'
            })


            .otherwise({ redirectTo: '/login' });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$localStorage'];
    function run($rootScope, $location, $cookieStore, $http, $localStorage) {

        
         // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            //var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            //var loggedIn = $rootScope.globals.currentUser;
            //if (restrictedPage && !loggedIn) {
            //    $location.path('/');
            //}
        });
    }
})();