'use strict';

angular.module('webApp.addPost', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AddPostCtrl'
	});
}])

.controller('AddPostCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);
	$scope.createPost = function(){
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		$scope.articles.$add({
			title: title,
			post: post
		}).then(function(ref){
			// console.log(ref);
			$scope.$reset;
			$location.path('/welcome/').search({success:'true'});
		}), function(error){
			console.log(error);
		}
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}])