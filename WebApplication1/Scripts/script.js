var app = angular.module("myApp",[]);

app.controller("mainController", ['$scope', '$http', '$interval', '$anchorScroll', '$location', function ($scope, $http, $interval,$anchorScroll,$location) {
    $scope.message = "Github Details!";
    $scope.countdown = 5;

    var onRepos = function (response) {
        $scope.repos = response.data;
        $location.hash("showEle");
        $anchorScroll();
    };

    var onUserComplete = function (response) {
        $scope.user = response.data;
        $http.get($scope.user.repos_url).then(onRepos,onError);
    };
    var countinterval = null;
    $scope.startCount = function () {
       countinterval = $interval(decCount, 1000, $scope.countdown);
    };

    var onError = function (reason) {
        $scope.error = "could not find the data";
    };

    var decCount = function () {
        $scope.countdown -= 1;
        if ($scope.countdown < 1) {
            $scope.search($scope.username);
        };
    };

    $scope.repoSort = "+name";

    $scope.search = function (username) {
        $http.get("https://api.github.com/users/"+username)              //since username is a model, don't need to pass it seperately
            .then(onUserComplete, onError);
        if (countinterval) {
            $interval.cancel(countinterval);
            $scope.countdown = null;
        };
    };

   

   
    $scope.username = "angular"
    
    
    //$scope.person = person;
}]);
