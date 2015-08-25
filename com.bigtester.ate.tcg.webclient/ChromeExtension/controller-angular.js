var app1 = angular.module('javafxwebdemo', ["ngTouch", "angucomplete-alt", "ngSanitize", "RecursionHelper"]);
app1.directive('clickAndDisable', function() {
	return {
		scope: {
			clickAndDisable: '&'
		},
		link: function(scope, iElement, iAttrs) {
			iElement.bind('click', function() {
				iElement.prop('disabled',true);
				scope.clickAndDisable().finally(function() {
					iElement.prop('disabled',false);
				})
			});
		}
	};
});

app1.directive('ngIndustryCategories', function() {
	return {
		restrict: "E",
		scope: {family: '='},
		template:
		'<p>{{ family.name }}{{test }}</p>'+
		'<ul>' +
		'<li ng-repeat="child in family.children">' +
		'<ngIndustryCategories family="child"></ngIndustryCategories>' +
		'</li>' +
		'</ul>',
		compile: function(element) {
			return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
				// Define your normal link function here.
				// Alternative: instead of passing a function,
				// you can also pass an object with
				// a 'pre'- and 'post'-link function.
			});
		}
	};
	});
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
app1.controller('JavaFXWebDemoController', function($scope, $sce, $http) {

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
	//$scope.searchStr = "";
	////alert(JSON.stringify(ate_global_page_context));

	$scope.testSuitesMap=[{suiteName: "JobApplication"},  {suiteName: "WebJobApplication"}];



	$scope.industryCategoriesMap=[{name: "HCM", code: "000000"},{name: "Recruitment"}];
	$scope.testCaseName = "QuickApply";

	$scope.sum = function() {
		//return calculatorService.sum($scope.number1, $scope.number2);
	}

	$scope.injectProcessor = function(){
		sendObjectToInspectedPage({action: "script", content: "messageback-jquery-existence.js"});
		/*$scope.$watch('ate_global_page_context', function() {
			$scope.screenUrl = ate_global_page_context.screenUrl;
			$scope.domainName = ate_global_page_context.domain;

		});
*/
		setTimeout(function() {
			//window.ate_global_page_context = {prop: "new value"};
			ate_global_page_context_Watch.trigger();
		}, 1000);
		}

	var unbind = ate_global_page_context_Watch.watch(function(newVal) {
		$scope.screenUrl = newVal.screenUrl;
		$scope.domainName = newVal.domain;
		$scope.update();
	});

	// Unbind the listener when the scope is destroyed
	$scope.$on('$destroy', unbind);

	$scope.addWebElement = function(){
		$scope.fruits.splice(0, 0, {inputLabelName: "", inputMLHtmlCode: ""});
	}
	$scope.removeRow = function(index) {
		$scope.fruits.splice($scope.fruits.indexOf(index), 1);
	}

	$scope.trustAsHtml = $sce.trustAsHtml;
	//$scope.html2canvas = html2canvas;
	//$scope.testVar = html2canvas("<div>test</div>")

	$scope.preprocessing = function(){
		var req = {
				 method: 'POST',
				 url: 'http://localhost:9080/com.bigtester.ate.tcg/preprocessing',
				 headers: {'Content-Type': 'application/json'},
				 //data: ate_global_page_documents
			data: ate_global_page_context.pages

		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits = data;
			$scope.pagePredict();
			//var offset = $scope.fruits.length;
			//for (var i = 0; i<ate_global_all_clickables.length; i++) {
			//	$scope.fruits[offset + i] = {inputLabelName: "", inputMLHtmlCode: ate_global_all_clickables[i].clickable};
				/*html2canvas(ate_global_all_clickables[i].clickable, {
						onrendered: function(canvas) {
							$scope.fruits[offset + i].snapshot = canvas.outerHtml;
						},
						width: 100,
						height: 30
					})*/
			//}
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		
	};

	$scope.pioResult2Npl = function(index) {
		$scope.fruits[index].inputLabelName = $scope.fruits[index].pioPredictLabelResult;
	}
	$scope.nplResult2Pio = function(index) {
		$scope.fruits[index].pioPredictLabelResult = $scope.fruits[index].inputLabelName;
	}
	$scope.saveIntermediateResult = function() {
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/saveIntermediateResult',
			headers: {'Content-Type': 'application/json'},
			//data: {uitrs: $scope.fruits, domStrings: ate_global_page_documents}
			data: {uitrs: $scope.fruits, domStrings: ate_global_page_context.pages,
				testSuitesMap: $scope.testSuitesMap, industryCategoriesMap: $scope.industryCategoriesMap,
				testCaseName:$scope.testCaseName, screenUrl: $scope.screenUrl,
				domainName: $scope.domainName, screenName: $scope.countrySelected14.originalObject.name
			}
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.fruits.length = 0;
			//$scope.fruits[0] = {inputLabelName: "SaveResult", inputMLHtmlCode: data.toString()};
			$scope.fruits = data.uitrs;
			ate_global_page_context.pages = data.domStrings;
			alert( "success!");
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
	$scope.pagePredict = function(){
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/pagePredict',
			headers: {'Content-Type': 'application/json'},
			data: ate_global_page_context.pages
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.countrySelected14 = Object.keys(data)[0];
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

	$scope.queryAllScreenNames = function() {
		var req = {
			method: 'GET',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/queryScreenNames',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},


		}
		$http(req).success(function(data, status, headers, config) {
			$scope.countries = data.screenNames;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
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



	//autocomplete

	$scope.remoteUrlRequestFn = function(str) {
		return {q: str};
	};

	$scope.countrySelected = function(selected) {
		window.alert('You have selected ' + selected.title);
	};

	$scope.people = [
		{firstName: "Daryl", surname: "Rowland", twitter: "@darylrowland", pic: "img/daryl.jpeg"},
		{firstName: "Alan", surname: "Partridge", twitter: "@alangpartridge", pic: "img/alanp.jpg"},
		{firstName: "Annie", surname: "Rowland", twitter: "@anklesannie", pic: "img/annie.jpg"}
	];

	$scope.countries = [
		{name: 'Afghanistan', code: 'AF'},
		{name: 'Aland Islands', code: 'AX'},
		{name: 'Albania', code: 'AL'},
		{name: 'Zimbabwe', code: 'ZW'}
	];
	$scope.queryAllScreenNames();
	$scope.countrySelected9 = {name: 'Zimbabwe', code: 'ZW'};
	$scope.countrySelectedFn9 = function(selected) {
		if (selected) {
			$scope.countrySelected9 = selected.originalObject;
		} else {
			$scope.countrySelected9 = null;
		}
	}

	$scope.inputChanged = function(str) {
		$scope.console10 = str;
	}

	$scope.focusState = 'None';
	$scope.focusIn = function() {
		var focusInputElem = document.getElementById('ex12_value');
		$scope.focusState = 'In';
		focusInputElem.classList.remove('small-input');
	}
	$scope.focusOut = function() {
		var focusInputElem = document.getElementById('ex12_value');
		$scope.focusState = 'Out';
		focusInputElem.classList.add('small-input');
	}

	$scope.disableInput = true;

});
