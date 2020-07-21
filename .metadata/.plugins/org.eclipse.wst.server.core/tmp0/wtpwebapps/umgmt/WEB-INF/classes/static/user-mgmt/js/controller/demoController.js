DerivativeApp.controller('demoController', function($scope, $http) {
    $http.get('http://localhost:9191/demo/api/hello').
        then(function(response) {
            $scope.greeting = response;
			console.log('Hello : '+$scope.greeting+" "+response);
        });
});