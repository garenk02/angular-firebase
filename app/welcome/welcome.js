'use strict';

angular.module('webApp.welcome', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$location','$routeParams', function($scope,CommonProp,$firebaseArray,$firebaseObject,$location,$routeParams){
	
	$scope.username = CommonProp.getUser();
	if(!$scope.username){
		$location.path('/home');
	}
	
	$scope.success = false;
	if($routeParams.success){
		$scope.success = true;
		window.setTimeout(function(){
			$scope.$apply(function(){
				$scope.success = false;
			});
		}, 3000);
	}

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);
	
	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('Articles/'+id);
		$scope.editPostData = $firebaseObject(ref);
		// console.log($scope.editPostData);
	}

	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('Articles/'+id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post
		}).then(function(ref){
			$("#editModal").modal('hide');
		}), function(error){
			console.log(error);
		}
	}

	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	}

	$scope.deletePost = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal("hide");
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}])

.filter('reverse', function() {
  	function toArray(list) {
     	var k, out = [];
     	if( list ) {
        	if( angular.isArray(list) ) {
           		out = list;
        	}
        	else if( typeof(list) === 'object' ) {
           		for (k in list) {
              		if (list.hasOwnProperty(k)) { out.push(list[k]); }
           		}
        	}
     	}
     	return out;
  	}
  	return function(items) {
    	return toArray(items).slice().reverse();
  	};
});