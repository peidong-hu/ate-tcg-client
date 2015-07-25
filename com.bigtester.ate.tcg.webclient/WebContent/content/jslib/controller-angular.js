var app1 = angular.module('javafxwebdemo', []);

app1.directive('ngReplace', function() {
	  return {
	    restrict: 'A',
	    link: function (scope, iElement, iAttrs) {

	    	var svg = angular.element(scope.message);
	    	 iElement.append(svg);
	        },
	    template: '<div ><h4>Weather for {{message}}</h4></div>'
	  }
	});
app1.controller('JavaFXWebDemoController', function($scope, $http) {

	// fruits
	$scope.fruits = [ "loading..." ];
	angular.element(document).ready(function() {
		$scope.update();
	});

	$scope.update = function() {
		$scope.fruits = [ "loading..." ];

		// fruitsService.loadFruits(function(data){
		// $scope.fruits = data;
		// $scope.$apply();
		// });
	}

	// calculator
	$scope.number1 = 0;
	$scope.number2 = 2;

	$scope.sum = function() {
		return calculatorService.sum($scope.number1, $scope.number2);
	}
	$scope.launchBrowser = function() {
		browserService.launchUserHomepage();
	}
	$scope.launchFireBug = function() {
		$scope.addDomAsyncAsJSON();
	}
	$scope.addDomAsyncAsJSON = function(){		
		// Writing it to the server
		//
		var dom = {
				content: window.parent.document.documentElement.outerHTML
		}
		var dataObj = document;	
		var req = {
				 method: 'POST',
				 url: 'http://172.16.173.132:8080/com.bigtester.ate.tcg/greeting3',
//				 data: {content: document.documentElement.innerHTML}
				 headers: {'Content-Type': 'application/json'},
				 data: JSON.stringify(dom)
		
				}
		var req2 = {
				 method: 'GET',
				 url: 'http://172.16.173.132:8080/com.bigtester.ate.tcg/greeting4',
//				 data: {content: document.documentElement.innerHTML}
//				 data: {content: 'eidkdidkdkdkddkkdkdkdkdkdkdk'},
//		headers: {'Content-Type': 'application/json'}
				}

		$http.post('http://172.16.173.132:8080/com.bigtester.ate.tcg/greeting3',dom).success(function(data, status, headers, config) {
			$scope.fruits = [data.content, 'hello'];
			$scope.apply();
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		
	};      
});
