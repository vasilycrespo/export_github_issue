var app = angular.module('myExporter', []);

app.controller("exportCtrl", function($scope, $http, $timeout){

	$scope.user;
	$scope.repo;

	$scope.export = function () {


		console.log($scope.repo);
		if ($scope.repo && $scope.user) {
			$scope.load = true;
			$http({
			  method: 'GET',
			  url: 'https://api.github.com/repos/' + $scope.user + '/' + $scope.repo + '/issues'
			}).then(function successCallback(response) {
				$scope.load = false;
				console.log(response.data);
				$scope.output = response.data;
			}, function errorCallback(response) {
				$scope.load = false;
			    alert("An error ocurred when tying to connect to github");
			});
		} else {
			alert("Writre user and repo.")
		}
	};


});