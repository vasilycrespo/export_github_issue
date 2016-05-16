var app = angular.module('myExporter', []);

app.controller("exportCtrl", function($scope, $http, $timeout){
	var filter = "";

	$scope.done = false;
	$scope.assignee = "all";
	$scope.user;
	$scope.repo;

	$scope.export = function () {
		$scope.done = false;
		switch($scope.assignee) {
		    case "all":
		        break;
		    case "unassigned":
		    	filter = '?assignee=none';
		        break;
		    case "somebody":
		    	filter = '?assignee=*';
		        break;
		    case "to":
		    	if(!$scope.assignedUser) {
		    		alert("Write and assigneed user to filter with");
		    		return;
		    	}
		    	filter = '?assignee='+$scope.assignedUser;
		        break;
		}
		if ($scope.repo && $scope.user) {
			$scope.load = true;
			$http({
			  method: 'GET',
			  url: 'https://api.github.com/repos/' + $scope.user + '/' + $scope.repo + '/issues' + filter,
			}).then(function successCallback(response) {
				$scope.done = true;
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