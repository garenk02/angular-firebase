'use strict';

angular.module('webApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if($scope.username){
		$location.path('/welcome');
	}
	
	$scope.signUp = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;

		if(username && password) {
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(username, password).then(function(){
				console.log("User Successfully Created");
				$scope.errMsg = false;
				$location.path('/home');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			})
		}
	}
}])