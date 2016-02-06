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
app1.controller('JavaFXWebDemoController', function($scope, $sce, $http, $localStorage, $q) {

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
	$scope.TCG_SERVER_IP = "localhost";

	$scope.pageNotSavedYet = true;
	//$scope.searchStr = "";
	////alert(JSON.stringify(ate_global_page_context));

	$scope.testSuitesMap=[{name: "JobApplication"},  {name: "WebJobApplication"}];


	$scope.screenType = "HTML";
	$scope.industryCategoriesMap=[{name: "HCM", code: "000000"},{name: "Recruitment"}];
	$scope.testCaseName = "QuickApply";
	$scope.inScreenJump = false;
	$scope.lastScreenOfTestCase = false;
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

	$scope.duplicatedUserValue = function(userValues, userValue) {
		for(var i=0; i<userValues.length; i++) {
			if (userValues[i].value === userValue.value)
				return i;
		}
		return -1
	}
	$scope.tmpUserValue = function(selected) {
		if (typeof selected !== "undefined") {
			var tmpObj = {name: selected.title, value: selected.title};
			if ($scope.duplicatedUserValue($scope.fruits[this.$parent.$index].userValues, tmpObj) === -1)
				$scope.fruits[this.$parent.$index].userValues.push(tmpObj);
		}
	}
	$scope.tmpPioPredictLabelResult = function(selected) {
		if (typeof selected !== "undefined") {
			if ($scope.fruits[this.$parent.$index].pioPredictLabelResult !== "undefined") {
				$scope.fruits[this.$parent.$index].pioPredictLabelResult.name = selected.title;
				$scope.fruits[this.$parent.$index].pioPredictLabelResult.value = selected.title;
			} else {
				$scope.fruits[this.$parent.$index].pioPredictLabelResult = {name: selected.title, value: selected.title}
			}
		}
	}

	$scope.screenTypeSwitcher = function() {
		switch($scope.screenType) {
			case "WINDOWFILEPICKER":

				if (typeof $localStorage.lastScreenNode != "undefined") {
					$scope.fruits = [];
					for (var index=0; index < $localStorage.lastScreenNode.clickUitrs.length; index++) {
						$scope.fruits[index] = $localStorage.lastScreenNode.clickUitrs[index];
					}

				} else {
					alert("there is no element to trigger the file picker in previous screen.")
				}
				//$scope.$apply();
				break;
			default:
				break;
		}
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
				 url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/preprocessing',
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
		$("#pioPredictLabelResult" + index).find("input").get(0).value = ($scope.fruits[index].inputLabelName);
	}

	$scope.startNewRootScreenNode = function() {
		$localStorage.lastScreenNodeBk = {};
		$localStorage.lastScreenNode = {};
		//TODO refresh all the graph ids
		alert("next screen will be saved as independent node. Please don't forget fresh this page to clean up the graph ids.");
	}

	$scope.saveIntermediateResultForWindowsFilePicker = function(samePageUpdate) {
		var tmpScreenName;
		if (typeof $scope.countrySelected14 === 'undefined') {
			alert( "no screen name set yet!");
			return $q.reject();

		}
		if (typeof $scope.countrySelected14.originalObject !== 'undefined') tmpScreenName = $scope.countrySelected14.originalObject.name;
		else tmpScreenName = $scope.countrySelected14;
		var uitrs=[];
		var clickUitrs=[];
		var actionUitrs = [];
		for (ind = 0; ind < $scope.fruits.length; ind++) {
			if ($scope.fruits[ind].userInputType === "SCREENJUMPER") {
				alert("WindowsFilePicker Screen should not be triggered by INSCREENJUMPER")
			} else if ($scope.fruits[ind].userInputType === "INSCREENJUMPER") {
				if ($scope.fruits[ind].userValues.length === 0) {
					alert("please give a value for the click input. For example, if this is a file picker screen, please give the file name with its path. ")
					return false;
				}
				clickUitrs.push($scope.fruits[ind])
			} else {
				alert("WindowsFilePicker Screen should be triggered only by INSCREENJUMPER")
			}
		}
		if (clickUitrs.length != 1) alert("this windows file picker screen should have been triggered by only one ClickInput");

		var req = {
			method: 'POST',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/saveIntermediateResultForWindowsFilePicker',
			headers: {'Content-Type': 'application/json'},
			data: {previousScreenTriggerClickUitr: clickUitrs[0], samePageUpdate: samePageUpdate, screenType: $scope.screenType, uitrs: uitrs, clickUitrs: clickUitrs, actionUitrs: actionUitrs,
				testSuitesMap: $scope.testSuitesMap, industryCategoriesMap: $scope.industryCategoriesMap,
				testCaseName:$scope.testCaseName, screenUrl: $scope.screenUrl,
				domainName: $scope.domainName, screenName: tmpScreenName, lastScreenNodeIntermediateResult: $localStorage.lastScreenNodeBk
			}
		}
		//$localStorage.lastScreenNode = req.data;

		$http(req).success(function(data, status, headers, config) {
			$scope.pageNotSavedYet = false;
			$scope.fruits.length = 0;
			//$scope.fruits[0] = {inputLabelName: "SaveResult", inputMLHtmlCode: data.toString()};
			$scope.fruits = data.uitrs.concat(data.actionUitrs).concat(data.clickUitrs);
			ate_global_page_context.pages = data.domStrings;
			//$localStorage.lastScreenNodeBk = $localStorage.lastScreenNode;
			alert( "success!");
		}).error(function(data, status, headers, config) {
			//$localStorage.lastScreenNode = $localStorage.lastScreenNodeBk;
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
	$scope.saveIntermediateResult = function(samePageUpdate) {
		var tmpScreenName;
		if (typeof $scope.countrySelected14 === 'undefined') {
			alert( "no screen name set yet!");
			return $q.reject();

		}
		if (typeof $scope.countrySelected14.originalObject !== 'undefined') tmpScreenName = $scope.countrySelected14.originalObject.name;
		else tmpScreenName = $scope.countrySelected14;
		var userInputUitrs=[];
		var inScreenJumperUitrs=[];
		var screenJumperUitrs = [];
		var actionTrigger = [];
		for (ind = 0; ind < $scope.fruits.length; ind++) {
			if ($scope.fruits[ind].userInputType === "SCREENJUMPER") {
				screenJumperUitrs.push($scope.fruits[ind]);
			} else if ($scope.fruits[ind].userInputType === "INSCREENJUMPER") {
				inScreenJumperUitrs.push($scope.fruits[ind])
			} else {
				userInputUitrs.push($scope.fruits[ind]);
			}
			if ($scope.fruits[ind].actionTrigger) {
				actionTrigger.push($scope.fruits[ind]);
			}

		}
		if (actionTrigger.length === 0 ) {
			var r = confirm("There is no screen jumper element collected. Are you doing last screen element collection?", "yes", "no");
			if (r === false) {
				return $q.reject();
			} else {
				$scope.lastScreenOfTestCase = true;
			}
		} else if (actionTrigger.length > 1) {
			alert("Please choose one and only one element as the actionTrigger or add element either being screen jumper or in-screen jumper");
			return $q.reject();
		} else {

			if (actionTrigger[0].userInputType === "INSCREENJUMPER") {
				var r1 = confirm("Is it a in-screen jump ?", "yes", "no");
				if (r1)
					$scope.inScreenJump = true;
				else
					return $q.reject();
			}

			if (actionTrigger[0].userInputType === "SCREENJUMPER") {
				var r2 = confirm("Is it a screen jump action?", "yes", "no");
				if (r2)
					$scope.lastScreenOfTestCase = false;
				else
					return $q.reject();
			}
			if (actionTrigger[0].userInputType === "USERINPUT") {
				var r3 = confirm("Are you sure this user input is a screen jumper?", "yes", "no");
				if (r3)
					$scope.inScreenJump = true;
				else
					return $q.reject();
			}
		}
/*
		if (actionUitrs.length === 0 && !$scope.inScreenJump && !$scope.lastScreenOfTestCase) {

			var r = confirm("There is no Clickable element collected. Are you doing an in-screen action?", "yes", "no");
			if (r === true) {
				$scope.inScreenJump = true;
			} else {
				var r1 = confirm("Is this the last screen of your test case?", "yes", "no");
				if (r1 === false) {
					return $q.reject();
				}
				$scope.lastScreenOfTestCase = true;
			}
		}*/

		var req = {
			method: 'POST',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/saveIntermediateResult',
			headers: {'Content-Type': 'application/json'},
			//data: {uitrs: $scope.fruits, domStrings: ate_global_page_documents}
			data: {lastScreenOfTestCase: $scope.lastScreenOfTestCase, inScreenJump: $scope.inScreenJump, samePageUpdate: samePageUpdate, screenType: $scope.screenType, uitrs: userInputUitrs, clickUitrs: inScreenJumperUitrs, actionUitrs: screenJumperUitrs, domStrings: ate_global_page_context.pages,
				testSuitesMap: $scope.testSuitesMap, industryCategoriesMap: $scope.industryCategoriesMap,
				testCaseName:$scope.testCaseName, screenUrl: $scope.screenUrl,
				domainName: $scope.domainName, screenName: tmpScreenName, lastScreenNodeIntermediateResult: $localStorage.lastScreenNodeBk
			}
		}
		$localStorage.lastScreenNode = req.data;

		$http(req).success(function(data, status, headers, config) {
			$scope.pageNotSavedYet = false;
			//$scope.update();
			$scope.fruits.length = 0;
			//$scope.fruits[0] = {inputLabelName: "SaveResult", inputMLHtmlCode: data.toString()};
			$scope.fruits = data.uitrs.concat(data.actionUitrs).concat(data.clickUitrs);
			ate_global_page_context.pages = data.domStrings;
			$localStorage.lastScreenNodeBk = $localStorage.lastScreenNode;
			alert( "success!");

			//return $q.resolve();
		}).error(function(data, status, headers, config) {
			$localStorage.lastScreenNode = $localStorage.lastScreenNodeBk;
			alert( "failure message: " + JSON.stringify({data: data}));
			//return $q.reject();
			//return false;
		});



	}
	$scope.pioPredict = function(){
		var req = {
			method: 'POST',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/pioPredict',
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
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/pagePredict',
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
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/trainIntoPIO',
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
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/queryUserInputValues',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.allUserValues = $scope.uniquearr(data.userValues);
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
	$scope.queryPioPredictedFieldNames = function() {
		var req = {
			method: 'GET',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/queryPioPredictedFieldNames',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},
		}
		$http(req).success(function(data, status, headers, config) {
			$scope.allFieldNames = $scope.uniquearr(data.fieldNames);
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
	$scope.uniquearr = function(origArr) {
		var newArr = [];
		var origLen = origArr.length;
		var	found = false;
			var x, y;

		for (x = 0; x < origLen; x++) {
			//found = "undefined";
			for (y = 0; y < newArr.length; y++) {
				if (JSON.stringify(origArr[x]) === JSON.stringify(newArr[y])) {
					found = true;
					break;
				}
			}
			if (!found) {
				newArr.push(origArr[x]);
			}
		}
		return newArr;
	}
	$scope.queryAllScreenNames = function() {
		var req = {
			method: 'GET',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/queryScreenNames',
//				 data: {content: document.documentElement.innerHTML}
			headers: {'Content-Type': 'application/json'},


		}
		$http(req).success(function(data, status, headers, config) {
			$scope.countries = $scope.uniquearr(data.screenNames);
		}).error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});

	}
	$scope.predict = function(){
		var req = {
			method: 'GET',
			url: 'http://' + $scope.TCG_SERVER_IP +':9080/com.bigtester.ate.tcg/predict',
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
