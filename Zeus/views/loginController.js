(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', function ($scope,$log,$filter) {
            console.log($log);
            $log.log("This is log");
            $log.info("This is information");
            $log.warn("Wanrinig");
            $log.debug("Debug inforamtion");
            $log.error("This is error");
            $scope.LoginResult = 'None';

            $scope.login = function() {
                $scope.LoginResult = 'Button works ' + $scope.username;

            };

            $scope.password = '';

            $scope.lowerCasepass = function () {
                return $filter('uppercase')($scope.password);
            };
        });
})();