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
		$scope.$apply();
		// fruitsService.loadFruits(function(data){
		// $scope.fruits = data;
		// $scope.$apply();
		// });
	}

	// calculator
	$scope.number1 = 0;
	$scope.number2 = 2;
	$scope.testSuiteName= "JobApplication";
	$scope.testCaseName = "QuickApply";

	$scope.sum = function() {
		//return calculatorService.sum($scope.number1, $scope.number2);
	}

	$scope.injectProcessor = function(){
		sendObjectToInspectedPage({action: "script", content: "messageback-jquery-existence.js"});
	}

	$scope.preprocessing = function(){
		var req = {
				 method: 'POST',
				 url: 'http://localhost:9080/com.bigtester.ate.tcg/preprocessing',
				 headers: {'Content-Type': 'application/json'},
				 data: ate_global_page_documents

		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = data;
			var offset = $scope.fruits.length;
			for (var i = 0; i<ate_global_all_clickables.length; i++) {
				$scope.fruits[offset + i] = {inputLabelName: "", inputMLHtmlCode: ate_global_all_clickables[i].clickable};
			}
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		
	};

	$scope.saveIntermediateResult = function() {
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/saveIntermediateResult',
			headers: {'Content-Type': 'application/json'},
			data: {uitrs: $scope.fruits, domStrings: ate_global_page_documents}
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits.length = 0;
			$scope.fruits[0] = {inputLabelName: "SaveResult", inputMLHtmlCode: data.toString()};
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
	$scope.pioPredict = function(){
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/pioPredict',
			headers: {'Content-Type': 'application/json'},
			data: $scope.fruits
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = data;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	};
	$scope.trainIntoPIO = function(){
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/trainIntoPIO',
			headers: {'Content-Type': 'application/json'},
			data: $scope.fruits
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = data;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	};
	$scope.predict = function(){
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
