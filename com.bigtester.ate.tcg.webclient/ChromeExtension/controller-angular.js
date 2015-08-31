var app1 = angular.module('javafxwebdemo', ["ngTouch", "angucomplete-alt", "ngSanitize", "RecursionHelper", "ngStorage"]);
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
app1.controller('JavaFXWebDemoController', function($scope, $sce, $http, $localStorage) {

	// fruits
	$scope.fruits = {};
	angular.element(document).ready(function() {
		$scope.update();
	});
	$scope.$storage = $localStorage;

	$scope.update = function() {
		$scope.fruits = {};
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
		$scope.page_context = ate_global_page_context;

		$scope.update();
	});

	$scope.tmpUserValue = function(selected) {
		if (typeof selected != undefined)
		$scope.fruits[this.$parent.$index].userValues.push({value: selected.title});
	}
	$scope.tmpPioPredictLabelResult = function(selected) {
		if (typeof selected != undefined)
			$scope.fruits[this.$parent.$index].pioPredictLabelResult = {value: selected.title};
	}


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
		$scope.fruits[index].inputLabelName = $scope.fruits[index].pioPredictLabelResult.value;
	}
	$scope.nplResult2Pio = function(index) {
		$scope.fruits[index].pioPredictLabelResult.value = $scope.fruits[index].inputLabelName;
	}

	$scope.startNewRootScreenNode = function() {
		$localStorage.lastScreenNodeBk = {};
		$localStorage.lastScreenNode = {};
		//TODO refresh all the graph ids
		alert("next screen will be saved as independent node. Please don't forget fresh this page to clean up the graph ids.");
	}

	$scope.saveIntermediateResult = function() {
		var tmpScreenName;
		if (typeof $scope.countrySelected14.originalObject != 'undefined') tmpScreenName = $scope.countrySelected14.originalObject.name;
		else tmpScreenName = $scope.countrySelected14;
		var uitrs=[];
		var actionUitrs = [];
		for (ind = 0; ind < $scope.fruits.length; ind++) {
			if ($scope.fruits[ind].userInputType === "CLICKABLE") {
				actionUitrs.push($scope.fruits[ind]);
			} else {
				uitrs.push($scope.fruits[ind]);
			}
		}
		var req = {
			method: 'POST',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/saveIntermediateResult',
			headers: {'Content-Type': 'application/json'},
			//data: {uitrs: $scope.fruits, domStrings: ate_global_page_documents}
			data: {uitrs: uitrs, actionUitrs: actionUitrs, domStrings: ate_global_page_context.pages,
				testSuitesMap: $scope.testSuitesMap, industryCategoriesMap: $scope.industryCategoriesMap,
				testCaseName:$scope.testCaseName, screenUrl: $scope.screenUrl,
				domainName: $scope.domainName, screenName: tmpScreenName, lastScreenNodeIntermediateResult: $localStorage.lastScreenNodeBk
			}
		}
		$localStorage.lastScreenNode = req.data;

		$http(req).success(function(data, status, headers, config) {
			$scope.fruits.length = 0;
			//$scope.fruits[0] = {inputLabelName: "SaveResult", inputMLHtmlCode: data.toString()};
			$scope.fruits = data.uitrs.concat(data.actionUitrs);
			ate_global_page_context.pages = data.domStrings;
			$localStorage.lastScreenNodeBk = $localStorage.lastScreenNode;
			alert( "success!");
		}).error(function(data, status, headers, config) {
			$localStorage.lastScreenNode = $localStorage.lastScreenNodeBk;
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

	$scope.queryAllUserInputValues = function() {
		var req = {
			method: 'GET',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/queryUserInputValues',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.allUserValues = data.userValues;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
	$scope.queryPioPredictedFieldNames = function() {
		var req = {
			method: 'GET',
			url: 'http://localhost:9080/com.bigtester.ate.tcg/queryPioPredictedFieldNames',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.allFieldNames = data.fieldNames;
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
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


	$scope.countries = [
		{name: 'Homepage', code: 'AF'}
	];
	$scope.queryAllScreenNames();
	$scope.queryAllUserInputValues();
	$scope.queryPioPredictedFieldNames();
	//$scope.countrySelected9 = {name: 'Zimbabwe', code: 'ZW'};
	/*$scope.countrySelectedFn9 = function(selected) {
		if (selected) {
			$scope.countrySelected9 = selected.originalObject;
		} else {
			$scope.countrySelected9 = null;
		}
	}*/

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
