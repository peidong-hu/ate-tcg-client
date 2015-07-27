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
		//return calculatorService.sum($scope.number1, $scope.number2);
	}
	/*$scope.launchBrowser = function() {
		browserService.launchUserHomepage();
	}
	$scope.launchFireBug = function() {
		$scope.addDomAsyncAsJSON();
	}*/
	$scope.preprocessing = function(){
		// Writing it to the server
		//
		//add markers for invisible elements. so server can exclude them from processing.
		var hiddenElements = $( "body", window.parent.document ).find( ":hidden" ).not( "script" );
		for (hiddenIndex = 0; hiddenIndex < hiddenElements.length; hiddenIndex ++) {
			hiddenElements[hiddenIndex].setAttribute("ate-invisible","yes")
		}
		var dom = {
				content: window.parent.document.documentElement.outerHTML
		}
		var dataObj = document;	
		var req = {
				 method: 'POST',
				 url: 'http://localhost:9080/com.bigtester.ate.tcg/preprocessing',
//				 data: {content: document.documentElement.innerHTML}
				 headers: {'Content-Type': 'application/json'},
				 data: dom
		
				}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = [{inputLabelName: data.content, inputMLHtmlCode: data.content}];
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		
	};

	$scope.predict = function(){
		// Writing it to the server
		//
		//add markers for invisible elements. so server can exclude them from processing.

		var req = {
			method: 'GET',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/predict',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},


		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = data;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	};
});
