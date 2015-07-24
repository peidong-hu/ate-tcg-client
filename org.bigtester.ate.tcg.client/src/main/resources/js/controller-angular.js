var app = angular.module('javafxwebdemo', []);

app.controller('JavaFXWebDemoController', function($scope) {

//	angular.element(document).ready(function() {
//		angular.element("launchButton").enable();
//		angular.element("stopButton").disable();
//		angular.element("injectButton").disable();
//	});
//	angular.element("launchButton").afterClick(function() {
//		angular.element("stopButton").enable();
//		angular.element("injectButton").enable();
//	});
//
//	angular.element("stopButton").afterClick(function() {
//		angular.element("launchButton").enable();
//		angular.element("injectButton").disable();
//	});
//	angular.element("injectButton").afterClick(function() {
//		angular.element("launchButton").disable();
//		angular.element("stopButton").enable();
//	});

	// calculator
	$scope.number1 = "Firefox";
	$scope.number2 = "www.bigtester.com";

	// $scope.sum=function() {
	// return calculatorService.sum($scope.number1, $scope.number2);
	// }
	$scope.launchBrowser = function() {
		$scope.number1 = browserService.launchUserHomepage2($scope.number2);
//		alert(retVal);
	}
	$scope.launchFireBug = function() {
		browserService.launchFireBug();
	}
	$scope.stopBrowser = function() {
		browserService.stopBrowser();
	}

});
