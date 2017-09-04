(function() {
    var MainApp = angular.module('MainApp', ['ngDialog', 'StaticServices']);

    var mainController = MainApp.controller('MainController', function ($scope, ngDialog, HttpRequest) {
        $scope.sourcePath = '';
        $scope.destinationPath = '';
        $scope.started = false;

        $scope.IsSelected = function () {
            return '' !== $scope.sourcePath && '' !== $scope.destinationPath;
        };

        $scope.startListen = function () {
            return HttpRequest({
                method: 'POST',
                url: '/start-listening',
                data: {
                    sourcePath: $scope.sourcePath,
                    destinationPath: $scope.destinationPath
                }
            }).then(
                function (data) {
                    $scope.started = true;
                }
            )
        };

        $scope.StopListen = function () {
            return HttpRequest({
                method: 'GET',
                url: '/stop-listening'
            }).then(
                function (data) {
                    $scope.started = false;
                }
            )
        }
    })
}());