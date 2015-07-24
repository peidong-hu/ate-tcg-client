var app = angular.module('javafxwebdemo', []);

//app.directive('panel-body', function() {
//    
//	  return {
//	    restrict: "C",    
//
//	    link: function(scope, elem, attrs) {
//	    	var launchButton = elem.find("#launchButton");
//	        launchButton.bind("onmouseover",function(){
//	            elem.find("#stopButton");
//	        })
//	    }
//	  };
//	});

app.controller('JavaFXWebDemoController', function($scope) {

// angular.element(document).ready(function() {
// angular.element("launchButton").enable();
// angular.element("stopButton").disable();
// angular.element("injectButton").disable();
// });
// angular.element("launchButton").afterClick(function() {
// angular.element("stopButton").enable();
// angular.element("injectButton").enable();
// });
//
// angular.element("stopButton").afterClick(function() {
// angular.element("launchButton").enable();
// angular.element("injectButton").disable();
// });
// angular.element("injectButton").afterClick(function() {
// angular.element("launchButton").disable();
// angular.element("stopButton").enable();
// });

	// calculator
	$scope.number1 = "Firefox";
	$scope.number2 = "http://www.bigtester.com";
	$scope.homepageLaunched = false;

	// $scope.sum=function() {
	// return calculatorService.sum($scope.number1, $scope.number2);
	// }
	$scope.launchBrowser = function() {
		$scope.homepageLaunched = browserService.launchUserHomepage2($scope.number2);
		
	}
	$scope.launchFireBug = function() {
		browserService.launchFireBug();
	}

// $scope.injectSuccess = function() {
// angular.element("stopButton").enable();
// angular.element("injectButton").enable();
// }
//	
	$scope.stopBrowser = function() {
		browserService.stopBrowser();
	}

});
